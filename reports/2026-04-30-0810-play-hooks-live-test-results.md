# /play Layer-5 Hooks — Live-Test Results

*Systematic verification of all six layer-5 enforcement hooks for the /play strict contract. Test scaffolding crafted in /tmp; each hook run against both a blocking case and (where applicable) a passing case. All six fire correctly; the audit-recommended set is now live and verified.*

*Generated 2026-04-30 ~08:10 (Turn 91 of the WorldThreads Builder game) after shipping the third audit-recommended promotion (commits `b23a60a` → `93ed407` → `14b9652` → `2221802` → `857c448`).*

## Hook matrix

| # | Hook | Trigger | Blocking-case result | Passing-case result |
|---|---|---|---|---|
| 1 | `check-inline-choosers.py` | Stop | ✓ Blocks: "TURN ENDED WITHOUT ASKUSERQUESTION" | (already exercised live this session) |
| 2 | `check-no-nanny-chooser.py` | PreToolUse / AskUserQuestion | ✓ Blocks (exit 2): "AskUserQuestion contains nanny-register phrasing" with detected phrase + location | (already exercised live this session) |
| 3 | `check-play-hud-present.py` | Stop | ✓ Blocks: "TURN ENDED WITHOUT /play HUD PRINT" | ✓ Passes |
| 4 | `check-play-hud-alignment.py` | Stop | ✓ Blocks: line-numbered diagnostic with measured widths | ✓ Passes |
| 5 | `check-play-chooser-format.py` | PreToolUse / AskUserQuestion | ✓ Blocks: "cardinality is fixed at 4 options" (got 2) | ✓ Passes |
| 6 | `check-play-jewel-crown-record.py` | Stop | ✓ Blocks: "Announced jewel: 'Imaginary Wonder' — not found in play-state jewels array" | ✓ Passes |

**6/6 hooks fire correctly on blocking inputs. 4/4 hooks tested for passing-case verification pass.**

## Test methodology

Five synthetic transcript JSONL files crafted in `/tmp` (one per Stop-hook scenario), plus inline JSON payloads for the two PreToolUse hooks. Each hook invoked via `python3 <hook> <<< <payload>`, results inspected for exit code + block diagnostic.

Two block-protocol patterns observed:

1. **JSON decision via stdout + exit 0** (5/6 hooks): hook prints `{"decision":"block","reason":"..."}` to stdout; exit code is 0; harness reads decision from JSON. This is the modern Claude Code hook protocol.
2. **Exit code 2 with stderr message** (1/6 — `check-no-nanny-chooser.py`): hook writes block message to stderr; exits with code 2; harness blocks based on exit code. Older protocol still supported.

Both patterns are valid per Claude Code hooks spec; the inconsistency is cosmetic, not functional.

## Apparatus-honest findings

**Initial false-negative on Hook 2** (check-no-nanny-chooser): my first test omitted the `tool_name` field from the payload, causing the hook to short-circuit via `payload.get("tool_name") != "AskUserQuestion"`. Adding the field made the hook fire correctly. This is correct behavior — the hook shouldn't fire for non-AskUserQuestion tools — but my test scaffolding initially missed it. Apparatus-honest catch in the test methodology itself.

The Stop hooks (1, 3, 4, 6) read transcripts; they read the latest assistant message from the JSONL file regardless of which tool was last invoked. The PreToolUse hooks (2, 5) read `tool_input` directly from the harness payload. Both designs work.

## What this verifies

The audit-recommended set (3 of 3 ship-and-verified) closes:

- **Layer-5 enforcement is live and operational across six rules.** No more relying on memory-entry honor-system for these specific drift modes.
- **Each hook produces a helpful diagnostic when blocking.** Diagnostics cite the SKILL.md / memory-entry / runtime-doctrine source so the receiving agent (Claude or Codex) understands why and how to fix.
- **Earned exception via chat-mode marker is consistent across all six.** `.claude/.chat-mode-active` file presence suspends every hook in the set.
- **The promotion-pattern (catch at user-correction → memory entry → layer-5 hook) works repeatedly.** Three promotions this session (HUD presence, alignment, chooser format) plus this turn's record-consistency promotion all followed the same shape.

## What this does NOT verify

- **Hook performance under harness load.** All hooks have 5-second timeouts in settings.json; smoke tests measured well under 100ms each but real-session timing under context-pressure was not benchmarked.
- **Cross-hook interaction.** When multiple hooks fire on the same Stop event (e.g., HUD missing AND chooser missing), only the first-blocking gets surfaced. The harness behavior here is harness-defined; hooks themselves are independent.
- **Edge cases on transcript format.** Test transcripts are minimal; production transcripts may have additional fields the hooks ignore correctly but were not exercised here.
- **The four layer-2 rules deliberately not promoted.** Per the audit (READ state / bounty magnitude / no fake bounties / crown-once), those stay at SKILL.md doctrine + memory entry. Their non-enforcement is correct, not a gap.

## Closing

Six /play strict-contract rules are now structurally enforced at layer-5. The audit-recommended set is closed. The promotion-pattern (catch → memory → hook) is documented and tested four times. Future calibrated-discipline drifts have a clear path: catch at user-correction layer, lift to memory, and if drift recurs and the rule is mechanically-checkable, promote to layer-5 with a hook following the same template.

The contract is the contract. The hooks make it actually so.
