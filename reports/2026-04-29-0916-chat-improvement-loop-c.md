# Chat Improvement Loop C — 1/2/3/4

_Generated: 2026-04-29T09:16:28.101654_

## 1) Higher-confidence fixed-signature replay (`n=5`)
- Artifact: `reports/2026-04-29-0911-replay-fixed-momentstamp-pack-n5.json`
- Setup: `--refs HEAD~1,HEAD --n 5 --momentstamp-override <fixed>` across 3 probes x 2 characters.
- Darren probe 1: HEAD~1:3/5 action-open, HEAD:2/5 action-open
- Darren probe 2: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Darren probe 3: HEAD~1:5/5 action-open, HEAD:5/5 action-open
- Jasper probe 1: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Jasper probe 2: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Jasper probe 3: HEAD~1:5/5 action-open, HEAD:5/5 action-open

## 2) Micro patch: anti-consecutive action-openers
- Added to `STYLE_DIALOGUE_INVARIANT`: **CONSECUTIVE ACTION-OPENERS SIGNAL AUTOPILOT** with earned exception for true motion continuity.
- Added compile-time invariant assert for this clause in `prompts.rs`.

## 3) One-command daily loop script
- Added executable script: `scripts/chat-improvement-loop.sh`
- Validated `--help` output and environment override surface (`LIMIT`, `SHIFT_LIMIT`, `REPLAY_N`, etc.).

## 4) 12-probe 20-second stress pack
- Artifacts:
  - `reports/2026-04-29-0914-stress-pack-20s.json`
  - `reports/2026-04-29-0914-stress-pack-20s-scoreboard.md`

Scoreboard:
- **Darren**: FAIL (4/12, 33%), avg words=35.8
- **Jasper**: FAIL (1/12, 8%), avg words=37.8

JSON: `2026-04-29-0914-stress-pack-20s.json`

## Read
- Stress pack currently fails the practical 20-second bar for both characters, which gives us a clear next optimization target.