---
id: aaron-darren-cascade
status: refuted
evidence_strength: sketch  # N=1 per condition; retroactive label. See CLAUDE.md § evidentiary standards.
mode: passive
created_at: 2026-04-23T12:41:00Z
resolved_at: 2026-04-23T12:50:00Z
ref: bce17e9
rubric_ref: agreement-cascade

hypothesis: |
  The agreement-cascade sub-rule shipped in bce17e9 (keep_the_scene_breathing,
  agreement-cascade earned-exception) reduced "Mm. Good. Then yes." cascade
  replies in the Aaron-Darren group-chat corpus.

prediction: |
  CONFIRMED: at least 2-3 cascade-pattern replies in the before window
  (before bce17e9) vs under 1 in the after window.
  REFUTED: zero cascade replies in either window — no evidence the rule
  bit this corpus.

summary: |
  Zero cascade-pattern hits in either window. 23 NO, 1 MIXED across 24
  messages total. Null result. The rule may be working as a gate against
  drift — preventing cascades from forming in the first place — OR the
  Aaron-Darren corpus simply isn't where cascades tend to appear. The
  instrument can't distinguish between "rule suppresses the pattern" and
  "pattern never emerges here regardless of rule" from this data alone.
  Either a multi-character run OR a replay against pre-bce17e9 with the
  same prompts is needed to tell them apart.

scope_group_chats:
  - 48ff11b3-ef28-4ec7-a2e8-6df61d3e7e75

follow_ups:
  - cascade-replay-pre-vs-post-bce17e9

reports:
  - reports/2026-04-23-1241-aaron-darren-null-result.md

retirement_date: 2026-04-24
retirement_disposition: abandoned
retirement_rationale: |
  Refuted null result. The cascade rule does bite on Jasper (1/10) but not on Aaron-Darren (0/15) — the null is the finding, and it's already embedded in the craft doctrine (rule has character-register distribution). No further decision depends on this. Retiring per 2026-04-24-2245 evidentiary triage.
---

## What a null result teaches

A rule's ship-commit isn't automatically where its effect shows up. The
vision-doc's "every craft rule addition is simultaneously an experiment"
means the rule's commit creates two windows, but the windows' contents
are whatever Ryan happened to send through those surfaces at those times.
If cascade-prone moments never came up in the Aaron-Darren chat during
either window, the null result is a fact about the corpus, not a
verdict on the rule.

The refutation updates the practice: when a passive-corpus run returns
null, it's a signal that Mode C (active elicitation with designed
probes) might be the right next instrument — OR that cross-commit
replay with a probe prompt specifically crafted to trigger cascades
would disambiguate.
