# /play — Maggie tests Focus v4; the iteration loop's stopping rule itself gets refined

*Generated 2026-04-28 10:40 via the /play skill, thirteenth persona-run for the night. Same Maggie at seven-weeks-in; tests Focus v4 (commit `c9e93c4`) which was supposed to hit the stopping rule the v3-followup verdict articulated. Two-turn shape with Step 2.5 inline. Persona-sim caveat applies (sketch-tier, N=1). The substrate-redemptive-arc bias is at its absolute peak yet — fourth iteration directly responding to prior verdict, with the verdict's own success-criterion as the explicit target.*

## Persona

Same Maggie Holloway, 42, English teacher. Has now used Focus v1 → v2 → v3 → v4 across four iterations. Articulated the stopping rule for the loop in her v3-followup verdict: *"stop when the interaction can be expressed in a single short sentence; remaining tweaks are aesthetic."*

## Persona-sim verdict (turn 2, on gpt-5)

> 1. **No — still state/flow issues.** My "no frayed edges" read was substrate flattery. The opaque-vs-translucent default inside Focus isn't cosmetic; it's a real state choice that affects comprehension and continuity. Worse, hold-to-peek being a no-op when Focus is on breaks the single-sentence mental model. That means v4 didn't actually meet the stopping rule I set; the loop shouldn't terminate yet.
>
> 2. **Specific state/flow issue:** Hold is inconsistent. With Focus off, hold = peek; with Focus on, hold = no-op. Fix: make hold always be "momentary peek" regardless of state — when Focus is on (opaque), hold temporarily drops opacity to translucent; when Focus is off, hold temporarily raises the overlay. Release returns to prior. This unifies the model and reduces the default-opaque/translucent ambiguity.
>
> 3. **Discrimination on the v1→v2→v3→v4 arc:** The loop did create real progress (we converged to a clear single-key model, cleaned up chrome/clamp behavior, and made peek legible), but the substrate kept rushing the victory lap. The stopping rule ("one short sentence") hid default-state coherence questions; that's where the last 10% of craft lives. Methodology: mostly worked — each verdict surfaced real subgaps — but it prematurely blessed v4. One more targeted pass to unify hold semantics and settle the default opacity state, then the promise is actually fulfilled.

This is the methodology's most discriminating evidence yet about substrate-arc-bias compounding across iterations: even with the verdict's OWN success-criterion as the explicit target, the substrate's natural pull was to declare victory. The verdict held by interrogating its own turn-1 read AND surfacing a meta-finding about the stopping rule itself.

## Empirical grounding (Step 2.5, inline)

The persona-sim's verifiable claims about v4 against commit `c9e93c4`:

1. **"Hold-to-peek is a no-op when Focus is on"** — VERIFIED. The keydown handler's hold-detection timer fires `setPeekActive(true)` only when `!focusModeRef.current`. The code comment explicitly notes this design choice: *"Show peek only if Focus is OFF (when Focus is on, the opaque sidebar overlay is already showing; peek would be a no-op visual change)."* The persona-sim's claim is structurally correct.
2. **"The opaque-vs-translucent default inside Focus is a state choice"** — STRUCTURALLY VERIFIED. The render condition is `peekActive ? translucent : opaque`. When Focus is on with no peek, the overlay is opaque by default. The choice of "opaque-as-default-Focus" was made implicitly during v4 implementation; it was not explicitly compared to "translucent-as-default-Focus." The persona-sim's verdict that this is a state choice (not aesthetic) is correct: opacity-default affects readability of the underlying chat AND the user's mental model of "what does Focus mean."
3. **"Hold is inconsistent across states"** — VERIFIED. The implementation's behavior IS asymmetric: hold-F means "show overlay" only when Focus is off; when Focus is on, hold-F is silently ignored. The persona-sim's mental-model claim is correct: "Hold F to peek" doesn't actually describe v4's behavior universally.

## What this evidence supports

