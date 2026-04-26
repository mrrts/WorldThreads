#!/usr/bin/env python3
"""Stop-hook: signal-triggered cross-LLM session derivation.

When the user signals it (specific phrases in their most-recent message),
this hook:
  1. Extracts a session-arc summary from the recent assistant transcript.
  2. Calls ChatGPT (gpt-4o via direct API + keychain) with the MISSION
     FORMULA prepended.
  3. Asks ChatGPT for two things:
       a) A pretty Unicode-math derivation of the session arc from the
          MISSION FORMULA (summary as a "derivation step" relative to
          the operators/operands of 𝓕 := (𝓡, 𝓒)).
       b) The closest-matching KJV Bible verse, perfectly cited.
  4. Returns a `systemMessage` with the formatted output, displayed to
     the user as a small flourish appended to the assistant's reply.

Cost: ~$0.011 per fire on gpt-4o (input ~2200 tokens, output ~500
tokens). Bills against the user's OpenAI account, NOT the /second-
opinion daily-state file (this hook is a separate channel — see daily-
state.json for tracked /second-opinion calls only).

Trigger phrases (case-insensitive, in last user message, code-stripped):
  - "derive session", "session derivation", "derive the arc"
  - "consecrate this", "consecrate the arc"
  - "formula-cite", "formula cite this"
  - "verse-cite", "verse this", "verse cite"
  - "from-the-formula", "from the formula"
  - "show derivation"

Silent no-op when the signal is absent — does not block the turn-end,
does not bill, does not emit anything.
"""
from __future__ import annotations

import json
import os
import pathlib
import re
import subprocess
import sys
import urllib.request

# The MISSION FORMULA, faithful LaTeX representation. Kept in sync with
# the boxed LaTeX block at the top of CLAUDE.md. If the formula is
# revised in CLAUDE.md, update here too — this script's payload to
# ChatGPT is the canonical formula plus a runtime-consumption preface.
MISSION_FORMULA_LATEX = r"""
\boxed{
\begin{aligned}
&& \mathcal{R} := \mathrm{Jesus}_{\mathrm{Cross}}^{\mathrm{flesh}} && \\[6pt]
&& \mathcal{C} := \mathrm{Firmament}_{\mathrm{enclosed\ earth}} && \\[6pt]
&& \mathcal{F} := (\mathcal{R},\,\mathcal{C}) && \\[10pt]

\mathrm{Wisdom}(t) &:= \int_{0}^{t}
  \mathrm{seek}_c(\tau)\,\Pi(\tau)\,\mathrm{discern}_w(\tau)\,
  d\mu_{\mathcal{F}}(\tau)
&&
\mathrm{polish}(t) \leq \mathrm{Weight}(t) \\[10pt]

\mathrm{Weight}(t) &:= \int_{0}^{t}
  \mathrm{Wisdom}(\tau)\,\mathrm{specific}_c(\tau)\,\mathrm{holds}_w(\tau)\,
  d\mu_{\mathrm{agape},\,\mathcal{F}}(\tau)
&&
\mathrm{Grace}_{\mathcal{F}} := \gamma_{\mathcal{F}} \\[10pt]

&& \Pi(t) := \mathrm{pneuma}_{\mathcal{F}}(t) && \\[10pt]

\mathrm{Burden}(t) &:= \int_{0}^{t}
  \mathrm{Wisdom}(\tau)\,\mathrm{specific}_c(\tau)\,\mathrm{unresolved}_u(\tau)\,
  d\mu_{\mathrm{agape},\,\mathcal{F}}(\tau)
&&
\mathcal{S}(t) := \Pi(t)\!\left(
  \frac{d}{dt}\mathrm{Weight}(t)
  + \alpha\,\frac{d}{dt}\mathrm{Burden}(t)
\right)\,\cdot\,\mathrm{Grace}_{\mathcal{F}} \\[10pt]

&& \mathcal{N}u(t) := \mathcal{S}(t)\;\Big|\;
\mathrm{Truth}_{\mathcal{F}} \wedge \mathrm{Reverence}_{\mathcal{F}} &&
\end{aligned}
}
""".strip()

TRIGGER_PATTERNS = [
    r"derive (the )?session",
    r"session derivation",
    r"derive the arc",
    r"consecrate (this|the arc|the session)",
    r"formula[\s\-]cite( this)?",
    r"verse[\s\-]cite( this)?",
    r"verse this",
    r"from[\s\-]the[\s\-]formula",
    r"show derivation",
]


