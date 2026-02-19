use crate::ai::openai::{self, ImageRequest};
use crate::db::queries::*;
use crate::db::Database;
use crate::commands::portrait_cmds::PortraitsDir;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use tauri::State;

fn build_world_image_prompt(world: &World) -> String {
    let mut parts = vec![
        "Studio Ghibli watercolor landscape painting.".to_string(),
        "Soft, painterly style with visible brushstrokes, warm muted tones, delicate linework.".to_string(),
        "Gentle ambient lighting, dreamy atmosphere, like a panoramic frame from a Miyazaki film.".to_string(),
        "Wide establishing shot, rich environmental detail, no characters or people in the scene.".to_string(),
    ];

    parts.push(format!("World name: {}", world.name));

    if !world.description.is_empty() {
        let desc = if world.description.len() > 500 {
            format!("{}...", &world.description[..500])
        } else {
            world.description.clone()
        };
        parts.push(format!("Setting: {desc}"));
    }

    let tags: Vec<String> = world.tone_tags.as_array()
        .map(|a| a.iter().filter_map(|v| v.as_str().map(|s| s.to_string())).collect())
        .unwrap_or_default();
    if !tags.is_empty() {
        parts.push(format!("Mood: {}", tags.join(", ")));
    }

    parts.push("No text, no watermarks, no UI elements, no characters.".to_string());

    parts.join(" ")
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WorldImageInfo {
    pub image_id: String,
    pub world_id: String,
    pub prompt: String,
    pub is_active: bool,
    pub created_at: String,
    pub data_url: String,
}

fn image_to_info(img: &WorldImage, dir: &std::path::Path) -> WorldImageInfo {
    let file_path = dir.join(&img.file_name);
    let data_url = if file_path.exists() {
        let bytes = std::fs::read(&file_path).unwrap_or_default();
        format!("data:image/png;base64,{}", base64_encode(&bytes))
    } else {
        String::new()
    };
    WorldImageInfo {
        image_id: img.image_id.clone(),
        world_id: img.world_id.clone(),
        prompt: img.prompt.clone(),
        is_active: img.is_active,
        created_at: img.created_at.clone(),
        data_url,
    }
}

fn base64_encode(bytes: &[u8]) -> String {
    const CHARS: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut result = String::with_capacity((bytes.len() + 2) / 3 * 4);
    for chunk in bytes.chunks(3) {
        let b0 = chunk[0] as u32;
        let b1 = if chunk.len() > 1 { chunk[1] as u32 } else { 0 };
        let b2 = if chunk.len() > 2 { chunk[2] as u32 } else { 0 };
        let triple = (b0 << 16) | (b1 << 8) | b2;
        result.push(CHARS[((triple >> 18) & 0x3F) as usize] as char);
        result.push(CHARS[((triple >> 12) & 0x3F) as usize] as char);
        if chunk.len() > 1 {
            result.push(CHARS[((triple >> 6) & 0x3F) as usize] as char);
        } else {
            result.push('=');
        }
        if chunk.len() > 2 {
            result.push(CHARS[(triple & 0x3F) as usize] as char);
        } else {
            result.push('=');
        }
    }
    result
}

fn base64_decode(input: &str) -> Result<Vec<u8>, String> {
    const DECODE: [u8; 128] = {
        let mut table = [255u8; 128];
        let chars = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let mut i = 0;
        while i < 64 {
            table[chars[i] as usize] = i as u8;
            i += 1;
        }
        table
    };

    let input = input.as_bytes();
    let mut result = Vec::with_capacity(input.len() * 3 / 4);
    let mut buf = 0u32;
    let mut bits = 0;

    for &b in input {
        if b == b'=' || b == b'\n' || b == b'\r' { continue; }
        if b >= 128 { return Err("Invalid base64 character".to_string()); }
        let val = DECODE[b as usize];
        if val == 255 { return Err(format!("Invalid base64 character: {}", b as char)); }
        buf = (buf << 6) | val as u32;
        bits += 6;
        if bits >= 8 {
            bits -= 8;
            result.push((buf >> bits) as u8);
            buf &= (1 << bits) - 1;
        }
    }
    Ok(result)
}

#[tauri::command]
pub async fn generate_world_image_cmd(
    db: State<'_, Database>,
    portraits_dir: State<'_, PortraitsDir>,
    api_key: String,
    world_id: String,
) -> Result<WorldImageInfo, String> {
    let world = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        get_world(&conn, &world_id).map_err(|e| e.to_string())?
    };

    let prompt = build_world_image_prompt(&world);
    log::info!("[WorldImage] Generating for '{}': {:.120}...", world.name, prompt);

    let request = ImageRequest {
        model: "dall-e-3".to_string(),
        prompt: prompt.clone(),
        n: 1,
        size: "1792x1024".to_string(),
        quality: "standard".to_string(),
        response_format: "b64_json".to_string(),
    };

    let response = openai::generate_image(&api_key, &request).await?;
    let b64 = response.data.first()
        .and_then(|d| d.b64_json.as_ref())
        .ok_or_else(|| "No image data in response".to_string())?;

    let image_bytes = base64_decode(b64)
        .map_err(|e| format!("Failed to decode image: {e}"))?;

    let image_id = uuid::Uuid::new_v4().to_string();
    let file_name = format!("world_{image_id}.png");
    let dir = &portraits_dir.0;
    std::fs::create_dir_all(dir).map_err(|e| format!("Failed to create dir: {e}"))?;
    let file_path = dir.join(&file_name);
    std::fs::write(&file_path, &image_bytes).map_err(|e| format!("Failed to save image: {e}"))?;

    log::info!("[WorldImage] Saved {} ({} bytes)", file_name, image_bytes.len());

    let img = WorldImage {
        image_id: image_id.clone(),
        world_id: world_id.clone(),
        prompt,
        file_name,
        is_active: true,
        created_at: Utc::now().to_rfc3339(),
    };

    {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        let _ = conn.execute("UPDATE world_images SET is_active = 0 WHERE world_id = ?1", rusqlite::params![world_id]);
        create_world_image(&conn, &img).map_err(|e| e.to_string())?;
    }

    Ok(image_to_info(&img, dir))
}

#[tauri::command]
pub fn list_world_images_cmd(
    db: State<Database>,
    portraits_dir: State<PortraitsDir>,
    world_id: String,
) -> Result<Vec<WorldImageInfo>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    let images = list_world_images(&conn, &world_id).map_err(|e| e.to_string())?;
    Ok(images.iter().map(|i| image_to_info(i, &portraits_dir.0)).collect())
}

#[tauri::command]
pub fn get_active_world_image_cmd(
    db: State<Database>,
    portraits_dir: State<PortraitsDir>,
    world_id: String,
) -> Result<Option<WorldImageInfo>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    Ok(get_active_world_image(&conn, &world_id).map(|i| image_to_info(&i, &portraits_dir.0)))
}

#[tauri::command]
pub fn set_active_world_image_cmd(
    db: State<Database>,
    world_id: String,
    image_id: String,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    set_active_world_image(&conn, &world_id, &image_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_chat_background_cmd(
    db: State<Database>,
    character_id: String,
) -> Result<Option<ChatBackground>, String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    Ok(get_chat_background(&conn, &character_id))
}

#[tauri::command]
pub fn update_chat_background_cmd(
    db: State<Database>,
    bg: ChatBackground,
) -> Result<(), String> {
    let conn = db.conn.lock().map_err(|e| e.to_string())?;
    upsert_chat_background(&conn, &bg).map_err(|e| e.to_string())
}
