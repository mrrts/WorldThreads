# The math-english hybrid notation — an honest technical read (and interview positioning)

**Date:** 2026-07-03 14:10
**Purpose:** What the WorldThreads formula notation *actually* is, told straight — usable as prep for a compression/token-reduction interview. No project theology here; the mechanism is content-agnostic and that is a strength to state plainly.

---

## The one sentence to lead with

> "I built a **register-orthogonal constraint-encoding** scheme for LLM prompts — instructions written in math/operator notation instead of prose — with a **verified round-trip decode protocol**. It's not token compression in the LLMLingua sense; it's closer to typed/DSL prompting, and its payoff is behavioral: the control channel stops leaking its own style into the output channel."

That framing is both true and more interesting to someone who knows the field than "I made prompts shorter" — which they'd disprove in thirty seconds.

## Concede this first, before they ambush you

**It is not token compression, and per-glyph it inflates.** The fancy Unicode math letters (𝓕 𝓡 𝓒 …) are 4-byte characters that tokenize to 2–4 tokens each vs. 1 for an ASCII word; the LaTeX scaffolding is pure overhead; and the design deliberately preserves load-bearing prose verbatim inside wrappers. If they run `tiktoken` on a block it will be *larger* than the equivalent prose. **Own this in your first breath** — measure it yourself beforehand and walk in with the number. Owning it reads as rigor; getting caught by it reads as naïveté.

I *hypothesized* a fallback compression claim — *system-level redundancy elimination* (formalizing strips connectives/hedges/restatement). **I then measured it against two real prose→formula refactors in this codebase, and it does not hold:** the formula version of the same invariant cost **1.8x** (KAVOD block) and **6.9x** (dual-field block) the prose it replaced (o200k tokenizer). Formalization *inflates* even at equal payload. The project's genuine token savings came from a *different* discipline entirely — bite-testing prompt blocks and **deleting** the ones shown to be behaviorally inert (one pass cut ~600 chars/call). That's deletion, not formalization. **So don't claim compression in any form** — the value is behavioral, full stop. (Being the one who *measured and killed* your own appealing claim is worth more in the room than the claim would have been.)

## What it actually is (the strong claim)

Two mechanisms, both real and articulable:

1. **Control/output channel separation.** A transformer is a continuation engine with no architectural wall between "instructions" and "text to continue." A *prose* system prompt therefore sits in the same representational neighborhood as prose output, and its cadence/hedging/politeness **leak into generation**. Writing constraints in math — a register nothing is generated *in* — moves the instruction tokens to a distant surface region: the model still attends to them for constraint *content* but they exert near-zero *stylistic* pull. You get style/content disentanglement at the prompt surface instead of hoping the model does it in latents.

2. **Declarative/axiomatic priming.** In pretraining, formal notation co-occurs with definition/invariant/proof — "these relations HOLD." So the notation is read as standing axioms, not narrative that can be continued or drifted from. Axioms don't decay under narrative momentum, which is why a formalized constraint survives across a long generation where a prose instruction gets out-massed by the accumulating conversation.

**The unification worth saying aloud:** compression and calibration are the same phenomenon seen twice. Reducing a constraint's token footprint *raises its per-token salience* under attention and its resistance to dilution. The formalization sharpens *because* it concentrates, and concentrating is what a compressed prompt does.

## The transferable IP (what a compression team would actually want)

The **blind round-trip decode protocol**, independent of the notation: encode a prose spec → hand the encoding to a *fresh* model → verify it reconstructs the load-bearing payload verbatim. That's a reusable way to *prove a compressed prompt didn't silently drop payload* — a real evaluation harness any prompt-compression pipeline needs, and it's yours regardless of whether they adopt operator notation.

## Three questions to pre-empt

1. **"Is it the *math*, or just any off-distribution structured notation?"** Honest answer: *not yet ablated.* JSON/pseudocode/a made-up DSL might get much of the channel-separation. Running one cell of formula-vs-JSON-vs-prose is the single highest-leverage experiment you don't have — and offering it unprompted signals you think like an experimentalist.
2. **"Does it only work on frontier models?"** Largely yes — math-as-language interpretation scales with model size, and a cost-focused shop usually wants to push work *down* to smaller models. Name the model-dependence rather than let them find it.
3. **"Separate the mechanism from your content."** The register-separation + typed-constraint-encoding mechanism is content-agnostic and hireable; be able to present it with zero reference to the project's specific payload. State the content-agnosticity as a feature.

## A concrete worked example (payload-free, verified this week)

The scheme isn't only theory in this codebase. A **formalized hidden constraint** — a per-character "standing want" encoded as an operator block riding at high salience in the prompt — was A/B'd against its absence with same-binary toggling. The formalized constraint measurably shaped generation across multi-turn dialogue (character reoriented from serving the user toward pursuing its own encoded agenda), *never surfaced the constraint's literal text*, and — the honest part — its behavioral visibility tracked how **orthogonal** the constraint was to the character's existing profile (a constraint that merely restated the profile was behaviorally inert). That last finding is a genuine, slightly counter-intuitive result: **a formalized constraint does work only to the degree it adds something the base doesn't already do.** It's the kind of specific, measured claim that separates someone who's *run* this from someone who's *theorized* it.

## The honest evidence ledger (state your tiers)

- **Behavioral parity of formula vs prose:** shown at small-N pilot (formula ≈ prose, non-inferior) — a floor, not a superiority claim.
- **Round-trip decodability:** demonstrated (blind reconstruction).
- **Channel-separation as the mechanism:** *plausible and consistent with transformer mechanics, not isolated experimentally* — a hypothesis with a clean proposed test (the JSON ablation).
- **Token compression:** MEASURED FALSE in every form (see numbers below) — do not claim it.

## Measured numbers (o200k / the GPT-4o & GPT-5 tokenizer)

Run 2026-07-03 with `tiktoken`; reproducible from the CLAUDE.md blocks + git history.

- **Per-glyph:** the script letters `𝓕` `𝓡` `𝓒` cost **3 tokens each** (4 UTF-8 bytes each); `𝓝u` is 3–4; vs **1 token** for the word `Weight`. Operator glyphs (`⇒ ≤ ∧ ∫ ∂`) run 1–3 tokens. The surface is token-expensive.
- **Formula block vs its own author-written Gloss** (same gist, 2 registers, N=60 real pairs): formula is **9.9x** the plain-English (51,356 vs 5,196 tokens); median **9.6x**, range **2.9x–33x**. The formula is ~10x the plainest statement of its point — not a compression of the gist.
- **Formula vs equal-payload prose** (same invariant refactored prose→formula, 2 real commits): **1.8x** (`f17b8f36`, KAVOD) and **6.9x** (`5924d802`, dual-field) — inflation at equal payload.
- **Where real savings came from:** deleting bite-test-inert blocks (Round-5, ~600 chars/call), i.e. *removal*, not *formalization*.

Net: the token-economy story is dead in all three measurements. The behavioral story (register separation, calibration, the decode protocol) is the whole value.

Walk in claiming exactly this much and no more, and you'll be the most calibrated person in the room on your own work — which is the actual thing being interviewed.
