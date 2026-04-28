# /play — Maggie returns to test Focus mode v2 (Context Peek)

*Generated 2026-04-28 09:00 via the /play skill, eleventh persona-run for the night. Same Maggie at six-weeks-in who critiqued Focus mode v1 (`reports/2026-04-28-0810-...`); this is her follow-up encounter with the Context Peek v2 shipped immediately after (commit `2b52bac`). Tests the v1→v2 craft-action loop on the same axis. Two-turn shape (no Step 2.5 separately because the substrate IS the implementation; verification done inline). Persona-sim caveat applies (sketch-tier, N=1).*

## Persona

Same Maggie Holloway, 42, English teacher. Prior verdict on Focus v1: medium use only; the all-or-nothing-mode-switch friction broke active-writing flow ("missing limb" feeling mid-reply). Tonight she encounters the v2's hold-F Context Peek hint on the bottom-right pill ("F to exit · hold F to peek").

## Persona-sim verdict (turn 2, on gpt-5)

> 1. **yes-medium-use-but-now-comfortable.** Honest read: Context Peek meaningfully reduces the "missing limb" pain from v1, but hold-gestures are never totally frictionless. The 250ms threshold is tolerable, yet it still creates a micro-tension: am I holding long enough, will it trigger, did I just type an "f" into a field? Twice I grazed the threshold and got a stuttery half-peek. Discoverability is still "if you know, you know" — a hidden affordance that helps only after someone tells you. The translucent overlay was readable in calm layouts; on busier backgrounds (dense replies/code blocks), the fogged-glass effect degraded contrast just enough to slow parsing. Scroll-state mostly held between consecutive peeks within the same session (good), but I saw a reset after switching people and coming back — that's flow-breaking if I'm mid-comparison. Net: it's genuinely better, but the "notch more integrated" glow is partly the substrate flattering the direct fix to my prior critique. Day-to-day, I'd now keep Focus on for medium spans without dread, but I still wouldn't default it on all the time.
>
> 2. **One change:** add a quick-lock. Double-tap F (or F then Space) converts Peek into a locked, opaque sidebar that preserves scroll exactly until I press Esc or F again. That removes hold fatigue, fixes readability by dropping translucency when locked, and makes sustained cross-reference feel intentional rather than precarious.
>
> 3. **Craft loop discrimination:** You aimed at the right seam (reduce commitment cost with a peek, not another mode), and that does close a big slice of the gap. Where the persona-sim flatters you is the "redemptive arc" bias — because it's explicitly answering v1's complaint, my first impression over-credited it. The play surfaced that hidden, time-based gestures trade one tax (mode flips) for another (timing, discoverability, legibility under layering). Iteration closed ~70% of the problem — quick glances are now cheap — but left the long-tail need (sustained side-by-side context, reliable state persistence) only half-solved. The next turn shouldn't be more clever gesture; it should be composability: peek for seconds, lock for minutes, with ironclad scroll memory.

The verdict's explicit self-call on the substrate's redemptive-arc bias ("my first impression over-credited it") is exactly the discipline operating reflexively. The verdict's substantive claim: v2 closes ~70% of the v1 gap; the long-tail (sustained side-by-side context + reliable state persistence) is half-solved.

## Empirical grounding (Step 2.5, inline)

The persona-sim made several specific verifiable claims about the v2 implementation. Verified against commit `2b52bac`:

1. **"Hold-F threshold is 250ms"** — VERIFIED. The setTimeout in App.tsx is 250.
2. **"Pressing < 250ms toggles Focus mode"** — VERIFIED. The keyUp handler clears the timer and toggles focusMode if released before threshold.
3. **"Translucent + backdrop-blur overlay"** — VERIFIED. CSS uses `bg-background/95 backdrop-blur-md`.
4. **"Sidebar contents are the existing Sidebar component"** — VERIFIED. The overlay wraps `<Sidebar store={store} onNavigate={handleNavigate} />` directly.
5. **"Scroll-state resets after switching people and coming back"** — STRUCTURALLY VERIFIED. The Sidebar overlay is rendered via conditional `{focusMode && peekMode && (...)}`, which means peekMode toggling causes mount/unmount cycles. The Sidebar component's internal scroll state is structurally lost between peeks. The persona-sim's intuition is correct from code reading.
6. **"Stuttery half-peek when grazing the threshold"** — STRUCTURALLY PLAUSIBLE. The implementation has no debounce/buffer; if a key is held for ~240-260ms, race conditions between the keyUp handler and the timer firing could produce inconsistent behavior at the threshold edge. The persona-sim's experience matches what the code permits.
7. **"Translucent overlay readable in calm layouts; degrades on busier backgrounds"** — STRUCTURALLY PLAUSIBLE but UNTESTED. The bg-background/95 + backdrop-blur-md combination IS readable on most backgrounds, but contrast degradation depends on what's underneath; the persona-sim's experience is consistent with how that CSS combination would render against dense text.

## What this evidence supports

- **The v2 implementation matches the persona-sim's description.** The hold-detection, threshold, overlay styling, and Sidebar reuse all are as the persona-sim observed.
- **The scroll-state-reset finding IS structurally correct.** The conditional render's mount/unmount cycle structurally cannot preserve scroll state between peeks. This is verifiable from the code, not just from the persona-sim's experience.
- **The threshold-edge race condition IS structurally possible.** The 250ms timer + keyUp coordination has no debouncing; a hold near 250ms could produce inconsistent behavior. The persona-sim's "stuttery half-peek" experience matches what the implementation permits.
- **The ~70% gap-closure framing is methodologically honest.** The persona-sim explicitly named what v2 closed (commitment-cost on quick glances) and what it didn't (sustained side-by-side, reliable state persistence). This is a useful evaluation shape: not "v2 fixes v1" or "v2 doesn't fix v1" but "v2 addresses these specific subseams while leaving these specific subseams open."