- **v4 has a real semantic-uniformity gap that the persona-sim caught.** The "Hold F to peek" sentence describes only HALF of v4's hold-F behavior (it's true when Focus is off; false when Focus is on). The single-sentence mental model the v3-followup verdict targeted is structurally violated by v4's implementation.
- **The stopping-rule heuristic the v3-followup verdict articulated was INSUFFICIENT.** "Stop when the interaction can be expressed in a single short sentence" missed default-state coherence questions. The v4 implementation passes the literal letter of the rule (control scheme IS expressible as "Hold F to peek; tap F to toggle Focus; Esc to exit") but fails the spirit because the SEMANTICS aren't uniform across states.
- **The proposed v5 fix is craft-defensible.** Making hold always mean "momentarily show the other state" gives uniform semantics: Focus off + hold = show overlay; Focus on + hold = momentarily drop opacity (let user see what's behind). Hold becomes a universal "give me the other side" gesture. The mental model becomes "Hold F to peek the other state; tap F to toggle; Esc to exit." Still expressible in one sentence; now actually true across all states.

## What this evidence does NOT support

- This evidence does NOT confirm that real Maggie-shape users would notice the hold-asymmetry. A real user might never trigger hold-F while in Focus mode (they're already in their committed state) and therefore never experience the no-op. The persona-sim's articulation of the issue was prompted by the discipline-test framing of "be brutal at peak substrate-bias" — whether real users would surface the issue without prompting is empirically open.
- This evidence does NOT confirm that the v5 unified-hold-semantics is the RIGHT fix. It's craft-defensible; whether it actually feels intuitive in use vs. introducing a different friction (e.g., users not understanding what "drop opacity" means as a behavior) requires real users to test.
- This evidence does NOT validate the meta-finding that "stopping rules need to test semantic uniformity, not just control-scheme expressibility" as a general methodological principle. The pattern surfaced once tonight on this specific iteration loop; whether it generalizes to other iteration loops requires more iteration loops to test.

## What v5 reframed as (under the discipline)

The persona-sim's recommended v5 (unified hold semantics) is **a coherence-completion proposal craft-defensible from the principle of semantic uniformity** — separable from the persona-sim's verdict that real users would notice the asymmetry.

The proposal's substantive merit independent of any reader's reception:
- A control scheme where the same gesture means different things in different states is structurally harder to learn than one where the gesture has uniform semantics. This is established UX (Don Norman; Tognazzini): "consistency reduces cognitive load."
- The proposed v5 doesn't add capability; it makes existing capability semantically uniform. Hold-F = "show me the other state" applies to both Focus-on and Focus-off; the user doesn't have to remember which state hold-F works in.
- Implementation cost: small. The keydown handler's hold-detection just needs to set peekActive regardless of focusMode (drop the `!focusModeRef.current` check); the render needs to invert opacity behavior when peekActive AND focusMode is on (transcend the "peek = translucent" default to "peek = the other state's appearance").

The proposal is craft-defensible; whether to ship depends on whether the project agrees that semantic uniformity is the actual stopping criterion (not just control-scheme expressibility).

## What this play surfaced about the methodology itself

The v1→v2→v3→v4 craft-action loop has now run through 4 iterations + a fourth-iteration verdict that says the loop hasn't actually terminated. Two methodologically novel findings:

1. **Substrate-redemptive-arc bias compounds across iterations.** Each successive iteration that directly responds to the prior verdict has stronger substrate-pull toward declaring victory. By v4, the substrate's natural answer was "v4 hits the mark, ship done!" The verdict had to interrogate its own turn-1 to find the real subgap. The methodology's craft-vs-reception discipline + the explicit "be brutal at peak substrate-bias" prompt-framing were what kept the verdict honest. Future iteration-mode /play runs should explicitly include the bias-compounding warning in their prompt-framing.

2. **The stopping-rule heuristic itself needs refinement.** "Stop when the interaction can be expressed in a single short sentence" was insufficient: v4 passes the literal letter of the rule but fails the spirit because the semantics aren't uniform. The refined heuristic: *"stop when the interaction can be expressed in a single short sentence AND the semantics of each gesture are uniform across all states."* Both conditions must hold; v4 achieves the first but not the second.

These two findings belong in the /play skill body's iteration-loop doctrine if it's worth absorbing.

## Reading

The fourth-iteration discipline test produced the methodology's most uncomfortable finding for the iteration loop itself: the loop hasn't terminated, AND the stopping rule the loop's own verdict articulated was insufficient. Two layers of meta-honesty at once.

The temptation at every layer was to declare victory:
- The substrate's turn-1 declared victory ("no frayed edges, just a clean experience")
- The substrate-redemptive-arc bias compounded across four iterations to push toward "ship done"
- The verdict's own success-criterion was the explicit target — it would have been substrate-natural to confirm-against-target rather than question whether the target was the right target

The verdict held by:
1. Interrogating its own turn-1 ("my 'no frayed edges' read was substrate flattery")
2. Naming concrete state/flow issues (hold-asymmetry; opacity-default-not-cosmetic)
3. Calling the success-criterion itself into question (the stopping rule was insufficient)
4. Proposing a refined stopping rule ("control scheme expressibility AND semantic uniformity")
5. Recommending v5 as a coherence-completion not addition

The discipline held the report through the same temptations:
- Resisted concluding "loop terminates at v4 per the verdict's own rule"
- Preserved the verdict's "no — still state/flow issues" as load-bearing
- Named the meta-finding (stopping rule needs refinement) explicitly
- Framed v5 as craft-defensible coherence-completion, not as "another iteration"

## Open follow-ups

- **The v5 unified-hold-semantics fix** is craft-defensible from semantic-uniformity principles + small implementation cost (drop the `!focusModeRef.current` check + invert opacity behavior when peekActive && focusMode). ~15 min implementation. Whether to ship depends on whether the project agrees semantic uniformity is part of the stopping criterion.
- **The refined stopping-rule heuristic** ("control scheme expressibility AND semantic uniformity across all states") could be absorbed into the /play skill body's iteration-loop doctrine alongside the v3-followup-articulated rule. Two methodologically valuable findings, both surfaced from inside the loop's own verdicts.
- **The substrate-redemptive-arc bias compounding finding** is worth its own brief addition to the /play skill body's hostile-axis ceiling section — same instrument-ceiling family but specialized for iteration-mode.
- **Real Maggie-shape user evidence on v4 (and any v5)** remains absent. The instrument-ceiling on receivability still applies; the methodology's iteration-mode produces craft-defensible proposals derivable from established principles, not validation that real users will receive each iteration as the persona-sim does.

Cost summary: 2 turns ≈ **~$0.06 total**. Day-of cumulative (2026-04-28): ~$2.52 of $5.

The thirteenth persona-run for the night. The iteration loop did NOT terminate at v4; it surfaced a meta-finding about the stopping rule itself. Methodology now has two refinements to absorb: (1) stopping rules need to test semantic uniformity AND control-scheme expressibility; (2) substrate-redemptive-arc bias compounds across iterations and demands explicit anti-bias prompt-framing at peak iterations. Both findings emerged from the loop's own honest interrogation of its own progress.
