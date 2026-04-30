# Blind-reader live R1 results (pending real-reader rows)

Pre-registered results shell for the first live strict blind-reader run.

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
- included_readers_n: `TBD (real entries not yet present)`
- excluded_readers_n: `TBD`
- exclusion_reasons_summary: `TBD`

## 2) Data integrity checks (pass/fail)

- required columns present: PASS
- stop-gates passed: PENDING
- missing-row check: FAIL (as expected pre-collection)
- rating-range check: PENDING
- notes on any integrity exceptions:
  - Strict validator output on current sheet: `row 2: authenticity_1_5 is required for included rows`
  - This is expected until real-reader values are entered.

## 3) Descriptive results (raw-to-mean trace)

Pending real-reader row completion.

## 4) Threshold mapping (mechanical)

Pending real-reader row completion.

## 5) Caveats (scoped, non-rescuing)

- No verdict is admissible until strict validation passes on non-synthetic reader rows.

## 6) Interpretation (after verdict only)

Pending.

## 7) Doctrine impact (gated)

- doctrine update required: PENDING

## 8) Next action

- immediate next move: enter real-reader ratings for included rows and rerun strict validator.
- owner: Ryan + Codex operator pass
- done condition: `python3 scripts/validate-blind-reader-sheet.py` returns success and this report is promoted from pending to canonical result.
