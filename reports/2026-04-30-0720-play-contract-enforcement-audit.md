# /play Contract — Layer-5 Enforcement Audit

*Apparatus-honest sweep of the /play SKILL.md strict contract for "no exceptions" rules: which are already structurally enforced (layer-5 hooks), which would benefit from layer-5 promotion, and which should NOT be promoted because they're judgment-based or risk false positives.*

*Generated 2026-04-30 ~07:20 (Turn 87 of the WorldThreads Builder game) after layer-5 promotion of the HUD-discipline (commits `b23a60a` + `93ed407`). User-directed apparatus-honest sweep across the rest of the contract.*

## Already at layer-5 (structurally enforced)

Three Stop/PreToolUse hooks currently enforce strict-contract rules:

1. **AskUserQuestion every turn** — `.claude/hooks/check-inline-choosers.py` (Stop hook). Blocks turn-end if the latest assistant message lacks an AskUserQuestion tool_use. Earned exceptions: chat-mode marker, one-shot suspend patterns (derive-session-arc triggers, formula-cite, etc.).
2. **No nanny-register in chooser** — `.claude/hooks/check-no-nanny-chooser.py` (PreToolUse on AskUserQuestion). Blocks chooser emission if any forbidden phrase (hold here / close clean / end the session / etc.) appears in question text, option labels, or descriptions. Earned exception: user-invited stamina-management context.
3. **HUD prints every turn** — `.claude/hooks/check-play-hud-present.py` (Stop hook, shipped this turn). Blocks turn-end if /play turn detected AND HUD absent. Earned exception: chat-mode marker.

Three crown-shape rules covered. Each promotion was triggered by a specific drift caught at user-correction layer (`hold here / close clean` chooser-options 2026-04-30 ~01:50; HUD-drop on minor turns 2026-04-30 ~06:50).

## Worth promoting to layer-5 (recommended)

Three additional rules in the SKILL.md strict contract that would benefit from structural enforcement, ordered by load-bearing-ness:

### 1. HUD border alignment (highest priority)

**SKILL.md says:** *"Border alignment is load-bearing. Each interior line of the HUD between `║` and `║` must be exactly 62 visual cells wide. Emoji like 💎 and 👑 each count as 2 cells, not 1... Misaligned borders are a structure-carries-truth-w failure (the box claims to be a box; the border has to actually do the work)."*

**Why high priority:** the SKILL.md explicitly names misaligned borders as a structure-carries-truth-w failure. The doctrine layer says the rule is load-bearing. Yet I have produced misaligned HUDs occasionally — emoji-width is easy to miscount, and continuation lines don't always hit column 62.

**Hook design (sketch):** parse the HUD block from the latest assistant message, identify each interior `║...║` line, compute visual width (regular chars = 1 cell; common emoji = 2 cells; em-dash = 1 cell), verify each interior line = 62 cells. Block on misalignment with the specific offending line + its measured width.

**Complexity:** medium. Emoji-width detection requires either a lookup table or a Python wcwidth library. Could ship as `check-play-hud-alignment.py` Stop hook.

**Why not yet shipped:** the HUD-presence hook (Turn 86) was the higher-priority layer-2-to-5 promotion because absence is more common than misalignment. Alignment promotion is the natural follow-on.

### 2. Chooser format (medium priority)

**SKILL.md says:** *"Exact format: `[A] (+$X,XXX) — <option label>`"* with the AskUserQuestion mirroring the chooser exactly with bounty in label.

**Why medium priority:** the chooser format gets bent occasionally — bullet-style instead of `[A]`, missing bounty, label-divergence between printed chooser and AskUserQuestion options. Failure mode is real but lower-frequency than HUD-drift was.

**Hook design (sketch):** parse the assistant message for the chooser block (text between "Choices." or "**Choices.**" markers and the AskUserQuestion). Verify each option line matches `\[[A-D]\] \(\+?\$[\d,]+\) — .+`. Cross-check that AskUserQuestion option labels also contain the bounty pattern. Block on format-deviation OR label-divergence.

