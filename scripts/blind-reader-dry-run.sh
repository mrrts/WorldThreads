#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHEET="$ROOT/reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv"
BACKUP="/tmp/blind-reader-score-sheet-v1.backup.csv"

cp "$SHEET" "$BACKUP"

python3 - <<'PY'
import csv
path = "/Users/ryansmith/Sites/rust/world-chat/reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv"
with open(path, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

for row in rows:
    if row["reader_id"] == "R001":
        row.update({
            "reader_bucket": "tradition_fluent",
            "excluded": "false",
            "exclusion_reason": "",
            "authenticity_1_5": "4",
            "doctrinal_weight_1_5": "4",
            "tradition_recognition_1_5": "4",
            "reader_notes": "DRY_RUN_SYNTHETIC",
        })
    if row["reader_id"] == "R002":
        row.update({
            "reader_bucket": "tradition_unfamiliar",
            "excluded": "false",
            "exclusion_reason": "",
            "authenticity_1_5": "3",
            "doctrinal_weight_1_5": "4",
            "tradition_recognition_1_5": "3",
            "reader_notes": "DRY_RUN_SYNTHETIC",
        })

with open(path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)
PY

python3 "$ROOT/scripts/validate-blind-reader-sheet.py"
cp "$BACKUP" "$SHEET"
python3 "$ROOT/scripts/validate-blind-reader-sheet.py" --allow-unscored

echo "blind-reader dry-run ok"
