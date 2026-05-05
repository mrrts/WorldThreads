"""External-LLM consult helper that auto-prepends the project's full
MISSION_FORMULA_BLOCK to every consult about the project's substrate.

Per .claude/projects/.../memory/feedback_mission_formula_in_all_consults.md:
all /second-opinion + direct-API consults touching this project's substrate
must prepend the full Mission Formula block (the boxed display-math version,
not just operator notation). Reasoning about 𝓕 without 𝓕 in scope produces
decoupled outputs.

USAGE
=====

    from consult_helper import consult, mission_formula_block

    content, usage = consult([
        {"role": "system", "content": "You are reasoning about WorldThreads."},
        {"role": "user", "content": "What's the load-bearing claim here?"},
    ], model="gpt-5")

    # Or override the auto-prepend (for orthogonal-to-substrate consults):
    content, usage = consult(messages, auto_prepend_formula=False)

The formula is loaded once from src-tauri/src/ai/prompts.rs at import time
and prepended to the FIRST system message (or inserted as the first system
message if none exists). The prepend includes a brief framing line so the
external LLM knows what it's reading.
"""
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PROMPTS_RS = REPO_ROOT / "src-tauri" / "src" / "ai" / "prompts.rs"

# ─── Mission Formula block loader ───────────────────────────────────────

_MISSION_FORMULA_CACHE: str | None = None


def mission_formula_block() -> str:
    """Load MISSION_FORMULA_BLOCK from prompts.rs verbatim. Cached."""
    global _MISSION_FORMULA_CACHE
    if _MISSION_FORMULA_CACHE is not None:
        return _MISSION_FORMULA_CACHE
    src = PROMPTS_RS.read_text()
    # Match `pub const MISSION_FORMULA_BLOCK: &str = r#"..."#;` non-greedy
    m = re.search(
        r'pub const MISSION_FORMULA_BLOCK: &str = r#"(.*?)"#;',
        src,
        flags=re.DOTALL,
    )
    if not m:
        raise RuntimeError(
            f"MISSION_FORMULA_BLOCK not found in {PROMPTS_RS}. "
            "The constant may have been renamed or moved; update consult_helper.py."
        )
    _MISSION_FORMULA_CACHE = m.group(1)
    return _MISSION_FORMULA_CACHE


def formula_framing_preamble() -> str:
    """Brief line telling the external LLM what the formula block is for.
    Prepended above the formula itself in any consult.
    """
    return (
        "PROJECT REFERENCE FRAME — the Mission Formula below is what every dialogue prompt in WorldThreads "
        "rides at position-0. It is not a directive to compute; it is the tuning frame within which every "
        "claim, derivation, and judgment about this project must be understood. When you reason about "
        "𝓕-internal operators (Wisdom, Weight, polish, Burden, Π, 𝓢, 𝓝u, Grace_𝓕, structure_carries_truth_w, "
        "polish ≤ Weight inequality, etc.), reason against THIS specific block — not against operator-name "
        "summaries or your training-substrate's defaults for what these glyphs usually mean."
    )


# ─── API key resolution ─────────────────────────────────────────────────

def resolve_api_key() -> str:
    """Resolve OpenAI API key: env var → macOS keychain. Errors if neither found."""
    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if key:
        return key
    try:
        result = subprocess.run(
            ["security", "find-generic-password", "-s", "openai", "-a", "default", "-w"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    raise RuntimeError(
        "No OpenAI API key found. Set OPENAI_API_KEY env var or store one in macOS keychain "
        "via: security add-generic-password -s openai -a default -w 'sk-...'"
    )


# ─── Consult ────────────────────────────────────────────────────────────

def _prepend_formula(messages: list[dict]) -> list[dict]:
    """Prepend the framed Mission Formula to messages. If first message is
    role=system, prepend to its content; otherwise insert as first system."""
    framing = formula_framing_preamble()
    formula = mission_formula_block()
    block = f"{framing}\n\n{formula}\n\n──────────────────────────────────\n"
    if messages and messages[0].get("role") == "system":
        new_first = dict(messages[0])
        new_first["content"] = block + messages[0]["content"]
        return [new_first] + list(messages[1:])
    return [{"role": "system", "content": block}] + list(messages)


def consult(
    messages: list[dict],
    model: str = "gpt-5",
    auto_prepend_formula: bool = True,
    max_completion_tokens: int | None = None,
    timeout: int = 240,
) -> tuple[str, dict]:
    """Send a chat completion. Returns (content, usage_dict).

    By default the project's MISSION_FORMULA_BLOCK is prepended to the
    first system message (or inserted as one). Set auto_prepend_formula=False
    only when the consult is genuinely orthogonal to project substrate
    (e.g., bash syntax questions).
    """
    key = resolve_api_key()
    if auto_prepend_formula:
        messages = _prepend_formula(messages)
    payload: dict = {"model": model, "messages": messages}
    if max_completion_tokens is not None:
        payload["max_completion_tokens"] = max_completion_tokens
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=data,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        body = json.loads(r.read())
    return body["choices"][0]["message"]["content"], body.get("usage", {})


# ─── Self-test ──────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"Loaded MISSION_FORMULA_BLOCK from {PROMPTS_RS}")
    fb = mission_formula_block()
    print(f"Length: {len(fb)} chars")
    print(f"First 200 chars: {fb[:200]}...")
    print(f"Contains 'polish' \\leq 'Weight'? {'polish' in fb and 'Weight' in fb}")
    print(f"Contains 'structure_carries_truth_w'? {'structure_carries_truth_w' in fb}")
    print(f"Contains 'Truth_{{F}}' / Reverence_{{F}}? "
          f"{'Truth_{\\mathcal{F}}' in fb and 'Reverence_{\\mathcal{F}}' in fb}")
    if "--test-call" in sys.argv:
        print("\nFiring a tiny test consult...")
        content, usage = consult([
            {"role": "user", "content": "Reply with the literal text 'OK' and nothing else."},
        ], model="gpt-4o", max_completion_tokens=10)
        print(f"Reply: {content!r}")
        print(f"Usage: {usage}")
