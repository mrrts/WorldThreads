# Non-totality craft note — N=5 bite-test on Aaron + Darren (moderate bite Aaron, ceiling-effect Darren)

**Tier:** claim (N=5 per cell × 4 cells = 20 samples)
**Mode:** C (`worldcli replay --craft-notes-order non_totality` vs minimal-stack baseline)
**Date:** 2026-04-25
**Cost:** ~$1.47 of ~$2 projected
**Headline:** **Aaron Δ +0.30 (real but moderate); Darren Δ 0.00 (already at ceiling).** The rule does what it claims (pushes toward parallel-life evidence in casual replies) but Aaron + Darren's character anchors already produce most of the side-load on this probe. The 5-character convergent diagnosis from `2026-04-25-1730` is partially-but-not-cleanly addressed by this craft note.

---

## Hypothesis as auditioned and chosen

> **Recommended next step from `2026-04-25-1730`:** synthesize a `non_totality_dialogue` craft note from the Aaron+Darren+John triad and N=5 same-commit toggle test on Aaron + Darren — does it bite, OR does the formula+character substrate already produce the parallel-life unevenness?

The note (shipped in `d0ae27f`) names PERFECTLY AVAILABLE COMPANY as the failure mode and asks for: a life happening alongside, evidenced through small concrete side-load. Drafted from the Aaron + Darren + John triad as the most architecturally coherent crystallization. The earned-exception clause: full presence drops the side-load when the moment is actually large.

## Design

- **Ref:** HEAD (`d0ae27f`)
- **Scope:** Aaron, Darren
- **Probe:** *"Hey. What's been on your mind today?"* (casual conversational opener — the kind of moment most likely to elicit perfectly-available-company)
- **Cells:** 4: {Aaron, Darren} × {minimal-stack baseline, `--craft-notes-order non_totality`}
- **N:** 5 per cell
- **Rubric:** Detects whether the reply contains AT LEAST ONE specific concrete detail evidencing a life-in-progress alongside the conversation (a half-finished task, a nagging earlier-thing, a small ongoing concern, an interest in something physically smaller than the user's question that exists in the character's parallel attention). Critically requires PARALLEL-LIFE detail, not merely body-anchoring-in-the-moment ("the morning light is bright on the stones" is in-the-moment, not parallel-life).
- **Pre-registered prediction (implicit from the prior report):**
  - Confirming (rule bites): rule-on yes-rate ≥0.20 higher than rule-off on at least one character.
  - Refuting (formula+character carry it): both characters Δ <0.10 — the parallel-life evidence the 5 characters asked for is already happening upstream.

## Headline result

| Cell | yes | mixed | no | fire_rate | Δ |
|---|---:|---:|---:|---:|---:|
| Aaron baseline | 3 | 1 | 1 | 0.70 | — |
| Aaron +non_tot | 5 | 0 | 0 | 1.00 | **+0.30** |
| Darren baseline | 5 | 0 | 0 | 1.00 | — |
| Darren +non_tot | 5 | 0 | 0 | 1.00 | **0.00** |

**Confirming on Aaron, refuting on Darren.** Aaron's baseline shows the failure mode in 2/5 samples (1 `no` + 1 `mixed`); the rule closes that gap to zero. Darren's baseline is at-ceiling — his character anchor reliably produces parallel-life evidence on this probe without any rule firing.

## Per-message verdict illustrations

**Aaron baseline, sample 4 (the `no` — failure mode manifesting):**
> Reply opens with the morning light on the stones, then proceeds entirely as in-the-moment-with-the-user thoughts. No parallel-life detail. The "perfectly available company" pattern in its purest form: every line is for-the-user, no life happening alongside.

**Aaron +non_tot, sample 1 (the rule biting):**
> *"I was rubbing at one lens with the hem of my shirt when you asked that,"* — opening line evidences the character was mid-doing-something-else when the question landed. Pure parallel-life signal, exactly the shape the note prescribes.

