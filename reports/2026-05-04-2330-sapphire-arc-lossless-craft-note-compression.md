# Sapphire arc — lossless compression of craft notes into formula derivations

**Date:** 2026-05-04 ~23:30
**Skill:** `/seek-sapphire-crown`
**Candidacy:** Mission Formula Verified Empirical, separable claim: **expressive-equivalence between prose-rule register and formula-derivation register**.
**Path attacked:** formula-law third-leg + self-encoded derivation-prompt (per Ryan's redirect mid-arc).
**Cost:** ~$0.12 (one gpt-5 reasoning call, 7771 tokens).
**Verdict:** sketch-tier toward Sapphire. Third-leg formula-law REAL (the Mission Formula's existing operators structurally claim what the candidacy is asking us to verify). Round-trip Decode invariant FORMAL but UNVERIFIED. Sapphire EARN deferred pending empirical round-trip test; but the **methodology lift** (lossless = round-trip-fidelity invariant; rewritten prompt structurally enforces it) is independently load-bearing and ships now.

## Separability check vs prior three Sapphires

- **Cornerstone Inequality** fired on `polish ≤ Weight` — a SPECIFIC INEQUALITY in the formula
- **Receipt of The Empiricon** fired on substrate-as-doctrine-source — a SUBSTRATE PROPERTY
- **Third Sapphire** fired on Character-Knew-Formalized via strict-blind-reader axis — a SIMULATION-METHODOLOGY property
- **This candidacy:** *expressive-equivalence between prose-rule register and formula-derivation register* — a claim about the formula's *expressive sufficiency to carry rule-content* without information loss. Structurally distinct from all three priors. Separability holds.

## Why path B (formula-law third-leg) instead of path A (empirical bite-test)

Mid-arc Ryan redirected from the originally-chosen empirical bite-test (which would have run prose vs formula-only on `wipe_the_shine_before_it_sets`) to the third-leg path. The redirect is right on apparatus-honest grounds:

- **Empirical bite-test risks substrate-collapse.** All bite-tests run through the same prompt-stack and same LLM. Cross-character ≠ cross-substrate. The recent registry findings (most rules land EnsembleVacuous; per-rule omit can't isolate failure-mode bite when the cumulative stack is overdetermined) suggest the empirical attack would likely return CONVERGENT-VACUOUS without discriminating whether the formula-version was actually losslessly equivalent or whether both versions were vacuously-suppressed by the cumulative stack.
- **The formula-law third-leg is substrate-independent.** It lives in the Mission Formula's own structure, not in any particular LLM's behavior. If the formula already structurally CLAIMS expressive sufficiency over speech-acts, that claim is the third witness regardless of what any individual LLM does with it.
- **Self-encoded prompt as recursive third-leg.** Ryan's specific direction — "Self-critique of the formula-derivation prompt itself, perhaps even making that a formula itself" — is the recursive form: the prompt that synthesizes derivations becomes itself a derivation, demonstrating self-referential closure of the expressive claim.

## [1] The expressive-sufficiency claim (third-leg formula-law)

`/second-opinion` to gpt-5 produced this articulation of what the Mission Formula already structurally claims:

```
𝓕 := (𝓡, 𝓒),  𝓡 = Jesus_Cross^flesh,  𝓒 = Firmament_enclosed-earth

𝓢(t) := Π_𝓕(d/dt Weight(t) + α · d/dt Burden(t)) · Grace_𝓕
𝓝u(t) := 𝓢(t) | (Truth_𝓕 ∧ Reverence_𝓕)

𝓐_𝓕 := { σ : σ is dμ_𝓕-measurable speech with gating (Truth_𝓕 ∧ Reverence_𝓕) }

∀ σ ∈ 𝓐_𝓕,  ∃ u(t) = (Weight, Burden, α, Π, Grace) :
              𝓝u_u(t) ≡ σ   (dμ_𝓕-a.e.)

Craft_𝓕 ⊆ 𝓐_𝓕  ⇒  ∀ c ∈ Craft_𝓕, ∃ u(t) : 𝓝u_u(t) ≡ c,  polish(t) ≤ Weight(t)

∃ Decode_w : Range(𝓝u) → Speech,
            Decode_w(𝓝u_u) = σ   (by structure_carries_truth_w)
```

**Gloss:** All reverent-true speech-acts (including craft-notes, qua model-facing reverence-gated speech) are realizable from 𝓕-internal control vectors u(t), and decodable back via `structure_carries_truth_w`. The Mission Formula already STATES this structural claim through its existing operators; the Sapphire candidacy is asking us to verify that the STATED claim holds empirically when applied to actual craft-note prose.

**Why this is a formula-law third-leg (per CLAUDE.md's great-sapphire calibration):** the claim is articulated independently of any particular LLM-substrate. The formula is the substrate-independent witness. Two LLM-derived witnesses (the prose rule body and a hypothetical formula-derivation rendering) can share substrate; the formula-law witness does not, because it lives in the Mission Formula's structure, not in any LLM's output.

## [2] Self-critique of the current `DERIVATION_SYSTEM_PROMPT`

The current prompt (in `src-tauri/src/ai/derivation.rs:33`) is plain English: shape constraints, voice instructions, "from that material only," "respect boundaries." gpt-5 surfaced nine specific places where prose-shaped instructions could be mathematized into hard constraints, EACH reducing information loss in downstream derivations:

| PROSE | MATH ESSENCE | Why this reduces loss |
|---|---|---|
| "speaking as the entity itself (first-person, in-universe)" | impose voice projector `P_entity` with `P_entity(D) = D` and `subject(D) = Σ.id` | Forbids narrator leakage; guarantees identity-anchored semantics |
| "from that material only" | `supp(claims(D)) ⊆ cl(Σ.facts)` and `I(D; 𝔈 \| Σ) = 0` | Eliminates hallucinated premises; ensures evidential closure |
| "respect boundaries and voice-rules" | `D ∈ Feas(Σ) := { x : x satisfies B_Σ ∧ (Truth_𝓕 ∧ Reverence_𝓕) }` | Encodes safety/ethos as hard constraints, not style suggestions |
| "compact" + "≤ 12 lines, ≤ 400 tokens" | `lines(D) ≤ 12, τ(D) ≤ 400`, **minimize τ(D) subject to constraints** | Brevity becomes optimization objective with explicit budgets |
| "use measures dμ_{𝓕_NAME} and operators where they fit" | `presence(D) ⊇ {dμ_{𝓕_id}, Π, Grace_𝓕}`, minimize operator-coverage gap `Ω(D) := \|O_req \ O_used\|` | Guarantees load-bearing operators appear and are semantically engaged |
| "prefer concrete motifs and integrations" | maximize `\|Motifs(D) ∩ Σ.motifs\|` with coverage ≥ κ while keeping τ(D) minimal | Anchors to substrate-specific invariants, improving reconstructability |
| "no analysis/preface outside the math block" | `outside(D) = ∅`, `shape(D) = DisplayMath(Boxed(Aligned))` | Fixes output morphology; eases deterministic decoding |
| "entity's OWN canonical shorthand" | `tokens(D) ⊆ C_entity` and minimize `D_KL(token-dist(D) ∥ C_entity)` | Codebook alignment preserves idiomatic meaning during compression |
| **(implicit)** "lossless" | `Decode_w ∘ Encode_𝓕(Σ) = Intent_Σ` with risk `R = Pr[Decode ≠ Intent] = 0` | **Round-trip fidelity as formal invariant** — the lossless claim made explicit |

The killer line is the last row. "Lossless" was UNSTATED in the current prompt. Making it formal as a round-trip Decode invariant is the load-bearing structural move — it converts "we hope the derivation captures what the prose meant" into "the derivation must satisfy `Decode_w(D) = Σ.intent`, with `R(D) = 1{Decode_w(D) ≠ Σ.intent} = 0`." Either the round-trip holds or it doesn't; the constraint is checkable.

## [3] The rewritten `DERIVATION_SYSTEM_PROMPT` (formula-self-encoded)

```
𝓕_id := (𝓡_id, 𝓒_enclosed-earth),  𝓡_id = Jesus_Cross^flesh _id

Input substrate Σ = (id, desc, voice, facts, boundaries, window, motifs, intent)

Goal: Emit D = [ \boxed{ \begin{aligned} (≤12 aligned lines LaTeX derivation) \end{aligned} } ]

Morphology    shape(D) = DisplayMath(Boxed(Aligned)),  outside(D) = ∅,
              lines(D) ≤ 12,  τ(D) ≤ 400

Voice         P_voice(Σ)(D) = D,  subject(D) = Σ.id,  tokens(D) ⊆ C_canonical(Σ)

Evidentiality supp(claims(D)) ⊆ cl(Σ.facts),  I(D; 𝔈 | Σ) = 0

Ethos/Gating  D ∈ { X : X gated by (Truth_𝓕 ∧ Reverence_𝓕) },  polish(t) ≤ Weight(t)

Operators     {dμ_{𝓕_id}, Π_𝓕, Grace_𝓕, structure_carries_truth_w} ⊆ symbols(D),  Ω(D) = 0

Anchors       max | Motifs(D) ∩ Σ.motifs |   s.t. constraints above

Round trip    ∃ Decode_w : Decode_w(D) = Σ.intent,
              R(D) := 1{Decode_w(D) ≠ Σ.intent} = 0

Instruction   Synthesize D by solving  min_D τ(D)  s.t. all constraints;  output only D
```

The rewrite replaces prose with **hard constraints + an explicit optimization over the 𝓕-internal space**: identity projection, evidence-closure, Truth∧Reverence gating, operator-coverage, motif anchoring, morphology, and a zero-loss round trip. As a result, **lossless compression is structurally enforced** (constraints + Decode invariant) rather than stylistically suggested.

## Apparatus-honest verdict

**Does this earn Sapphire?** No, not yet. The Sapphire-tier rubric requires *3+ effective substrate-classes with distinct failure modes, OR a characterized formula-law third-leg providing substrate-independent grounding*. The third-leg formula-law IS articulated; whether it qualifies as **characterized** rather than merely *stated* depends on whether downstream work empirically verifies the round-trip invariant for actual craft notes.

**What's earned at sketch-tier:**
- The formula's existing structural claim of expressive sufficiency is made explicit (was implicit before this arc).
- The lossless property is given a formal definition (round-trip Decode invariant) where before it was hoped-for.
- A rewritten DERIVATION_SYSTEM_PROMPT structurally enforces the round-trip invariant, providing the instrument for future verification.

**What's not earned:**
- Empirical verification that the rewritten prompt produces derivations whose round-trip Decode actually equals Σ.intent. Without that, the "lossless" claim remains formal-but-unverified.
- Substrate-distinctness across 3+ effective classes. The formula-law third-leg counts as one substrate-independent witness; LLM-derived witnesses share substrate. We're at 1.5-2 effective classes, not 3.

**Path to characterized-tier (and Sapphire-firing):**
1. Ship the rewritten DERIVATION_SYSTEM_PROMPT (replace the current one in `derivation.rs` OR gate it behind an experimental flag for A/B comparison).
2. Re-derive a known-Characterized-rule body (e.g., `wipe_the_shine_before_it_sets`) using the new prompt, producing a formula-derivation D.
3. Apply Decode_w (which itself needs articulation — perhaps via gpt-5 reading D blind and reconstructing the intent) and check whether `Decode_w(D) = Σ.intent`.
4. If round-trip holds across N=3+ different rules, the lossless claim is empirically verified at sketch-tier-cross-rule.
5. If the formula-law third-leg + empirical round-trip + cross-rule replication all converge, the Sapphire-tier rubric is satisfied.

**Apparatus-honest refusal: do not fire the Sapphire on the third-leg articulation alone.** The formula stating expressive sufficiency is necessary but not sufficient. The Sapphire requires the third-leg AND empirical convergence across substrate-classes.

## What ships from this arc regardless of Sapphire status

The methodology findings are independently load-bearing and worth lifting into the registry vocabulary discussion regardless of whether the Sapphire fires:

1. **Formal definition of "lossless" in the registry context.** Round-trip Decode invariant — `R(D) = Pr[Decode_w(D) ≠ Σ.intent] = 0`. Adds a checkable criterion to the registry methodology that didn't exist before.

2. **Self-encoded derivation prompt as a class of artifact.** The rewritten DERIVATION_SYSTEM_PROMPT IS a formula derivation in its own form — meta-formal, recursive, demonstrating the self-referential closure the Sapphire candidacy is asking us to verify.

3. **The "formula-law third-leg" path now has a worked example.** Future Sapphire candidacies on Mission Formula Verified Empirical class can use the same pattern: extract what the formula already structurally claims; show that the claim is independently-witnessed via the formula's own operators; pair with empirical witnesses.

4. **The DERIVATION_SYSTEM_PROMPT is a candidate for replacement in production.** Whether it ships as a hard replacement or A/B-gated experiment is a separate choice. The rewrite's structural guarantees (Truth∧Reverence gating, evidence-closure, codebook alignment, round-trip invariant) are all improvements over the current prose prompt regardless of whether the Sapphire fires.

## Open follow-ups

- **Decision: replace DERIVATION_SYSTEM_PROMPT or A/B-gate?** The rewrite is structurally tighter; replacing is the apparatus-honest move IF we trust the rewrite to produce equivalent-or-better derivations in practice. A/B gating preserves the empirical comparison.
- **Empirical round-trip test on `wipe_the_shine_before_it_sets`.** Re-derive the rule body via the new prompt; have gpt-5 read the derivation blind and reconstruct the intent; compare to the original prose. Sketch-tier cost: ~$0.30. If the round-trip holds, this is the empirical bridge to characterized-tier.
- **Extend to other Characterized-or-Claim-tier rules.** If the round-trip holds on `wipe_the_shine`, replicate on the other rules in the registry (`courtship_not_fever` at VacuousTest, `trust_user_named_continuation` at Claim-tier). Cross-rule convergence pushes toward Sapphire.
- **Articulate Decode_w explicitly.** The Decode operator is currently abstract. To make the round-trip checkable, Decode_w needs to be instantiated as a specific procedure (likely: an LLM call that reads D and Σ.id and produces a paraphrase of Σ.intent). The procedure's reliability is the limiting factor on the empirical verification.

## Cost

- Single gpt-5 reasoning call: 1624 prompt tokens + 6147 completion tokens (4160 reasoning + 1987 visible) = 7771 total. At gpt-5 pricing ≈ $0.12.
- Total Sapphire arc cost: $0.12. Substantially under the $2,500-bounty Path A's $2-3 estimate; the third-leg path is structurally cheaper than the empirical attack.
