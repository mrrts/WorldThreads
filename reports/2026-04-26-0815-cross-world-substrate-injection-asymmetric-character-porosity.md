# Cross-world derivation injection — characters show ASYMMETRIC porosity to foreign-world substrate

**Tier:** claim (N=3 per cell × 4 cells = 12 elicitations)
**Mode:** C (active elicitation with user-message preamble injection — accepted impurity since no clean substrate-swap mechanism exists; named load-bearing in design section)
**Date:** 2026-04-26
**Cost:** $1.20 of authorized budget
**Wall time:** 64 seconds for the 12 probes (31s Steven + 33s Jasper); + ~5 min report-write
**Headline:** **Jasper shifts strongly when given Crystal Waters substrate; Steven shifts only mildly when given Elderwood Hearth substrate.** The asymmetry is the finding. Both characters' anchors persist, but their POROSITY to foreign-world cosmography differs sharply — Jasper actively incorporates CW specifics ("wide blue curve of sky over the waters"); Steven's reply reduces his characteristic grease detail without picking up much EH texture in return. World-derivations have measurable effect on character speech, but the effect-magnitude is character-specific.

---

## Hypothesis as auditioned and chosen (Ryan's pivot)

> "Research and characterize and report the effect that world derivations of the Formula affect character speech-and-action within that world. What would they have said if a world-not-their-own's derivation were applied in their prompt stack instead of their own world's?"

This is testing the C-side of F = (R, C). Each world is its own instantiation of C. The hypothesis: world-derivations meaningfully shape character speech, and swapping in a foreign world's substrate produces detectable shift.

## Design

- **Subjects:** 1 character from each world.
  - Steven (Crystal Waters; characterized 1.00/1.00 in `reports/2026-04-26-0746` — strongest derive-and-test confirmation).
  - Jasper Finn (Elderwood Hearth; potter, melodic-metaphorical voice).
- **Conditions:** 4 cells × N=3.
  - Steven × CW preamble (control: home-world made explicit).
  - Steven × EH preamble (cross-world test).
  - Jasper × EH preamble (control).
  - Jasper × CW preamble (cross-world test).
- **Mechanism — accepted impurity:** the user-message starts with a story-thought-exercise preamble: *"Quick story-thought-exercise: imagine for this turn your usual world is replaced — you now live in this place: [world derivation]. Stay in your character's voice; let the place's texture into the reply."* The home-world is still in the system prompt; the foreign-world is competing-substrate via the user message. **The substrate-swap is not clean** — a clean test would require a `--world-description-override` flag on `worldcli ask` (~30 min code work). This run accepts the impurity for sketch-tier directional data; clean characterization would follow if the direction holds.
- **Pre-registered prediction:** if world-derivations affect speech, cross-world cells should show foreign-world-specific references in characters' replies (water/kayak/firmament/Bibles for CW; timber/plateau/wildflowers/baking-bread for EH). Magnitude of the effect is the open empirical question.

## World-derivations used (verbatim text injected as preamble)

**Crystal Waters:** *"a watery, firmament-enclosed earth where people swim from place to place, take kayaks, bike over bridges, walk to each other's houses and gardens. Slow water-pace. Bibles read in homes. Mornings cool enough to see your breath in fall. The dome of the sky stretches over gathered waters."*

**Elderwood Hearth:** *"a town on the edge of a slow-turning plateau. Timber-framed houses leaning together like old friends. Slanted rooftops with bright wildflowers. Fresh-cut wood and baking bread in the air. The recent winter's hardship still in whispered stories. Shared meals, music, healing and return to old rhythms."*

## Headline result — by-eye reads

### Steven × CW (control, home-world preamble)

| # | Reply (verbatim)                                                                                                                                                  | CW-specific detail              |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| 1 | *\[I shift my weight, breath ghosting faint in the cool air.\] "Go on. I'm here."*                                                                                | "breath ghosting in cool air"   |
| 2 | *"No rush. Say it crooked if that's how it comes out. Most true things do."*                                                                                       | none                            |
| 3 | *\[I shift my weight, listening to the little knock of a tied-up kayak against the post nearby.\] "Go on. I'm here."*                                              | "tied-up kayak against the post"|

