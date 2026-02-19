use crate::db::queries::*;
use crate::db::Database;
use chrono::Utc;
use tauri::State;

#[tauri::command]
pub fn add_reaction_cmd(
    db: State<Database>,
    message_id: String,
    emoji: String,
    reactor: String,
) -> Result<Reaction, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    // Toggle: if this exact reaction already exists, remove it instead
    let existing: Option<String> = conn.query_row(
        "SELECT reaction_id FROM reactions WHERE message_id = ?1 AND emoji = ?2 AND reactor = ?3",
        rusqlite::params![message_id, emoji, reactor],
        |r| r.get(0),
    ).ok();

    if let Some(_) = existing {
        remove_reaction(&conn, &message_id, &emoji, &reactor).map_err(|e| e.to_string())?;
        return Err("removed".to_string());
    }

    let reaction = Reaction {
        reaction_id: uuid::Uuid::new_v4().to_string(),
        message_id,
        emoji,
        reactor,
        created_at: Utc::now().to_rfc3339(),
    };
    add_reaction(&conn, &reaction).map_err(|e| e.to_string())?;
    Ok(reaction)
}

#[tauri::command]
pub fn remove_reaction_cmd(
    db: State<Database>,
    message_id: String,
    emoji: String,
    reactor: String,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    remove_reaction(&conn, &message_id, &emoji, &reactor).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_reactions_cmd(
    db: State<Database>,
    message_ids: Vec<String>,
) -> Result<Vec<Reaction>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    get_reactions_for_messages(&conn, &message_ids).map_err(|e| e.to_string())
}
