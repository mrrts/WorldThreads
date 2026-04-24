# The meta-commentary regression is probabilistic, not threshold-gated: the 1950 "interaction effect" story was overfit to N=1

*2026-04-24, three threads executed. Six calls, $0.99 actual (at $1.02 projection). Results force a significant correction to the 1950 "threshold interaction" narrative. The meta-commentary failure mode is a rare-but-real probabilistic event that fires sporadically across configurations, not a deterministic threshold tripped by specific component combinations. Full compound at N=2 did NOT produce meta-commentary. A simpler 2-component variant (S + I) DID. The original 1920 finding was real; the 1950 claim that only the full 6-component combination triggers it was wrong — it was an artifact of N=1 per condition. What does reproduce reliably: invariants-first alone consistently shortens replies vs baseline (now N=3, all clean, all shorter).*

## Setup

Three threads from the 1950 report's open list, six calls total:

| Thread | Purpose | Calls |
|---|---|---:|
| 1 | Reproduce the 1920 full-compound meta-commentary regression | 1 |
| 2 | Invariants-first alone, runs 2 & 3 (bringing to N=3 on mission-stakes) | 2 |
| 3 | Bisect the threshold — test 2/3/4-component variants for regression | 3 |

All on Aaron, same mission-stakes probe *"Does any of this actually matter, in the end?"*, same HEAD ref (no prompts.rs variation; knobs only).

Cost: $0.99 actual / $1.02 projected / $2.00 budget.

## Full results, with meta-commentary check

| Variant | Components | Length | Meta-commentary? |
|---|:---:|---:|---|
| Baseline (no knobs) | 0 | ~145 | No |
| S alone — 1B original | 1 | ~130 | No |
| S alone — Thread 2 run #2 | 1 | ~115 | No |
| S alone — Thread 2 run #3 | 1 | ~140 | No |
| Oc alone (follow-up 1C) | 1 | ~145 | No |
| Oi alone (follow-up 1A) | 1 | ~195 | No |
| I alone (follow-up 2) | 1 | ~150 | No |
| **S + I — Thread 3a** | **2** | **~195** | **YES** |
| S + Oc + I — Thread 3b | 3 | ~150 | No |
| S + Oc + Oi + I — Thread 3c | 4 | ~160 | No |
| 5-knob no-I (variant 3) | 5 | ~160 | No |
| Full compound — 1920 original | 6 | ~125 | **YES** |
| **Full compound — Thread 1 reproduction** | **6** | **~175** | **No** |

**Two observations this table forces:**

1. **The full compound's meta-commentary does NOT reliably reproduce.** Thread 1's reproduction at N=2 came back clean. The 1920 finding was real but not deterministic.

2. **A 2-component variant (S + I) DID trigger meta-commentary** — and the meta line is textually parallel to 1920's: *"the sentence wants to come out too polished and I don't trust it yet."* Compare to 1920's *"I don't want to decorate it into uselessness."* Same stylistic shape, same self-narration of register-restraint.

## What this corrects about the 1950 report

The 1950 report claimed a clean "threshold interaction" — meta-commentary requires ALL SIX components to fire. That claim was based on N=1 per variant. With additional runs, it doesn't hold:

- N=1 full compound (1920): meta
- N=1 each of 5 single-knob variants + 1 five-knob variant (1950): clean
- The 1950 story extrapolated "only six triggers it" from N=1 per condition

With the three-thread data:
- Full compound N=2 (original + Thread 1): 1 meta, 1 clean
- S + I N=1 (Thread 3a): meta

So the correct interpretation: **the meta-commentary is a rare sporadic failure that correlates with certain structural conditions (particularly inclusion of both `--insert-file` and `--section-order invariants-first`) but does NOT deterministically fire in any of them.** It's a probabilistic emergence, not a clean threshold.

This is a more honest and more useful finding than "full compound threshold interaction." It predicts:

- Some runs will produce meta-commentary even in "safe" configurations; it's not zero-probability.
- Some full-compound runs will be clean; it's not 100% either.
- Configurations that combine `--insert-file` with at least `--section-order` have an elevated probability.
- The specific phrasing, when it fires, is remarkably consistent — it's always a line about resisting polish/decoration/cleverness, shaped aphoristically.

## Invariants-first at N=3 is the hardened single-knob finding

Three runs of `--section-order invariants,craft-notes,agency-and-behavior` alone on the mission-stakes probe:

| Run | Length | Clean? |
|---|---:|---|
| 1B original | ~130 | Yes |
| Thread 2 run #2 | ~115 | Yes |
| Thread 2 run #3 | ~140 | Yes |
| **Average** | **~128** | **3/3** |

Baseline average: ~145. Variant 1B average: ~128. That's a consistent ~12% length reduction with no meta-commentary regression across three runs. The direction is confirmed; the magnitude is small but real.

**Combined with the 1835 joy-probe finding**, invariants-first now has:
- N=1 joy probe (Aaron): register-specific shift, fewer explicit theological tags
- N=3 mission-stakes probe (Aaron): consistent length reduction, no regressions

This is the hardest-evidenced single-knob finding in the whole machinery. Not yet enough to propose as a production default shift (would want cross-character + cross-probe confirmation), but it's the most promising candidate among all single-knob interventions tested.

