#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMMS_FILE="$ROOT/CROSS_AGENT_COMMS.md"
JSON_MODE=0
MAX_ITEMS=3
TO_FILTER="codex"
OLDEST_FIRST=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --json)
      JSON_MODE=1
      shift
      ;;
    --max)
      MAX_ITEMS="${2:-3}"
      shift 2
      ;;
    --to)
      TO_FILTER="${2:-codex}"
      shift 2
      ;;
    --oldest-first)
      OLDEST_FIRST=1
      shift
      ;;
    *)
      echo "Usage: $(basename "$0") [--json] [--max N] [--to codex|cursor|claude|all] [--oldest-first]" >&2
      exit 2
      ;;
  esac
done

if ! [[ "$MAX_ITEMS" =~ ^[0-9]+$ ]]; then
  echo "--max must be a non-negative integer" >&2
  exit 2
fi
case "$TO_FILTER" in
  codex|cursor|claude|all) ;;
  *)
    echo "--to must be one of: codex, cursor, claude, all" >&2
    exit 2
    ;;
esac

if [[ ! -f "$COMMS_FILE" ]]; then
  if [[ "$JSON_MODE" == "1" ]]; then
    python3 - <<PY
import json
print(json.dumps({"ok": False, "error": "missing file: CROSS_AGENT_COMMS.md", "open_for_codex": 0, "entries": []}))
PY
  else
    echo "CROSS_AGENT_COMMS | missing file: CROSS_AGENT_COMMS.md"
  fi
  exit 0
fi

python3 - <<PY
import re
import json
from pathlib import Path

text = Path("${COMMS_FILE}").read_text()
to_filter = "${TO_FILTER}"

# Header regex matches BOTH formats:
#   New (general-interest):     ## TS | from: AUTHOR
#   Legacy (recipient-addressed): ## TS | from: AUTHOR | to: RECIP | status: STATE
header_re = re.compile(
    r"^##\\s+(\\d{4}-\\d{2}-\\d{2}[^\\n]*?)\\|\\s*from:\\s*([^|\\n]+?)"
    r"(?:\\s*\\|\\s*to:\\s*([^|\\n]+?)\\s*\\|\\s*status:\\s*([^\\n]+))?\\s*$",
    re.M,
)
headers = list(header_re.finditer(text))

# For each entry, capture the body slice between this header and the next
# (or to EOF) so we can inspect the Acks section in new-format entries.
def body_slice(idx):
    start = headers[idx].end()
    end = headers[idx + 1].start() if idx + 1 < len(headers) else len(text)
    return text[start:end]

# In new-format bodies, agent signatures are written as
#     - **Claude** YYYY-MM-DD HH:MM ...
# Recognize all three known agents.
agent_signature_re = {
    "claude": re.compile(r"^\\s*-\\s*\\*\\*claude\\*\\*", re.I | re.M),
    "codex":  re.compile(r"^\\s*-\\s*\\*\\*codex\\*\\*",  re.I | re.M),
    "cursor": re.compile(r"^\\s*-\\s*\\*\\*cursor\\*\\*", re.I | re.M),
}

def is_legacy(m):
    return bool(m.group(3) and m.group(4))

def legacy_open_for(m, agent):
    # Legacy: "open" + agent appears in to: field
    status = (m.group(4) or "").strip().lower()
    to_field = (m.group(3) or "").strip().lower()
    if status != "open":
        return False
    return agent in to_field

def new_open_for(idx, agent):
    # New format: an entry is open-for-AGENT if AGENT's signature line
    # is absent from this entry's Acks section.
    body = body_slice(idx)
    return not agent_signature_re[agent].search(body)

# Resolve which agents we're surfacing entries for.
if to_filter == "all":
    target_agents = ["claude", "codex", "cursor"]
else:
    target_agents = [to_filter]

open_items = []
for i, m in enumerate(headers):
    matched_agents = []
    for agent in target_agents:
        if is_legacy(m):
            if legacy_open_for(m, agent):
                matched_agents.append(agent)
        else:
            if new_open_for(i, agent):
                matched_agents.append(agent)
    if not matched_agents:
        continue
    rec = {
        "stamp": m.group(1).strip(),
        "from": m.group(2).strip(),
        "format": "legacy" if is_legacy(m) else "general-interest",
        "needs_signature_from": matched_agents,
    }
    if is_legacy(m):
        rec["to"] = (m.group(3) or "").strip()
        rec["status"] = (m.group(4) or "").strip().lower()
    open_items.append(rec)

json_mode = ${JSON_MODE}
max_items = ${MAX_ITEMS}
oldest_first = ${OLDEST_FIRST}
filter_label = to_filter if to_filter != "all" else "recipient"
count_key = f"open_for_{filter_label}"
if oldest_first:
    open_items = list(reversed(open_items))
if json_mode:
    entries = open_items[:max_items] if max_items > 0 else open_items
    print(json.dumps({
        "ok": True,
        count_key: len(open_items),
        "entries": entries,
        "truncated": max(0, len(open_items) - len(entries)),
        "filter": to_filter,
    }))
else:
    if not open_items:
        print(f"CROSS_AGENT_COMMS | {count_key}=0")
    else:
        parts = []
        view = open_items[:max_items] if max_items > 0 else open_items
        for item in view:
            tail = (
                f"to={item['to']}"
                if item["format"] == "legacy"
                else "needs=" + ",".join(item["needs_signature_from"])
            )
            parts.append(f"{item['stamp']} from={item['from']} {tail}")
        more = ""
        if len(open_items) > len(view):
            more = f" (+{len(open_items)-len(view)} more)"
        print(f"CROSS_AGENT_COMMS | {count_key}={len(open_items)} | " + " || ".join(parts) + more)
PY
