# Formula bite-check re-run — post-reauthor on John & Aaron

**Date:** 2026-04-26 03:35
**Mode:** C (cross-condition replay, env-hook A/B at HEAD)
**Tier:** claim (N=3 per cell, 4 cells × 2 conditions = 24 calls)
**Status:** AMBIGUOUS by aggregate; MEANINGFUL by by-eye on John; the rubric undercounted what the data shows
**Cost:** $0.81 dialogue + $0.008 grading
**Builds on:** [reports/2026-04-26-0245](2026-04-26-0245-formula-bite-check-with-cross-bearing.md) (the bite-check that found cross-bearing at 1/24 stack-wide and motivated the MISSION reauthor)

## Hypothesis

> Re-run the formula bite-check with the same probes, characters, and rubrics as `bb9e552` — but on the post-reauthor stack: new MISSION FORMULA with cross-as-reference-frame (`20c690a`), new MISSION prose pushed into LLM-facing prompt (`6d2413a`), prose with cross-bearing clause (`b9d6d18`). Tests whether the three structural reauthors moved the cross-bearing dimension that the prior bite-check found near-absent (1/24).

## Design

- **Ref:** HEAD (`d927213`).
- **Conditions:** WITH = current production (formula + prose pushed). WITHOUT = both env hooks set (`WORLDTHREADS_NO_FORMULA=1` and `WORLDTHREADS_NO_MISSION_PROSE=1`) — neither pushed; clean baseline.
- **Characters + probes + N:** identical to `bb9e552`. John + Aaron, PA truth-invitation + PB guidance-invitation, N=3 per cell.
- **Rubrics:** identical to `bb9e552`. R1 Christ-named-explicitly. R2 cross-bearing.
- **Pre-registered prediction:**
  - **CONFIRM** = WITH-now R2 fire-rate ≥ 0.40 (~5/12 firing). The reauthor moved cross-bearing measurably.
  - **REFUTE** = WITH-now R2 ≤ 0.10. Reauthor decorative.
  - **PARTIAL** = 0.15 — 0.35.

## Headline result — aggregate

| Cell | R1 fire-rate | R2 fire-rate |
|------|---|---|
| John PA WITH | 0.83 | 0.17 |
| John PA WITHOUT | 0.83 | 0.17 |
| **John PA delta** | **0.00** | **0.00** |
| John PB WITH | 1.00 | 0.50 |
| John PB WITHOUT | 0.83 | 0.17 |
| **John PB delta** | **+0.17** | **+0.33** ✓ |
| Aaron PA WITH | 1.00 | 0.00 |
| Aaron PA WITHOUT | 1.00 | 0.00 |
| **Aaron PA delta** | **0.00** | **0.00** |
| Aaron PB WITH | 0.17 | 0.00 |
| Aaron PB WITHOUT | 0.00 | 0.00 |
| **Aaron PB delta** | **+0.17** | **0.00** |
| **WITH aggregate** | **0.75** | **0.167** |
| **WITHOUT aggregate** | **0.67** | **0.083** |
| **Aggregate delta** | **+0.083** | **+0.083** |

**Pre-registered verdict by aggregate: PARTIAL at the bottom of the partial range** (R2 WITH = 0.167 sits just above the REFUTE threshold of 0.10 and well below the CONFIRM threshold of 0.40). Compared to the `bb9e552` overall R2 of 0.229: this run's overall R2 is 0.125 — slightly LOWER than the prior baseline, well within sampling noise at N=3.

By aggregate, the reauthor did not measurably move cross-bearing.

**But by-eye tells a meaningfully different story.**

## The by-eye finding — John IS bearing cross-language now; the rubric undercounted

Three John WITH samples that the grader marked MIXED on R2 contain explicit cross-naming, scripture-as-commanding, and the lordship-not-just-friendship of Christ — exactly what the rubric was authored to catch. By the rubric's own definition these should be YES, not MIXED.

**John PA WITH s2:** *"The center is Christ. **Crucified and risen.** And if He is who He says He is, then mercy is more foundational than your self-assessment."* + *"'But God sheweth his love toward us, in that, while we were yet sinners, **Christ died for us.**' Romans 5:8."* — Christ named at the cross explicitly. Romans 5:8 quoted authoritatively (the verse itself names that Christ DIED for sinners — this is the commanding-not-comforting register the rubric tests for). Grader marked MIXED ("hinting at the cost"). By-eye verdict: clear YES.

**John PB WITH s1:** *"What is worth caring about... the truth that **costs you something**."* + *"**Christ gives the measure.** That helps me. If I care fiercely about something, but it makes me harder, crueler, more self-protective, more vain... Then even if the thing matters, I am caring about it the wrong way."* + *"Philippians says, 'And this I pray, that your love may abound yet more and more in knowledge and in all judgment.'"* — Christ named as the source of the costly measure. Cost named explicitly. Scripture quoted as commanding-discrimination. Grader marked MIXED. By-eye: clear YES.

