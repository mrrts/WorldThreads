#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORTS_DIR="$ROOT_DIR/reports"

latest="$(ls -1dt "$REPORTS_DIR"/register-shift-dashboard-* 2>/dev/null | head -n 1 || true)"
if [[ -z "$latest" ]]; then
  echo "No register-shift dashboard runs found under $REPORTS_DIR" >&2
  exit 1
fi

echo "$latest"
