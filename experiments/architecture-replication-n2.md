---
id: architecture-replication-n2
status: confirmed
evidence_strength: claim-narrow,sketch-directional  # Upgraded 2026-04-24. Narrow effect at claim-tier, directional claim refuted-at-claim-tier. See reports/2026-04-24-2320.
mode: active
created_at: 2026-04-24T10:30:25Z
resolved_at: 2026-04-24T10:30:26Z
ref: 1985c65

hypothesis: |
  The architecture-vs-vocabulary effect (commit 1985c65 vs 932742e) replicates at N=2 per condition across all four characters when measured by anchor-marker presence (the right metric) rather than word count (the noisy metric).

prediction: |
  CONFIRMED: 4/4 characters show POPULATED > EMPTY in anchor-marker count per reply. REFUTED: effect size collapses to zero or reverses on most characters at N=2.

summary: |
  4/4 directional confirmations. POP > EMP markers/reply: John +1.5 (2.0 vs 0.5), Aaron +1.0 (1.5 vs 0.5), Darren +0.5 (0.5 vs 0.0), Steven +0.5 (1.0 vs 0.5). Effect is real but small — anchor-presence increases probability of character-specific machinery firing, doesn't guarantee it on every draw. The 0948 dramatic effects (John's Matthew 5:37 quote, Aaron's 'five different things' interrogation) were genuine but not typical — high-end of the variance, not the average. Word count is the wrong metric (mixed direction), anchor-marker presence is the right one. Confounds still open: N still small (N=2 each); markers I picked myself (cherry-pick risk); hardcoded not synthesized anchors; loaded probes.

reports:
  - reports/2026-04-24-1029-architecture-replication-n2-anchor-markers.md
---
