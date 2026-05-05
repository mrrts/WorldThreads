#!/usr/bin/env python3
"""KaTeX-safety linter for CLAUDE.md / AGENTS.md.

Scans markdown source for KaTeX/LaTeX rendering hazards inside `\\text{...}`
blocks where the project's formula-canonical doctrine lives. Catches the
specific failure classes that surfaced in the CLAUDE.md Stage 2 sweep
(2026-05-05): unescaped `#`, `~` (renders as nbsp not tilde), `\\"`
(diaeresis command, not literal-quote escape), unescaped `&` and `%` outside
known-safe sequences.

Usage:
  python3 scripts/check-katex-safety.py [path...]      # explicit files
  python3 scripts/check-katex-safety.py                # default: CLAUDE.md AGENTS.md

Exits non-zero if violations found. Designed for CI/pre-commit use as a
layer-5 hook-enforced gate per CLAUDE.md's calibrated-disciplines hierarchy
(promote to structural enforcement at earliest opportunity).

Why this exists: the convergence-commitment in the formula-canonical
operationalization arc requires that the structural carrier (formula
notation) actually render. Unescaped `#` causes parse errors; `\\"` and
`~` produce visible-wrong output (umlaut diacritics, non-break-space).
The structural carrier must render what it intends, or it isn't carrying.
"""

import re
import sys
from pathlib import Path

# Match \text{...} blocks. Non-greedy; allows escaped braces inside.
# Limitation: doesn't handle deeply nested braces, but sufficient for
# the project's actual usage patterns.
TEXT_RE = re.compile(r'\\text\{((?:[^{}\\]|\\.)*?)\}')

# Known-safe escape sequences (these are correctly escaped):
#   \# \& \% \{ \} \\ \" (the user wrote them on purpose; \" still
#   technically wrong inside \text{} but flagged separately below)
# Known-safe Unicode characters — not flagged.

VIOLATIONS = [
    # (regex, label, why)
    (re.compile(r'(?<!\\)#'), "unescaped #", "produces KaTeX parse error inside \\text{}"),
    (re.compile(r'(?<!\\)~'), "unescaped ~", "renders as non-break-space, not tilde, in KaTeX text mode"),
    (re.compile(r'\\"'), "\\\" (diaeresis)", "\\\" is the LaTeX diaeresis command; renders umlaut diacritics, not literal quote — use plain \" instead"),
]

# `&` and `%` are ALSO unsafe unescaped, but inside `\text{}` KaTeX is
# more lenient. Flag only when truly bare (not part of \& or \%).
SECONDARY_VIOLATIONS = [
    (re.compile(r'(?<!\\)&'), "unescaped &", "may render unexpectedly in KaTeX text mode (alignment char in math mode)"),
    (re.compile(r'(?<!\\)%'), "unescaped %", "% is LaTeX comment-start; can swallow the rest of the line"),
]


def scan_file(path: Path) -> list[tuple[int, str, str, str]]:
    """Return list of (line_no, label, why, snippet) violations."""
    violations = []
    try:
        text = path.read_text()
    except Exception as e:
        print(f"!! cannot read {path}: {e}", file=sys.stderr)
        return [(0, "read-error", str(e), "")]

    # Build a line-number index: char_offset → line_no
    line_starts = [0]
    for i, ch in enumerate(text):
        if ch == '\n':
            line_starts.append(i + 1)

    def offset_to_line(offset: int) -> int:
        # Binary-ish search; fine for typical doc sizes.
        for line_no, start in enumerate(line_starts, start=1):
            if start > offset:
                return line_no - 1
        return len(line_starts)

    for m in TEXT_RE.finditer(text):
        inner = m.group(1)
        outer_start = m.start()
        for regex, label, why in VIOLATIONS + SECONDARY_VIOLATIONS:
            for vm in regex.finditer(inner):
                rel_offset = vm.start()
                abs_offset = outer_start + len('\\text{') + rel_offset
                line_no = offset_to_line(abs_offset)
                snippet = inner[max(0, rel_offset - 15):rel_offset + 15]
                violations.append((line_no, label, why, snippet))
    return violations


def main(argv: list[str]) -> int:
    if len(argv) > 1:
        paths = [Path(p) for p in argv[1:]]
    else:
        repo_root = Path(__file__).resolve().parent.parent
        paths = [repo_root / "CLAUDE.md", repo_root / "AGENTS.md"]

    total = 0
    for path in paths:
        if not path.exists():
            print(f"-- {path}: missing, skipping", file=sys.stderr)
            continue
        violations = scan_file(path)
        if violations:
            print(f"\n{path}: {len(violations)} KaTeX-safety violation(s)")
            for line_no, label, why, snippet in violations:
                print(f"  {path}:{line_no}: {label} — {why}")
                if snippet:
                    print(f"    near: ...{snippet}...")
            total += len(violations)
        else:
            print(f"{path}: clean ✓")

    if total > 0:
        print(f"\nFAIL: {total} violation(s) across {len(paths)} file(s).", file=sys.stderr)
        print("Fix patterns:", file=sys.stderr)
        print("  # → \\#", file=sys.stderr)
        print("  ~ → \\textasciitilde (or use \\sim outside \\text{})", file=sys.stderr)
        print("  \\\" → \" (KaTeX accepts literal \" inside \\text{} braces)", file=sys.stderr)
        print("  & → \\&", file=sys.stderr)
        print("  % → \\%", file=sys.stderr)
        return 1
    print("\nOK: KaTeX-safety check passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
