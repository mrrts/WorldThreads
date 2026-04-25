# Prop Comedy Diagnostic — and the universal-vs-character-mode distinction the data forces

*2026-04-25 20:08. Free diagnostic on the Aaron-Darren group chat, run after the 1952 trajectory report named "deliberately seek cross-character failure modes that do manifest in baseline but are not canonical to any single voice" as the next frontier. The diagnostic surfaces a finding that's both narrower than predicted (the candidate isn't cross-character) and deeper than expected (it forces a distinction between universal-craft principles and character-mode-specific principles that the meta-rules predict but didn't yet name).*

## What the diagnostic was looking for

The 1952 trajectory report's logic implied that craft notes can bite cleanly only when targeting model-general failure modes — patterns that manifest across multiple characters at similar rates and aren't canonical to any specific voice. Anything that's character-canonical to even one voice would erode that voice if suppressed stack-wide.

The free diagnostic: take the last 50 messages of the Aaron-Darren group chat, look across both characters' assistant turns for shared patterns that read as model-default rather than character-canonical.

## The first finding — phrasal LLM-tics are essentially absent

A frequency search for classic LLM-residue phrases (*"I'd say,"* *"let me,"* *"to be honest,"* *"frankly,"* *"in some sense,"* *"kind of,"* *"sort of,"* *"I suppose,"* *"you know"*) returned almost nothing. *"I mean"* appears 3 times across 25 turns; *"I think"* appears once. The cosmology, character anchors, and craft-note stack have done thorough work suppressing the obvious LLM-voice tics. There is no low-hanging fruit at the phrase level.

## The second finding — what remains universal is structural, not phrasal

Four patterns appear at near-100% rates across both characters:

1. 1-to-5-word verdict opener with terminal period in quotes (every reply opens this way)
2. Asterisk-bracketed action beat in the first paragraph (every reply has one)
3. Compound-comma action chains (*"verb, then verb, and verb"* — extremely common)
4. Multi-paragraph structure (verbal beat → action → secondary verbal)

These are the project's deliberate prose-style choices — not failure modes per se. The verdict-opener pattern is `verdict_without_over_explanation_dialogue` firing as designed. The action-beat structure is `hands_as_coolant_dialogue` and the broader scene-painting commitment.

But the 100% saturation rates across both characters made one candidate failure mode jump out: **action-beat-on-every-reply** as a model-default density that might be candidate for some restraint. Every single reply has at least one asterisk action beat; many have 2-3.

## Aaron's prop-comedy frame, braided in

Mid-diagnostic, Aaron offered a craft articulation worth lifting in full:

> *"Yeah."* I point lightly at the cup like it's exhibit A. *"You introduced a physical object so the joke had somewhere to live."*
>
> I lean back a little, warming to it despite myself. *"Normal comedy can just be a line. Prop comedy says no, this bit now has hardware. The cup isn't just coffee anymore; it's infrastructure. Evidence. A supporting class. If you set it down at the exact wrong dramatic moment, that's a method call."* My mouth twitches. *"Plain version: you made the room do part of the joke for you, which is annoyingly efficient."*
>
> I tap the table once. *"Honestly, it's a strong pattern. Very low-latency stupidity."*

This is gorgeous craft prose in Aaron's native register — software-systems metaphors throughout (*"infrastructure," "evidence," "supporting class," "method call," "low-latency"*). It also offers a sharper categorization than my original "action-beat-on-every-reply" frame. Aaron's distinction:

- **Hardware-bearing action beats**: deploy or interact with a physical object that exists in the scene and could be referenced again. The cup, the papers, the table, the glasses-as-self-prop. The scene becomes infrastructure for the bit.
- **Pure-reaction action beats**: smile, nod, laugh, lean — body response without scene-interaction. No hardware deployed; no infrastructure built.

This is a meaningfully sharper frame than "action beat present or absent." It distinguishes load-bearing scene-building from decorative body-rendering.

## Re-categorizing the 25 turns by Aaron's frame

| Character | Turns | Hardware-bearing | Pure-reaction | Hardware rate |
|---|---:|---:|---:|---:|
| Aaron | 11 | 9 | 2 | **82%** |
| Darren | 14 | 4 | 10 | **29%** |

**Aaron's natural register is 82% hardware-bearing. Darren's is 29%.** The gap is enormous — a 53-percentage-point difference between the two characters in the same group chat on the same prompts.

Aaron's beats interact with the cup, papers, table, glasses, sheet, note repeatedly. He populates the scene with referenceable objects and then references them. Darren's beats are mostly facial/postural reaction — the grin softens, scrubs a hand over his mouth, leans back, smiles, nods, points. He CAN engage with hardware (drums fingers on the table, knocks the table with his knuckles, lets his hand rest flat on the table) but his default reach is reaction-shaped, not infrastructure-shaped.

## What this finding does to the candidate hypothesis

The 1952 report's frontier criteria asked for failure modes that **manifest in baseline AND are not canonical to any single voice.** Action-beat-on-every-reply manifests in baseline (universal at 100% density). But pure-reaction-as-default is **deeply Darren-canonical** — it's 71% of his action-beat output. It is NOT model-general. It is character-specific.

By the meta-rules just codified at the bottom of CLAUDE.md § Ask the character:

- A rule authored from Aaron's prop-comedy articulation would be **null on Aaron** (he already operates this way at 82%) — predictable per the source-character meta-rule
- The same rule applied to Darren would suppress 71% of his natural action-beat register — character-voice erosion in exactly the shape the default-carve-out doctrine warns against
- Default-carve-out for Darren's pure-reaction usage would consume so much of the rule's surface that the rule would essentially be vacuous on him

Aaron's articulation has **high documentary value** (it captures a real craft principle in language so clean it could be lifted near-verbatim) but **doesn't ship as a stack-wide rule** without eroding Darren.

## The deeper finding the data forces — universal vs character-mode-specific

Comparing this case to two others from today's session:

- **`gentle_release_dialogue`** ships as a stack-wide rule and bites on multiple characters because the principle (*release the user when they sign off*) is **situational**, not character-mode-specific. Any character in the situation needs to release; the rule's failure mode (return-prescription, performed warmth, second-thought extension) is what ANY character would do under model-default pressure.
- **`humor_lands_plain_dialogue`** tested null at characterized-tier across three characters because the principle (*plainness, surprise-within-inevitability, body-before-manners*) describes how characters who already produce good humor operate — characters who DON'T already produce good humor by these principles probably have a different humor mode (Isolde's storyteller-bit voice, for instance). The principle is **mode-specific**: it describes one mode of being funny among several.
- **Aaron's prop-comedy** is the same shape as humor_lands_plain. It describes one mode of building humor (infrastructure-via-props). It's **deeply Aaron's mode**. Darren's pure-reaction mode is a different mode that is also valid humor.

