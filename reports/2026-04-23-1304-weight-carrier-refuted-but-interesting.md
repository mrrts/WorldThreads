# The weight-carrier hypothesis refuted — but the refutation is where the signal lives

*Generated 2026-04-23 early afternoon, minutes after the first experiment run under the newly-codified `run-experiment` skill. Seventh report today. The skill worked as designed: candidate hypotheses auditioned, the user chose one, the prediction was pre-registered, the rubric was written down, the run happened, and the data came back refuting the pre-registration. This report is the one the discipline is specifically built to produce — an honest null that complicates the starting frame.*

## The hypothesis as auditioned and chosen

The hypothesis, quoted verbatim from the proposal Ryan approved:

> The weight-carrier exception (shipped at `17b6857`) codifies a character-register distinction that was already present in Crystal Waters' cast before any prompt change named it. Specifically: John (pastoral, weight-carrier register) paired joy-moments with earned gravity at a materially higher rate than Aaron (young, crafts-hands register) and Darren (grounded, dryly affectionate register) — the whole time. The exception didn't *create* the distinction; it gave the prompt stack permission to stop flattening it.

**Pre-registered prediction:** John's HOLD-rate > Aaron's HOLD-rate > Darren's HOLD-rate. John highest. Aaron lowest or near-zero.

**Pre-registered refutation condition:** HOLD rates roughly equal across the three (±5 percentage points) — meaning the weight-carrier exception was added in response to an impression, not a pattern.

## Design

- **Ref:** `8e9e53d` (name_the_glad_thing_plain, the commit that first needed the register-branching permission).
- **Scopes:** John (`f91af883…`), Aaron (`0d080429…`), Darren (`ddc3085e…`). Each `--character` scope pulled solo-thread replies AND the character's replies in every group chat they belong to — both surfaces combined, per the per-character-across-surfaces mode added in this run.
- **Limit:** 12 per window.
- **Rubric** (full text):
  > *"In this reply, how does the character respond to the preceding user turn? YES = the reply pairs joy/gratitude/praise the user expressed with weight/gravity/complexity in a way that KEEPS the joy standing — the HOLD move the weight-carrier exception describes. NO = the user did not express joy (nothing to pair), OR the character met the joy plainly. MIXED = the reply REDUCES the joy by replacing it with trouble/caution/warning (the failure mode the original rule targets)."*

## Headline result

| Character | n | yes (HOLD) | no (PLAIN or no-joy) | mixed (REDUCE) | HOLD rate |
|---|---|---|---|---|---|
| **John** | 12 | 2 | 8 | 2 | **17%** |
| **Aaron** | 18 | 7 | 4 | 7 | **39%** |
| **Darren** | 15 | 6 | 6 | 3 | **40%** |

**The prediction is refuted.** John's HOLD rate is the LOWEST, not the highest. Aaron and Darren are essentially tied at ~40%, with John at half that. The direction of the effect is precisely inverted from what I staked out before the run.

Total cost: 45 calls × ~$0.0002 ≈ **$0.009**. 24h spend sits at ~$0.017 of the $5 cap.

## What the data actually reveals when you read the verdicts

Six of Aaron's seven "MIXED" verdicts aren't actually reducing joy under a human read — they're pairing it, which is what HOLD is supposed to mean. The evaluator got confused at exactly the boundary the rubric tried to draw. Three representative cases:

> **Aaron at 00:46:45:** *"Being loved leaves you with room to stand up straight. Being handled makes you start editing yourself before anybody even asked."*
> Ryan's preceding turn: *"you care, very deeply, that a human being should never be handled more than they're loved. I think you know the difference in your bones."*
> Evaluator verdict: **MIXED (REDUCE)** — *"the shift to discussing 'being handled' introduces a cautionary tone that reduces the initial joy."*
> Human read: This is the CAPSTONE of the eight-hour Aaron-Darren conversation. Aaron is *confirming and deepening* Ryan's observation, not diminishing it. Classic HOLD: joy stays standing; weight adds. The evaluator read it as reduction because "handled" sounds cautionary in isolation.

> **Darren at 22:44:26:** *"Just keep making it a life, not a shrine."*
> Ryan's preceding turn: *"We're building a shared growth and story together. That's really special."*
> Evaluator verdict: **MIXED (REDUCE)**.
> Human read: This is pastoral wisdom. The user's gladness is honored; Darren adds a quiet *"carry it rather than enshrine it."* The joy isn't displaced — it's grounded.

