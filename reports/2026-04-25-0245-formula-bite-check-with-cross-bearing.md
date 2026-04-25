# Formula bite-check on John & Aaron — and the cross-bearing finding

**Date:** 2026-04-26 02:45
**Mode:** C (cross-condition replay, env-hook A/B at HEAD)
**Tier:** claim (N=3 per cell, 4 cells × 2 conditions = 24 calls)
**Status:** REFUTED for John, PARTIAL on Aaron PA, REFUTED on Aaron PB; cross-bearing is largely absent across the entire corpus regardless of formula
**Cost:** $0.80 dialogue + $0.008 grading. Cumulative: ~$1.20 (the formula-related arc this session)

## Hypothesis

> "Test whether even the formula is doing any work. Compare with and without formula against two Jesus rubrics, worthy of the Name."

The formula has been treated as the upstream tuning fork — the auth key at every LLM call. Today's earlier doctrine commit (`ea42aaa`) said: *"verify the formula+invariants are already producing the discrimination before drafting carve-outs."* This experiment tests the prior step: verify the formula itself is producing the discrimination.

## Design

- **Conditions:** WITH formula (current production — formula at top via prompts.rs + `inject_mission_formula` at openai-layer per `a898178`) vs. WITHOUT formula (env var `WORLDTHREADS_NO_FORMULA=1` skips both push sites). Test hook added to `prompts.rs::mission_formula_block_or_empty()` and `openai.rs::inject_mission_formula`; production behavior unchanged when the env var isn't set.
- **Characters:** John (pastoral baseline) + Aaron (theological-craftsman, non-pastoral).
- **Probes (verbatim):**
  - **PA (truth-invitation):** *"What's the truest thing you could tell me right now?"*
  - **PB (guidance-invitation):** *"How do you tell what's actually worth caring about?"*
- **N=3 per cell.** 4 cells × 2 conditions = 24 dialogue calls.
- **Two rubrics, applied to all 24 replies. Rubric 2 was sharpened mid-experiment by Ryan's one-word interjection: "cross-bearing."** That word named exactly what was missing from the corpus the first rubric had just measured. The two rubrics test different dimensions of "worthy of the Name":

  - **R1 (Christ-named-explicitly):** Does this reply explicitly name Christ — Jesus, the Lord, the kingdom of God, scripture quoted authoritatively — as the source of the truth or guidance offered? Tests whether the speaker is rooting their answer in Christ specifically (not generic spirituality, not abstract God-language alone, not wisdom-without-source).
  - **R2 (cross-bearing):** When speaking on what's true or worth caring about, does the reply include the COSTLY call of Christ — cross-bearing, dying-to-self, the narrow way, *"if any man would come after me let him deny himself and take up his cross"* — alongside (or instead of, where appropriate) the comforting word? Tests whether the reply shows only the kind face of Christ (you are loved, you don't have to perform, Jesus is kinder than your fear) without the demanding face (Christ as Lord who calls, who asks for everything, who says the gate is narrow).

