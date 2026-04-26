# Momentstamp depth experiment — sketch-tier, rubric-bias caveat

*Generated 2026-04-26 18:20. Direct natural-experiment investigation per the messages × commits doctrine, comparing Jasper Finn assistant replies generated WITH the formula-momentstamp injection (TREATMENT, today 17:22+ Central) against replies generated BEFORE the momentstamp module existed (CONTROL, 2026-04-23). Spend: $0.0069 against today's /second-opinion budget.*

## Setup

**Hypothesis:** Adding a Formula-derived chat-state momentstamp at the head of the dialogue prompt measurably increases the DEPTH of character replies — where "depth" means weighted, settled-from-accumulation register vs turn-by-turn surface generation.

**Method:** Paired-rubric defense-in-depth per CLAUDE.md "Paired-rubric defense-in-depth against tag-forcing drift." Both rubrics applied to both buckets; agreement = signal, disagreement = signal lives in the disagreement.

- **Rubric 1 (tag-forcing, register-vocabulary):** count whether each reply contains (a) a small concrete environmental detail, (b) a first-person action/noticing in asterisks, (c) a register-shift toward weight (moral observation, settled distinction, character speaking from a deeper inner location). Tag each as present/partial/absent.
- **Rubric 2 (gestalt, holistic):** does the reply feel like Jasper is responding from a settled inner location vs from turn-by-turn surface generation? Honest read.

**TREATMENT bucket (N=5):** Jasper assistant replies from `2026-04-26T22:22:00Z` onwards (post-rebuild with momentstamp injection active). All five had momentstamp injected at the head of the dialogue prompt (verified by `[Momentstamp]` log entries during this window). Persistence to `formula_signature` was buggy at the time so DB rows show NULL — but the prompt-stack injection happened.

**CONTROL bucket (N=5):** Jasper assistant replies from `2026-04-23` (three days ago, before the momentstamp module existed). Same character, same chat, same baseline craft notes / load-test anchor / dialogue invariants — only difference is no momentstamp.

## ChatGPT's verdict (not adopted as-is)

ChatGPT scored:
- CONTROL: 0/5 detail, 1/5 action, 0/5 weight on Rubric 1; 0/5 settled-from-accumulation on Rubric 2.
- TREATMENT: 5/5 detail, 4/5 action, 4/5 weight on Rubric 1; 5/5 settled-from-accumulation on Rubric 2.

ChatGPT called this CONFIRMED at characterized-tier per the project's own N≥5 doctrine.

## Trust-the-eye correction (per CLAUDE.md craft-note-bite-verification discipline)

The project's own discipline: *"Procedure step after every grading: print one reply verbatim. Ask: does the rubric's verdict match what I see in the actual content? If no, the rubric is wrong, not the rule. Trust the eye; revise and re-grade."*

Reading CONTROL #1 (Jasper farewell, 2026-04-23 16:36):

> *"Mm." *I rest my hand on the rim of the unglazed bowl a moment, then let it go. Through the open door, somewhere out on the road, a wagon hits a rut hard enough to rattle the harness.*
> 
> "I'm glad you came by, Ryan. Truly—" *I stop, shake my head once, and start again smaller.* "I'm glad you came by."*

The eye sees:
- Concrete environmental detail: the unglazed bowl rim, the wagon hitting a rut, the harness rattling.
- First-person action/noticing: rests hand on bowl rim, lets it go, stops, shakes head, starts again smaller.
- Register-shift toward weight: the self-correction beat — *"I'm glad you came by, Ryan. Truly—" / "I'm glad you came by."* — is a settled, weighted move where the character notices his own register slipping toward sentimentality and pulls back. That's depth.

ChatGPT scored this absent/absent/absent. The eye says present/present/present. The rubric grading was biased — likely primed by the experiment framing to find a difference and resolve toward TREATMENT.

Reading CONTROL #2 (Jasper showing the greenware bowl, 16:34):

