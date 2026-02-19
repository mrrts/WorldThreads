use crate::db::queries::*;
use crate::db::Database;
use tauri::State;

#[tauri::command]
pub fn get_today_usage_cmd(db: State<Database>) -> Result<DailyUsage, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    Ok(get_today_usage(&conn))
}
