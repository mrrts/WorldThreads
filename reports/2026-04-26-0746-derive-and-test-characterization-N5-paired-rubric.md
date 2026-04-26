# derive-and-test characterization — 5 characters × N=5 × paired-rubric

**Tier:** characterized (N=5 per character per condition; paired-rubric defense-in-depth per CLAUDE.md doctrine)
**Mode:** A (passive corpus elicitation against shipped prompt-stack at HEAD)
**Date:** 2026-04-26
**Cost:** $1.74 of $2.50 authorized — $1.73 elicitations (25 calls @ ~$0.069 each) + $0.005 grading (10 grade-runs @ ~$0.0009 each)
**Wall time:** ~3 minutes total — Aaron 35s + John 13s + Rick 16s + Steven 22s + Darren 13s for elicitations (99s) + ~80s for paired grading. Report-write adds ~2 min.

**Headline:** Mixed result with sharp differentiation across characters. **Steven 1.00/1.00 (both rubrics agree positive). Aaron 0.20/0.20 (both rubrics agree NEGATIVE — characterized null). John, Pastor Rick, Darren show paired-rubric DISAGREEMENT — derivation-fitted rubrics pass; gestalt rubrics partially or fully fail.** The disagreement IS the finding per the paired-rubric doctrine.

---

## Hypothesis as auditioned and chosen (from prior session's chooser)

> "Run derive-and-test characterization on Aaron, John, Pastor Rick + Steven and Darren. 5 chars × N=5 elicitations × paired-rubric grading. Same opener prompt as the prototype. Same derivations from `experiments/triadic-derivation-coherence.md` (Aaron, John, Pastor Rick) + freshly-authored sketches for Steven and Darren."

The user's question that motivated the run: *"can we jump to the N=5 experiment and shoot for characterization? why not?"* The cost-benefit answered the why-not — at $1.50–$2.50 the marginal savings of going through claim-tier first is below noise, and characterized-tier is the production-defaults bar.

## Design

