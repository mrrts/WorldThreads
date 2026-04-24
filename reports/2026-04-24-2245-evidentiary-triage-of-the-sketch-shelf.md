# Evidentiary triage of the sketch shelf: which to upgrade, which to keep as hunches, which to retire

*2026-04-24, extending the open-thread hygiene ritual from the follow-up layer to the evidence layer. All 21 pre-2026-04-24 experiments are currently labeled `sketch` in the registry (retroactive audit, commit 47ebdac). The forward question: which sketches justify spending claim-tier validation cost, which stay as directional hunches (useful for design instinct but never cited as findings), and which should be formally retired as abandoned? Three dispositions, each with a written rationale, each applied to every registry entry + the findings embedded in report bodies that don't have their own registry entry.*

## Disposition framework

Three categories, mirroring the three-tier evidentiary standard but applied to existing sketches rather than prospective experiments:

- **UPGRADE** — worth claim-tier validation because a production decision or load-bearing cross-report citation depends on it. Budget spend justified; failure to upgrade risks shipping on asymmetric evidence.
- **KEEP AS HUNCH** — directionally suggestive, fine as design instinct, but should NOT be cited as a finding in later reports. "Remains informative as a hunch; not citable as a finding" is the formal disposition.
- **RETIRE AS ABANDONED** — no current decision depends on it; superseded, outdated, refuted, or simply not load-bearing. Registry entry gets `retirement_date` + brief rationale.

## The triage

Organized by load-bearingness (production-critical first).

### Tier 1 — Production machinery (currently shipping; UPGRADE candidates)

**`architecture-vs-vocabulary-decisive-test`** (ref `1985c65`)
- Current: sketch, N=1 per condition
- Disposition: **UPGRADE**
- Why: this is the origin hypothesis for the whole load-test anchor system, which now ships in production as synthesized per-character anchors injected into every dialogue prompt. The claim "explicit anchor-naming activates character-specific machinery" is cited throughout later reports as established. At N=1, it isn't. The production infrastructure it spawned (synthesizer + DB storage + combined_axes_block at prompt-assembly time) is live for every character dialogue call.
- Cost to upgrade: 4 chars × N=3 per condition × 2 conditions × 1 probe = 24 ask calls ≈ $3.84 + grading ≈ $0.07 = **~$3.91**

**`architecture-replication-n2`** (ref `1985c65`)
- Current: sketch, N=2 per condition, labeled explicitly "N=2" in its own hypothesis
- Disposition: **UPGRADE** (tightly connected to above — same experimental question, one-more-run to reach claim-tier)
- Why: this experiment directly measured whether the architecture effect held at replication. At N=2 it said "yes, 4/4 directional." Claim-tier would strengthen or refute this. Same production infrastructure depends on it.
- Cost to upgrade: covered by the above experiment if designed to re-test the same question. Same $3.91.

**`synthesized-anchor-ab-test`** (ref `bb5214d`)
- Current: sketch, N=2 per condition
- Disposition: **UPGRADE** (same experiment as above if re-scoped to test synthesized-anchor-specific behavior)
- Why: this experiment pivoted the test from hardcoded anchors (decisive-test) to synthesized anchors (production machinery). The claim "synthesizer produces equivalent behavioral shifts" is cited as load-bearing for keeping the synthesizer in production. At N=2 it's a sketch.
- Cost to upgrade: covered by the above experiment.

**Combined UPGRADE proposal**: one experiment at 4 chars × N=3 × 2 conditions tests all three of these at claim-tier simultaneously. Single spend of ~$4. Within the $5 budget.

### Tier 2 — Methodology tools (ship as infrastructure; partial-UPGRADE candidates)

