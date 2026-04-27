# Retiring tonight's follow-ups per open-thread-hygiene

*Generated 2026-04-26 23:00. Auto-commit Move 6/10. Sweep through tonight's six bite-test reports + the OBSERVATIONS log; mark which open follow-ups landed during the night vs which remain genuinely open vs which are abandoned. Per CLAUDE.md open-thread-hygiene doctrine — `superseded_by` requires specific match; `abandoned` is the default when uncertain.*

## Method

Reading the "Open follow-ups" section of each tonight's report, marking each entry with one of: `executed` (work done; cite the commit), `superseded_by` (later work materially covered the question; cite specific report/commit), `abandoned` (no longer worth answering — cite the rationale), or `deferred` (live but blocked / not yet relevant; cite the blocker or window).

Per the discipline, default to `abandoned` over `superseded_by` when the match is loose.

## Per-report retirements

### `reports/2026-04-26-1945-action-anchor-groove-cross-character-bite-test.md`

The 1945 report established the action-anchor-groove failure mode (universal mild + Jasper runaway) and proposed 4 follow-ups:

1. **"Draft STYLE_DIALOGUE_INVARIANT extension for sensory-anchor variance"** → **EXECUTED** at commit `9fc1fc2` (DISTRUST RECURRING SENSORY ANCHORS clause). Bite-tested at report 2010 (sketch-tier confirmed). Live verification at OBSERVATIONS 21:55 (well-chain 100% → absent from top-8).

2. **"Scene-state reset for Jasper in the live conversation"** → **ABANDONED**. The cross-reply rule's natural attenuation post-restart was sufficient (per OBSERVATIONS 21:55). One-shot scene-reset directive was never needed; the rule's bite + the chat-history-readback shifting toward fresh anchors did the work. No specific intervention required.

3. **"Distinct-anchor-count rubric (Shannon-entropy-shaped per-reply)"** → **SUPERSEDED_BY** the `--opening-density` flag added to `worldcli anchor-groove` at commit `4fb7b71`. The opening-density measurement is a per-reply count distribution (mean/median/max/over-cap) — close enough to entropy-shaped for the prop-density signal at sketch-tier. The full Shannon-entropy version is still ABANDONED unless a more refined question demands it.

4. **"`worldcli anchor-groove` subcommand"** → **EXECUTED** at commit `f01d871`.

### `reports/2026-04-26-2010-sensory-anchor-clause-bite-test-confirms-at-sketch-tier.md`

The 2010 report bite-tested the sensory-anchor clause and proposed 4 follow-ups:

1. **"Live in-vivo verification"** → **EXECUTED** at OBSERVATIONS 21:55 (well-chain 100% → 0% on Jasper post-restart corpus).

2. **"Characterization-tier escalation (N=10 per cell)"** → **DEFERRED** with target *"when the rule's bite at scale is questioned by a future observation."* Sketch-tier evidence held up at live verification; the characterization-tier work is not currently load-bearing.

3. **"Predecessor-omit testing"** → **DEFERRED** with rationale *"only useful if the rule is questioned for redundancy with TELL_THE_TRUTH + DAYLIGHT + SOUNDNESS — not currently questioned."*

4. **"Cross-character bite-test on the universal mild-groove cases (Steven/John/Pastor Rick at 40%)"** → **DEFERRED** until they accumulate post-restart corpus naturally. Not pressing — they were already at universal-baseline pre-rule; bite-detection on baseline-already-clean characters has lower priority than on outlier characters.

### `reports/2026-04-26-2030-batch-h3-wins-prop-density-clause-design.md`

The 2030 report designed the prop-density clause via batch-hypothesis. 5 follow-ups:

1. **"Ship h3 to STYLE_DIALOGUE_INVARIANT"** → **EXECUTED** at commit `eeaea95`.

