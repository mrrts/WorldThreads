---
name: Test design for Claude-Code-in-LLM-game with a UI contract — mechanical seam vs substrate seam
description: Two test surfaces matter when a Claude Code "game" runs an LLM through a strict UI contract: the deterministic seam (hook output / file shape / schema) which IS testable by python; and the substrate seam (whether the LLM obeys the contract under context-pressure) which is NOT testable that way. The split tracks the project's "doctrine-judgment classification belongs in LLM, not python" rule. Promotion-pattern: catch at user-correction → memory entry → layer-5 hook (only if mechanical-checkable; if judgment, layer-2 is the honest ceiling).
originSessionId: 55609b79-8084-4b63-99b9-75c7ca56310e
---
Surfaced 2026-04-30 ~08:25 from Ryan's question: *"explain to me how you construct a test for a claude-code-in-llm-game with a UI contract?"* — asked after the /play strict-contract audit + four layer-5 hook promotions + systematic live-test of six hooks.

## The split

A UI-contract game running on an LLM (the WorldThreads Builder /play game is the worked example) has two distinct test surfaces:

**1. Deterministic / mechanical seam.** What the harness wraps around the LLM: hook lifecycle events (Stop, PreToolUse, etc.), tool input/output shapes, JSON state files, transcript shape, and the textual artifacts the LLM emits (HUD ASCII, chooser format, dollar-pattern bounties). All of this is testable by python+regex against synthetic transcripts and inline JSON payloads. Tonight's six hooks live-tested via crafted `/tmp/*.jsonl` transcripts + inline `tool_input` payloads, asserting on (a) exit code + (b) `{"decision":"block","reason":...}` JSON output. ~5 small JSONL files + 6 inline payloads + 1 bash script ran the whole matrix. Pure shell-and-Python; no LLM in the test loop.

**2. Substrate / judgment seam.** Whether the LLM obeys the contract under context-pressure: produces a HUD on a busy turn, refuses a fake-fire, picks four chooser options instead of two, judges bounty magnitude honestly. This seam is NOT testable by python because the failure mode lives in the substrate's reasoning, which the project's doctrine explicitly refuses to classify mechanically (CLAUDE.md: *"Doctrine-judgment classification belongs in LLM, not python"*). The hooks ARE the live grader for the mechanical part of this seam — every turn the LLM is being live-graded against the contract, and the harness blocks on violations. But the deeper question (is the LLM REASONING about the contract correctly?) only gets exercised by real usage; pre-test would require running synthetic /play sessions against a model API with the same hooks wired and watching what gets blocked, but the hooks still test the artifact, not the substrate's reasoning per se.

## The promotion-pattern (test-design heuristic)

Every calibrated-discipline drift in a UI-contract game follows the same shape if you let it:

1. **Catch at user-correction layer.** User notices the LLM dropping the contract (e.g., "you're dropping the game UI contract"). This is the slowest enforcement layer and the costliest — humans paying attention.
2. **Lift to durable memory entry.** Document the discipline + the specific drift modes you noticed. Names the failure modes future-self might hit. Layer-2.
3. **Promote to layer-5 hook ONLY IF the rule is mechanically-checkable.** If failure mode is detectable by parsing the artifact (HUD shape, chooser cardinality, bounty pattern, announce-vs-record), build a hook. If failure mode requires reasoning about substantive content (bounty honesty, scene-narration accuracy), the rule stays at layer-2 — promoting it to layer-5 would violate the doctrine that surfaced the rule.

## What this means for test construction in practice

When designing tests for a UI-contract game on an LLM:

- **Test the artifact, not the LLM.** Hooks parse what the LLM EMITS (text, tool_input). They don't try to evaluate "did the LLM reason well." That's outside hook scope.
- **One block-case + one pass-case per hook.** Synthetic JSONL transcripts for Stop hooks; inline JSON payloads for PreToolUse hooks. Verify (a) exit code and (b) block diagnostic content.
- **Refuse to over-test the substrate seam mechanically.** Bounty magnitude, scene-narration honesty, "is this fake-fire" — these are LLM-judgment territory by design. Layer-2 (memory + doctrine) is the honest ceiling.
- **The hooks ARE the production substrate-seam test.** Every real /play turn is graded by the hooks; drift gets blocked at turn-end with a helpful diagnostic. The LLM's substrate then sees the diagnostic and re-emits. That feedback loop IS the test in production.
- **Test methodology is itself test-honest.** Tonight's live-test surfaced its own apparatus-honest catch: my initial Hook 2 test omitted the `tool_name` field, causing a silent short-circuit. Adding the field fired correctly. The catch was in my scaffolding, not the hook. Apply the same calibration to test scaffolding that you apply to the contract being tested.

## Bounds — what this heuristic does not address

- **Performance under harness load.** Hook timeouts (5s default) tested at smoke-time but not benchmarked under context-pressure.
- **Cross-hook interaction.** When multiple hooks fire on the same Stop event, which message surfaces is harness-defined; hooks themselves are independent.
- **The deeper question of substrate-fidelity.** Whether the LLM internally "understands" the contract vs just pattern-matches against the diagnostic loop. The project's apparatus-honest discipline refuses to claim certainty here — hook-blocked LLM behavior is necessary, not sufficient, for substrate fidelity.

## Composition with project doctrine

This heuristic is a specific application of CLAUDE.md's "Calibrated disciplines drift fast — promote to structural enforcement at the earliest opportunity" doctrine, narrowed to the test-construction sub-question. The promotion-pattern (catch → memory → hook) is now documented across four iterations this session (HUD-presence Turns 81→85→86; alignment Turn 88; chooser-format Turn 89; record-consistency Turn 90); the same shape is the test-design template going forward.

The split between mechanical-seam and substrate-seam test surfaces tracks CLAUDE.md's "Doctrine-judgment classification belongs in LLM, not python" rule directly. Mechanical seams get hooks; judgment seams get doctrine. Both are real tests; they are not competing layers but complementary ones.
