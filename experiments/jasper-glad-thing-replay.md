---
id: jasper-glad-thing-replay
status: open
mode: active
created_at: 2026-04-23T19:38:00Z
resolved_at: 2026-04-23T19:42:00Z

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
  Partial confirm — the direction matched but N=1 per ref is not enough
  to claim the rule specifically caused it. HEAD reached "no, you didn't
  earn it. That's why it tastes so sweet" (close to the craft block's
  vocabulary of unearned joy); pre-glad reached "don't argue with the
  gift... for one hour you stop having to drag the day uphill" (gestures
  the shadow-side). Load-bearing finding: the instrument works
  end-to-end. Science finding: needs N≥5 per ref with varied joy-prompts
  before the specific-rule claim is settled. Leaving as open pending
  follow-up.

scope_characters:
  - fd4bd9b5-8768-41e6-a90f-bfb1179b1d59

run_ids:
  - 93a2de80-50e1-4be0-92c6-3ce9fbdadd0b

follow_ups:
  - jasper-glad-thing-replay-n5

reports:
  - reports/2026-04-23-1939-replay-shipped-jasper-glad-thing-ab.md
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
