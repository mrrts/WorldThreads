//! Shared memory-weathering descriptors.
//!
//! Retrieved memories (vector-search hits, cross-thread recent blocks)
//! aren't flat bullets with equal weight — they should read with their
//! actual grain. Recent = sharp, clear, vivid. Older = softened, fuzzy
//! at the edges, mostly-the-feeling. Much older = almost a rumor the
//! character tells themselves.
//!
//! This reshapes how the model writes with the memories: instead of
//! recalling every stored detail pristinely, it naturally hedges on
//! older ones (*"I think it was the pier, maybe '08..."*), because
//! the frame its receiving the memory through is already weathered.

/// Produce a short evocative descriptor of how a memory should feel at
/// recall time, given its age. Falls back to "recently" on parse error.
pub fn weathering_label(created_at_iso: &str) -> &'static str {
    let Ok(dt) = chrono::DateTime::parse_from_rfc3339(created_at_iso) else {
        return "recently";
    };
    let now = chrono::Utc::now();
    let mins = now
        .signed_duration_since(dt.with_timezone(&chrono::Utc))
        .num_minutes();
    if mins < 0 || mins < 60 {
        "vivid — just now"
    } else if mins < 6 * 60 {
        "sharp — earlier today"
    } else if mins < 48 * 60 {
        "still clear — yesterday or so"
    } else if mins < 14 * 24 * 60 {
        "softened — days back"
    } else if mins < 60 * 24 * 60 {
        "fuzzy at the edges — weeks back"
    } else if mins < 180 * 24 * 60 {
        "mostly the feeling now — months back"
    } else {
        "almost a rumor to yourself — long ago"
    }
}
