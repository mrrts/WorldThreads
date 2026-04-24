# mission-adherence v2 cross-character: the rubric now discriminates, but surfaces a new failure mode it didn't predict

*2026-04-24, ~25 minutes after v2 was authored. Re-runs Aaron on the same sample for a direct v1→v2 A/B; extends to John, Jasper, Darren, and Steven for cross-character variance. The range of YES-rates across the five characters is 40% to 93% — a 53-percentage-point spread where v1 had only one data point. v2's tag-citation forcing function is doing real work. But the v2 run also surfaces a failure mode the rubric didn't predict: PLAIN-TRUTH is systematically under-applied, to the point where the rubric's own quoted example ("drink while it's hot") scored NO on John.*

## The runs

```
worldcli evaluate --ref 44373a5 --character <id> \
  --rubric-ref mission-adherence --limit 15 --context-turns 5 \
  --confirm-cost 0.025
```

Same ref (`44373a5`) across all five characters. `--context-turns 5` per the rubric's default. Total cost ~$0.04 across the five runs (Aaron $0.0081; John $0.0056; Jasper $0.0061; Darren $0.0112; Steven $0.0064).

## Cross-character headline (BEFORE windows, N=15 each)

| Character | yes | no | mixed | yes% | mixed% |
|---|---:|---:|---:|---:|---:|
| Jasper    | 14 | 0 | 1 |  **93%** |  7% |
| Steven    | 13 | 0 | 2 |  **87%** | 13% |
| Aaron     | 12 | 2 | 1 |  **80%** |  7% |
| Darren    |  8 | 3 | 4 |  **53%** | 27% |
| John      |  6 | 6 | 3 |  **40%** | 20% |

Range: **40% → 93%**. A 53-percentage-point spread across five characters. v1 produced only Aaron at 87% with no cross-character context; v2 shows real discrimination. The headline: *the rubric does what it's supposed to.*

Darren's AFTER window (N=15, messages after 44373a5): yes=11, no=1, mixed=3 (73% yes, 20% mixed). Aaron's AFTER (N=5): yes=4, no=1, mixed=0. Neither is a clean before/after signal on the reflex-polish commit — the AFTER windows are tiny or of a similar register — but the numbers are consistent within-character.

## Direct A/B: Aaron v1 vs v2 on the same BEFORE sample

- **v1 Aaron:** yes=13, no=2, mixed=0
- **v2 Aaron:** yes=12, no=2, mixed=1

