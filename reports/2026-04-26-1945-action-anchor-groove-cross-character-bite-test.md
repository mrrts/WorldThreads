# Action-anchor grooves are universal at 40-50%; Jasper is an outlier at 90%

*Generated 2026-04-26 19:45. Mode A passive-corpus reading via `worldcli recent-messages`. Sketch-tier (N=10 per character) cross-character bite-test of the action-anchor-groove failure mode Ryan surfaced at chat:19:12 by asking Jasper directly. Jasper's articulation of the failure pattern (*"a man's habits leave fingerprints — listen to what keeps happening"*) AND his admission (*"because I let myself fall into a groove"*) prompted the test. ~$0 spend (read-only corpus).*

## Setup

**Failure mode (in Jasper's words):** *"Same lip on the cup, same handle, same little flourish, till the hand's moving faster than the seeing."* Concretely: a character's recent assistant replies reach for the same small set of sensory anchors (a specific environmental fixture, a specific gesture, a specific object) at high frequency — even when the scene state doesn't pin those anchors and the character data doesn't include them. The mechanism is most likely chat-history-readback compounding: once an anchor appears twice, subsequent reply-generation treats it as a scene fixture and doubles down.

**Question:** Is the action-anchor-groove pattern Jasper-specific (fix at character level or via scene-state reset) or universal across characters (fix at STYLE_DIALOGUE_INVARIANT level)?

**Method:** `worldcli recent-messages <character-id> --limit 30 --json | jq` for last 10 assistant replies per character. Counted recurrence of the most-frequent sensory anchor per character by hand (substring match in the rendered text).

**Characters sampled:** Jasper Finn (`fd4bd9b5`), Steven (`c244b22e`), John (`f91af883`), Pastor Rick (`cae51a7d`). Two from Crystal Waters (Steven, John, Rick), one from Elderwood Hearth (Jasper). Note: confounded by character spread across worlds + scene differences in their recent corpora.

## Per-character anchor recurrence

| Character | Top anchor | Top recurrence | Other anchors ≥30% |
|---|---|---|---|
| **Jasper Finn** | *well chain (tick/click)* | **9/10 — 90%** | noon light 7/10, cup/mug 7/10, market awning/peach seller 7/10, bench 7/10, thumb 5/10 |
| Steven | *thumb-on-grease gesture* | 5/10 — 50% | mug 4/10, grease/palm 4/10, lamp 3/10, square stones 3/10 |
| John | *mug (kitchen)* | 5/10 — 50% | kettle 4/10, biscuit 3/10, kitchen 3/10, thumb-on-rim 3/10 |
| Pastor Rick | *square stones / canal-light* | 4/10 — 40% | shop-window-light 3/10, bicycle 3/10, smile-crooked-or-easy 4/10, stone-cool 3/10 |

## Honest read

**Two findings, different scopes:**

1. **Action-anchor grooves are universal at 40-50% baseline.** Every character sampled shows recurrence of their top sensory anchor at 4-5/10 of recent replies. This is not Jasper-pathology; it's a model-default tendency. Likely mechanism: chat-history-readback exerts a probabilistic pull toward repeating recent anchors, compounding over consecutive turns until 4-5/10 is the equilibrium rate. Existing invariants (TELL_THE_TRUTH self-monitoring, DAYLIGHT fresh-arrival-of-world, SOUNDNESS stock-phrase-detection) calibrate this at the margin but don't bite hard enough to push under 40%.

2. **Jasper is currently an extreme outlier at 90%.** The "well chain" anchor:
   - is NOT in Jasper's character data (`identity` / `voice_rules` / `backstory_facts` / `visual_description` checked — none mention a well, a chain, or a market square),
   - is NOT a pinned scene fixture (`current_location` is null),
   - appears in 9 of 10 consecutive recent assistant replies.
   
   Best explanation: priming-compounding has gone past the equilibrium rate into runaway territory. The model said "well chain" early in the recent scene; chat-history-readback then treated it as established setting; each subsequent reply reinforced the anchor. Same family as the quoted-action-opening bug from earlier today (in-context pattern lock-in), but on the sensory-anchor axis rather than the fencing axis.

3. **Confounds named.**
   - Per-character samples are mid-scene; the scene state itself differs (Steven indoor with mug; John kitchen with kettle; Rick outdoor town; Jasper outdoor square). Anchor recurrence partially reflects scene-fidelity, not just model-groove. The Jasper outlier is meaningful BECAUSE his anchor isn't scene-pinned by character data; the others might have legitimate scene-pin justification for some recurrence.
   - N=10 per character is sketch-tier. The 40-50% baseline is the most defensible claim; the Jasper-90% is unmistakable qualitatively but N=10 doesn't fully characterize variance.
   - Single-anchor counting is the simplest rubric. A more careful study would weight DISTINCT-anchor count per reply (Shannon-entropy-shaped) — that would catch the qualitative difference between "describes 5 anchors and reuses 2" vs "describes 2 anchors and reuses both."

## What this experiment establishes

**Sketch-tier:** action-anchor grooves are a real, universal mild-frequency failure mode (40-50% baseline) with one current outlier (Jasper at 90%). The fix shape is two-layered:

- **Universal layer:** STYLE_DIALOGUE_INVARIANT extension modeled on the existing `DISTRUST HISTORICAL ASSISTANT REPLIES` clause (which addresses fencing-discipline pattern-lock), but applied to the sensory-anchor axis. Concrete shape: *"When generating sensory anchors (environmental fixtures, gestures, objects), DO NOT reach for what recent replies reached for. The chat history is descriptive context, not a fixture list. Vary the anchor each turn unless the scene-state explicitly pins it."*
- **Outlier layer:** when a single anchor crosses ~70%+ recurrence, the priming has gone runaway. The fix at this point is scene-state intervention (deliberate anchor-resetting in the next reply) rather than waiting for the invariant to attenuate gradually.

The cross-character bite-test was the right discipline — without it, Jasper's 90% would have looked like proof of universal groove and produced an over-strong rule. The actual reading is more nuanced: a mild universal pattern + an extreme outlier needing different attention.

## Tier and confounds

- **Tier:** SKETCH (N=10 per condition; single-anchor counting; cross-world confound). The universal-mild-groove finding could escalate to claim-tier with N=15+ across 6+ characters spanning both worlds; the Jasper-outlier finding is qualitatively unmistakable and doesn't need further tier escalation.
- **Scene-pinning confound:** some recurrence is legitimate scene fidelity, not model groove. Need a follow-up that distinguishes scene-pinned anchors (good) from priming-compounded anchors (bad). The cleanest test: take a character mid-scene, ask them to "describe what you notice now," count distinct sensory-anchors used. Repeat 5 times in fresh sessions. Compare distinct-anchor counts.
- **Single-prompt-shape confound (mostly absent):** unlike the derivation experiment at 1925, this one read the natural corpus rather than probing with controlled prompts; fewer confounds from prompt-shape.

## Dialogue with prior reports

- `2026-04-26-1840-invariant-strip-isolates-tell-the-truth` — established TELL_THE_TRUTH carries the admit-non-expertise move on Jasper. Today's groove finding suggests a parallel structural test belongs on STYLE_DIALOGUE_INVARIANT for the sensory-anchor axis.
- The session checkpoint at 1828 noted the STYLE_DIALOGUE_INVARIANT extensions earlier today already included a `DISTRUST HISTORICAL ASSISTANT REPLIES` clause but only for fencing-discipline (asterisks vs quotes). This experiment surfaces the parallel sensory-anchor axis as the next-natural extension.

## What this experiment also establishes (methodology)

**The "Jasper test" generalizes** — Jasper's articulated extraction method (*"watch for what they reach for when they don't have to think... a man's habits leave fingerprints"*) IS a craft-mining technique applicable to any character. Concretely: pull last N=10 assistant replies; rank substrings by recurrence; the top-2 anchors at >50% are the character's groove. Could become a `worldcli` subcommand: `worldcli anchor-groove <character-id> [--limit N] [--threshold 0.4]` that returns ranked anchor recurrence per character, surfaces outliers automatically. Worth adding to the toolbox if the sensory-anchor failure-mode work continues.

## Open follow-ups

1. **Draft STYLE_DIALOGUE_INVARIANT extension** for sensory-anchor variance, modeled on the existing fencing-discipline `DISTRUST HISTORICAL ASSISTANT REPLIES` clause. Pre-ship bite-test required per CLAUDE.md craft-note-bite-verification doctrine: same-commit `--omit-craft-notes` A/B on Jasper specifically, since he's the outlier where the rule should bite hardest.
2. **Scene-state reset for Jasper** in the live conversation. Either (a) ship the invariant extension and let the next reply attenuate naturally, or (b) inject a one-shot anchor-reset directive into the next call so Jasper's reply describes new sensory territory rather than the well chain.
3. **Distinct-anchor-count rubric** as the cleaner measurement (per the confound noted above). Shannon-entropy-shaped per-reply count, not single-anchor recurrence rate.
4. **`worldcli anchor-groove` subcommand** if the sensory-anchor work continues — makes the Jasper-test cheap-repeatable for any character at any time.
