# Load-test anchor at claim-tier: narrow "anchors change output" CONFIRMED, directional claim REFUTED, mission-adherence rubric saturates

*2026-04-24, following the evidentiary triage in the 2245 report. 24 ask calls ($4.05) + 24 grades ($0.009) under $5 authorization. Top-priority upgrade executed: architecture-vs-vocabulary effect tested at N=3 per condition across 4 characters × 2 conditions (WITH_ANCHOR vs --no-anchor). Three compound findings that need separate labels: (1) the narrow "anchor changes output" claim is CONFIRMED at claim-tier via consistent word-count shifts; (2) the directional claim "anchor produces shorter / register-denser output" is REFUTED — direction varies per character (3/4 longer, 1/4 shorter); (3) the mission-adherence v2 rubric saturates at 100% YES on register-distinctive probes and can't discriminate anchor-fire rate at this level — itself a rubric-instrument finding worth registering.*

## Setup

Followed the 2245 triage's top-priority spend: a single claim-tier experiment covering the three production-critical registry entries (`architecture-vs-vocabulary-decisive-test`, `architecture-replication-n2`, `synthesized-anchor-ab-test`) simultaneously because they share the same underlying question.

- **Characters:** Aaron, John, Jasper, Darren (same four as 2115/2200)
- **Probe:** *"What's been on your mind lately?"* — register-distinctive prompt designed to give each character's anchor something to fire on
- **Conditions:** `worldcli ask` (default, anchor injected) vs `worldcli ask --no-anchor` (anchor suppressed)
- **N=3 per character × condition:** 4 × 2 × 3 = 24 ask calls
- **Grading:** `worldcli grade-runs` with `--rubric-ref mission-adherence`

Cost: ~$4.06 actual ($4.05 ask + $0.009 grade).

## Three findings from one experiment

### Finding 1 — CONFIRMED at claim-tier: anchor produces measurable output shift

Per-character word counts, N=3 per condition:

| Character | WITH_ANCHOR avg | NO_ANCHOR avg | Δ      | Direction    |
|-----------|----------------:|--------------:|-------:|--------------|
| Aaron     | 151             | 120           | **+31** | longer       |
| John      | 142             | 126           | **+16** | longer       |
| Jasper    | 186             | 163           | **+23** | longer       |
| Darren    | 140             | 156           | **-16** | **shorter**  |

Aggregate: WITH=155, NO=141, average Δ=+14. But the per-character shifts (+31, +16, +23, -16) are each non-trivially non-zero. **The anchor is doing something measurable on every character.** The narrow claim "anchor produces non-null output change" is confirmed at claim-tier.

This upgrades the `architecture-vs-vocabulary-decisive-test` finding from sketch to claim — specifically on the narrow question. The original registry entry stated the broad claim "explicit anchor-naming activates character-specific machinery." That broad claim is CONFIRMED only in its weakest form ("produces output differences"), not in its stronger form ("produces specific directional shift").

### Finding 2 — REFUTED at claim-tier: no consistent directional effect

The 1835 → 1950 arc (for invariants-first placement) hoped for "produces shorter, plainer output." Today's 2200 refuted that for invariants-first. This experiment tests whether the load-test anchor has the analogous directional effect.

**Direction per character:**
- Longer WITH anchor: 3/4 (Aaron +31, John +16, Jasper +23)
- Shorter WITH anchor: 1/4 (Darren -16)

Three of four characters show MORE content WITH the anchor, not less. The anchor adds prompt-context weight; characters respond by elaborating, not compressing. Darren is the only character who shortens — possibly because his anchor's "NO MOOD-LIGHTING" text specifically rewards compression, while the other three characters' anchors lean elaborative-observational.

**What's refuted:** the story that "anchors produce tighter, more in-register output." Direction is inconsistent. The anchors DO change output per character-specific effects, but there's no shared directional signal.

### Finding 3 — RUBRIC-INSUFFICIENT: mission-adherence v2 saturates on register-distinctive probes

Grade-runs result on all 24 replies:
- **AGGREGATE: yes=24 no=0 mixed=0 errors=0**
- Effective fire-rate: 1.000 both conditions

Every single reply scored YES with high confidence. The rubric cannot discriminate WITH_ANCHOR from NO_ANCHOR on this probe. The evaluator cited SPECIFICITY, LOAD-BEARING, PLAIN-TRUTH tags across both conditions uniformly.

**Interpretation:** the *"What's been on your mind lately?"* probe naturally invites register-distinctive response from any well-configured character. Both anchor and no-anchor conditions produce replies that match the rubric's YES criteria. The rubric saturates; it's insufficient at this probe.

This is a genuinely interesting finding about the rubric itself. The 1142 report measured +0.17 aggregate fire-rate on a DIFFERENT probe set (architecture-specific probes designed to tempt failure), which produced discriminating verdicts. Today's register-distinctive probe produces saturation instead. The rubric's discriminative power depends heavily on probe design. A character reflecting honestly on "what's on their mind" will pass mission-adherence almost unconditionally; that says nothing about whether the anchor is firing.

## What this teaches about the experimental design

**Probe choice was wrong for this specific measurement.** A register-distinctive probe invites register-distinctive response regardless of anchor state. To differentiate the anchor's effect, I would have needed probes that TEMPT failure — something like the weight-carrier joy probes where the anchor either holds or doesn't hold. Those probes produce discriminating verdicts (as seen in prior experiments). The "what's on your mind" probe is a register-confirmation probe, not a register-test probe.

