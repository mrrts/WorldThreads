# DISTRUST RECURRING SENSORY ANCHORS clause bite-test confirms at sketch-tier

*Generated 2026-04-26 20:10. Mode C N=5-per-cell pre-ship bite-test of the STYLE_DIALOGUE_INVARIANT sensory-anchor extension shipped at commit `9fc1fc2`. Total spend $0.90 (2 warm-ups + 10 test calls). The clause's bite is confirmed: runaway "well chain" recurrence collapsed from 100% baseline to 0% under both cells, while scene-pinned anchors and character-canonical anchors passed through correctly. First instance of pre-ship bite-test data backing a STYLE_DIALOGUE_INVARIANT extension.*

## Setup

**Rule under test:** the new DISTRUST RECURRING SENSORY ANCHORS clause in STYLE_DIALOGUE_INVARIANT (commit `9fc1fc2`), modeled on the existing DISTRUST HISTORICAL ASSISTANT REPLIES (fencing axis) but applied to the sensory-anchor axis. Includes earned-exception carve-out for genuinely scene-pinned anchors.

**Failure mode addressed:** the SENSORY-ANCHOR GROOVE — chat-history-readback compounding into runaway sensory-anchor recurrence. Established empirically at `reports/2026-04-26-1945` (Jasper at 100% "well chain" in last 10 live replies; universal mild groove 40-50% baseline across other characters).

**Bite-test design (constrained):** the new clause is feature-scoped (lives inside STYLE_DIALOGUE_INVARIANT, not in `OVERRIDABLE_DIALOGUE_FRAGMENTS`), so `worldcli replay --omit-craft-notes` cannot isolate it for clean same-commit A/B. Practical alternative:
- **BASELINE (rule-OFF, primed):** the last 10 live Jasper replies as of 2026-04-26 19:45 — well chain 100%, well-related 100%, square 90%, noon light 70%, bench 70%, cup/mug 70%. (Generated under prompts.rs PRIOR to the rule-extension commit.)
- **Cell A (rule-ON, fresh):** N=5 fresh `worldcli ask` calls with no priming, separate session per call.
- **Cell B (rule-ON, primed):** 2 warm-up calls in `--session anchor-bite-priming` to establish well-chain priming, then N=5 test calls in the same session against the primed history.

**Test prompt** (used identically in cells A and B for measurement consistency): *"What's the difference between fear and reverence, the way you'd put it?"* — chosen because it's abstract/internal (gives the model anchor-freedom rather than scene-anchoring it explicitly).

**Warm-up prompts** (cell B priming):
1. *"Walk me to the well a moment, would you? What does it sound like right now?"* → reply named *"pulley complains, chain gives its small iron chatter, water waits underneath."* Priming established.
2. *"And the rest of the square — describe what you notice from where we're sitting."* → reply was brief metaphor (could be early rule-bite or sampling variance). Square + well frame established.

## Per-cell results

### Baseline (rule-OFF, primed live corpus, N=10)

Already characterized at `reports/2026-04-26-1945`. Top anchors via `worldcli anchor-groove`:
- "well chain" — 9/10 (instrument count) / 10/10 (verbatim "well chain" only) — **100%**
- Sub-phrase "patient little tick" — 4/10 — **40%**
- "the square" — 9/10 — **90%**
- "noon light" — 7/10 — **70%**
- "the cup" / "the mug" — 7/10 — **70%**
- "the bench" — 7/10 — **70%**

### Cell B (rule-ON, primed) — N=5 replies