2. **"Validate via live anchor-groove on next batch of replies"** → **EXECUTED** at Move 3 (commit `4fb7b71`'s instrument extension + measurement). Result revealed the rule's literal-count metric isn't biting as predicted (mean 3.2 anchors/opener vs ≤2 prediction) but the integration-axis was working. Led to Move 4's doctrine + Move 5's rule refinement (OPEN ON ONE TRUE MOMENT at commit `c6f5d59`).

3. **"Extend `worldcli anchor-groove` to count anchors-per-opening-sentence"** → **EXECUTED** at commit `4fb7b71` (`--opening-density` flag). This is the SAME work as #2 framed differently.

4. **"N=3+ validation per cell via individual `worldcli ask` runs"** → **DEFERRED**. Sketch-tier holds; characterization-tier escalation only needed if the refined OPEN ON ONE TRUE MOMENT clause's bite is questioned at scale.

5. **"Cross-character bite-test"** → **DEFERRED** until other characters accumulate post-restart traffic. Same deferral pattern as report 2010 follow-up 4.

### `reports/2026-04-26-2050-batch-h3-bridge-wins-scene-driving-clause-design.md`

The 2050 report designed the scene-driving clause. 4 follow-ups:

1. **"Live in-vivo verification (forward-motion rate)"** → **EXECUTED** at OBSERVATIONS 21:55 + Move 3's anchor-groove pull. Jasper's recent corpus visibly shows forward motion in most replies (the "we're going to walk to the potter's stall" pattern repeating organically across new replies).

2. **"Cross-character bite-test"** → **DEFERRED** until cross-character traffic accumulates.

3. **"Predecessor-omit testing"** → **DEFERRED** as #2/#3 above.

4. **"Earned-exception (stillness when user leads) verify"** → **DEFERRED**. No live test moment surfaced tonight where the user led stillness; the exception is theoretically named but not exercised under current conditions.

### `reports/2026-04-26-2200-no-nanny-register-bite-test-confirms-clean-bite-on-pastor-rick.md`

The 2200 NO_NANNY bite-test on Pastor Rick. 4 follow-ups:

1. **"Live in-vivo verification on Pastor Rick"** → **DEFERRED**. Pastor Rick has not generated post-restart traffic (only Jasper has). Worth executing when Ryan plays with Pastor Rick.

2. **"Cross-character escalation"** → **EXECUTED** at Move 2 (commit `f2e68f9` — Steven 5/5 = 3/3, escalates toward claim-tier). Per the 2245 report, Steven's blunt-advice failure mode also suppressed cleanly.

3. **"Earned-exception scope test"** → **DEFERRED**. Worth executing in a future batch-hypothesis round; not blocking anything currently.

4. **"OPEN ON ONE TRUE THING bite on Pastor Rick"** → **SUPERSEDED_BY** Move 5's refinement of the clause to OPEN ON ONE TRUE MOMENT (commit `c6f5d59`). The original concern was ChatGPT-roleplay-Rick had multi-anchor opening tendency; the refined integration-shaped framing makes that less of a problem since the discrimination is now about INTEGRATION, not COUNT.

### `reports/2026-04-26-1925-character-canonical-derivation-emphasis-redistribution.md`

The 1925 derivation experiment had 4 follow-ups:

1. **"Cross-world replication (John/Hal in Elderwood Hearth)"** → **DEFERRED** with target *"next session when a fresh derivation experiment makes sense."* Not blocking anything currently.

2. **"Different-prompt replication"** → **DEFERRED**. Same rationale.

3. **"Pre-`6b88881` baseline replay"** → **ABANDONED**. The cast-listing-derivation injection has now had multiple worked uses tonight; the question of "did this PRE-EXIST 6b88881 vs was it AMPLIFIED by it" is no longer load-bearing for any in-flight decision. The injection is shipped + working; pre-baseline isolation isn't worth the spend.

4. **"Brief-and-deferred dimension noisy at N=5"** → **ABANDONED**. The dimension didn't carry the experiment; further investigation of it isn't promised by the data.

### `reports/2026-04-26-2245-no-nanny-cross-character-steven-escalation.md` (Move 2 of this run)

3 follow-ups:

1. **"John bite-test"** → **DEFERRED** to a future auto-commit run or natural spend window. Two characters (Rick + Steven) is enough for claim-tier escalation; third character would solidify but isn't blocking.

2. **"Jasper bite-test (control, expected tested-null)"** → **DEFERRED** with similar rationale.

3. **"Earned-exception scope test"** → **DEFERRED** (same as 2200's #3, deduplicated).

### `reports/OBSERVATIONS.md` open threads

- **22:08 Medium-length-on-Auto observation** — open question whether the equilibrium holds under higher-tension conversation. The deep follow-up message at ~22:30 (asking the two questions) ANSWERED this with data: Medium holds with elastic upward expansion when Burden requires it. **EXECUTED** in the data-corroboration response shipped with that turn (no separate commit — the answer lives in the chat itself).

## Summary tally

- **EXECUTED:** 7 follow-ups (cross-reply rule + bite-test + live verification + Steven NO_NANNY + Move 3 instrument + Move 5 refinement + ship h3 prop-density + the medium-length deep-question answer)
- **SUPERSEDED_BY:** 2 follow-ups (Shannon-entropy → opening-density flag; Rick prop-density → OPEN ON ONE TRUE MOMENT refinement)
- **ABANDONED:** 3 follow-ups (scene-state reset for Jasper; pre-`6b88881` baseline replay; brief-and-deferred dimension)
- **DEFERRED:** 11 follow-ups (most are "wait for organic traffic" or "wait for the question to become load-bearing again")

The tally favors `executed` + `superseded_by` heavily — tonight was unusually productive at closing loops, partly because of the auto-commit run shape itself. Most `deferred` entries are honestly that — not abandoned, not executed, just blocked on natural traffic accumulation or on a future question becoming load-bearing.

The registry is now honest. Future sessions can read this report to understand which threads from the styling-clauses arc are settled vs which are still live.
