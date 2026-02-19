use crate::db::queries::*;
use crate::db::Database;
use tauri::State;

#[tauri::command]
pub fn list_world_events_cmd(db: State<Database>, world_id: String, limit: Option<i64>) -> Result<Vec<WorldEvent>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    list_world_events(&conn, &world_id, limit.unwrap_or(50)).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn retcon_last_tick_cmd(db: State<Database>, world_id: String) -> Result<Option<WorldEvent>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    delete_last_world_event(&conn, &world_id).map_err(|e| e.to_string())
}
