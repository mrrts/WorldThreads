use crate::ai::openai::{self, ChatRequest, ResponseFormat};
use crate::ai::prompts;
use crate::db::queries::*;
use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

#[derive(Debug, Serialize, Deserialize)]
pub struct TickResult {
    pub events: Vec<String>,
    pub state_patch: serde_json::Value,
    pub next_hooks: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ModelConfig {
    pub dialogue_model: String,
    pub tick_model: String,
    pub memory_model: String,
    pub embedding_model: String,
}

impl Default for ModelConfig {
    fn default() -> Self {
        Self {
            dialogue_model: "gpt-4o".to_string(),
            tick_model: "gpt-4o-mini".to_string(),
            memory_model: "gpt-4o-mini".to_string(),
            embedding_model: "text-embedding-3-small".to_string(),
        }
    }
}

pub fn load_model_config(conn: &Connection) -> ModelConfig {
    let get = |key: &str, default: &str| -> String {
        get_setting(conn, key)
            .ok()
            .flatten()
            .unwrap_or_else(|| default.to_string())
    };
    ModelConfig {
        dialogue_model: get("model.dialogue", "gpt-4o"),
        tick_model: get("model.tick", "gpt-4o-mini"),
        memory_model: get("model.memory", "gpt-4o-mini"),
        embedding_model: get("model.embedding", "text-embedding-3-small"),
    }
}

pub fn save_model_config(conn: &Connection, config: &ModelConfig) -> Result<(), rusqlite::Error> {
    set_setting(conn, "model.dialogue", &config.dialogue_model)?;
    set_setting(conn, "model.tick", &config.tick_model)?;
    set_setting(conn, "model.memory", &config.memory_model)?;
    set_setting(conn, "model.embedding", &config.embedding_model)?;
    Ok(())
}

pub fn compute_tick_cache_key(
    world: &World,
    characters: &[Character],
    events: &[WorldEvent],
    last_msg: Option<&str>,
) -> String {
    let mut hasher = Sha256::new();
    hasher.update(world.state.to_string().as_bytes());
    for ch in characters {
        hasher.update(ch.state.to_string().as_bytes());
    }
    for e in events {
        hasher.update(e.event_id.as_bytes());
    }
    if let Some(m) = last_msg {
        hasher.update(m.as_bytes());
    }
    hex::encode(hasher.finalize())
}

pub async fn run_dialogue(
    api_key: &str,
    model: &str,
    world: &World,
    character: &Character,
    recent_messages: &[Message],
    recent_events: &[WorldEvent],
    retrieved_snippets: &[String],
    user_profile: Option<&UserProfile>,
    mood_directive: Option<&str>,
) -> Result<(String, Option<openai::Usage>), String> {
    let system = prompts::build_dialogue_system_prompt(world, character, recent_events, user_profile, mood_directive);
    let messages = prompts::build_dialogue_messages(&system, recent_messages, retrieved_snippets);

    let request = ChatRequest {
        model: model.to_string(),
        messages,
        temperature: Some(0.85),
        max_completion_tokens: Some(1024),
        response_format: None,
    };

    let response = openai::chat_completion(api_key, &request).await?;
    let reply = response
        .choices
        .first()
        .map(|c| c.message.content.clone())
        .ok_or_else(|| "No response from model".to_string())?;

    Ok((reply, response.usage))
}

pub async fn run_world_tick(
    api_key: &str,
    model: &str,
    world: &World,
    characters: &[Character],
    recent_events: &[WorldEvent],
    last_user_message: Option<&str>,
) -> Result<(TickResult, Option<openai::Usage>), String> {
    let messages =
        prompts::build_world_tick_prompt(world, characters, recent_events, last_user_message);

    let request = ChatRequest {
        model: model.to_string(),
        messages,
        temperature: Some(0.7),
        max_completion_tokens: Some(800),
        response_format: Some(ResponseFormat {
            format_type: "json_object".to_string(),
        }),
    };

    let response = openai::chat_completion(api_key, &request).await?;
    let raw = response
        .choices
        .first()
        .map(|c| c.message.content.clone())
        .ok_or_else(|| "No response from model".to_string())?;

    let tick: TickResult = serde_json::from_str(&raw).map_err(|e| format!("Failed to parse tick JSON: {e}\nRaw: {raw}"))?;
    Ok((tick, response.usage))
}

pub async fn run_memory_update(
    api_key: &str,
    model: &str,
    character: &Character,
    thread_summary: &str,
    recent_messages: &[Message],
) -> Result<(serde_json::Value, Option<openai::Usage>), String> {
    let messages =
        prompts::build_memory_update_prompt(character, thread_summary, recent_messages);

    let request = ChatRequest {
        model: model.to_string(),
        messages,
        temperature: Some(0.3),
        max_completion_tokens: Some(600),
        response_format: Some(ResponseFormat {
            format_type: "json_object".to_string(),
        }),
    };

    let response = openai::chat_completion(api_key, &request).await?;
    let raw = response
        .choices
        .first()
        .map(|c| c.message.content.clone())
        .ok_or_else(|| "No response from model".to_string())?;

    let val: serde_json::Value = serde_json::from_str(&raw).map_err(|e| format!("Failed to parse memory update: {e}"))?;
    Ok((val, response.usage))
}

pub async fn generate_reaction(
    api_key: &str,
    model: &str,
    character: &Character,
    user_message: &str,
    assistant_reply: &str,
) -> Result<(Option<String>, Option<openai::Usage>), String> {
    let system = format!(
        r#"You are {name}, reacting to a text message. You may react with a SINGLE emoji or choose not to react.

Your personality: {identity}

RULES:
- Only react if it feels natural — not every message deserves a reaction.
- React to the USER's last message (not your own reply).
- Choose an emoji that fits your character's personality and emotional state.
- Respond with ONLY the emoji character (e.g. ❤️ or 😂) or the word NONE if no reaction.
- Never explain your choice. Just the emoji or NONE."#,
        name = character.display_name,
        identity = if character.identity.is_empty() { "a complex character".to_string() } else { character.identity.clone() },
    );

    let messages = vec![
        openai::ChatMessage { role: "system".to_string(), content: system },
        openai::ChatMessage { role: "user".to_string(), content: user_message.to_string() },
        openai::ChatMessage { role: "assistant".to_string(), content: assistant_reply.to_string() },
        openai::ChatMessage {
            role: "user".to_string(),
            content: "React to the user's message above with a single emoji, or say NONE.".to_string(),
        },
    ];

    let request = ChatRequest {
        model: model.to_string(),
        messages,
        temperature: Some(0.9),
        max_completion_tokens: Some(8),
        response_format: None,
    };

    let response = openai::chat_completion(api_key, &request).await?;
    let usage = response.usage;
    let raw = response.choices.first()
        .map(|c| c.message.content.trim().to_string())
        .unwrap_or_default();

    if raw.is_empty() || raw.to_uppercase() == "NONE" {
        return Ok((None, usage));
    }

    let trimmed = raw.chars().take(4).collect::<String>();
    if trimmed.chars().any(|c| !c.is_ascii()) {
        Ok((Some(trimmed), usage))
    } else {
        Ok((None, usage))
    }
}

pub async fn generate_embeddings(
    api_key: &str,
    model: &str,
    texts: Vec<String>,
) -> Result<(Vec<Vec<f32>>, u32), String> {
    openai::create_embeddings(api_key, model, texts).await
}
