use crate::ai::openai::{self, ChatRequest, ChatMessage};
use crate::ai::orchestrator;
use crate::db::queries::*;
use crate::db::Database;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use tauri::State;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ConsultantMessage {
    pub role: String,
    pub content: String,
}

/// Load persisted consultant chat messages for a thread.
#[tauri::command]
pub fn load_consultant_chat_cmd(
    db: State<'_, Database>,
    thread_id: String,
) -> Result<Vec<ConsultantMessage>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare(
        "SELECT role, content FROM consultant_messages WHERE thread_id = ?1 ORDER BY id ASC"
    ).map_err(|e| e.to_string())?;
    let rows = stmt.query_map(params![thread_id], |row| {
        Ok(ConsultantMessage {
            role: row.get(0)?,
            content: row.get(1)?,
        })
    }).map_err(|e| e.to_string())?;
    rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

/// Clear all consultant messages for a thread.
#[tauri::command]
pub fn clear_consultant_chat_cmd(
    db: State<'_, Database>,
    thread_id: String,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM consultant_messages WHERE thread_id = ?1", params![thread_id])
        .map_err(|e| e.to_string())?;
    Ok(())
}

/// Send a message to the story consultant and get a response.
/// Persists both the user message and the assistant response.
#[tauri::command]
pub async fn story_consultant_cmd(
    db: State<'_, Database>,
    api_key: String,
    character_id: Option<String>,
    group_chat_id: Option<String>,
    user_message: String,
) -> Result<String, String> {
    let is_group = group_chat_id.is_some();

    let (world, characters, recent_msgs, user_name, model_config, thread_id) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let model_config = orchestrator::load_model_config(&conn);

        if is_group {
            let gc = get_group_chat(&conn, group_chat_id.as_deref().unwrap()).map_err(|e| e.to_string())?;
            let world = get_world(&conn, &gc.world_id).map_err(|e| e.to_string())?;
            let recent_msgs = list_group_messages(&conn, &gc.thread_id, 30).map_err(|e| e.to_string())?;
            let user_name = get_user_profile(&conn, &gc.world_id)
                .ok().map(|p| p.display_name).unwrap_or_else(|| "the user".to_string());

            let char_ids: Vec<String> = gc.character_ids.as_array()
                .map(|a| a.iter().filter_map(|v| v.as_str().map(|s| s.to_string())).collect())
                .unwrap_or_default();
            let characters: Vec<Character> = char_ids.iter()
                .filter_map(|id| get_character(&conn, id).ok())
                .collect();

            (world, characters, recent_msgs, user_name, model_config, gc.thread_id)
        } else {
            let char_id = character_id.as_deref().ok_or("No character specified")?;
            let character = get_character(&conn, char_id).map_err(|e| e.to_string())?;
            let world = get_world(&conn, &character.world_id).map_err(|e| e.to_string())?;
            let thread = get_thread_for_character(&conn, char_id).map_err(|e| e.to_string())?;
            let recent_msgs = list_messages(&conn, &thread.thread_id, 30).map_err(|e| e.to_string())?;
            let user_name = get_user_profile(&conn, &character.world_id)
                .ok().map(|p| p.display_name).unwrap_or_else(|| "the user".to_string());

            (world, vec![character], recent_msgs, user_name, model_config, thread.thread_id)
        }
    };

    // Load persisted consultant history
    let consultant_history = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let mut stmt = conn.prepare(
            "SELECT role, content FROM consultant_messages WHERE thread_id = ?1 ORDER BY id ASC"
        ).map_err(|e| e.to_string())?;
        let rows = stmt.query_map(params![thread_id], |row| {
            Ok(ChatMessage { role: row.get(0)?, content: row.get(1)? })
        }).map_err(|e| e.to_string())?;
        rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?
    };

    // Build character descriptions
    let char_descriptions: Vec<String> = characters.iter().map(|c| {
        let mut desc = format!("- {}", c.display_name);
        if !c.identity.is_empty() {
            desc.push_str(&format!(": {}", c.identity));
        }
        desc
    }).collect();

    // Build recent conversation summary
    let conversation: Vec<String> = recent_msgs.iter()
        .filter(|m| m.role != "illustration" && m.role != "video")
        .map(|m| {
            let speaker = match m.role.as_str() {
                "user" => user_name.clone(),
                "narrative" => "[Narrative]".to_string(),
                "context" => "[Context]".to_string(),
                "assistant" => {
                    m.sender_character_id.as_ref()
                        .and_then(|id| characters.iter().find(|c| c.character_id == *id))
                        .map(|c| c.display_name.clone())
                        .unwrap_or_else(|| "Character".to_string())
                }
                _ => m.role.clone(),
            };
            format!("{}: {}", speaker, m.content)
        })
        .collect();

    let system_prompt = format!(
        r#"You are a story consultant and dramaturg — a creative collaborator helping the writer think about their interactive narrative. You are NOT a character in the story. You speak as a knowledgeable, insightful advisor who understands storytelling craft.

You have full knowledge of:

WORLD: {world_desc}

CHARACTERS:
- {user_name} (the writer's character, the protagonist)
{char_list}

RECENT CONVERSATION:
{conversation}

YOUR ROLE:
- Discuss the narrative from a meta perspective: themes, character motivations, dramatic tension, pacing, subtext.
- Suggest directions, plot developments, things the writer could say or do.
- Analyze what characters might be thinking or feeling beneath the surface.
- Offer craft observations: what's working, what could be stronger, where the energy is.
- Be specific — reference actual moments from the conversation, name the characters, quote what was said.
- Be concise and conversational — this is a brainstorming chat, not an essay.
- If the writer asks for suggestions, give 2-3 concrete options, not vague advice.
- You may be opinionated. Good story consultants have taste."#,
        world_desc = if world.description.is_empty() { "A richly detailed world." } else { &world.description },
        user_name = user_name,
        char_list = char_descriptions.join("\n"),
        conversation = conversation.join("\n"),
    );

    let mut messages: Vec<ChatMessage> = vec![
        ChatMessage { role: "system".to_string(), content: system_prompt },
    ];

    // Add persisted consultant chat history
    messages.extend(consultant_history);

    // Add the new user message
    messages.push(ChatMessage {
        role: "user".to_string(),
        content: user_message.clone(),
    });

    let request = ChatRequest {
        model: model_config.dialogue_model.clone(),
        messages,
        temperature: Some(0.95),
        max_completion_tokens: Some(800),
        response_format: None,
    };

    let response = openai::chat_completion_with_base(
        &model_config.chat_api_base(), &api_key, &request,
    ).await?;

    if let Some(u) = &response.usage {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let _ = record_token_usage(&conn, "consultant", &model_config.dialogue_model, u.prompt_tokens, u.completion_tokens);
    }

    let reply = response.choices.first()
        .map(|c| c.message.content.clone())
        .ok_or_else(|| "No response from model".to_string())?;

    // Persist both messages
    {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO consultant_messages (thread_id, role, content) VALUES (?1, 'user', ?2)",
            params![thread_id, user_message],
        ).map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO consultant_messages (thread_id, role, content) VALUES (?1, 'assistant', ?2)",
            params![thread_id, reply],
        ).map_err(|e| e.to_string())?;
    }

    Ok(reply)
}
