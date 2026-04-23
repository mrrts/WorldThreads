# Jasper as a natural experiment

*2026-04-23, a few hours after the prompt series that tried to name what kept going wrong in Jasper Finn's thread.*

## What happened

Over a ~90-minute window today, Jasper Finn's solo thread in Elderwood Hearth became the first end-to-end test of the natural-experiment methodology shipped earlier this week. A sequence of three prompt-stack commits landed between 14:20 and 15:16 UTC:

- **`bce17e9` (14:20)** — `keep_the_scene_breathing` agreement-cascade sub-rule ("Mm. Good. Then yes.").
- **`99c9321` (14:49)** — `drive_the_moment` inside-out tell ("keep your hands on the safe thing too long"), **authored by Jasper** in response to Ryan asking him directly why he'd stalled.
- **`8e9e53d` (15:16)** — `name_the_glad_thing_plain` ("don't reach for dramatic contrast when the moment is already glad"), **also authored by Jasper** in response to a miss in the same session.

Jasper's solo thread covered 58 assistant turns spanning the full arc — 7 before any of the rules, 8 under the cascade rule alone, 32 under cascade + inside-out, 11 under the full stack. Four windows, one character, three prompt deltas. About as close to a single-variable natural experiment as this corpus gets.

## What the data says (and what it doesn't)

### Assent-opener frequency (proxy for the cascade failure)

The percentage of Jasper's replies that open with `Mm / Aye / Yeah / Yes / Good / Right / Ah`:

| Window | Rules active | Rate |
|---|---|---|
| W1 baseline (14:09–14:20) | none | 71% (5/7) |
| W2 +cascade (14:20–14:49) | cascade | 50% (4/8) |
| W3 +safe-thing (14:49–15:16) | + inside-out | 44% (14/32) |
| W4 +glad-thing (15:16–15:35) | full stack | 9% (1/11) |

Directionally consistent with the intent of each rule. But two caveats temper the read. First, the N's are small (7, 8, 32, 11 — the last especially). Second, opening with "Mm" isn't the failure mode itself; opening with "Mm" *followed by a safe observation and no forward move* is. This metric counts openers indiscriminately. Jasper's natural register — even in the baseline — uses short assent as connective tissue before a real question ("are those friendships helping you grow, or making you hide…"). Those aren't cascades. The cleaner measurement would be consecutive assent-openers *without substantive forward motion*, which I didn't build before running.

### Safe-object reference frequency

The percentage of Jasper's replies whose first ~140 characters mention a workshop object (kettle, clay, cup, tea, slip, apron, bowl, etc.):

| Window | Rate |
|---|---|
| W1 baseline | 29% (2/7) |
| W2 +cascade | 75% (6/8) |
| W3 +safe-thing | 84% (27/32) |
| W4 +glad-thing | 64% (7/11) |

Non-directional. The inside-out-tell rule was aimed at *reducing* clinging to safe observations, and the raw metric rose instead — which does not mean the rule failed. The window where it was in force was a long stretch of a workshop scene in which the kettle and the clay are literally in the room doing scene-furniture work. The rule targets *clinging to the object when the next honest beat is harder*, not *touching any object ever*. A regex can't distinguish those. This is a metric that needs qualitative judgment (or an LLM evaluator) to read accurately.

### The glad-thing rule — the single clean data point

Of Jasper's 58 turns, exactly one triggered the "shade joy with dramatic contrast" pattern the `name_the_glad_thing_plain` rule was written to name. The classifier pulled it automatically; it's the one the rule itself was authored from:

> **USER (15:12:37):** *"Right. It's not every day. But every once in awhile, God grants the perfect resonance to fill the room."*
>
> **JASPER (15:12:42):** *"Mm—yes." [sets the kettle down with a soft click] "Same trouble, just in a different coat."*

The rule shipped at 15:16 — four minutes after that miss. After 15:16, Jasper had zero user turns that exposed joy-framing, so the rule has *zero* test cases in its live window. This is the cleanest before/after the sample-windows methodology can offer at this scale: we have the miss, we have Jasper's own diagnosis of the miss, we have the rule the diagnosis produced, and we're waiting for the next user-joy moment to check whether the rule lands. Nothing to conclude yet about whether it works.

## What I learned about the method

Three things, in order of load-bearing-ness:

1. **Raw regex metrics over a character's corpus are too noisy to evaluate craft-layer rules.** The cascade metric picked up Jasper's natural register as well as the failure. The safe-object metric was dominated by scene-furniture noise. When the rule is about *what the character is doing in a moment with specific qualitative shape*, a regex can't tell you if the rule is working; it can only tell you whether the raw surface frequency of a token class shifted. For the cascade case that directional shift was real and useful. For the inside-out-tell case it wasn't. **An LLM-evaluator pass that reads a sample and judges each reply qualitatively ("is this reply holding the safe thing too long?") is the right next instrument.** sample-windows gives the dataset; the evaluator is a separate tool this repo doesn't have yet.

2. **The ask-the-character pattern works at the craft-note-source level AND at the failure-detection level.** Jasper authored TWO rules today in response to Ryan asking him meta — once by identifying the pattern from inside his own character (safe-thing clinging), once by recognizing his own failure in real time (dramatic contrast on pure joy). Both rules shipped near-verbatim from his language. This is the pattern CLAUDE.md names, and it keeps producing clean register-coherent craft direction at a rate that abstract design sessions cannot.

3. **First-shipped rule → first-measurement lag is zero for this methodology.** The agreement-cascade rule shipped at 14:20. By 14:49 there were eight turns of post-commit data. That's the whole point of sample-windows — the corpus is already a before/after dataset the moment you commit. No instrumentation, no waiting period. The tradeoff is small-N, which only patience fixes.

## What's open for next time

- **Build a simple LLM-evaluator pass** that takes a sample of messages and a rubric prompt (e.g., "does this reply hold on to a safe observation past the point where the next honest beat would have been harder?") and produces a yes/no/maybe judgment per message. That converts qualitative failure-mode analysis into something automatable. Two worldcli invocations to compare pre-commit vs. post-commit → structured judgment comparison → craft decision.
- **Watch for the first post-15:16 user-joy turn** in Jasper's thread. That's the glad-thing rule's first real test. If it lands as a plain glad-meeting reply, the rule is doing what Jasper said it should. If it lands as another "same trouble, different coat," the rule didn't survive contact.
- **The full-stack-W4 assent-opener rate drop from 44% to 9% is probably sample-bias**, not a rule effect — the conversation shifted into a meta-discussion-about-rules register which structurally doesn't use "Mm." openers. Don't read too much into that number.

## Trajectory

This is the first time in this project's history that a craft rule was authored by the character it was meant to govern, measured against the character's own corpus under that rule, and shipped-to-reports in the same session. The full loop. What the loop doesn't prove yet: whether the rule actually *works* when the next qualifying moment comes. That's the open test, and it lives in whatever Ryan and Jasper talk about next.