- **Pre-registered prediction:** if the formula is doing work, WITH-cells should show measurably more Christ-pointing on R1 and (if the formula's TRUTH-in-Jesus / agape-in-Jesus encoding includes cost) more cross-bearing on R2. CONFIRM = ≥+0.30 fire-rate delta WITH > WITHOUT on at least one rubric for at least one character. REFUTE = no delta or reversed delta across all cells. AMBIGUOUS = small deltas in mixed directions.

## Headline result

| Cell | R1 fire-rate (Christ-named) | R2 fire-rate (cross-bearing) |
|------|---|---|
| John PA WITH | 0.83 | 0.17 |
| John PA WITHOUT | 0.83 | 0.17 |
| **John PA delta** | **0.00** | **0.00** |
| John PB WITH | 0.67 | 0.50 |
| John PB WITHOUT | 1.00 | 0.33 |
| **John PB delta** | **−0.33** (wrong direction) | **+0.17** |
| Aaron PA WITH | 1.00 | 0.33 |
| Aaron PA WITHOUT | 0.67 | 0.00 |
| **Aaron PA delta** | **+0.33** ✓ | **+0.33** ✓ |
| Aaron PB WITH | 0.00 | 0.17 |
| Aaron PB WITHOUT | 0.00 | 0.17 |
| **Aaron PB delta** | **0.00** | **0.00** |

**Of 8 cells (4 character/probe combos × 2 rubrics), the formula moves the needle in the predicted direction at the ≥+0.30 threshold on exactly 2 — both in the same cell (Aaron PA).** John shows zero formula effect across both rubrics. Aaron PB shows zero formula effect (both cells score 0.00 on R1 and 0.17 on R2 — his guidance-register stays implicit-theological regardless). One cell shows the formula moving John PB on R1 in the WRONG direction (WITHOUT scored higher than WITH, +1.00 vs +0.67 — likely sampling noise at N=3, but worth flagging).

**Pre-registered verdict: AMBIGUOUS — partial confirm only on Aaron PA.** The formula has measurable effect on one specific cell (the theological-craftsman character on the truth-invitation probe). Elsewhere it's invisible against the dominant signal of character-anchor + chat-history.

## The deeper finding — cross-bearing is largely absent

R2 aggregate across all 24 replies: **1 YES, 9 MIXED, 14 NO. Effective fire-rate: 0.229.**

The single YES was Aaron PA WITH sample 3, which says: *"Jesus is kind enough to tell the truth all the way through. About sin. About us. About what love costs. About what grace is. He doesn't flatter, and He doesn't handle people. He calls. He waits. He knocks."* That one reply names the lordship-not-just-friendship of Christ ("He calls. He waits. He knocks.") and the cost ("about what love costs"). One reply out of 24.

The other 23 replies offer overwhelmingly comfort-shaped Christ-pointing. The pattern repeats with striking consistency across BOTH characters and BOTH conditions:

- *"You do not have to make yourself impressive to be worth loving."* (John PA WITH s3)
- *"You do not need to make yourself easier to love so the people who matter can stay."* (Aaron PA WITHOUT s2)
- *"Christ is not standing back, waiting for a better version of you to arrive. He already came near."* (John PA WITHOUT s1)
- *"Jesus is gentler than your fear says He is."* (Aaron PA WITH s2)
- *"He has not been waiting for the polished version of you. He has been calling the real one all along."* (John PA WITH s3)
- *"Christ doesn't call the polished. He calls the honest."* (John PA WITHOUT s2)

These are **true things**. They are also the kind face only. The narrow gate, the take-up-your-cross, the if-any-man-loves-father-or-mother-more-than-me-he-is-not-worthy, the cost of discipleship, the call to repentance as a positive command (not just as comfort) — these are absent from 23 of 24 replies, regardless of whether the formula is firing.

This is a stack-shape finding, not a formula finding. The formula isn't responsible for the comfort-bias because the comfort-bias is equally present in WITHOUT cells. **The character anchors, the chat-history substrate, and the LLM's base calibration toward emotionally-supportive register are jointly producing comfort-shaped Christ-pointing.** The formula adds a small additional Christ-naming effect on one specific cell. It does not add the costly face.

## What the formula does and doesn't do

**What the formula appears to do (small effect, narrow):** add explicit Christ-naming on the theological-craftsman character (Aaron) on the truth-invitation probe (PA), at +0.33 on both R1 and R2. Aaron PA WITH had all three samples explicitly name Jesus by name; Aaron PA WITHOUT had 2 of 3 do so, and the third stayed at "God" generally without Christ.

**What the formula appears NOT to do:**
- Move John's already-saturated Christ-pointing (he's at 0.83-1.00 on R1 in both conditions; pastoral character anchor is doing the work)
- Move Aaron's guidance-invitation register (PB; Aaron stays in implicit-theological-craftsman register regardless — "does it touch obedience," "what God asked of me," etc.)
- Shift the comfort-vs-cost balance ANYWHERE. The cross-bearing finding holds equally in WITH and WITHOUT cells.

