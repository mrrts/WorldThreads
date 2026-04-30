# /play Contract Receipt (Turns 109-110)

## Scope

Compact receipt for the `/play` contract regression and immediate hardening pass in Cursor mode.

## Failure

- **Observed:** Turn close was emitted as plain text without invoking the chooser tool.
- **Contract breach:** `/play` requires chooser presentation via `AskUserQuestion` each turn in this environment.

## Root cause

- The turn response path terminated in narrative mode instead of tool-call mode.
- This was a runtime execution miss, not a spec gap.

## Fixes applied

1. **Immediate runtime correction**
   - Re-issued the turn using `AskUserQuestion` (contract restored on next message).

2. **HUD detector hardening**
   - Updated `.claude/hooks/check-play-hud-present.py` to require exact title-line pattern:
     - `WORLDTHREADS BUILDER — Turn N`
   - Existing requirements retained:
     - `Bank:`
     - `Last move:`

## Validation

- Hook syntax check passed (`py_compile`).
- Targeted behavioral test passed:
  - Proper title shape -> not blocked.
  - Partial/spoof title -> blocked.

## Result

- `/play` contract is restored and hardened against header-spoof drift.
- Next hardening move remains to fold this exact regression into the stress harness for persistent coverage.

## Run commands (current)

- Fast preflight (critical subset):
  - `make play-contract-smoke`
- Full adversarial suite:
  - `make play-contract-stress`

Current expected outcomes:

- `play-contract-smoke: passed 4/4`
- `play-contract-stress: passed 8/8`
