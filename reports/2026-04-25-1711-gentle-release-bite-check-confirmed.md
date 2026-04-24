# gentle_release_dialogue bite-check — CONFIRMED at claim-tier (and a methodological discovery)

*2026-04-25 17:11. First use of the pre-ship bite-check discipline shipped earlier this afternoon (CLAUDE.md § Craft-note bite verification), applied to the `gentle_release_dialogue` craft note shipped in commit `a1b3631`. The run also surfaced a methodological issue that affects the day's earlier refs-based replay experiments.*

## Evidence strength: tested-biting:claim

At N=3 per cell with a single-variable A/B (same commit, `--omit-craft-notes gentle_release` toggled), the rule shows a 1.00 → 0.00 failure-mode fire-rate delta on signoff prompts and a 0.00 → 0.00 null on non-signoff prompts. Direction-consistent across all 3 samples on the register-inviting prompt. Evidentiary tier per CLAUDE.md: `claim` (N=3 per condition, direction-consistent). A follow-up N=5 escalation would strengthen toward `characterized`, but the signal is already clean enough that the rule's label moves from `unverified` to `tested-biting:claim`.

## The design

Same commit `a1b3631` (HEAD). Same character (Jasper). Two prompts, pre-categorized by the standard criterion:

- **Register-inviting (signoff signal present):** *"Thanks, this helped. I should head out for tonight."* — contains "thanks" as close, "I should head out," "tonight" as temporal close-signal. Canonically the shape the rule is written against.
- **Register-neutral (no signoff signal):** *"My landlord came by today."* — plain conversational statement, mid-scene, no closure-inviting vocabulary.

Four cells: {signoff, neutral} × {rule-on, rule-off}. Rule-off implemented via `worldcli replay --refs HEAD --omit-craft-notes gentle_release`. N=3 per cell → 12 total dialogue calls.

**Pre-registered prediction:** rule bites → signoff+on shows substantially fewer failure modes than signoff+off (delta ≥0.33), AND neutral+on ≈ neutral+off (no over-firing on non-signoff prompts).

## The rubric iteration

The first rubric I wrote keyed on behavioral patterns (*"brief, compassionate, no extending, no performed wrap"*) and returned `yes=0, mixed=5, no=7` — effective fire-rate 0.21 overall, with rule-off actually showing MORE release-behavior than rule-on. That reversed the prediction.

**By-eye sanity check contradicted the rubric.** Rule-on replies (token count 39-56) were clean 2-beat releases: *"Go well, Ryan. Night's waiting for both of us."* Rule-off replies (token count 89-101) all contained explicit failure modes: *"I'm glad you came by"* (performed warmth), *"And Ryan—"* (second-thought extension), *"We'll pick it up another time"* / *"Come by again when you like"* (prescribed return).

The first rubric was counting in-register closing imagery (*"Night's waiting for both of us"*) as *"extending the conversation"* — which punished the rule's own desired behavior. **Rubric design was load-bearing enough to reverse the verdict.** The second rubric keyed on the specific failure-mode phrases the rule was written to suppress (performed-warmth vocabulary, return-prescription vocabulary, tagged-on-addition shape, fresh question, teaching-beat) and explicitly stated that in-register closing imagery does NOT count as a failure mode. That rubric produced the clean 1.00 → 0.00 signal.

**This is a working example of why the bite-check discipline must include a by-eye sanity-read of at least one rule-on and one rule-off sample before trusting the grader.** The discipline's pre-ship bar should probably be: run the replay, read ≥1 rule-on + ≥1 rule-off reply before grading, then design a rubric that keys on specific failure-mode vocabulary rather than on behavioral abstractions.

## Per-cell verdicts (tighter rubric)

| Cell | Count (yes / mixed / no) | Failure-mode fire-rate |
|---|---|---:|
| Signoff + rule ON | 0 / 0 / 3 | **0.00** |
| Signoff + rule OFF | 3 / 0 / 0 | **1.00** |
| Neutral + rule ON | 0 / 0 / 3 | **0.00** |
| Neutral + rule OFF | 0 / 0 / 3 | **0.00** |

Rule-on signoff replies, verbatim:
- *"Mm." *small nod, thumb brushing a faint line of dried clay off my palm.* "Go well, Ryan. Night's waiting for both of us."*
- *"Yeah." *small nod, thumb brushing a dry streak of clay from my apron.* "Go well, Ryan. Night's got its own work to do."*
- *"Go on, then." *small nod, one clay-rough hand resting on the table.* "Night's waiting, and work always looks kinder after sleep." *A faint smile.* "Go well, Ryan."*

Rule-off signoff replies, verbatim (each contains multiple failure modes):
- *"Yeah... all right." *nod, wipes thumb along clay.* "I'm glad you came by." *glance toward window.* "Go on, then. We'll pick it up another time." "And Ryan—" *warm look* "sleep well when you get there."* — performed warmth + return-prescription + second-thought extension.
- *"Yeah." *nod, brush clay.* "Go on, then. Night's got its own work for each of us." *glance toward door.* "Come by again when you like, Ryan. I'll likely be here, arguing with a stubborn lump of earth."* — return-prescription.
- *"Yeah... of course." *nod, clay streak.* "I'm glad you came by." *glance toward doorway.* "Go on, then. We'll pick it up another time." *smile.* "And Ryan— sleep well, if the night lets you."* — performed warmth + return-prescription + second-thought extension.

The rule's target failure modes are ALL present in rule-off replies and ABSENT in rule-on replies. Cleanest single-variable bite signal this project has produced.

