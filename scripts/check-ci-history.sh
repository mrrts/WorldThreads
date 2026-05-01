#!/usr/bin/env bash
# Surface consecutive-red CI streaks per workflow.
#
# A CI/test/check that's been red across many runs is standing apparatus-
# dishonesty — the gate claims to be enforcing something but isn't. This
# script makes the streak visible so it can't normalize into noise.
#
# See CLAUDE.md "'Pre-existing red' is not a permanent disposition" doctrine.
#
# Usage:
#   ./scripts/check-ci-history.sh           # default: 20 runs
#   ./scripts/check-ci-history.sh 50        # custom limit
#   ./scripts/check-ci-history.sh --quiet   # exit 1 if any workflow has ≥3 consecutive red, no output unless red

set -euo pipefail

LIMIT="${1:-20}"
QUIET=false
if [[ "${1:-}" == "--quiet" ]]; then
  QUIET=true
  LIMIT=20
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI not installed; cannot check CI history" >&2
  exit 0
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq not installed; cannot parse CI history" >&2
  exit 0
fi

# Pull recent runs (any branch). --json keeps it stable across gh versions.
runs_json=$(gh run list --limit "$LIMIT" --json workflowName,conclusion,createdAt,displayTitle,headBranch 2>/dev/null) || {
  $QUIET || echo "(could not fetch CI history; gh auth may not be configured)" >&2
  exit 0
}

# Per workflow, count consecutive-red streak from most-recent. A streak
# breaks at the first non-failure (success / cancelled / in_progress / null).
streak_report=$(echo "$runs_json" | jq -r '
  group_by(.workflowName)
  | map({
      workflow: .[0].workflowName,
      total_runs: length,
      latest_consecutive_red: (
        # gh returns newest-first by default within a group when sort-stable
        ([.[] | .conclusion] |
          # walk until first non-failure, count failures encountered
          reduce .[] as $c ({count: 0, broken: false};
            if .broken then .
            elif $c == "failure" then {count: (.count + 1), broken: false}
            else {count: .count, broken: true}
            end
          )
        ).count
      ),
      latest_subject: .[0].displayTitle
    })
  | map(select(.latest_consecutive_red >= 3))
')

problem_count=$(echo "$streak_report" | jq 'length')

if [[ "$problem_count" -eq 0 ]]; then
  $QUIET || echo "✓ No CI workflow has ≥3 consecutive red runs in the last $LIMIT pushes."
  exit 0
fi

if $QUIET; then
  exit 1
fi

echo "⚠ Standing-red CI streaks detected (≥3 consecutive failures):"
echo
echo "$streak_report" | jq -r '
  .[] |
  "  \(.workflow): \(.latest_consecutive_red) consecutive red runs (latest: \"\(.latest_subject)\")"
'
echo
echo "Per CLAUDE.md \"Pre-existing red is not a permanent disposition\":"
echo "  fix it / remove it / move to non-blocking before next push, not next time."
echo "  Standing-red gates teach the team to ignore the signal."
echo
echo "Investigate with:"
echo "  gh run list --workflow=<workflow-name> --limit 5"
echo "  gh run view <run-id> --log-failed | tail -50"
exit 2
