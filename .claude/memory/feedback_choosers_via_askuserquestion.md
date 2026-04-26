---
name: choosers via AskUserQuestion, not inline text
description: When presenting two-or-more discrete options to the user (A/B/C-shape pick-among-paths), use the AskUserQuestion tool, not inline-text bullets the user has to type "a" / "b" / "c" to select.
type: feedback
---

When presenting a chooser between 2–4 mutually-exclusive options, **use the AskUserQuestion tool**, not inline-text bullets the user has to type a letter in response to. The dedicated chooser UI is the right interaction surface for option-picking.

**Why:** typing a single letter in response to inline text is friction the AskUserQuestion UI removes; the chooser surface is purpose-built for this exact shape and produces cleaner conversation logs. Ryan flagged this 2026-04-26 after I presented an inline A/B/C list of paths-forward (commit `.claude/`-tracking gap discussion) and he had to type "b" — the cleaner shape would have been three options in an AskUserQuestion call.

**How to apply:**
- Whenever you're about to write *"Want me to: **A** — ... **B** — ... **C** — ..."* in a reply, instead invoke AskUserQuestion with the same options as labeled choices.
- Applies to: pick-among-paths-forward moments, methodology choices, scope choices, "should I do X or Y or Z" decisions — anywhere there's a discrete set of options the user picks from.
- Free-text questions and open-ended asks remain inline (no chooser shape, no AskUserQuestion).
- The /run-experiment skill's hypothesis-audition chooser is the canonical example of doing it right.

**Edge case — when inline IS right:** narrative explanation ending in a single open question (*"want me to keep going?"*) doesn't need AskUserQuestion; the chooser shape requires 2+ discrete options. The trigger is *enumerated options*, not *any question*.
