---
name: choosers via AskUserQuestion, not inline text
description: When presenting two-or-more discrete options to the user (A/B/C-shape pick-among-paths), use the AskUserQuestion tool, not inline-text bullets the user has to type "a" / "b" / "c" to select.
type: feedback
---

When presenting a chooser between 2–4 mutually-exclusive options, **use the AskUserQuestion tool**, not inline-text bullets the user has to type a letter in response to. The dedicated chooser UI is the right interaction surface for option-picking.

**Why:** typing a single letter in response to inline text is friction the AskUserQuestion UI removes; the chooser surface is purpose-built for this exact shape and produces cleaner conversation logs. Ryan flagged this 2026-04-26 after I presented an inline A/B/C list of paths-forward (commit `.claude/`-tracking gap discussion) and he had to type "b" — the cleaner shape would have been three options in an AskUserQuestion call.

**How to apply — the broad rule:**
- ANY end-of-reply ask of the user uses AskUserQuestion. That includes:
  - Enumerated multi-option: `**A** — ... **B** — ... **C** — ...`, `(a) ... (b) ... (c)`, `1) ... 2) ... 3)`
  - Single yes/no offer: `Want me to X?`, `Should I Y?`, `Shall I Z?`, `Ready to ship?`
  - Open-ended end-of-reply ask: any sentence ending in `?` as the final line of the reply
- For yes/no offers, use `multiSelect: false` with two clear options (e.g., "Yes — proceed" / "No — hold here") plus a third "Other" if there's a meaningful third path.
- Applies EVEN WHEN the rest of the reply is correct — a single chooser-shape OR trailing question at the END of an otherwise-good message still violates the rule. (Failure modes caught 2026-04-26: shipped the entry, then ended next reply with `(a)/(b)/(c)` inline; then shipped the hook, then ended next reply with "Want me to /schedule…?" trailing yes/no.)
- The /run-experiment skill's hypothesis-audition chooser is the canonical example of doing it right.

**What still belongs inline:** mid-paragraph rhetorical questions answered in the same paragraph (*"Why does this matter? Because…"*) — not asks of the user. The trigger is **a question mark on the final line of the reply**, not any question mark anywhere.

**End your replies with statements, not questions.** When you have nothing to ask, end with a status line ("Shipped." / "Done." / "Logged."). When you do have something to ask, the AskUserQuestion call IS the ending — no trailing prose question needed.

**Compile-time enforcement:** `.claude/hooks/check-inline-choosers.py` is a Stop hook (wired in `.claude/settings.json`) that scans the tail of each assistant reply for: (1) inline-chooser patterns, AND (2) trailing-question patterns (final line ending in `?`, code-stripped). Either triggers a `decision: block` with a system-reminder telling the model to re-present as AskUserQuestion. The memory entry is the soft reminder; the hook is the structural guarantee. If the hook fires on a legitimate non-chooser, tighten the regex — don't soften the rule.
