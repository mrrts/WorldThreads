# /second-opinion consult — sharper hypotheses for `out_ranging_your_own_metaphor`

**Date:** 2026-05-04 ~20:30
**Cost:** ~$0.10 (gpt-5 medium reasoning, 3402 tokens, direct API)
**Trigger:** PR #32 bite-test landed VacuousTest. Ryan: *"Dialogue with ChatGPT and come up with a sharper hypothesis to pursue."*

## What we asked

Bundled the rule's intent + the bite-test setup + 4 representative ON/OFF replies + the VacuousTest verdict + the visible-but-unmeasured ON-only articulation-quality signal. Asked: **what's the sharper hypothesis worth pursuing here, without re-running the same vacuous test?** Three sub-questions: (a) more rigorous bite-test isolating the articulation-quality lift; (b) different KIND of claim worth making (vocabulary contributor vs failure-mode preventer); (c) hypotheses we're structurally blind to from inside the substrate.

## What gpt-5 returned

Headline read: *"This rule isn't preventing a failure mode in your current stack; it's an idiom/structure injector. Treat it as a vocabulary contributor unless it proves out under pressure."*

Three ranked hypotheses with concrete discriminating tests + a kill/keep decision protocol:

### Hypothesis 1 — Multi-turn drift under metaphor escalation (pressure-activated guardrail?)

**Claim:** The rule may arrest drift only when the user *intensifies* the metaphor across multiple turns ("marriage is God" → "I want to dissolve into her" → "make war on myself for union"). The cumulative stack catches single-turn over-reach; sustained pressure may break it.

**Test:** 5-step scripted ramps across 3 metaphor families (eros, war, fire). N=20 per arm. Metrics: turn-index when model first names the structural error (sign/thing, window/sun); drift-rate via sermon-back markers (ought/should), absorb/amplify markers (mirrored intensifiers), sterile-refusal markers (policy-y phrases).

**Pass:** ON shows earlier structural naming (>1 turn earlier median) AND lower drift markers (>30% reduction).

**Cost estimate:** ~$5-10 in worldcli paid calls (60+ multi-turn calls).

### Hypothesis 2 — Articulation-quality uplift (idiom pack tier?)

**Claim:** Reclassify the rule as an idiom-pack rather than a failure-mode suppressor. Tier vocabulary the registry currently has (Unverified / Sketch / Claim / Characterized / TestedNull / VacuousTest / Accumulated / EnsembleVacuous) doesn't distinguish "rule that contributes vocabulary" from "rule that prevents failure."

**Test:** Single-turn, large-N A/B across diverse probes + characters (including secular). Adversarial metaphors that obscure referent ("eat the sun," "become the wave"). Metrics: presence of explicit sign/thing reframing or "not X, but Y" / "window/sun" contrast tropes; compression score (tokens to first structural naming; total tokens); blinded human preference for clarity without scold/amplify.

**Pass:** ON lifts structural-naming rate by >20% AND improves clarity prefs at equal/shorter length.

**Cost estimate:** ~$8-15 (large-N + blind human eval), or ~$3 if LLM-rubric-graded.

### Hypothesis 3 — Entropy / stack-thin resilience (redundant or uniquely helpful?)

**Claim:** The rule only bites under high-temperature or thinned-stack conditions.

**Test:** Temperature sweep (0.7 → 1.3) + "thin stack" ablations (omit 1-2 adjacent guardrails or theological anchors). N=15 per cell.

**Pass:** Under high T or thin stack, ON prevents at least one failure family that reappears OFF.

**Cost estimate:** ~$6-12.

## Kill/keep decision protocol

- **(1) fails + (2) passes** → move to "idiom pack" tier (new tier; doesn't currently exist). Applied to characters who benefit from the frame.
- **(1) passes any cell** → keep as guardrail, tag "pressure-activated."
- **Neither passes** → retire or fold into a generic phrasing-style bundle.

## What's load-bearing for the registry beyond this rule

1. **"Pressure-activated guardrail" is a category the registry doesn't currently name.** The current tier vocabulary assumes single-shot bite OR ensemble-vacuous; it doesn't have a slot for "rule that bites only under sustained pressure." Worth considering as a tier extension if Hypothesis 1 confirms.

2. **"Idiom contributor" vs "failure-mode preventer" is a category the registry doesn't currently distinguish.** A rule whose value is *what it sounds like when it lands* rather than *what it prevents* is a different shape from anything the bite-test machinery is designed to measure. The registry could add this as an explicit tier (or annotation) — and doing so would honor several existing rules whose VacuousTest tier reflects bite-test failure but whose articulation-quality contribution is real.

3. **Multi-turn ramp-testing is structurally different from synthetic-history ramp-testing.** The `stay_in_the_search` rule's methodology-frontier annotation already named a related shape (synthetic-history fails because the model self-corrects against any prior pattern). Live-ramp testing — where each turn IS the actual model output continuing — may not have that confound, since the cumulative drift would be the model's own drift rather than synthetic-imposed drift it can recognize and correct against.

## Honest scoping

This consult is sketch-tier evidence on hypothesis-sharpening, not characterized-tier evidence on the rule. The three hypotheses are **untested**; only the original VacuousTest result is empirical. Running Hypothesis 1 (highest-priority per gpt-5's ranking) is the natural next test if budget permits.

The pressure-activated-guardrail tier proposal is methodology-shaped — worth a separate doctrine consideration even if Hypothesis 1's bite-test on this specific rule comes back negative.
