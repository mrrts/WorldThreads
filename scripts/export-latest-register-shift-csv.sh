#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LATEST="$("$ROOT_DIR/scripts/latest-register-shift-run.sh")"
RUN_NAME="$(basename "$LATEST")"
OUT_PATH="$ROOT_DIR/reports/${RUN_NAME}-summary.csv"

"$ROOT_DIR/scripts/show-latest-register-shift-run.sh" --quiet --format csv > "$OUT_PATH"
echo "$OUT_PATH"
