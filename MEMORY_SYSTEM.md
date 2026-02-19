# Memory System

## Goal

Make characters feel like they remember everything, while sending only small, relevant context to the model.

## The 3-layer memory approach (per character)

1. Raw transcript (append-only): every message ever.
2. Canon sheet (small, authoritative): identity/voice/commitments/world truths.
3. Recall (retrieval): small set of relevant prior snippets.

## Canon sheet rules

- Canon is conservative. Promote a new “fact” only when:
  - it is explicit, confirmed, or repeated; OR
  - user explicitly edits/approves; OR
  - it’s a direct consequence of world tick outcomes.
- Store provenance for every canon addition (source message/event ids).
- Provide user controls to edit/retcon canon.

## Retrieval strategy

V1 (simple):

- SQLite FTS over messages + world events + canon fields.
- Heuristics: boost recency, same thread, named entities, hooks.

V2 (stronger):

- Add embeddings + ANN search for semantic recall.
- Hybrid: merge results from FTS + vectors and rerank.

## Summaries

Maintain compact rolling summaries:

- Per thread: “What’s happened between user and this character”
- World recent events: last ~5–10 event summaries
- Optional: relationship summary (user ↔ character, character ↔ character)

Summaries are updated periodically (e.g., every N user messages) to control cost.

## What goes into a dialogue prompt

- Character canon sheet (small)
- Character state (mood/goals/open loops)
- World state (small snapshot) + recent world events
- Recency window (last ~10–30 turns)
- Retrieved snippets (top K, small chunks)

Never include entire history.

## Hooks

World ticks produce “hooks” that are:

- short, searchable strings
- designed to surface in later dialogue naturally
  Example: “Ion hiding torn map corner in coat”
