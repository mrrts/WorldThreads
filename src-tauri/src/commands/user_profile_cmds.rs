use crate::db::queries::*;
use crate::db::Database;
use tauri::State;

#[tauri::command]
pub fn get_user_profile_cmd(
    db: State<Database>,
    world_id: String,
) -> Result<Option<UserProfile>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    match get_user_profile(&conn, &world_id) {
        Ok(p) => Ok(Some(p)),
        Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn update_user_profile_cmd(
    db: State<Database>,
    profile: UserProfile,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    upsert_user_profile(&conn, &profile).map_err(|e| e.to_string())
}