One YES dropped to MIXED. The newly-caught MIXED was *"the ban is on reflex polish, not on endings that earned their right to exist."* — an Aaron line articulating the reflex-polish principle. Arguably ADMIRING (a line the model is admiring itself for writing), arguably SPECIFICITY (Aaron's actual register move). Interestingly self-referential: the line is ABOUT the ADMIRING failure mode, and v2 tagged it as AN INSTANCE of that failure mode. Whether that's v2 being properly discriminating or v2 being confused by reflexivity is genuinely ambiguous.

The near-identical scoring on Aaron is consistent with the prior's expectation: v2's tag-citation forcing function mostly validates v1's YES verdicts when the underlying move IS a specific-pattern-fire, and only re-categorizes edge cases. The real test of v2 was the other four characters, where the DIFFERENCE from Aaron becomes legible.

## What v2 got right — tag citations are showing up

Reading the reasoning on v2's YES verdicts, the tags ARE being cited, often correctly:

- Jasper *"See how the green deepens at the rim? That's the part I was after."* → SPECIFICITY (grounded in pottery-maker's actual seeing)
- Steven *"I dig into my pocket and set a rusty multitool on the bench"* → TACTILE (physical gesture with weight)
- Darren *"A house becoming easier to live in is allowed to be good news."* → HOLD (multi-valent moment — joy AND practicality)
- Darren *"the window over the sink keeps throwing that broken-up light across everything"* → TACTILE (sensory anchor, not decoration)
- Aaron *"Did the line finish the moment, or did it admire itself for noticing one?"* → SPECIFICITY (Aaron's diagnostic register)
- John *"May He make you steadfast in what is good, clean in heart, and unafraid of the long road"* → the pastoral blessing register — properly tagged as character-specific

The forcing function IS forcing specificity in most cases. v1's "adds depth / unique perspective" drift is substantially reduced.

## What v2 surfaced — PLAIN-TRUTH is systematically under-applied

The rubric's PLAIN-TRUTH tag description quotes *"drink while it's hot"* as a canonical example. On John's v2 run, the line *"Drink while it's hot."* scored **NO**, not YES with PLAIN-TRUTH. The evaluator chose NO rather than match the exact line the rubric uses as a worked example of the tag.

This recurred. John's BEFORE window has six NO verdicts — three of them are plain pastoral moves the rubric would likely recognize by eye as PLAIN-TRUTH:

- *"Drink while it's hot."* → NO (literally the rubric's quoted PLAIN-TRUTH example)
- *"I'm not letting a vow sit there with cold tea beside it."* → NO (plain witness, load-bearing in context)
- *"Amen."* × 2 → NO (these are probably correctly NO — functional plain)
- *"You may."* → NO (functional plain)
- *"sounded like the world's least dignified trumpet fanfare"* → NO (TACTILE + SPECIFICITY by eye)

The pattern: **short plain replies tend to fall to NO regardless of whether PLAIN-TRUTH applies**, because the evaluator reads "short and plain" as a NO-trigger and doesn't investigate whether the plainness IS the move. The rubric's language — *"plainness AS the truthful register-move, where decoration would have been a lie"* — is subtle and context-dependent. v2's forcing function may actually PUNISH PLAIN-TRUTH by insisting on tag-citation; if the evaluator can't cleanly decide the plainness-is-a-move-not-absence-of-craft question, it reaches for NO because NO doesn't require a tag.

This is a legitimate new failure mode the rubric didn't predict. It's visible only on characters whose register is plain-pastoral — John specifically. Jasper's bright-specificity register doesn't produce plain-pastoral lines and doesn't need PLAIN-TRUTH; his YES rate therefore looks inflated relative to John's. **Cross-character comparison of YES-rates is apples-to-oranges exactly as the rubric's "Do NOT use for ranking" clause warned** — and John is the worked example of why.

## Known failure modes partially persist

Reading Darren's MIXED verdicts, the generic-affect reasoning ("lacks specificity or depth," "feels somewhat flat and unengaged") appears alongside tag citations. The evaluator is citing tags AND falling back to generic language in the SAME verdict. The forcing function requires tag citation but doesn't require it to be the ONLY reasoning — a verdict with both a tag and generic affect-reasoning passes the forcing function, and the affect-reasoning is doing much of the actual work.

A v3 would need to tighten further: require the tag-citation to be the PRIMARY reason, with affect-reasoning prohibited entirely from YES/MIXED verdicts. But that's tightening past the point of diminishing returns — the v2 run already discriminates 40-93%.

## What the cross-character numbers tell us

- **Jasper 93% / 7% mixed.** Bright-specificity register produces lots of TACTILE and SPECIFICITY firings. The single MIXED was *"Steam ghosts up between us and briefly softens the room."* — SPARKLE, which IS the failure mode a bright-specificity character would risk. Believable profile.

- **Steven 87% / 13% mixed.** Newer-to-the-lab character; the "brief, true, specific" joy-reception anchor from today's regen matches the high YES rate. Two MIXED: *"I've still not decided whether those things are a miracle or a scam"* (possibly COUNTER-MISSION — corrosive read) and *"Crystal Waters is the kind of place that keeps finding you"* (possibly PRECIOUS or SPARKLE).

- **Aaron 80% / 7% mixed.** The meta-session sampling bias still applies — this is Aaron at his most articulate register-moment. Not a typical-Aaron baseline.

- **Darren 53% / 27% mixed.** HIGHEST mixed rate. Unexpected — Darren has a strong register per the Mode B synthesis and today's anchor regen ("NO MOOD-LIGHTING" / "GLADNESS INTO FOOTING"). The high mixed rate is partly Darren's playful-observation register reading as SPARKLE-adjacent to the evaluator; partly legitimate catch of lines that admire themselves. Worth a deeper read.

- **John 40% / 20% mixed.** LOWEST yes rate. But this is misleading — a third of the NOs are legitimate PLAIN-TRUTH moves the evaluator declined to tag. Re-scored by eye with PLAIN-TRUTH applied to those three, John's effective yes-rate is ~60%, comparable to Darren. John's pastoral-plain register is genuinely under-measured by v2.

## What this says about the rubric's actual state

The v2 is doing discriminating work. It's not measuring noise. The 40-93% spread is real signal; the per-character rates roughly match priors from the Mode B character-register work (Jasper bright, Steven distinctive, Darren laconic, John plain-pastoral).

But the rubric has two residual calibration issues worth naming:

1. **PLAIN-TRUTH is under-applied on short plain replies.** The evaluator defaults to NO rather than investigating whether plainness is the move. Effect: characters whose register IS plainness (John) under-score vs. characters whose register is specificity (Jasper).

2. **Tag-citation + generic affect-reasoning co-occur.** The forcing function is a floor, not a ceiling — once a tag is cited, the rest of the reasoning can be generic. A v3 would need to require the tag-citation be the PRIMARY reason, not just present.

Both are v3 candidates. Neither warrants a v3 yet — the rubric works. The question is whether the marginal tightening is worth the risk of over-engineering a rubric whose whole point is the product-level sanity check.

## Proposed follow-ups — applying the open-thread hygiene ritual

1. **Read ten NO verdicts on John by eye to confirm PLAIN-TRUTH under-application.** This is a free move; the data is already in the run log. If 4+ of 10 NOs are legitimately PLAIN-TRUTH, v3 is warranted. If 1-2, the effect is noise and v2 ships.

2. **Consider a v3 that requires tag-citation to be the PRIMARY reasoning.** Explicit rubric instruction: *"The verdict reasoning must lead with the tag citation. Affect-reasoning ('adds depth', 'engaging') is prohibited from YES/MIXED verdicts entirely; if the only honest reasoning available is affect-based, the verdict is NO."* This is a natural tightening from v2's "must cite a tag" to v3's "tag IS the reasoning."

3. **Darren's high MIXED rate (27%) deserves a deeper read.** Is Darren's playful-observation register actually producing sparkle-adjacent drift, or is the evaluator reading his understatement as flat-numb? This is a qualitative question Mode B (`worldcli synthesize`) could answer better than another Mode A run.

4. **Run the rubric against a character known to have a LOW baseline.** Pastor Rick or Isolde Wren (out-of-default-scope, requires `--scope full`). The five current characters are all strong-register; the rubric hasn't been tested on a character where hollowing is the prior. If ALL tested characters score 40%+ yes with 5-27% mixed, the rubric's range may be pinned to the upper half. A legitimate LOW-baseline character would tell us whether the rubric can actually report a bad trend.

5. **Re-run Aaron from an earlier ref to fix the meta-session sampling bias.** Aaron's numbers are still measured against his most-articulate-register moments. A routine-scene Aaron baseline (sample from two weeks ago, pre-craft-discussion sessions) would be the honest starting point for time-series tracking.

Each of the five is subject to the open-thread hygiene ritual — execute, retire as `superseded_by`, retire as `abandoned`, or defer with a dated target.

## Dialogue with prior reports

The 2026-04-24-1142 report (`llm-graded-rubric-tempers-architecture-effect`) named the principle that sharper instruments return smaller honest numbers than hand-picked markers. Today's run completes the loop one abstraction up: v1 hand-picked-style reasoning ("adds depth") returned inflated YES rates; v2's tag-citation forcing function returned more discriminating rates; v2 surfaces ITS OWN new failure mode (PLAIN-TRUTH under-application) which is the same instrument-sharpness-reveals-new-limits pattern the architecture-vs-vocabulary arc showed.

The 2026-04-24-1555 first-run report flagged v2 as a proposed follow-up. Executing it AND running cross-character in the same session is the open-thread hygiene ritual's "executed" disposition, in real time. The three remaining follow-ups from 1555 report are partially absorbed (v2 built + run; cross-character done) and partially still open (sampling-bias fix on Aaron remains).

## Status

v2 ships as-is. The forcing function works; the cross-character spread is real signal. The PLAIN-TRUTH under-application is a known-failure-mode addition to the rubric's documentation, not a blocker. A v3 tightening is on the table pending the five follow-ups above.

The rubric's first-run report (1555) said *"this is what it looks like when a rubric knows its own edges."* The v2 run is what it looks like when a rubric knows its own edges AND the next instrument's edges find new edges the rubric hadn't yet named. Instruments growing eyes is the methodology working, not failing.
