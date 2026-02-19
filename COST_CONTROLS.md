# Cost Controls & Token Discipline

## Principles

- Never re-send whole histories.
- Prefer summaries + deltas + retrieval.
- Off-screen simulation produces short outcomes, not dialogue.

## Hard caps (recommended defaults)

- Dialogue context:
  - last turns window: 10–30 messages
  - retrieved snippets: 6–12 chunks
  - recent world events included: 2–8
- World tick:
  - events max: 3 (<=2 sentences each)
  - patch ops max: 12
  - hooks max: 3

## Scheduling

- World tick runs at most once per user message by default.
- Summaries update every N user messages (e.g., 8–20) per thread.
- Embeddings generated only for new content and batched.

## Caching

- Hash tick inputs; skip on cache hit.
- Optional prompt caching by provider if available; otherwise local caching of assembled prompt segments.

## Model tiering

- Use a cheaper model for:
  - world ticks
  - summary/canon maintenance
  - tagging/metadata
- Use a better model for:
  - character dialogue

## “Budget mode” UX

- Provide a toggle:
  - Standard: ticks after messages + occasional idle
  - Budget: ticks only on explicit triggers, summaries less frequent
