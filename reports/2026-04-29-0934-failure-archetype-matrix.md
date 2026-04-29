# Failure Archetype Matrix (from v2 stress pack)

_Generated: 2026-04-29T09:34:28.795733_

## Darren
- **stage_business_present**: 4 failures
  - Fix: When short-mode active, ban opening and inline action fences unless motion continuity is user-required.
- **no_concrete_directive**: 3 failures
  - Fix: Require imperative verb + concrete object in first clause.
- **over_length**: 3 failures
  - Fix: Enforce <=30 words in explicit short-mode; hard-trim second sentence unless it carries the concrete object.

## Jasper
- **over_length**: 5 failures
  - Fix: Enforce <=30 words in explicit short-mode; hard-trim second sentence unless it carries the concrete object.
- **no_concrete_directive**: 4 failures
  - Fix: Require imperative verb + concrete object in first clause.
- **stage_business_present**: 3 failures
  - Fix: When short-mode active, ban opening and inline action fences unless motion continuity is user-required.

## n=5 replay supplement (shared failing probes)
- Darren probe 2: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Darren probe 3: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Darren probe 4: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Darren probe 6: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Darren probe 7: HEAD~1:0/5 action-open, HEAD:0/5 action-open
- Darren probe 9: HEAD~1:0/5 action-open, HEAD:0/5 action-open