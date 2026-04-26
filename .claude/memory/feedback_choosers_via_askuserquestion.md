---
name: choosers via AskUserQuestion, not inline text
description: When presenting two-or-more discrete options to the user (A/B/C-shape pick-among-paths), use the AskUserQuestion tool, not inline-text bullets the user has to type "a" / "b" / "c" to select.
type: feedback
---

When presenting a chooser between 2–4 mutually-exclusive options, **use the AskUserQuestion tool**, not inline-text bullets the user has to type a letter in response to. The dedicated chooser UI is the right interaction surface for option-picking.

**Why:** typing a single letter in response to inline text is friction the AskUserQuestion UI removes; the chooser surface is purpose-built for this exact shape and produces cleaner conversation logs. Ryan flagged this 2026-04-26 after I presented an inline A/B/C list of paths-forward (commit `.claude/`-tracking gap discussion) and he had to type "b" — the cleaner shape would have been three options in an AskUserQuestion call.

**How to apply:**
- Whenever you're about to write ANY enumerated-options shape — `**A** — ... **B** — ... **C** — ...`, OR `(a) ... (b) ... (c)`, OR `1) ... 2) ... 3)`, OR `Want me to X or Y or Z?` — invoke AskUserQuestion with the same options as labeled choices instead.
- Applies to: pick-among-paths-forward moments, methodology choices, scope choices, "should I do X or Y or Z" decisions — anywhere there's a discrete set of options the user picks from.
- Applies EVEN WHEN the rest of the reply is correct — a single chooser-shape at the END of an otherwise-good message still violates the rule (this is the failure mode caught 2026-04-26: I shipped this exact memory entry, then ended the next reply with `(a)/(b)/(c)` inline).
- Free-text questions and open-ended asks remain inline (no chooser shape, no AskUserQuestion).
- The /run-experiment skill's hypothesis-audition chooser is the canonical example of doing it right.

**Compile-time enforcement:** `.claude/hooks/check-inline-choosers.py` is a Stop hook (wired in `.claude/settings.json`) that scans the tail of each assistant reply for chooser-shape patterns and blocks the turn-end with a system-reminder if detected. The memory entry is the soft reminder; the hook is the structural guarantee. If the hook fires on a legitimate non-chooser, tighten the regex — don't soften the rule.

**Edge case — when inline IS right:** narrative explanation ending in a single open question (*"want me to keep going?"*) doesn't need AskUserQuestion; the chooser shape requires 2+ discrete options. The trigger is *enumerated options*, not *any question*.