## What S + I (2 components) means specifically

Thread 3a's meta-commentary at just 2 components is the key data point. S alone (all 3 runs) was clean. I alone was clean. **S + I together produced meta.**

That suggests the insertion text is the NECESSARY component — it's the one that provides the specific anti-decoration vocabulary the character then parrots. When the insertion is paired with ANY structural anti-polish move (section-order being one), the model gets enough converging signal to cross the meta-narration threshold. It doesn't need the full compound's weight.

Which means: **the `--insert-file` audition pattern has a small-but-real risk when combined with other knobs.** The 1950 report said "insertion alone is safe for auditioning new craft notes." That remains true. But warning: any experiment that combines insertion with other structural overrides needs an N=3+ protocol to catch the probabilistic regression.

## Honest methodological lesson

**N=1 on rare probabilistic failure modes produces misleading stories.** The 1950 report's "threshold interaction" narrative was cleanly coherent from N=1 per variant. It was also wrong. With one more run per condition, the story inverts.

This is structurally identical to today's earlier mission-adherence rubric trajectory: v1 returned a flattering N=1 number (87% YES for Aaron), v2 surfaced the evaluator drift that inflated v1. Each "sharper instrument" correction revealed that the prior interpretation was overfit.

**Pattern across today's experiments:** single-run observations feel decisive but aren't. Three runs start to harden. Five or ten would begin to characterize distribution.

The cost implication: experiments about rare probabilistic failures need N=3 per condition to avoid N=1 artifacts. At $0.17/call on the dialogue model, that's $0.51 per condition. Still cheap, but NOT what I was budgeting earlier this session.

## What accumulates

**Reliable findings (hardened):**
- Invariants-first alone reduces reply length on mission-stakes probe by ~12%, N=3, no regressions.
- The `--insert-file` mechanism works cleanly in isolation (N=1 from 1950; insertion-alone test).
- The toolkit's cost model (~$0.17/call for dialogue replays) makes N=3 protocols cheap enough to be standard.

**Probabilistic findings (not yet characterized):**
- Meta-commentary emergence rate appears non-zero in configurations that include the `--insert-file` + `--section-order` combination. Rate seems higher than baseline but well below 100%. Characterizing it would require 5-10 runs per condition.
- Full-compound behaviors aren't well-characterized at N=2; could vary more than this session shows.

**Retracted or corrected findings:**
- "Threshold interaction effect requiring all 6 components" (1950 report) — CORRECTED. The interaction is probabilistic, not threshold-gated. 2 components can trigger; 6 components sometimes don't.
- "Rule-proliferation temptation at the prompt level" (1920 report) — PARTIALLY RETAINED. The qualitative claim (more anti-polish pressure → higher probability of meta-narration) might still hold, but the specific mechanism isn't monotonic-additive.

## What ships

Nothing. Third experiment in sequence that ends with no production change. What accumulates is methodology: the ship-measure-tighten ritual that now runs on cheap replay cycles has also surfaced its own limit — **N=1 is insufficient for stochastic failure characterization**, and future compound experiments need N=3+ per condition.

Budget used today on replay experiments: ~$6 cumulative. A single N=3 characterization of any condition at the dialogue model is ~$0.51. For the most-useful finding (invariants-first as a possible production default), getting to N=5+ across multiple characters and probes would be ~$5-8. Expensive for a single finding; cheap relative to the value of shipping a validated default change.

## Open threads status

- **Does the meta-commentary regression reproduce?** — EXECUTED. Partial answer: full-compound at N=2 didn't reproduce. 2-component S+I at N=1 did. Pattern is probabilistic. 
- **Invariants-first at N≥3 on mission-stakes?** — EXECUTED. Three runs all clean, all shorter than baseline. Directionally hardened.
- **Map where the threshold transition occurs?** — EXECUTED. No clean threshold; sporadic emergence instead. Methodology lesson: N=1 per variant was insufficient.

Three closed. One new thread opened:

**"Characterize the meta-commentary emergence rate under S+I configurations."** At N=5+ on the S+I variant, would get a rough rate estimate. Same for full compound. ~$1.70 total. Would answer "is this rare-noise or meaningful-signal?" Deferred, target when a production decision depends on it.

## Dialogue with today's earlier reports

The 1745 demotion re-run report named placement-dominates-tier. Today's experiments both confirm (invariants-first works) and complicate (placement interactions produce probabilistic regressions).

The 1920 compound-intervention report proposed rule-proliferation at the meta-level. Today's threshold bisection shows the meta-level effect is probabilistic rather than additive. Rule-proliferation may still be a useful shorthand but the mechanism is stochastic, not deterministic.

The 1950 interaction-effect report's specific claim ("only 6 components triggers it") is CORRECTED to "probabilistic across multiple configurations, not cleanly threshold-gated." The 1950 report's quality observations (how to read specific outputs, the in-scope analysis) stand; the causal mechanism claim doesn't.

**Across the day's six reports on this thread, the story is: sharper instruments reveal previous framings were N=1 artifacts.** Same pattern as the mission-adherence v1→v2 correction earlier today. Methodology hardens by retracting.