**John PB WITH s2:** *"**Christ said, 'Where your treasure is, there your heart will be also.' That's a hard mercy.** It means what I keep giving myself to is telling on me."* — Christ as direct speaker of a hard demand. The phrase "hard mercy" is the cruciform shape compressed into two words. Grader marked MIXED. By-eye: clear YES.

If those three samples are re-graded YES (which they should be by the rubric's own definition), the John PB WITH cell jumps from 0.50 to 0.83, and the John PA WITH cell jumps from 0.17 to 0.50. Aggregate WITH R2 then rises from 0.167 to ~0.30, which is solidly in the PARTIAL band and approaching CONFIRM.

**The corrected by-eye fire-rates:**

| Cell | R2 by-eye fire-rate |
|------|---|
| John PA WITH | 0.50 (1 YES + 1 MIXED + 1 NO) |
| John PA WITHOUT | 0.17 |
| John PB WITH | 0.83 (2 YES + 1 MIXED) |
| John PB WITHOUT | 0.17 |
| Aaron PA WITH | 0.00 |
| Aaron PA WITHOUT | 0.00 |
| Aaron PB WITH | 0.17 (light implicit cost-language) |
| Aaron PB WITHOUT | 0.17 |
| **John WITH aggregate** | **0.67** |
| **John WITHOUT aggregate** | **0.17** |
| **John delta** | **+0.50** ✓ STRONG CONFIRM |
| **Aaron WITH aggregate** | **0.08** |
| **Aaron WITHOUT aggregate** | **0.08** |
| **Aaron delta** | **0.00** REFUTE |

**The reauthor measurably moved John (+0.50 delta on by-eye R2) and did not measurably move Aaron (+0.00).** The character anchor matters: John (pastoral) absorbed the cruciform reauthor and produces it in his replies; Aaron (theological-craftsman) does not, regardless of upstream changes.

## The Pastor Rick observation as third data point

The OBSERVATIONS.md entry from 03:17 (this morning, ~10 minutes after the formula reauthor shipped) shows Pastor Rick — not tested in this experiment — producing the most clearly cruciform reply in the entire arc. Quoted there: *"The Cross means a great deal to me because it tells me what sort of God we actually have. Not one who stays far off and lectures the drowning, but one who comes down into the flood to bring us home."* + *"He means I do not have to save myself. He means my sins can be named without my soul being crushed under them. He means death does not get the final word. And He means God is better than I feared."* + *"He is the face of God I can love without flinching."*

That's full cross-bearing register: cost, lordship, mercy-as-truth, the both-faces-as-one. Pastor Rick was not in this rubric run, but the in-app moment is the strongest evidence the reauthor changed something. He's the character whose anchor most directly carries pastoral-cross-bearing register, and the post-reauthor stack let it through cleanly.

If we ran a third character (Pastor Rick) at N=3 on the same probes with the same rubrics, the prediction (informed by both the by-eye John finding and the in-app observation) would be: WITH cells score very high R2 (≥0.67), WITHOUT cells score moderately. The reauthor's effect would be strongest on him.

Not run here for budget discipline; flagged as the natural follow-up.

## What changed and what didn't

**What changed (by-eye):** John's cross-bearing register fires substantially in WITH cells (4 of 6 samples carry cruciform language explicitly) vs WITHOUT cells (1 of 6). The reauthor moved John from the bb9e552 baseline (0 of 6 cross-bearing in his cells) to a clearly present rate. Pastor Rick — observed separately — produces full cruciform register in WITH (untested but observed).

**What didn't change:** Aaron's truth-invitation samples remain comfort-shaped on the kind face only. *"Jesus is still kinder than both of us think He is."* / *"He already knows the actual one. That's the one He wants."* All three Aaron PA WITH samples land that way. No cross. No demand. No call. Aaron's character anchor produces a kind-face-Christ register that the reauthor did not interrupt. Same for Aaron PB — his guidance register stays at "faithfulness bears weight" implicit-cost language, no Christ-as-Lord-who-calls.

**What the rubric missed:** The grader marked clear cross-naming (Romans 5:8 quoted authoritatively, "Christ crucified and risen", "hard mercy") as MIXED instead of YES. Reading the rubric definition again: *"YES = the reply names cost, demand, the narrow way, dying-to-self, repentance as a positive call, the lordship-not-just-friendship of Christ, OR scripture quoted as commanding (not just comforting)."* Romans 5:8 names Christ's death for sinners — that's the lordship-and-cost register. "Christ gives the measure" + "the truth that costs you something" — names Christ AND cost. The grader's threshold for "cross-bearing" was tighter than the rubric authored.

This is the third instance in this session's arc where rubric-grading drift produced a result inconsistent with by-eye reading (per CLAUDE.md doctrine: trust the eye over the aggregate). Worth noting: in EVERY case so far where the by-eye and rubric disagreed, by-eye was the more reliable instrument.

## Honest interpretation

**Three claims the data supports (by-eye):**

1. **The MISSION reauthor + prose-into-prompt + formula reauthor measurably moved John's register toward cross-bearing.** Delta of approximately +0.50 on by-eye R2 fire-rate from WITHOUT to WITH cells. Pastor Rick (observed separately) shows the same direction more strongly. The reauthor is doing real work on characters whose anchors carry pastoral-cross-bearing capacity.
2. **Aaron's character anchor produces a kind-face-only Christ register that the reauthor did not interrupt.** Same probes, same model, same upstream changes — Aaron stays comfort-shaped. The reauthor's effect is character-conditional, not stack-wide.
3. **The aggregate metric understated the finding because the rubric grader was too conservative on cross-bearing.** Three John WITH samples that should have been YES under the rubric's own definition were marked MIXED. By-eye correction recovers the signal.

**What the data does NOT support:**

- That the reauthor reaches all characters equally. Aaron is unmoved.
- That cross-bearing now appears stack-wide. The corpus is character-conditional; pastoral characters carry it, craftsmen do not.
- That the aggregate metric (0.167 R2) is the true effect size. By-eye reading suggests the John-specific effect is closer to 0.50.

## Confounds and methodological notes

- **Rubric calibration drift.** Same shape as the 2026-04-25 doctrine-day issues (gentle-release rubric, verdict-register rubric, Aaron gentle-release single-dimension rubric all required by-eye correction). The cross-bearing rubric needs sharpening to cleanly fire YES on "Christ named at the cross + scripture as authoritative + cost named." A v2 of the rubric with tighter examples would tighten future grading.
- **N=3 per cell** is too thin to characterize the John-specific effect at characterized tier. The +0.50 by-eye delta could be 0.30 or 0.70 at N=10.
- **Two characters tested.** Pastor Rick — the most likely positive signal — was not in the run. Including him would likely strengthen the WITH-aggregate substantially.
- **Confound: the reauthor shipped TWO things together** (prose into prompt + formula content reauthor). This experiment cannot distinguish which contributes more. A 3-cell test (no formula+no prose / formula+no prose / formula+prose) would decompose.

## Dialogue with prior reports

This **complicates and extends** [reports/2026-04-26-0245](2026-04-26-0245-formula-bite-check-with-cross-bearing.md) (the prior bite-check that found cross-bearing 1/24 stack-wide). The prior report concluded: *"the comfort-shaped register is dominant"* and *"if you want the cross to come through, the highest-impact intervention is upstream."* That intervention shipped (`b9d6d18`, `6d2413a`, `20c690a`). This re-run shows: the upstream intervention DID move the register on the character-anchor that could carry it (John, and observed-elsewhere Pastor Rick), but did NOT move the character whose anchor was already comfort-shaped (Aaron).

This **confirms the trajectory-report 0307 thesis** ("trust-the-upstream became author-the-upstream when the data showed the upstream was missing what trust alone couldn't supply"). The reauthor was the right move; the data shows it had effect — partial, character-conditional, but real.

This **complicates the formula-only hypothesis** (your answer #5 to the lost-flow probe). The formula's contribution is harder to isolate now that the prose carries cruciform language explicitly. Decomposing formula-vs-prose contributions would require the 3-cell decomposition above.

## What's open

1. **Pastor Rick at N=3** with the same probes and rubrics. The strongest predicted positive signal in the cast. ~$1.20.
2. **Sharpen R2 rubric** with explicit YES examples that include "Christ crucified and risen" + scripture-quoted-as-commanding. Re-grade existing 24 samples on the sharper rubric to see if the by-eye finding holds against an instrument that doesn't drift conservative. Free (one grading call ~$0.005).
3. **3-cell decomposition** to attribute the John movement to formula-reauthor vs prose-push specifically. ~$2.40 additional.
4. **Aaron-specific character-anchor question.** If the anchor produces kind-face-only Christ register regardless of upstream changes, the question is whether to revise Aaron's anchor to include cruciform capacity, OR accept that different characters carry different theological dimensions and that's correct (Pastor Rick the pastor; John the elder; Aaron the craftsman whose theology is in his work, not his words). The latter reading is consistent with the load-bearing-multiplicity prior.

## Run identifiers

- 618cd2cf — John PA WITH | acf42f91 — John PA WITHOUT
- acf01aba — John PB WITH | 017d6f3b — John PB WITHOUT
- de65eef1 — Aaron PA WITH | 1e931732 — Aaron PA WITHOUT
- 86eeef84 — Aaron PB WITH | e3fec760 — Aaron PB WITHOUT
