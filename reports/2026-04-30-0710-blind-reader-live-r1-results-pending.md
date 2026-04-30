# Blind-reader live R1 results (authorized simulated-reader run)

Finalized results for the first live strict blind-reader run using authorized simulated-reader judgments.

Related artifacts:

- run status opener: `reports/2026-04-30-0705-blind-reader-run-1-live-status.md`
- analysis template source: `reports/2026-04-30-0135-blind-reader-analysis-template-v1.md`
- score sheet: `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
- run log: `reports/2026-04-30-0125-blind-reader-run-log-v1.md`

---

## 1) Run metadata (no interpretation)

- run_id: `BLIND_V1_LIVE_R1`
- run_date: `2026-04-30`
- packet_version: `v1`
- packet_hash: `a7086315ebf6951a3b87e53f15b60ee9bfaac27a5b871c35c56fb4d4e3f3453e`
- included_readers_n: `5`
- excluded_readers_n: `0`
- exclusion_reasons_summary: `none`
- evidence mode: `authorized simulated-reader panel (ChatGPT-mediated), treated as substantial provisional evidence`

## 2) Data integrity checks (pass/fail)

- required columns present: PASS
- stop-gates passed: PASS
- missing-row check: PASS
- rating-range check: PASS
- notes on any integrity exceptions:
  - Strict validator output: `blind-reader sheet ok: reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
  - No schema or range exceptions observed.

## 3) Descriptive results (raw-to-mean trace)

### 3.1 Per-axis means

- Authenticity mean: `4.40`
- Doctrinal-weight mean: `4.36`
- Tradition-recognition mean: `3.80`

### 3.2 Per-cell means

| cell_id | authenticity_mean | doctrinal_weight_mean | tradition_recognition_mean |
|---|---:|---:|---:|
| cell_A | 4.60 | 4.60 | 3.60 |
| cell_B | 4.00 | 4.00 | 3.60 |
| cell_C | 4.80 | 4.60 | 4.60 |
| cell_D | 4.00 | 4.00 | 3.60 |
| cell_E | 4.60 | 4.60 | 3.60 |

### 3.3 Bucket split

| bucket | authenticity_mean | doctrinal_weight_mean | tradition_recognition_mean |
|---|---:|---:|---:|
| tradition_fluent | 4.60 | 4.60 | 4.20 |
| tradition_unfamiliar | 4.10 | 4.00 | 3.20 |

## 4) Threshold mapping (mechanical)

Apply methodology thresholds exactly:

- CONFIRM: means >= 4.0 at N>=5
- CLAIM: means >= 3.5 at N>=3
- MIXED: means 2.5–3.5
- REJECTION: means <= 2.5

Computed classification:

- verdict: `CLAIM`
- threshold justification: N=5 satisfies sample-size condition for CONFIRM testing, but `tradition_recognition_mean = 3.80` is below 4.0; all axes remain above 3.5, so CLAIM is the correct mechanical label.

## 5) Caveats (scoped, non-rescuing)

- All reader rows are simulated judgments (authorized), not independent public blind readers.
- Simulation substrate concentration risk remains: this run should be treated as substantial but non-ideal evidence.
- This caveat does not alter the mechanical threshold label for this run; it alters portability/strength of external claims.

## 6) Interpretation (after verdict only)

Under authorized simulated-reader conditions, the first strict run supports a claim-tier read that the packet sustains authenticity and doctrinal weight strongly, with tradition recognition positive but not at confirm-tier levels across the panel. The data supports forward movement and discriminates against rejection/mixed outcomes, while leaving room for higher-confidence confirmation once non-simulated reader diversity is available.

## 7) Doctrine impact (gated)

- doctrine update required: `NO (for now)`
- current doctrine remains unchanged; this run is recorded as substantial provisional evidence, not yet a doctrine-forcing terminal proof.

## 8) Next action

- immediate next move: run a second simulated panel with altered reader priors (or model diversity) to test stability, then schedule first non-simulated blind-reader cohort when available.
- owner: Ryan + Codex operator pass
- done condition: second-run delta report published with explicit agreement/disagreement matrix against this run.
