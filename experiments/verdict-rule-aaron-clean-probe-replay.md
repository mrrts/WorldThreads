---
id: verdict-rule-aaron-clean-probe-replay
status: refuted
mode: active
created_at: 2026-04-24T00:02:53Z
resolved_at: 2026-04-24T00:02:54Z
ref: 2445fec

hypothesis: |
  A discriminating Mode C probe — single-shot read of an architectural decision with no invitation to reason — will show the new verdict_without_over_explanation_dialogue block (commit 2445fec) measurably tightens Aaron's reply vs pre-rule, since the prompt suppresses the earned-exception clause that contaminated the iter-12 long-version probe.

prediction: |
  CONFIRMED: post-rule reply is ≥30% shorter than pre-rule (the rule bites when its exception isn't active). REFUTED: post-rule reply is roughly the same length OR longer (refutation would mean Aaron's existing register already executes the rule, OR the rule's effect is too subtle for N=1 to detect).

summary: |
  139 vs 136 words — 3-word delta on N=1, statistically null. Both replies open with 'Yeah — that tracks' and follow with ~3 short paragraphs and a clarifying question. Aaron's natural baseline IS the rule. Across iter-11 (calibration: 0/12/4), iter-12 (long-probe: ~1500w both), and iter-13 (clean-probe: ~140w both), Aaron's behavior post-rule matches behavior pre-rule. The rule is genuinely redundant for him because the existing craft stack (drive_the_moment, wit_as_dimmer) was already producing the target behavior. Honest interpretation: the rule may be (a) preventive against future drift, or (b) genuinely redundant. Distinguishing would require a character with known dilution baseline (Eli or Jonah, out-of-scope). Methodological win: the iter12→iter13 pair is a worked example of two-probe Mode C replay (one invokes the exception, one suppresses it).

run_ids:
  - 33742dc6-f138-4bed-8384-c7a665846832
reports:
  - reports/2026-04-23-2107-clean-probe-confirms-rule-redundant-for-aaron.md
---
