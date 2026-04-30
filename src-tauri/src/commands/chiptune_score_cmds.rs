use crate::ai::chiptune_score;
use crate::ai::orchestrator;
use crate::db::Database;
use serde_json::Value;
use tauri::State;

#[derive(Debug, serde::Serialize)]
pub struct GeneratedScorePhraseResult {
    pub phrase: Value,
    pub raw: String,
}

#[tauri::command]
pub async fn generate_next_score_phrase_cmd(
    db: State<'_, Database>,
    api_key: String,
    current_last_phrase: Option<Value>,
    momentstamp: String,
    mood_hint: Option<String>,
) -> Result<GeneratedScorePhraseResult, String> {
    if api_key.trim().is_empty() {
        return Err("no API key configured".to_string());
    }

    let model_config = {
        let conn = db.conn.lock().map_err(|e| e.to_string())?;
        orchestrator::load_model_config(&conn)
    };

    let result = chiptune_score::generate_next_phrase(
        &model_config.chat_api_base(),
        &api_key,
        &model_config.memory_model,
        current_last_phrase.as_ref(),
        &momentstamp,
        mood_hint.as_deref(),
    )
    .await?;

    Ok(GeneratedScorePhraseResult {
        phrase: result.phrase,
        raw: result.raw,
    })
}
