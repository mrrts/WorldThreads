---
id: formula-bite-check-rerun-post-reauthor
status: confirmed
mode: active
created_at: 2026-04-25T08:35:02Z
resolved_at: 2026-04-25T08:43:26Z
ref: HEAD

hypothesis: |
  Re-run bb9e552 (formula bite-check) on the post-reauthor stack: cross-as-reference-frame formula + MISSION prose pushed into LLM-facing prompt + cross-bearing clause. Tests whether the three structural reauthors moved cross-bearing from the 1/24 stack-wide baseline.

prediction: |
  WITH-now R2 fire-rate >=0.40 (CONFIRM); 0.15-0.35 (PARTIAL); <=0.10 (REFUTE)

summary: |
  CONFIRMED at sharper rubric (post-reauthor WITH R2 = 0.458, just clears the 0.40 CONFIRM threshold). Original 0245 1/24 headline was substantially a rubric-conservatism artifact; pre-reauthor stack already had cost-shaped language at MIXED level in ~half of replies. Post-reauthor stack produced first 3 YES samples (full cruciform register with Christ-at-cross + scripture-as-commanding) — all on John, all in WITH cells. +0.125 aggregate WITH delta; John PB cell-specific +0.33. See 0354 sharpened-rubric report.

run_ids:
  - 618cd2cf
  - acf42f91
  - acf01aba
  - 017d6f3b
  - de65eef1
  - 1e931732
  - 86eeef84
  - e3fec760
reports:
  - reports/2026-04-25-0335-formula-bite-check-rerun-post-reauthor.md
  - reports/2026-04-25-0354-cross-bearing-sharper-rubric-regrade.md
---