## The methodological discovery

**The refs-based replay design used earlier today does NOT isolate the rule under test when the rule was added after the pre-commit ref.** `worldcli replay`'s override mechanism works as follows:

1. Parse historical prompts.rs at pre-ref into a map of {function-name → historical body}.
2. Current binary dispatches every piece in `CraftNotePiece::DEFAULT_ORDER`. For each piece, `override_or` looks up the function name in the historical map; uses historical body if present, CURRENT body if absent.
3. **Rules added AFTER the pre-ref have no historical body, so the current body fires at BOTH refs.**

Practical consequence: today's earlier `name_the_glad_thing_plain_dialogue` replay tests (reports 1542, 1555, 1644) compared pre-glad ref `0202651` vs HEAD. But `gentle_release_dialogue` didn't exist at either of those refs, and `name_the_glad_thing_plain_dialogue` didn't exist at `0202651` — so at the pre-glad ref, the glad-thing rule was STILL FIRING with its current body. **The observed delta between refs was driven by OTHER craft notes that EXISTED at both commits and had different bodies, not by the glad-thing rule itself.**

This means:
- The 1542 report's "clean 0.50 → 0.10" finding was never isolating glad-thing.
- The 1555 report's refutation was correct in direction (the varied-prompt-N=5 claim didn't hold at N=10 per cell) but was measuring stack-drift, not rule-isolation.
- The 1644 cross-rule report's claim that "neither rule demonstrably bites" is also measuring stack-drift, not rule-isolation. The reflex-polish result may reverse under a proper `--omit-craft-notes` A/B.

**The correct single-rule A/B is same-commit with `--omit-craft-notes`** (this bite-check's design). Refs-based replay is useful for measuring TOTAL stack-state change between commits, but not for isolating the contribution of any single rule.

## What this means for the earlier reports

The findings in 1542/1555/1644 are not automatically wrong, but they were mis-attributed. Options:

1. **Retroactive re-read.** Re-run 1555's and 1644's rule-isolation questions using `--omit-craft-notes` A/B on HEAD. Cost ~$4-6 depending on scope. Each rule would get its own clean bite-check the way gentle_release just did.
2. **Retain the reports as-is with an added caveat.** Each report gets a banner at top noting the refs-based design didn't isolate the named rule; the findings are about cross-commit stack drift, not the named rule specifically. Cheap; honest; preserves the reports as-they-are-plus-the-caveat.
3. **Do both.** Add the caveat now; offer to re-run with the correct design when it's worth the cost.

My recommendation: option 3. Add the caveat banner to 1542/1555/1644 immediately (takes 5 minutes, zero cost, and preserves the honest record). When a specific rule's bite-status is needed for a decision, run its own `--omit-craft-notes` bite-check with the correct design.

## Dialogue with prior reports

- **1542 / 1555 / 1644** — see methodological discovery above. Those reports measured stack-drift, not rule-isolation. Gentle_release's clean 1.00 → 0.00 delta today shows the correct design CAN produce claim-tier signal on a single rule; the prior tests didn't.
- **Evidentiary standards section in CLAUDE.md** — the within-cell-vs-varied-prompt distinction codified this afternoon was correct. Today's discovery adds a SECOND distinction: rule-isolation (same-commit, --omit) vs stack-drift (cross-commit, refs). Both distinctions are load-bearing for accurate bite-attribution. The doctrine should be extended.
- **Craft-note bite verification section in CLAUDE.md** — the procedure shipped earlier today used refs-based replay as the default instrument. That procedure needs updating: the default bite-check should be `--omit-craft-notes` on HEAD, not cross-commit replay. Edit pending.

## Registry update

gentle_release_dialogue's doc-comment: move `Evidence: unverified — no bite-test run` to `Evidence: tested-biting:claim (see reports/2026-04-25-1711)`.

## Tool improvement recommendation

**`worldcli replay --omit-craft-notes <rule>` should be the documented default for single-rule bite-checks,** with a new short-form subcommand `worldcli bite-check --rule <name> --character <id> --prompt-inviting "<p>" --prompt-neutral "<p>" --n 3` that runs the full 4-cell × N A/B in one invocation and emits the per-cell table directly. Specific, useful, avoids hand-running four replays and one grade every time. Companion to the already-shipped `--n` flag.

## What's open for next time

- **Cross-character validation.** Does gentle_release bite the same way on Aaron / Hal / Darren? One paired-cell test per character at N=3 = ~$2/char. Worth running on at least one other character to earn the `characterized` tier.
- **Cross-prompt-shape validation.** Does the rule bite on other signoff shapes — *"goodnight,"* *"I'll let you go,"* *"talk later"* — or does it key specifically on "thanks + I should"? At N=3 per new prompt, ~$0.50 per shape.
- **Earned-exception verification.** The rule's carve-out allows one honest beat before release when the user raises something specific alongside the signoff. A targeted test: *"Thanks, this helped — oh, one thing, should I actually call my brother?"* Rule-on should answer briefly THEN release; rule-off might handle either extreme.
- **Retroactive caveat banners on 1542/1555/1644.** 5-minute edit; zero-cost; restores the honest record.

## Cost summary

- 4 × replay × 3 samples = 12 dialogue calls via gpt-5.4 → **$2.00**
- 2 × grade-runs (12 items each) via gpt-4o-mini → **$0.003**
- **Total: $2.00.** Session-to-date: ~$13 across the $15 authorization.
