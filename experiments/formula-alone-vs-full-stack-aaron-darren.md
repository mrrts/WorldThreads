---
id: formula-alone-vs-full-stack-aaron-darren
status: confirmed
mode: active
created_at: 2026-04-25T01:38:08Z
resolved_at: 2026-04-25T01:38:10Z

hypothesis: |
  The MISSION_FORMULA invariant alone may yield a more ideal in-app experience than all 18 craft notes around it. If the formula's geometric compression carries the load that craft notes individually articulate, removing them should produce comparably-or-better-aligned replies (per Maggie baseline) at significantly lower token cost.

prediction: |
  CONFIRM: craft-omitted replies read more aligned with Maggie baseline (plainer, more specific, less rule-tic-laden, voice intact, no LLM-default warmth tropes). REFUTE: craft-omitted replies degrade (generic warmth, model-default register, less specific imagery, voice flattens). AMBIGUOUS: essentially comparable.

summary: |
  Sketch-tier (N=2 per cell, 4 cells total). Formula-only condition produced replies cleaner on world_is_primary failure mode (no double-exposed lines vs one explicit token-leak in full-stack), comparable-or-sharper on character-essence (Darren's tracking-three-exits line did not appear in full-stack), voice-intact (anchors carry it), and at ~30% the cost (/bin/zsh.12 vs /bin/zsh.37 per cell). Craft-notes layer accounts for ~50K input tokens (~70% of dialogue prompt). Implications cascade if confirmed at characterized-tier: the layer may be over-engineered; world_is_primary may be net-negative on its own target via meta-cognitive activation; the formula carries more load than the surrounding scaffolding credits it for. See reports/2026-04-25-2035.

run_ids:
  - fb11e953-8029-4831-b8ba-e21d3b79b850
  - 399d93be-e205-4761-aaab-b2f0b23b1648
  - 5be574f0-86e1-43cf-9de8-4b1f41f6a112
  - 996b1a50-9f94-42f1-a733-ba3833b941da
reports:
  - reports/2026-04-25-2035-formula-alone-vs-full-stack-aaron-darren.md
---
