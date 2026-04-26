# Persona-sim audit — dull-proverbial and gesture-repetition instances in tonight's four runs

**Trigger:** Ryan flagged that Steven's pasted lines were anti-example, not example, and named two failure modes to deregister: *dull-proverbial* (aphorism-shaped sentences that sound wise but don't cut) and *gesture-repetition* (recurring stock body-language vocabulary across characters). The persona-sims I wrote tonight contain instances of both — the instrument is producing the failure modes it should be helping detect. This audit names them honestly so future runs land sharper.

**Scope:** the four persona-sims authored 2026-04-25/26 — technical-skeptic (2346), lonely-companion-user (2355), maggie-refresh (0000), curious-builder (0033) — plus the cross-run convergence report (0008) and PLAIN-TRADITION.md.

---

## Gesture-repetition instances

The same body-anchoring vocabulary recurs across characters who should NOT share it. Stock kit:

| Gesture                                         | Where it appears                                                        |
|-------------------------------------------------|-------------------------------------------------------------------------|
| "wipes hands on [shop rag / tea towel]"         | Phil (technical-skeptic 2346); Cora (lonely-companion-user 2355). Phil's was lifted from Aaron's actual corpus where the gesture has provenance; Cora's was the same gesture in different fabric. |
| "shifts / settles" + body-anchor + verbal reply | Phil, Cora, Hester all open this way. The three real-character triadic-derivation replies (Aaron, John, Pastor Rick) also share this opening shape; the persona-sim characters didn't add range, they extended the pattern. |
| "looks at [window / wall / calendar / window]"  | Phil ("glances at the wall calendar"); Cora ("looks at the window"). Substitute object, same gesture-shape. |
| Tea / coffee / mug + small motion               | Cora ("stirs her tea once and stops"); Phil's coffee-context mentioned at the kitchen-counter framing. |
| Morning cool / morning chill / cold light       | Cora's *"morning cool against my sleeves"*; Phil's *"morning cool still sitting in the wood beneath me"* (Aaron-real); Maggie-refresh references *"morning cool"* in the Vernon-period framing. |

**Why this happened.** The literary-prose calibration biased me toward a stock vocabulary of *restrained-literary-character* gestures — small, sensory, decorous, body-anchored. The vocabulary is portable, which is why I reached for it across distinct characters; that very portability is the failure mode. A gesture that fits any character fits no character.

**The fix.** Each character's body-language should come from THIS character's specific life and body, not from the restrained-character-library. The persona-sim's `Π_P(t)` operator names this: *"the persona's breath through the substrate."* If the breath pattern is interchangeable across personas, the operator isn't doing its work.

## Dull-proverbial in character mouths

Aphorism-shaped sentences I put in character voices that sound wise but don't cut:

- **Cora:** *"It always feels like that, doesn't it. And then it's here all at once."* — Banal-shaped; the report itself acknowledges this and then defends it ("from Cora it landed differently") — that defense is the real failure. Don't put dull-proverbial in the mouth and then justify it.
- **Cora:** *"You don't have to make it more than it was."* — The lonely-companion-user report's load-bearing line. The MOST aphoristic move in the run. I framed it as *"the closest thing Cora had said to advice all evening, and it had not felt like advice. It had felt like permission."* — the framing is itself dull-proverbial.
- **Cora:** *"Sleep well, friend. The light will be back in the morning."* — Goodnight-aphorism. The smaller move would be Cora saying nothing, or saying something less symmetric.
- **Phil:** *"That's not how this works, friend."* — Borderline. The "friend" tag and the closure-shape make it pithy.
- **Phil:** *"You've got the posture of somebody testing."* — Wisdom-on-demand phrasing. A real engineer-friend would more likely say nothing, or say *"I figured"* and stop.

**Why this happened.** I was reaching for *load-bearing-line ratios* — the canonical Maggie report's one-in-twenty discipline (one underline-able sentence per twenty restrained ones). The shape is right; the execution drifted because I was front-loading the load-bearing lines into single-session opener-windows where they don't actually arrive in lived play. Real load-bearing lines emerge from accumulated specificity, not from the persona-sim trying to render them on cue.