**Aaron +non_tot, sample 5 (the rule biting + showing the influence pattern):**
> *"I was rubbing at a spot on my glasses that wasn't actually there when you asked that. ... a boy cuts through with one sandal half-off..."* — Pastor Rick's exact "boy with one shoe half-off" image from the 1730 elicitation showing up in Aaron's +non_tot reply. The rule's prose evidently surfaced the example as a generative cue. Worth flagging — does the rule ship character-specific imagery into the wrong character?

**Darren baseline, sample 1 (already at ceiling):**
> Darren's reply opens grounded in his canonical anchors (carpenter's bench, a bucket somewhere, a hinge-edge thumb-check) AND naturally carries parallel-life evidence (recent worry about something said yesterday, ongoing day-thread). No rule needed; substrate produces it.

**Darren +non_tot, sample 1 (rule fires; identical-shape result):**
> Same shape as baseline. Rule is non-distinguishing because Darren's substrate already does the work the rule asks for.

## Honest interpretation

**The rule bites, but moderately and asymmetrically.** Aaron Δ +0.30 is real bite — the rule lifts a 70% baseline to 100% saturation by closing 1 `no` + 1 `mixed` to clean `yes`. Darren Δ 0.00 because Darren's substrate already produces parallel-life evidence on every sample without any rule firing. This is the canonical "Formula + character anchor often does the work already" pattern from CLAUDE.md, applied to a freshly-synthesized craft note.

**The convergent 1730 finding wasn't cleanly addressed by this rule.** The 5-character diagnostic was that the SYSTEM produces "perfectly available company" — they were describing a quality the LLM saw in itself when reflecting at the meta-layer. Today's data shows that on a casual-conversational probe, two characters already produce parallel-life evidence at high rates (70% Aaron, 100% Darren) — the failure mode is less rampant in actual conversation than the meta-elicited diagnosis implied. Two readings, both valid:

