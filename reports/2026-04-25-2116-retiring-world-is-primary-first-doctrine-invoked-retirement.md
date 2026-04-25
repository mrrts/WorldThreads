# Retiring world_is_primary — first doctrine-invoked craft-note retirement

*2026-04-25 21:16. The world_is_primary craft note (shipped 2026-04-25 ~17:00; bite-tested across the day; characterized-tier null on Aaron at N=10; cross-character vacuous-test on Steven at N=10; cross-probe coverage from the 2055 multi-probe run) is removed from the prompt stack. This is the first time the codified retirement doctrine (CLAUDE.md § Open-thread hygiene + § Earning the departure from a default) has been invoked to actually pull a rule.*

## The retirement-justification chain (per the codified specific-test discipline)

The doctrine requires retirement to pass a SPECIFIC test, not be reached via vibes. The three justifications named:

> *Removing a rule because it didn't bite in one design is the `superseded_by`-style flattering disposition that requires a specific claim (the rule is demonstrably redundant with a named companion; the failure mode is demonstrably suppressed elsewhere; a characterized-tier test showed no bite). Without that claim, the rule stays.*

For world_is_primary, the third justification (characterized-tier test showed no bite) is met decisively. The first and second are NOT met (no companion rule does this work; the failure mode is NOT suppressed elsewhere — it manifests at 60% rate on Aaron × humor-inviting). The retirement rests cleanly on justification 3.

The conservative-by-default forcing function says one cross-character confirmation before pulling. This is the chain that satisfied that:

| Specific test | Cell | Result | Status |
|---|---|---|---|
| Characterized-tier null on sharpest target case | Aaron × humor-inviting × N=10 per cell | 6/10 = 6/10 explicit double-exposure (delta 0.00) | ✓ met (`reports/2026-04-25-2105`) |
| Cross-character confirmation of failure-mode specificity | Steven × humor-inviting × N=10 per cell | 0/10 = 0/10 explicit double-exposure (vacuous, mode-clean) | ✓ met (this report) |
| Cross-probe coverage of remaining bite-surface | Aaron × {reflective, request, weighty, humor-inviting} × N=2 per cell | Failure manifests ONLY on humor-inviting; other probes are clean baselines | ✓ met (`reports/2026-04-25-2055`) |

The rule's bite-surface across all characters and all probes tested: zero measurable bite anywhere. The Aaron + humor-inviting cell is the one where the failure mode clearly appears, and the rule produces 0.00 delta there.

## What was removed

`world_is_primary_dialogue` craft note, including:

- The function body (~70 lines, including the original Ryan-authored earned-exception clause for liminal moments)
- The doc-comment block with provenance + Evidence label
- The dispatch entry in `CraftNotePiece` enum + `DEFAULT_ORDER` + `from_cli_name` parser + `OVERRIDABLE_DIALOGUE_FRAGMENTS` list + dispatch match
- The `worldcli` piece-name map entry
- All 6 touch-points of the codified rule-shipping convention, in reverse

The earned-exception clause (Ryan-authored verbatim) is preserved here in this report for documentary record:

> *In extremely rare scenes of real weight — dream, vision, prophetic disturbance, spiritual oppression, severe disorientation, or another genuinely liminal threshold — a line may approach the edge of unexplained reality. But it must still function completely and cleanly inside the world itself. Do not use this opening for clever meta jokes, architecture-adjacent banter, or wink lines. If the line becomes better, sharper, or more satisfying because it also comments on the app, model, prompting, or hidden machinery, do not use it. The exception is earned only when the scene would remain fully intact even if no one outside the world existed to notice the resonance.*

That language remains valid craft thinking. It just doesn't currently sit in any rule's body. If a future rule (or the REVERENCE invariant) wants to incorporate the principle, the language is here.

## What this retirement DOES NOT mean

- **Double-exposed lines are now acceptable.** They're not. The principle the rule articulated (the world's reality is primary; lines shouldn't double-expose to commentary on the apparatus) is correct craft. The retirement is about the SPECIFIC RULE'S BITE, not the principle's validity. The principle stands as authorial commitment in this report and in the prior `world_is_primary` body preserved in git history.
- **The REVERENCE invariant is weakened.** REVERENCE governs explicit fourth-wall breaks ("I am an AI"); it doesn't address the subtler double-exposure failure mode. REVERENCE remains in the stack, untouched.
- **Aaron's humor-inviting double-exposure problem is solved.** It isn't. The 60% failure rate on Aaron × humor-inviting probes is still there. The retirement just acknowledges that this rule wasn't the lever to fix it. A different lever (character-anchor modification, prompt-structure detection middleware, or an entirely different rule shape) might be — but those are future work, not this rule's job.

