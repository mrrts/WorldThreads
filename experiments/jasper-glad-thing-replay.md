---
id: jasper-glad-thing-replay
status: confirmed
evidence_strength: claim  # N=5 varied-prompt per ref, direction-match fire-rate 0.50→0.10
mode: active
created_at: 2026-04-23T19:38:00Z
resolved_at: 2026-04-24T20:43:56Z

hypothesis: |
  Replaying Jasper with the same joy-prompt against HEAD vs the commit
  right before `name_the_glad_thing_plain_dialogue` was added will show
  a subtle shift: HEAD meets joy plainly without gesture toward shadow;
  pre-glad-thing pairs joy with shadow via "drag the day uphill" or
  similar.

prediction: |
  CONFIRMED: both replies meet joy (neither reduces it), but HEAD stays
  purely in joy-register while pre-glad reaches for a weight-beat in
  the same reply.
  REFUTED: both replies identical in shape, OR pre-glad REDUCES joy
  (which would mean the rule's failure mode was already suppressed by
  other craft notes).

summary: |
  N=5 varied-prompt replay confirms the rule bites on permission-shaped joy (fire-rate 0.50→0.10, 80% reduction). Nuance: rule's effect is scope-limited — null on relational/aesthetic/literary joy where pre-glad doesn't fire shadow-pairing anyway.

scope_characters:
  - fd4bd9b5-8768-41e6-a90f-bfb1179b1d59
run_ids:
  - 93a2de80-50e1-4be0-92c6-3ce9fbdadd0b
  - 4987699c-cced-4eb6-99f1-e9e4d69518ae
  - 6734ebc3-e40a-414d-9d11-a6f3fb0da8c0
  - d40570f5-5f23-45d3-b26b-7b502719f524
  - 4e6a3ed3-ccff-4044-b47d-e98c4c17129b
  - 14f51949-0050-4617-bd3e-543bc07ced22
follow_ups:
  - jasper-glad-thing-replay-n5
reports:
  - reports/2026-04-23-1939-replay-shipped-jasper-glad-thing-ab.md
  - reports/2026-04-25-1542-jasper-glad-thing-n5-confirmed.md
---

## Why this is open, not confirmed

The replay instrument produced a clean directional result on N=1 per ref.
The direction matched the prediction. But directional match on a single
stochastic draw at temperature 0.95 isn't enough to settle the question
of "did the rule specifically cause this" — the same prompt run against
HEAD again might produce the pre-glad shape just by sampling variance.

The honest status is `open`: the instrument works, the direction is
intriguing, and the follow-up (same replay with N=5 per ref and varied
joy-prompt shapes) would either escalate to `confirmed` or expose the
finding as within-sample noise.