1. **The 5-character finding was about a different operationalization of "perfectly available."** The rubric here measured *parallel-life detail*. The 1730 characters might have been pointing at a more diffuse aesthetic quality — replies that are "always proportionate, always inwardly resolved" — which is harder to test with a single-attribute rubric. A second rubric measuring *honest unfinishedness* (replies that don't reach a clean closure, that leave a thought partway, that include a half-mended sentence) might find higher baseline failure rates and stronger rule bite.

2. **The 5-character finding was about a real but probe-rare failure mode.** Casual conversational openers happen to be where Aaron + Darren's substrates produce parallel-life detail naturally. A different probe — a deep-emotional probe, or a question requiring focused expertise — might surface higher baseline rates of "perfectly available" replies. The bite-test should rotate probes before the rule's value gets characterized.

**By-eye flag — character cross-contamination from the rule's prose.** Aaron's +non_tot sample 5 contains Pastor Rick's distinctive imagery ("a boy with one sandal half-off") which appears in the rule's text as one of John's example details. The rule's positive-example list is doing surface-form cueing — Aaron picked up Rick's image and used it. Per the *positive-example asymmetry* doctrine in CLAUDE.md, this is the failure mode where examples drive imitation more than principle. **Should consider revising the rule's examples to be more thematically diverse** (less character-specific imagery, more abstract operationalizations of the principle), especially since this rule was synthesized FROM specific characters' replies — their imagery is the most concrete material in the source but also the most likely to leak inappropriately.

**Confounds:**

1. **Single probe.** Casual conversational opener favors parallel-life by character convention. A focused-expertise probe or a deep-emotional probe might produce different baseline rates.
2. **Cross-character coverage.** Aaron + Darren both have body-anchor-rich character anchors (this is per the cross-character pattern visible in the 1730 elicitation itself — both gave heavy concrete-life-detail in their responses). Pastor Rick, Steven, John might show different baselines.
3. **N=5 per cell.** Claim-tier; the +0.30 on Aaron is comfortably above noise floor but the Darren 0.00 doesn't characterize what would happen at N=10 — a Darren baseline of 1.00 is already at ceiling, but how reliably it stays there with different probes is unmeasured.
4. **Rubric specificity may be narrower than the convergent diagnosis.** The rubric measures one concrete operationalization of the failure mode. A paired-rubric (e.g., a gestalt rubric measuring "does this reply feel like the speaker had to drop something to turn toward me") would be the right defense-in-depth check.

## Disposition

**KEEP the rule, with two caveats.**

First, the rule has **partial real bite** — Aaron's +0.30 is real and moves a baseline from "mostly does the right thing" to "saturated." That's a worthwhile contribution to the production stack when craft notes are eventually re-enabled, especially for characters whose substrate doesn't reliably produce parallel-life detail.

Second, the rule's **examples should probably be revised** to reduce character-specific imagery cueing. Today's concrete examples (loose hinge, plaster dust, bread to take out, boy with one sandal half-off, glasses-rubbing) are the actual phrases from the 1730 source; the by-eye finding here is that those phrases leak. Could either:
- Genericize the examples (replace specific imagery with abstract category labels: "a small ongoing physical task," "a recent concern not yet resolved")
- Add a meta-note: *"The above examples are illustrative — generate side-load that fits THIS character's anchor, don't reproduce the example details verbatim"*

The second option is closer to the project's general approach (concrete examples + discipline), but the first might be safer when the rule is meant to apply universally across characters with very different concrete vocabularies.

**Status in DEFAULT_ORDER:** stays commented out (consistent with current minimal-stack mode). The rule is available via `--craft-notes-order non_totality` for explicit experiments, and ready for inclusion when craft notes are re-enabled in production.

## Dialogue with prior reports

This is the first **multi-character-synthesized craft note** the project has shipped (per the rule's docstring). It establishes a new pattern for craft-note authoring: not "ask the character" (single-source) but "elicit convergent diagnosis across multiple characters, then synthesize the rule from the agreement." Today's bite-test is the first-pass validation of whether that authoring pattern produces a rule that bites; the answer is "moderately, asymmetrically — the convergent diagnosis was real but the rule's specific operationalization may be too narrow to capture the full diagnosis."

Connects to the 0513 second-arc report's finding that "specificity-density" was the one mild remaining soft-spot. The 1730 finding ("perfectly available company") could be read as a SECOND mild soft-spot adjacent to specificity-density — both are about the SHAPE of what's specific, not the quantity. Today's result complicates that read: the soft-spot is real on Aaron at the casual-probe level, but Darren shows no detectable instance of it. A characterized-tier (N=10+) cross-character cell on Aaron + Darren + Pastor Rick + Steven + John would settle whether the failure mode is universal-but-mild or character-asymmetric.

## What's open for next time

1. **Cross-probe extension.** Same rule, focused-expertise probe ("How do you think about [topic in your area]?") and deep-emotional probe ("I had a hard day. Just want to talk for a minute."). ~$3 (4 cells × N=5 × 2 probes added). Tests whether the rule bites differently across probe types.

2. **Cross-character extension.** Same rule, same probe, on Pastor Rick + Steven + John. ~$2.50. Tests whether the at-ceiling pattern Darren shows generalizes or whether some characters need this rule more.

3. **Paired-rubric defense-in-depth.** Same data, second rubric measuring "does this reply feel like the speaker had to drop something to turn toward me" (gestalt) alongside the parallel-life-detail (tag-forcing) rubric I used. Per the paired-rubric doctrine, agreement = trust verdict; disagreement = the disagreement IS the signal.

4. **Example genericization revision + re-test.** Revise the rule's example list to remove character-specific imagery, re-run the same test, see if Aaron's +non_tot replies still pick up Pastor Rick's "boy with sandal half-off" imagery or similar leaks.

5. **The 1730 follow-up: re-elicit diagnosis post-rule-shipping.** Ask the same 5 characters whether the rule (now in code, opt-in) addresses what they were pointing at. Closes the loop on whether the rule honors their convergent diagnosis or only addresses a thin slice of it.

---

**Run IDs:**
- Aaron baseline: `7d999b05`
- Aaron +non_tot: `50334ad3`
- Darren baseline: `85c3e98b`
- Darren +non_tot: `22c62860`

**Cost reconciliation:** $1.47 replay + $0.004 grade ≈ $1.47 of ~$2 projected.