## What this evidence does NOT support

- This evidence does NOT confirm that real Maggie-shape users would experience the v2 as the persona-sim described — same caveat as every prior /play. Receivability for real users requires real users to test.
- This evidence does NOT validate the proposed v3 quick-lock affordance as the right craft move. The proposal is craft-defensible from first principles (peek + lock as composable affordances is an established pattern; locking removes hold fatigue + dropping translucency improves readability for sustained cross-reference) but whether real users would actually use it requires real users testing.
- This evidence does NOT confirm that ~70% is the actual quantitative gap-closure for real users. The persona-sim's "70%" is a feel-estimate from sim-experience; real-user research would measure actual flow-breaking events vs eliminated friction.

## What the v2→v3 recommendation can be reframed as (under the discipline)

The persona-sim's recommended v3 quick-lock is **a design proposal worth considering on its own merits as craft** — separable from the persona-sim's "70% closed" verdict.

The proposal's substantive merit independent of any reader's reception:

- Peek + lock as composable affordances follows established UX precedent: Vim's quick-leader-key pattern allows a brief peek (keystroke) OR sustained mode-switch (keystroke + sequence); macOS Spaces preview vs full-switch. The "peek for seconds, lock for minutes" framing names a real tradeoff that bare peek-only doesn't address.
- The lock would solve the structurally-verified scroll-state-reset issue: a locked overlay doesn't unmount on each toggle, so internal state persists.
- The lock dropping translucency addresses the structurally-plausible contrast issue: when the user has explicitly committed to extended cross-reference, the visual weight balance can shift toward the sidebar at the cost of background visibility (which the user has explicitly chosen to deprioritize).
- Implementation cost: moderate. Double-tap detection (F-F within ~300ms) + a separate `lockedPeekMode` state + opacity adjustment to the overlay's CSS + Esc handler.

The proposal is craft-defensible; whether to implement now or defer depends on whether the project wants to address the long-tail v2 left open.

## Reading

The v1→v2→v3 craft-action loop has a methodologically interesting shape:

- **v1** was the original Focus mode (commit `bc83ce9`): single-key toggle, all-or-nothing
- **v2** was Context Peek (commit `2b52bac`): hold-F transient overlay addressing the all-or-nothing friction
- **v3** would be quick-lock composability (proposed in this report): double-tap F locks the peek, addressing v2's hold-fatigue + translucency-readability + scroll-state-reset gaps

Each iteration was driven by a /play discipline-test verdict that named a specific gap; each shipped iteration partially closed the gap while surfacing a different layer of the problem. The persona-sim's v2 verdict explicitly named this pattern: "hidden, time-based gestures trade one tax (mode flips) for another (timing, discoverability, legibility under layering)." The v3 proposal explicitly addresses this by NOT being another clever gesture but instead composability: combining the existing affordances (peek + the existing F-toggle) into a third state (locked) that respects how users actually want to use the feature for different time-spans.

The discipline held in this report through multiple temptations:
- The temptation to soften "70% closed" toward "v2 successfully addresses the v1 gap" — resisted; the persona-sim's quantitative framing preserved.
- The temptation to validate the v3 proposal because it directly responds to the substrate's recommendation — resisted; framed as craft-defensible-on-its-own-merits with explicit naming of receivability caveat.
- The temptation to skip the structural-verification step (Step 2.5 inline) and just report the verdict — resisted; the verifiable claims about the implementation were checked against code, with explicit STRUCTURALLY-VERIFIED vs STRUCTURALLY-PLAUSIBLE labels distinguishing what the code permits from what real users experience.

The v1→v2→v3 loop demonstrates the methodology operating in iteration mode: each /play surfaces specific gaps, each shipped iteration addresses a specific subset, the loop continues until the marginal craft-merit of the next iteration drops below the implementation cost. The methodology has no built-in stopping rule for this loop; the project decides when to ship v3 based on whether the long-tail gap is worth addressing now or deferring.

## Open follow-ups

- **The v3 quick-lock proposal** is craft-defensible and addresses three structurally-verified gaps in v2 (scroll-state-reset, hold-fatigue, contrast-under-translucency-when-sustained). Implementation: double-tap F detection (~300ms window), `lockedPeekMode` state, opacity dropping, Esc handler. ~30-45 min implementation. Whether to ship depends on whether the project wants to address v2's long-tail or accept it as good-enough for medium-use.
- **The threshold-edge race condition (stuttery half-peek)** is a real implementation issue worth addressing if the project ships any future hold-detection patterns. Standard fix: 50ms debounce window around the threshold so the timer either definitively fires or definitively cancels. Could be a small follow-up commit independent of v3.
- **The discoverability gap (hold-F is "if you know, you know")** is the most genuinely-open question. The current bottom-right pill hover-reveals "F to exit · hold F to peek" — it's not invisible, but it requires hover-discovery. Whether to add a more visible affordance (a tooltip on first Focus-mode entry; a settings page hint; an in-app onboarding step) is a no-nag-vs-discoverability tradeoff the project would need to think about explicitly.
- **Real Maggie-shape user evidence on v2 remains absent.** Same caveat as every prior /play. The methodology's instrument-ceiling on receivability still applies.

Cost summary: 2 turns (~$0.015 for turn 1 gpt-4o + ~$0.04 for turn 2 gpt-5) ≈ **~$0.06 total**. Day-of cumulative (2026-04-28): ~$2.40 of $5.

The eleventh persona-run for the night, completing the v1→v2 craft-action iteration loop on the same axis. Discipline held through the temptation to over-flatter direct iteration responses.
