use crate::ai::orchestrator;
use crate::db::queries::*;
use crate::db::Database;
use chrono::Utc;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use tauri::State;

const CONTEXT_BEFORE: i64 = 3;
const CONTEXT_AFTER: i64 = 3;

/// Find the source message across both message tables.
fn find_message(conn: &rusqlite::Connection, message_id: &str) -> Option<(Message, String)> {
    // tuple: (message, table_name)
    if let Ok(m) = conn.query_row(
        &format!("SELECT {MSG_COLS} FROM messages WHERE message_id = ?1"),
        params![message_id], row_to_message,
    ) {
        return Some((m, "messages".to_string()));
    }
    if let Ok(m) = conn.query_row(
        &format!("SELECT {MSG_COLS} FROM group_messages WHERE message_id = ?1"),
        params![message_id], row_to_message,
    ) {
        return Some((m, "group_messages".to_string()));
    }
    None
}

/// Pull a window of messages surrounding the source, from whichever table
/// it lives in. Used to give the weave prompt enough context that it can
/// tell what kind of moment the source line is.
fn surrounding_messages(
    conn: &rusqlite::Connection,
    table: &str,
    thread_id: &str,
    source_created_at: &str,
) -> Vec<Message> {
    let before_sql = format!(
        "SELECT {MSG_COLS} FROM {table} WHERE thread_id = ?1 AND created_at < ?2 ORDER BY created_at DESC LIMIT ?3"
    );
    let after_sql = format!(
        "SELECT {MSG_COLS} FROM {table} WHERE thread_id = ?1 AND created_at > ?2 ORDER BY created_at ASC LIMIT ?3"
    );
    let source_sql = format!(
        "SELECT {MSG_COLS} FROM {table} WHERE thread_id = ?1 AND created_at = ?2"
    );

    let mut before: Vec<Message> = conn.prepare(&before_sql).ok()
        .and_then(|mut s| {
            s.query_map(params![thread_id, source_created_at, CONTEXT_BEFORE], row_to_message)
                .ok()
                .map(|rows| rows.filter_map(|r| r.ok()).collect())
        })
        .unwrap_or_default();
    before.reverse();

    let source_rows: Vec<Message> = conn.prepare(&source_sql).ok()
        .and_then(|mut s| {
            s.query_map(params![thread_id, source_created_at], row_to_message)
                .ok()
                .map(|rows| rows.filter_map(|r| r.ok()).collect())
        })
        .unwrap_or_default();

    let after: Vec<Message> = conn.prepare(&after_sql).ok()
        .and_then(|mut s| {
            s.query_map(params![thread_id, source_created_at, CONTEXT_AFTER], row_to_message)
                .ok()
                .map(|rows| rows.filter_map(|r| r.ok()).collect())
        })
        .unwrap_or_default();

    let mut out = Vec::with_capacity(before.len() + source_rows.len() + after.len());
    out.extend(before);
    out.extend(source_rows);
    out.extend(after);
    out
}