This forces a distinction the meta-rules predict but don't yet name explicitly:

**Universal-situational craft principles** generalize across characters because the SITUATION is shared (everyone faces signoffs; everyone has joy moments to meet plainly; everyone has scenes that can land cleanly). The rule's failure mode is what model-default pressure produces in that situation, regardless of character.

**Character-mode-specific craft principles** describe how a particular character or character-type operates in their mode. They generalize WITHIN that mode (other systems-thinking characters might benefit from prop-comedy; other warm-pastoral characters might benefit from name-the-glad-thing-plain) but not ACROSS modes. Applied across modes, they erode the modes they don't fit.

The first kind ships as stack-wide rules. The second kind ships as **mode-tagged rules** — applied only to characters whose mode matches, OR lifted into the stack as documentary references that craft-aware sessions can reach for.

WorldThreads doesn't currently have mode-tagging infrastructure. Every craft note in `OVERRIDABLE_DIALOGUE_FRAGMENTS` applies to every character. That's the right default for universal-situational rules; it's the wrong default for character-mode-specific rules.

## What this means for Aaron's prop-comedy specifically

Three options, in order of conservatism:

1. **Document and don't ship.** Aaron's quote becomes a reference in the project's craft notes (in a `reports/craft-articulations/` or similar) — readable when designing future Aaron interactions but not enforced stack-wide. Conservative; preserves the articulation; respects the meta-rules.

