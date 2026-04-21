use crate::ai::orchestrator::{self, InventoryItem};
use crate::db::queries::*;
use crate::db::Database;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::State;

/// How many world-days can pass before an inventory is considered stale
/// and the focus-trigger refreshes it. 1 = refresh on any new day.
/// Adjustable knob — later could be swapped to a finer-grained stamp
/// (day + time_of_day) without changing the call sites.
pub const INVENTORY_STALE_DAYS: i64 = 1;

/// How many recent chronologically-merged messages to feed the seed /
/// refresh LLM as context. Caps token cost and attention dilution.
pub const INVENTORY_HISTORY_LIMIT: usize = 40;

/// Result shape for inventory refresh: the current items plus a flag
/// indicating whether a refresh actually ran this call (vs. no-op).
/// Frontend uses `refreshed` to decide whether to display a subtle
/// "inventory updated" cue.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InventoryRefreshResult {
    pub character_id: String,
    pub inventory: Vec<InventoryItem>,
    /// true if this call actually ran seed or refresh; false if the
    /// inventory was still fresh and we returned cached.
    pub refreshed: bool,
    /// "seed" | "refresh" | "noop"
    pub mode: String,
}

fn current_world_day(world: &World) -> i64 {
    world
        .state
        .get("time")
        .and_then(|t| t.get("day_index"))
        .and_then(|v| v.as_i64())
        .unwrap_or(0)
}

fn parse_inventory(raw: &Value) -> Vec<InventoryItem> {
    raw.as_array()
        .map(|a| {
            a.iter()
                .filter_map(|v| serde_json::from_value::<InventoryItem>(v.clone()).ok())
                .filter(|it| !it.name.trim().is_empty())
                .collect()
        })
        .unwrap_or_default()
}

/// Run the check-and-possibly-refresh flow for one character. Returns
/// the current inventory either way. Pure function of state + LLM; no
/// side effects outside DB writes and the LLM call.
///
/// Trigger logic:
///   - last_inventory_day IS NULL → SEED.
///   - current_world_day - last_inventory_day >= INVENTORY_STALE_DAYS → REFRESH.
///   - otherwise → NOOP (return the stored inventory as-is).
pub async fn refresh_one_character_inventory(
    db: &Database,
    api_key: &str,
    character_id: &str,
) -> Result<InventoryRefreshResult, String> {
    let (character, world, model_config, user_name) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let character = get_character(&conn, character_id).map_err(|e| e.to_string())?;
        let world = get_world(&conn, &character.world_id).map_err(|e| e.to_string())?;
        let model_config = orchestrator::load_model_config(&conn);
        let user_name = get_user_profile(&conn, &character.world_id)
            .ok()
            .map(|p| p.display_name)
            .unwrap_or_else(|| "the human".to_string());
        (character, world, model_config, user_name)
    };

    let today = current_world_day(&world);
    let prior_items = parse_inventory(&character.inventory);

    let mode = match character.last_inventory_day {
        None => "seed",
        Some(last) if today - last >= INVENTORY_STALE_DAYS => "refresh",
        _ => "noop",
    };

    if mode == "noop" {
        return Ok(InventoryRefreshResult {
            character_id: character.character_id.clone(),
            inventory: prior_items,
            refreshed: false,
            mode: "noop".to_string(),
        });
    }

    // Skip LLM entirely if there's no API key / local-only mode with no
    // memory model. Leave prior inventory untouched but advance the
    // stamp so we don't spam failed attempts.
    if api_key.trim().is_empty() {
        return Ok(InventoryRefreshResult {
            character_id: character.character_id.clone(),
            inventory: prior_items,
            refreshed: false,
            mode: "noop".to_string(),
        });
    }

    let history = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        gather_character_recent_messages(
            &conn,
            &character.character_id,
            &user_name,
            INVENTORY_HISTORY_LIMIT,
        )
    };

    let base = model_config.chat_api_base();
    let model = &model_config.memory_model;

    let new_items = match mode {
        "seed" => orchestrator::seed_character_inventory(
            &base, api_key, model,
            &character.display_name, &character.identity,
            &history,
        ).await,
        _ => orchestrator::refresh_character_inventory(
            &base, api_key, model,
            &character.display_name, &character.identity,
            &prior_items, &history,
        ).await,
    };

    let new_items = match new_items {
        Ok(items) => items,
        Err(e) => {
            log::warn!("[Inventory] {} {} failed: {e}", mode, character.display_name);
            // Don't advance the stamp on failure — we'll try again on next focus.
            return Ok(InventoryRefreshResult {
                character_id: character.character_id.clone(),
                inventory: prior_items,
                refreshed: false,
                mode: "noop".to_string(),
            });
        }
    };

    // Persist the new inventory and advance the stamp to today.
    {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let json = serde_json::to_value(&new_items).unwrap_or(Value::Array(vec![]));
        let _ = set_character_inventory(&conn, &character.character_id, &json, Some(today));
    }

    log::info!(
        "[Inventory] {} {} — {} items",
        mode, character.display_name, new_items.len(),
    );

    Ok(InventoryRefreshResult {
        character_id: character.character_id.clone(),
        inventory: new_items,
        refreshed: true,
        mode: mode.to_string(),
    })
}