/// Resolve the display-name label to use for the speaker of a message.
/// For user messages → the user's display_name (or "User"). For assistant
/// messages in a solo thread → the character. For group → the sender.
fn speaker_label_for(
    conn: &rusqlite::Connection,
    msg: &Message,
    user_display_name: &str,
) -> String {
    if msg.role == "user" {
        return user_display_name.to_string();
    }
    if let Some(sender_id) = msg.sender_character_id.as_deref() {
        if let Ok(ch) = get_character(conn, sender_id) {
            return ch.display_name;
        }
    }
    // Solo chat assistant fallback: look up the thread's character.
    let char_id: Option<String> = conn.query_row(
        "SELECT character_id FROM threads WHERE thread_id = ?1",
        params![msg.thread_id], |r| r.get(0),
    ).ok();
    if let Some(cid) = char_id {
        if let Ok(ch) = get_character(conn, &cid) {
            return ch.display_name;
        }
    }
    "Character".to_string()
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WeaveRequest {
    pub source_message_id: String,
    pub subject_type: String,
    pub subject_id: String,
}

#[derive(Debug, Serialize)]
pub struct WeaveResponse {
    pub current_description: String,
    pub proposed_description: String,
}

/// Run the LLM weave call. Returns the current description (so the UI can
/// diff) plus the proposed revision. Does NOT persist anything.
#[tauri::command]
pub async fn propose_kept_weave_cmd(
    db: State<'_, Database>,
    api_key: String,
    request: WeaveRequest,
) -> Result<WeaveResponse, String> {
    // Read everything needed up-front (lock released before awaiting).
    let (model_config, subject_label, current_description, context_msgs, source_msg, source_speaker_label, world_id_for_user) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let model_config = orchestrator::load_model_config(&conn);

        let (source_msg, table) = find_message(&conn, &request.source_message_id)
            .ok_or_else(|| "source message not found".to_string())?;

        // User display name (for labeling user-role messages in context).
        let user_display_name: String = get_world(&conn, &{
            // find world via thread
            let thread_world: Option<String> = conn.query_row(
                "SELECT world_id FROM threads WHERE thread_id = ?1",
                params![source_msg.thread_id], |r| r.get(0),
            ).ok();
            thread_world.unwrap_or_default()
        })
            .ok()
            .and_then(|w| get_user_profile(&conn, &w.world_id).ok())
            .map(|p| p.display_name)
            .unwrap_or_else(|| "The human".to_string());

        // Pull current description + subject label based on subject_type.
        let (subject_label, current_description, world_id_for_user) = match request.subject_type.as_str() {
            "character" => {
                let ch = get_character(&conn, &request.subject_id).map_err(|e| e.to_string())?;
                (ch.display_name, ch.identity, None::<String>)
            }
            "user" => {
                // subject_id is world_id for user
                let profile = get_user_profile(&conn, &request.subject_id).map_err(|e| e.to_string())?;
                (profile.display_name, profile.description, Some(request.subject_id.clone()))
            }
            other => return Err(format!("weave not supported for subject_type={other}")),
        };

        let context_msgs = surrounding_messages(&conn, &table, &source_msg.thread_id, &source_msg.created_at);
        let speaker_label = speaker_label_for(&conn, &source_msg, &user_display_name);

        (model_config, subject_label, current_description, context_msgs, source_msg, speaker_label, world_id_for_user)
    };

    let _ = world_id_for_user; // kept for future use; not needed by weave itself

    let (proposed, usage) = orchestrator::generate_canon_weave_description(
        &model_config.chat_api_base(), &api_key, &model_config.dialogue_model,
        &subject_label,
        &current_description,
        &context_msgs,
        &source_msg,
        &source_speaker_label,
    ).await?;

    if let Some(u) = &usage {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let _ = record_token_usage(&conn, "canon_weave", &model_config.dialogue_model, u.prompt_tokens, u.completion_tokens);
    }

    Ok(WeaveResponse {
        current_description,
        proposed_description: proposed,
    })
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SaveCanonRequest {
    pub source_message_id: Option<String>,
    pub subject_type: String,      // "character" | "user" | "world" | "relationship"
    pub subject_id: String,        // character_id | world_id | world_id | "char_a::char_b|user"
    pub record_type: String,        // "description_weave" | "known_fact" | "relationship_note" | "world_fact"
    pub content: String,
    #[serde(default)]
    pub user_note: String,
}

/// Persist a canon entry AND apply its side effect to the target row.
#[tauri::command]
pub fn save_kept_record_cmd(
    db: State<Database>,
    request: SaveCanonRequest,
) -> Result<KeptRecord, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;

    // Look up source message metadata for provenance (if provided).
    let (source_thread_id, source_world_day, source_created_at) = match request.source_message_id.as_deref() {
        Some(mid) if !mid.is_empty() => {
            match find_message(&conn, mid) {
                Some((m, _)) => (Some(m.thread_id), m.world_day, Some(m.created_at)),
                None => (None, None, None),
            }
        }
        _ => (None, None, None),
    };

    // Apply side effect to the subject row. The UI now only exposes
    // description_weave for character|user — known_fact, relationship_note,
    // and world_fact are deprecated. Historical entries with those
    // record_types remain readable in the kept_records table; only the
    // write path is narrowed.
    match (request.subject_type.as_str(), request.record_type.as_str()) {
        ("character", "description_weave") => {
            conn.execute(
                "UPDATE characters SET identity = ?2, updated_at = datetime('now') WHERE character_id = ?1",
                params![request.subject_id, request.content],
            ).map_err(|e| e.to_string())?;
        }
        ("user", "description_weave") => {
            conn.execute(
                "UPDATE user_profiles SET description = ?2, updated_at = datetime('now') WHERE world_id = ?1",
                params![request.subject_id, request.content],
            ).map_err(|e| e.to_string())?;
        }
        (st, ct) => return Err(format!("unsupported (subject_type, record_type) = ({st}, {ct}) — only description_weave on character|user is supported")),
    }

    let entry = KeptRecord {
        kept_id: uuid::Uuid::new_v4().to_string(),
        source_message_id: request.source_message_id.clone(),
        source_thread_id,
        source_world_day,
        source_created_at,
        subject_type: request.subject_type,
        subject_id: request.subject_id,
        record_type: request.record_type,
        content: request.content,
        user_note: request.user_note,
        created_at: Utc::now().to_rfc3339(),
    };
    create_kept_record(&conn, &entry).map_err(|e| e.to_string())?;
    Ok(entry)
}

