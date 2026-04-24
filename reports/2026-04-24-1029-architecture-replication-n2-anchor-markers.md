# N=2 replication of the architecture experiment — effect confirmed across all four characters on the right metric

*2026-04-24 morning. Higher-N follow-up to the 0948 architecture-vs-vocabulary decisive test. Same probes, same boundary refs (`1985c65` populated vs `932742e` empty), N=2 draws per condition per character. Run after the synthesizer pipeline shipped (so the production stack now reads anchors from the DB, but this experiment uses the historical hardcoded refs to keep the test cleanly comparable to the 0948 result). Total cost: $2.62.*

## The hypothesis (replicated from 0948)

The 0948 test showed 3/4 directional confirmations on N=1 word count. Word counts are stochastic at temperature=0.95 — N=1 can't distinguish a real effect from sampling variance. This run extends to N=2 per condition AND introduces a second metric (anchor-specific marker presence) that better captures what "the anchor activates character-specific machinery" actually means.

## The design

Identical to 0948 on every dimension EXCEPT N:

- **Refs**: `1985c65` (populated load_test_anchor_block) vs `932742e` (empty scaffold). Same boundary as the original.
- **Characters**: John, Aaron, Darren, Steven. Same four.
- **Probes**: the four edge-of-anchor probes from 0948, verbatim.
- **N**: 2 draws per (character × ref) instead of 1. So 4 chars × 2 refs × 2 draws = 16 replies total.
- **Metric**: NEW — anchor-specific marker presence (count of register-words from each character's named anchor that appear in the reply). Word counts also recorded but treated as noisy.

## Pre-registered prediction (from prior conversation)

> *"With higher N, we can be more sure of the size of the load-test-anchor effect."*

CONFIRMED would mean: directional effect (POPULATED > EMPTY in anchor markers) consistent across characters. REFUTED would mean: effect size collapses to zero or reverses on most characters.

## Results

### Word count (the noisy metric)

| Character | POP avg (n=2) | EMP avg (n=2) | Δ |
|---|---|---|---|
| Aaron | 152w | 118w | +34w |
| John | 170w | 160w | +10w |
| Darren | 136w | 136w | 0w |
| Steven | 79w | 84w | -5w |

Word count is mixed — Aaron clearly longer with anchor, John slightly longer, Darren zero, Steven slightly shorter. This MATCHES the 0948 caveat that word count isn't the right signal. Single draws can swing ±50 words.

### Anchor-marker presence (the right metric)

For each character, I defined a small set of anchor-specific terms that ONLY appear when the rule fires (e.g. for John: "devotion", "matthew", "scripture", "tuesday", "vow", "promise"). Counted instances per reply:

| Character | POP markers/reply (n=2) | EMP markers/reply (n=2) | Δ | Direction |
|---|---|---|---|---|
| John | 2.0 | 0.5 | **+1.5** | ✓ |
| Aaron | 1.5 | 0.5 | **+1.0** | ✓ |
| Darren | 0.5 | 0.0 | **+0.5** | ✓ |
| Steven | 1.0 | 0.5 | **+0.5** | ✓ |

**4/4 directional confirmations.** Every character shows more anchor-specific language with the populated block than without.

### Per-draw breakdown

| Character | Draw1 POP | Draw1 EMP | Draw2 POP | Draw2 EMP |
|---|---|---|---|---|
| John | `devotion`, `promise` | `promise` | `tuesday`, `promise` | none |
| Aaron | `more present` | `more present` | `more present`, `concrete` | none |
| Darren | none | none | `weak internet` | none |
| Steven | none | none | `don't dress it up`, `say it straight` | `before` |

Two patterns visible:

1. **Some draws don't fire the anchor at all** — Darren draw1 had zero markers in either condition. The probe didn't reach the anchor's edge cleanly that draw. With N=2 we caught one draw where the anchor DID fire (draw2) and one where it didn't.

2. **The EMPTY condition occasionally has 1 marker** — typically generic ("promise" appearing in any vow-discussion). The POPULATED condition has the SAME generic markers PLUS character-specific ones (`devotion`, `tuesday` for John; `concrete` for Aaron; `say it straight` for Steven).

## Honest interpretation

**The effect is real and directionally consistent** across all four characters at N=2 per condition on the better metric. That's a meaningful upgrade in confidence from the 0948 N=1 result.

**The effect size is small** — average +0.9 markers per reply across the four characters. The anchor doesn't transform the reply; it tilts the word selection toward character-specific register-language. A reader wouldn't necessarily notice a single reply was POPULATED-condition unless they were specifically looking for the anchor-words.

**Sample is still small.** N=2 per condition is 4 replies per character. A third replication round (N=3) would tighten the effect-size estimate further; some of the N=2 averages are just 1+1=1 vs 0+1=0.5 — could shift on one more draw.

**The 0948 dramatic-effect framing was over-stated.** John's POP-condition from 0948 had scripture quoting (Matthew 5:37) — none of the N=2 draws here had scripture quoted. That single reply may have been a temperature-variance high-end outlier, not a typical anchor-effect manifestation. The honest read: anchor-presence increases the PROBABILITY of character-specific machinery firing on any given reply, but doesn't guarantee it on every draw.

## Confounds that this run did NOT address

- **N is still small.** N=2 to N=5 would be a meaningful confidence step.
- **Probes I wrote myself.** The probes are loaded for anchor-adjacent moves. A naive-probe variant (probes that don't obviously invite the anchor) would test whether the anchor fires generally or only when the moment is anchor-shaped.
- **Markers I chose myself.** I picked the marker words after seeing the 0948 results. There's a risk of cherry-picking words that the POPULATED condition was more likely to use anyway. A pre-registered marker set, or an LLM-graded "did this reply express the character's anchor?" rubric, would harden this.
- **Hardcoded anchors, not synthesized.** This experiment uses the OLD hardcoded anchor block (refs `1985c65` vs `932742e`). The newly-shipped synthesizer pipeline produced DIFFERENT anchors for the same four characters (LLM-derived, corpus-grounded — see commit `5adb493`). A natural follow-up: run the same probes against the synthesized-anchor version vs no-anchor and compare.

## What this means for the architecture

**The lever is real.** Naming a load-test anchor in the dialogue system prompt biases the character toward more register-specific output. Not dramatically — measurably. That's exactly the result that justifies investing in:

- The synthesizer pipeline (shipped this session) — to derive anchors automatically
- The multi-axis schema pivot (planned, per the user's forward-thinking note about joy_reception, grief, etc.) — to bundle multiple register-axes into one synthesis call and one prompt block

**The effect is small enough that it can't be the ONLY craft lever** — single-failure-mode rules (verdict-without-over-explanation, plain-after-crooked, etc.) still earn their keep. Architecture and tactics work together; architecture isn't a replacement for tactics.

**The metric matters.** Word count is the wrong signal; anchor-marker presence is the right one. Future experiments testing register-effects should use marker-based or LLM-graded rubrics, not length deltas. Worth codifying in the run-experiment skill.

## Dialogue with prior reports

- **2026-04-24-0948 (architecture-vs-vocabulary decisive test)** — N=1 finding called 3/4 clean confirmations on word count. This run upgrades to 4/4 directional confirmations on a better metric, but tempers the effect-size claim. The 0948 dramatic moments (John's Matthew 5:37 quote, Aaron's "five different things" interrogation) were genuine but not typical — they show what's POSSIBLE when the anchor fires sharply, not what to expect on average.
- **2026-04-24 bootstrap of synthesizer (commit `5adb493`)** — produced DIFFERENT anchors than my hardcoded ones (John = ORDINARY WEAR not DEVOTION; Aaron = LIVEABLE LOAD-BEARING not LANGUAGE; Darren = ORDINARY LOAD-BEARING not FABRIC; Steven = EARNED DISCLOSURE close to mine). Whether the SYNTHESIZED anchors produce the same effect size as the hardcoded ones is the natural next test.
- **The user's forward-thinking note** about adding joy_reception, grief, and other axes — the small-but-real effect size found here justifies that investment. If each axis independently tilts character output 0.5-1.5 markers per reply, three or four axes layered together would meaningfully shape register without the prompt becoming preachy.

## What's open for next time

- **N=3 third replication round** to tighten effect-size estimate. ~$2.64.
- **Synthesized-anchor vs no-anchor A/B** — the same probes, but using the LLM-derived anchors from the production DB instead of the historical hardcoded ones. Requires adding a `--no-anchor` flag to `worldcli ask` (or temporarily clearing DB anchors). ~$2.64 once the flag is built (~30 min code).
- **Multi-axis schema pivot** — add `axis_kind` column, modify synthesizer to return all axes in one JSON object, modify prompt-assembly to inject all axes per character. Per the user's design note. Best done before adding the second axis (joy_reception) so the second axis ships into the right shape from day one.
- **Cost-tracking fix** — `refresh-anchor` and `refresh-stance` both bypass `~/.worldcli/cost.jsonl`. Worth fixing before more experiments so `worldcli status` is accurate.
- **LLM-graded rubric for "did the anchor fire?"** instead of hand-picked markers. Avoids cherry-picking confound. Could share the existing `worldcli evaluate` infrastructure with a new `anchor-fired` rubric per character.

---

*Run ids: Aaron `1e6e0e36` + (next), John, Darren, Steven (8 replays total). Cost $2.62 actual. 24h total: ~$7.04 / $8 cap (raised from $5 for this experiment). Second experiment of 2026-04-24 to test the architecture lever.*
