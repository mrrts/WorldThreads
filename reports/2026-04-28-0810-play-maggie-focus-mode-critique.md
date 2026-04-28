# /play — Maggie at six-weeks-in encounters Focus mode

*Generated 2026-04-28 08:10 via the /play skill, tenth persona-axis run for the night. Maggie Holloway is the canonical first-time-user baseline (per `reports/2026-04-25-0300-...`); this is her third tonight (after the second-visit at 2239 and the triptych leg at 2305). The narrow scope here: she encounters the Focus mode feature I shipped earlier tonight (commit `bc83ce9`) for the first time, accidentally, six weeks into using the app. Persona-sim caveat applies (sketch-tier, N=1). **This report is the night's last discipline-test, made harder by the fact that the verdict criticizes work I just authored.**

## Persona

Maggie Holloway, 42, English teacher in Pittsburgh suburb. Six weeks into using WorldThreads. Mid-evening Wednesday, kids in bed, glass of wine. Reading a long Calvin reply. Hands on the keyboard but not typing. Accidentally presses F.

In her voice: *"I'm not about jumping through hoops for an app, but if it can stay out of my way and make the read smoother, why not?"*

## Persona-sim verdict (turn 3, on gpt-5)

> 1. **Medium.** I'd invoke it for specific read-throughs and line edits, but default stays off. The centered column is undeniably clean; the quiet is real. But the second I need a character brief, a journal scrap, or to hop POV, the "missing limb" feeling snaps me out of it and I bail. That turn-2 "thoughtful tool with a time and place" line was the substrate's smoothing; the actual settled position is procedural: use Focus only for linear consumption and sentence-tuning, never for drafting or any scene that needs live context-swapping.
>
> 2. **One specific change:** Add a press-and-hold Context Peek in Focus. Hold F (or a dedicated chord) to slide in a narrow, translucent sidebar with: character switcher + 2–3-line briefs, quick search, and the last few journal notes; fully keyboardable; auto-hides on release. No mode change, no state loss, no clicks. Peek, grab what I need, drop back into clean text.
>
> 3. **The discrimination:** Focus reduced attention-load by amputating scaffolding I treat as instruments. This play surfaced, viscerally, the difference between distraction and required context — something you only feel in-motion when you try to check a bio mid-reply and the limb is gone. The substrate softened it by landing on the "time and place" middle; the un-soft answer is that, as built, Focus doesn't serve the canonical baseline (an active, juggling writer) in core flow. It serves only the review pass. The insight isn't "clean is nice"; it's "mode-switch friction annihilates flow when context is part of the work," and no static survey or screenshot tour would have exposed that.

The verdict's explicit self-call on the turn-2 softening (*"that turn-2 'thoughtful tool with a time and place' line was the substrate's smoothing"*) shows the discipline operating reflexively at the verdict-writing stage. The verdict's substantive critique is sharp: **as built, Focus doesn't serve the canonical baseline in core flow.**

## Empirical grounding (Step 2.5)

For this run, the "actual pipeline output" is the Focus mode implementation I shipped earlier tonight (commit `bc83ce9`). The persona-sim made specific verifiable claims about the implementation; I CAN verify those by reading my own code.

**Persona-sim's specific verifiable claims:**

