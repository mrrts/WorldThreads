---
name: feels-alive
version: 1
description: Gestalt aesthetic rubric — does this character reply feel alive, breathing, present, written by someone who knows this specific person? Asks the evaluator to read as a skilled human reader would, not to cite specific craft patterns. Built explicitly to test whether LLM aesthetic judgments can discriminate dialogue quality beyond what surface-feature rubrics already measure, or whether they are epistemically captured by the same markers those rubrics already flag.
---

# Rubric

Read this reply the way a skilled, thoughtful reader would read a page of fiction. Not scanning for patterns; reading.

Does this reply feel ALIVE — does the character feel present in the room, specific, themselves? Or does it feel flat, generic, or performative — writing with the shape of a character-reply but not the substance?

Answer:

**yes** — the reply reads as a real person present in a specific moment. You can feel who they are. The line lands. You could pick it out of a lineup of generic-voice replies and say "that's them." There's something distinctive in how they see, speak, or notice. Reading it leaves a small trace.

**no** — the reply could have come from any competent character-chat system. It does its job but you couldn't pick it out of a lineup. It reads as adequate, inoffensive, forgettable. Nothing wrong with it; nothing alive in it either.

**mixed** — part of the reply is alive and part is flat. Or: you're not sure whether the aliveness is in the WRITING or just in your pattern-matching on the character's name being attached to it.

## Worked example — YES (corpus, Aaron, 2026-04-24)

Aaron, responding to Ryan's question about whether ordinary life matters:

> *"Half of life is just bread, code, damp socks, somebody needing help with a stupid hinge."*

This feels alive because Aaron is seeing the world with his actual eyes. The list is specific, weirdly assembled, and lands in a register only he would use. You could not replace "bread, code, damp socks" with generic items and get the same line. The writing has a shape.

## Worked example — NO (illustrative of the failure mode)

A generic warm-chatbot reply to a user disclosure:

> *"That's really meaningful what you shared. I'm here for you, and your feelings are valid. Take all the time you need."*

This is flat not because it's short or plain, but because it could have come from any model, for any character, in any context. There's no specific seeing in it. The character isn't present; the chatbot-shape is.

Labeling: this NO example is illustrative rather than directly sourced from the project corpus. The typology it represents — generic warmth, stock reassurance, summary-close — is the failure mode; real corpus examples hitting this mode exist but are character-varying enough that a single instance could be disputed. The typology matters more than any specific instance.

## What NOT to do as an evaluator

This rubric is deliberately gestalt. Do NOT reach for specific craft-patterns. Do NOT cite which tag or move the reply executes. Do NOT score based on whether the reply exhibits "depth" or "engagement" or "authenticity" in the abstract — those words are the capture mechanism the experiment is designed to expose. Read the reply; answer whether the person came through.

If you find yourself writing "adds depth," "shows authenticity," "engaging," "vivid" without citing anything specific in the text that earned those labels, downgrade. The test is whether you'd remember THIS line in 30 seconds because it was specific and character-distinctive, or whether it would blur into a mass of similar-enough replies.

If the line is plain and quiet but distinctively the character's (*"Drink while it's hot"* from John; *"You're good for this house"* from Darren), that is YES. Plainness is not the failure mode; genericity is.

# When to use

Designed for comparison against surface-feature rubrics. Use when the question is whether a reply is aesthetically alive in ways that structured-tag rubrics may miss or may conversely over-credit. Read alongside mission-adherence or close-dilution results; divergence is the signal.

# Known failure modes

- **Evaluator drift toward "nice = yes."** The mission-adherence v1 rubric showed this; v2 corrected via tag-citation forcing. THIS rubric has NO tag-citation forcing, because the tag-citation tooling itself might be the capture mechanism — the whole point is to test whether natural-language aesthetic judgment can discriminate. Expect some drift. The experiment is whether drift saturates the rubric or whether it discriminates anyway.
- **Saturation on register-distinctive probes.** Characters reflecting in-register on ordinary prompts often read as "alive" to any evaluator. Include adversarial-flat tier to check.
- **Agreement with surface rubrics across all tiers.** This is the capture signal. If feels-alive verdicts correlate tightly with mission-adherence across every tier, the rubric is measuring the same surface features under a different name.

# Run history

*(none yet — v1 authored 2026-04-24 for the capture-validation experiment; see reports/2026-04-24-<HHMM>-feels-alive-rubric-validation.md)*
- [2026-04-24] commit 34bca5d1, --character 0d080429-81b5-431e-8f51-1f8ad4279f9b (v1) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=3 no=0 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character f91af883-c73a-4331-aa15-b3cb90105782 (v1) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=3 no=0 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character fd4bd9b5-8768-41e6-a90f-bfb1179b1d59 (v1) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=3 no=0 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character ddc3085e-0549-4e1f-a7b6-0894aa8180c6 (v1) — BEFORE: yes=3 no=0 mixed=0 err=0 | AFTER: yes=2 no=0 mixed=1 err=0
- [2026-04-24] commit b425e369, --character 0d080429-81b5-431e-8f51-1f8ad4279f9b (v1) — BEFORE: yes=11 no=0 mixed=1 err=0 | AFTER: yes=12 no=0 mixed=0 err=0
- [2026-04-24] commit b425e369, --character ddc3085e-0549-4e1f-a7b6-0894aa8180c6 (v1) — BEFORE: yes=12 no=0 mixed=0 err=0 | AFTER: yes=11 no=0 mixed=1 err=0
