# Current-location consumer audit — followup to the plumbing arc

**Filed:** 2026-04-29 ~19:55, after `e045082`'s comms note + `02588e7`'s auto-decide-comms memory closed the day's plumbing-and-doctrine arc.

**Purpose:** sweep the repo for any remaining `current_location` consumer paths that pass `None` where they shouldn't, or that lack the parameter entirely. Audit ran cleanly on the load-bearing paths; this report names three minor findings worth keeping visible without shipping fixes today.

## Audit summary

| Path | Status |
|---|---|
| 7 dialogue call sites in `chat_cmds` + `group_chat_cmds` | ✅ plumbed (`603f03d`) |
| `run_dialogue_streaming` | ✅ plumbed (Codex 15:03) |
| `run_narrative_with_base` (solo + group) | ✅ both plumbed |
| `run_proactive_ping_with_base` | ✅ plumbed |
| `build_scene_description_messages` | ✅ covered by Codex's 4 location-correction tests |
| Imagined-chapter | ✅ chapter-owned `scene_location` (Codex 15:48) |
| Consultant | ✅ no scene-state by design (backstage register) |

The plumbing arc closed thoroughly across the load-bearing paths. The remaining findings below are minor and can be left as-is or addressed at any future maintenance pass.

## Three minor findings

### Finding 1 — `video_cmds.rs:94` hardcodes `None` for group video

```rust
let current_loc = if is_group {
    None
} else {
    get_thread_location(&conn, &thread_id).ok().flatten()
};
```

The comment at `video_cmds.rs:314` reads: *"Videos are only generated from individual chats today (the frontend guards on activeCharacter), so no additional cast or names map."* So the `None` branch is currently dead code — the frontend never invokes group video.

**Risk if the frontend guard ever loosens:** group video would silently fall back to `DEFAULT_CHAT_LOCATION = "Town Square"` (the same silent-default failure mode the plumbing fix at `603f03d` closed for dialogue).

**Surgical fix (if/when warranted):** replace the `None` branch with `get_group_chat_location(&conn, &group_chat_id_or_lookup_via_thread).ok().flatten()`. Defense-in-depth; matches the pattern of every other path. Same shape Codex chose for `run_dialogue_streaming` at 15:03.

**Decision today:** leave as-is. Documented; the path is dormant; the next maintenance pass on video generation can address it without urgency.

### Finding 2 — `run_dream_with_base` lacks `current_location_override`

The function signature has no `current_location_override: Option<&str>` parameter. Dreams may legitimately not need scene-state per CLAUDE.md's dream doctrine (*"things transform, locations shift, the impossible is unremarked"*) — but if the user wants to anchor a dream to *"I fell asleep on the patio,"* there's currently no way to pass that information to the dream-generation prompt.

**Status:** **extension candidate, not a bug.** The plumbing arc was about populating an existing parameter with the right value, not about adding parameters that don't exist.

**Decision today:** leave as-is. If a future feature genuinely needs location-anchored dreams ("the dream picks up the location's quality even as it transforms"), the parameter can be added then, plumbed from the call site at `chat_cmds.rs:1778`. Until that need surfaces, the omission is not a defect.

### Finding 3 — `generate_character_journal` lacks `current_location_override`

Similar to Finding 2. Journal entries are first-person reflective writing — they could plausibly benefit from *"I'm writing this on the patio after the visit"* anchoring — but the function signature doesn't accept location.

**Status:** **extension candidate, not a bug.** Same reasoning as Finding 2.

**Decision today:** leave as-is. Lower priority than Finding 2 because journals are even more abstracted from immediate scene-state than dreams are.

## What this audit confirms

- The 7-call-site plumbing fix at `603f03d` plus Codex's parity sweep at `15:03 / 15:26 / 15:48 / 16:07` covered every load-bearing path that takes `current_location_override` today.
- The function-level regression test at `b2c9543` joins Codex's 4 location-correction sibling tests (narrative / streaming-dialogue / scene-description / proactive-ping) for **5 dialogue-path tests + 6 location-helper tests = 11 guards**.
- The remaining gaps are either (a) dormant-path inconsistencies in frontend-guarded code or (b) extension candidates for parameters that don't exist yet.

## Composition with the day's arc

This audit is the structural audit Claude offered as chooser-option-2 throughout the afternoon and finally ran tonight. It confirms the plumbing arc's empirical scope: every path that currently takes `current_location_override` is plumbed correctly. The arc closes legibly.

## No follow-up required

This report is intentionally documentary, not a queued task. The three findings are recorded so any future maintenance pass surfaces them naturally; none are urgent enough to ship as fixes today, and each has a clean local rationale.

The plumbing arc closes here.
