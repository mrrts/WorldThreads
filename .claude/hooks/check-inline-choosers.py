#!/usr/bin/env python3
"""Stop-hook: detect inline chooser patterns in the last assistant message.

Project rule (.claude/memory/feedback_choosers_via_askuserquestion.md):
multi-option choosers belong in AskUserQuestion, not inline-text bullets.

When the model emits "**A** — ... **B** — ... **C** — ..." or
"(a) ... (b) ... (c) ..." chooser-shapes in plain text, this hook
blocks the turn-end with a system-reminder telling the model to
re-present the same options as an AskUserQuestion call.

Detection is conservative — false negatives preferred over false
positives. Only triggers on the LAST 1800 chars of the message
(choosers live at the end), strips code blocks/inline code, and
requires at least 3 paren-letters {a,b,c} OR 2+ bold-letter cues
{**A**, **B**} with em-dash/colon/dash markers.
"""
from __future__ import annotations

import json
import pathlib
import re
import sys


def extract_last_assistant_text(transcript_path: str) -> str:
    """Walk the JSONL transcript, return text of the most recent assistant message."""
    p = pathlib.Path(transcript_path)
    if not p.exists():
        return ""
    last = ""
    try:
        with p.open() as f:
            for line in f:
                try:
                    rec = json.loads(line)
                except Exception:
                    continue
                msg = rec.get("message", {}) or {}
                if msg.get("role") != "assistant":
                    continue
                content = msg.get("content")
                if isinstance(content, str):
                    last = content
                elif isinstance(content, list):
                    parts = [
                        b.get("text", "")
                        for b in content
                        if isinstance(b, dict) and b.get("type") == "text"
                    ]
                    last = "\n".join(parts)
    except Exception:
        return ""
    return last


def detect_inline_chooser(text: str) -> bool:
    """Return True if the tail of the assistant message looks like an inline chooser."""
    if not text:
        return False
    tail = text[-1800:]
    # Strip fenced code blocks and inline code so docs/examples don't false-trigger.
    tail = re.sub(r"```.*?```", "", tail, flags=re.DOTALL)
    tail = re.sub(r"`[^`]+`", "", tail)

    paren_letters = re.findall(r"\(([a-zA-Z])\)", tail)
    if len(paren_letters) >= 3 and {"a", "b", "c"}.issubset({c.lower() for c in paren_letters}):
        return True

    bold_letters = re.findall(r"\*\*([A-Z])\*\*\s*[—\-:]", tail)
    if len(set(bold_letters)) >= 2 and {"A", "B"}.issubset(set(bold_letters)):
        return True

    return False


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read())
    except Exception:
        return 0

    if payload.get("stop_hook_active"):
        return 0

    transcript_path = payload.get("transcript_path", "")
    if not transcript_path:
        return 0

    text = extract_last_assistant_text(transcript_path)
    if not detect_inline_chooser(text):
        return 0

    warning = (
        "INLINE CHOOSER DETECTED in your last reply. "
        "Project rule (.claude/memory/feedback_choosers_via_askuserquestion.md): "
        "present 2-4 discrete options via the AskUserQuestion tool, NOT inline-text "
        '"**A** — ... **B** — ..." or "(a) ... (b) ..." bullets the user has to type '
        "a letter to select. Re-present the same options as an AskUserQuestion call now."
    )
    print(json.dumps({"decision": "block", "reason": warning}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
