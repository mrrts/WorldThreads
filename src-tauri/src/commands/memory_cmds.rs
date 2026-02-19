use crate::db::queries::*;
use crate::db::Database;
use tauri::State;

#[tauri::command]
pub fn get_memory_artifacts_cmd(
    db: State<Database>,
    subject_id: String,
    artifact_type: String,
) -> Result<Vec<MemoryArtifact>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    get_memory_artifacts(&conn, &subject_id, &artifact_type).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_thread_summary_cmd(
    db: State<Database>,
    character_id: String,
) -> Result<String, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let thread = get_thread_for_character(&conn, &character_id).map_err(|e| e.to_string())?;
    Ok(get_thread_summary(&conn, &thread.thread_id))
}