// ─── Auto-canonization (propose + commit) ────────────────────────────────

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProposeAutoCanonRequest {
    pub source_message_id: String,
    /// Free-text user hint to steer the classifier ("add as boundary for
    /// Darren", "remember Anna likes coffee with cream, no sugar").
    /// Optional — blank or missing is fine.
    #[serde(default)]
    pub user_hint: String,
}

/// Classify a moment into 1-2 proposed canonization updates without
/// applying anything. Returns a preview the UI can display (and
/// optionally allow the user to edit in-place) before the user commits.
#[tauri::command]
pub async fn propose_auto_canon_cmd(
    db: State<'_, Database>,
    api_key: String,
    request: ProposeAutoCanonRequest,
) -> Result<Vec<orchestrator::ProposedCanonUpdate>, String> {
    if api_key.trim().is_empty() {
        return Err("no API key".to_string());
    }

    // Gather everything under one lock, then release before the LLM call.
    let (model_config, source_msg, source_speaker_label, context_msgs, subjects) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let model_config = orchestrator::load_model_config(&conn);

        let (source_msg, table) = find_message(&conn, &request.source_message_id)
            .ok_or_else(|| "source message not found".to_string())?;

        // Find the world this moment belongs to (via the thread).
        let world_id: String = conn.query_row(
            "SELECT world_id FROM threads WHERE thread_id = ?1",
            params![source_msg.thread_id], |r| r.get(0),
        ).map_err(|e| format!("couldn't resolve world for source message: {e}"))?;

        let user_profile = get_user_profile(&conn, &world_id).ok();
        let user_display_name = user_profile.as_ref()
            .map(|p| p.display_name.clone())
            .unwrap_or_else(|| "The human".to_string());

        let speaker_label = speaker_label_for(&conn, &source_msg, &user_display_name);
        let context_msgs = surrounding_messages(&conn, &table, &source_msg.thread_id, &source_msg.created_at);

        // Build candidate subject list: every character in the world + the user.
        let characters = list_characters(&conn, &world_id).unwrap_or_default();
        let mut subjects: Vec<orchestrator::CanonizationSubject> = Vec::new();
        for ch in &characters {
            if ch.is_archived { continue; }
            subjects.push(orchestrator::CanonizationSubject {
                subject_type: "character".to_string(),
                subject_id: ch.character_id.clone(),
                subject_label: ch.display_name.clone(),
                current_description: ch.identity.clone(),
                voice_rules: json_array_to_strings(&ch.voice_rules),
                boundaries: json_array_to_strings(&ch.boundaries),
                backstory_facts: json_array_to_strings(&ch.backstory_facts),
                open_loops: character_open_loops(ch),
            });
        }
        if let Some(profile) = user_profile.as_ref() {
            subjects.push(orchestrator::CanonizationSubject {
                subject_type: "user".to_string(),
                subject_id: world_id.clone(),
                subject_label: if profile.display_name.trim().is_empty() { "You".to_string() } else { profile.display_name.clone() },
                current_description: profile.description.clone(),
                // User profile doesn't carry these lists today; pass empty
                // so the classifier treats the user as weave-only-eligible
                // unless the moment genuinely fits another kind.
                voice_rules: Vec::new(),
                boundaries: Vec::new(),
                backstory_facts: Vec::new(),
                open_loops: Vec::new(),
            });
        }

        (model_config, source_msg, speaker_label, context_msgs, subjects)
    };

    let (proposals, usage) = orchestrator::propose_canonization_updates(
        &model_config.chat_api_base(), &api_key, &model_config.memory_model,
        &source_msg, &source_speaker_label, &context_msgs, &subjects,
        Some(&request.user_hint),
    ).await?;

    if let Some(u) = &usage {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let _ = record_token_usage(&conn, "canon_auto_propose", &model_config.memory_model, u.prompt_tokens, u.completion_tokens);
    }

    Ok(proposals)
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CommitAutoCanonRequest {
    pub source_message_id: String,
    /// The (possibly user-edited) proposals to commit. The frontend passes
    /// back what the user saw and optionally tweaked. Server re-validates
    /// shape but trusts content.
    pub updates: Vec<orchestrator::ProposedCanonUpdate>,
    #[serde(default)]
    pub user_note: String,
}

