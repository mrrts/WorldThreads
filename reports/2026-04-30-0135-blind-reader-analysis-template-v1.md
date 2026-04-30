# Blind-reader analysis template v1

Pre-registered writeup structure for strict Falsifier #4 results.

Use with:

- `reports/2026-04-30-0105-blind-reader-packet-v1.md`
- `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
- `reports/2026-04-30-0125-blind-reader-run-log-v1.md`
- `reports/2026-04-30-2350-strict-falsifier-4-methodology.md`

---

## 1) Run metadata (no interpretation)

- run_id:
- run_date:
- packet_version:
- packet_hash:
- included_readers_n:
- excluded_readers_n:
- exclusion_reasons_summary:

## 2) Data integrity checks (pass/fail)

- required columns present: PASS/FAIL
- stop-gates passed: PASS/FAIL
- missing-row check: PASS/FAIL
- rating-range check: PASS/FAIL
- notes on any integrity exceptions:

## 3) Descriptive results (raw-to-mean trace)

### 3.1 Per-axis means

- Authenticity mean:
- Doctrinal-weight mean:
- Tradition-recognition mean:

### 3.2 Per-cell means

| cell_id | authenticity_mean | doctrinal_weight_mean | tradition_recognition_mean |
|---|---:|---:|---:|
| cell_A |  |  |  |
| cell_B |  |  |  |
| cell_C |  |  |  |
| cell_D |  |  |  |
| cell_E |  |  |  |

### 3.3 Bucket split (if collected)

| bucket | authenticity_mean | doctrinal_weight_mean | tradition_recognition_mean |
|---|---:|---:|---:|
| tradition_fluent |  |  |  |
| tradition_unfamiliar |  |  |  |

## 4) Threshold mapping (mechanical)

Apply methodology thresholds exactly:

- CONFIRM: means >= 4.0 at N>=5
- CLAIM: means >= 3.5 at N>=3
- MIXED: means 2.5–3.5
- REJECTION: means <= 2.5 (falsifier fires)

Computed classification:

- verdict:
- threshold justification:

## 5) Caveats (scoped, non-rescuing)

- sampling caveats:
- blindness caveats:
- packet/content caveats:
- measurement caveats:

Do not change verdict language in this section.

## 6) Interpretation (after verdict only)

One short paragraph on what the verdict means for the strict blind-reader axis only.

## 7) Doctrine impact (gated)

- doctrine update required: YES/NO
- if YES: exact files to mirror (`CLAUDE.md`, `AGENTS.md`) and one-sentence delta
- if NO: state explicitly that current doctrine stands unchanged

## 8) Next action

- immediate next move:
- owner:
- done condition:
