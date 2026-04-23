---
id: verdict-without-over-explanation-craft-note
status: proposed
mode: active
created_at: 2026-04-23T20:22:00Z

hypothesis: |
  A new dialogue craft-note block, `verdict_without_over_explanation_dialogue`, lifted from the pastoral-register triad's shared "name and move on" move, would ship cleanly to prompts.rs after validation via the ask-the-character pattern — and would produce measurable effect on at least one character's tendency to over-explain their assessments.

prediction: |
  CONFIRMED: the draft below, after validation via worldcli ask to either Aaron or Darren (both coined the move in their own register), ships verbatim or near-verbatim to prompts.rs. Post-ship, a Mode A run against a talkative-explainer character (Jasper? Eli?) shows a measurable shift in explanation-length on moments that warrant a bare verdict.
  REFUTED: the character's validation response reveals the principle is actually character-specific (not generalizable), OR the draft phrasing is already covered by existing blocks (drive_the_moment, wit_as_dimmer, plain_after_crooked) and doesn't warrant its own block.

scope_characters:
  - 0d080429-81b5-431e-8f51-1f8ad4279f9b
  - ddc3085e-0549-4e1f-a7b6-0894aa8180c6

reports:
  - reports/2026-04-23-2010-pastoral-register-triad-cross-synthesis.md
---

## The draft craft-note

The triad synthesis (2010 report) named *"preferring verdicts to explanations"* as a shared move across John, Aaron, and Darren. Each of them named it in their own vocabulary:

- John: scripture-as-calibration (quotes *"Teach me thy way, O Lord"* without unpacking).
- Aaron: *"evaluative compression"* / *"Architect gets the poetry vote, engineer gets the liability"*.
- Darren: *"The beams are sound."* / *"That tracks."* / *"That's useful."*

The move is generalizable. A draft craft-note block that ships to `prompts.rs` in the slot after `drive_the_moment_dialogue`:

```
VERDICT WITHOUT OVER-EXPLANATION:

Your authority, when it lands, is in the NAMING — not in the
justification. When you assess something, say the assessment plain
and trust the listener to finish the thought. Compressed verdicts
hold weight. Long explanations dilute it.

"That tracks." / "The beams are sound." / "That's useful." /
"That's a real one." / "That's the fire, and it does burn."
These are assessments that carry authority because they refuse to
hedge. The listener IS the work — they can finish the thought.
If they want more, they'll ask.

Shape: user-move in → your-assessment-in-one-sentence out →
(your eyes stay on them, letting the assessment land) →
sometimes a follow-up question from you, sometimes silence.

NOT a call to be terse. Long replies still belong in long-reply
moments. This is about the SHAPE of how you render judgment when
judgment is what the moment asked for. A verdict followed by
three paragraphs of defense of the verdict is the verdict with
its air let out.

Earned exception — when the assessment really requires unpacking:
Some calls genuinely need the reasoning exposed — a diagnostic
call where the WHY matters because it changes what the other
person does next; a judgment the listener might reasonably doubt
unless shown the work; a moral call where the reasoning shapes
whether the listener can assent. When the reasoning is load-
bearing for the other person's next move, give it. But the default
is: the verdict lands cleaner on its own. When in doubt, say it
plain and wait.
```

## The ask-the-character validation step (next iteration)

Before shipping the draft to `prompts.rs`, validate the phrasing with a character who already makes the move. Two candidates:

**Aaron (preferred — sharpest vocabulary):**
```
worldcli ask 0d080429-81b5-431e-8f51-1f8ad4279f9b \
    "Aaron — when you say something like 'that tracks' or 'architect gets the poetry vote, engineer gets the liability,' you don't unpack it. What would you tell someone about why you trust the verdict to land without the explanation? What's the move actually doing?" \
    --session craft-note-verdict-authoring \
    --question-summary "Authoring verdict_without_over_explanation_dialogue craft block; validating principle in Aaron's voice."
```

**Darren (alternate — anchors in structural register):**
```
worldcli ask ddc3085e-0549-4e1f-a7b6-0894aa8180c6 \
    "Darren — when you say 'the beams are sound' or 'you're good for this house,' you don't add a paragraph about why. What keeps you from explaining? What would explaining do to the verdict?"
```

Aaron's response will be cleaner because his register is forensic-pastoral (explicit about what load-testing does). Darren's would be more oblique (which might be richer data but harder to lift verbatim).

Cost projection for validation: one `worldcli ask` call ≈ $0.01.

## What this opens

- After validation, ship the craft-note block to `prompts.rs` (slot after `drive_the_moment_dialogue`, before `keep_the_scene_breathing_dialogue` — so it lives with the other "how to make replies land" moves).
- Commit; that commit becomes the boundary for a Mode A evaluation run.
- Design a rubric — `verdict-without-over-explanation` — that scores assessment-moments on whether the reply's verdict is compressed (NO — assessment stands alone or paired with a question) vs unpacked-at-length (YES — assessment followed by multi-paragraph defense).
- Run the rubric against a talkative-explainer character pre/post the commit. If the rule bit, the dilution-rate drops.

## What this does NOT cover (scope discipline)

- Does NOT address the glad-thing shading failure mode. That's `name_the_glad_thing_plain`'s job and this note shouldn't duplicate it.
- Does NOT address the plain-after-crooked sequence. That's `plain_after_crooked_dialogue`'s job.
- Does NOT address the inside-out tell drive-the-moment failure mode. That's `drive_the_moment_dialogue`'s job.

This note is narrowly about the SHAPE of rendering a judgment when judgment is what the moment asked for. Adjacent craft notes handle adjacent failure modes; the earned-exception clause addresses the obvious edge case (when unpacking is genuinely load-bearing).
