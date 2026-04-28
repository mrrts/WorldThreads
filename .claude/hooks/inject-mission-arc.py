#!/usr/bin/env python3
"""UserPromptSubmit hook: auto-fire mission-arc + inject trajectory as context.

Promotes the mission-arc auto-fire discipline from layer 4 (skill body
discipline; relies on agent remembering to invoke) to layer 5 (hook-
enforced gate; fires automatically per /eureka iteration 4's doctrine).

Mechanism: on every user prompt, run `.claude/skills/mission-arc/render.sh 8
--substantive` and inject the result as `hookSpecificOutput.additionalContext`
so Claude sees the recent 𝓕-trajectory before composing its next reply.
The injection is lightweight (~150-300 tokens for 8 substantive commits)
to keep cache cost low while keeping the trajectory always-present.

Why this hook exists (per /eureka 2026-04-28-0759 iteration 4 doctrine):
calibrated disciplines drift fast under repeated practice. The mission-arc
auto-fire shipped 2026-04-28 with the skill body's discipline-only
enforcement; my own adherence in the same /eureka run dropped to ~33%
within hours. The structural promotion is the corrective.

Cost: $0 per fire (pure shell + python; no API calls).

Failure mode: silent no-op when render.sh isn't executable, when not in
a git repo, or when the script returns non-zero. Hook never blocks the
user prompt; worst case Claude responds without trajectory context.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path


def find_repo_root() -> Path | None:
    """Locate the git repo root by walking up from CWD."""
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True, text=True, timeout=3,
        )
        if out.returncode == 0:
            return Path(out.stdout.strip())
    except Exception:
        pass
    return None


def run_mission_arc(repo_root: Path, limit: int = 8) -> str | None:
    """Run render.sh and return its stdout, or None on failure."""
    script = repo_root / ".claude" / "skills" / "mission-arc" / "render.sh"
    if not script.exists() or not os.access(script, os.X_OK):
        return None
    try:
        out = subprocess.run(
            [str(script), str(limit), "--substantive"],
            capture_output=True, text=True, timeout=10,
            cwd=str(repo_root),
        )
        if out.returncode == 0 and out.stdout.strip():
            return out.stdout.strip()
    except Exception:
        return None
    return None


def main() -> int:
    try:
        # Read payload but don't actually require any field — this hook
        # fires on every prompt regardless of content.
        json.loads(sys.stdin.read())
    except Exception:
        pass

    repo_root = find_repo_root()
    if repo_root is None:
        return 0  # not in a repo; silent no-op

    arc = run_mission_arc(repo_root)
    if not arc:
        return 0  # render failed; silent no-op

    additional_context = (
        "MISSION-ARC AUTO-FIRE (hook-enforced, layer 5). The recent "
        "𝓕-trajectory is below — the last 8 substantive commits with their "
        "Formula derivations + Glosses. Use this to keep your reply "
        "arc-aware: don't propose options that recently-shipped commits "
        "already accomplished; calibrate report-writing to be in dialogue "
        "with the recent arc; honor what was deliberately chosen against. "
        "If your reply's natural shape doesn't depend on the trajectory "
        "(e.g. answering a single factual question), you can ignore this — "
        "it's context, not a directive.\n\n"
        "── recent 𝓕-trajectory ──\n"
        f"{arc}"
    )

    out = {
        "hookSpecificOutput": {
            "hookEventName": "UserPromptSubmit",
            "additionalContext": additional_context,
        }
    }
    print(json.dumps(out))
    return 0


if __name__ == "__main__":
    sys.exit(main())
