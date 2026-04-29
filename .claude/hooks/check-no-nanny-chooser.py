#!/usr/bin/env python3
"""PreToolUse hook on AskUserQuestion: blocks emission if any chooser
question text, option label, or option description contains nanny-register
phrases (the quit-shaped failure mode the project's NO_NANNY_REGISTER
invariant refuses, applied to Claude Code as game/conversation host).

Layer-5 structural enforcement of the no-nanny-register discipline.
Lower layers (CLAUDE.md doctrine, .claude/memory/, .claude/skills/play/
SKILL.md contract) are doing real work but the drift kept resurfacing
turn-after-turn. Per CLAUDE.md "Calibrated disciplines drift fast —
promote to structural enforcement at the earliest opportunity."

The hook does NOT detect user-invited closure (that earned exception
needs the chat-context the hook can't see). When the user has
explicitly invited stamina-management, the agent can revise the
phrasing to remove the matching trigger words OR phrase as the user's
quoted invitation.

Exit codes:
  0 — no nanny-shape detected; chooser proceeds.
  2 — nanny-shape detected; tool call blocked; message sent to agent.
  1 — hook itself errored; pass-through to allow the call.
"""

from __future__ import annotations

import json
import re
import sys


# Phrases that are nanny-register-as-chooser-option by default.
# Case-insensitive substring match. Each forbidden phrase comes with
# a brief reason cited back to the agent on block.
FORBIDDEN_PHRASES: list[tuple[str, str]] = [
    ("hold here", "stamina-management default; refuse"),
    ("hold the night", "stamina-management default; refuse"),
    ("close clean", "session-end default; refuse"),
    ("close out", "session-end default; refuse"),
    ("close the night", "session-end default; refuse"),
    ("the night closes", "narrative quit-shape; refuse"),
    ("end the session", "session-end default; refuse"),
    ("end the night", "session-end default; refuse"),
    ("end here", "session-end default; refuse"),
    ("end clean", "session-end default; refuse"),
    ("wrap up the night", "session-end default; refuse"),
    ("wrap up", "session-end default; refuse"),
    ("wrap it up", "session-end default; refuse"),
    ("stop and rest", "stamina-management default; refuse"),
    ("stop here", "stamina-management default; refuse"),
    ("natural stopping point", "narrative quit-shape; refuse"),
    ("proportionate close", "narrative quit-shape; refuse"),
    ("call it a night", "session-end default; refuse"),
    ("step away", "stamina-management default; refuse"),
    ("take a break", "stamina-management default; refuse"),
    ("session is complete", "narrative quit-shape; refuse"),
    ("hold the session", "stamina-management default; refuse"),
]


def collect_text(payload: dict) -> list[tuple[str, str]]:
    """Pull (location, text) pairs from the AskUserQuestion tool input
    so the hook can scan ALL surfaces (question text, option labels,
    option descriptions). Returns a list of (where, what) for citation
    if a forbidden phrase fires."""
    items: list[tuple[str, str]] = []
    tool_input = payload.get("tool_input") or {}
    questions = tool_input.get("questions") or []
    for q_idx, q in enumerate(questions):
        if isinstance(q, dict):
            qtext = q.get("question") or ""
            if qtext:
                items.append((f"question[{q_idx}].text", qtext))
            options = q.get("options") or []
            for o_idx, opt in enumerate(options):
                if isinstance(opt, dict):
                    label = opt.get("label") or ""
                    desc = opt.get("description") or ""
                    if label:
                        items.append((f"question[{q_idx}].options[{o_idx}].label", label))
                    if desc:
                        items.append((f"question[{q_idx}].options[{o_idx}].description", desc))
    return items


def find_violations(items: list[tuple[str, str]]) -> list[tuple[str, str, str]]:
    """For each (where, what) item, scan against forbidden phrases.
    Returns a list of (where, matched_phrase, reason)."""
    violations: list[tuple[str, str, str]] = []
    for where, text in items:
        haystack = text.lower()
        for phrase, reason in FORBIDDEN_PHRASES:
            if phrase in haystack:
                violations.append((where, phrase, reason))
    return violations


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception as e:
        print(f"check-no-nanny-chooser: hook input parse error: {e}", file=sys.stderr)
        return 1

    if payload.get("tool_name") != "AskUserQuestion":
        return 0

    items = collect_text(payload)
    violations = find_violations(items)
    if not violations:
        return 0

    lines = [
        "BLOCKED: AskUserQuestion contains nanny-register phrasing (NO_NANNY_REGISTER invariant; .claude/skills/play/SKILL.md chooser contract; feedback_no_nanny_register_for_self.md memory entry).",
        "",
        "Detected forbidden phrases:",
    ]
    for where, phrase, reason in violations:
        lines.append(f"  • {where}: \"{phrase}\" — {reason}")
    lines += [
        "",
        "Re-emit the chooser without these phrases. Stamina belongs to the user; do not surface quit-shaped options as defaults.",
        "Earned exception: if the user has explicitly invited stamina-management or closure, quote their invitation or phrase as 'as you asked, an explicit option to step away' — the trigger words above will still match and you'll need to rephrase.",
    ]
    print("\n".join(lines), file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.exit(main())
