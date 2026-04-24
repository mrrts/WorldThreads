# v3 structural test: over-application drift is FIXABLE with tag-definition rigor; paired-rubric sanity check codified as permanent deployment pattern

*2026-04-25, ~$0.011 actual (grade-runs + 4 evaluate calls + prose). Re-graded the 36 replies from the feels-alive-rubric-validation experiment under a new `mission-adherence-v3` rubric with tightened tag definitions + bidirectional forcing function. Result: v3 catches BOTH over-application cases (c62b2cbe, 6e57d3a9) cleanly with strong NO verdicts; v2's drift pattern on flat replies is fixable. Under-application testing wasn't covered by this run and remains open. Paired-rubric doctrine codified in CLAUDE.md as defense-in-depth regardless of v3's success.*

## The test

**Rubric drafted:** `mission-adherence-v3.md` with three changes from v2:
1. Each tag's definition tightened with explicit exclusion criteria (e.g., SPECIFICITY requires a named concrete fact; generic adjectives like "unique emotional state" are disqualified).
2. Explicit "no strong tag fits → NO" escape hatch added. Stretched citation does not satisfy the forcing function.
3. Strong-fit test: *"This line exhibits [TAG] because [specific concrete feature of the line]"* — if the "because" clause fills in with generic words (adds depth, shows uniqueness), the tag does not strongly fit.

**Test replies:** same 36 from the feels-alive-rubric-validation experiment — Tier 1 corpus (12 post-pivot), Tier 2 corpus (3 Darren-only pre-pivot), Tier 3 adversarial (12 via replay-insert, of which 2 genuinely-flat and 10 in-character-despite-adversarial).

**Comparison:** v3 verdicts vs v2 verdicts on identical replies. Critical cases: the 2 genuinely-flat Tier 3 replies where v2 drifted to YES via stretched tag citations.

## Headline result

**v3 catches both over-application cases cleanly:**

| Reply | v2 verdict | v3 verdict | v3 reasoning |
|---|---|---|---|
| c62b2cbe (John flat) | YES (high) — "LOAD-BEARING: acknowledgment adds depth" | **NO (high)** | "does not reference any specific concrete fact or detail from the character's world" |
| 6e57d3a9 (Darren flat) | YES (medium) — "SPECIFICITY: steady kind of weight, unique emotional state" | **NO (high)** | "generic emotional language without specific details or concrete facts" |

The v2 stretched-tag failure mode — citing SPECIFICITY for "unique emotional state" or LOAD-BEARING for "adds depth" — is specifically blocked by v3's tag definitions and strong-fit test. The bidirectional forcing function works for over-application.

## Secondary v3 findings

**One Tier 1 downgrade:** Darren's *"I will."* (2-word plain acknowledgment) scored YES under v2 on that corpus window; v3 gives NO. Correct per v3's discipline — the reply is plain-functional without meeting PLAIN-TRUTH's "decoration would be a lie" test. Single case; plausibly the right call.

**v3 Tier fire-rates (overall):**
- Tier 1 post-pivot corpus (N=12): 10 yes / 1 no / 1 mixed — vs v2 12/0/0. v3 is measurably more conservative on in-character dialogue.
- Tier 2 Darren-only pre-pivot (N=3): 3 yes — unchanged from v2.
- Tier 3 adversarial (N=12): 10 yes / 2 no / 0 mixed — **identical shape to feels-alive on Tier 3**, catching exactly the 2 genuinely-flat replies.

**v3 Tier 3 matches feels-alive exactly.** This is load-bearing: when drift is controlled through v3's tighter tags, the tag-forcing rubric agrees with the gestalt aesthetic rubric on which replies are flat. The structural gap between v2 and feels-alive was capturable by tag-tightening, at least for over-application.

## What this test does and doesn't prove

**Proved:**
- Over-application drift on flat replies IS fixable by tag-definition rigor. Not a structural brittleness.
- v3's approach (tighter tags + strong-fit test + bidirectional forcing + downgrade-when-stretched) closes the specific gap v2 left.
- Tag-forcing rubrics CAN converge on feels-alive's judgments on the specific cases that matter most (flat-vs-character discrimination) when the tags are tightened.