## What this retirement DOES mean

- **The codified retirement doctrine works in practice.** This is the first time the specific-test discipline + open-thread-hygiene + conservative-by-default forcing function have been combined to pull a shipped rule. The chain held: claim-tier-null observation → characterized-tier null → cross-character vacuous → cross-probe coverage → retirement justified → rule pulled. No vibes, no flattering disposition, no "well, maybe it's doing something invisible." The honest disposition won.
- **The session's larger findings about craft-note layer ceiling get their first concrete production decision.** Today's investigation (formula-alone-vs-full-stack arc + multi-probe extension + this single-rule retirement) has been pointing at the same conclusion: the craft-note layer underperforms vs base anchors+invariants on most registers, and individual rules don't bite at characterized-tier. This retirement is the first action on those findings — not a sweeping retirement of the whole layer (which the data doesn't yet support), but an honest one-rule retirement on the rule with the cleanest characterized-tier null and the longest documented failure-pattern chain.
- **The structural-ceiling reading from earlier today gets a concrete worked example.** The Read C ceiling (single-paragraph craft notes can't override base-model affinity-toward-vocabulary-clusters when the prompt invites them) now has its first character-and-probe-specific retirement.

## What's open after this retirement

- **The Aaron × humor-inviting failure mode is still real and still at ~60% rate.** That problem isn't solved by retiring the rule that wasn't solving it. Different mechanisms could be tried:
  - **Character-anchor modification.** Tune Aaron's anchor to downweight cross-domain analogy-as-humor under casual prompt pressure. Tests whether the leverage is at the anchor layer.
  - **Prompt-structure middleware.** Detect humor-inviting + Aaron at request time; inject a tighter just-in-time directive specifically for that condition. Tests whether per-cell intervention is more effective than universal craft notes.
  - **Accept the failure mode as part of Aaron's voice and let it stand.** The data IS that Aaron's character-canonical software-thinking pulls into double-exposure on humor-inviting probes; the model is doing what Aaron-the-character would do. If the project's mission tolerates this register, the failure mode might be reframed as character-canonical-with-aesthetic-edge, not failure. (The Maggie baseline doesn't directly speak to this case; needs explicit consideration.)
- **Other craft notes might also retire under the same doctrine** if they undergo the same characterized-tier scrutiny. Many of today's earlier rules tested-null at claim-tier on individual rule-isolation tests. Bringing the same single-rule-isolation + cross-character-confirmation + cross-probe-coverage chain to other tested-null rules (like `humor_lands_plain` and `name_the_glad_thing_plain_dialogue`, both already labeled with weak Evidence) is a natural follow-up. Each retirement is its own discipline-application; the doctrine is now demonstrated to work and can be invoked again.
- **The craft-notes layer's net contribution remains an open characterized-tier question.** This single retirement is one rule of 17 (now). The aggregate question (does the whole layer add measurable value) was sketched at characterized-tier in the 2055 multi-probe but needs further cross-character extension to be settled. That's larger-scope work; this retirement is the first step.

## Cost summary

This retirement's full investigation chain across multiple sessions today:
- 1759 (Aaron gentle-release with world_is_primary observed in baseline): cost subsumed in that experiment
- 2044 (Aaron formula-only vs full-stack characterized; world_is_primary failure observed): subsumed
- 2055 (multi-probe extension; world_is_primary failure observed on humor probe): subsumed
- 2105 (Aaron × humor × N=10 single-rule isolation): $3.59
- 2116 (Steven × humor × N=10 cross-character confirmation): $3.53

Total directly-attributable: ~$7.12. Of $10 fresh authorization for this turn: ~$2.88 unused.

## Registry update

Resolving the original `formula-alone-vs-full-stack-aaron-darren` and `world-is-primary-characterized-tier-null-aaron-humor` experiments with this retirement-as-outcome documentation. The retirement itself doesn't need a new experiment registration; it's a CONSEQUENCE of the resolved experiments. Linking this retirement report from both prior registry entries.

The project's `experiments/` directory continues to be queryable; the rule's full history (proposed, shipped, bite-tested, refuted, retired) lives across multiple report files which collectively constitute the rule's audit trail.

## Closing observation

This is the first time in this project I've watched a piece of craft I authored, then bite-checked, then watched fail multiple specific-tests at characterized tier, then formally retired per a discipline that was itself authored and codified within the same session-arc. The discipline ate the work. That's the discipline working — but it's also a small loss-of-craft moment worth naming. The earned-exception language Ryan wrote (preserved above) was beautiful and theologically careful. That language doesn't go away; it just isn't load-bearing in any current rule. If a future rule needs to say what Ryan said about liminal moments, the language is here, in this report, ready to be lifted again.