/// Tauri entry point for a single character's focus-trigger refresh.
/// Called by the frontend when the user interacts with a solo chat.
#[tauri::command]
pub async fn refresh_character_inventory_cmd(
    db: State<'_, Database>,
    api_key: String,
    character_id: String,
) -> Result<InventoryRefreshResult, String> {
    refresh_one_character_inventory(&db, &api_key, &character_id).await
}

/// Tauri entry point for a group chat's focus-trigger refresh. Kicks
/// off one refresh task per group member in parallel so none of them
/// blocks the others. Returns the (possibly updated) inventory for each.
#[tauri::command]
pub async fn refresh_group_inventories_cmd(
    db: State<'_, Database>,
    api_key: String,
    group_chat_id: String,
) -> Result<Vec<InventoryRefreshResult>, String> {
    let char_ids: Vec<String> = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let gc = get_group_chat(&conn, &group_chat_id).map_err(|e| e.to_string())?;
        gc.character_ids
            .as_array()
            .map(|a| a.iter().filter_map(|v| v.as_str().map(|s| s.to_string())).collect())
            .unwrap_or_default()
    };

    // Fan out concurrently — each inventory call is a memory-tier
    // LLM roundtrip, so they parallelize on the wire. SQLite access
    // serializes on the inner Mutex, which is fine since DB time is
    // tiny compared to the LLM wait. No tokio::spawn (avoids 'static
    // lifetime): join_all polls all futures on the current task.
    let db_ref: &Database = db.inner();
    let futs = char_ids.into_iter().map(|cid| {
        let key = api_key.clone();
        async move { refresh_one_character_inventory(db_ref, &key, &cid).await }
    });
    let results = futures_util::future::join_all(futs).await;
    let out: Vec<InventoryRefreshResult> = results.into_iter().filter_map(|r| r.ok()).collect();
    Ok(out)
}

/// Fetch (role, content, sender_character_id, created_at) for a message
/// by id. Checks both `messages` and `group_messages` tables — the click
/// that drove this call can originate from either. Returns None if the
/// message has been deleted between the click and the command landing.
fn get_message_anchor(conn: &rusqlite::Connection, message_id: &str)
    -> Option<(String, String, Option<String>, String)>
{
    let mut try_table = |table: &str| {
        conn.query_row(
            &format!("SELECT role, content, sender_character_id, created_at FROM {} WHERE message_id = ?1", table),
            rusqlite::params![message_id],
            |r| Ok((
                r.get::<_, String>(0)?,
                r.get::<_, String>(1)?,
                r.get::<_, Option<String>>(2)?,
                r.get::<_, String>(3)?,
            )),
        ).ok()
    };
    try_table("messages").or_else(|| try_table("group_messages"))
}

/// Resolve the "speaker label" for an anchor message. For user messages,
/// uses the user's display_name (falling back to "The human"). For an
/// assistant message, uses the sender character's display_name if we can
/// find it, otherwise the active character's name. For narrative, a
/// scene-voice label that reads right in the prompt.
fn anchor_speaker_label(
    conn: &rusqlite::Connection,
    role: &str,
    sender_character_id: Option<&str>,
    world_id: &str,
    active_character_name: &str,
) -> String {
    match role {
        "user" => get_user_profile(conn, world_id)
            .ok()
            .map(|p| p.display_name)
            .unwrap_or_else(|| "The human".to_string()),
        "narrative" => "Narrative voice".to_string(),
        _ => {
            if let Some(cid) = sender_character_id {
                if let Ok(c) = get_character(conn, cid) {
                    return c.display_name;
                }
            }
            active_character_name.to_string()
        }
    }
}

