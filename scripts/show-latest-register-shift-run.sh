#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
QUIET=false
FORMAT="text"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --quiet)
      QUIET=true
      shift
      ;;
    --format)
      FORMAT="${2:-}"
      if [[ -z "$FORMAT" ]]; then
        echo "--format requires a value (text|csv)" >&2
        exit 1
      fi
      shift 2
      ;;
    *)
      echo "Unknown arg: $1" >&2
      echo "Usage: $0 [--quiet] [--format text|csv]" >&2
      exit 1
      ;;
  esac
done

if [[ "$FORMAT" != "text" && "$FORMAT" != "csv" ]]; then
  echo "Invalid --format '$FORMAT' (expected text or csv)" >&2
  exit 1
fi

LATEST="$("$ROOT_DIR/scripts/latest-register-shift-run.sh")"

if ! $QUIET && [[ "$FORMAT" == "text" ]]; then
  echo "latest_run: $LATEST"
fi

python3 - "$LATEST" "$FORMAT" <<'PY'
import json
import os
import sys

root = sys.argv[1]
fmt = sys.argv[2]
pairs = [
    ("darren-register-shift.json", "Darren shift"),
    ("jasper-register-shift.json", "Jasper shift"),
    ("darren-pack.json", "Darren pack"),
    ("jasper-pack.json", "Jasper pack"),
    ("darren-pack-rebound.json", "Darren rebound pack"),
    ("jasper-pack-rebound.json", "Jasper rebound pack"),
]

rows = []
for name, label in pairs:
    path = os.path.join(root, name)
    if not os.path.exists(path):
        continue
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if "totals" in data:
        t = data["totals"]
        rows.append({
            "label": label,
            "kind": "shift",
            "shift_rate": float(t.get("shift_rate", 0.0)),
            "rebound_rate": float(t.get("rebound_rate", 0.0)),
            "avg_shifts": float(t.get("avg_shifts_per_message", 0.0)),
            "speech_first_rate": "",
            "shift_run_rate": "",
            "gate_passed": "",
        })
    else:
        rows.append({
            "label": label,
            "kind": "pack",
            "shift_rate": "",
            "rebound_rate": "",
            "avg_shifts": "",
            "speech_first_rate": float(data.get("speech_first_rate", 0.0)),
            "shift_run_rate": float(data.get("shift_run_rate", 0.0)),
            "gate_passed": data.get("gate", {}).get("passed"),
        })

if fmt == "csv":
    print("label,kind,shift_rate,rebound_rate,avg_shifts,speech_first_rate,shift_run_rate,gate_passed")
    for r in rows:
        print(
            f"{r['label']},{r['kind']},{r['shift_rate']},{r['rebound_rate']},{r['avg_shifts']},"
            f"{r['speech_first_rate']},{r['shift_run_rate']},{r['gate_passed']}"
        )
else:
    for r in rows:
        if r["kind"] == "shift":
            print(
                f"{r['label']}: shift_rate={r['shift_rate']:.4f} "
                f"rebound_rate={r['rebound_rate']:.4f} avg_shifts={r['avg_shifts']:.4f}"
            )
        else:
            print(
                f"{r['label']}: speech_first_rate={r['speech_first_rate']:.4f} "
                f"shift_run_rate={r['shift_run_rate']:.4f} gate_passed={r['gate_passed']}"
            )
PY