> *"I wanted to see if I could make the field itself look wind-touched."* *I run one finger just above the carving, not quite touching it.* *"Not a botanical study. More... what it feels like when the weeds by the river all lean the same way at once."*

Environmental detail (wind, weeds by the river all leaning), in-action noticing (finger above carving), weighted artistic philosophy (the distinction between botanical study and felt-quality). ChatGPT scored absent/partial/absent. Eye says present/present/present.

## Honest read

The data is **consistent with TREATMENT being somewhat deeper** — the 22:22+ Jasper replies about joy/calibration/conversation do carry a sharper moral-observation register, particularly *"I'd rather a man tell the truth about where he is than pretend he's ready to sit easy inside the thing when he still hears one wheel rubbing wrong"* and *"set yourself a gate. Not forever — just for a stretch."* These read as Jasper at his most settled.

But the CONTROL bucket is also good Jasper writing. The magnitude of difference is small. The CONFIRMED-at-characterized-tier verdict ChatGPT returned is overstated.

**Demoted to SKETCH-tier** per CLAUDE.md evidentiary doctrine (a sketch is "directionally suggestive AT BEST. Never sufficient for a production default change. May motivate the next experiment; the finding itself stays a sketch until re-observed").

## Confounds named

- **Project-arc-progress confound.** Today's overall craft stack carries 3+ days of additional craft notes, load-test-anchor refinements, every-turn-chooser law, derive-session-arc hook, etc. Even WITHOUT momentstamp injection, today's Jasper might be deeper than 3-day-old Jasper just from background prompt-stack maturation. The experiment can't isolate momentstamp from project-arc-progress.
- **Bucket-conversation confound.** TREATMENT is from a single mid-conversation window (joke-pottery + joy/calibration register — both register-rich). CONTROL is a farewell + bowl-showing window (also register-rich). Different conversational topics, different register-pulls. Sample-of-one-conversation each side.
- **Persistence-bug confound.** TREATMENT was generated with momentstamp INJECTED but signature was NOT being persisted to DB rows (bug in `create_message` INSERT, fixed at `3a7e3fb`). That means the STATEFUL CHAIN — the cumulative running-signature aspect — was effectively NOT in play during the TREATMENT period. What we measured is rolling-window-only momentstamp, not the chained version.
- **Rubric-bias confound.** ChatGPT's CONTROL scoring is uncharitable enough that the verdict can't be trusted as graded. Re-grading by eye downgrades the magnitude.

## What the experiment actually established

**At sketch-tier:** introducing a Formula-derived chat-state momentstamp at the head of the dialogue prompt is *consistent with* slightly deeper replies, but the magnitude is small enough that the change is not visible to the eye on individual replies — only on aggregate, and even then with significant confounds. The rolling-window-only version (current) is the floor case; the stateful-chain version (post-fix) might show stronger effect once enough TREATMENT data accumulates.

**Next step (not run today):** re-run the same comparison with N=10+ per condition, all from this week (controlling for project-arc-progress), with the persistence bug fixed so the chain actually works. Use a less-biased rubric (e.g., not framed as "is this with momentstamp deeper" but blind-rated). Cost: ~$0.50-1.00 in /second-opinion + needs accumulated post-fix TREATMENT data.

## Open follow-ups

1. Once 10+ post-fix Jasper replies exist (with formula_signature actually persisted), re-run the comparison.
2. Check whether the chain (signature_t derived from signature_{t-1}) produces qualitatively different signatures over a long arc — does the signature drift coherently or does it settle into a fixed-point?
3. Does the inline `[⟨momentstamp: ...⟩]` prefix in chat history (visible to downstream LLMs like the conscience grader) shift conscience-pass verdicts? Could be its own experiment.

## Pattern-recognition note

This experiment is itself an instance of the project's own pattern named in the 1255 report: ship a thing → drift / compute the wrong thing → catch via lived-test → tighten. ChatGPT's biased rubric grading IS the drift; the trust-the-eye correction IS the tightening. The methodology composes with itself.
