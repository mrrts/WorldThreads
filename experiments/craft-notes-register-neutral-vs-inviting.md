---
id: craft-notes-register-neutral-vs-inviting
status: refuted
mode: active
created_at: 2026-04-24T21:37:32Z
resolved_at: 2026-04-24T23:31:57Z
ref: db03a02
rubric_ref: shadow-pairing

hypothesis: |
  Craft notes bite on register-neutral prompts, not on register-inviting ones. When a user's vocabulary strongly invokes a register (exhaustion, rest, relief, weight), single-paragraph craft-note instructions cannot override that invitation. On prompts that don't load the register, the craft note is the main signal and does bite. Structural limit of the prompt layer — predicts that the craft stack's ceiling is prompt-vocabulary-dependent.

prediction: |
  CONFIRM: register-inviting prompt shows HEAD vs pre-glad fire-rate delta ≤ 0.20 (rule doesn't meaningfully bite). Register-neutral prompt shows HEAD < pre-glad by ≥ 0.30 (rule bites). REFUTE: no delta on either (rule doesn't bite at all), or equal delta on both (rule overrides user register regardless of register loading), or direction reverses on register-neutral prompt.

summary: |
  Re-tested under corrected methodology (same-commit --omit, multi-dimensional rubric, by-eye sanity-read). Hypothesis as stated still refuted: register-neutral cells show 0/0 phrase presence in BOTH rule-on and rule-off — but not because the rule failed to bite there; because the failure mode doesn't manifest on register-neutral prompts in the rule-off baseline. Heavier finding (Read C): glad-thing produces PARTIAL bite on register-inviting (19% compression + density 1 vs 2-3 phrases per reply) but cannot fully override user-vocabulary-induced register. Reflex-polish on Aaron is genuinely vacuous-test (failure mode absent in baseline; predecessor rules suppressing). The 1644 'structural ceiling' framing was one Read of bad-design data; Read C is a sharper Read of better data: craft notes target prompt-conditional failure modes and produce partial bite when triggered. See reports/2026-04-25-1827.

run_ids:
  - 140999cf-d298-4060-8f1f-4b5b6cdad228
  - eb5befa2-4ea9-48c9-b0f4-b46e79ddceec
  - 4204ac22-2658-418a-b040-5d2cbcb3ffd3
  - aeb92737-37c6-4d48-9e3b-75967ee53dd1
  - 1f5ca339-5e31-4451-9696-2cf37ec6a94e
  - 859f11be-0321-4f8f-9533-f64a96f3dba4
  - 9900fd11-974d-4df3-b864-018c11c50f7e
  - 105af6b5-1170-4fda-ad2b-d4c8802a28a5
  - 687da801-a36c-4058-b866-ac1855ac9379
  - 7e341419-a034-422f-9229-547084da3de6
  - 046a3535-96ed-46a3-98b4-8ca1a904ebc6
  - 210070e1-178e-49af-b61c-f9c254783b1b
  - adce197c-2531-44ca-b3c8-c168fc850960
  - adae8b69-3fdd-4420-a4da-326e66fbe012
reports:
  - reports/2026-04-25-1644-register-invitation-hypothesis-refuted-across-two-rules.md
  - reports/2026-04-25-1827-register-invitation-rerun-prompt-conditional-failure-modes.md

validates_methods:
  - count-with-thresholds-rubric  # FIRST validation case for the rubric pattern codified in CLAUDE.md § Craft-note bite verification (rubrics that work key on concrete vocabulary tokens). The 18:50 density-grade postscript on the 1827 report is the worked example: a single $0.0017 grade-runs call converted a by-eye density observation (rule-on 1 phrase/reply vs rule-off 2-3) into a measured number (density fire-rate 0.83 vs 1.00, ~16% reduction; mean 1.67 vs 2.00 phrases/reply), AND demonstrated that the count-with-thresholds rubric shape (yes=2+ / mixed=1 / no=0) produces stable defensible verdicts whose reasoning includes explicit phrase counts. Future bite-checks designing rubrics for shape-level bites whose failure mode is countable should look here for the worked rubric text.
  - same-commit-omit-bite-check  # FIRST claim-tier confirmation that the same-commit --omit-craft-notes A/B design (codified per the 1711 methodological discovery) produces interpretable single-rule signal. Together with the 1711 gentle-release bite-check on Jasper (the discovery run itself), this experiment establishes the design as the project default. Refs-based replay is now demoted to "useful for cross-commit stack-state characterization, NOT for single-rule isolation."
  - prompt-conditional-failure-mode-doctrine  # FIRST experiment to surface and codify the prompt-conditional failure mode pattern (the Read C finding). The bite-check Step 0 (verify failure mode manifests in rule-off baseline) and the partial-bite-as-default expectation flow from this run.
---
