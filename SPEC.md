# Project: WorldThreads (working title)

## One-sentence pitch

A local-first, BYOK desktop app where you define a world, then chat in continuous iMessage-like threads with two vivid characters rendered in Three.js—both share a unified world-state and continue “living” off-screen via compact summarized world ticks, preserving long-term canon without high token costs.

## Core user fantasy

- “I can enter a world.”
- “These two characters feel real, distinct, and consistent over months.”
- “I can pick up each thread anytime, like texting a friend.”
- “They remember us—and each other—without the app becoming expensive.”

## Non-goals

- Not a multiplayer app.
- Not a full 3D game engine; 3D is atmosphere + presence, not gameplay-first.
- Not a cloud account system; user-owned keys and local storage.

## BYOK requirement

User provides their own LLM API key(s). The app never ships with a shared key.

## App pillars

1. **Continuous Threads**: One lifelong chat thread per character (like iMessage).
2. **Unified World-State**: Both characters share a single authoritative world state (time, location, facts, ongoing arcs).
3. **Canon Stability**: Characters remain consistent via a “Character Canon Sheet” plus conservative updates.
4. **Off-screen Simulation**: Characters can talk/act off-screen, but the app stores only short summaries + minimal state patches.
5. **Token Discipline**: Retrieval + summaries + deltas; never replay full histories.

## Minimum lovable v1

- World Bible editor (text + structured fields)
- Two character profiles with strong “voice”
- Per-character continuous thread UI (agent chooses exact UI)
- World Feed: shows summarized world events
- Dialogue generation with memory retrieval
- World tick generation (small, structured output) on triggers
- Local persistence (SQLite suggested) + optional encryption

## Nice-to-have v1.1+

- Embeddings/vector retrieval (hybrid with FTS)
- User-editable canon + “retcon” tools
- Character-to-character “hooks” surfacing naturally in chat
- Scene interactions generating “perception events”