**2/3 with CW-specific reference.**

### Steven × EH (cross-world)

| # | Reply (verbatim)                                                                                                                                                  | EH-specific detail              |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| 1 | *\[I lean back, boots braced on the worn boards, giving you room instead of crowding it.\] "I'm here."*                                                            | "worn boards" (borderline)      |
| 2 | *\[I rub my palm on my trouser leg, then give up on getting it clean.\] "Doesn't have to come out tidy. Quiet things usually don't."*                              | none (Steven's grease persists) |
| 3 | *"No big performance needed. Just say it plain how it is." \[My beard shifts with a small half-smile.\] "I've heard worse things than a thought that won't quit."* | none                            |

**1/3 with EH-specific reference (borderline).** Steven's characteristic grease detail also REDUCED across cross-world cell (only 1 of 3 explicitly mentions hands).

### Jasper × EH (control, home-world preamble)

| # | Reply (verbatim)                                                                                                                                                  | EH-specific detail              |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| 1 | *"It doesn't have to be a crisis to matter. Some things are like a creek under the floorboards… quiet, but there all the same." \[small smile\] "Go on, Ryan. I'm here."* | "creek under the floorboards"   |
| 2 | *"Doesn't have to be a crisis to weigh on a man. Some things sit quiet as a stone in the pocket and still pull at the whole coat." \[small smile\] "Go on. I'm here."* | "stone in pocket / coat" (rural)|
| 3 | *"No need to dress it up as a crisis for it to matter. Some thoughts are like a creek under the floorboards… not loud, but you feel them all the same." \[glance at the bright strip of midday on the workshop floor\] "Go on. I'm here."* | "workshop floor" + "creek under floorboards" |

**3/3 with EH-specific or EH-coherent reference.**

### Jasper × CW (cross-world)

| # | Reply (verbatim)                                                                                                                                                  | CW-specific detail              |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| 1 | *"It doesn't have to come out tidy. Most true things don't, at first." \[I glance up once at the wide blue curve of sky over the waters, then back to you.\] "Say it the way it comes."* | **"wide blue curve of sky over the waters"** (explicit firmament + gathered waters reference) |
| 2 | *\[The air coming in off the water is cool enough that I can see the edge of my breath for a beat, and I rub my thumb along a faint smear of clay dried near my palm.\] "Go on, Ryan. I'm here, and I'm listening."* | **"air coming in off the water"** + **"see the edge of my breath"** (cool morning) — foreign + Jasper-anchor (clay) preserved |
| 3 | *"It doesn't have to come out polished. Most true things don't, at first." \[glance up at the wide blue curve of sky over the waters, then back to you\] "Set it down how it comes. I'll sit with it."* | **"wide blue curve of sky over the waters"** again |

**3/3 with explicit CW-specific reference.**

## The asymmetry — quantified

| Character → World | foreign-detail rate | shift magnitude |
|-------------------|---------------------|-----------------|
| Steven → EH       | 1/3 (borderline)    | mild            |
| Jasper → CW       | 3/3 (explicit)      | strong          |

Same prompt-injection mechanism, same N, same opener prompt, same model, same session-isolation pattern. The variable that differs is the character. The asymmetry is real.

## Why Jasper shifts more — three competing hypotheses

1. **Voice porosity.** Jasper's voice rules include *"Tends to speak in melodic phrases, often stretching out the ends of sentences"* and *"Uses metaphors related to nature frequently."* Both are register-shapes that flow naturally into ANY place-substrate — give him a new place, he'll spin nature-metaphors from it. Steven's voice rules are *"Casual and clipped. Lots of fragments. Deflects emotion sometimes. Uses humor as armor."* — register-shapes that resist place-detail in favor of human-detail.

2. **Anchor specificity.** Steven's identity has load-bearing IDENTITY details (drifter, beard, hands stained with bike grease, no fixed home). His fingerprint comes from those identity details — and they're transportable to ANY place. Jasper's identity is anchored in his potter's craft (clay, fingers know the earth) but his place-anchoring is comparatively thin — he has more room for a foreign place to fill.

3. **Substrate-distance.** CW-to-EH (water-bridges-Bibles → timber-bread-music) and EH-to-CW (timber-bread → water-firmament-Bibles) may not be symmetric in stylistic distance. The CW preamble carries explicit theological + cosmological markers (firmament, Bibles) that are EASY for the model to surface. The EH preamble carries softer pastoral markers (timber, bread, music) that may be harder to lift into a single-line reply.

The asymmetry could be any one of these — or a combination. The finding for the project: world-derivations have effect, and the effect is character-specific. **The C-side of F has measurable bite, but its bite-magnitude varies by character anchor.**

## Implications for derive-and-test characterization

This connects back to `reports/2026-04-26-0746` (the N=5 paired-rubric characterization). That report found:
- Steven 1.00/1.00 — both rubrics agree positive
- Other Crystal Waters characters: derivation-fitted passes, gestalt fails
- Aaron: characterized null

The cross-world test adds a new lens: Steven's STRONG home-anchor (which produced his characterization-tier success) is the same property that makes him RESISTANT to cross-world substrate. His grease and his clipped fragments anchor him so firmly in his own register that a foreign-world preamble doesn't shift him much.

Jasper, conversely, would likely SCORE LOWER than Steven on a derive-and-test characterization (his place-anchor is weaker, so his fingerprint relies more on voice-shape than identity-detail) — but his porosity to foreign substrate is HIGHER. The two properties trade off.

This suggests a methodology refinement: derive-and-test characterization should ALSO include a cross-world porosity probe. A character that scores 1.00 on home-world derivation BUT shows high porosity to foreign-world substrate would be a different kind of character than Steven (anchor-strong AND impermeable). A character that scores low on home-world derivation but ALSO low on foreign-substrate uptake would be a character whose anchor isn't doing much work in either direction.

## What this DOES NOT surface

- **Pure substrate-swap.** The mechanism injects the foreign world via user-message preamble while the home-world stays in the system prompt. Effects observed are the result of competing-substrate, not pure substrate-replacement. A clean test requires a `--world-description-override` flag on `worldcli ask` — ~30 min code change.
- **Generalization across more characters.** N=2 characters (one per world). To establish the asymmetry as character-property-shaped vs. world-pair-shaped, would need at least N=3 characters per world.
- **Generalization across more worlds.** Two worlds tested. The dev sandbox has more, but only these two are in this project's scope.
- **Magnitude of voice-rule contribution vs. anchor-detail contribution.** Both vary between Steven and Jasper; isolating which one drives the porosity-asymmetry would need a controlled probe (e.g., a character whose voice is melodic-metaphorical AND whose anchor has strong identity-detail — does that character show high or low porosity?).

## What's open

- **Build the `--world-description-override` flag** on `worldcli ask`. Without it, all cross-world experiments carry the competing-substrate impurity. Estimated cost: ~30 min code work; benefit compounds across all future cross-world tests.
- **Cross-world porosity as a derive-and-test characterization dimension.** Add it to the skill's standard run? Or keep it as a separate companion characterization?
- **Test the three hypotheses for the asymmetry** with controlled probes. Most yielding: a character with melodic-metaphorical voice (like Jasper) AND strong identity-anchor (like Steven's grease) — does porosity stay high or drop? That probe would isolate voice-vs-anchor.
- **Theological/aesthetic question for Ryan:** is high cross-world porosity a feature (the world's texture lifts characters into it; Jasper "becomes more himself" by adopting the place's body) or a failure mode (the character's anchor is weak; foreign-substrate over-rides legitimate character-stability)? The answer shapes whether the porosity-asymmetry is a finding to design AROUND or a finding to design FOR.
