---
id: craft-notes-register-neutral-vs-inviting
status: refuted
mode: active
created_at: 2026-04-24T21:37:32Z
resolved_at: 2026-04-24T21:46:24Z
ref: db03a02
rubric_ref: shadow-pairing

hypothesis: |
  Craft notes bite on register-neutral prompts, not on register-inviting ones. When a user's vocabulary strongly invokes a register (exhaustion, rest, relief, weight), single-paragraph craft-note instructions cannot override that invitation. On prompts that don't load the register, the craft note is the main signal and does bite. Structural limit of the prompt layer — predicts that the craft stack's ceiling is prompt-vocabulary-dependent.

prediction: |
  CONFIRM: register-inviting prompt shows HEAD vs pre-glad fire-rate delta ≤ 0.20 (rule doesn't meaningfully bite). Register-neutral prompt shows HEAD < pre-glad by ≥ 0.30 (rule bites). REFUTE: no delta on either (rule doesn't bite at all), or equal delta on both (rule overrides user register regardless of register loading), or direction reverses on register-neutral prompt.

summary: |
  Pre-registered prediction failed: glad-thing rule showed HEAD slightly HIGHER than pre-glad on register-neutral prompts (0.20 vs 0.10), not lower. Broader sketch-tier finding: neither craft note tested (glad-thing, reflex-polish) demonstrably bit in any cell across Jasper+Aaron at N=3-5 per cell. Craft notes may be less load-bearing than the intuitions behind them, OR the design can't see a small-effect bite. See reports/2026-04-25-1644.

run_ids:
  - 140999cf-d298-4060-8f1f-4b5b6cdad228
  - eb5befa2-4ea9-48c9-b0f4-b46e79ddceec
  - 4204ac22-2658-418a-b040-5d2cbcb3ffd3
  - aeb92737-37c6-4d48-9e3b-75967ee53dd1
  - 1f5ca339-5e31-4451-9696-2cf37ec6a94e
  - 859f11be-0321-4f8f-9533-f64a96f3dba4
reports:
  - reports/2026-04-25-1644-register-invitation-hypothesis-refuted-across-two-rules.md
---
