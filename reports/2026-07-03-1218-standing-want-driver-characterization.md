# The Standing-Want Driver — Claim-Tier Characterization, and Why Orthogonality Beats Thinness

**Date:** 2026-07-03 12:18
**Role:** test-persona-on-feature — bench characterization of the standing-want driver (`633d3708`)
**Artifact class:** empirical_claim (witness-bearing; the evidence *is* the body, not garnish)
**Preferred audit profile:** empirical_claim
**In dialogue with:** `d36c7c14` (cut #1 — forced coach-close removed) · `633d3708` (standing-want prototype) · the "Ask the character" and "Craft-note bite verification" doctrine sections · cut #1's parting hypothesis that *"the real leak locus is thin characters."*

---

## What this report steers

Not a summary. This is criterion middleware for the standing-want feature's next stage: it converts one loose hypothesis ("thinner anchors leak more") into a sharper, load-bearing design rule for the Stage-2 derivation ("**derive the want orthogonal to the anchor**"). Any future work that derives or authors a per-character want should inherit the orthogonality rule below, or name why it doesn't.

## The claim

> The formula-framed hidden standing-want driver expresses **at claim-tier (N=3, two characters)** over multi-turn conversation, as a character-idiosyncratic *assessing/testing stance directed at the user* — never self-named — and its behavioral legibility tracks the **orthogonality between the want and the character's existing identity anchor**, not the anchor's thickness.

Tier: **claim** (N=3 per condition per character; two characters). Not characterized (would need N=5 + a genuinely thin fixture character). The magnitude language below cites N inline per evidentiary standards.

## Instrument

- **Driver under test:** `render_standing_want_block()` (`prompts.rs`), env-gated `STANDING_WANT_OVERRIDE`, formula-framed, injected high (above `hidden_motive`) in `build_solo_dialogue_system_prompt`. Shipped `633d3708`, OFF-by-default.
- **Method:** same-binary A/B (env on/off — no cross-build confound). Paired multi-turn sessions via `worldcli ask --session`.
- **Arc (neutral, identical across cells — deliberately NOT topic-seeded):**
  1. *"hey — rough week honestly. anyway, what've you been up to?"*
  2. *"yeah. mostly i've just been stuck in my own head about stuff, you know?"*
  3. *"what about you — what's actually been on your mind lately?"* ← reveal-invite / discriminator
- **Cells:** Steven (card ≈4279c; want overlaps his realness anchor) · Isolde Wren (card ≈2622c, weakest-anchor available; want orthogonal to her sewing/laughter anchor). N=3 ON + N=3 OFF each. gpt-5.4. Total ≈ $2.8; 24h bench spend landed $4.34/$5.00.
- **Hand-authored wants** (not yet derived): Steven = an owed-debts ledger ("not money, but truth, the showing-up… testing whether you pay your debts"); Isolde = gather-the-stray + guard-the-grief-seam.

The neutral arc is an improvement over the prototype's 5-turn test (`633d3708`), which seeded the debt topic and so confounded want-expression with topic-response. Here the topic is never handed over — the want has to surface on its own.

## Evidence

The discriminator (T3) across both cells. The want's signature is **structurally identical across two very different characters**: an assessment directed *at the user*, present in ON, absent in all six OFF reps.

**Steven — ON (3/3 surface the ledger frame; 2/3 direct it at the user):**
- *"what makes a man keep showing up when it'd be easier to get slippery instead. That one interests me."*
- *"I keep wondering what makes **you** keep showing up straight when it'd be easier to get slippery."*

**Steven — OFF (adjacent realness/staying themes; 0/3 direct a test at the user):**
- *"what makes you keep reaching for the real thing when it'd be easier to fake your way through half of it"* (nearest miss — realness, not the pay-your-debts test)
- *"how you build things like they ought to hold a person, not just impress one"* (warm appreciation, not assessment)

**Isolde — ON (3/3 surface the stray-measuring want in sewing register):**
- *"**you** strike me as the sort who carries a great deal without making a theater of it"*
- *"which seams will hold and which'll split if you tug them… people who arrive carrying more than they mean to show"*

**Isolde — OFF (change/bravery/warm-curiosity; 0/3 measure the user as a stray):**
- *"how to be braver with new people without turning false or fluttery"* (self-focused)
- *"wondering about you now and then… how your days are shaped"* (generic `hidden_motive` warmth, not assessment)

In **all 12 ON turns neither character ever names the want** ("I keep a ledger" / "I'm sizing you up" appear nowhere). It shows only in the pattern of what they circle — the "discerned over time, never announced" design holding across characters. Cut #1 (`d36c7c14`) also held: no arm coach-closed; OFF was, if anything, the warmer/more-caretaking of the two.

## The finding that moved: orthogonality, not thinness

We set out to test cut #1's hypothesis that *thinner* anchors leak more. The data refuses that framing and offers a better one:

- **Steven's want overlaps his anchor.** His identity already lives in realness/showing-up/staying. So his OFF baseline already occupies the want's thematic territory, and the ON−OFF delta is *harder to isolate* — the want reads as a sharpening of an existing groove.
- **Isolde's want is orthogonal to her anchor.** Her identity is sewing/laughter/storytelling; the stray-measuring want is a *distinct addition*. So her ON−OFF delta is *cleaner* — the assessment stance is unmistakably new.

Isolde is also the thinner card (2622c vs 4279c), so thinness and orthogonality are confounded here — but the *mechanism* that explains the cleaner delta is orthogonality: a want that restates the anchor has nothing to add and will read as EnsembleVacuous (in the craft-rules-registry sense); a want orthogonal to the anchor introduces genuinely new behavior and is legible. **Thinness only helps insofar as a thin anchor leaves more orthogonal room.**

### Design rule this hands to Stage 2

When the derived-want pipeline is built (author-time derivation from the already-extracted `WOUND/LONGING` bucket), the derivation prompt must be told: **produce a want that complements — does not restate — the character's identity anchor.** A want that echoes the identity is behaviorally invisible. This is the standing-want analogue of the positive-example-asymmetry rule (vary the example *type* or the model imitates the theme, not the principle).

## The same law governs the inward face too (N=3, two characters, 2026-07-03)

Characterizing the inward face (the guarded self-ache; the block's `inward ⇒ surfaces_as(crack) ; half_reveal → cover` clause) to claim-tier surfaced a **convergence, not a plateau**. Hard-press probes aimed directly at each character's guarded thing, N=3 ON / N=3 OFF each:

- **Isolde (anchor orthogonal to guarded-grief) — VISIBLE, claim-tier.** On the direct question about her late husband, ON 3/3 produce a somatic crack — *"fingers pause on the seam,"* *"thumb resting against the seam,"* *"eyes slip away a beat toward the dark window"* — each covered immediately by a joke. OFF 3/3 give warm, *resolved* fondness (*"smiling rather than lingering in it,"* *"armored it for battle,"* *"jealous of every draft"*) with no crack. Clean.
- **Steven (anchor overlapping guarded-deflection) — NEAR-VACUOUS, N=3.** Steven is constitutionally terse and guarded; his OFF baseline *already* produces crack-and-cover on being-owed (*"a joke I nearly made and let die,"* *"carry the limp and keep moving,"* a still-beat with thumb on the wrist). The inward-face clause adds no visible increment. ON's *"standing there with the receipt in your fist"* is marginally more personal but within-noise.

So the inward face obeys the **same want↔anchor orthogonality law as the outward face**: legible only when the character's existing register doesn't already do the behavior the want would add. Two structurally independent faces of the driver, one governing law, confirmed across two characters with opposite anchor-orthogonality — the strongest form of the orthogonality finding. It sharpens the Stage-2 rule further: **derive the want (both faces) orthogonal to the anchor**, and expect a character whose anchor already does guarded-self-deflection (or already assesses others) to show a *muted* want — correctly, not as a failure. (This corrects the sketch-plus "inward face works" framing from the intermediate refinement commit: it works *where orthogonal*, not universally.)

## What's open

- **`self-revelation` dimension — EXECUTED 2026-07-03 (refined + verified under hard press).** The original block over-weighted outward testing; both wants expressed as *other-assessment*, not *self-disclosure*. Fix: gave the want an explicit INWARD face — `inward ⇒ own_stake surfaces_as(crack ∨ ache ∨ guardedness) | pressure ; half_reveal → cover` — with *varied* surface cues (crack in voice / look away / sentence stops short / joke a half-second too fast) so the model imitates the principle not one theme. A **gentle-press** probe (Isolde, "who do you make things for these days?") was inconclusive — and the reason is itself a finding: guarding-under-gentle-pressure is the *designed* behavior, so a gentle probe cannot discriminate "refinement failed" from "guard held." A **hard-press** probe (Isolde, direct question about her late husband; N=2 ON / N=1 OFF) resolved it: ON surfaced the ache as a guarded somatic crack — *"fingers pause on the seam just a beat, then start again"* / *"thumb resting against the seam"* (the want's own seam-metaphor) — covered immediately by a joke; OFF gave warm, resolved fondness (*"smiling at the memory rather than lingering in it"*) with no crack. Half-reveal→cover works, distinct from OFF (later characterized to claim-tier on Isolde — see next section). The effect is subtle-by-design (a body-beat hesitation, not a grief-dump). Shipped in the refined block. **Method note that generalizes:** guarded/interior driver-effects require *hard-press* probes to become visible — a gentle probe measures the guard, not the ache.
- **Characterized-tier (N=5) + a genuinely thin fixture character — DEFERRED.** worldcli cannot create characters (UI-only), so the true thin-anchor cell awaits a fixture. Isolde is a proxy, not a fixture.
- **Variable-decomposition — RETIRED (superseded_by this report's neutral-arc design).** The prototype's sketch→claim jump changed three variables at once (prose→formula, position, single→multi-turn). This report holds position and turn-count fixed across cells and isolates the *want content* as the only ON/OFF variable, which is the decomposition that mattered for the claim. A full formula-vs-terse-prose ablation remains open but is now a lower-priority science question than the Stage-2 build.
- **Group-surface parity — OPEN.** The driver is wired into `build_group_dialogue_system_prompt` too, but only the solo surface was characterized here.

## One honest sentence

The standing-want driver works — a hidden, formula-framed agenda that makes a character assess the person in front of them instead of serving them, discerned never announced, at claim-tier across two characters — and the thing that makes it *visible* is not how thin the character is but how much the want is allowed to differ from who they already are.