/// Core "update from moment" flow — bypasses the staleness gate, quotes
/// the clicked message for the model. When `allow_pure_maintain` is
/// false (user/assistant clicks, and solo-chat narrative) at least one
/// slot MUST change. When true (narrative clicked in a group chat,
/// per-member fan-out) the model is permitted to leave the inventory
/// untouched if the narrative doesn't reach this character.
async fn update_one_inventory_from_message(
    db: &Database,
    api_key: &str,
    character_id: &str,
    message_id: &str,
    allow_pure_maintain: bool,
) -> Result<InventoryRefreshResult, String> {
    if api_key.trim().is_empty() {
        return Err("no API key".to_string());
    }

    let (character, world, model_config, history, anchor_speaker, anchor_content) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let character = get_character(&conn, character_id).map_err(|e| e.to_string())?;
        let world = get_world(&conn, &character.world_id).map_err(|e| e.to_string())?;
        let model_config = orchestrator::load_model_config(&conn);
        let user_name = get_user_profile(&conn, &character.world_id)
            .ok()
            .map(|p| p.display_name)
            .unwrap_or_else(|| "the human".to_string());
        let history = gather_character_recent_messages(
            &conn,
            &character.character_id,
            &user_name,
            INVENTORY_HISTORY_LIMIT,
        );
        let (role, content, sender, _created_at) = get_message_anchor(&conn, message_id)
            .ok_or_else(|| "Message not found for inventory update".to_string())?;
        let speaker = anchor_speaker_label(
            &conn, &role, sender.as_deref(), &character.world_id, &character.display_name,
        );
        (character, world, model_config, history, speaker, content)
    };

    let today = current_world_day(&world);
    let prior_items = parse_inventory(&character.inventory);
    let base = model_config.chat_api_base();
    let model = &model_config.memory_model;

    let new_items = orchestrator::inventory_update_from_moment(
        &base, api_key, model,
        &character.display_name, &character.identity,
        &prior_items, &history,
        &anchor_speaker, &anchor_content,
        allow_pure_maintain,
    ).await.map_err(|e| {
        log::warn!("[Inventory] moment-update for {} failed: {e}", character.display_name);
        e
    })?;

    {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let json = serde_json::to_value(&new_items).unwrap_or(Value::Array(vec![]));
        let _ = set_character_inventory(&conn, &character.character_id, &json, Some(today));
    }

    log::info!(
        "[Inventory] moment-update for {} — {} items (anchor: {})",
        character.display_name, new_items.len(), anchor_speaker,
    );

    Ok(InventoryRefreshResult {
        character_id: character.character_id.clone(),
        inventory: new_items,
        refreshed: true,
        mode: "moment".to_string(),
    })
}

