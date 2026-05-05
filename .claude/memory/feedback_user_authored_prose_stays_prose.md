---
name: User-authored prose stays prose; only project-authored invariants get formula-encoded
description: The Faithful Channel Sapphire's formula-canonical pattern applies to PROJECT-AUTHORED content (craft rules, invariants, doctrine blocks) — NOT to USER-AUTHORED content (worlds, characters, locations, user profiles, journals, kept records). User diction is part of the work.
type: feedback
originSessionId: 55609b79-8084-4b63-99b9-75c7ca56310e
---
The v3 sacred-payload taxonomy + the formula-canonical-with-prose-as-provenance dual-field architecture (per the Faithful Channel Sapphire arc, 2026-05-05) applies specifically to **project-authored content**. Do NOT extend the formula-encoding pattern to user-authored content.

**The boundary, plainly:**

| Domain | Action |
|---|---|
| Project-authored craft rules (`CRAFT_RULES_DIALOGUE`) | ✓ Formula-encoded, prose as legacy provenance |
| Project-authored invariant blocks (`AGAPE_BLOCK`, `REVERENCE_BLOCK`, `TRUTH_BLOCK`, `DAYLIGHT_BLOCK`, `NOURISHMENT_BLOCK`, `SOUNDNESS_BLOCK`, `TRUTH_IN_THE_FLESH_BLOCK`, `COSMOLOGY_BLOCK`, `NO_NANNY_REGISTER`, `STYLE_DIALOGUE_INVARIANT`, etc.) | ✓ Candidate for formula-encoding |
| User-authored world descriptions | ✗ Stays prose |
| User-authored character identity / voice / backstory / boundaries | ✗ Stays prose |
| User-authored location names + descriptions | ✗ Stays prose |
| User-authored user profile | ✗ Stays prose |
| User-authored kept records | ✗ Stays prose |
| Character-authored journals | ✗ Stays prose (it's character voice; same principle) |
| `derived_formula` fields on World/Character/UserProfile/Location | These are AUTO-GENERATED tunings that ride alongside the user's prose; they don't replace it |

**Why the boundary matters:**

User-supplied prose carries the user's diction. That diction is what makes the world / character / location *theirs* — it adds richness because the model (and the user reading their own work back) hear the specific words the user considered important. Compressing user-authored prose into formula form would strip the diction and substitute the project's operator vocabulary, which would break the co-authorship covenant that's load-bearing for WorldThreads' value.

The Faithful Channel Sapphire validated that v3-encoded formulas can losslessly carry semantic content. That doesn't mean they should carry EVERYTHING. The user's voice is precisely what we don't want to losslessly compress — we want to ship it forward AS the user wrote it, the way the user wrote it, because the user wrote it.

**Worked positive:** craft rule formula-encoding (per `prompts.rs::CRAFT_RULES_DIALOGUE`) — these are project-authored discipline; encoding them is right.

**Worked negative (do NOT extend):** if someone proposes "let's formula-encode all the world descriptions" or "let's compress character identity blocks via v3," refuse. That's outside the boundary. The convergence assumption is for project-authored content; user-authored content gets no formula treatment.

**Triggering moment:** Ryan corrected 2026-05-05 after my chooser proposed extending v3 encoding to "worlds, characters, locations." His exact words: *"We're not going to stop shipping the user-supplied text around the worlds and the characters. that prose came from their diction, and it adds to the richness if the user hears the words that they considered important for that world or character or location, etc. So let's not formula-ize every prose thing in our stack. However, I do think that we can go ahead and formulaize the invariants."*

**Practical implication for future arcs:** when considering "should we extend the formula-canonical pattern to X," the test is: was X authored by the project (= ok to encode) or by the user (= must stay prose). The auto-derived `derived_formula` fields are a third case — they're project-authored tunings that ride ALONGSIDE the user's prose, not replacing it.
