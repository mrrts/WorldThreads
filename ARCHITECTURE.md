# Architecture Overview

## High-level components

1. Storage Layer (local-first)

- Append-only transcripts
- World state (authoritative snapshot)
- World events (append-only summaries)
- Character state & canon
- Memory artifacts (facts, summaries, hooks)
- Retrieval indexes (FTS + optional vector index)

2. AI Orchestration Layer

- Dialogue call (primary, higher quality)
- World Tick call (cheaper, strict JSON)
- Memory maintenance calls (cheap, periodic):
  - canon update (conservative)
  - thread summary refresh
  - embeddings generation (optional)

3. UI Layer (agent has freedom)

- Character Threads (two)
- World Feed / Timeline of events
- World/Character editors
- 3D Scene view (Three.js) showing “presence”

## Core runtime loop: Dialogue

On user message in a character thread:

1. Persist user message.
2. Optionally run world tick (if trigger policy says yes).
3. Retrieve context:
   - recent thread turns (recency window)
   - relevant memories (FTS and/or vector)
   - character canon sheet + character state
   - world state + recent world events
4. Build prompt + call Dialogue model.
5. Persist assistant message.
6. Update indexes (FTS always, vectors optional).

## Core runtime loop: World Tick

Runs on defined triggers and produces:

- 1–3 short event summaries (world_events)
- minimal state patch updates (world_state + character_state)
- 1–3 “hooks” meant to surface later in chat

The tick never generates full hidden conversations; it generates outcomes and deltas only.

## Suggested separation of concerns

- “Truth” = local DB (never derived-only).
- “Memory” = derived artifacts with provenance back to messages/events.
- “AI” = stateless functions operating over small, curated inputs.

## Performance and cost discipline

- Hard cap input sizes.
- Cache by hashing inputs for tick calls.
- Incremental indexing (only embed new chunks).
- Keep world state symbolic and patch-friendly (enums + small scalars).