#[derive(Debug, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AppliedCanonUpdate {
    pub kept_id: String,
    pub kind: String,
    pub subject_type: String,
    pub subject_id: String,
    pub subject_label: String,
    pub new_content: String,
    pub prior_content: Option<String>,
    pub justification: String,
}

/// Apply a set of previously-proposed (and possibly user-edited) updates
/// to their subjects and write one kept_records row per update. Returns
/// the list of applied updates so the UI can show a final report.
#[tauri::command]
pub fn commit_auto_canon_cmd(
    db: State<Database>,
    request: CommitAutoCanonRequest,
) -> Result<Vec<AppliedCanonUpdate>, String> {
    if request.updates.is_empty() {
        return Err("no updates to commit".to_string());
    }
    if request.updates.len() > 2 {
        return Err(format!("too many updates ({}); max is 2", request.updates.len()));
    }

    let conn = db.conn.lock().map_err(|e| e.to_string())?;

    // Provenance block — resolve once; reused across all applied updates.
    let (source_thread_id, source_world_day, source_created_at) = match find_message(&conn, &request.source_message_id) {
        Some((m, _)) => (Some(m.thread_id), m.world_day, Some(m.created_at)),
        None => (None, None, None),
    };

    let mut applied: Vec<AppliedCanonUpdate> = Vec::new();
    for u in &request.updates {
        let trimmed = u.new_content.trim().to_string();
        if trimmed.is_empty() {
            return Err(format!("update for {} has empty content", u.subject_label));
        }

        // Apply side effect based on kind + subject_type.
        let prior_for_report: Option<String> = match (u.subject_type.as_str(), u.kind.as_str()) {
            ("character", "description_weave") => {
                let ch = get_character(&conn, &u.subject_id).map_err(|e| e.to_string())?;
                let prior = ch.identity.clone();
                conn.execute(
                    "UPDATE characters SET identity = ?2, updated_at = datetime('now') WHERE character_id = ?1",
                    params![u.subject_id, trimmed],
                ).map_err(|e| e.to_string())?;
                Some(prior)
            }
            ("character", "voice_rule") => {
                append_character_list(&conn, &u.subject_id, "voice_rules", &trimmed)?;
                None
            }
            ("character", "boundary") => {
                append_character_list(&conn, &u.subject_id, "boundaries", &trimmed)?;
                None
            }
            ("character", "known_fact") => {
                append_character_list(&conn, &u.subject_id, "backstory_facts", &trimmed)?;
                None
            }
            ("character", "open_loop") => {
                append_character_state_open_loop(&conn, &u.subject_id, &trimmed)?;
                None
            }
            ("user", "description_weave") => {
                let prior = get_user_profile(&conn, &u.subject_id).map(|p| p.description).unwrap_or_default();
                conn.execute(
                    "UPDATE user_profiles SET description = ?2, updated_at = datetime('now') WHERE world_id = ?1",
                    params![u.subject_id, trimmed],
                ).map_err(|e| e.to_string())?;
                Some(prior)
            }
            ("user", _other) => {
                // The user profile today doesn't carry voice_rules /
                // boundaries / backstory_facts / open_loops. Reject with a
                // clear message rather than silently dropping the intent.
                return Err(format!(
                    "{} is not yet supported for subject_type=user — only description_weave is applicable to the user profile",
                    u.kind
                ));
            }
            (st, k) => return Err(format!("unsupported (subject_type={st}, kind={k})")),
        };

        let kept_id = uuid::Uuid::new_v4().to_string();
        let entry = KeptRecord {
            kept_id: kept_id.clone(),
            source_message_id: Some(request.source_message_id.clone()),
            source_thread_id: source_thread_id.clone(),
            source_world_day,
            source_created_at: source_created_at.clone(),
            subject_type: u.subject_type.clone(),
            subject_id: u.subject_id.clone(),
            record_type: u.kind.clone(),
            content: trimmed.clone(),
            user_note: request.user_note.clone(),
            created_at: Utc::now().to_rfc3339(),
        };
        create_kept_record(&conn, &entry).map_err(|e| e.to_string())?;

        applied.push(AppliedCanonUpdate {
            kept_id,
            kind: u.kind.clone(),
            subject_type: u.subject_type.clone(),
            subject_id: u.subject_id.clone(),
            subject_label: u.subject_label.clone(),
            new_content: trimmed,
            prior_content: prior_for_report,
            justification: u.justification.clone(),
        });
    }

    Ok(applied)
}

