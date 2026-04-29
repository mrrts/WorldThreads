# Chat Improvement Loop B — Solo-agent 1/2/3/4

_Generated: 2026-04-29T09:09:24.281394_

## 1) Second A/B: injected low-patience rule

- **Darren** action-open: 4/4 -> 4/4; avg words: 40.2 -> 44.8.
- **Jasper** action-open: 4/4 -> 4/4; avg words: 59.2 -> 50.5.
- Artifact: `reports/2026-04-29-0905-ab-low-patience-inject.json`.

## 2) Prompt patch applied

- Added a new clause to `STYLE_DIALOGUE_INVARIANT`: **LOW-PATIENCE MOMENTS WANT THE SHORT, TRUE LINE**.
- Added compile-time invariant assertion for the clause string.
- Rebuilt successfully: `cargo build --bin worldcli`.

## 3) Combined gate sweep

- **Darren register-shift**: shift_rate=0.70, rebound_rate=0.31, gate_passed=true.
- **Jasper register-shift**: shift_rate=0.57, rebound_rate=0.33, gate_passed=true.
- **Darren 8:30am rubric** before yes/no/mixed=8/0/0; after yes/no/mixed=0/0/0.
- **Jasper 8:30am rubric** before yes/no/mixed=7/0/1; after yes/no/mixed=0/0/0.
- Artifacts: `reports/2026-04-29-0907-register-shift-gate-darren.json`, `reports/2026-04-29-0907-register-shift-gate-jasper.json`, `reports/2026-04-29-0907-evaluate-830am-darren.json`, `reports/2026-04-29-0907-evaluate-830am-jasper.json`.

## 4) Tight replay pack with fixed momentstamp

- Setup: refs `HEAD~1,HEAD`, `--n 2`, constant `--momentstamp-override` to hold context constant.
- Artifact: `reports/2026-04-29-0907-replay-fixed-momentstamp-pack.json`.
- Quick read:
  - Darren probe 1: action-open 2/4 across fixed-signature samples.
  - Darren probe 2: action-open 0/4 across fixed-signature samples.
  - Darren probe 3: action-open 4/4 across fixed-signature samples.
  - Jasper probe 1: action-open 1/4 across fixed-signature samples.

## Recommendation

- Keep the low-patience clause shipped. Next, run the same replay pack at `--n 5` if you want claim-tier confidence on opener-variance deltas post-patch.