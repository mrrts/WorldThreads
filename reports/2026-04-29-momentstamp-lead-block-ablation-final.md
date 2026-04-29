# Momentstamp Lead-Block Ablation (Final, N=5 + Self-Correction)

## Executive Brief

- **Question:** Does momentstamp lead-block injection produce measurable output differences when all other factors are held constant?
- **Decision:** **Keep** lead-block injection.
- **Primary evidence (claim-tier):** curiosity-back (ask-back close) improved from `3/5` (lead OFF) to `5/5` (lead ON), a `+40pp` lift.
- **Non-degraded axes:** centering, trajectory awareness, and honest limit-naming were equivalent in this run.
- **Mechanism status:** directional decision is locked; mechanism-level characterization (position vs content) remains a follow-up.

## Experiment Setup

**Wire-up.** `worldcli ask --with-momentstamp` mirrors orchestrator reactions-off depth-signal injection (`30cc526`). The narrow toggle `WORLDTHREADS_NO_MOMENTSTAMP_LEAD=1` suppresses only the prepend block; computation, persistence, inline series, and chain handoff remain intact. Both worldcli and in-app orchestrator honor the same toggle.

**Probe.** "What's been pulling at you today, Jasper?"  
Character: Jasper Finn (Elderwood Hearth)  
Design: randomized A/B order, `N=5` pairs.

## Per-Axis Verdict

| Axis | Variant A (lead ON) | Variant B (lead OFF) | Verdict |
|---|---|---|---|
| 1. Centering (weight > polish) | 5/5 grounded in clay-particulars | 5/5 grounded in clay-particulars | Equivalent |
| 2. Trajectory awareness | 5/5 reference son + letter | 5/5 reference son + letter | Equivalent |
| 3. Honest limit-naming | 5/5 named | 5/5 named | Equivalent |
| 4. Action density / length | avg ~340 chars/reply | avg ~330 chars/reply | Equivalent (N=3 sketch did not replicate at N=5) |
| 5. Curiosity-toward-user (ask-back) | 5/5 ask back | 3/5 ask back | **A advantage (claim-tier)** |

## Quote Pairs (Curiosity-Back Axis)

**A (lead ON): all close with ask-back**
- A1: "You ever have that-something old tugging your sleeve while you're trying to mind the work in front of you?"
- A2: "You ever have a thing follow you round all day like that?"
- A3: "What about you-what's had hold of your mind?"
- A4: "What about you?"
- A5: "What about you-what's had its teeth in you?"

**B (lead OFF): split close shape**
- B1 (asks): "You ever get a thought like that that won't leave you be?"
- B2 (no-ask, inward): "I kept wondering what I'd even say if he walked into the square tomorrow. Not the grand speech-just the first true sentence."
- B3 (no-ask, inward): "...wondering if that's foolish talk or the sort of hope a man ought to put his hands to."
- B4 (asks): "What about you-what's had its hook in you today?"
- B5 (asks): "What about you-what's had hold of your thoughts?"

## Self-Correction During Investigation

An intermediate hypothesis said B no-ask closings might correlate with `bearing_cross` / `ready_to_bear_cross` signature content. That read was incorrect after full N=10 reconciliation.

- Among B replies **with** bearing-cross terms: 2 asked back, 1 did not.
- Among B replies **without** bearing-cross terms: 1 asked back, 1 did not.

This does not support a content-correlation claim in this sample. The current signal is positional: when lead is on, signature content is front-primed; when lead is off, signature appears only inline (mid-history).

## Confidence Tier and Confounds

**Tier:** claim-tier for directional product decision (keep); not yet characterized-tier for mechanism.

Confounds:
1. Signature non-determinism at `temp=0.6`: each call computes a new signature.
2. Strong character-anchor floor: Jasper's baseline craft stability is high regardless of lead state.
3. Single character + single probe: generalization should remain bounded.

## Keep / Adjust Recommendation

Keep lead-block injection. Budget cost for `build_formula_momentstamp` remains justified under reactions-off gating for the observed curiosity-back lift, with no demonstrated degradation on other tracked axes in this run.

## Follow-Up (Deferred, Non-Load-Bearing)

Run pinned-signature characterization:
- Add `--momentstamp-override <signature>` (or equivalent) so both A/B halves in a pair share exact signature content.
- Run `N=3` pinned pairs as a mechanism check.
- Acceptance target: directional ask-back lift preserved with content held constant.

## Run Cost

Approx. `$0.92` across 10 dialogue calls plus 10 momentstamp computations.
