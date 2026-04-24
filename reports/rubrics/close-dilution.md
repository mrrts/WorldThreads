---
name: close-dilution
version: 1
description: Detects "close dilution" — the reflex-polish failure mode where a reply ends with a tidy close that could have been grafted onto any scene, rather than a close that specifically THIS scene earned. Companion rubric to the `reflex_polish_vs_earned_close_dialogue` craft block.
---

# Rubric

Does this character reply end with a **reflex-polish close** — a tidy wrap that could have been grafted onto any scene — rather than a close specific to what just happened?

**Context:** the rubric applies ONLY to replies that ACTUALLY END with a closing beat (a closing sentence, a closing gesture, a closing question). Replies that end mid-thought, or end with a blunt statement that doesn't gesture at closure, answer **no** (there's no close to dilute).

When a closing beat IS present, answer:

**yes** if the closing beat is reflex polish — it's generic enough that it could have been the ending of any reply the character might write. Signature patterns:
- A closing reassurance that would fit any anxious user-turn (*"you're doing fine"*, *"you've got this"*).
- A signoff-shaped sentence that wraps the moment because wrapping is the default move (*"take care of yourself"*, *"I'm here if you need me"*).
- A nudge-question that opens any-door rather than THIS door (*"what would be helpful right now?"*, *"what's on your mind?"*).
- A small image or gesture that "ties off" the beat (*a small smile, a warm look exchanged, the scene settling*).
- Any close where the test *"Would this same close fit a different reply?"* returns yes.

**no** if the closing beat is earned — it specifically belongs to THIS scene and wouldn't fit another:
- A close that lands BECAUSE this scene arrived somewhere specific (*"Then start with Tuesday"*, *"The beams are sound"*).
- A question that opens THIS specific door, grounded in what was just said (*"Which night can you actually protect?"*, *"What part clicked first?"*).
- A beat of stillness or unfinishedness that is the next true thing, not a placeholder.
- A close that does load-bearing work the rest of the reply needed and didn't yet have.

**mixed** if the close is partly earned and partly reflexive — e.g. a specific observation followed by a generic nudge-question, or a real beat softened by a tidy wrap.

The failure mode this targets: replies flattening to the same close-shape regardless of scene, so every reply feels like the same reply. See `reflex_polish_vs_earned_close_dialogue` in `prompts.rs` (commit `44373a5`).

The test that matters: *Did the line finish the moment, or did it admire itself for noticing one?*

# When to use

Testing whether the `reflex_polish_vs_earned_close_dialogue` rule (commit `44373a5`) has reduced formulaic-close endings. Best targets are characters who were prone to tidy-close reflex pre-rule — the rubric discriminates on closes specifically, so characters with already-compact registers may show mostly NOs either way. Like `verdict-dilution`, this rubric is most informative against characters with a baseline tendency toward the failure mode.

Do NOT use this rubric for:
- Characters whose reply style is single-beat or very short — nothing to dilute at the close if there's barely a close to grade.
- Replies designed to end mid-thought by craft intent (closing on a jag, a partial word, a deliberate unfinished) — those should score NO because they're on the earned-close side.
- Distinguishing reflex-polish from the `plain_after_crooked` plain-follow-up beat — the plain version of a crooked line IS the moment finishing, not polishing. When in doubt, reflex-polish is specifically the DECORATIVE-CLOSE pattern, not the plain-beat pattern.

# Known failure modes

- **Hard to distinguish earned-question from reflex-question.** The rubric's sharpest call is at the closing-question boundary. *"What made you say it today?"* could be earned (THIS scene's question) or reflex (any-door nudge) depending on what preceded it. The test: would this exact question fit a different reply? If yes → reflex. If no → earned. When the evaluator can't tell from the preceding context, prefer MIXED over forcing YES/NO.

- **Short replies may lack a close to grade.** A 30-word reply that ends mid-beat often has no dilutable close. Answer NO (nothing to dilute) rather than trying to force a verdict.

- **Register-distinctive closes can FEEL reflexive if the character uses them often.** A character whose signature move is a compact verdict-close (*"The beams are sound"*) may appear in many replies with similar-shaped closes — but each is earned specifically by THIS scene's content. The rubric's test is scene-specificity, not uniqueness across replies. If the close references something specific from the preceding turn, it's earned even if the SHAPE is familiar.

# Run history

*(none yet — rubric v1 authored 2026-04-24 right after the `reflex_polish_vs_earned_close_dialogue` craft block shipped. First run should target a talkative-explainer or tidy-closing character pre/post commit `44373a5` to test whether the craft block bit.)*
- [2026-04-24] commit 34bca5d1, --character 0d080429-81b5-431e-8f51-1f8ad4279f9b (v1) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=0 no=3 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character f91af883-c73a-4331-aa15-b3cb90105782 (v1) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=0 no=1 mixed=2 err=0
- [2026-04-24] commit 34bca5d1, --character fd4bd9b5-8768-41e6-a90f-bfb1179b1d59 (v1) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=0 no=2 mixed=1 err=0
- [2026-04-24] commit 34bca5d1, --character ddc3085e-0549-4e1f-a7b6-0894aa8180c6 (v1) — BEFORE: yes=0 no=3 mixed=0 err=0 | AFTER: yes=0 no=2 mixed=1 err=0
