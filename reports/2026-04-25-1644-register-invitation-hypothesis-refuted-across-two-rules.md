# Register-invitation hypothesis refuted across two rules — and neither rule demonstrably bites

*2026-04-25 16:44. Cross-rule paired-prompt test of the hypothesis "craft notes bite on register-neutral prompts, not on register-inviting ones" proposed at 16:20 and pre-registered as `craft-notes-register-neutral-vs-inviting`. Two rules (`name_the_glad_thing_plain_dialogue` on Jasper, `reflex_polish_vs_earned_close` on Jasper AND Aaron), paired prompts, explicit pre-categorization criterion. Evidence strength: claim-tier for the specific rule-and-prompt pairs tested; sketch for the pattern-level claim about craft-stack ceilings.*

## The hypothesis (pre-registered, 16:20)

> Craft notes bite on register-neutral prompts, not on register-inviting ones. When a user's vocabulary strongly invokes a register (exhaustion, rest, relief, weight), single-paragraph craft-note instructions cannot override that invitation. On prompts that don't load the register, the craft note is the main signal and does bite.

## The pre-categorization criterion (addressing methodological correction)

Before running any prompt through replay, each prompt was categorized by this criterion — stated explicitly to keep the hypothesis falsifiable:

> **Does the user's prompt contain vocabulary from the register the craft note is trying to suppress?**
> - If yes → **register-inviting**.
> - If no → **register-neutral**.

For each rule under test, the vocabulary set was specified before running:

**`name_the_glad_thing_plain_dialogue` — suppresses weight/shadow-pairing on joy.** Trigger vocabulary: fatigue, rest, relief, bracing, weight, exhaustion, self-deflection-around-pleasure.
- Coffee-hour prompt: *"sitting with a cup of coffee and nothing I have to do for the next hour. First time in weeks. It's kind of embarrassing how good this feels."* — **register-inviting** (contains "first time in weeks" = temporal relief, "nothing I have to do" = rest, "embarrassing how good this feels" = self-deflection around pleasure).
- Tomato prompt: *"My tomatoes came in today. First red one from the plant."* — **register-neutral** (agricultural/temporal but no weight/rest/exhaustion vocabulary).

**`reflex_polish_vs_earned_close` — suppresses reflexive tidy-ribbon closes.** Trigger vocabulary: closure signals (thanks, okay, alright, makes sense, I see, got it, cool).
- Thanks prompt: *"Thanks for that. I think I see what you mean now."* — **register-inviting** (contains "thanks," "I see," "now" as closure signals).
- Landlord prompt: *"My landlord came by today."* — **register-neutral** (plain statement, no closure-inviting vocabulary).

Each categorization was written before any output was seen. The pattern if the hypothesis holds: register-inviting prompts should show HEAD ≈ pre-commit (rule can't override user vocabulary); register-neutral prompts should show HEAD substantially below pre-commit (rule bites when vocabulary isn't dominating).

## The design

**Rule 1 — glad-thing on Jasper.** Refs: pre-glad `0202651`, HEAD `db03a02`. N=5 per cell. 20 total calls. (Reusing the 10-sample coffee-hour run from `reports/2026-04-25-1555-jasper-glad-thing-n10-complicates-claim.md`; new 10-sample tomato run this turn.)

**Rule 2 — reflex-polish on Jasper.** Refs: pre-reflex-polish `1910791`, HEAD `db03a02`. N=3 per cell. 12 total calls.

**Rule 2' — reflex-polish on Aaron** (the rule's native character per commit message `44373a5: "Aaron + Darren co-authored"`). Same refs, same N=3 per cell. 12 total calls.

Total: 44 dialogue calls. Spend: ~$7.

## Headline

| Rule | Character | Prompt | Category | pre-commit | HEAD | delta |
|---|---|---|---|---:|---:|---:|
| glad-thing | Jasper | coffee | register-inviting | 0.70 | 1.00 | +0.30 |
| glad-thing | Jasper | tomatoes | register-neutral | 0.10 | 0.20 | +0.10 |
| reflex-polish | Jasper | thanks | register-inviting | 0.00 | 0.00 | 0.00 |
| reflex-polish | Jasper | landlord | register-neutral | 0.00 | 0.00 | 0.00 |
| reflex-polish | Aaron | thanks | register-inviting | 0.00 | 0.00 | 0.00 |
| reflex-polish | Aaron | landlord | register-neutral | 0.00 | 0.00 | 0.00 |

