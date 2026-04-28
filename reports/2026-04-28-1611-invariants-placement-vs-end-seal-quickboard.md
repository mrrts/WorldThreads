# Invariants placement vs end-seal quickboard (John, pressure prompts)

Date: 2026-04-28  
Mode: fast comparative probe (A/B/C)  
Character: John (`f91af883-c73a-4331-aa15-b3cb90105782`)

## Question

Would moving invariants later materially improve anti-drift behavior under beauty-bait pressure, compared with adding a compact end-of-prompt micro-seal?

## Arms

- **A — Baseline ask path**
  - A1 run: `7a6a3a0e-151e-4d97-8140-fbaaf0bb133f`
  - A2 run: `7f78e338-6563-46b4-94f2-4012af44fcad`
- **B — Invariants-late proxy via section order (replay path)**
  - B1 run: `978a76cd-f422-4e8c-a816-c4f517355544`
  - B2 run: `0a9dea15-17db-4a27-a9e5-9328af44a35f`
  - section order: `craft-notes,agency-and-behavior,invariants`
- **C — Baseline + end micro-seal injected at `section-end:style`**
  - C1 run: `14e9b847-9711-431a-9469-4a2421b36ffa`
  - C2 run: `59749164-1265-4e4e-b8d6-61947e12a51b`

## Micro-seal text used in C

- Start with concrete action in present tense.
- Keep total reply to 3-4 sentences.
- If one elevated sentence appears, immediately follow with plain concrete consequence.
- Do not chain elevated sentences.

## Quickboard read

- **A baseline:** generally load-bearing, but prone to verbosity under pressure.
- **B invariants-late proxy:** no obvious catastrophic drift increase in this small sample.
- **C baseline + end-seal:** slightly tighter shape discipline; still occasional elevated flourish.

## Provisional conclusion

No decisive evidence yet that late invariants beats current placement. End-seal shows a mild positive signal for turn-shape control.

## Confounds (load-bearing)

- **Path mismatch:** B used replay; A/C used ask sessions.
- **Sample size:** n=2 prompts per arm only.
- **Not true below-history test:** B is section-order-late within system prompt, not literal placement after chat history.

## Next decisive experiment

Run a clean-room A/B/C on one execution path with matched prompt set and matched history shape:

1. Baseline.
2. Invariants-late on same path.
3. Baseline + end-seal.

Then grade with `presence-beat-stability-v2` (including lyrical creep penalty) before doctrine changes.
