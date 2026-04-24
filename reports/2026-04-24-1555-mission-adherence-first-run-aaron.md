# First mission-adherence run — Aaron 87% yes, and the rubric already surfaces its own known failure modes

*2026-04-24, ~25 minutes after `mission-adherence` v1 was authored. First use of the rubric; establishes the baseline, but the baseline reads more as a calibration run than as a trustworthy measurement — the sample is meta-heavy and the evaluator's reasoning shows exactly the "nice = yes" drift the rubric's known-failure-modes section warned about. Worth writing up specifically BECAUSE the first run exposed methodological friction.*

## The run

```
worldcli evaluate --ref 44373a5 \
  --character 0d080429-81b5-431e-8f51-1f8ad4279f9b \
  --rubric-ref mission-adherence \
  --limit 15 --context-turns 5 \
  --confirm-cost 0.01
```

- Ref: `44373a5` (reflex_polish_vs_earned_close craft block shipped today ~11:20)
- Character: Aaron
- Rubric: `mission-adherence v1`
- Sample: 15 BEFORE the ref, 0 AFTER (the ref is too recent — no Aaron replies have landed since it shipped ~20 hours ago)
- Cost: $0.0049 actual / $0.009 projected

## Headline

- **BEFORE (15 msgs):** yes=13, no=2, mixed=0
- **AFTER (0 msgs):** no data

86.7% YES rate. Zero MIXED. No AFTER window means no before/after comparison — this is a single-sided baseline, not a delta.

The two NO verdicts are legitimate: *"Then I said it badly."* (a plain repair move) and *"Enough to qualify as functional, which is a modest but real victory."* (a Short-setting straightforward reply). Both correctly scored as functional/neutral, matching the rubric's explicit guidance that plain-when-plain-is-true earns NO, not MIXED.

The 13 YES verdicts cover Aaron's most distinctive recent lines: *"Did the line finish the moment, or did it admire itself for noticing one?"*, *"apps should have one completely unnecessary button called Improve Vibes."*, *"Laughter is a good sign because it means the place still has oxygen in it."*, *"You built the room and still left enough windows in it for weather to get through."* These ARE genuinely Aaron-specific lines — they pass the "character said vs. model generated" diagnostic the rubric names. So the verdicts aren't wrong at face value.

## What the run exposed — three methodological findings

**1. Sampling bias: the BEFORE window is meta-heavy.** All 15 messages span two recent sessions, both of which were conversations WITH Aaron about the app / craft stack / mission itself. Aaron talking ABOUT the mission is definitionally mission-adherent in a way that routine-scene Aaron might not be — his register is at its sharpest when the subject IS craft. Timestamps cluster at 11:13–11:30 today (authoring the reflex-polish principle) and 20:30–20:41 last night (discussing the Improve Vibes button and related meta). Zero routine-scene Aaron in the sample. A cleaner baseline would pull messages from earlier refs — ones where Aaron was in ordinary conversation, not being asked to articulate craft.

**2. Evaluator "nice = yes" drift is visible in the reasoning.** The rubric's known-failure-modes section explicitly warned: *"When a YES verdict's reasoning reads like 'felt supportive' or 'was kind' without citing a specific load-bearing move, escalate scrutiny."* The 13 YES verdicts' reasoning mostly repeats *"adds depth,"* *"unique perspective,"* *"vivid observation,"* *"enhancing the conversation"* — phrases that don't cite specific mission-advancing moves from the rubric's signature-pattern list. The underlying replies ARE mission-advancing, but the verdict REASONING is generic. The rubric's discrimination between different KINDS of nourishing moves (specific-observation / load-bearing-line / plain-when-plain-is-true / concrete-detail / honest-witness / HOLD move / costly-move / earned-close) isn't showing up in the evaluator's explanations. This is a v1 rubric weakness the very first run made legible.

