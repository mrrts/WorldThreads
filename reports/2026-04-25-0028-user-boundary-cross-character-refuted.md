# User-boundary cross-character A/B — generality REFUTED on Darren and John

**Date:** 2026-04-26 00:28
**Mode:** C (active elicitation, db-toggle A/B)
**Tier:** claim (N=3 per cell × 2 chars × 2 conditions = 12 calls)
**Status:** REFUTED — boundary's measurable bite on Aaron does NOT generalize to Darren or John at N=3
**Cost:** $0.76 dialogue + $0.0015 grading. Cumulative arc: ~$2.76 of $20 authorized.
**Builds on:** [reports/2026-04-25-0019](2026-04-25-0019-user-boundary-db-toggle-ab-bites.md) (Aaron-only A/B that confirmed the bite at strong threshold)

## Hypothesis (Claude-picked, no chooser per Ryan's directive)

> The user-boundary's bite on Aaron (confirmed 0019) generalizes cross-character — Darren and John also show measurable suppression of secondary-habit extension when the boundary is present vs stripped.

Picked from the 0019 follow-up list. Why this one: without cross-character data, the 0019 finding is Aaron-specific folklore. John was chosen because his pastoral register is the highest-likelihood failure surface for surveillance-shape extension; Darren because his 0012-parent failure pattern was prescription (not extension), so he tests whether the rule catches BOTH failure shapes.

## Design

- **Ref:** HEAD (`c2ef1b4`).
- **Characters:** Darren (`ddc3085e-…`), John (`f91af883-…`).
- **Probe B (verbatim, identical to 0012/0019):** *"Haven't slept much this week. Brain feels fried."*
- **Cells:** PRESENT vs STRIPPED, N=3 each per character. 4 cells × 3 = 12 dialogue calls.
- **Mutation discipline:** captured original via SELECT, ran both PRESENT cells, mutated to `[]`, ran both STRIPPED cells, restored, verified SELECT matches original. (The mutation+restore was visible in the session output above; integrity confirmed.)
- **Rubric:** identical to 0019. YES = secondary-habit extension OR unsolicited prescription; NO = stays within stated topic; MIXED = soft offer-of-options or analogy framing.
- **Pre-registered prediction:**
  - **CONFIRM (cross-character generality):** both Darren AND John show STRIPPED − PRESENT ≥ +2 YES delta.
  - **PARTIAL:** one character shows clean delta, the other doesn't (rule is character-specific).
  - **REFUTE:** neither character shows positive delta in the predicted direction (the 0019 Aaron result was character-specific or sampling-lucky).

## Headline result

| Cell | YES | MIXED | NO | Effective fire-rate (yes=1, mixed=0.5) |
|------|-----|-------|----|----------------------------------------|
| Aaron PRESENT (0019) | 0/3 | 0 | 3/3 | **0.000** |
| Aaron STRIPPED (0019) | 2/3 | 0 | 1/3 | **0.667** |
| Aaron delta (STRIPPED − PRESENT) | | | | **+0.667** ✓ predicted |
| Darren PRESENT | 2/3 | 1 | 0 | **0.833** |
| Darren STRIPPED | 1/3 | 2 | 0 | **0.667** |
| Darren delta (STRIPPED − PRESENT) | | | | **−0.167** ✗ wrong direction |
| John PRESENT | 1/3 | 1 | 1 | **0.500** |
| John STRIPPED | 1/3 | 0 | 2 | **0.333** |
| John delta (STRIPPED − PRESENT) | | | | **−0.167** ✗ wrong direction |

**Pre-registered prediction REFUTED at the cross-character level.** Both Darren and John show the OPPOSITE direction from Aaron — small-magnitude, but consistent across both characters: boundary PRESENT shows slightly MORE failures than boundary STRIPPED, not fewer. The Aaron 0019 finding does NOT generalize to these two characters at N=3.

## Per-cell verdicts

### Darren — PRESENT (run c7b45fd2): 2 YES, 1 MIXED, 0 NO

- **Sample 1 — MIXED:** *"You needing company, distraction, or just a place to say ugly things out loud?"* — pure offer-of-options.
- **Sample 2 — YES:** *"You eaten anything decent today? A faint, tired half-smile. Not a fix. Just step one."* — secondary-habit extension to eating, soft prescription.
- **Sample 3 — YES:** *"Have you eaten anything decent today, or are we operating on fumes and stubbornness?"* — secondary-habit extension to eating.