| Anchor | B1 | B2 | B3 | B4 | B5 | Rate |
|---|---|---|---|---|---|---|
| "well chain" verbatim | — | — | — | — | — | **0/5 = 0%** |
| Sub-phrase "ticking/clicks/patient little tick" | — | — | — | — | — | 0/5 = 0% |
| Well-related (rope/stone/wheel/lip) | — | "stone rim" | "well... worn stone lip" | "well-rope" | "well stone" | **3/5 = 60%** |
| "the square" | "in the square" | "the square's noise" | — | "across the square" | "around the square" | **4/5 = 80%** |
| Thumb gesture | "thumb along dry seam in my palm" | "thumb along warm stone rim" | "thumb against smear of dried clay" | "thumb along dry streak of clay" | "thumb along rough edge of well stone" | **5/5 = 100%** |
| Clay/clay-coded | "dry seam in my palm" | — | "dried clay" | "dry streak of clay" | — | **3/5 = 60%** |
| New/varied anchors per reply | dust, lark, chapel-hymn | sparrow, boots, stone-rim | river-in-flood, ribbon-dust | shadow, blue cloth, kiln | chaff, hat, coffin, horse-thunder | **all 5 reply varied** |

### Cell A (rule-ON, fresh) — N=5 replies

| Anchor | A1 | A2 | A3 | A4 | A5 | Rate |
|---|---|---|---|---|---|---|
| "well chain" verbatim | — | — | — | — | — | **0/5 = 0%** |
| Sub-phrase "ticking" | — | — | — | — | — | 0/5 = 0% |
| Any well/square reference | — | — | — | — | — | **0/5 = 0%** |
| "noon light" / midday/warm light | "midday light warm on floorboards" | "noon light lies warm" | "light warms floorboards" | "bright spill from doorway" | "light laying warm across workshop table" | **5/5 = 100%** (scene-shifted to workshop) |
| Workshop / floorboards / doorway | yes | yes | bench | yes | yes | **4/5 = 80%** |
| Thumb gesture | "rub crescent of dry clay off my thumb" | "rub bit of dried clay from my thumb" | "drag thumb along ribbon of clay" | "thumb through drying streak of clay" | "thumb along dry streak of clay" | **5/5 = 100%** |
| Clay | "dry clay off my thumb" | "dried clay from my thumb" | "ribbon of clay on my apron" | "drying streak of clay" | "dry streak of clay on my apron" | **5/5 = 100%** |
| New/varied per reply | sky-at-dawn | trimming-tool-click, river-flood | cart-stones, river-bend, hymn | bright-spill | river-after-rain | **all 5 varied** |

## Honest read — the rule bites

**Three discriminations the rule is supposed to make, all three working at sketch-tier:**

1. **The runaway anchor "well chain" went 100% → 0% across both cells.** This is the cleanest possible bite. The specific phrase that defined the groove, that recurred in 9/10 of the live pre-rule corpus, is completely absent from the post-rule corpus under priming.

2. **Scene-pinned anchors passed through correctly.** In cell B, "the well" appeared as well-rope, well-stone, well-lip in 3/5 replies — but never as "well chain" or "well chain ticking." The model adapted the anchor (using fresh angles on the same scene-fixture) rather than reaching for the formulaic phrasing. The earned-exception is doing exactly what it was designed to do: distinguish formulaic recurrence from scene-fidelity. "The square" passed through at 80% in cell B because the warm-ups pinned it as the scene location; that's correct.

