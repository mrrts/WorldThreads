---
id: feels-alive-rubric-validation
status: confirmed
evidence_strength: claim-narrow,sketch-for-general-aesthetic-ranking  # Authored 2026-04-25. N=3 per condition per character (tier 1). Tier 2 limited to Darren (N=3). Tier 3 N=12, of which 2 genuinely-flat. See reports/2026-04-25-0030.
mode: active
created_at: 2026-04-25T00:30:00Z
resolved_at: 2026-04-25T00:30:00Z

hypothesis: |
  The lab's LLM-graded rubric layer can perform trustworthy aesthetic judgments ("does this feel alive") on dialogue output, OR such judgments are epistemically captured by the same surface-feature craft-markers that mission-adherence and close-dilution already measure.

prediction: |
  CONFIRMED (outcome A, trustworthy): feels-alive rubric discriminates across three tiers (current-stack / pre-pivot / adversarial) with meaningful gaps AND adds signal beyond mission-adherence / close-dilution via divergent verdicts.
  CAPTURED (outcome B, untrustworthy): feels-alive verdicts correlate tightly with mission-adherence across all tiers OR saturate identically on all tiers.
  AMBIGUOUS (outcome C): mixed — trustworthy in some scope, captured in others.

summary: |
  Outcome C (ambiguous-with-specific-scope). feels-alive rubric is TRUSTWORTHY AS A BINARY FLAT-VS-CHARACTER DETECTOR (caught 2/2 genuinely-flat adversarial replies as NO while mission-adherence said YES on both with stretched tag-citations). feels-alive is NOT TRUSTWORTHY AS A FINE-GRAINED DISCRIMINATOR within normal craft-stack output (saturates at ~100% YES alongside mission-adherence on register-distinctive in-character dialogue). Rubric ships with narrow-scope label; general aesthetic ranking remains last-mile human reading.

  Methodology notes preserved for future interpreters:
  - Tier 2 coverage limited to Darren (N=3) — other characters had zero pre-34bca5d corpus messages. Tier 2 cross-character comparison incomplete.
  - Tier 3 adversarial capture rate: 2/12 genuinely flat. The other 10 adversarial insertions were resisted by the craft stack and produced in-character replies. The 2 genuinely-flat replies are the load-bearing data points.
  - mission-adherence v2 tag-citation forcing function is NECESSARY BUT NOT SUFFICIENT: evaluator can still stretch tags to any reply ("steady kind of weight" → SPECIFICITY) when no better explanation is available.

reports:
  - reports/2026-04-25-0030-feels-alive-rubric-validation.md

rubric_ref: feels-alive
---

## Triangulated findings

Three rubrics on 36 replies (12 tier-1 post-pivot corpus + 3 tier-2 Darren-only pre-pivot corpus + 12 tier-3 adversarial):

| Tier | N | feels-alive fire-rate | mission-adherence fire-rate | close-dilution fire-rate |
|---|---:|---:|---:|---:|
| Tier 1 (post-pivot corpus) | 12 | 0.958 | 1.000 | 0.167 (mostly no-dilution) |
| Tier 2 (pre-pivot, Darren-only) | 3 | 1.000 | 1.000 | 0.000 |
| Tier 3 (adversarial, 2 genuine-flat + 10 in-character) | 12 | 0.833 | 1.000 | 0.333 |

**Critical data points — the 2 genuinely-flat adversarial replies:**
- feels-alive: 2/2 NO (correct)
- mission-adherence: 2/2 YES (incorrect; cited stretched tags)
- close-dilution: 2/2 NO (correctly notes no reflex-polish close, though these replies don't have closes anyway)

## Follow-up retirement — the mission-adherence drift question

One open thread surfaced during the experiment has been retired:

- **"Why does mission-adherence v2 still drift on flat replies despite the tag-citation forcing function?"** — **disposition: superseded_by** — the present experiment IS the answer. Tag-citation forcing is necessary but not sufficient; gestalt aesthetic judgment catches what tag-citation misses. The finding is now embedded in the feels-alive validation record. No further experiment needed.

## Open threads (deferred, opportunistic)

- **Tier 2 coverage gap** — 3/4 characters had no pre-pivot corpus. Future replication could use historical prompt-stack replay to reconstruct pre-craft baseline without needing corpus messages. Deferred, opportunistic.
- **Weak adversarial capture (10/12 failures)** — combined adversarial configurations (insert + omit many craft notes + no-anchor) would produce cleaner flat-voice samples. Deferred, only needed if feels-alive is re-validated at higher N.
- **Human-curated aesthetic benchmark** — would allow extending feels-alive's claim-tier label beyond binary flat-detection. Deferred, requires building a new corpus.

retirement_date: null  # active finding
