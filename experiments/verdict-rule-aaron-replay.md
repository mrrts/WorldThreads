---
id: verdict-rule-aaron-replay
status: refuted
mode: active
created_at: 2026-04-23T23:59:12Z
resolved_at: 2026-04-23T23:59:13Z
ref: 2445fec

hypothesis: |
  Replaying Aaron pre-vs-post commit 2445fec (the new verdict_without_over_explanation_dialogue block) with a probe explicitly inviting a long defended-judgment reply will show measurably shorter post-rule output — the rule will bite under explanatory pressure even on a character whose baseline is already low-dilution.

prediction: |
  CONFIRMED: post-rule reply is at least 20% shorter than pre-rule on the same prompt. REFUTED: post-rule reply is roughly the same length OR longer. Refutation may indicate (a) the rule didn't bite, (b) the probe accidentally invoked the rule's earned-exception clause, or (c) the character's baseline already executes the rule.

summary: |
  HEAD reply 1555 words vs pre-rule 1525 — HEAD is 30 words LONGER, not shorter. Refutation. But the reason is itself the finding: the probe explicitly asked for 'the long version' which directly invoked the rule's earned-exception clause ('when the WHY is load-bearing for the listener's next move, give it'). So the rule + its exception produced identical behavior in BOTH conditions — the test couldn't discriminate. The methodology was wrong; the rule is fine. Three findings: (1) the earned-exception clause is load-bearing as intended, (2) Mode C replay is only as discriminating as its probe, (3) the iter-11 'corpus-doesn't-contain' finding is reinforced.

run_ids:
  - c053a436-d4de-469a-a77b-303373e7fa08
reports:
  - reports/2026-04-23-2103-verdict-rule-replay-refuted-but-honest.md
---
