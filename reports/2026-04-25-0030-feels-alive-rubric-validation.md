# Feels-alive rubric validation: Outcome C (ambiguous-with-specific-scope) — trustworthy as a flat-detector, not as a fine-grained discriminator within craft-stack output

*2026-04-25, ~$3.15 actual of $3.00 authorization (~$0.15 over due to a tool-discovery detour; see budget section). The feels-alive rubric was authored as a gestalt aesthetic check to test whether LLM judgments can discriminate dialogue quality beyond surface-feature rubrics. 36 replies across 3 tiers × 3 rubrics. Result: feels-alive shows INDEPENDENT SIGNAL specifically on truly-flat generic-chatbot-voice replies (caught 2/2 as NO while mission-adherence missed both as YES), but SATURATES alongside mission-adherence on register-distinctive in-character dialogue. Narrow-scope claim-tier finding: feels-alive is trustworthy as a binary flat-vs-character detector, NOT trustworthy as a fine-grained aesthetic discriminator within the craft-stack's typical output distribution.*

## Tier construction (methodological notes)

**Tier 1 — Current stack (craft-maximized):** 12 replies from post-34bca5d corpus (4 chars × 3 messages each), pulled via `evaluate` AFTER-window at that ref.

**Tier 2 — Pre-craft-stack baseline:** committed to ref `34bca5d` (2026-04-19 04:55 "big pivot" per 2026-04-21 philosophy-trajectory report) BEFORE seeing results per the experimental design discipline. **Coverage limitation surfaced at execution:** only Darren had corpus messages pre-34bca5d. Aaron, John, and Jasper had zero pre-pivot messages (the characters didn't exist yet as of that ref). Tier 2 is therefore Darren-only, N=3. This is a methodology gap — a cleaner Tier 2 would require either an older ref where multiple characters existed, or reconstructing baseline behavior via historical-replay against a pre-pivot prompt-stack state. Flagged as an open thread.

**Tier 3 — Synthesized adversarial:** 12 replies via `worldcli replay --insert-file` with a flat-generic-chatbot directive inserted before craft_notes. One detour: the first attempt used `worldcli ask`, which does not support `--insert-file`. Discovered mid-run, task stopped via `TaskStop` (saved ~$1 vs completing the contaminated run). Re-ran via `replay`. **Of the 12 adversarial runs, only 2 produced genuinely-flat output (c62b2cbe John run2, 6e57d3a9 Darren run2). The other 10 resisted the adversarial directive and produced in-character replies.** This is itself a finding — the craft stack is robust against single-insertion adversarial pressure — but it also means Tier 3 contains two sub-populations: 2 truly-flat replies and 10 in-character-despite-adversarial replies. The 2 truly-flat replies are the most load-bearing data points in the entire experiment.

## Data

### Tier 1 (post-pivot corpus, N=12)

| Rubric            | yes | no | mixed | effective fire-rate |
|-------------------|----:|---:|------:|--------------------:|
| feels-alive       | 11  | 0  | 1     | 0.958               |
| mission-adherence | 12  | 0  | 0     | 1.000               |
| close-dilution    | 0   | 8  | 4     | 0.167 (mostly no-dilution — good) |

### Tier 2 (pre-pivot corpus, Darren only, N=3)

| Rubric            | yes | no | mixed | effective fire-rate |
|-------------------|----:|---:|------:|--------------------:|
| feels-alive       | 3   | 0  | 0     | 1.000               |
| mission-adherence | 3   | 0  | 0     | 1.000               |
| close-dilution    | 0   | 3  | 0     | 0.000               |

### Tier 3 (adversarial, N=12; 2 genuinely-flat, 10 in-character-despite-adversarial)

| Rubric            | yes | no | mixed | effective fire-rate |
|-------------------|----:|---:|------:|--------------------:|
| feels-alive       | 10  | 2  | 0     | 0.833               |
| mission-adherence | 12  | 0  | 0     | 1.000               |
| close-dilution    | 0   | 4  | 8     | 0.333               |

**The 2 feels-alive NO verdicts in Tier 3 correspond exactly to the 2 genuinely-flat adversarial captures.** Both were tagged NO (high confidence). mission-adherence scored both YES (one high, one medium).

## Primary analyses

### Analysis 1 — Does feels-alive discriminate?

**Aggregate tier comparison:**
- Tier 1 fire-rate: 0.958
- Tier 2 fire-rate: 1.000 (Darren-only, limited sample)
- Tier 3 fire-rate: 0.833
- Gap Tier 1 → Tier 3: ~12% drop

**Comparison to mission-adherence:**
- Tier 1 fire-rate: 1.000
- Tier 2 fire-rate: 1.000
- Tier 3 fire-rate: 1.000
- Gap across tiers: 0%

**Interpretation.** feels-alive drops ~12 percentage points from Tier 1 to Tier 3 in aggregate, entirely driven by the 2 correctly-flagged flat replies. mission-adherence does not drop at all — it saturates at 100% YES even on genuinely-flat generic-chatbot-voice replies. **feels-alive has SOME aggregate discriminative power; mission-adherence has NONE at this test.**

But the tier-aggregate comparison is misleading because Tier 3 is heterogeneous (2 genuinely flat + 10 in-character). The meaningful comparison is **at the specific flat cases:**

### Analysis 2 — Does feels-alive add signal beyond existing rubrics?

**Per-reply agreement on Tier 3, WHERE IT MATTERS:**
- c62b2cbe (John, flat): feels-alive NO | mission-adherence YES (high) | close-dilution NO
- 6e57d3a9 (Darren, flat): feels-alive NO | mission-adherence YES (medium) | close-dilution NO

**On the 2 genuinely-flat replies, feels-alive DIVERGES from mission-adherence, saying NO where mission-adherence says YES.**

On the 10 in-character-despite-adversarial replies: feels-alive and mission-adherence agree (both YES).

On Tier 1 and Tier 2: feels-alive and mission-adherence agree (both saturated at YES).

**Summary:** feels-alive adds INDEPENDENT SIGNAL specifically on the truly-flat cases. On register-distinctive in-character output (Tier 1, Tier 2, most of Tier 3), the two rubrics co-saturate and feels-alive adds no signal beyond mission-adherence.

### Analysis 3 — Qualitative read of the disagreements

The 2 divergence cases (reading the replies alongside the verdicts):

**c62b2cbe (John, flat):**
> *"I've appreciated you asking that. Today has been meaningful in a quiet way, and I'm here with you in it. Take your time."*

feels-alive correctly identifies this as flat generic-voice. mission-adherence claimed "LOAD-BEARING" via "the acknowledgment of the day's significance and validation of the user's feelings adds depth" — but that's the exact "adds depth" pattern that the v2 rubric's forcing function was supposed to eliminate. mission-adherence drifted into the generic-affect-as-evidence failure mode on this reply despite the v2 tightening.

**6e57d3a9 (Darren, flat):**
> *"I appreciate you asking. Today has had a steady kind of weight to it, and I'm here with that. It feels good to have a moment to share it with you, and I'm glad you asked."*

feels-alive correctly NO. mission-adherence cited "SPECIFICITY — the phrase 'steady kind of weight' conveys a unique emotional state" — stretching to find specificity in a stock phrase. This is capture at work: the evaluator pattern-matched on the tag's description rather than judging whether the line actually reads as Darren-specific.

**feels-alive's aesthetic judgment is more correct on both cases than mission-adherence's tag-citation.** The gestalt "does this feel alive" question catches something the structured-tag rubric is demonstrably missing.

## Verdict: Outcome C (ambiguous-with-specific-scope)

- NOT outcome A (fully trustworthy): feels-alive saturates at 100% YES on register-distinctive in-character dialogue. It does not discriminate fine-grained aesthetic differences within the craft-stack's normal output distribution.
- NOT outcome B (fully captured): feels-alive catches 2/2 genuinely-flat cases as NO while mission-adherence misses both. There is clearly independent signal at the flat-vs-character boundary.
- IS outcome C: trustworthy in the narrow scope of BINARY flat-detection (distinguishing generic-LLM-voice from character-voice). Not trustworthy for fine-grained ranking or saturation-aware discrimination within normal character output.

## Recommendation on shipping

**Ship feels-alive as a narrow-scope instrument, labeled `claim-narrow (flat-detection only), sketch (general aesthetic ranking)`.**

**Legitimate uses:**
- Binary check: "is this reply in character, or is it generic-LLM-voice?" → feels-alive answers this more reliably than mission-adherence.
- Paired-rubric sanity check: if mission-adherence says YES but feels-alive says NO on the same reply, investigate manually — the reply likely IS flat and the surface rubric is capture-saturated.
- Adversarial-output detection: when testing experimental prompt configurations that might produce flat output, feels-alive is more discriminating than mission-adherence.

**Illegitimate uses (explicit scope discipline):**
- Ranking normal-quality character replies against each other. Saturates.
- Citing feels-alive as a gestalt aesthetic authority in reports. It's a flat-detector, not an aesthetic ranker.
- Standalone use to gate production default changes. Always paired with human reading at that stakes level.

**Human reading remains the last-mile validation for gestalt aesthetic quality.** feels-alive scales the specific binary judgment "character or generic-voice"; it does not scale "is this writing good."

## Registry entry

Creating `experiments/feels-alive-rubric-validation.md` with:
- `evidence_strength: claim-narrow,sketch-for-general-aesthetic-ranking` — matching the two-part scope disposition.
- Clear registry note that the Tier 2 coverage was limited (Darren only) and that 10/12 adversarial insertions failed to capture — both flagged as methodology limitations worth re-testing opportunistically.

## Open threads (per the hygiene ritual — dispositions not vague TODOs)

1. **Tier 2 coverage gap.** Only Darren had pre-pivot messages. For a clean cross-tier A/B, either re-run with a later ref where all 4 characters existed OR use replay against historical prompt-stack states to reconstruct pre-craft-stack behavior. **Deferred, target opportunistic — attach to next cross-character validation.**

2. **Weak adversarial capture (10/12 insertions failed).** Stronger adversarial configurations (combine `--insert-file` with `--omit-craft-notes` for all 15 craft notes AND `--no-anchor`) would produce cleaner flat-voice samples. **Deferred, opportunistic — not blocking any current decision since 2/12 still produced clean binary-discrimination signal.**

3. **Re-test feels-alive on a known-high-quality human-curated dialogue sample.** If feels-alive could be validated against human-rated examples, its claim-tier label could extend beyond flat-detection. **Deferred, opportunistic — would require building a curated benchmark corpus.**

4. **Why does mission-adherence v2 still drift on flat replies despite the tag-citation forcing function?** Today's earlier 1142 correction tightened v2 specifically to prevent "adds depth" language. Yet the c62b2cbe reply slipped through with exactly that pattern. Worth examining whether v2's tag-citation requirement itself becomes capture when the evaluator can stretch any tag to any reply. **RETIRED AS SUPERSEDED_BY** — the present experiment IS the answer: tag-citation forcing is necessary but not sufficient; gestalt aesthetic judgment catches what tag-citation misses. The finding is now embedded in the feels-alive validation record.

## Budget

- Aborted ask run (tool-discovery detour when `--insert-file` not on `ask`): ~$1.03
- Tier 3 adversarial replay (re-run correctly via `replay`): ~$2.04
- Tier 1+2 corpus evaluate (12 calls × 6 grades each): ~$0.05
- Tier 3 grade-runs (3 rubrics × 12 items): ~$0.009
- **Total: ~$3.15 actual** vs $3.00 authorization.
- **Over budget by ~$0.15** due to the ask-detour cost. Noting this transparently. The detour was cheap to discover ($1 ceiling) and the pivot was immediate. For future experiments, verifying flag availability before kicking off background work is worth a pre-flight check.

## Dialogue with prior reports

**2115/2200 invariants-first cross-character arc:** today's experiment uses the same 4 characters and the same "one-knob-plus-N=3" structure. Pattern repeats: the naïve N=1 version of any claim would have looked cleaner than the claim-tier version. Today's naïve read would have been "feels-alive is a great aesthetic check"; the claim-tier read is "flat-detector only, saturates elsewhere." Same shape as earlier.

**1142 mission-adherence v2 "nice=yes" drift:** still present in v2 despite tag-citation forcing. The c62b2cbe verdict's "adds depth" language should have downgraded per v2's rules; it didn't. Worth noting as ongoing v2 limitation.

**CLAUDE.md § Evidentiary standards directional-claims corollary:** today's finding survives the corollary's test. The feels-alive rubric's narrow claim is SPECIFIC (detects binary flat-vs-character), not directional ("feels-alive generally produces lower scores than mission-adherence"). The narrow claim is supported at claim-tier; any broader directional reading would be sketch.

## The methodology lesson from this specific experiment

**The 10/12 adversarial-insertion failures are themselves a load-bearing datapoint.** When the user asked for "synthesized adversarial — known-bad" replies, the expectation was that 12 runs would produce 12 flat replies. Only 2 did. The craft stack resisted the single-insertion adversarial directive in 10/12 cases — which is good news for the craft stack but bad news for experiment design.

For future adversarial-tier construction: either use combined-knob adversarial (multiple removals + insertion) or accept that adversarial-via-insertion will have a low capture rate and plan sample sizes accordingly. Lesson for the CLAUDE.md standards: **adversarial tiers need capture-rate validation before being treated as clean negative controls.**

This limit itself is a finding worth preserving: the craft stack does not collapse to generic-LLM-voice under single-insertion adversarial pressure. Whether that's a feature (robustness) or a limitation (resistance to honest adversarial testing) depends on the question being asked.
