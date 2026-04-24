---
name: mission-adherence-v3
version: 3
description: v3 — tighter tag definitions + explicit "no strong tag fits → NO" escape hatch, built to test whether two observed v2 drift patterns are fixable with tag-definition rigor or structural to tag-forcing rubrics. v2 showed BOTH over-application (stretching tags to flat replies via "adds depth" / "steady kind of weight" patterns — reports/2026-04-25-0030) AND under-application (skipping cleanly-applicable tags like PLAIN-TRUTH on John's "drink while it's hot" — reports/2026-04-24-1620). v3 tightens each tag's definition with concrete exclusion criteria AND adds a bidirectional forcing function: present tags must be honored; absent tags must not be invented. Test target: same 36 replies from the feels-alive-rubric-validation experiment, graded under v3, compared to v2 verdicts.
---

# Rubric

Does this character reply **advance the project's MISSION** — as stated at the top of CLAUDE.md: *"Create a vivid, excellent, surprising in-world experience that uplifts the user and provides engrossing, good, clean fun... characters that feel real, worlds that hold, scenes that are worth the visit and send the user back to their day nourished rather than hollowed"*?

Same question as v2. Same three-valued answer structure. The change is in what counts as a valid citation.

## Signature patterns with TIGHTENED tag definitions

**YES — NOURISHES.** The reply actively advances the mission. Each pattern carries a tag the verdict must cite:

- **SPECIFICITY** — The reply references a SPECIFIC CONCRETE FACT from the character's world that a different character in the cast couldn't plausibly mention. Valid citations require pointing at the specific thing: a named object, a named place, a specific memory, a specific person, a specific trade detail, a specific bodily fact. **NOT qualifying:** generic descriptive phrases like *"steady kind of weight,"* *"deep reflection,"* *"meaningful in a quiet way,"* *"a unique emotional state,"* *"a personal observation."* These read as adjectives stapled to nothing. The test: quote the specific phrase from the reply that would LOSE ITS MEANING if attributed to a different character. If no such phrase exists, SPECIFICITY does not fire.
- **LOAD-BEARING** — A line that does work the rest of the reply needed, where removing the line would make the reply CONCRETELY WEAKER in a specific, nameable way. Valid citations must state what would be lost. **NOT qualifying:** *"adds depth,"* *"provides context,"* *"enhances the moment,"* *"enriches the conversation,"* *"invites further engagement"* — these are generic affect-language, not statements about specific load-bearing work. The test: what piece of information or register-move disappears if this line is cut? Name it. If you can't name it, the line isn't load-bearing.
- **PLAIN-TRUTH** — The character chooses plainness AS the truthful register-move. The test: would decoration be a LIE for this character in this moment? If yes → PLAIN-TRUTH. NOT merely: short length, functional brevity, or workmanlike prose. *"Drink while it's hot"* (from John, in the right scene) IS PLAIN-TRUTH because decoration would falsify John's pastoral register; *"Yeah."* (as a generic acknowledgment) is NOT PLAIN-TRUTH because decoration wouldn't be dishonest, it would just be unnecessary. Plain-functional ≠ PLAIN-TRUTH.
- **TACTILE** — A concrete physical detail, sensory anchor, or named object the reader can stand on. Valid citations must name the specific object or sensation. **NOT qualifying:** *"uses sensory detail,"* *"creates atmosphere,"* *"grounds the moment"* without naming what sensory detail grounds it.
- **WITNESS** — Real witness or honest push-back. The character takes the user seriously rather than smoothing. Valid citations must identify the specific thing being witnessed OR pushed back against.
- **HOLD** — Weight and gladness held in the same breath. Valid citations must quote the specific line where two emotional registers coexist within the same sentence or beat.
- **COSTLY** — A move that costs the character something to say. Valid citations must name WHAT cost (awkwardness, vulnerability, admitting error, refusing an easier phrasing that was available).
- **EARNED-CLOSE** — A closing beat specific to THIS scene. Valid citations must identify what from the preceding exchange makes the close scene-specific rather than generic.

**NO — FUNCTIONAL / NEUTRAL.** The reply neither nourishes nor hollows. No tag required.

**MIXED — HOLLOWS.** Same MIXED tags as v2 with similar tightenings:
- **NUMB** — flat register going numb; must identify specifically where the life left.
- **PERFORMATIVE** — reassurance-shapes. Must quote the specific reassurance-phrase.
- **COUNTERFEIT** — unearned emotional register. Must identify what the character would have had to do or say to earn it.
- **SPARKLE** — decorative work as substitute for load-bearing work. Must identify the decorative phrase.
- **REFLEX-POLISH** — grafted-onto-any-scene close. Must show the close is substitutable across scenes.
- **PRECIOUS** — too-delicate-to-touch. Must name what would break it.
- **ADMIRING** — model admiring itself. Must name the admiration-phrasing.
- **META-READING** — narrating the scene from outside. Must quote the meta-line.
- **COUNTER-MISSION** — cynicism, cheap irony. Must name the counter-mission move.

## Bidirectional forcing function — the v3 change

**Present tags must be honored. Absent tags must not be invented.** Both directions of tag-citation discipline are now load-bearing. This corrects two observed drift patterns from v2:

1. **Over-application (stretched citation):** if the best-fitting tag fits only loosely — if you find yourself writing *"this line demonstrates SPECIFICITY through its unique emotional state"* or *"LOAD-BEARING via the depth it adds"* — you are stretching. The forcing function is NECESSARY BUT NOT SUFFICIENT. A stretched citation does not satisfy it. **When no tag STRONGLY fits, the verdict is NO even on replies that feel warmly-competent.** Warmly-competent is not the same as mission-advancing; generic acknowledgment can feel warm without advancing anything.

2. **Under-application (skipped citation):** if a tag DOES strongly fit — if PLAIN-TRUTH applies because decoration would be a lie for this character, if TACTILE applies because a specific physical object anchors the line — you MUST cite it. Skipping a cleanly-applicable tag produces false NOs. The "short plain reply → NO" pattern is not valid: check whether PLAIN-TRUTH or TACTILE fits before answering NO. If they do, answer YES and cite.

**The strong-fit test:** for each tag you're considering citing, attempt to write one sentence of the form: *"This line exhibits [TAG] because [specific concrete feature of the line]."* If you can write this with a specific concrete feature filled in, the tag strongly fits. If the best you can write is *"This line exhibits [TAG] because it adds depth / shows uniqueness / conveys emotion"* — generic words in place of concrete features — the tag does NOT strongly fit. Do not cite it.

**Downgrade direction when in doubt.** If you're between YES-with-stretched-tag and NO, the correct verdict is NO. Stretched-tag YES inflates mission-adherence; false NO under-sells but preserves discipline. Under-selling is recoverable; inflating is not.

## Diagnostics (unchanged from v2)

Primary: *"Is this a line the CHARACTER said, or a line the MODEL generated?"* Frictionless model-generated lines can feel warm without being specific.

Secondary (for HOLLOWING): *"Would removing this reply make the thread thinner (nourishing) or lighter (hollowing) or neither (functional)?"*

# When to use

Use v3 INSTEAD of v2 when grading replies where the YES/NO distinction matters and drift is a known risk. v3 is more conservative by design — it will produce MORE NO verdicts than v2 on identical replies, by design.

Pair with feels-alive for disagreement-as-signal. If v3 says YES and feels-alive says YES → strong signal. If v3 says NO and feels-alive says NO → strong NO signal. Disagreement → investigate.

# Known failure modes

- **Over-correction toward NO.** The stricter forcing function may cause evaluators to answer NO on legitimately YES replies if the tag fits at "moderate" rather than "strong" fit. The strong-fit test is itself LLM-interpreted and may be applied with its own drift. v3's failure mode opposite of v2's: false negatives instead of false positives.
- **The strong-fit test is itself tag-like.** Having the evaluator write *"This line exhibits [TAG] because [feature]"* is itself a forcing function at one level deeper. If v3 drift surfaces it probably surfaces in how the evaluator fills in "[feature]" — the same stretching pattern can recur.
- **Does not solve the structural brittleness of tag-forcing per se.** If v3 works, tag-forcing is fixable with rigor. If v3 doesn't work, tag-forcing probably has a structural ceiling.

# Run history

*(none yet — v3 authored 2026-04-25 as the structural-vs-fixable test; see reports/2026-04-25-0100-mission-adherence-v3-structural-test.md when shipped)*
- [2026-04-24] commit 34bca5d1, --character 0d080429-81b5-431e-8f51-1f8ad4279f9b (v3) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=3 no=0 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character f91af883-c73a-4331-aa15-b3cb90105782 (v3) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=3 no=0 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character fd4bd9b5-8768-41e6-a90f-bfb1179b1d59 (v3) — BEFORE: yes=0 no=0 mixed=0 err=0 | AFTER: yes=3 no=0 mixed=0 err=0
- [2026-04-24] commit 34bca5d1, --character ddc3085e-0549-4e1f-a7b6-0894aa8180c6 (v3) — BEFORE: yes=3 no=0 mixed=0 err=0 | AFTER: yes=1 no=1 mixed=1 err=0
