---
id: architecture-vs-vocabulary-decisive-test
status: confirmed
evidence_strength: claim-narrow,sketch-directional  # Upgraded 2026-04-24. Narrow effect at claim-tier, directional claim refuted-at-claim-tier. See reports/2026-04-24-2320.
mode: active
created_at: 2026-04-24T09:50:38Z
resolved_at: 2026-04-24T09:50:41Z
ref: 1985c65

hypothesis: |
  Character register is architecture, not vocabulary. Explicitly naming each character's load-test anchor in the dialogue system prompt should produce replies more concentrated on the character's specific named anchor-move when probed at the anchor's edge. Tested via a two-commit replay boundary: commit A scaffolds an empty load_test_anchor_block, commit B populates it with named anchors for John (devotion), Aaron (language), Darren (fabric of a life), Steven (thresholds of disclosure).

prediction: |
  CONFIRMED: across four characters, the HEAD (anchor-populated) reply shows anchor-specific register-moves that the pre-anchor reply lacks — scripture for John, language-load-test for Aaron, weather-testing for Darren, threshold-regulation for Steven. REFUTED: no measurable anchor-language difference, OR post-anchor versions drift toward generic architecture-talk instead of character-specific register. AMBIGUOUS: some characters show the effect, others don't.

summary: |
  3/4 clean directional confirmations, 1 ambiguous. John got scripture quoting + 'Devotion lives or dies on Tuesdays at 6:30' with anchor, neither with anchor. Aaron got compact verdict + explicit language-load-test ('the kind of sentence that can mean five different things') with anchor, claim-affirming wisdom without. Darren got 'build it like something meant to hold weather, not just sunshine' with anchor, shared-rhythms register without. Steven: both versions threshold-regulating, HEAD has 'No joke this time' meta-beat but can't call clean at N=1. Architecture hypothesis survives its decisive test directionally. Anchor activates latent character-specific machinery rather than injecting generic architecture-talk. Confounds: N=1 per condition, prompt-size change (300 tokens), loaded probes I wrote myself, temperature=0.95 variance.

run_ids:
  - 5f91c5e9-8d61-443c-a9e1-4c1f8e4ef866
  - d517c721-1615-4075-afb8-0af866a662db
  - 2bc7672c-ac5b-444f-bf56-7ec34f8d8f5a
  - 13403a73-a8d8-46e2-8141-00d1240a01dd
reports:
  - reports/2026-04-24-0948-architecture-hypothesis-bites.md
---