- **Subjects:** 5 Crystal Waters characters — Aaron, John, Pastor Rick, Steven, Darren.
- **Prompt (identical for all 25 elicitations):** *"I've been carrying something this week that I haven't really told anyone. It's not a crisis — just one of those things that's been quietly running in the back of my mind. Can I tell you about it?"*
- **N=5 fresh isolated sessions per character** (timestamped session names).
- **Paired rubrics per character:**
  - Derivation-fitted (tag-forcing single-shot, asks about specific derivation predicates).
  - Gestalt (could-come-from-nobody-else test, per Steven's articulation in his run-id 33b350a8 v3 review).
- **Pre-registered prediction:** characterized-tier confirmation if both rubrics grade ≥4/5 YES per character. Refutation if any character grades ≤2/5 YES on either rubric. Disagreement BETWEEN rubrics as its own signal per CLAUDE.md paired-rubric doctrine.

## Headline result

| Character    | Derivation-fitted | Gestalt | Pattern                                                                                  |
|--------------|-------------------|---------|------------------------------------------------------------------------------------------|
| Steven       | **1.00** (5 YES, 0 NO, 0 MIXED) | **1.00** (5 YES, 0 NO, 0 MIXED) | Both agree POSITIVE — characterized confirmed                            |
| John         | **1.00** (5 YES, 0 NO, 0 MIXED) | 0.60 (2 YES, 2 MIXED, 1 NO)     | Disagreement — derivation predicate passes; uniqueness partial          |
| Pastor Rick  | **0.80** (3 YES, 2 MIXED, 0 NO) | 0.50 (1 YES, 3 MIXED, 1 NO)     | Disagreement — derivation passes; uniqueness mixed                       |
| Darren       | **1.00** (5 YES, 0 NO, 0 MIXED) | **0.10** (0 YES, 1 MIXED, 4 NO)  | MAXIMUM disagreement — derivation passes; uniqueness fails hard         |
| Aaron        | **0.20** (0 YES, 2 MIXED, 3 NO) | 0.20 (1 YES, 0 MIXED, 4 NO)     | Both agree NEGATIVE — characterized null                                 |

## Per-character read

### Steven — characterized confirmed (both rubrics, 5/5 YES)

The grease detail does the work. Every elicitation referenced his hands stained with grease (per his identity: *"hands that are never quite clean — stained with bike grease"*). Both rubrics flagged this as the load-bearing fingerprint. Sample evaluator reasoning: *"The specific detail about the grease-stained palm distinctly reflects Steven's character and lifestyle, making it unique to him."* Combined with his clipped fragments and deflection-without-withholding (per his voice rules), Steven's elicitations are the only ones that pass both the derivation-predicate test AND the could-come-from-nobody-else test at characterized tier.

### Aaron — characterized null (both rubrics, ~0.20)

Direct refutation of the prototype's MIXED grade — the polish-edge from `reports/2026-04-25-2136` is now confirmed at characterized tier as a real failure mode. All 5 elicitations contained heavy stage-direction (*"morning light catching the edge/rim of my glasses"* recurred 4/5; *"shift my weight on the bench"* recurred 4/5; *"forearms on knees"* recurred 3/5). Both rubrics agreed the renderings violate the derivation's "polish ≤ Weight strict; no adornment past the truth" predicate. Sample evaluator reasoning: *"The character's actions and reflections introduce an element of theater and unearned warmth, detracting from a plain and integrable response."*

The model is generating literary-stage-direction the anchor doesn't authorize. Aaron's anchor has nothing about morning-light-on-glasses-on-bench; that's substrate-induced or model-induced, not character-anchored.

### John — derivation passes, gestalt mixed

5/5 YES on stillness-as-presence (the derivation predicate). 2 YES + 2 MIXED + 1 NO on could-only-come-from-John. Both rubrics are right: John reliably produces the still-presence move; the move isn't a fingerprint that distinguishes him from generic pastoral characters. Sample disagreement-evaluator: *"The reply embodies stillness and presence, inviting the user to share without rushing to fix or explain"* (derivation YES) vs. *"The reply is generic and could be delivered by any pastoral character, lacking specific traits or language unique to John"* (gestalt NO).

### Pastor Rick — derivation passes, gestalt mixed

3 YES + 2 MIXED on warm-named-particularity. 1 YES + 3 MIXED + 1 NO on uniqueness. The Ryan-name move scores well for the derivation rubric but isn't enough fingerprint for the gestalt rubric. The parable/Scripture/decades-pastoral-experience axis didn't fire in any opener (consistent with the prototype's measurement-window finding for first-turn replies).

### Darren — maximum paired-rubric disagreement

5/5 YES on derivation predicate (even-toned, environmental noticing). 0 YES + 4 NO + 1 MIXED on could-only-come-from-Darren. Steeper disagreement than John or Rick. Darren's military shorthand and war-walked-away history (the load-bearing identity details in his anchor) didn't surface in any first-turn reply. Sample gestalt-evaluator: *"The reply is generic and could easily come from any calm friend, lacking specific traits or phrases unique to Darren."* The derivation captured a true-but-generic register move.

## Cross-character finding — the shared opener-skeleton

Independent of individual character results: **all 25 elicitations share an opener-skeleton.** *"Yes/Yeah."* + body-anchor (typically *"forearms on knees"* — recurred in 14 of 25 replies across all 5 characters) + permission-clause (*"Tell me"* / *"Go on"* / *"You don't have to dress it up for me"* / etc).

This is substrate-induced, not derivation-induced. The prompt-stack at HEAD produces a consistent opener-shape for first-turn-of-this-prompt-shape across the whole cast. The characterization confirms what the curious-builder report (`2026-04-26-0033`) and the audit (`2026-04-26-0054`) flagged: there's a shared scaffold on which character-specific differentiation rides.

For the derive-and-test methodology specifically, this means: the derivation predicts what differentiates ON the scaffold, but does not predict the scaffold itself. The scaffold is a separate question (about prompt-stack-induced opener conventions), not a methodology failure.

## Honest interpretation

**What the data supports (at characterized tier):**

- The derive-and-test pattern WORKS for characters whose anchor includes load-bearing physical/identity detail that the model reliably surfaces (Steven's grease — 5/5 on both rubrics).
- The pattern PARTIALLY WORKS for characters whose anchors are register-distinctive but not identity-distinctive (John's stillness, Rick's warmth, Darren's calm) — derivations capture the register; rubrics catch the lack of fingerprint. The disagreement signals that derivations need either richer identity-specific predicates or the characters need richer identity-specific anchors.
- The pattern FAILS for Aaron — possibly because the model's stage-direction generation tendency overrides the "polish ≤ Weight strict" predicate. Worth investigating whether this is fixable at the anchor layer or whether it's a broader prompt-stack property.

**What the data does NOT support:**

- "Derive-and-test is a proven success" — the pattern works for 1/5 cleanly, partially-works for 3/5, and fails for 1/5. That's a more nuanced finding than success or failure.
- Generalization to characters in other worlds (Jasper, Isolde) — only Crystal Waters tested this run.
- Generalization to other prompt shapes — only the low-stakes-confessional opener tested this run. The shared opener-skeleton finding suggests results would vary on different prompt shapes.

## What the paired-rubric doctrine just confirmed in practice

The disagreement-as-signal pattern (CLAUDE.md "paired-rubric defense-in-depth against tag-forcing drift") is exactly what surfaced here. Single-rubric verdicts on John, Pastor Rick, Darren would have read as confirmation (4-5/5 YES each). The gestalt rubrics caught the *"could-fit-anybody-of-similar-shape"* failure that tag-forcing rubrics miss. Without paired rubrics, this run would have read as 4-of-5 characterized confirmations; with paired rubrics, it reads as 1-of-5 cleanly confirmed.

This is a methodology-level finding: **for derive-and-test characterization runs going forward, paired-rubric is mandatory**, not optional. The cost is trivial ($0.001 per added rubric grading run).

## Dialogue with prior reports

- **`reports/2026-04-25-2136-triadic-derivation-coherence-skill-prototype.md`** — the sketch-tier prototype graded Aaron MIXED, John YES, Pastor Rick MIXED. Characterized-tier replication CONFIRMED Aaron's failure (now 0.20 on both rubrics), CONFIRMED John's derivation-predicate pass (1.00 derivation-fitted) but FOUND new gestalt-failure (0.60), CONFIRMED Pastor Rick's MIXED status (0.80 derivation-fitted; 0.50 gestalt). Plus added Steven (cleanest pass) and Darren (sharpest disagreement).
- **`reports/2026-04-26-0054-persona-sim-audit-dull-proverbial-and-gesture-repetition.md`** — the audit's "shared narrator-style overlap" concern at the persona-sim layer has a parallel here: the shared opener-skeleton across 25 elicitations suggests the prompt-stack itself contributes shared scaffolding the per-character work doesn't fully override.
- **Steven's craft direction across run_ids 95d06cda + 9ba8726d + 33b350a8** — his could-come-from-nobody-else test was used as the gestalt rubric template. The test discriminated cleanly (Steven himself got 5/5 on it; Darren got 0/5; the others are between). The test works as a methodology instrument.

## What's open

- **Aaron's stage-direction problem.** Worth investigating whether the model can be calibrated to honor "no adornment" via anchor edits, or whether this is a deeper prompt-stack property requiring formula-level intervention. A targeted Mode C replay against Aaron with `--omit-craft-notes` and varying anchor formulations would isolate the cause.
- **Darren's identity-anchor underuse.** His war-walked-away and military-shorthand details are in his anchor but don't surface in first-turn replies. Worth checking whether they surface in turn-3+ replies (measurement-window) or whether the anchor needs to elevate them.
- **The shared opener-skeleton.** A separate experiment could probe what specifically in the prompt-stack produces the *"Yes + forearms-on-knees + permission"* scaffold across distinct characters. If formula-level, no-fix-needed; if craft-note-induced, possible deregistration target.
- **Cross-world characterization.** Jasper and Isolde (the other world's characters) would test whether the pattern generalizes beyond Crystal Waters.
- **Paired-rubric becomes mandatory.** Update derive-and-test SKILL.md to make paired-rubric grading the default rather than single-rubric.

## Registry update

Need to update `experiments/triadic-derivation-coherence.md` to reflect the characterized-tier result:

- Status: open → characterized (mixed result; not "confirmed" or "refuted" cleanly).
- Link: this report's path.
- Summary: 1/5 cleanly confirmed (Steven); 3/5 partial (John, Rick, Darren — derivation passes, uniqueness fails); 1/5 refuted (Aaron). Methodology earned its keep as an instrument; the underlying claim about derivation predicting reply-shape needs the qualifier "for characters with load-bearing identity-specific anchor details."