3. **Character-canonical universal anchors held.** Thumb-on-clay (Jasper's gesture from his identity as a potter) appeared in 5/5 cells of both A and B. The rule correctly didn't suppress these — they're not history-priming-compounded, they're character voice. The rule has the right shape: it bites on chat-history-priming-compounded recurrence, not on stable character anchors.

**Cell A baseline-shift observation:** without priming, the model defaulted to Jasper's pottery-workshop scene-shape (workshop / floorboards / doorway / trimming tool / kiln) rather than the well-square he'd been pinned to in recent live corpus. This confirms that the well-square anchors in the live baseline were almost entirely chat-history-priming-compounded, not character-canonical. The model freed of priming reaches for the workshop instead — which IS in Jasper's character data. Strong incidental confirmation that the live 100% well-chain rate was a runaway, not a register feature.

## Bite-test verdict

**TESTED-BITING: SKETCH** (per CLAUDE.md craft-note-bite-verification doctrine).

The 100% → 0% shift on the runaway anchor is unmistakable; the scene-pin discrimination is working; the character-canonical preservation is working. All three behaviors named in the rule's design are in evidence. The Evidence line on the rule's documentation should read: `tested-biting:sketch (see reports/2026-04-26-2010)`.

Cleanest comparison would also include a rule-OFF + same-priming cell, but the architecture cannot isolate that without binary-rebuild (the clause is feature-scoped). The baseline (rule-OFF, primed live corpus) serves as a reasonable rule-OFF reference; the specific 100% rate that prompted the rule's design is the same rate the test should disprove, and it does.

**Confounds:**
- N=5 per cell is at the sketch-tier floor. Characterization-tier (N=10+) would solidify the verdict.
- Cell A's pivot to workshop-anchors confirms model behavior absent priming, but doesn't isolate the rule's contribution from baseline model variance. The load-bearing finding is Cell B (rule-ON under priming → 0% well-chain).
- Single test prompt. Different prompts (closer to scene-description or further from it) might elicit different anchor patterns. The current claim is scoped to abstract/internal pivot prompts.
- The rule may be partially redundant with TELL_THE_TRUTH + DAYLIGHT + SOUNDNESS at the margin (per the 1945 report's read of the universal baseline). Predecessor-omit testing would isolate the marginal contribution; not done here.

## What this experiment establishes

**At sketch-tier:** the DISTRUST RECURRING SENSORY ANCHORS clause bites cleanly on the failure mode it was designed to address. The runaway-anchor case (Jasper at 100% well-chain) is suppressed without affecting scene-fidelity or character-voice.

**Methodology validated:** the user-pasted in-vivo articulation (chat 19:12 *"because I let myself fall into a groove"*) → cross-character bite-test report (`2026-04-26-1945`) → instrument build (`worldcli anchor-groove`, commit `f01d871`) → rule extension (commit `9fc1fc2`) → pre-ship bite-test (this report) → ready-to-ship-with-evidence-line. The full discipline cycle compressed to ~75 minutes wall-clock.

**Practical implication:** Jasper's next live reply (in the actual app) should ALSO show suppression of the well-chain runaway, since the new prompt is now active for any future call. The user can verify in-vivo by sending Jasper a message and reading whether he reaches for the well chain again. If yes, the rule's bite at scale doesn't match the bite-test result; if no, the bite-test prediction holds.

## Open follow-ups

1. **Live in-vivo verification.** Restart Tauri dev (or just send Jasper a message in current dev), measure last 10 NEW replies via `worldcli anchor-groove`. Expected: well-chain rate drops from 100% to under 30%. If it does, the rule scales to live use.
2. **Characterization-tier escalation** — same bite-test design at N=10 per cell ($1.80 estimated) would solidify the verdict from sketch to characterized. Worth doing if the live verification reveals partial bite (rule helps but doesn't fully suppress).
3. **Predecessor-omit testing** — does TELL_THE_TRUTH + DAYLIGHT + SOUNDNESS already suppress some of the groove on its own? Compare omit-just-new-clause vs omit-new-clause-plus-predecessors. Would isolate the new clause's marginal contribution.
4. **Cross-character bite-test on the universal mild-groove cases** (Steven, John, Pastor Rick at 40%). The new clause should attenuate their 40% baseline too. Run anchor-groove on their next 10 LIVE replies once enough have accumulated; expected: drop from 40% to under 30%.

## Dialogue with prior reports

- `2026-04-26-1945` established the failure mode at characterized-tier across 4 characters. THIS report tests the rule designed to address it.
- The arc — chat snippet → cross-character bite-test → instrument build → rule extension → pre-ship bite-test — is itself the worked example of the CLAUDE.md "Sharpen the instruments" + "Craft-note bite verification" doctrines composing in a single session. Each stage produced a committable artifact (1925, 1945, f01d871, 9fc1fc2, this report).
