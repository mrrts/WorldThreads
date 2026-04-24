---
id: glad-thing-first-instrument
status: confirmed
evidence_strength: sketch  # N=1 per condition; retroactive label. See CLAUDE.md § evidentiary standards.
mode: passive
created_at: 2026-04-23T12:33:00Z
resolved_at: 2026-04-23T12:38:00Z
ref: 8e9e53d
rubric_ref: glad-thing-plain

hypothesis: |
  The `name_the_glad_thing_plain` craft block reduced the joy-shading
  failure mode in Jasper's solo corpus.

prediction: |
  CONFIRMED: BEFORE window shows at least 1-2 joy-shading replies
  ("same trouble, just in a different coat" style); AFTER window shows
  zero or near-zero.
  REFUTED: both windows show zero (rule didn't bite because failure
  wasn't happening), or both show the same non-zero rate.

summary: |
  Clean direction. BEFORE: 1 YES (joy-shading detected). AFTER: 0 YES.
  The rule's verbatim-application at 15:32 scored NO-high. First run of
  the `worldcli evaluate` instrument; confirmed both the rule's effect
  AND the instrument's ability to detect it.

scope_characters:
  - fd4bd9b5-8768-41e6-a90f-bfb1179b1d59

follow_ups:
  - glad-thing-across-pastoral-characters
  - replay-jasper-glad-thing-pre-post

reports:
  - reports/2026-04-23-1233-the-instrument-ran.md
---

## First successful evaluate run

This experiment was the first production use of `worldcli evaluate`. Its
confirmation did double work: (1) validated that `name_the_glad_thing_plain_dialogue`
moved Jasper's joy-shading rate from 1 to 0 in a small but real window,
and (2) validated that the instrument itself produces decisive verdicts
when the rubric is well-shaped.

The glad-thing-plain rubric became the first entry in the rubric library
(`reports/rubrics/glad-thing-plain.md`); its run history has since
accumulated additional entries from subsequent cross-character runs.