/// Resolve who the inventory update should target based on the clicked
/// message. Returns a list of character_ids (one for most cases, many
/// for narrative-in-group fan-out).
///
/// Routing rules:
/// - **assistant**: the message's `sender_character_id` (the character who
///   spoke). Falls back to the solo-thread's character if sender is null.
/// - **user**: the addressee.
///   - Solo thread → the thread's single character.
///   - Group thread → run `detect_direct_address` first; if unambiguous,
///     use it. Otherwise fall back to `llm_pick_addressee` (same helper
///     that group chat uses to pick responders). Last resort: the
///     most-recent assistant speaker, or the first member.
/// - **narrative**: everyone in the chat.
///   - Solo → the one character.
///   - Group → fan out to all members.
async fn resolve_inventory_targets(
    db: &Database,
    api_key: &str,
    message_id: &str,
) -> Result<Vec<(String, bool)>, String> {
    use crate::commands::group_chat_cmds;

    // Load message + thread context up front so we can release the
    // mutex before any awaits.
    let (role, content, sender_character_id, thread_id, model_config, user_name, group_info, solo_char_id, members, recent, sender_of_last_assistant) = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;

        let (role, content, sender_character_id, thread_id) = conn.query_row(
            "SELECT role, content, sender_character_id, thread_id FROM messages WHERE message_id = ?1",
            rusqlite::params![message_id],
            |r| Ok((
                r.get::<_, String>(0)?,
                r.get::<_, String>(1)?,
                r.get::<_, Option<String>>(2)?,
                r.get::<_, String>(3)?,
            )),
        ).or_else(|_| conn.query_row(
            "SELECT role, content, sender_character_id, thread_id FROM group_messages WHERE message_id = ?1",
            rusqlite::params![message_id],
            |r| Ok((
                r.get::<_, String>(0)?,
                r.get::<_, String>(1)?,
                r.get::<_, Option<String>>(2)?,
                r.get::<_, String>(3)?,
            )),
        )).map_err(|_| "Message not found".to_string())?;

        // Is this thread a group chat? If so, get its member list.
        let group_info: Option<(String, Vec<String>)> = conn.query_row(
            "SELECT group_chat_id, character_ids FROM group_chats WHERE thread_id = ?1",
            rusqlite::params![&thread_id],
            |r| {
                let gc_id: String = r.get(0)?;
                let ids_json: String = r.get(1)?;
                let ids: Vec<String> = serde_json::from_str::<serde_json::Value>(&ids_json)
                    .ok()
                    .and_then(|v| v.as_array().map(|a| a.iter().filter_map(|x| x.as_str().map(String::from)).collect()))
                    .unwrap_or_default();
                Ok((gc_id, ids))
            },
        ).ok();

        // Solo fallback: the thread's character_id (may be NULL in group threads).
        let solo_char_id: Option<String> = conn.query_row(
            "SELECT character_id FROM threads WHERE thread_id = ?1",
            rusqlite::params![&thread_id],
            |r| r.get::<_, Option<String>>(0),
        ).ok().flatten();

        let model_config = orchestrator::load_model_config(&conn);

        // For group user-message routing, we need Character structs + recent context.
        let (members, recent, sender_of_last_assistant): (Vec<Character>, Vec<Message>, Option<String>) = if let Some((_, ref ids)) = group_info {
            let chars: Vec<Character> = ids.iter()
                .filter_map(|id| get_character(&conn, id).ok())
                .collect();
            let world_id = chars.first().map(|c| c.world_id.clone()).unwrap_or_default();
            let recent: Vec<Message> = list_group_messages(&conn, &thread_id, 12).unwrap_or_default();
            let last_assistant = recent.iter().rev()
                .find(|m| m.role == "assistant")
                .and_then(|m| m.sender_character_id.clone());
            let _ = world_id;
            (chars, recent, last_assistant)
        } else {
            (Vec::new(), Vec::new(), None)
        };

        let world_id = if let Some((_, ref ids)) = group_info {
            ids.iter().filter_map(|id| get_character(&conn, id).ok()).next().map(|c| c.world_id)
        } else if let Some(ref cid) = solo_char_id {
            get_character(&conn, cid).ok().map(|c| c.world_id)
        } else {
            None
        };
        let user_name = world_id.and_then(|wid| get_user_profile(&conn, &wid).ok())
            .map(|p| p.display_name)
            .unwrap_or_else(|| "the human".to_string());

        (role, content, sender_character_id, thread_id, model_config, user_name, group_info, solo_char_id, members, recent, sender_of_last_assistant)
    };

    let is_group = group_info.is_some();
    let _ = thread_id; // kept for future use / logging

    // Each entry: (character_id, allow_pure_maintain). The flag is only
    // set on narrative-in-group fan-out, where the narrative may only
    // reach a subset of the characters present.
    let targets: Vec<(String, bool)> = match role.as_str() {
        "assistant" => {
            let id = sender_character_id.or(solo_char_id)
                .ok_or_else(|| "Assistant message has no sender character".to_string())?;
            vec![(id, false)]
        }
        "user" => {
            if !is_group {
                solo_char_id.map(|id| (id, false)).into_iter().collect()
            } else {
                // Try direct address first (fast path, no LLM cost).
                let direct = group_chat_cmds::detect_direct_address(&content, &members);
                let picked_id = if direct.len() == 1 {
                    Some(direct[0].clone())
                } else if !members.is_empty() {
                    let llm_pick = group_chat_cmds::llm_pick_addressee(
                        api_key, &model_config, &content, &recent, &members, &user_name, 8,
                    ).await;
                    llm_pick.or(sender_of_last_assistant).or_else(|| Some(members[0].character_id.clone()))
                } else {
                    None
                };
                match picked_id {
                    Some(id) => vec![(id, false)],
                    None => return Err("Group chat has no members".to_string()),
                }
            }
        }
        "narrative" => {
            if is_group {
                // Fan out to every member, but ALLOW pure-maintain: the
                // narrative may only name one or two of them, and the
                // untouched members shouldn't be forced to manufacture
                // a change. The prompt handles the branching inside.
                members.iter().map(|c| (c.character_id.clone(), true)).collect()
            } else {
                // Solo narrative still forces at least one change —
                // there's only one character, and the user clicked on
                // a narrative about them.
                solo_char_id.map(|id| (id, false)).into_iter().collect()
            }
        }
        other => return Err(format!("Inventory update not supported for role '{other}'")),
    };

    if targets.is_empty() {
        return Err("Could not resolve any inventory target for this message".to_string());
    }
    Ok(targets)
}

