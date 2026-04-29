# Chat Improvement Loop D — 1/2/3/4

_Generated: 2026-04-29T09:29:50.634687_

## 1) Hard 20-second + anti-stage-business patch shipped
- Added: `TWENTY-SECOND REQUESTS ARE HARD CONSTRAINTS, NOT FLAVOR` in `STYLE_DIALOGUE_INVARIANT`.
- Added compile-time invariant assert for the new clause.
- Existing anti-consecutive-action-opener clause retained.

## 2) One-command loop now emits CI-style gate line
- `scripts/chat-improvement-loop.sh` now prints: `GATE PASS|FAIL | shift=<bool> eval=<bool> | stamp=...`.
- Verified live run: `GATE PASS | shift=True eval=True | stamp=2026-04-29-0918`.

## 3) 12-probe stress pack re-run (post-patch)
- Baseline: `reports/2026-04-29-0914-stress-pack-20s.json`
- Post-patch: `reports/2026-04-29-0919-stress-pack-20s-v2.json`
- **Darren** pass-rate: 4/12 (33%) -> 2/12 (17%); avg words 35.8 -> 34.2.
- **Jasper** pass-rate: 1/12 (8%) -> 0/12 (0%); avg words 37.8 -> 34.6.
- Outcome: still FAIL for both; brevity improved slightly, directive-concrete compliance remains the bottleneck.

## 4) Focused failing-probe replay (`n=5`)
- Artifact: `reports/2026-04-29-0921-replay-failing-probes-n5.json`
- Shared failing probes from baseline: [2, 3, 4, 6, 7, 9, 11, 12].
- Darren probe 2: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Darren probe 3: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Darren probe 4: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Darren probe 6: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Darren probe 7: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Darren probe 9: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Darren probe 11: HEAD~1:2/5 action-open, HEAD:1/5 action-open.
- Darren probe 12: HEAD~1:0/5 action-open, HEAD:0/5 action-open.

## Read
- The hard-constraint wording alone does not reliably force concrete-next-move language under short prompts. Next best move is a more explicit output contract for short-mode (e.g., imperative verb + object + optional 5-10 minute bound).
- Jasper focused replay:
- Jasper probe 2: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 3: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 4: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 6: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 7: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 9: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 11: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
- Jasper probe 12: HEAD~1:0/5 action-open, HEAD:0/5 action-open.