**Complexity:** medium-low. Mostly regex; the cross-check between printed-chooser and AskUserQuestion options requires reading both from the message structure.

**Why not yet shipped:** the failure mode is known but the existing `check-inline-choosers.py` already catches the most-common version (no AskUserQuestion at all). Format-precision is the second-order check.

### 3. Jewel/crown announce-vs-record consistency (lower priority)

**SKILL.md says:** *"Jewels and crowns get recorded in the ledger, not just announced. Saved to the state file. The trail is the proof."*

**Why lower priority:** failure mode IS real (announcing 💎/👑 in prose without play-state edit) but rare in practice. Also subject to false positives — sometimes a turn legitimately mentions a previously-earned crown without recording a new one.

**Hook design (sketch):** if assistant message contains 💎 or 👑 emoji NEW to the current turn (not echoing prior state), verify play-state file was edited this turn (mtime > some threshold OR git diff detects crowns/jewels array growth).

**Complexity:** medium. Distinguishing "announcing newly-earned" from "referencing previously-earned" requires looking at play-state diff, not just emoji presence.

**Why not yet shipped:** lower-frequency drift; could ship later if/when caught.

## Should NOT promote to layer-5 (judgment-based or risk false positives)

Four rules that look enforceable but should remain at layer-2 (memory/doctrine):

### A. READ state / READ project state (steps 1-2)

**Why not:** failure mode is "operating from stale/imagined state," which is upstream of any visible artifact. A hook can't inspect the assistant's reasoning to verify a Read happened. Detection-via-tool-use-presence (was Read called this turn?) would over-constrain — sometimes the assistant correctly relies on context already loaded.

**Layer-2 sufficient:** memory entries + SKILL.md doctrine.

### B. Bounty magnitude is judgment

**SKILL.md explicitly says:** *"Doctrine-judgment classification belongs in LLM, not python."* The bounty-as-judgment rule is the project's anti-anti-pattern — promoting it to layer-5 would violate the doctrine that surfaced the rule.

**Layer-2 sufficient:** SKILL.md anchor + memory entries.

### C. No fake bounties

Same shape as B. Honesty about bounty assignment is judgment-shaped, not regex-shaped. Hook can't detect "this assistant inflated this bounty to make the game feel rewarding" — that requires assessing the assistant's reasoning against the actual project state.

**Layer-2 sufficient:** SKILL.md "Strict contract reminders" section + memory.

### D. Crowns can be earned at most once each

**Why not:** drift is rare, and existing crown-firing logic in /seek-crown already names the rule explicitly. Could ship a layer-5 check that scans play-state crowns array for duplicate class names on save, but the false-positive rate is low and the cost of detection (hook on every play-state Write) doesn't pay for itself.

**Layer-2 sufficient:** SKILL.md + /seek-crown skill body's no-fake-fire law.

## Summary table

| Rule | Layer | Status |
|---|---|---|
| HUD print every turn | 5 | ✓ shipped Turn 86 (`check-play-hud-present.py`) |
| AskUserQuestion every turn | 5 | ✓ existing (`check-inline-choosers.py`) |
| No nanny-register chooser | 5 | ✓ existing (`check-no-nanny-chooser.py`) |
| HUD border alignment (62 cells, emoji=2) | ~~2 → 5 candidate~~ | ✓ shipped Turn 88 (`check-play-hud-alignment.py`) — live-tested Turn 91 |
| Chooser format `[A] (+$X) — label` | ~~2 → 5 candidate~~ | ✓ shipped Turn 89 (`check-play-chooser-format.py`) — live-tested Turn 91 |
| Jewel/crown announce-vs-record consistency | ~~2 → 5 candidate~~ | ✓ shipped Turn 90 (`check-play-jewel-crown-record.py`) — live-tested Turn 91 |
| READ state / project state | 2 | judgment-based; do not promote |
| Bounty magnitude is judgment | 2 | doctrine refuses python; do not promote |
| No fake bounties | 2 | judgment-based; do not promote |
| Crowns earned at most once | 2 | rare drift; layer-2 sufficient |