/// Unified on-demand inventory update: routes based on the clicked
/// message's role and whether the chat is solo or group. See
/// `resolve_inventory_targets` for routing rules.
#[tauri::command]
pub async fn update_inventory_for_moment_cmd(
    db: State<'_, Database>,
    api_key: String,
    message_id: String,
) -> Result<Vec<InventoryRefreshResult>, String> {
    let targets = resolve_inventory_targets(&db, &api_key, &message_id).await?;
    let db_ref: &Database = db.inner();
    let futs = targets.into_iter().map(|(cid, allow_maintain)| {
        let key = api_key.clone();
        let mid = message_id.clone();
        async move { update_one_inventory_from_message(db_ref, &key, &cid, &mid, allow_maintain).await }
    });
    let results = futures_util::future::join_all(futs).await;
    let out: Vec<InventoryRefreshResult> = results.into_iter().filter_map(|r| r.ok()).collect();
    Ok(out)
}

/// User-edit entry point from the character settings page. Blindly
/// stores whatever the user typed (trimmed + capped to max items).
/// Stamps `last_inventory_day` to the current world-day so the
/// refresh check doesn't blow the user's edit away on next focus.
#[tauri::command]
pub fn set_character_inventory_cmd(
    db: State<'_, Database>,
    character_id: String,
    inventory: Vec<InventoryItem>,
) -> Result<Vec<InventoryItem>, String> {
    // Normalize kind, drop empties, preserve order (physicals first,
    // then interiors) so the strip / prompt render stays predictable.
    // Total capped at INVENTORY_MAX_ITEMS — no per-kind cap; the mix
    // is a soft rule enforced in the LLM prompt, not here.
    let mut phys: Vec<InventoryItem> = Vec::new();
    let mut inter: Vec<InventoryItem> = Vec::new();
    for it in inventory.into_iter() {
        let kind = if it.kind.trim().eq_ignore_ascii_case(orchestrator::INVENTORY_KIND_INTERIOR) {
            orchestrator::INVENTORY_KIND_INTERIOR.to_string()
        } else {
            orchestrator::INVENTORY_KIND_PHYSICAL.to_string()
        };
        let normalized = InventoryItem {
            name: it.name.trim().to_string(),
            description: it.description.trim().to_string(),
            kind,
        };
        if normalized.name.is_empty() { continue; }
        if normalized.kind == orchestrator::INVENTORY_KIND_INTERIOR {
            inter.push(normalized);
        } else {
            phys.push(normalized);
        }
    }
    let mut cleaned: Vec<InventoryItem> = phys;
    cleaned.extend(inter);
    if cleaned.len() > orchestrator::INVENTORY_MAX_ITEMS {
        cleaned.truncate(orchestrator::INVENTORY_MAX_ITEMS);
    }

    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let character = get_character(&conn, &character_id).map_err(|e| e.to_string())?;
    let world = get_world(&conn, &character.world_id).map_err(|e| e.to_string())?;
    let today = current_world_day(&world);
    let json = serde_json::to_value(&cleaned).unwrap_or(Value::Array(vec![]));
    set_character_inventory(&conn, &character_id, &json, Some(today))
        .map_err(|e| e.to_string())?;
    Ok(cleaned)
}
