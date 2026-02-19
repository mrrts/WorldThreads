# Prompting Contracts (no provider-specific formatting)

This file describes the required behaviors for model prompts. Implementation may vary.

## A) Dialogue Prompt Contract (Character Reply)

Inputs:

- Character canon sheet (authoritative)
- Character state (mood/goals/open loops)
- World bible (high-level rules only)
- World state snapshot + recent world events
- Retrieved memories (snippets with provenance)
- Recent turns in this character's thread

Requirements:

- Stay in character and obey canon sheet.
- Treat world state as shared truth; do not contradict it.
- Incorporate relevant world events naturally (no exposition dumps).
- Maintain a "text message" feel: concise, vivid, human.
- If a memory is uncertain, ask a question rather than hallucinating.
- Never mention internal systems like "world tick" or "retrieval."

Output:

- Assistant message text only (no JSON), unless the app chooses a structured format.

## B) World Tick Prompt Contract (Off-screen Simulation)

Inputs:

- Compact world state + character states
- Recent world events summaries
- Optional last user message / last thread highlights

Requirements:

- Do NOT generate hidden multi-turn conversations.
- Output ONLY:
  1. short event summaries
  2. minimal state patch ops
  3. hooks for later dialogue
- Be conservative about new lore.
- Keep events tied to existing arcs/goals.

Output: strict JSON with keys:

- events: string[]
- state_patch: object (dotpath -> value) OR list of ops
- next_hooks: string[]

## C) Memory Update Prompt Contract (Canon + Summary Maintenance)

Runs periodically:

- Update thread summary compactly.
- Propose canon updates conservatively (with provenance).
- Optionally propose merging/closing open loops.

Output: strict JSON:

- updated_summaries
- proposed_canon_additions (with sources)
- proposed_open_loop_changes