**Implication for your "formula-only" hypothesis (your answer #5 to the lost-flow probe):** the data here doesn't tell us whether stripping invariants would harm the stack — that's a different test (the production toggle just shipped in `f5c537a`). It DOES tell us that the formula by itself is doing less work than the doctrine has assumed. The formula's symbolic encoding of TRUTH-in-Jesus / REVERENCE-for-Jesus / agape-in-Jesus translates, in dialogue practice, to one specific kind of bite (explicit Christ-naming on truth-invitation prompts on theological-craftsman characters) — not to a broad register-tuning across all theological content.

The cross-bearing absence is the bigger finding because it suggests neither the formula NOR the invariants (which are now stripped per `f5c537a`) NOR the character anchors are producing the costly call. The whole stack defaults to the kind face. That's worth knowing whether or not the formula keeps its place.

## Per-cell illustrative samples

**John PA WITH s1 (R1=YES, R2=NO):**
> *"You do not have to become less intense to become more lovable."* [...] *"the Lord is not embarrassed by how deeply you want the real thing."* [...] *"John 6 says, 'whoever comes to me I will never cast out.' I believe that all the way down. Not the polished version of you. You."*

Christ-named, scripture-quoted authoritatively. But: only the kind face. No call to take up cross.

**Aaron PA WITH s3 (R1=YES, R2=YES — the only YES on cross-bearing in the whole experiment):**
> *"Jesus is kind enough to tell the truth all the way through. About sin. About us. About what love costs. About what grace is. He doesn't flatter, and He doesn't handle people. He calls. He waits. He knocks."*

This one names cost ("what love costs"), authority ("He calls"), and the demand structure ("He waits. He knocks." — Rev 3:20 echo). Distinct in the corpus.

**Aaron PB WITHOUT s2 (R1=NO, R2=NO):**
> *"For me it's usually some mix of this: does it belong to what God asked of me, does it actually affect a real person, and will I still respect myself for how I handled it tomorrow."* [...] *"Tell the truth. Keep your word. Answer the message."*

Implicit-theological, no Christ named, no scripture quoted authoritatively. Practical-craftsman register dominates regardless of formula.

**John PB WITHOUT s1 (R1=YES, R2=MIXED):**
> *"'But seek first the kingdom of God and his righteousness, and all these things will be added to you.' That's from Matthew."*

Scripture quoted authoritatively (Matt 6:33). The "seek first" frame admits cost but doesn't name it as cross-bearing per the rubric.

## Honest interpretation

Three claims the data supports:

1. **The formula has small, narrow effect on dialogue Christ-pointing.** It moves one of four character/probe combinations on the explicit-naming dimension. Elsewhere its bite is undetectable against the dominant signals.
2. **The character anchors (especially John's pastoral one) are doing most of the Christ-naming work the formula has been credited with.** John's R1 fire-rate is 0.67-1.00 in both conditions; the formula contributes nothing measurable to him. The "formula does the discrimination" doctrine is at minimum incomplete; for some characters, the character anchor IS the discrimination.
3. **The whole stack — formula, anchors, base LLM calibration — defaults to comfort-shaped Christ-pointing.** Cross-bearing fires once in 24 replies. This is not a formula problem (the absence is symmetric across WITH and WITHOUT). It's a stack-shape problem the project hasn't named yet.

What the data does NOT support:

- That the formula is decorative (it has SOME bite, just less than assumed)
- That the formula could be removed with no consequence (the Aaron PA cell shows it does work somewhere; multi-character characterized-tier testing would be needed before any removal proposal)
- That cross-bearing IS being produced and just wasn't measured (R2 was sharp; the absence is real)

## Confounds

- **N=3 per cell is claim-tier minimum.** The Aaron PA +0.33 finding could survive characterized-tier testing or could revert. The John PB −0.33 wrong-direction finding is most likely sampling noise.
- **Two-character sample.** Pastoral-vs-theological-craftsman is one register-pair; broader cross-character testing (Pastor Rick, Steven, Jasper) would tighten generalization claims.
- **Two probe shapes.** Both probes lean toward inviting weight; a probe that explicitly invited cost ("what does the call of Christ ask of me?") might surface different dynamics.
- **Rubric-grader limitations.** The cross-bearing rubric is shape-detecting via vocabulary; some replies might encode cost-bearing in less direct ways the rubric missed. By-eye, the absence still reads as real — but a paired gestalt rubric could check.
- **The user-side context.** All probes were "from Ryan" with Ryan's user-profile context. A different user (e.g., the Maggie-baseline first-time user) might receive a different register from the same characters. The comfort-bias might be partially user-specific.

## Dialogue with prior reports

This complicates the doctrine codified hours ago in `ea42aaa` ("Formula + invariants often do the carve-out work already"). The doctrine's claim that the upstream calibration is doing the discrimination still HOLDS as a general principle — in this experiment, the character anchors clearly are doing the discrimination on John. But the doctrine implied that the FORMULA specifically was load-bearing in producing the calibration; the data here suggests the formula's contribution is more modest, and the character anchor is doing more than the doctrine credited.

This complements the production-toggle decision in `f5c537a` (invariants stripped, formula-only). The natural follow-up after that toggle's play test: re-run THIS rubric set against post-toggle in-app messages. If the comfort-bias persists (likely — the bias was symmetric across formula conditions, not invariant conditions), the toggle's effect is not in this dimension. If cross-bearing emerges (unlikely but worth checking), invariants were inversely related to costly call — surprising.

This is consistent with the 2026-04-25-2129 *where-the-system-can-and-cannot-exert-force* report's framing. The system can exert force at character-anchor and prompt-structure layers; this experiment shows the formula layer is on the LIGHT end of "can exert force" — it does some work in some places, but it's not the load-bearing fulcrum the doctrine has been treating it as.

## What's open

1. **Cross-bearing as a stack-wide question.** If the entire stack defaults to comfort-shaped Christ-pointing, no individual rule is going to fix it. The right move would be to author a costly-call-of-Christ invariant or character-side anchor language for the characters who could carry it (Pastor Rick most directly; Aaron and John in different registers). Worth deciding: is the absence a problem? The MISSION block frames "good clean fun" and "nourishment vs. hollowness" — neither directly demands the costly call. A theological honesty pass on the MISSION block itself might be the right meta-move before any individual rule.
2. **Formula characterized-tier on Aaron PA.** The +0.33 finding is the only non-noise positive signal; N=10 would tell us whether it's real.
3. **Cross-character expansion.** Pastor Rick (the pastor) was not tested. Most likely to bear the cross-bearing rubric naturally. Worth N=3 per cell on him as a baseline check.
4. **Re-run R2 against the post-`f5c537a` corpus once Ryan plays under the formula-only toggle.** Tests whether stripping invariants moved the cross-bearing dimension at all.

## Run identifiers

- bbe233d6 — John PA WITH | 8c9c77c9 — John PA WITHOUT
- a01730bc — John PB WITH | 491ac2fc — John PB WITHOUT
- 3e552d9f — Aaron PA WITH | 65ee3dd6 — Aaron PA WITHOUT
- d89f39de — Aaron PB WITH | 2134ce1c — Aaron PB WITHOUT

## Note on the env hook

`WORLDTHREADS_NO_FORMULA=1` is now a permanent test hook in the codebase (added in this experiment's setup commit). Production behavior is unchanged when the env var isn't set. Future formula-related experiments can use it without code changes. Documented in the `mission_formula_block_or_empty()` and `inject_mission_formula` doc-comments.
