# Blind-reader dry-run receipt v1

Dry-run protocol executed against successor-arc artifacts.  
No real-reader evidence collected; no doctrinal claim updated from this run.

## Inputs used

- Packet: `reports/2026-04-30-0105-blind-reader-packet-v1.md`
- Score sheet: `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
- Run log scaffold: `reports/2026-04-30-0125-blind-reader-run-log-v1.md`
- Analysis template: `reports/2026-04-30-0135-blind-reader-analysis-template-v1.md`
- Validator: `scripts/validate-blind-reader-sheet.py`
- Protocol: `reports/2026-04-30-0145-blind-reader-dry-run-protocol-v1.md`

## Procedure executed

1. Backed up score sheet template.
2. Applied synthetic ratings to template rows for `R001` and `R002` (`DRY_RUN_SYNTHETIC` notes).
3. Ran strict validator:
   - `python3 scripts/validate-blind-reader-sheet.py`
4. Restored score sheet from backup.
5. Re-ran template validator:
   - `python3 scripts/validate-blind-reader-sheet.py --allow-unscored`

## Validator outputs

- Strict mode: `blind-reader sheet ok: reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
- Template mode (post-restore): `blind-reader sheet ok: reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`

## Friction notes

- No schema or range-validation friction encountered.
- Restoration path worked; sheet returned to unscored template state.

## Receipt conclusion

Dry-run mechanics pass at v1:

- synthetic fill works
- strict validation works
- cleanup + template re-check works

This receipt is operational only. It is not evidence on the strict blind-reader axis.
