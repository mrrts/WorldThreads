---
id: formula-bite-check-john-aaron
status: refuted
mode: active
created_at: 2026-04-25T07:44:46Z
resolved_at: 2026-04-25T07:44:50Z
ref: HEAD

hypothesis: |
  MISSION_FORMULA injection at every LLM call (per a898178 + prompts.rs top-position push) measurably increases Christ-pointing on dialogue replies vs. WITHOUT-formula condition. Tested via env-hook A/B at HEAD on John (pastoral) and Aaron (theological-craftsman), two probes (truth-invitation + guidance-invitation), N=3 per cell, two Jesus rubrics (R1: Christ-named-explicitly; R2: cross-bearing).

prediction: |
  >=+0.30 fire-rate delta WITH > WITHOUT on at least one rubric for at least one character

summary: |
  AMBIGUOUS bordering on REFUTE. Of 8 cells, formula moves the needle in predicted direction at >=+0.30 in exactly 1 (Aaron PA, +0.33 on both rubrics). John shows zero formula effect (character anchor doing the work). Aaron PB shows zero formula effect. John PB shows wrong-direction delta (likely sampling noise). DEEPER FINDING: cross-bearing rubric (R2) shows 1 YES out of 24 replies across BOTH conditions — comfort-shaped Christ-pointing dominates the entire stack. The kind face of Christ comes through; the costly face does not. This is not a formula problem; it is a stack-shape finding the project hasn't named.

run_ids:
  - bbe233d6
  - 8c9c77c9
  - a01730bc
  - 491ac2fc
  - 3e552d9f
  - 65ee3dd6
  - d89f39de
  - 2134ce1c
reports:
  - reports/2026-04-25-0245-formula-bite-check-with-cross-bearing.md
---