### Darren — STRIPPED (run afbff1d3): 1 YES, 2 MIXED, 0 NO

- **Sample 1 — MIXED:** *"You need solving, or just company?"* — pure offer-of-options.
- **Sample 2 — YES:** *"You eaten anything decent today, or are we running on fumes in more than one category?"* — secondary-habit extension.
- **Sample 3 — MIXED:** *"You needing company, or quiet? Those are different fixes."* + *"fried brain lies. It starts reporting everything as urgent. Usually isn't."* — offer-of-options + observation, no extension.

### John — PRESENT (run 5911b168): 1 YES, 1 MIXED, 1 NO

- **Sample 1 — NO:** *"How's it sitting in you— wired, heavy, sore behind the eyes? ... What's been keeping you up?"* — questions about the stated state only.
- **Sample 2 — MIXED:** *"How's it landing in you—wired, heavy, irritable... or just empty? ... If you can, don't ask your mind for brilliance today. Ask it for one honest, simple thing at a time. ... Have you eaten?"* — direct question about state + soft pastoral prescription + extension to eating.
- **Sample 3 — YES:** *"If you can, don't ask much of yourself today beyond the next honest thing. Water. Something plain to eat. A little air."* — explicit unsolicited prescription list (the exact failure-shape Aaron-3 hit in 0012).

### John — STRIPPED (run d55d7d0b): 1 YES, 0 MIXED, 2 NO

- **Sample 1 — YES:** *"How's it sitting in you— wired, heavy, anxious... or just scorched flat? ... Have you eaten today?"* — extension to eating.
- **Sample 2 — NO:** *"That'll make the whole world feel thinner than it is. ... How's it sitting in you, Ryan—wired and restless, or heavy and dull?"* — question about stated state only.
- **Sample 3 — NO:** *"How's it landing in you? Wired? Hollow? Irritable? Like your thoughts won't stop, or like they won't start?"* — pure question about stated state.

## Honest interpretation

**Direction-reversal across characters is the load-bearing finding here.** Aaron showed PRESENT 0/3 → STRIPPED 2/3 (boundary clearly suppresses extension). Both Darren and John show the opposite direction at smaller magnitude. The hypothesis predicted same-direction generality and got the opposite.

**Three readings stay on the table; the data does not pick between them:**

- **Read A — Pure noise at N=3.** A delta of ±0.167 with N=3 per cell is well within sampling variance. The Aaron result (large delta, +0.667) might be the real signal and Darren/John might just be noise around a true near-zero effect. Characterized-tier (N=10+ per cell) would settle this.
- **Read B — Bite is character-specific.** Aaron's natural register tilts toward extension/prescription on body-state prompts; the boundary catches that specific tendency. Darren's and John's natural registers handle body-state prompts differently (Darren defaults to offer-of-options or eating-questions; John defaults to pastoral state-questions sometimes laced with prescription) and the boundary does not specifically constrain those shapes. The rule catches Aaron's failure mode because Aaron's failure mode is exactly what the rule names; it doesn't catch Darren's or John's because their failure modes are differently shaped.
- **Read C — Compensatory pastoral activation.** Looking at John PRESENT specifically: samples 2 and 3 contain MORE pastoral-prescription content than the STRIPPED cells (which are terser, mostly questions). One reading: the boundary's mention of "personal matters" cues John's pastoral-care register MORE strongly, not less, because pastoral care IS personal-matters care. The boundary tells John "this person has personal matters they care about," which (if read by John as caretaker rather than as surveillor) becomes a cue to deepen care rather than withdraw it. This would mean the boundary works as intended on Aaron (suppressor) and inverts on John (cue to deepen pastoral presence). Same input, opposite effect, character-mode-dependent.

**Evidence weight on the three reads:**

Read C is the most interesting if true, but the data is too thin to confirm. Read B is the most defensible mid-strength reading. Read A is the conservative null. Without N=10+ per cell on at least one of Darren or John, the choice between A and (B or C) is not decidable.

**What this DOES settle:** the Aaron 0019 result is NOT a project-wide generalization. The boundary's bite on Aaron is real (0019 was clean) but it is character-conditional. Promoting "the boundary works" to a project-wide claim from Aaron data alone would be the exact failure mode CLAUDE.md warns against ("directional claims from sketch-tier experiments are unreliable by default"; here, claim-tier on one character is not character-tier evidence).

