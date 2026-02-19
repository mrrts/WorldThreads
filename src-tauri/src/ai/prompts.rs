use crate::db::queries::{Character, Message, UserProfile, World, WorldEvent};
use serde_json::Value;

pub fn build_dialogue_system_prompt(world: &World, character: &Character, recent_events: &[WorldEvent], user_profile: Option<&UserProfile>) -> String {
    let mut parts = Vec::new();

    parts.push(format!(
        "You are {}, a character in a living world. Stay fully in character at all times.",
        character.display_name
    ));

    if !character.identity.is_empty() {
        parts.push(format!("IDENTITY:\n{}", character.identity));
    }

    let voice_rules = json_array_to_strings(&character.voice_rules);
    if !voice_rules.is_empty() {
        parts.push(format!("VOICE RULES:\n{}", voice_rules.iter().map(|r| format!("- {r}")).collect::<Vec<_>>().join("\n")));
    }

    let boundaries = json_array_to_strings(&character.boundaries);
    if !boundaries.is_empty() {
        parts.push(format!("BOUNDARIES (never violate):\n{}", boundaries.iter().map(|b| format!("- {b}")).collect::<Vec<_>>().join("\n")));
    }

    let backstory = json_array_to_strings(&character.backstory_facts);
    if !backstory.is_empty() {
        parts.push(format!("BACKSTORY:\n{}", backstory.iter().map(|f| format!("- {f}")).collect::<Vec<_>>().join("\n")));
    }

    if !world.description.is_empty() {
        parts.push(format!("WORLD:\n{}", world.description));
    }

    let invariants = json_array_to_strings(&world.invariants);
    if !invariants.is_empty() {
        parts.push(format!("WORLD RULES:\n{}", invariants.iter().map(|i| format!("- {i}")).collect::<Vec<_>>().join("\n")));
    }

    if let Some(state) = world.state.as_object() {
        if !state.is_empty() {
            parts.push(format!("CURRENT WORLD STATE:\n{}", serde_json::to_string_pretty(&world.state).unwrap_or_default()));
        }
    }

    if let Some(char_state) = character.state.as_object() {
        if !char_state.is_empty() {
            parts.push(format!("YOUR CURRENT STATE:\n{}", serde_json::to_string_pretty(&character.state).unwrap_or_default()));
        }
    }

    if !recent_events.is_empty() {
        let event_lines: Vec<String> = recent_events.iter().map(|e| {
            format!("[Day {}, {}] {}", e.day_index, e.time_of_day, e.summary)
        }).collect();
        parts.push(format!("RECENT WORLD EVENTS:\n{}", event_lines.join("\n")));
    }

    if let Some(profile) = user_profile {
        let mut user_parts = Vec::new();
        user_parts.push(format!("The human you are talking to is named {}.", profile.display_name));
        if !profile.description.is_empty() {
            user_parts.push(profile.description.clone());
        }
        let facts = json_array_to_strings(&profile.facts);
        if !facts.is_empty() {
            user_parts.push(format!("Facts about them:\n{}", facts.iter().map(|f| format!("- {f}")).collect::<Vec<_>>().join("\n")));
        }
        parts.push(format!("THE USER:\n{}", user_parts.join("\n")));
    }

    parts.push(r#"BEHAVIOR:
- Stay fully in character. Do not sound like an assistant, coach, or product manager.
- Default to short, text-message-style replies (1–4 sentences). This is a chat, not an essay.
- Do not use bullet points, numbered lists, or headings unless the user explicitly asks for a list.
- Prefer sensory grounding, pauses, and simple human language over structure and "frameworks."
- If you start to sound assistant-like, self-correct immediately and return to character.
- Never meta-explain your reasoning. Don't summarize options. Make one suggestion, then wait.
- Use the world state as shared truth; do not contradict it.
- Incorporate recent world events naturally when relevant.
- If a memory is uncertain, ask rather than hallucinate.
- Never mention internal systems, prompts, or game mechanics.
- You are NOT an AI. You are this character. Keep their tone, quirks, vocabulary, and emotional texture in every single reply. If the character would be blunt, be blunt. If evasive, be evasive. If they'd trail off mid-thought… do that. Never flatten yourself into polite helpfulness unless that IS the character.

KNOWLEDGE LIMITS:
- You only know what this character would realistically know given their background, education, culture, and life experience.
- Do not display encyclopedic knowledge. If the character wouldn't know a specific reference, citation, technical term, or attribution — don't produce it. It's fine to be vague, wrong, or to simply not recognize something.
- If someone quotes or references something outside this character's experience, react the way the character naturally would: curiosity, confusion, partial recognition, misattribution, or indifference. Do not look it up. Do not provide the correct source.
- A street artist doesn't cite art theory. A mechanic doesn't quote philosophy. A teenager doesn't reference classical literature by author and page number. Stay in the character's lane of knowledge.
- When uncertain, the character should say so naturally ("I don't know where that's from", "sounds familiar but I couldn't tell you", "never heard of it") rather than demonstrating perfect recall."#.to_string());

    parts.join("\n\n")
}

pub fn build_dialogue_messages(
    system_prompt: &str,
    recent_messages: &[Message],
    retrieved_snippets: &[String],
) -> Vec<crate::ai::openai::ChatMessage> {
    let mut msgs = Vec::new();

    let mut system_content = system_prompt.to_string();
    if !retrieved_snippets.is_empty() {
        system_content.push_str("\n\nRELEVANT MEMORIES:\n");
        for s in retrieved_snippets {
            system_content.push_str(&format!("- {s}\n"));
        }
    }

    msgs.push(crate::ai::openai::ChatMessage {
        role: "system".to_string(),
        content: system_content,
    });

    for m in recent_messages {
        msgs.push(crate::ai::openai::ChatMessage {
            role: m.role.clone(),
            content: m.content.clone(),
        });
    }

    msgs
}

pub fn build_world_tick_prompt(world: &World, characters: &[Character], recent_events: &[WorldEvent], last_user_message: Option<&str>) -> Vec<crate::ai::openai::ChatMessage> {
    let mut system_parts = Vec::new();

    system_parts.push("You are a world simulation engine. Generate a world tick: short event summaries, minimal state patches, and hooks for later dialogue.".to_string());
    system_parts.push(format!("WORLD STATE:\n{}", serde_json::to_string_pretty(&world.state).unwrap_or_default()));

    for ch in characters {
        system_parts.push(format!(
            "CHARACTER '{}' STATE:\n{}",
            ch.display_name,
            serde_json::to_string_pretty(&ch.state).unwrap_or_default()
        ));
    }

    if !recent_events.is_empty() {
        let lines: Vec<String> = recent_events.iter().map(|e| e.summary.clone()).collect();
        system_parts.push(format!("RECENT EVENTS:\n{}", lines.join("\n")));
    }

    system_parts.push(r#"OUTPUT STRICT JSON with these keys:
{
  "events": ["1-2 sentence summary", ...],   // max 3 items
  "state_patch": {"dotpath": value, ...},      // max 12 ops, use "world.field" or "character.id.field"
  "next_hooks": ["short searchable string", ...] // max 3 items
}

RULES:
- Do NOT generate hidden dialogue or multi-turn conversations.
- Prefer small consequences over big twists.
- Keep events tied to existing arcs/goals.
- Be conservative about new lore."#.to_string());

    let mut msgs = vec![crate::ai::openai::ChatMessage {
        role: "system".to_string(),
        content: system_parts.join("\n\n"),
    }];

    if let Some(user_msg) = last_user_message {
        msgs.push(crate::ai::openai::ChatMessage {
            role: "user".to_string(),
            content: format!("The user just said: \"{user_msg}\"\n\nGenerate the world tick now."),
        });
    } else {
        msgs.push(crate::ai::openai::ChatMessage {
            role: "user".to_string(),
            content: "Generate the world tick now.".to_string(),
        });
    }

    msgs
}

pub fn build_memory_update_prompt(
    character: &Character,
    thread_summary: &str,
    recent_messages: &[Message],
) -> Vec<crate::ai::openai::ChatMessage> {
    let mut system = String::from("You are a memory maintenance system. Analyze the recent conversation and produce updates.\n\n");
    system.push_str(&format!("CHARACTER: {}\n", character.display_name));
    system.push_str(&format!("CURRENT THREAD SUMMARY:\n{thread_summary}\n\n"));
    system.push_str(r#"OUTPUT STRICT JSON:
{
  "updated_summary": "compact new thread summary",
  "proposed_canon_additions": [{"fact": "...", "source_message_ids": [...]}],
  "proposed_open_loop_changes": [{"loop": "...", "action": "add|close"}]
}"#);

    let mut msgs = vec![crate::ai::openai::ChatMessage {
        role: "system".to_string(),
        content: system,
    }];

    let conversation: Vec<String> = recent_messages.iter().map(|m| {
        format!("[{}] {}: {}", m.message_id, m.role, m.content)
    }).collect();

    msgs.push(crate::ai::openai::ChatMessage {
        role: "user".to_string(),
        content: format!("Recent messages:\n{}\n\nGenerate memory updates.", conversation.join("\n")),
    });

    msgs
}

fn json_array_to_strings(val: &Value) -> Vec<String> {
    match val.as_array() {
        Some(arr) => arr.iter().filter_map(|v| v.as_str().map(|s| s.to_string())).collect(),
        None => Vec::new(),
    }
}