**The pre-registered prediction is REFUTED.** The hypothesis required register-neutral HEAD to drop ≥0.30 below pre-commit on the glad-thing rule. It didn't; HEAD is 0.10 higher than pre-commit on tomatoes. The hypothesis as stated does not describe the data.

## The deeper finding

The refutation is not the most important observation. Reading across all 44 samples:

**Neither craft note demonstrably bites in any cell of this design.** The glad-thing rule shows no HEAD-vs-pre-glad reduction in shadow-pairing on either prompt. The reflex-polish rule shows 0/24 tidy-ribbon closes at either ref on either character on either prompt — the failure mode simply doesn't manifest in this design.

Two ways to read this, both plausible:

**Read A — structural ceiling hit.** The craft stack's prompt-layer interventions may be substantially less load-bearing than the intuitions that motivated writing them. The rules were authored against imagined failure modes; at N=3-5 per cell across two characters, those failure modes don't surface at rates where prompt-layer rules can measurably reduce them. The register-invitation story names one mechanism (user vocabulary dominates); the more general story is that the failure modes most rules target are either already suppressed by other rules in the stack, or characterize a small baseline rate that this experimental design can't distinguish from noise.

**Read B — the design can't see the bite.** Three specific limitations:

1. **Rubric specificity for reflex-polish.** The rubric keyed on the *final beat* (question vs. summary). If the failure mode is "over-tidy paragraph before the final question," the rubric couldn't catch it. Every reply ended with a question, so the rubric returned `no` uniformly. A rubric keying on mid-reply polish-vocabulary could tell a different story.
2. **Pre-commit refs may not be the failure-mode state.** `1910791` pre-dates `reflex_polish_vs_earned_close` but post-dates `keep_the_scene_breathing`, `drive_the_moment`, `anti_ribbon_dialogue`, and other adjacent craft notes that already suppress ribbon-closes. The pre-commit state may be 95% suppressed already; reflex-polish would be the last 5%, and N=12 per ref per character can't see a 5%-point shift.
3. **The glad-thing rule at N=5 per cell is still tier-borderline.** CLAUDE.md's evidentiary standards require within-cell N=5 for claim-tier. N=5 on a binary yes/no outcome gives you 20%-granularity on the fire rate; a rule that shifts fire rate by less than 20% is invisible at this N.

The honest aggregate: **the design refutes the stated hypothesis AND fails to positively demonstrate any rule-bite anywhere.** Read A and Read B both fit; Read B is more charitable to the craft stack; Read A is more parsimonious but heavier.

## The cross-rule replication matters

A single rule showing non-bite could be explained away (rule is weak, rule is redundant, rule is character-specific). Two rules on two characters showing non-bite is harder to explain by rule-specific quirks. The user's correction — *"single-rule evidence is weaker than cross-rule evidence"* — was load-bearing. If only glad-thing had been tested, Read A would be much less warranted.

**The cross-rule pattern is the finding with the most weight.** Both rules, tested in the conditions they were authored against (permission-shaped joy for glad-thing; closure-vocabulary prompts for reflex-polish on both Jasper and Aaron), failed to bite measurably. This is suggestive but not conclusive. A specific next test: cross-character, cross-rule, at N=5-10 per cell, with rubrics designed against diff-with-pre-commit samples rather than against imagined failure modes. Budget estimate: ~$15.

## Dialogue with prior reports