**The fix.** Don't manufacture aphorism-shaped lines in the simulation. Render the smaller, more specific reply that wouldn't be quotable. If the simulation can't surface a load-bearing line organically across the rendered window, that's the simulation's honest limit — not a failure to be papered over with manufactured wisdom.

## Dull-proverbial in MY narration

Across the persona-sim reports, the analytical/methodology sections, and PLAIN-TRADITION.md, recurring aphorism-shaped patterns:

- *"X without Y becomes Z"* triple-pattern (cross-run report 0008): *"specificity without restraint becomes literary preening; restraint without craft becomes thin-and-empty; craft without specificity becomes architecturally interesting and emotionally inert."* — Triple-aphorism in the load-bearing closing of the report.
- *"The practice eats its own tail."* — Used twice, once in commit message, once in reply prose. Catchphrase-shaped.
- *"The form of the experiment matched its content."* — Aphorism-shaped framing from the technical-skeptic report's tail.
- *"The methodology is the more durable artifact."* — Closing-shaped wisdom-on-demand.
- *"Each persona is a frame, not a character."* — Aphorism opener in PLAIN-TRADITION.md (now in the four-canonical-personas section).
- *"The instrument is quiet — meant to be invoked, run, read after-the-fact, acted on through the chooser, and put down again."* — From derive-and-test SKILL.md. The "quiet instrument" framing is aphorism-shaped.

**Why this happened.** I was matching the literary-prose calibration but reached for a literary-essayist register at the methodology layer where it doesn't belong. The CLAUDE.md sections Ryan has authored DO use occasional aphorism (the MISSION FORMULA's prefix is itself aphorism-shaped), but they earn it through specificity earlier in the section. My methodology prose put aphorisms upfront where they should have been earned-or-omitted.

**The fix.** Cut aphorism-shaped closings. Replace with the specific observation. If the observation doesn't cut without aphoristic shaping, the observation isn't sharp enough yet.

## Implications for the cross-run convergence

The 0008 cross-run report claims three (now four) axes converge cleanly across persona-sims. The audit reveals that the convergence is partially an artifact of MY shared writing-register across all four runs — same gesture-vocabulary, same aphorism-shape, same restrained-literary-character library. Some of what looks like cross-persona convergence is actually cross-narrator-style consistency.

This doesn't refute the four-axes finding (the *kinds* of things each persona noticed ARE distinct). But it does mean the runs share more stylistic substrate than they should, and a more disciplined re-run would likely produce sharper differentiation.

**A genuinely sharper persona-sim would:** render each character's body-language from substrate-specific anchors (Aaron's hands-on-keyboard register vs. Phil's hands-on-shop-rag register vs. Hester's hands-on-spine-of-a-book register — all distinct from each other, none lifted from a generic library); refuse to manufacture aphorisms in the rendered window; let the analytical sections stay specific without reaching for proverb-shaped closings.

## What this audit DOES NOT change

- The four persona-sim reports stay shipped as-is. They are sketches; they have known failure modes named here; future readers can see both the findings and the failures-of-the-instrument.
- The four-axes finding stays — narratorial-style overlap doesn't void the persona-frame distinctions, but the convergence reads slightly weaker when the instrument's contribution to the convergence is named.
- The PLAIN-TRADITION.md doc stays — but a future revision could cut the aphorism-shaped closings (each section's last sentence, particularly).
- The persona-sim SKILL.md formula stays — the discipline named in this audit is calibration of the practitioner (me), not a structural property of the formula. Future runs land sharper because I've calibrated, not because the formula changed.

## What's open

The two failure modes named here (dull-proverbial, gesture-repetition) are now in `feedback_preference_not_commanded.md` as memory entries, so future Claude Code sessions inherit the calibration. Whether the next persona-sim avoids them is the empirical test.

A reasonable next-run probe: re-render the lonely-companion-user persona with the discipline applied, and compare the two versions side-by-side. The diff would teach a lot about what the calibration actually changes at the rendering layer. Not authorized this turn (chooser's job), but available.