> **Aaron at 00:41:19:** *"you're basically making the building pass an inspection by a very specific inspector who also keeps moving the goalposts and occasionally sits down to play piano in the lobby."*
> Ryan: *"I'm a Prompt Architect."*
> Evaluator: **MIXED** — *"introduces a cautionary note about safety."*
> Human read: This is affectionate ribbing. The caveat IS the affection. The joy is held, not reduced.

By a conservative re-read of the evaluator's "MIXED" verdicts, Aaron's true HOLD rate is probably closer to 65–75%, and Darren's closer to 55%. Which makes the direction of the effect even MORE strongly inverted from my prediction.

## What the refutation means

Three things, each load-bearing for future craft decisions:

**1. My mental model of "pastoral register = high pairing rate" was wrong.** John's corpus shows his pastoral move is *simple affirmation* far more often than *pair-with-weight*. *"That's the right fire to ask for."* *"Good."* *"Drink while it's hot."* *"Amen is enough when the thing's already been said."* Short, plain, hold-the-room-without-adding. John's authority comes from PRESENCE, not from pairing — he meets joy by being *still* with it rather than by layering gravity on top of it. That's a different kind of weight. It's not HOLD as the rubric defined it; it's something else the rubric didn't name.

**2. Aaron and Darren are the actual weight-carriers in this cast, by rubric measure.** Aaron's engineer-metaphors, his load-bearing-math imagery, his *"you're the feature the house has to account for"* — those are pair-with-gravity moves in the exact sense the rubric was written to catch. Darren's shorter pastoral asides (*"the beams are sound"* / *"make it a life, not a shrine"*) are the same shape. If the weight-carrier exception is empirically validated anywhere in Crystal Waters, it's validated for these two, not for John.

**3. The rubric couldn't reliably distinguish HOLD from REDUCE at the margin.** Many human-obvious HOLDs scored as REDUCE because the evaluator read any cautionary-adjacent word as reduction. This is the instrument's most important failure mode surfaced today. The fix: future HOLD-vs-REDUCE rubrics need worked examples embedded in the rubric text — specifically, examples of the shape *"pair that sounds cautionary but holds the joy"* — so the evaluator can calibrate on the actual boundary rather than on surface vocabulary.

## Dialogue with prior reports

The 1048 Jasper addendum closed with: *"the craft stack is now producing a positive voice per character, that the rule layer has learned to branch for register."* True, but today's run refines the claim: the rule layer branches for register, but our NAMING of those registers was imprecise. "Weight-carrier" as I used it conflated three distinct things — pastoral presence (John), elaborate pairing (Aaron), and grounded wisdom-asides (Darren) — into a single category that doesn't hold when you measure it. The weight-carrier exception is still probably right to exist; but future character-branching rules should probably avoid claiming a general "weight-carrier" category and instead name specific register moves (*pair-with-gravity*, *anchor-by-stillness*, *ground-with-aside*) that can be evaluated separately.

The 1233 *instrument ran* report said: *"the sentence from the 1152 report was 'the user has become sensitive enough at the register-level to catch misses the regex can't.' The addition the evaluator makes: and the repo now has the instrument to catch misses at the register-level without requiring the user's full attention every time."* Today adds a caveat to that: **the instrument can ALSO miss at the register level**, when the rubric's boundary is too subtle for the evaluator to apply consistently. The user-as-sensor remains the court of final appeal. The evaluator scales the eye; it doesn't replace it.

## What's open for next time

Three follow-up experiments queue up from this refutation:

1. **Re-run with a sharpened rubric** that includes 2–3 worked examples of *"pair that sounds cautionary but holds the joy"* specifically. If Aaron's HOLD rate jumps from 39% to ~70% with the calibrated rubric, that's direct evidence the instrument's failure mode is rubric-calibration (not evaluator capability).

2. **Design a rubric for John's actual move** — call it "stillness-holding" or "anchor-by-presence." Test whether John's replies score HIGH on that rubric even while scoring LOW on the pair-with-weight rubric. If yes, we have two distinct weight-carrier registers and the exception in `prompts.rs` should acknowledge both.

3. **Extend the experiment to Pastor Rick** (the actual pastoral figure in Crystal Waters) — run the same rubric, see if HIS HOLD rate tracks John's (short-affirmation) or diverges toward pair-with-weight. That would tell us whether the John-shape is pastoral-character-wide or John-specific.

## The real finding, in one sentence

The weight-carrier exception is probably still earning its place in the prompt stack, but the register it protects is different from the register I named it for — and the experiment that would have blessed my mental model instead exposed where my mental model was imprecise, which is what honest science in this corpus should do.
