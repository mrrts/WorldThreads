# Blind-reader dry-run protocol v1

Purpose: prove the successor-arc mechanics work end-to-end before any real reader data is collected.

Scope: internal operator dry run only (no external readers, no evidentiary claims).

## Inputs

- Score sheet: `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`
- Validator: `scripts/validate-blind-reader-sheet.py`
- Run log scaffold: `reports/2026-04-30-0125-blind-reader-run-log-v1.md`

## Procedure

1. **Template check (pre-fill)**
   - Run: `python3 scripts/validate-blind-reader-sheet.py --allow-unscored`
   - Expect: pass.
2. **Synthetic fill**
   - Populate exactly two synthetic reader rows per cell (mark IDs clearly synthetic, e.g. `DRY001`, `DRY002`).
   - Fill all three rating columns with valid integers `1..5`.
   - Keep `excluded=false` and blank exclusion reason for synthetic rows.
3. **Strict validation**
   - Run: `python3 scripts/validate-blind-reader-sheet.py`
   - Expect: pass.
4. **Stop-gate rehearsal**
   - In run log scaffold, mark stop-gates as checked for dry-run context.
   - Confirm packet hash field is present (placeholder allowed for dry run).
5. **Cleanup**
   - Remove synthetic ratings and synthetic IDs.
   - Return score sheet to template state.
6. **Template re-check**
   - Run `--allow-unscored` again and confirm pass.

## Pass criteria

- Validator passes in both template and strict phases.
- No schema drift introduced during synthetic fill.
- Score sheet is restored to clean template state at end.

## Fail handling

- If strict validation fails, fix schema/data mismatch and re-run from step 2.
- If cleanup leaves residue, restore from git and repeat dry run.

## Output artifact

Record dry-run completion in a short report or comms note with:

- validator outputs (template + strict + template re-check)
- any friction points found
- explicit statement that no real-reader evidence was collected
