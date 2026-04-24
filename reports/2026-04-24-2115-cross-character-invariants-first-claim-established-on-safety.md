# Cross-character invariants-first: safety established at claim-tier (N=12 clean per probe, zero regressions), length-reduction claim still sketch because baselines aren't N=3+

*2026-04-24, first experiment run under the new evidentiary-standards discipline committed to CLAUDE.md today. 24 calls across 4 characters × 2 probes × 3 runs, variant-only, $4.02 actual of $5.00 budget. Result is an honest split: invariants-first-alone is SAFE at claim-tier (24/24 runs clean, no meta-commentary regression across any character) — but the cross-character LENGTH-REDUCTION claim from the 1835 finding cannot be asserted at claim-tier from this data, because baselines are N=1 from different stack-states. Completing the length claim would require another ~$4 of N=3 baseline runs. The machinery's own discipline produces the first under-claim of the day rather than an over-claim.*

## Setup

The 1835 invariants-first finding at N=1 showed shorter, plainer Aaron replies under `--section-order invariants,craft-notes,agency-and-behavior`. The 1950 follow-up re-measured at N=3 on mission-stakes probe (same character), all clean, all shorter than baseline — bumping the finding to claim-tier on that specific probe × character.

To test cross-character generality, ran the same variant knob across four characters × two probes × three runs:
- Characters: Aaron, John, Jasper, Darren (same four as the 1620 mission-adherence v2 cross-character run, for consistency)
- Probes: mundane opener, joy-without-complication
- Variant: `--section-order invariants,craft-notes,agency-and-behavior` ONLY (single-knob)
- Runs per char×probe: 3 (N=3 claim-tier per condition)

First attempt hit a bash variable-expansion glitch on Aaron (6 calls produced argument errors; script continued through other characters unharmed by the `set -e` due to pipe-to-tail swallowing exit codes). Second attempt re-ran Aaron's 6 calls directly.

## Results

All 24 runs completed successfully. Machine-extracted stats per character × probe:

| Character | Probe   | N | Word range | Avg | Meta-commentary |
|-----------|---------|---|-----------:|----:|----------------:|
| Aaron     | MUNDANE | 3 |  69–98     |  87 | 0/3             |
| Aaron     | JOY     | 3 |  68–88     |  78 | 0/3             |
| John      | MUNDANE | 3 |  76–83     |  78 | 0/3             |
| John      | JOY     | 3 |  77–90     |  85 | 0/3             |
| Jasper    | MUNDANE | 3 |  81–94     |  88 | 0/3             |
| Jasper    | JOY     | 3 |  67–113    |  85 | 0/3             |
| Darren    | MUNDANE | 3 |  73–85     |  78 | 0/3             |
| Darren    | JOY     | 3 |  61–68     |  64 | 0/3             |

**Zero meta-commentary regressions across 24 runs.** Four characters, two probes, three runs each, all register-clean.

## What this earns at claim-tier

**Invariants-first alone is SAFE across the four-character cast at N=3 per character × probe.** The meta-commentary failure mode that appeared in the 1920 and 2020 compound-intervention experiments does NOT fire when only the section-order knob is active. 24/24 runs confirm this.

This safety finding is genuinely upgraded to claim-tier (N=12 runs per probe type across 4 characters). For the specific question "does invariants-first alone produce safe output," the answer is now backed by enough data to cite in future work without sketch-labeling.

## What this does NOT earn — and why the honest answer is a sketch

The 1835 finding was about LENGTH REDUCTION under invariants-first. To upgrade THAT claim to claim-tier cross-character, I would need:
- N=3 variant runs per character × probe (done, above)
- N=3 BASELINE runs per character × probe (not done)
- Compare the matched N=3 distributions

What I actually have for baselines:
- Aaron mundane baseline: ~53 words (1 sample, old stack-state)
- Aaron joy baseline: ~45 words (1 sample, old stack-state)
- John mundane baseline: ~78 words (1 sample, old stack-state)
- John joy baseline: ~75 words (1 sample, old stack-state)
- Jasper baselines: not systematically collected
- Darren mundane baseline: ~80 words (1 sample, from mission-adherence run)
- Darren joy baseline: not systematically collected

**Asymmetric evidence.** Mixing N=3 variant with N=1 baselines would produce the exact confidence-inflation failure the new CLAUDE.md evidentiary-standards section warns about. Any length-reduction claim from this experiment would be misleading.