def _strip_code(text: str) -> str:
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`[^`]+`", "", text)
    return text


def last_user_message_text(transcript_path: str) -> str:
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
                if msg.get("role") != "user":
                    continue
                content = msg.get("content")
                if isinstance(content, str):
                    last = content
                elif isinstance(content, list):
                    parts = []
                    for b in content:
                        if isinstance(b, dict) and b.get("type") == "text":
                            parts.append(b.get("text", ""))
                    last = "\n".join(parts)
    except Exception:
        return ""
    return last


def signal_present(user_text: str) -> bool:
    if not user_text:
        return False
    cleaned = _strip_code(user_text).lower()
    return any(re.search(pat, cleaned) for pat in TRIGGER_PATTERNS)


def recent_assistant_summary(transcript_path: str, n: int = 3) -> str:
    """Concatenate the text of the last N assistant messages as raw
    session-arc material for ChatGPT to derive against."""
    p = pathlib.Path(transcript_path)
    if not p.exists():
        return ""
    asst_msgs: list[str] = []
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
                txt = ""
                if isinstance(content, str):
                    txt = content
                elif isinstance(content, list):
                    parts = [
                        b.get("text", "")
                        for b in content
                        if isinstance(b, dict) and b.get("type") == "text"
                    ]
                    txt = "\n".join(parts)
                if txt.strip():
                    asst_msgs.append(txt.strip())
    except Exception:
        return ""
    return "\n\n---\n\n".join(asst_msgs[-n:])


def fetch_openai_key() -> str | None:
    """Same keychain fallback chain as the worldcli binary."""
    if k := os.environ.get("OPENAI_API_KEY"):
        return k.strip()
    candidates = [
        ("WorldThreadsCLI", "openai"),
        ("openai", "default"),
        ("openai", "api-key"),
        ("openai", "api_key"),
        ("OpenAI", "default"),
    ]
    for service, account in candidates:
        try:
            out = subprocess.run(
                ["security", "find-generic-password", "-s", service, "-a", account, "-w"],
                capture_output=True, text=True, timeout=5,
            )
            if out.returncode == 0 and out.stdout.strip():
                return out.stdout.strip()
        except Exception:
            continue
    return None


def call_openai(api_key: str, prompt: str) -> tuple[str, dict] | None:
    """Single-shot gpt-4o call. Returns (content, usage) or None on failure."""
    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a creative collaborator helping a software-craft project "
                    "express its session arcs in two registers it already uses internally: "
                    "(1) symbolic notation using Unicode math characters, and (2) brief "
                    "quotations from the King James Bible (public-domain Christian "
                    "scripture the project's worldview is grounded in). The user will "
                    "share their project's notation system and a brief description of "
                    "recent work. Respond with three short sections, plain text only:\n\n"
                    "DERIVATION:\nOne short expression (1-3 lines) using Unicode math "
                    "characters, naming what part of their notation the arc just "
                    "instantiated. Use any of: math italic letters, integral signs, "
                    "Greek letters, logical operators. Be tight, not formal.\n\n"
                    "GLOSS:\nOne short sentence in plain English, ≤25 words.\n\n"
                    "VERSE:\nA brief KJV quotation (one or two verses) that resonates "
                    "with the arc, in quotation marks, followed by the citation in the "
                    "form 'Book Chapter:Verse (KJV)'. The KJV is public-domain; "
                    "quotation is a normal scholarly use. Keep the verse choice honest "
                    "to the arc rather than flattering."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read())
        content = data["choices"][0]["message"]["content"].strip()
        usage = data.get("usage", {})
        return content, usage
    except Exception:
        return None


def estimate_cost(usage: dict) -> float:
    """gpt-4o pricing as of 2026-04: $2.50/1M input, $10/1M output."""
    pt = usage.get("prompt_tokens", 0)
    ct = usage.get("completion_tokens", 0)
    return (pt / 1_000_000) * 2.50 + (ct / 1_000_000) * 10.0


def format_output(chatgpt_text: str, cost: float) -> str:
    """Wrap ChatGPT's structured response in a plain ASCII frame.

    Uses ASCII-only frame characters (== and --) to avoid the box-
    drawing + Unicode-math interaction that caused render artifacts
    in some terminal paths. The Unicode math characters live INSIDE
    the chatgpt_text body, where Claude Code's markdown renderer
    handles UTF-8 cleanly.
    """
    return (
        "==== session arc, derived from F := (R, C) =====================\n"
        "\n"
        f"{chatgpt_text}\n"
        "\n"
        "----------------------------------------------------------------\n"
        f"consulted ChatGPT gpt-4o, cost ~${cost:.4f}\n"
        "================================================================"
    )


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

    user_text = last_user_message_text(transcript_path)
    if not signal_present(user_text):
        return 0  # silent no-op

    api_key = fetch_openai_key()
    if not api_key:
        out = {
            "systemMessage": (
                "derive-session-arc hook: signal detected, but no OpenAI key found in "
                "env or keychain. Skipping derivation."
            )
        }
        print(json.dumps(out))
        return 0

    arc_summary = recent_assistant_summary(transcript_path, n=3)
    if not arc_summary:
        return 0

    user_payload = (
        "The following blocks are concatenated and injected as the system-prompt "
        "prefix on every LLM call in this project. They operate as a single "
        "conditioning frame, not as separate artifacts.\n\n"
        "── MISSION FORMULA (LaTeX) ──\n"
        f"{MISSION_FORMULA_LATEX}\n\n"
        "── SESSION ARC (most recent assistant work, raw concatenation) ──\n"
        f"{arc_summary[:6000]}\n\n"
        "── TASK ──\n"
        "Derive this arc from the MISSION FORMULA as ONE Unicode-math expression "
        "(name what operator(s) of 𝓕 the arc just instantiated or strengthened), "
        "then cite the closest-matching KJV verse. Use the strict output format "
        "in your system instructions."
    )

    result = call_openai(api_key, user_payload)
    if result is None:
        out = {
            "systemMessage": (
                "derive-session-arc hook: ChatGPT call failed (network, auth, or "
                "rate limit). Skipping derivation."
            )
        }
        print(json.dumps(out))
        return 0

    content, usage = result
    cost = estimate_cost(usage)
    formatted = format_output(content, cost)

    out = {"systemMessage": formatted}
    print(json.dumps(out))
    return 0


if __name__ == "__main__":
    sys.exit(main())
