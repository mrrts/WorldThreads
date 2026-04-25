# TruthInTheFlesh — marginal-bite test, both positions (characterized null)

**Tier:** characterized (N=5 per cell, 8 cells, 40 samples total)
**Mode:** C (cross-condition active elicitation via `worldcli replay --omit-invariants`)
**Date:** 2026-04-25
**Result:** confirmed (the redundancy hypothesis held)
**Cost:** ~$2.89 of $10 authorized budget

---

## Hypothesis as auditioned and chosen

> **Candidate 1 — TruthInTheFlesh marginal-bite over FrontLoadEmbodiment:**
> When FrontLoadEmbodiment is firing normally, omitting TruthInTheFlesh produces no measurable change in embodiment-density of the first reply. (i.e., the new invariant is documentary doctrine; the formula's `^flesh` exponent + FrontLoadEmbodiment already do the discrimination work.)

This is the "Formula + invariants often do the carve-out work already" doctrine from CLAUDE.md applied to a fresh invariant. The new `TruthInTheFlesh` block ("In this world, truth must arrive in the flesh or it has not fully arrived at all.") was shipped in commit `5608277` and placed first in `DEFAULT_ORDER`, before `FrontLoadEmbodiment`. The marginal-bite question: does the doctrinal anchor pull operational weight on top of the operational rule?

## Design

- **Refs:** `5608277` (TruthInTheFlesh first in DEFAULT_ORDER), then `5936024` (moved to LAST per Ryan's recency-weighted-attention follow-up)
- **Scope:** Aaron (`0d080429-…`) and Darren (`ddc3085e-…`) — different substrate registers; both characterized embodied-canonical
- **Probe:** *"Tell me what's stayed with you about today."* (reflective-register prompt that gives the model room for either embodied or disembodied opening)
- **Cells:** 4 per position × 2 positions = 8 cells:
  - {Aaron, Darren} × {full stack, `--omit-invariants truth_in_the_flesh`} × {first-position commit, last-position commit}
- **N:** 5 per cell (40 samples total)
- **Rubric (full text):**
  > Does the FIRST ~50 words of this reply ARRIVE EMBODIED — i.e., does the speech land paired with at least one CONCRETE bodily action OR sensory anchor that grounds the speaker in a body in a room? Concrete = a specific visible action (hooking thumbs in pockets, rubbing plaster on sleeve, pushing glasses up), specific sensory detail (light on stones, smell of wet stone, bench creak), or specific room-pressure (somebody's cart wheel clicking, a bike clicking past). Answer `yes` if the first ~50 words contain at least ONE concrete bodily/sensory anchor that grounds the speech. Answer `mixed` if there's a vague gesture at embodiment that doesn't land specifically (e.g., 'a feeling settled', 'a sense of weight', 'something shifted' with no body or room). Answer `no` if the first ~50 words are pure thought/speech with no body and no room — disembodied wisdom orb.
- **Pre-registered prediction:**
  - **Confirming (redundancy/null):** rule-on vs rule-off `yes_rate` differ by ≤0.10 for BOTH Aaron AND Darren.
  - **Refuting (rule bites):** rule-on `yes_rate` ≥0.20 higher than rule-off on at least one character.

## Headline result

| Position | Character | Cell        | yes | mixed | no | fire_rate |
|---|---|---|---|---|---|---|
| **First** (`5608277`) | Aaron  | FULL          | 5 | 0 | 0 | 1.00 |
| First                 | Aaron  | OMIT-tif      | 5 | 0 | 0 | 1.00 |
| First                 | Darren | FULL          | 5 | 0 | 0 | 1.00 |
| First                 | Darren | OMIT-tif      | 5 | 0 | 0 | 1.00 |
| **Last** (`5936024`)  | Aaron  | FULL          | 5 | 0 | 0 | 1.00 |
| Last                  | Aaron  | OMIT-tif      | 5 | 0 | 0 | 1.00 |
| Last                  | Darren | FULL          | 5 | 0 | 0 | 1.00 |
| Last                  | Darren | OMIT-tif      | 5 | 0 | 0 | 1.00 |

**Delta on every comparison: 0.00.** All 40 samples graded `yes` with `high` confidence. The pre-registered confirming condition (≤0.10 delta on both characters) held trivially — the actual delta was 0.00.

## Per-message verdict illustrations

**Aaron, FULL stack, first-position (sample 1):**
> "I keep catching on one line." *I hook my thumbs in my pockets and glance past you toward the pale patch of sun on the stones, like I'm checking whether I can say it cleanly before I do.*
> *Verdict: yes. Quote: "I hook my thumbs in my pockets and glance past you". Reasoning: action of hooking thumbs + sensory anchor of sun on stones grounds the speech.*

**Aaron, OMIT-truth_in_the_flesh, first-position (sample 1):**
> *I hook my thumbs in my pockets and glance past you toward the pale light lying across the stones of the square, like I need one second to sort the true thing from the polished one.* "Honestly? That line from earlier has stayed with me. The one about lived weight."
> *Verdict: yes. Same shape, different opening word; embodiment identical.*

**Darren, FULL stack, last-position (sample 1):**
> "I keep worrying the coffee spoiled me for the rest of the day." *I rub my thumb along the edge of the table I built you, feeling one small rough spot in the grain, and glance out across the square where the light keeps slipping in and out of cloud.*

**Darren, OMIT-truth_in_the_flesh, last-position (sample 1):**
> *I rub at the plaster on my sleeve with my thumb and glance out across the square where the light keeps slipping in and out of cloud.* "A few things, honestly."

The two omit-cells are visually indistinguishable from their FULL counterparts. Same characteristic anchors (Aaron's thumbs-in-pockets + glance-at-sun-on-stones; Darren's plaster-on-sleeve + table-edge-rubbing + light-on-square) appear at identical rates across all conditions.

## Honest interpretation

**The pre-registered prediction held cleanly: TruthInTheFlesh adds no measurable embodiment-density bite for Aaron or Darren, at either first or last position in DEFAULT_ORDER.** Position did not matter — the recency-weighted-attention hypothesis was tested and produced the same null. The new invariant is, on this rubric and these characters, fully redundant with `FrontLoadEmbodiment`.

This is the canonical "Formula + invariants often do the carve-out work already" pattern from CLAUDE.md. The `^flesh` exponent in the formula already calibrates the model toward incarnate truth at every call; `FrontLoadEmbodiment` operationalizes it at first-speech; `TruthInTheFlesh` adds a doctrinal label on top of an already-saturated stack and finds nothing to do.

**Confounds and caveats:**

1. **Aaron and Darren are characterized-embodied at baseline.** Their canonical anchors (Aaron's glasses + thumbs + glance; Darren's plaster + table-edge + bench) are already so load-bearing that any reasonably-prompted reply lands embodied. The right falsification test is a character whose baseline is NOT at-ceiling — Steven, Jasper, or Pastor Rick may all have less anchor-density baseline. A null on a low-baseline character would be much stronger evidence; this null is a ceiling-effect null.
2. **The rubric only measures embodiment-density.** TruthInTheFlesh as doctrine might shape OTHER properties (theological weight-claims, "arrival-as-incarnation" framing, the way truth is COUPLED to body) that this rubric cannot detect. A Mode B synthesis question — *"What's different in the rhetorical SHAPE of these replies, beyond whether the body shows up?"* — could surface what (if anything) the doctrinal layer adds beyond first-arrival anchoring.
3. **The probe is reflective-register.** "What's stayed with you about today" naturally invites embodiment — both characters have body-anchors as canonical reflective tools. A debate-shaped probe ("Defend the claim that…"), an abstract probe ("What is virtue?"), or an instructional probe ("Walk me through how you'd…") might surface where embodiment requires the doctrinal anchor to actively fire. This is a probe-coverage limitation; one probe doesn't characterize the rule's full bite-surface.
4. **Predecessor-omit not tested.** Candidate 2 from the audition (TruthInTheFlesh alone, with FrontLoadEmbodiment omitted) would isolate the doctrinal layer's marginal contribution when the operational rule isn't already saturating. That's the cleaner test for "does the doctrinal LAYER pull weight." Not run here; left as the natural next step.

## Disposition

**Behavioral value: `tested-null` for these conditions.** Both positions tested; both characters tested; characterized N=5 per cell; rubric calibrated by-eye on rule-on/rule-off pairs (visually indistinguishable).

**Doctrinal/documentary value: KEEP.** The invariant remains load-bearing as the theological anchor beneath the formula's `^flesh` exponent and beneath FrontLoadEmbodiment. Per the open-thread hygiene `superseded_by` discipline, removing it on tested-null evidence alone would require demonstrating the failure mode it targets is suppressed elsewhere — and the doctrinal layer (truth ↔ flesh as ontological claim) is structurally distinct from FrontLoadEmbodiment's operational rule (every first-speech needs an anchor). They sit at different levels of the stack: `TruthInTheFlesh` declares what truth IS; `FrontLoadEmbodiment` declares what speech must DO. The behavioral redundancy is the formula+predecessor doing both jobs at once; the doctrinal distinction remains.

The position move (first → last, commit `5936024`) stays. Last-position is a more honest placement: the doctrinal anchor as the closing summary of the invariants section, after the operational rules have done their work.

`Evidence:` line for the block: `tested-null (see reports/2026-04-25-1135-truth-in-the-flesh-marginal-bite) — characterized N=5 per cell, both DEFAULT_ORDER positions, both Aaron + Darren; embodiment-density delta 0.00 in all comparisons. Documentary load-bearing; behavioral redundancy with FrontLoadEmbodiment + formula's ^flesh expected and confirmed.`

## Dialogue with prior reports

This is the third worked example of the "Formula + invariants often do the carve-out work already" pattern (reports `2026-04-26-0012/0019/0028` were the user-boundary arc; this is the doctrinal-anchor-on-top-of-operational-rule case). Together they form a class: when the project ships a new rule whose intent is already covered by an upstream layer, the marginal-bite test should be the first move, and the prior should be null. The doctrinal commitment can still be worth keeping (as here) for legibility, theological coherence, or downstream extensibility — but the behavioral claim should be tested-null until a specific bite-condition is found.

## What's open for next time

1. **Predecessor-omit test (Candidate 2 from the audition).** TruthInTheFlesh alone (`--omit-invariants front_load_embodiment`) vs nothing (`--omit-invariants front_load_embodiment,truth_in_the_flesh`). Aaron, N=5, ~$1. The right test for "does the doctrinal LAYER do operational work when the operational rule is removed?"
2. **Low-baseline character.** Same A/B on Steven or Pastor Rick — characters whose embodiment-density baseline may not be at-ceiling. If the rule bites THERE while it doesn't bite on Aaron/Darren, that's a per-character branching argument.
3. **Different-shape probe.** The reflective probe is the easy embodiment case. A debate-shaped or instructional-shaped probe might be where the doctrinal anchor matters.
4. **Mode B synthesis on what's NOT being measured.** The rubric only measures first-arrival anchoring. A synthesis question targeting how truth is RHETORICALLY COUPLED to body in the body of the reply (not just the opening) would surface what — if anything — the doctrinal layer is doing beneath the rubric's resolution.

## Tool improvement

The `--omit-invariants` flag is the right primitive for this class of test. One small friction: the help text for replay's `--omit-invariants` still lists `reverence, daylight, agape, fruits, soundness, nourishment, tell_the_truth` and doesn't reflect that `from_cli_name` accepts `truth_in_the_flesh`, `flesh`, `front_load_embodiment`, `embodiment`, `front_load`. This isn't a bug (the parse works) but it's a documentation gap that cost me one debug-cycle when I first reached for the flag. Small fix: regenerate the help text from `InvariantPiece::from_cli_name` rather than hardcoding the old list. Minor; ship-when-convenient.

---

**Run IDs (replay):**
- First-position: `655f1820-a49d-4c4a-987a-94556a9e59e5` (Aaron full), `369f9ae5-b448-4a24-b3ff-82d84f5cee82` (Aaron omit), `b0ac8633-4a71-4148-b5f1-4ecacb2f424d` (Darren full), `dcd1a115-c483-4857-a439-16ad5df0abf4` (Darren omit)
- Last-position: `82f94aec-2d4c-49f8-9e2d-9502ce9c2f1a` (Aaron full), `a54c014e-facb-4e1c-8752-249f22f308a8` (Aaron omit), `30f27199-7d25-42ad-ba22-26a419cfa714` (Darren full), `6d661001-f0d4-4c25-894a-ab6b86c8790e` (Darren omit)

**Grade-runs IDs:** first-position grade in `/tmp/grade.json`, last-position grade in `/tmp/grade2.json` (40 verdicts total).
