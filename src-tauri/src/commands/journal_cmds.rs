use crate::ai::orchestrator;
use crate::db::queries::*;
use crate::db::Database;
use tauri::State;

const PRIOR_ENTRIES_FOR_CONTEXT: usize = 2;

fn current_world_day(world: &World) -> i64 {
    world.state.get("time")
        .and_then(|t| t.get("day_index"))
        .and_then(|v| v.as_i64())
        .unwrap_or(0)
}

/// Generate (or regenerate) today's journal entry for the given
/// character. Writes to `character_journals` with ON CONFLICT REPLACE,
/// so re-clicking overwrites today's entry rather than stacking.
/// Returns the new entry.
#[tauri::command]
pub async fn generate_character_journal_cmd(
    db: State<'_, Database>,
    api_key: String,
    character_id: String,
) -> Result<JournalEntry, String> {
    if api_key.trim().is_empty() {
        return Err("no API key".to_string());
    }

    let (character, world_day, model_config, history, prior_items, prior_entries) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let character = get_character(&conn, &character_id).map_err(|e| e.to_string())?;
        let world = get_world(&conn, &character.world_id).map_err(|e| e.to_string())?;
        let world_day = current_world_day(&world);
        let model_config = orchestrator::load_model_config(&conn);
        let user_name = get_user_profile(&conn, &character.world_id)
            .ok().map(|p| p.display_name).unwrap_or_else(|| "the human".to_string());
        // Bound the history feed strictly to the current world-day —
        // the journal is a structured-time artifact, so we want today's
        // actual messages, not "the last N by wall-clock recency."
        let history = gather_character_messages_for_world_day(
            &conn, &character.character_id, &user_name, world_day,
        );
        let prior_items: Vec<orchestrator::InventoryItem> = character.inventory.as_array()
            .map(|a| a.iter()
                .filter_map(|v| serde_json::from_value::<orchestrator::InventoryItem>(v.clone()).ok())
                .collect())
            .unwrap_or_default();
        // Prior entries for voice continuity — strictly BEFORE today so
        // a regenerate doesn't use its own previous version of today's
        // entry as context.
        let prior_entries = list_journal_entries_before(
            &conn, &character_id, world_day, PRIOR_ENTRIES_FOR_CONTEXT,
        ).unwrap_or_default();
        (character, world_day, model_config, history, prior_items, prior_entries)
    };

    let base = model_config.chat_api_base();
    let content = orchestrator::generate_character_journal(
        &base, &api_key, &model_config.memory_model,
        &character.display_name,
        &character.identity,
        &character.signature_emoji,
        &prior_items,
        &prior_entries,
        &history,
        world_day,
    ).await?;

    let now = chrono::Utc::now().to_rfc3339();
    let entry = JournalEntry {
        journal_id: uuid::Uuid::new_v4().to_string(),
        character_id: character.character_id.clone(),
        world_day,
        content,
        created_at: now,
    };
    {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        upsert_journal_entry(&conn, &entry).map_err(|e| e.to_string())?;
    }
    log::info!("[Journal] wrote entry for {} on Day {world_day}", character.display_name);
    Ok(entry)
}

/// Auto-variant invoked from the chat focus-refresh hook: short-circuits
/// if today's entry already exists for this character (no LLM call, no
/// DB write). Returns the existing entry when fresh, the newly-
/// generated entry when it wrote one. Shapes the return as a result
/// envelope so the frontend can tell "refreshed vs cached."
#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct MaybeJournalResult {
    pub entry: Option<JournalEntry>,
    /// true iff this call actually ran the LLM and wrote a row.
    pub refreshed: bool,
}

#[tauri::command]
pub async fn maybe_generate_character_journal_cmd(
    db: State<'_, Database>,
    api_key: String,
    character_id: String,
) -> Result<MaybeJournalResult, String> {
    // Short-circuit check up front — no API-key probe needed when fresh.
    let (world_day, existing) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let character = get_character(&conn, &character_id).map_err(|e| e.to_string())?;
        let world = get_world(&conn, &character.world_id).map_err(|e| e.to_string())?;
        let wd = current_world_day(&world);
        let existing = get_journal_entry_for_day(&conn, &character_id, wd);
        (wd, existing)
    };
    if let Some(entry) = existing {
        return Ok(MaybeJournalResult { entry: Some(entry), refreshed: false });
    }
    if api_key.trim().is_empty() {
        return Ok(MaybeJournalResult { entry: None, refreshed: false });
    }
    // No entry yet — delegate to the forced path for the actual work.
    let _ = world_day;
    match generate_character_journal_cmd(db, api_key, character_id).await {
        Ok(entry) => Ok(MaybeJournalResult { entry: Some(entry), refreshed: true }),
        Err(e) => {
            log::warn!("[Journal] auto-generation failed (non-fatal): {e}");
            Ok(MaybeJournalResult { entry: None, refreshed: false })
        }
    }
}

/// List the most-recent N journal entries for a character.
#[tauri::command]
pub fn list_character_journals_cmd(
    db: State<'_, Database>,
    character_id: String,
    limit: Option<usize>,
) -> Result<Vec<JournalEntry>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    list_journal_entries(&conn, &character_id, limit.unwrap_or(30))
        .map_err(|e| e.to_string())
}