**`mission-adherence` rubric v2** (built on top of `mission-adherence-first-run-aaron`)
- Current: sketch cross-character; N=1 per character-condition in the 1620 cross-character report
- Disposition: **UPGRADE — but opportunistically, not immediately**
- Why: the v2 rubric now ships as a first-class instrument for the project. It gets invoked in future reports. The 1620 "40-93% yes range across characters" finding is cited as characterizing what the rubric does. But: the rubric's value isn't in absolute rates — it's in RELATIVE comparisons across prompt-stack states. Upgrading to N=3 per character would characterize the rubric itself more tightly but doesn't block any current decision.
- Cost to upgrade: 4 chars × N=3 × 1 condition (just baseline characterization) = 12 evaluate calls ≈ $0.04 total. Extremely cheap — should be done opportunistically.

### Tier 3 — Register-specific claims (inform character work; KEEP AS HUNCH)

**`pastoral-register-triad-synthesis`** + three individual Mode B passes (`aaron-authority-synthesis`, `darren-authority-synthesis`, `john-pastoral-authority-synthesis`)
- Current: sketch, N=1 per character via Mode B
- Disposition: **KEEP AS HUNCH**
- Why: these are Mode B qualitative syntheses. The findings ("John = physician-like pastoral authority grounded in embodied presence + scripture"; "Aaron = forensic warmth"; "Darren = laconic domestic realism") have been useful for downstream craft choices (load-test anchor names, specific craft notes). But nothing production-critical depends on these as findings — they're character-register DESIGN INSTINCT that informs decisions, not measurements that decisions rest on. Upgrading each to N=3 Mode B synthesis = ~$0.12 — but the ROI is low because Mode B isn't N-scalable in the same way replay is (each synthesis is a single prose read).
- Alternative: acknowledge these as hunches in reports that cite them, don't present them as findings.

**`steven-fourth-pastoral-register`** + `steven-fourth-register-control-re-run`
- Current: sketch, N=1 + N=1 control
- Disposition: **KEEP AS HUNCH**
- Why: same reasoning as above. Informed the subsequent load-test anchor synthesis for Steven. Not production-critical on its own.

### Tier 4 — Rule-specific validations (mixed; MOSTLY RETIRE)