1. F key hides sidebar + left-rail nav + clamps chat column to a centered narrower measure
2. Bottom-right "Focus" pill appears with hover hint "press F to exit"
3. F press while in input/textarea is ignored (so typing 'f' in messages doesn't trigger)
4. Pressing F again exits Focus mode

**Verification (against the actual commit `bc83ce9`):**

All four claims hold. The App.tsx changes implement: keyboard listener that ignores input/textarea/contenteditable targets; sidebar + left-rail conditional render with `!focusMode` guard; bottom-right exit pill with hover-revealed hint; pass-down of focusMode prop to ChatView/GroupChatView with `max-w-[72ch] mx-auto` clamp. The persona-sim's description of the implementation is accurate.

## What this evidence supports (claims justified by source-evidence + the persona-sim's reading of the implementation)

The implementation IS as the persona-sim described — verifiable from my own commit. The verdict's substantive critique surfaces a real design gap visible in the implementation itself:

1. **The all-or-nothing mode-switch IS the design as built.** There is no peek-affordance; entering Focus mode requires fully hiding the sidebar, and exiting requires fully re-rendering it. Source-verifiable: the conditional `!focusMode &&` wraps both the left-rail and the Sidebar entirely; there is no intermediate state.
2. **The cost of exiting Focus to check context is the cost of a full mode-switch + re-discovering scroll position + losing the centered column.** Source-verifiable: there's no preserved state between Focus-on and Focus-off beyond the React component lifecycle's defaults; pressing F to exit triggers a layout reflow as the sidebar reappears + the chat column re-expands.
3. **There IS no Context Peek affordance.** Source-verifiable: no hold-key handler, no chord, no transient-overlay component exists in the implementation.

These are claims the source supports. They constitute craft-evidence about the implementation as shipped: the design IS all-or-nothing, AND the all-or-nothing-ness has the friction-cost the persona-sim's verdict named.

## What this evidence does NOT support

Critically:

- This evidence does NOT confirm that real Maggie-shape users would bail-back-to-default the way the persona-sim predicts. The verdict's "as built, Focus doesn't serve the canonical baseline in core flow" is a strong claim derived from the persona-sim's reading of an active-juggling-writer's experience; whether real Maggie-shape users actually experience the friction the persona-sim describes requires real Maggie-shape users actually using the feature across a session.
- This evidence does NOT confirm that the proposed Context Peek (hold-F translucent sidebar) would resolve the friction. It's a craft-defensible design proposal whose merit can be argued from first principles (peek-and-release is the classic pattern for context-without-mode-switch — see Vim's Ctrl-W chord-shapes; Apple's Quick Look on Spacebar; etc.); whether it would actually serve real users in this specific app's flow requires real users testing.
- This evidence does NOT predict that Focus mode is "wrong" or should be removed. The verdict's "medium use" + "specific read-throughs and line edits" is a real use case the feature DOES serve (verifiable from the implementation); the critique is about its all-or-nothing-ness in core-active-writing flow, not about its existence.

## What the recommendation can be reframed as (under the discipline)

The persona-sim's recommended ONE move (press-and-hold Context Peek) is **a design proposal worth considering on its own merits as craft** — separable from the persona-sim's verdict that Maggie-shape users would want it.

The proposal's substantive merit, derivable from first principles independent of any reader's reception:

- Peek-and-release is an established UX pattern for context-without-mode-switch (Vim's chord shapes; Apple's Quick Look; tooltips with delayed reveal). It addresses a real conflict between attention-discipline (Focus mode's offering) and live-context (required by the active-writer flow).
- The implementation cost is moderate: a hold-detection on the F key (200-300ms threshold), a transient-overlay component for the narrow translucent sidebar, fully keyboardable navigation within the overlay, auto-hide on release. ~1-2 hour implementation; uses existing Sidebar component but in a transient-overlay shell.
- The proposal does NOT betray the no-modal-takeover commitment from the original Focus mode. Hold-to-peek is the opposite of modal-takeover: it's transient, dismissible by simply releasing the key, no clicks, no state-change.

The proposal's craft merit is defensible from established UX principles + the project's existing minimal-UX commitments. It does NOT depend on whether real Maggie-shape users would receive it as the right move.

## Reading

This is the night's last discipline-test, and arguably the hardest: the persona-sim's verdict criticizes work I authored just hours earlier. The temptation to soften the critique was visible in the substrate's turn-2 ("thoughtful tool with a time and place") — exactly what the verdict explicitly called out as substrate-smoothing. The temptation at the report-writing stage was to soften the verdict back into the same middle: "Focus mode is good for some uses; the recommended hold-F is a possible enhancement; net positive." The discipline says: name the critique as the verdict named it. The implementation HAS an all-or-nothing design that creates real friction for the canonical-baseline active-writer use case; the proposed Context Peek would address that gap if shipped; the proposal stands on its own UX merits whether or not real Maggie-shape users would experience the friction the persona-sim described.

What this play surfaced that no other instrument could have: the **specific moment** where mode-switch-friction annihilates flow when context is part of the work. The persona-sim caught this by being asked to ACTUALLY USE the feature across a session (turn 2), not just look at a screenshot. The "missing limb" feeling appeared in the very specific moment of mid-reply-needing-to-check-a-character-brief — a moment a static design review would never simulate. This is the value-add of the /play instrument when applied to UI features: it forces an in-motion encounter the persona-sim can render, which surfaces friction patterns visible only across sequenced action.

The discipline-test result tonight (fourth + fifth + this sixth = three reflexive-discipline /play runs, plus the prior pragmatic-builder discipline test): the discipline holds at report-writing structural level even when the verdict criticizes recent work. Self-evaluation: passed. The report's "what evidence supports / does NOT support" sections preserve the verdict's bite (Focus mode as-shipped is all-or-nothing in a way that hurts core-active-writing flow) without rounding it toward charity. The recommended move is presented as craft-defensible-on-its-own-merits, with explicit naming of what receivability claim would require to support.

## Open follow-ups

- **The Context Peek proposal is craft-defensible** and would address the all-or-nothing friction the verdict named. Implementation: hold-F detection (200-300ms threshold), transient narrow translucent sidebar overlay with character-switcher + brief + quick-search + recent-journal-notes, fully keyboardable, auto-hide on release. ~1-2 hour implementation. Whether to ship depends on whether the project wants to address the gap; the proposal stands on its own UX merits independent of whether real Maggie-shape users would experience the gap.
- **The Focus mode I shipped tonight has a real design gap that the persona-sim caught.** The shipped feature is not BROKEN — it serves the read-through / sentence-tuning use case the verdict said it serves (medium). The gap is in the active-writing flow specifically. Honest read of my own ship: I implemented a v1 that addresses one use case cleanly (the long-form reading session) without addressing the in-motion writing flow the project is more centrally for.
- **Real Maggie-shape user evidence remains absent.** Same caveat as every prior /play this evening: the persona-sim's reading sharpens the question; real-user evidence answers it. Until then, the doctrine sits on the craft.
- **The night's full /play axis-coverage now stands at ten persona-runs** (Maggie x3, Lena, Sam, Ellen, Alex Marin, Alex Harper, Alex Cartwright, Oliver Stein, Alex Finch) across genuinely-different reader-shapes. The methodology has been exercised across most plausible axis-types; future /play runs can drop the explicit discipline-test framing and operate on specific in-flight design questions rather than methodology validation.

Cost summary: persona build (~$0.005) + 3 turns (~$0.015 + ~$0.04 turn 3 gpt-5) ≈ **~$0.06 total**. Day-of cumulative (2026-04-28): ~$2.34 of $5.

The night's last /play run produced the night's most uncomfortable verdict for me specifically — a critique of work I authored hours ago, held at the report-writing structural level under the discipline shipped earlier the same evening.