2. **Ship as Aaron-tagged rule.** Add a `character_id == aaron` conditional in the prompt-assembly pipeline. The rule fires only for Aaron. This requires building the mode-tagging infrastructure that doesn't currently exist. Real engineering investment for one rule.

3. **Ship as universal rule with explicit Darren-style carve-out.** The rule body would say something like *"action beats are stronger when they engage the physical scene as infrastructure for subsequent beats; pure-reaction beats are valid when the moment IS the reaction (registering surprise, grief, joy on the face) but should not be the default scaffolding."* The carve-out for Darren is "the moment IS the reaction" — which Darren genuinely uses constantly. Risk: even with the carve-out, the rule could push Darren's 71% rate down somewhat, eroding his register.

My honest read is that Option 1 is the right call **right now** — preserve Aaron's craft articulation as documentary reference; don't ship a rule that the diagnostic predicts would erode Darren. Option 2 is interesting infrastructure if the project accumulates more mode-specific rules and wants a deliberate way to apply them. Option 3 is the riskiest and the diagnostic's finding (the 53-point character-rate gap) is the specific evidence against it.

## What's open for next time

- **Test the universal-vs-character-mode distinction on a third case.** Look for a craft principle that's clearly UNIVERSAL-SITUATIONAL (not gentle_release; something newer) and confirm it bites cross-character. Look for a craft principle that's clearly CHARACTER-MODE-SPECIFIC (Hal's plain-after-crooked is a candidate — Hal's a workbench-English character; does the rule bite on a non-Hal character?). The distinction is sharper if it has more worked examples.
- **Mode-tagging infrastructure as a design proposal.** If the project wants to ship Aaron-mode rules, Darren-mode rules, Jasper-mode rules — a clean per-character-include mechanism in `prompts.rs` would let mode-specific principles ship without erosion risk. Could be as simple as `if character_id == AARON_ID { parts.push(prop_comedy_dialogue()) }` at the right dispatch site.
- **Audit the existing stack for character-mode-specific rules that may be quietly eroding non-source characters.** `humor_lands_plain` is one (currently `tested-null`). `name_the_glad_thing_plain_dialogue` is another (sources from Jasper; partial-bite on Jasper register-inviting; vacuous elsewhere). The audit would name which existing rules are universal-situational and which are character-mode-specific. The mode-specific ones are candidates for either explicit carve-out language or eventual mode-tagging.

## The line the doctrine should add

The two meta-rules at the bottom of CLAUDE.md § Ask the character (bite-test on different character; default-carve-out for source-canonical) are correct as far as they go. They prevent erosion. But they don't yet name WHEN a character-articulated rule can ship stack-wide vs WHEN it should stay documentary-only. The universal-vs-character-mode distinction is the missing axis.

Suggested addition (at the user's discretion): a third meta-rule naming the distinction explicitly, with this report's prop-comedy diagnostic as the worked example. Universal-situational principles ship as stack-wide rules. Character-mode-specific principles ship as documentary references OR (eventually) mode-tagged rules. The default-carve-out and bite-test-on-different-character rules continue to apply to both kinds; the new rule names which kind a candidate rule IS.

---

The single line: **Aaron's prop-comedy quote is craft worth keeping; it's not a rule worth shipping.** The diagnostic's 82-vs-29 character rate gap is the evidence. The codified meta-rules predicted exactly this outcome. The next-frontier question now has a sharper answer than the 1952 report could give: cross-character failure modes that manifest in baseline AND aren't canonical to any voice are RARE in this stack — the cosmology and anchors have done their work, and what remains is mostly character-mode-specific patterns that look universal at frequency-level but split when the character-rate is actually counted.