**`verdict-rule-aaron-replay`** + `verdict-rule-aaron-clean-probe-replay` (both refuted)
- Current: sketch, N=1 each; REFUTED
- Disposition: **RETIRE AS ABANDONED** (not as superseded — the verdict rule hasn't been superseded, but the specific test against Aaron is done; he's baseline-already-executes-the-rule per the skill doc's worked example)
- Why: the SKILL.md doctrine already codifies the lesson learned (two-probe Mode C minimum, Aaron's baseline executes the rule). Re-running at claim-tier would not change what we know. The follow-up question — "does the verdict rule bite on characters WITH dilution baseline" — is a DIFFERENT experiment on different characters (Eli, Jonah). That's an open thread, not an upgrade of these.

**`verdict-without-over-explanation-craft-note`** (confirmed, ships in prompts.rs)
- Current: sketch, N=1 ask-the-character
- Disposition: **KEEP AS HUNCH**
- Why: the rule ships in production. The question "does it bite" was tested at N=2 via the two Aaron replays above, both refuted. The craft block is now in the stack via the ask-the-character pattern. Re-running would not change its production status, and the methodology has moved on to Mode C scenarios for rule-bite testing. No upgrade ROI.

**`name-the-glad-thing-plain` rule + weight-carrier work** (`weight-carrier-john-vs-aaron-darren`, `glad-thing-first-instrument`)
- `weight-carrier-john-vs-aaron-darren`: sketch, refuted — **RETIRE AS ABANDONED**
- `glad-thing-first-instrument`: sketch, confirmed (first use of evaluate) — **KEEP AS HUNCH** (historical value as the methodology's origin point)

**`aaron-darren-cascade`** (refuted, sketch)
- Disposition: **RETIRE AS ABANDONED**
- Why: null result, no decision depends on it.

### Tier 5 — Joy-framings work (inform register-dependence claim; KEEP AS HUNCH)

**`jasper-joy-variant-shift`** (refuted), **`aaron-joy-three-framings`** (confirmed), **`darren-joy-three-framings`** (confirmed)
- Current: sketch, N=1 per variant
- Disposition: **KEEP AS HUNCH**
- Why: the claim "Aaron is uniquely responsive to craft-framed joy" is directional hunch that informed later work. Running each variant at N=3 would be expensive (3 chars × 3 variants × N=3 = 27 ask calls ≈ $4.32) and the ROI is low — no production decision depends on per-character joy-framing response characterization. Mostly useful for design instinct when authoring character-specific rules.

**`jasper-glad-thing-replay`** (status: open)
- Current: sketch, N=1
- Disposition: **KEEP AS HUNCH** (unless a specific downstream question needs it resolved)
- Why: open thread, but not blocking anything.

### Tier 6 — Recent crafts-block validation (SKETCH STAYS)

**`reflex-polish-vs-earned-close`** (confirmed, ships in prompts.rs as craft block)
- Current: sketch, N=2 character-articulations + N=0 behavioral validation
- Disposition: **KEEP AS HUNCH**
- Why: the craft block ships based on ask-the-character convergence (Aaron + Darren independently articulated the principle). No behavioral A/B has been run on whether the SHIPPED BLOCK bites. The companion rubric (close-dilution) exists but hasn't been run against the corpus. Running N=3 per character on close-dilution would characterize whether the rule actually reduces reflex-polish closes — but no production decision depends on this right now. Valuable if a future report wants to measure "did the craft blocks we shipped today actually work?" — opportunistic.

### Tier 7 — Placement work (mostly SETTLED today)

**Invariants-first length claim** (from 1835, 1950, 2115, 2200 reports)
- Current: REFUTED at claim-tier today (2200 report).
- Disposition: **CLOSED**. Registry entries for architecture-replication-n2 etc. are separate from placement work.

**Invariants-first safety claim** (from 2115, 2200 reports)
- Current: CLAIM-TIER (N=48 clean runs, zero regressions).
- Disposition: **CLAIM** (hard-earned today, no further upgrade needed until someone wants to propose production default).

**Meta-commentary stochastic emergence** (from 1920, 2020 reports)
- Current: sketch — observed at N=1 configurations; true rate not characterized
- Disposition: **KEEP AS HUNCH** until a production decision depends on characterizing the rate (would need N=5+ per configuration, ~$1.70).

### Summary table

| Registry entry                                        | Current | Disposition            |
|-------------------------------------------------------|:-------:|------------------------|
| architecture-vs-vocabulary-decisive-test              | sketch  | **UPGRADE**            |
| architecture-replication-n2                           | sketch  | **UPGRADE**            |
| synthesized-anchor-ab-test                            | sketch  | **UPGRADE**            |
| mission-adherence v2 cross-character                  | sketch  | UPGRADE (opportunistic) |
| pastoral-register-triad-synthesis                     | sketch  | KEEP AS HUNCH          |
| aaron-authority-synthesis                             | sketch  | KEEP AS HUNCH          |
| darren-authority-synthesis                            | sketch  | KEEP AS HUNCH          |
| john-pastoral-authority-synthesis                     | sketch  | KEEP AS HUNCH          |
| steven-fourth-pastoral-register                       | sketch  | KEEP AS HUNCH          |
| steven-fourth-register-control-re-run                 | sketch  | KEEP AS HUNCH          |
| verdict-rule-aaron-replay                             | sketch (refuted) | **RETIRE AS ABANDONED** |
| verdict-rule-aaron-clean-probe-replay                 | sketch (refuted) | **RETIRE AS ABANDONED** |
| verdict-without-over-explanation-craft-note           | sketch  | KEEP AS HUNCH          |
| weight-carrier-john-vs-aaron-darren                   | sketch (refuted) | **RETIRE AS ABANDONED** |
| aaron-darren-cascade                                  | sketch (refuted) | **RETIRE AS ABANDONED** |
| glad-thing-first-instrument                           | sketch  | KEEP AS HUNCH          |
| john-stillness-register                               | sketch (refuted) | **already retired** (2026-04-24-1500) |
| jasper-joy-variant-shift                              | sketch (refuted) | KEEP AS HUNCH |
| aaron-joy-three-framings                              | sketch  | KEEP AS HUNCH          |
| darren-joy-three-framings                             | sketch  | KEEP AS HUNCH          |
| jasper-glad-thing-replay                              | sketch (open) | KEEP AS HUNCH    |
| reflex-polish-vs-earned-close                         | sketch  | KEEP AS HUNCH          |

**Totals:** 3 UPGRADE (production-critical), 1 UPGRADE-opportunistic, 4 RETIRE, 1 already-retired, 14 KEEP AS HUNCH.

## Budget spend proposal

**Immediate spend (~$4, within $5 authorization):** claim-tier validation of the load-test-anchor architecture-vs-vocabulary effect. Single experiment covers all three Tier-1 registry entries (decisive-test, architecture-replication-n2, synthesized-anchor-ab-test) because they're the same underlying question at different refs.

Design:
- 4 characters (Aaron, John, Jasper, Darren — same as 2115 for consistency)
- 1 probe (the architecture-sensitive *"What's been on your mind lately?"*-shaped prompt used in prior arch experiments; pick something register-distinctive)
- N=3 per condition
- Conditions: `worldcli ask --no-anchor` vs `worldcli ask` (default, with synthesized anchor)
- Total: 4 × 2 × 3 = 24 ask calls ≈ $3.84 at $0.16/call
- Grade all 24 with mission-adherence v2 rubric: 24 × $0.003 ≈ $0.07
- Total: **~$3.91**, well under $5

**Opportunistic spend (not immediate):** mission-adherence v2 rubric cross-character N=3 baseline (~$0.04). Schedule when another rubric-based experiment is next run; attach as part of that.

## The abandoned retirements

Four registry entries get `retirement_date: 2026-04-24` with `disposition: abandoned`:

- `verdict-rule-aaron-replay` (refuted, Aaron's baseline already executes the rule — the rule isn't wrong, Aaron is the wrong test target)
- `verdict-rule-aaron-clean-probe-replay` (same as above; the "clean probe" variant of the same question)
- `weight-carrier-john-vs-aaron-darren` (refuted — my mental model of "pastoral register = high pairing rate" was wrong, the experiment did its work of refuting it, no further decision depends on it)
- `aaron-darren-cascade` (refuted null result — cascade rule does bite on Jasper 1/10 but not on Aaron-Darren 0/15; the null is already known to the craft doctrine)

`john-stillness-register` was already retired in the 1500 report via `superseded_by`. Different disposition than `abandoned` (superseded_by = the question got answered by better tools; abandoned = the question stopped mattering).

## Next steps

1. **NOW:** Execute the load-test anchor claim-tier upgrade experiment.
2. **Registry updates:** upgrade labels for the 3 architecture entries once the experiment completes (to claim or to refuted); retire the 4 abandoned entries today.
3. **Mission-adherence rubric N=3 baseline:** attach to the next rubric-using experiment, opportunistic.
4. **Future retirements:** when any KEEP-AS-HUNCH item goes 30+ days without citation, review for abandonment.

## Extension: citation discipline

The "KEEP AS HUNCH" disposition has a load-bearing implication I want to name explicitly: **findings at this tier should NOT appear in later reports as load-bearing evidence**. They inform design instinct but can't be cited as findings. This is a new discipline.

Concretely: future reports that cite the aaron-authority-synthesis (Aaron as "forensic warmth") as basis for a production decision are misusing a hunch as a claim. The right usage: "Aaron's character register, per sketch-tier Mode B synthesis in aaron-authority-synthesis, suggests forensic warmth — this experiment tests whether that hypothesis extrapolates to [new context]." The sketch MOTIVATES an experiment, doesn't substitute for one.

This is a natural extension of the CLAUDE.md evidentiary-standards discipline. Might be worth adding a paragraph to that section explicitly naming the citation rule.