/// Append `value` to the JSON-array field `field` on character `id`.
/// field ∈ {"voice_rules","boundaries","backstory_facts"}. Preserves
/// existing entries; no dedupe (the classifier is instructed not to
/// duplicate, and the user can still force it via Regenerate-with-hint
/// if they want).
fn append_character_list(
    conn: &rusqlite::Connection,
    character_id: &str,
    field: &str,
    value: &str,
) -> Result<(), String> {
    let current_json: String = conn.query_row(
        &format!("SELECT {field} FROM characters WHERE character_id = ?1"),
        params![character_id], |r| r.get(0),
    ).map_err(|e| format!("character load failed: {e}"))?;
    let mut arr: Vec<serde_json::Value> = serde_json::from_str(&current_json)
        .unwrap_or_else(|_| Vec::new());
    arr.push(serde_json::Value::String(value.to_string()));
    let new_json = serde_json::to_string(&arr).map_err(|e| e.to_string())?;
    conn.execute(
        &format!("UPDATE characters SET {field} = ?2, updated_at = datetime('now') WHERE character_id = ?1"),
        params![character_id, new_json],
    ).map_err(|e| format!("character update failed: {e}"))?;
    Ok(())
}

/// Append a string to `state.open_loops` inside the character's state JSON.
/// Open loops live nested one level deep so we merge-read-modify-write.
fn append_character_state_open_loop(
    conn: &rusqlite::Connection,
    character_id: &str,
    value: &str,
) -> Result<(), String> {
    let current_json: String = conn.query_row(
        "SELECT state FROM characters WHERE character_id = ?1",
        params![character_id], |r| r.get(0),
    ).map_err(|e| format!("character load failed: {e}"))?;
    let mut state: serde_json::Value = serde_json::from_str(&current_json)
        .unwrap_or_else(|_| serde_json::json!({}));
    let loops = state
        .as_object_mut()
        .ok_or_else(|| "character state is not an object".to_string())?
        .entry("open_loops".to_string())
        .or_insert_with(|| serde_json::Value::Array(Vec::new()));
    if let Some(arr) = loops.as_array_mut() {
        arr.push(serde_json::Value::String(value.to_string()));
    } else {
        *loops = serde_json::json!([value]);
    }
    let new_json = serde_json::to_string(&state).map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE characters SET state = ?2, updated_at = datetime('now') WHERE character_id = ?1",
        params![character_id, new_json],
    ).map_err(|e| format!("character state update failed: {e}"))?;
    Ok(())
}

/// Pull the list of `state.open_loops` strings from a character, for the
/// classifier's "don't duplicate existing canon" awareness.
fn character_open_loops(ch: &Character) -> Vec<String> {
    ch.state.get("open_loops")
        .and_then(|v| v.as_array())
        .map(|arr| arr.iter()
            .filter_map(|x| x.as_str().map(|s| s.to_string()))
            .collect())
        .unwrap_or_default()
}

/// Convert a JSON array of strings to Vec<String>. Defensive: returns
/// empty if the value isn't an array or entries aren't strings.
fn json_array_to_strings(v: &serde_json::Value) -> Vec<String> {
    v.as_array()
        .map(|arr| arr.iter()
            .filter_map(|x| x.as_str().map(|s| s.to_string()))
            .collect())
        .unwrap_or_default()
}

/// Return the distinct set of message IDs (in the current thread) that have
/// been canonized at least once — drives the "this moment is canon"
/// indicator on messages.
#[tauri::command]
pub fn list_kept_message_ids_cmd(
    db: State<Database>,
    thread_id: String,
) -> Result<Vec<String>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    list_kept_message_ids_for_thread(&conn, &thread_id).map_err(|e| e.to_string())
}

/// All canon entries tied to a given message (for the tooltip + undo list).
#[tauri::command]
pub fn list_kept_for_message_cmd(
    db: State<Database>,
    message_id: String,
) -> Result<Vec<KeptRecord>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    list_kept_for_message(&conn, &message_id).map_err(|e| e.to_string())
}

/// Remove a canon entry. NOTE: this removes the provenance row only; it
/// does NOT attempt to undo the side effect on the subject row (e.g. roll
/// back a character description). Undo of the side effect would need a
/// separate path that snapshots the pre-state.
#[tauri::command]
pub fn delete_kept_record_cmd(
    db: State<Database>,
    kept_id: String,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    delete_kept_record(&conn, &kept_id).map_err(|e| e.to_string())
}