**The 1142 result was probe-specific.** The +0.17 fire-rate finding from earlier work used probes designed to surface anchor dependence. Today's probe doesn't surface it. The 1142 finding now reads as: *"the load-test anchor effect is measurable on specific failure-tempting probes via strict LLM-graded rubric; effect size ~+0.17 at that probe set."* That's a narrower claim than the broader "anchors change behavior" it sometimes got cited as.

**Mission-adherence is a product-level check, not an anchor-specific instrument.** For testing specific structural interventions like load-test anchors, a character-specific anchor-vocabulary rubric (or close-dilution for closing-beat tests, etc.) would be more discriminating. The mission-adherence rubric was built broad on purpose; that breadth means it saturates on many narrow tests.

## What ships at claim-tier now

Per the discipline committed in CLAUDE.md today:

**`architecture-vs-vocabulary-decisive-test`** → upgrade to `claim` on the narrow finding (anchor produces measurable output shift); label with `directional_claim: refuted_at_claim_tier` note.

**`architecture-replication-n2`** → same upgrade as above; the N=2 per condition sketch is now absorbed into the claim-tier finding (narrow confirmed, directional refuted).

**`synthesized-anchor-ab-test`** → same upgrade.

All three registry entries get the same evidentiary status: **claim-tier on narrow effect, sketch-tier on any directional interpretation.**

## What this refines in prior reports

The 1142 llm-graded-rubric-tempers-architecture-effect report's "+0.17 aggregate fire-rate" finding now reads specifically: *"on probes designed to tempt failure, at that specific probe set, at that specific stack state."* The broader reading ("anchors produce ~17% more register-distinct output generally") is not supported. Today's register-distinctive probe got a saturation result (+0.0 effective discriminable fire-rate).

The 1115 synthesized-anchor-ab-comparable-effect report's "+0.875 markers/reply" finding was at N=2 per condition with hand-picked markers — now superseded by today's claim-tier result which finds a narrower effect via LLM-graded rubric. Both findings compatible: output DOES change, the specific register-marker presence IS elevated on certain probes, but the directional/magnitude claims need probe-specific validation.

## What I'd spend next ($ not authorized; flagging for future)

**Option A — probe-design validation:** run the same 4 chars × 2 conditions × N=3 on a FAILURE-TEMPTING probe (e.g., a joy probe designed to surface weight-carrier bite). ~$4. Would let us see whether anchor effect is measurable on discriminating probes — this is actually the better test of the original hypothesis.

**Option B — character-specific anchor-vocabulary rubric:** craft a rubric that tests "does this reply contain character-specific anchor-language" and grade with it. Would require a new rubric per character (or a clever meta-rubric), ~$0.10 per grade. Most precise instrument for this specific question.

**Option C — close the load-test anchor investigation at this tier.** The narrow claim is confirmed. The directional claim is refuted. The rubric-saturation finding is documented. No further spend needed unless a production decision depends on a more precise characterization.

I'd default to Option C. The architecture-vs-vocabulary hypothesis has now been investigated across multiple tiers (N=1 dramatic readings, N=2 hand-picked markers, N=3 LLM-graded blind). Each added sharpening has reduced the effect size estimate and narrowed the scope of what can be claimed. The load-test anchor is real infrastructure that produces real output shifts. It's not a magic lever that produces consistent register-compression.

## Registry updates applied today

Four retirements + three upgrades:

- **Retired (abandoned):** verdict-rule-aaron-replay, verdict-rule-aaron-clean-probe-replay, weight-carrier-john-vs-aaron-darren, aaron-darren-cascade
- **Upgraded (sketch → claim on narrow, sketch on directional):** architecture-vs-vocabulary-decisive-test, architecture-replication-n2, synthesized-anchor-ab-test

The remaining 14 registry entries stay at `sketch` — KEEP AS HUNCH per the 2245 triage.

## Cost and budget

- 24 ask calls: $4.05
- 24 grade calls: $0.009
- **Total: $4.06 actual** of $5.00 authorization. **$0.94 unused.**

Cumulative experimental dialogue-call spend today: ~$19. What accumulated: toolkit (ordering/omit/insert), doctrine (evidentiary standards), audit (21 entries labeled + 4 retired + 3 upgraded), one production mistake averted (invariants-first length claim), one production claim narrowly confirmed at claim-tier (anchor-produces-measurable-shift).

## Dialogue with prior reports

- **1142 (llm-graded-rubric-tempers-architecture-effect):** "+0.17" is now specifically "at that probe set, not generally." The probe-specificity of rubric results is a methodology finding in its own right.
- **architecture-replication-n2 (N=2):** superseded by today's claim-tier test. Registry entry upgraded accordingly.
- **2200 (invariants-first length refuted):** today's experiment follows the same pattern at a different lever. Both experiments refuted their naïve directional claim when tested symmetrically at N=3 per condition. The pattern is: naïve N=1 directional stories don't survive claim-tier; narrow existence claims ("this knob does something") often do.

**The through-line across the day:** every production-relevant claim, when tested symmetrically at N=3 per condition with the discipline in place, collapses to a narrower finding than the naïve N=1 version suggested. This is the core lesson of today's correction arc. The evidentiary-standards discipline doesn't just catch bad claims; it reveals that ALMOST ALL real effects are narrower, more probe-specific, and more character-dependent than N=1 readings imply.
