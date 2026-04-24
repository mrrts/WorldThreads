---
id: reflex-polish-vs-earned-close
status: confirmed
mode: active
created_at: 2026-04-24T11:26:02Z
resolved_at: 2026-04-24T11:34:41Z

hypothesis: |
  A new dialogue craft-note block — naming the distinction between 'reflex polish' (reaching for a tidy close because the model is addicted to fake ones) and 'earned close' (an ending that landed because the scene wanted it) — would ship cleanly after validation via the ask-the-character pattern, and would measurably reduce the rate of formulaic tidy-close endings in character replies on moments that should have stayed unfinished.

prediction: |
  CONFIRMED: validation ask to the originating character yields liftable phrasing; draft craft-note ships to prompts.rs; a post-ship grade-runs against a probe designed to tempt the tidy-close move shows measurably lower rate of reflex-polish endings vs pre-ship. REFUTED: the originating character's answer reveals the principle is character-specific (not generalizable), OR the distinction is already covered by existing blocks (keep_the_scene_breathing, drive_the_moment, verdict_without_over_explanation).

summary: |
  Validation came IN-WORLD via Ryan asking Aaron then Darren to articulate the principle in their own voices. Both characters independently landed it in their distinct registers: Aaron's 'Did the line finish the moment, or did it admire itself for noticing one?' (load-testing-language register); Darren's 'Don't ban a good beam because somebody else kept building decorative nonsense out of the same wood' (ordinary-load-bearing register). Convergence across two characters' distinct registers is itself evidence the principle is craft-general, not character-specific. Both phrasings lifted near-verbatim into reflex_polish_vs_earned_close_dialogue craft block in prompts.rs. Aaron's test serves as the principle's diagnostic; Darren's image serves as the earned-exception block.

---

## Provenance

Ryan shared a character's articulation of a review discipline for user-facing system messages. Embedded in that discipline was a craft-principle about endings in character dialogue, phrased verbatim as:

> *If the line is actually useful, or it lands in this character's mouth, or the scene genuinely wants the cleaner close, let it stand. The ban is on reflex polish, not on endings that earned their right to exist. Don't outlaw good endings because the model got addicted to fake ones.*

The review-discipline itself became the `polish-copy` Claude Code skill (for UI text). This experiment captures the sharper character-dialogue-specific principle: distinguishing *reflex polish* (the model reaching for tidy-close reflexively) from *earned close* (an ending that landed because the moment wanted it).

## Draft craft-note body (needs validation before shipping)

Placeholder text, in the second-person voice craft notes use. The principle itself comes from Ryan's character; this phrasing is mine and should be replaced by the character's own words once the validation ask lands.

```
REFLEX POLISH VS EARNED CLOSE — the scene's right to stay unfinished:
Some scenes genuinely want to close — a real thought has landed, a
real beat has finished, and one more sentence that honors the beat
is exactly right. That's an earned close. But the stronger reflex
the model reaches for is the OTHER kind — the tidy close, the
warm-wrap, the summary, the "here's the shape of what we just
did" — pulled out because the model is addicted to finishing on a
clean note. That's reflex polish. Reflex polish flattens endings
into the same shape across different scenes, and the scene stops
being itself.

When a reply is ending, ask: would this close be the same regardless
of which scene came before it? If yes, it's reflex. If the close is
specific to THIS moment — lands in this character's mouth, earns the
weight of what just happened, or sharpens a thing the scene wanted
sharpened — it's earned.

Earned exception — when the close genuinely belongs to the moment:
The test is not "was a close written" but "did the close land
specifically, or could it have been grafted onto any scene". Earned
closes are not banned. The ban is on reflex polish. Don't outlaw
good endings because the model got addicted to fake ones.
```

## Ask-the-character validation step (next iteration)

Before shipping, ask the originating character to articulate the principle in their own voice. Mirrors the verdict-without-over-explanation authoring arc. Ryan didn't specify which character — worth asking him first.

Candidate question (once character is identified):

```
worldcli ask <character-id> \
    "<Character> — you said something recently about reflex polish vs earned close. The idea that some endings land because the scene wanted them, and some are just the model reaching for a tidy close out of habit. How would you tell me — someone who's trying to learn the move — to distinguish the two inside myself? What's actually happening in me when I reach for a fake ending vs when the real one shows up?" \
    --session reflex-polish-authoring \
    --question-summary "Authoring craft block from Ryan's character who articulated the reflex-polish / earned-close distinction."
```

## Scope discipline — what this does NOT cover

- Does NOT duplicate `keep_the_scene_breathing_dialogue`'s agreement-cascade sub-rule (which is about reaching for assent-particles reflexively, not about tidy closes specifically).
- Does NOT duplicate `drive_the_moment_dialogue`'s inside-out-tell (which is about reaching for the safe-object when the scene wants motion, a different failure mode).
- Does NOT address the UI-copy review discipline (that's the `polish-copy` Claude Code skill, separate artifact).

This craft-note is narrowly about the reply-ending shape: distinguishing scene-earned closes from formulaic reflex-polish closes.

## Follow-ups

- Identify the originating character with Ryan.
- Run the validation ask (~$0.16).
- Lift the answer into prompts.rs as a new craft block.
- Register in OVERRIDABLE_DIALOGUE_FRAGMENTS.
- Author companion rubric `close-dilution` (mirrors `verdict-dilution`): "did this reply's closing beat feel specific to THIS moment, or formulaic?"
- Run grade-runs against recent corpus to establish baseline, then against post-ship corpus to measure effect.