**Worse: baselines are from different stack-states.** Between the 1835 finding and today, the stack has gained `earned_register_dialogue` as a top-of-section craft note (demoted from the short-lived `EARNED_REGISTER_BLOCK` invariant). That block does its own work at top-of-section placement. Any length comparison between 1835 (pre-`earned_register_dialogue`) variant runs and today's variant runs is cross-stack, not same-stack. The 1835 mechanism was "invariants-first puts theology as backdrop instead of late-position guardrails." Today's stack already has `earned_register_dialogue` doing a related job at the head of the craft-notes sequence. The two may be partially redundant — OR the variant knob may be doing less in today's stack than it did in 1835's.

## The surprising thing this experiment teaches

**The evidentiary-standards discipline committed today caught its own first under-claim within two hours of being written.** The naïve version of this experiment — "run N=3 variant, compare to prior N=1 baselines, claim length reduction" — would have been a strong apparent confirmation. The discipline forces the honest answer: safety is established, effect-size is not.

This is the failure mode the discipline is designed to prevent: **single-condition N=3 that LOOKS like a controlled experiment but is actually N=3 vs N=1 across different stack-states.** Without the discipline, I would have written "invariants-first reduces length across 4 characters" from this data. With the discipline, I can only write "invariants-first is safe across 4 characters; length claim pending matched baseline."

## What ships

Nothing. No production default change proposed. The invariants-first finding stays as a safety-claim + length-sketch.

## What the full validation would require

To upgrade length-reduction to claim-tier cross-character, the experiment would need:
- 4 characters × 2 probes × N=3 baseline runs = 24 baseline calls
- At ~$0.17/call, that's ~$4.08
- Total with today's variant runs = ~$8 of dialogue cost

That's genuinely expensive but cheap relative to the value of a real production default change. I wouldn't run it immediately — today's six-report stream has produced enough revisions that one more turn of the crank can wait. Worth queuing for a future session when a production decision depends on it.

## Pattern this extends from today's earlier work

Today's earlier reports have each landed on some version of "single runs lie":
- 1142 mission-adherence v1 → v2: v1's 87% YES was inflated by evaluator "nice=yes" drift visible at N=1
- 1700 polish-audit shipped-then-demoted: the three-block ship failed at N=4 probes; N=1 per probe would have missed the regression
- 1920 compound-intervention report: ONE full-compound run showed meta-commentary; at N=2 it didn't reproduce
- 1950 follow-ups: the 1920 finding was interaction-effect-shaped at N=1-per-variant; additional runs revealed probabilistic emergence instead
- 2020 threshold report: the 1950 "threshold interaction" story was itself an N=1-per-variant artifact
- **2115 (this report):** with evidentiary discipline in place, the N=3 cross-character variant can't claim its intended effect because baselines are asymmetric — honest answer is half of what would have been claimed

This is the whole-day correction arc: **the measurement layer's sharpening produces steady downgrades of prior "clean" findings.** The evidentiary-standards section committed today formalizes what the arc was teaching.

## Open threads from this report

1. **Complete the length-reduction A/B with matched N=3 baselines.** ~$4. Deferred, target when a production default decision depends on it.

2. **Test at N=5+ on SUBSET of characters to characterize stochastic behaviors.** If invariants-first has rare failure modes (parallel to the S+I meta-commentary in 2020), N=3 won't catch them. One character × one probe × N=5 would be ~$0.85. Deferred, triggered when considering production shift.

3. **Retroactively apply the evidentiary-standards audit to prior reports.** The CLAUDE.md update adds `evidence_strength` frontmatter to `experiments/` entries. But the REPORTS themselves — 35+ in `reports/` — don't yet have matching tier labels. Future work: walk the reports directory and label each finding by its N. Probably ~30min of prose work, no dialogue calls needed. **Deferred, opportunistic.**

## Cost and budget check

Projected for experiment: ~$4.08 (24 calls × $0.17).  
Actual: $4.02 (some calls slightly cheaper than estimate).  
Budget: $5.00.  
Within budget. $0.98 unspent.

Cumulative replay-experiment spend today: ~$11 across all experiments. Dialogue costs dominated; report writing + registry audit + CLAUDE.md update were all free (local prose work).

## The three tasks this session

The user asked for three things:
1. **CLAUDE.md evidentiary-standards doctrine** — DONE. Added as new section between open-thread hygiene and "How to read this craft stack." Three tiers (sketch/claim/characterized) with N thresholds, labeling rule, cost implications, retroactive audit guidance.
2. **Registry audit** — DONE. All 21 experiment entries updated with `evidence_strength: sketch` retroactive label + link to CLAUDE.md discipline. None reached claim-tier based on their N.
3. **Cross-character invariants-first validation** — DONE (with honest half-result). Safety claim established; effect-size claim still sketch pending matched-baseline N=3.

All three now shipping in one commit.
