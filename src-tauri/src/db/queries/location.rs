use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SavedPlace {
    pub saved_place_id: String,
    pub world_id: String,
    pub name: String,
    pub created_at: String,
}

/// Read the current_location for a thread (individual chat) or group_chat.
/// Returns None if unset or chat doesn't exist.
pub fn get_thread_location(conn: &Connection, thread_id: &str) -> Result<Option<String>, rusqlite::Error> {
    conn.query_row(
        "SELECT current_location FROM threads WHERE thread_id = ?1",
        params![thread_id],
        |row| row.get::<_, Option<String>>(0),
    ).optional().map(|opt| opt.flatten())
}

pub fn get_group_chat_location(conn: &Connection, group_chat_id: &str) -> Result<Option<String>, rusqlite::Error> {
    conn.query_row(
        "SELECT current_location FROM group_chats WHERE group_chat_id = ?1",
        params![group_chat_id],
        |row| row.get::<_, Option<String>>(0),
    ).optional().map(|opt| opt.flatten())
}

pub fn set_thread_location(conn: &Connection, thread_id: &str, location: Option<&str>) -> Result<(), rusqlite::Error> {
    conn.execute(
        "UPDATE threads SET current_location = ?1 WHERE thread_id = ?2",
        params![location, thread_id],
    )?;
    Ok(())
}

pub fn set_group_chat_location(conn: &Connection, group_chat_id: &str, location: Option<&str>) -> Result<(), rusqlite::Error> {
    conn.execute(
        "UPDATE group_chats SET current_location = ?1 WHERE group_chat_id = ?2",
        params![location, group_chat_id],
    )?;
    Ok(())
}

pub fn list_saved_places(conn: &Connection, world_id: &str) -> Result<Vec<SavedPlace>, rusqlite::Error> {
    let mut stmt = conn.prepare(
        "SELECT saved_place_id, world_id, name, created_at FROM saved_places WHERE world_id = ?1 ORDER BY name COLLATE NOCASE ASC"
    )?;
    let rows = stmt.query_map(params![world_id], |row| {
        Ok(SavedPlace {
            saved_place_id: row.get(0)?,
            world_id: row.get(1)?,
            name: row.get(2)?,
            created_at: row.get(3)?,
        })
    })?;
    rows.collect()
}

/// Insert a saved place. Idempotent on (world_id, name) — returns the
/// existing row if a duplicate is attempted (the UNIQUE constraint is
/// the source of truth; the modal's checkbox-disable is the user-side
/// guard against ever hitting it).
pub fn create_saved_place(conn: &Connection, place: &SavedPlace) -> Result<(), rusqlite::Error> {
    conn.execute(
        "INSERT OR IGNORE INTO saved_places (saved_place_id, world_id, name, created_at) VALUES (?1, ?2, ?3, ?4)",
        params![place.saved_place_id, place.world_id, place.name, place.created_at],
    )?;
    Ok(())
}

pub fn delete_saved_place(conn: &Connection, saved_place_id: &str) -> Result<(), rusqlite::Error> {
    conn.execute(
        "DELETE FROM saved_places WHERE saved_place_id = ?1",
        params![saved_place_id],
    )?;
    Ok(())
}