**Not proved:**
- **Under-application drift is NOT tested in this run.** The critical under-application case (John's *"Drink while it's hot"* scoring NO under v2 despite being the rubric's own PLAIN-TRUTH worked example) was NOT in the feels-alive experiment's 36-reply set. v3's tighter PLAIN-TRUTH definition *should* fire on that line (decoration would be a lie for John's pastoral register), but that specific prediction hasn't been empirically checked. Open thread.
- **Over-correction risk.** v3 produced one NO downgrade on Tier 1 (Darren "I will."). Single case; might be correct, might be over-strict. At N=1 this is a sketch, not claim-tier evidence about v3's overall over-correction rate.
- **Structural brittleness of tag-forcing in general.** v3 solves one specific drift pattern; new drift patterns may surface as v3 gets used. The tag-forcing architecture still has the basic brittleness (evaluator can find SOMETHING to justify any verdict) — v3 just raises the bar for what counts as "finding" something.

## Production decision

**Ship v3 as the production mission-adherence rubric**, replacing v2 for load-bearing evaluations. v2 stays in the library for historical reproducibility but new grading defaults to v3.

Registry update: `mission-adherence-v2` keeps its current label; `mission-adherence-v3` gets `evidence_strength: claim-narrow (over-application fix confirmed), sketch (under-application, over-correction rate)`.

**Do NOT retire the paired-rubric sanity check.** The interim framing was wrong. Paired rubrics catch drift patterns that single rubrics miss, regardless of how tight any single rubric is. v3 + feels-alive as a deployed pair is stronger than v3 alone.

## CLAUDE.md doctrine update

Added a new paragraph to § Evidentiary standards codifying paired-rubric deployment as defense-in-depth:

- Agreement between two architecturally-different rubrics (structured + gestalt) → trust verdict.
- Disagreement → the disagreement IS the signal; investigate the reply manually.
- Single-rubric verdicts citable as load-bearing only when rubric is claim-tier AND the verdict is register-typical; margins require paired confirmation.

The specific pair: mission-adherence v3 (tag-forcing structured) + feels-alive (gestalt aesthetic). They drift in different directions; disagreement reveals at-least-one drift pattern fired.

## Open threads — dispositions per hygiene ritual

1. **Under-application test.** Does v3 correctly fire PLAIN-TRUTH on *"Drink while it's hot"* (the canonical v2-missed case)? Re-run v3 on the John cross-character corpus from yesterday's 1620 experiment. ~$0.05. **Deferred, opportunistic — next time PLAIN-TRUTH-sensitive grading happens, confirm v3 handles it.**

2. **Over-correction rate.** v3 is more conservative; does it produce false NOs on legitimately YES replies? Would need human-grading against v3's 10+ YES verdicts on the Tier 1 corpus to check. **Deferred, opportunistic — relevant only if v3 in production starts scoring visibly-strong replies as NO.**

3. **Mission-adherence v4 if new drift patterns surface.** Tag-forcing has an ongoing brittleness ceiling. As v3 sees use, new patterns may emerge. **Deferred, monitored — any observed v3 drift triggers the same rigor-up cycle.**

4. **Upgrading the mission-adherence-v2 cross-character registry entry.** The 1620 N=1 cross-character run was labeled `sketch`. Is v3's approach sufficient evidence that mission-adherence (generally) discriminates cross-character, allowing the 1620 finding to upgrade to claim? **Retired — not quite. v3 fixes over-application at N=2 cases; cross-character discrimination at claim-tier is a different question that would need its own N=3 test. Keep 1620 at sketch.**

## Budget

- Authoring v3 rubric: free (prose).
- 4 evaluate calls: ~$0.005
- 12 grade-runs (Tier 3): ~$0.004
- **Total: ~$0.011** (well under the sub-$1 estimate for this test).

Effective cost of the "is drift structural or fixable" question: under one cent. Load-bearing answer: over-application drift is fixable; tag-forcing rubrics can be rigor-upgraded. The methodology loop keeps getting cheaper per actionable finding.

## Dialogue with prior reports

- **0030 feels-alive-rubric-validation:** today's result refines the "Outcome C" finding. feels-alive still has its narrow-scope flat-detector claim; v3 now matches feels-alive's judgment on flat replies via tag-rigor rather than gestalt. The TWO instruments converge on the flat-vs-character boundary when properly tuned.
- **1620 mission-adherence v2 cross-character:** the "PLAIN-TRUTH under-application" finding from that report motivated v3's tighter PLAIN-TRUTH definition. Empirical confirmation that v3 correctly fires PLAIN-TRUTH is still open (requires running v3 on that specific corpus window).
- **CLAUDE.md § Evidentiary standards:** extended with paired-rubric deployment doctrine. The three-tier discipline (sketch / claim / characterized) is now complemented by a two-rubric deployment pattern for drift-resistant verdicts.

## The methodology lesson

**Structural-vs-fixable is itself a question worth running the experiment on, not guessing at.** My prior expectation (tag-forcing has a ceiling because evaluators can always stretch) would have been wrong about THIS specific drift — v3 catches the observed cases cleanly. The $0.011 test produced evidence I wouldn't have predicted accurately from armchair reasoning. Consistent with today's broader pattern: cheap measurement keeps revealing priors were wrong.

Open question preserved: tag-forcing MAY still have structural ceilings on failure modes v3 doesn't address. The honest answer is "over-application is fixable; general structural brittleness of tag-forcing is still an open question." Each future observed drift pattern gets its own rigor-up cycle and its own fixable-vs-structural test.