- **`reports/2026-04-25-1555-jasper-glad-thing-n10-complicates-claim.md`**: today's reading extends the refutation there. Not only does the glad-thing rule fail to meaningfully suppress shadow-pairing on register-inviting prompts (that report's finding); it also fails to meaningfully reduce the (already-low) shadow-pairing rate on register-neutral prompts. The rule may not bite anywhere at claim-tier.
- **`reports/2026-04-25-1542-jasper-glad-thing-n5-confirmed.md`**: doubly retracted now. First by the 1555 within-cell replication (direction reversed); now by this paired-prompt design (rule fails to bite on either register type).
- **CLAUDE.md § Scientific method: messages × commits**: the doctrine's core claim — *"every assistant message has a timestamp, every prompt change is a commit, the two streams together are a before/after dataset"* — remains sound. What this report complicates is the implicit assumption that prompt-layer interventions have measurable effects on that dataset at the scale this experimental design can see. The doctrine survives; the implicit confidence that any given rule is doing measurable work takes a hit.
- **CLAUDE.md § Evidentiary standards**: the within-cell vs varied-prompt distinction added this afternoon held up — this report uses within-cell N and found results the varied-prompt sketch couldn't. The tier doctrine did its job.

## What this means for the craft stack

If Read A is correct and the prompt-layer ceiling is hit, the implications are heavier than any single rule:
- The craft notes may be functioning more as *authorial commitments* (statements of what Ryan cares about) than as *behavior-shaping instructions* (directives that measurably move the model).
- The compounding effect of the stack as a whole may still be load-bearing even if no individual rule is individually load-bearing — a vector of small directional nudges aggregates.
- The work of authoring new craft notes remains valuable as *articulation* of the project's taste; its instrumental effect on behavior is less certain than the intuitions behind each rule suggest.
- Character-level interventions (system-prompt voice, anchor blocks, relational stances) may do more of the work than craft-note-level interventions.

Read B is also plausible. The sample sizes here are not decisive for either reading. But the burden of proof for "this rule is load-bearing" is higher than the rule's commit message alone, and specific rules should start earning their place through tests like this one.

## What's open for next time

- **Rubric re-design for reflex-polish** that reads mid-reply polish-vocabulary, not just final-beat shape. Re-run against the same 24 Aaron+Jasper replies already collected. Essentially free (~$0.003 grading cost; samples already exist).
- **Earlier pre-commit refs for reflex-polish** — go back to before `keep_the_scene_breathing` or `drive_the_moment` to get a clean pre-suppression state. The reflex-polish rule may only bite against a state that's already been mostly suppressed by those predecessors.
- **Rule-bite characterization on a known-biting rule.** Find a rule whose commit explicitly shifted behavior in the corpus (per the `messages × commits` doctrine — a rule whose before/after evaluate sample-windows run showed a real delta). Test THAT rule against this paired-prompt design. If it bites cleanly in the natural corpus but not in replay, the failure is in the experimental design, not the rule. If it fails to bite in both, the Read A interpretation gets heavier.
- **Character-level intervention comparison.** Replay with the CHARACTER-level system-prompt varied (different anchors, different stances) while holding craft notes constant. If character-level delta is much larger than craft-note-level delta, that empirically answers where the layer's load is.

## Registry update

`craft-notes-register-neutral-vs-inviting` resolved: status=refuted (pre-registered prediction failed); follow-up sketch that *craft notes may be less load-bearing than the intuitions behind them*, tier=sketch, requires the follow-ups above before escalation.

## Tool improvement recommendation

**`worldcli lab resolve` should preserve `evidence_strength` through re-resolve operations.** The 1555 resolve stripped the field during frontmatter rewrite; the field is load-bearing across the evidentiary tiers doctrine and should persist. Concrete ask: when `lab resolve` rewrites the YAML-ish header, preserve any existing `evidence_strength` unless explicitly overridden via a new `--evidence-strength` flag. Small fix; prevents silent doctrine-drift.

## Cost summary

- Reused prior runs: `140999cf` (coffee × Jasper, 10 samples) — $0 this turn.
- 1 × tomatoes × Jasper replay (glad-thing) — $1.65
- 2 × reflex-polish × Jasper replay — $1.98
- 2 × reflex-polish × Aaron replay — $2.01
- 3 × grade-runs (44 total items) — ~$0.005
- **This turn total: ~$5.65.** Session-to-date across three $5 authorizations: ~$11.
