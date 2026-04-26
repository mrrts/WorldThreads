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


def _strip_code(text: str) -> str:
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`[^`]+`", "", text)
    return text


def detect_inline_chooser(text: str) -> bool:
    """Return True if the tail of the assistant message looks like an inline chooser."""
    if not text:
        return False
    tail = _strip_code(text[-1800:])

    paren_letters = re.findall(r"\(([a-zA-Z])\)", tail)
    if len(paren_letters) >= 3 and {"a", "b", "c"}.issubset({c.lower() for c in paren_letters}):
        return True

    bold_letters = re.findall(r"\*\*([A-Z])\*\*\s*[—\-:]", tail)
    if len(set(bold_letters)) >= 2 and {"A", "B"}.issubset(set(bold_letters)):
        return True

    return False


def detect_trailing_question(text: str) -> bool:
    """Return True if the assistant's reply ends with a question to the user.

    The rule: any end-of-reply ask — yes/no, "want me to X?", "should I Y?",
    multi-option enumerated, or open-ended — should be an AskUserQuestion call,
    not inline text. We catch this by: take the last non-empty content line
    after stripping code blocks, strip trailing markdown punctuation, and check
    if it ends with `?`. Mid-paragraph rhetorical questions (which are answered
    in the same paragraph) don't trigger because they aren't the final line.
    """
    if not text:
        return False
    tail = _strip_code(text[-1500:])
    lines = [ln.strip() for ln in tail.split("\n") if ln.strip()]
    if not lines:
        return False
    last = lines[-1]
    # Strip trailing markdown emphasis / closing punctuation that isn't `?`
    last = last.rstrip("*_)] >")
    return last.endswith("?")


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
    is_chooser = detect_inline_chooser(text)
    is_trailing_q = detect_trailing_question(text)
    if not (is_chooser or is_trailing_q):
        return 0

    if is_chooser and is_trailing_q:
        kind = "INLINE CHOOSER + TRAILING QUESTION"
    elif is_chooser:
        kind = "INLINE CHOOSER"
    else:
        kind = "TRAILING QUESTION"

    warning = (
        f"{kind} DETECTED in your last reply. "
        "Project rule (.claude/memory/feedback_choosers_via_askuserquestion.md): "
        "ANY end-of-reply ask of the user — multi-option, enumerated, OR a single "
        'yes/no question like "Want me to X?" / "Should I Y?" — must use the '
        "AskUserQuestion tool, NOT inline text. Re-present the question(s) as an "
        "AskUserQuestion call now (use Yes/No options for single-question asks). "
        "Do not end your reply with a question mark in plain text."
    )
    print(json.dumps({"decision": "block", "reason": warning}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
