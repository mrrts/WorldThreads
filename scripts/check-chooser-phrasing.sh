#!/usr/bin/env bash
set -euo pipefail

# Guardrail: prevent legacy chooser phrasing from re-entering doctrine/docs.
# Usage:
#   scripts/check-chooser-phrasing.sh
#
# Exit codes:
#   0 = clean
#   1 = legacy phrasing found

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SCAN_PATHS=(
  "$ROOT_DIR/AGENTS.md"
  "$ROOT_DIR/CLAUDE.md"
  "$ROOT_DIR/.claude/skills"
  "$ROOT_DIR/.claude/memory"
  "$ROOT_DIR/.claude/hooks"
  "$ROOT_DIR/.agents/skills"
)

# Legacy phrases banned after fixed-4 chooser elevation.
PATTERN='\{Continue, Exit\}|Continue/Exit|Continue —|Exit —|Yes, proceed'

echo "Checking chooser phrasing drift..."
echo "Pattern: $PATTERN"
echo

python3 - "$PATTERN" "${SCAN_PATHS[@]}" <<'PY'
import pathlib
import re
import sys

pattern = re.compile(sys.argv[1])
paths = [pathlib.Path(p) for p in sys.argv[2:]]
hits = []

def iter_files(p: pathlib.Path):
    if p.is_file():
        yield p
        return
    if not p.exists():
        return
    for f in p.rglob("*"):
        if not f.is_file():
            continue
        if "__pycache__" in f.parts:
            continue
        if f.suffix in {".pyc", ".pyo"}:
            continue
        if f.name.startswith(".DS_Store"):
            continue
        if f.is_file():
            yield f

for p in paths:
    for f in iter_files(p):
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        for i, line in enumerate(text.splitlines(), start=1):
            if pattern.search(line):
                hits.append((str(f), i, line.strip()))

if hits:
    for file, line_no, line in hits:
        print(f"{file}:{line_no}:{line}")
    print("\nFAIL: Legacy chooser phrasing found.")
    print("Expected doctrine: fixed 4 numbered options per turn-ending chooser.")
    sys.exit(1)

print("PASS: No legacy chooser phrasing detected.")
PY