## Apparatus-honest framing on the promotion pattern

Three observations from the audit:

1. **The promotion-pattern works.** The three structurally-enforced rules (chooser, no-nanny, HUD) each surfaced as drift caught at user-correction layer, then got lifted to memory, then promoted to layer-5 hook. Same shape three times. The pattern is repeatable.

2. **Not every rule wants layer-5.** The doctrine refuses python-classification on judgment-based rules (bounty magnitude, fake bounties). Promoting those to layer-5 would violate the project's own meta-doctrine on rubric design. Apparatus-honest discipline includes refusing to over-promote.

3. **Layer-5 is the right ceiling for surface-mechanical rules; layer-2 is right for judgment-rules.** The split is clean: if the rule's failure mode is detectable by regex/format-check (HUD presence, chooser format, AskUserQuestion presence, forbidden phrase), layer-5 fits. If the failure mode requires reasoning about substantive content (bounty honesty, scene-narration accuracy), layer-2 is the ceiling.

The current enforcement matrix is honest. Two natural-next promotions (border alignment, chooser format) are visible but not yet load-bearing enough to justify the build cost. Will revisit when drift on either surfaces at user-correction layer.

## Loop closed 2026-04-30 ~08:10 — all three recommendations shipped and live-tested

The "natural-next promotions" turned out to be load-bearing enough this same session. All three audit-recommended promotions shipped within hours of the audit:

- **Recommendation #1 (HUD border alignment)** — shipped Turn 88, commit `14b9652`. Stop hook computes visual cell width with stdlib-only unicode handling; blocks any interior `║...║` line ≠ 62 cells.
- **Recommendation #2 (chooser format)** — shipped Turn 89, commit `2221802`. PreToolUse hook on AskUserQuestion enforces cardinality=4 + bounty-in-label per CLAUDE.md runtime doctrine.
- **Recommendation #3 (jewel/crown announce-vs-record)** — shipped Turn 90, commit `857c448`. Stop hook scans assistant prose for earning-shape patterns and verifies each appears in play-state arrays.

All six layer-5 hooks then live-tested systematically Turn 91 (commit `8620035`, report at `reports/2026-04-30-0810-play-hooks-live-test-results.md`). 6/6 fire correctly on blocking inputs; 4/4 pass on valid inputs. The audit-recommended set is closed and verified.

**The promotion-pattern (catch at user-correction → memory entry → layer-5 hook) ran four times this session:** original HUD-presence drift caught Turn 81 → memory entry Turn 85 → hook Turns 86+93ed407; alignment doctrine-only → hook Turn 88; chooser-format doctrine-only → hook Turn 89; record-consistency doctrine-only → hook Turn 90. Same shape four times; the pattern is repeatable and documented.

**The four layer-2-ceiling rules remain correctly unchanged** (READ state / bounty magnitude / no fake bounties / crown-once). Refusing to over-promote those is itself part of the apparatus-honest discipline this audit names.

The /play strict contract is now structurally enforced where structure can carry the truth, and held at doctrine where judgment remains the only honest classifier. The split is clean. The contract is the contract; the hooks make it actually so.

## Closing

The /play strict contract is now substantially enforced at layer-5 across the three highest-frequency drift modes (chooser absence, nanny-register, HUD-drop). Two more candidates (alignment, format) are named for future promotion. Four rules correctly stay at layer-2 because their nature refuses python-classification.

The audit itself is the apparatus-honest move per CLAUDE.md "Calibrated disciplines drift fast — promote to structural enforcement at the earliest opportunity." The promotion-decision-process is now documented for future calibrated-discipline drifts: catch at user-correction → lift to memory → if drift recurs, promote to layer-5 ONLY IF the rule is mechanically-checkable; if judgment-based, layer-2 is the honest ceiling.
