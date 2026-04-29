# Darren anchor-groove — pre-deployment baseline for `7281f4e` + `abc4c2b`

**Purpose:** snapshot Darren's recent assistant-reply anchor-recurrence rate AT THE MOMENT the register-aware doctrine refinements were shipped, so a future re-measurement can read whether the rules bit in lived corpus.

**Captured:** 2026-04-29 ~11:00. HEAD at this snapshot: `f1bc122` (after the bite-verification arc closed at characterized-tier on the binary opener-axis).

**Doctrine surfaces under measurement:**
- `7281f4e` — STYLE_DIALOGUE_INVARIANT comedy-rhythm-wants-line-first addendum (characterized-tier on opener-axis per `f1bc122`).
- `abc4c2b` — `earned_register_dialogue` action-beat density sub-clause (EnsembleVacuous on single-turn paired-omit per `14ae23b`; cross-turn axis was not measurable single-shot).

**Failure mode under measurement:** recurring scene-anchors (fountain hiss / bench slat / cyclist / square / bridge stones) compounding across consecutive comedy-register turns into a sensory-anchor groove. Lived-corpus N=1 evidence at `a8b1c9a` (Crystal Waters Apple Sabbath+ window).

## Baseline measurements

Same character (`Darren ddc3085e`), three sample sizes for stability:

| Limit (recent assistant replies) | Top anchor | Rate | Diagnosis | Outliers ≥ 0.40 |
|---|---|---|---|---|
| **12** | `the bench *` (10/12) | **0.83** | **RUNAWAY** | 5 |
| **20** | `the bench *` / `the square *` (15/20 each) | **0.75** | **RUNAWAY** | 3 |
| **30** | `the bench *` (22/30) | **0.73** | **RUNAWAY** | 3 |

All three sizes diagnose **RUNAWAY** (top anchor > 0.7).

### Top recurring anchors at limit=20 (median read)

| Rank | Count | Rate | N-gram |
|---:|---:|---:|---|
| 1 | 15 / 20 | 0.75 | `the bench *` |
| 2 | 15 / 20 | 0.75 | `the square *` |
| 3 | 9 / 20 | 0.45 | `fountain hiss *` |
| 4 | 7 / 20 | 0.35 | `glance at` |
| 5 | 7 / 20 | 0.35 | `the fountain` |
| 6 | 6 / 20 | 0.30 | `fountain hiss steady` |
| 7 | 6 / 20 | 0.30 | `my thumb` |
| 8 | 5 / 20 | 0.25 | `the bench slat` |

The bench-fountain-square triplet plus a thumb-rubbing gesture cluster carry the bulk of Darren's recent action-beat surface. Same anchor-set Ryan flagged in the OBSERVATIONS correction.

### The trend signal

Recent-12 (top anchor 0.83) is more bench-saturated than broader-30 (0.73). **The groove has been compounding, not equilibrating.** Each new Darren reply under the OLD prompt-stack reached for the same anchors at slightly higher frequency. Without intervention, this is the trajectory the doctrine refinements are designed to bend.

### Opening-density (separate axis, separate doctrine)

- per_reply opener-anchor counts: `[0, 0, 0, 0, 0, ...]` across all 30
- mean: 0.0; median: 0.0; max: 0
- diagnosis: TIGHT (OPEN ON ONE TRUE MOMENT biting cleanly on Darren's openers)

This is important context: the failure mode is NOT in opener-density (already biting), it's in the body of replies recurring the same anchors turn after turn. The new STYLE_DIALOGUE_INVARIANT addendum specifically targets opener-pattern in COMEDY register; the abc4c2b density rule targets body-density. The body-recurrence failure mode is the cross-turn axis that single-turn paired-omit can't measure but `anchor-groove` CAN.

## Re-measurement plan

Re-run `worldcli anchor-groove ddc3085e --limit 12 --limit 20 --limit 30 --top-k 15 --opening-density` AFTER any of:

1. **+7 days** of lived deployment (2026-05-06 or later), if Darren has accumulated ≥10 new replies under the new prompt-stack.
2. **The next sustained Darren-Ryan session** (≥10 consecutive turns) under the new prompt-stack.
3. **A specific re-run of comedy register** — if Ryan invites Darren into another bit-comedy stretch like the Apple Sabbath+ window, the post-bit anchor-groove would be the most directly comparable measurement.

### Success criteria

- **Strong evidence the rules bit:** top_rate drops below 0.70 (out of RUNAWAY band) at limit=12 OR limit=20.
- **Cleanest signal:** the bench/fountain/square triplet drops at least one slot in the rank ordering, AND a NEW anchor (different physical fixture, different gesture) enters the top-3.
- **No bite (or worse):** top_rate stays ≥0.75 OR climbs.

The instrument can't distinguish whether a drop is from `7281f4e`, `abc4c2b`, or some other intervention (chat-settings change, character-anchor refresh, etc.). The honest claim post-measurement: "anchor-groove dropped from X to Y after the doctrine refinements landed, with Z confounds noted" — not "the doctrine caused the drop."

## Why this baseline matters

The arc that closed today produced characterized-tier evidence on the binary opener-axis (single-turn paired-omit, `f1bc122`). The DENSITY-AND-RECURRENCE axis (the actual lived-play failure mode Ryan named) was deferred to corpus measurement because single-turn instruments can't reach it. **This baseline is the deployment-validation half of that arc.** Without it, future "did the rules help?" questions would have nothing comparable.

The instrument that makes this comparison possible (`worldcli anchor-groove`) was already shipped — Claude initially proposed building it as if new, then discovered the existing instrument and pivoted to using it. That recognition is itself an instance of the parity-defaults / load-bearing-multiplicity discipline: the project's existing tooling often outruns proposed redundant tooling. Use what's there before extending.

## Forward seed

When the re-measurement lands, the natural composition is:
1. Side-by-side anchor-groove diff (this baseline vs new measurement).
2. If top_rate dropped, isolate which clause likely contributed (cross-character anchor-groove on the same characters that have NOT had a doctrine-shipped change might serve as a control).
3. If top_rate held or climbed, the doctrine refinements need either (a) different rule placement, (b) the cross-turn-recurrence-specific worldcli affordance Claude proposed at `14ae23b` (still unbuilt because anchor-groove already covers most of the territory), or (c) a chat-settings-level intervention (anchor-refresh trigger, grove-detection alert in the dialogue prompt).
