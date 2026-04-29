#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLI="$ROOT/src-tauri/target/debug/worldcli"
STAMP="$(date +%Y-%m-%d-%H%M)"

DARREN="ddc3085e-0549-4e1f-a7b6-0894aa8180c6"
JASPER="fd4bd9b5-8768-41e6-a90f-bfb1179b1d59"

LIMIT="${LIMIT:-8}"
SHIFT_LIMIT="${SHIFT_LIMIT:-40}"
SHIFT_MIN_RATE="${SHIFT_MIN_RATE:-0.35}"
SHIFT_MIN_REBOUND="${SHIFT_MIN_REBOUND:-0.20}"
RUBRIC_REF="${RUBRIC_REF:-real-conversation-830am}"
CONFIRM_COST="${CONFIRM_COST:-8}"
REPLAY_N="${REPLAY_N:-3}"
MOMENTSTAMP_OVERRIDE="${MOMENTSTAMP_OVERRIDE:-user bandwidth is low; keep line-first, concrete, and alive; avoid templated scaffolding}"

usage() {
  cat <<EOF
Usage: $(basename "$0") [--help]

Runs the daily chat-improvement loop:
  1) register-shift gates (Darren + Jasper)
  2) 8:30am rubric evaluate (Darren + Jasper)
  3) fixed-momentstamp replay sample pack (Darren + Jasper)

Environment overrides:
  LIMIT, SHIFT_LIMIT, SHIFT_MIN_RATE, SHIFT_MIN_REBOUND,
  RUBRIC_REF, CONFIRM_COST, REPLAY_N, MOMENTSTAMP_OVERRIDE
EOF
}

if [[ "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

echo "[loop] stamp=$STAMP"
echo "[loop] running register-shift gates..."
"$CLI" --json register-shift --character "$DARREN" --limit "$SHIFT_LIMIT" \
  --gate-min-shift-rate "$SHIFT_MIN_RATE" --gate-min-rebound-rate "$SHIFT_MIN_REBOUND" \
  > "$ROOT/reports/${STAMP}-loop-register-shift-darren.json"

"$CLI" --json register-shift --character "$JASPER" --limit "$SHIFT_LIMIT" \
  --gate-min-shift-rate "$SHIFT_MIN_RATE" --gate-min-rebound-rate "$SHIFT_MIN_REBOUND" \
  > "$ROOT/reports/${STAMP}-loop-register-shift-jasper.json"

echo "[loop] running 8:30am rubric evaluate..."
"$CLI" --json evaluate --ref HEAD~1 --character "$DARREN" --limit "$LIMIT" \
  --rubric-ref "$RUBRIC_REF" --confirm-cost "$CONFIRM_COST" \
  > "$ROOT/reports/${STAMP}-loop-evaluate-darren.json"

"$CLI" --json evaluate --ref HEAD~1 --character "$JASPER" --limit "$LIMIT" \
  --rubric-ref "$RUBRIC_REF" --confirm-cost "$CONFIRM_COST" \
  > "$ROOT/reports/${STAMP}-loop-evaluate-jasper.json"

echo "[loop] running fixed-signature replay pack..."
"$CLI" --json replay --character "$DARREN" \
  --prompt "Respond like I just had a rough morning and only have 20 seconds of patience." \
  --refs HEAD~1,HEAD --n "$REPLAY_N" --momentstamp-override "$MOMENTSTAMP_OVERRIDE" \
  --confirm-cost "$CONFIRM_COST" \
  > "$ROOT/reports/${STAMP}-loop-replay-darren.json"

"$CLI" --json replay --character "$JASPER" \
  --prompt "Respond like I just had a rough morning and only have 20 seconds of patience." \
  --refs HEAD~1,HEAD --n "$REPLAY_N" --momentstamp-override "$MOMENTSTAMP_OVERRIDE" \
  --confirm-cost "$CONFIRM_COST" \
  > "$ROOT/reports/${STAMP}-loop-replay-jasper.json"

echo "[loop] complete"
echo "[loop] artifacts:"
echo "  reports/${STAMP}-loop-register-shift-darren.json"
echo "  reports/${STAMP}-loop-register-shift-jasper.json"
echo "  reports/${STAMP}-loop-evaluate-darren.json"
echo "  reports/${STAMP}-loop-evaluate-jasper.json"
echo "  reports/${STAMP}-loop-replay-darren.json"
echo "  reports/${STAMP}-loop-replay-jasper.json"
