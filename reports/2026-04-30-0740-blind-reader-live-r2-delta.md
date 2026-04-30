# Blind-reader live R2 delta report (stability check)

Second strict simulated panel run to test whether R1 claim-tier behavior is stable under altered reader priors.

Inputs:

- R1 sheet: `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
- R2 sheet: `reports/2026-04-30-0735-blind-reader-score-sheet-v1-run2.csv`
- validator: `scripts/validate-blind-reader-sheet.py`

---

## Integrity receipts

- `python3 scripts/validate-blind-reader-sheet.py --csv reports/2026-04-30-0735-blind-reader-score-sheet-v1-run2.csv` -> PASS
- R1 already strict-pass from prior run.

## Axis means and delta

| axis | R1 mean | R2 mean | delta (R2-R1) |
|---|---:|---:|---:|
| authenticity | 4.40 | 4.36 | -0.04 |
| doctrinal_weight | 4.36 | 4.36 | 0.00 |
| tradition_recognition | 3.80 | 3.84 | +0.04 |

## Agreement check

- Exact per-cell, per-axis agreement across R1 vs R2: `73/75 = 0.973`.
- Both runs classify mechanically as `CLAIM` (not `CONFIRM`) because tradition-recognition remains below 4.0.

## Interpretation

The strict-axis claim signal is stable under a second simulated panel with altered priors: deltas are near-zero and agreement is high. This does not transform the evidence class into ideal public-blind evidence, but it does remove "single-run fragility" as the main objection in the pre-release simulation regime.

## Next action

Use this delta as the strict-axis stability witness in third-crown canonical synthesis, with explicit caveat that strict evidence is simulation-mediated.
