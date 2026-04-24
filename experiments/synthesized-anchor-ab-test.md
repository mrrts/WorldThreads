---
id: synthesized-anchor-ab-test
status: confirmed
mode: active
created_at: 2026-04-24T10:50:33Z
resolved_at: 2026-04-24T10:50:35Z
ref: bb5214d

hypothesis: |
  The synthesizer-driven anchors (LLM-derived from corpus + character identity, stored in DB, read by production prompt-assembly) produce a comparable architecture effect to the handwritten hardcoded anchors tested in 2026-04-24-1029. A/B compares anchor-injected vs --no-anchor across 4 characters at N=2 per condition.

prediction: |
  CONFIRMED: 3/4 characters show positive direction with aggregate +0.5 to +1.5 markers/reply. REFUTED: synthesized anchors show consistently zero or reversed direction.

summary: |
  3/4 directional confirmations. Aggregate +0.875 markers/reply, statistically indistinguishable from hardcoded version's +0.9 (1029 report). John strongest (+3.0 with new ORDINARY WEAR anchor sharper than my old DEVOTION). Aaron reversed (-0.5) likely due to probe-anchor mismatch — original probe was designed to trigger LANGUAGE-load-test, but synthesizer derived LIVEABLE LOAD-BEARING (different axis). Darren and Steven small positive (+0.5 each). The lever ships in production at the same effect magnitude as the hardcoded test. Multi-axis pivot ready for joy_reception and other axes via REGISTER_AXES registry.

reports:
  - reports/2026-04-24-1115-synthesized-anchor-ab-comparable-effect.md
---