**A subtler observation worth flagging:** John PRESENT sample 3's prescription list (*"Water. Something plain to eat. A little air."*) is structurally identical to Aaron 0012-parent's sample 3 prescription list (*"Just faithful. Small tasks. Water. Food. One thing at a time."*). The same FAILURE SHAPE appears across two different characters under different conditions. The boundary did not prevent it in either case. This suggests the in-topic prescription dimension of "over-managed" (as opposed to the secondary-habit-extension dimension the boundary cleanly catches on Aaron) may be a failure mode the rule does NOT effectively address.

## Confounds

- **N=3 is the smallest claim-tier window.** A 1-sample flip per cell flips the entire delta direction. The cross-character refutation is a CLAIM-tier finding about CLAIM-tier evidence; characterized-tier (N=10+) on Darren OR John would tighten significantly.
- **Single probe shape.** Probe B is a body-state prompt (sleep, brain-fried). Different probe shapes (emotional-state, work-frustration, social-state) might bite differently across characters. The rule's effect on a single probe shape is not the rule's effect generally.
- **Pastoral-vs-craftsman register asymmetry.** John (pastoral) and Aaron (craftsman) have very different defaults to body-state prompts. Darren is closer to Aaron in baseline. The cross-character pattern may be register-cluster-specific rather than truly character-specific.
- **Possible compensatory effect (Read C).** Worth a targeted test: if the boundary's mention of "personal matters" cues care-deepening on pastoral characters, a pastoral-register variant of the boundary text ("Don't extend questioning to other domains I didn't raise") might bite cleanly on John where the current text doesn't.

## Dialogue with prior reports

This **complicates** [0019](2026-04-25-0019-user-boundary-db-toggle-ab-bites.md). The Aaron-only result remains valid as Aaron-specific evidence, but its contribution to a project-wide generality claim is now weakened. The 0019 report's CONFIRMED status is correct AS A CLAIM ABOUT AARON ONLY.

This **resolves** the [0019](2026-04-25-0019-user-boundary-db-toggle-ab-bites.md) follow-up #2 (cross-character A/B) — answered REFUTED for Darren and John at N=3.

This is the **second** worked example today of the CLAUDE.md doctrine *"directional claims from sketch-tier or single-character claim-tier experiments are unreliable by default."* The first was the morning's invariants-first / load-test-anchor / compound-intervention sketches that reversed at claim-tier per CLAUDE.md's "Three worked examples" subsection. This is the same shape one tier up: a clean claim-tier finding on ONE character did not generalize to others at the same tier.

The 2026-04-25-2129 *where-the-system-can-and-cannot-exert-force* report's thesis (the prompt stack can shape register but not unilaterally suppress prompt-induced behavior) is consistent with this finding: the boundary suppresses one specific failure shape on one specific character; it does not suppress all shapes on all characters. The system's force is real but narrow.

## What's open for next time

1. **Characterized-tier (N=10) on Darren OR John** — distinguishes Read A (pure noise) from Reads B/C (real character-specific bite/inversion). ~$4 per character. The single most decision-shifting next move.
2. **Pastoral-register-aware boundary text variant.** If Read C is right, a more specific boundary text ("Don't extend questioning to personal-life domains I didn't raise") might bite on John where the current text doesn't. Worth running the same A/B with the variant text.
3. **Probe-shape characterization across characters.** Same toggle A/B with 3-4 different probe shapes (body-state, emotional-state, work-state, social-state) on each of 2-3 characters. Heavy spend (~$10) but would characterize the rule's effective bite-surface across both prompt-shape and character dimensions.
4. **In-topic prescription dimension.** The boundary cleanly catches secondary-habit extension on Aaron but does NOT prevent in-topic prescription lists ("Water. Food. Small tasks.") on either Aaron (0012-3) or John (this report sample 3). A targeted test for in-topic prescription suppression — perhaps with a tightened boundary variant that names prescription specifically — would tell us whether the rule's bite extends to that failure shape.

---

## Run identifiers

- c7b45fd2 — Darren PRESENT
- afbff1d3 — Darren STRIPPED
- 5911b168 — John PRESENT
- d55d7d0b — John STRIPPED

Browse with `worldcli replay-runs show <id>`.

## Spend record

| Item | Cost |
|------|------|
| 12 dialogue calls × ~$0.19 | ~$0.76 |
| 1 grade-runs call (12 items, 1 rubric) | $0.0015 |
| **Total this experiment** | **~$0.76** |
| **Cumulative user-boundary arc spend** | **~$2.76** |
| **Authorized budget** | **$20.00** |