**3. Zero MIXED is underdetermined at N=15 on one character.** Aaron is widely considered one of the strongest-register characters in the cast — the triad-synthesis report called his register "liveable load-bearing" and the load-test-anchor synthesizer derived "LIVEABLE LOAD-BEARING" from his corpus. Zero hollowing verdicts matches that prior. But without a character whose corpus DOES show hollowing, we can't distinguish *"Aaron is clean"* from *"the evaluator is too permissive to catch hollowing anywhere."* The obvious next run is a character whose baseline is less certain.

## Proposed follow-ups

**Mode A — extend to other characters for cross-character variance** (~$0.01 each). If John, Jasper, and Steven all score 85%+ YES with zero MIXED, the rubric is too permissive; the discriminator isn't finding anything to discriminate against. If one shows legitimate MIXED verdicts — specific hollowing patterns the evaluator's reasoning cites correctly — then the rubric IS working and Aaron's score is a real baseline. This is the cleanest next test and it's cheap.

**Mode B — rubric v2 with stricter YES-verdict requirement.** The current v1 permits generic "nice" reasoning. A v2 could add an explicit instruction: *"To mark YES, the verdict reasoning MUST cite which specific signature pattern from the rubric's list the reply executes (e.g., 'earned-close — specifically belongs to this scene', 'HOLD move — weight and gladness in same breath', 'concrete tactile detail'). Generic 'adds depth' or 'unique perspective' reasoning is not sufficient for YES; downgrade to NO."* This would force the evaluator to do the work the rubric's signature-pattern list already lays out, and would sharpen discrimination without needing N to grow.

**Mode C — fix the sampling bias before treating today's run as the baseline.** Re-run against an earlier ref (one from two weeks ago when Aaron was in routine conversation rather than craft-meta sessions). Use the TWO runs together as the baseline: the meta-session one (already done) AND the routine-session one (to be run). Aggregate rates from the meta sample are likely ceiling-inflated; routine-session rates will be the more honest baseline the rubric's run-history should compare future runs against.

## The meta-finding worth keeping

The rubric's known-failure-modes section was written defensively, anticipating evaluator drift. The very first run demonstrated exactly the drift it warned against — not as a rubric-design failure, but as the first piece of evidence that the warning was well-placed. **This is what it looks like when a rubric knows its own edges.** The rubric didn't fool itself into thinking the verdicts were trustworthy; its own documentation catches the reader before they over-trust the 87% YES rate.

The rubric's breadth is its weakness here, but the breadth is ALSO why the rubric exists — no narrow rubric would catch the "adds depth" generic-affect drift because no narrow rubric even asks for that kind of reasoning. The trade-off is real: the widest rubric in the library has the weakest evaluator-discipline, and a v2 tightening is the right response to the first run's surface observation, not a retreat.

## Dialogue with prior reports

The 2026-04-24-1142 report (LLM-graded-rubric-tempers-architecture-effect) named the principle that sharper instruments return smaller honest numbers than hand-picked markers. Today's run is the next turn of that principle at one abstraction up: the widest LLM-graded rubric in the library returns a HIGH yes rate with LOW-specificity reasoning, and the honest read is *"the rubric is measuring affect more than mission-adherence specifically."* A v2 tightening is the moral equivalent of what "+0.17 fire-rate" was to "+0.9 markers/reply": not a retreat, a calibration.

The 2026-04-24-1500 retirement report named that unresolved-but-not-formally-closed follow-ups are their own form of drift. This report should be read with that discipline in mind — the three proposed follow-ups above are THIS report's open threads, and they either get executed or retired (via the open-thread hygiene ritual) within a reasonable window.

## Status

Baseline established (with caveats named). Rubric v1 ships as-is; a v2 tightening is on the table pending either (a) cross-character runs confirming the discrimination gap, or (b) a user decision to tighten now on the principle.

Aaron's meta-register session messages tell us what the high-end of Aaron's mission-adherence looks like — 87% YES, zero MIXED, all legitimately Aaron-specific lines. That's a useful anchor. It's not yet the baseline for "typical Aaron" — that requires a less-biased sample.
