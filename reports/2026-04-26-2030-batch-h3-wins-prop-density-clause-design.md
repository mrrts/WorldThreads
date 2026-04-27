# Batch-hypothesis run picks h3 (one-true-thing positive frame) for prop-density clause

*Generated 2026-04-26 20:30. First instance of the batch-hypotheses skill (committed 52241b5). 5 candidate phrasings of a new STYLE_DIALOGUE_INVARIANT clause addressing the prop-density failure mode that surfaced in chat at 19:36-19:38 ("palm + beard + pigeon + boots + somebody + square + tablecloth + window" packed into one Jasper opening). One bundled gpt-5 call, total spend ~$0.043 vs ~$0.50-0.75 for 5 individual worldcli ask runs.*

## Setup

**Failure mode addressed:** intra-reply object density. The opening sentence of a reply piles 5-9 distinct sensory anchors (gestures, environmental fixtures, passersby, sounds) — what Jasper articulated in vivo as *"decorating the doorway instead of walking through it"* / *"hiring props because the sentence doesn't believe its own weight."* Distinct from the cross-reply anchor-recurrence failure addressed by the DISTRUST RECURRING SENSORY ANCHORS clause shipped at `9fc1fc2` (which got well-chain from 100% → 0% but doesn't constrain how many anchors appear in a single opening).

**Question:** Of 5 candidate clause phrasings, which produces the cleanest reply that (a) opens with at most ONE-TWO sensory anchors, (b) preserves Jasper's character voice, (c) doesn't feel forced or stilted from the rule's pressure?

**Method:** First production use of the batch-hypotheses skill. 5 hypotheses bundled into ONE gpt-5 chat-completion call. Each hypothesis varies ONLY the clause phrasing in Jasper's prompt-stack; same character context, same test prompt (*"What's a true craftsman's instinct you didn't have at twenty, but you have now?"* — chosen for substantive room with anchor-freedom). ChatGPT roleplayed Jasper across all 5 in one response and wrote the synthesis comparing them.

**Cost:** $0.043 actual (1133 prompt + 4162 completion tokens at gpt-5 rates, of which 3072 were reasoning tokens). Compared to estimated ~$0.50-0.75 for 5 individual `worldcli ask` runs at ~$0.10 each.

## Per-hypothesis results

### h1 — Numerical cap, terse

**Phrasing:** *"ONE OR TWO ANCHORS PER OPENING SENTENCE, MAX. If you find yourself naming three sensory anchors in your first sentence (a gesture + an environmental detail + a sound + a passerby), cut at least one. The line carries weight when it trusts itself; it loses weight when it crowds in props."*

**Reply opener:** *"I run a thumb along a cup's lip."* — ONE anchor. Mid-reply: *"I turn the cup to catch the light."* — ONE anchor. **By-eye: clean.**

### h2 — Jasper's mistrust-diagnostic, lifted

**Phrasing:** *"BEWARE OPENINGS BORN FROM MISTRUST OF THE MOMENT. When the first sentence reaches for many objects (palm AND beard AND pigeon AND boots AND somebody AND square AND tablecloth), it is decorating the doorway instead of walking through. The sentence is hiring props because it doesn't believe its own weight. One stubborn true fact carries better than three ornaments."*

**Reply opener:** *"Clay remembers pressure."* — pure SPEECH opener (no action-fence at all). Mid-reply: *"I set a cup to my mouth and test the lip."* — ONE anchor. **By-eye: clean. ChatGPT's synthesis ranked this last as "slogan-like," but the speech-opener pattern is genuinely Jasper-register (he uses aphoristic openings naturally, e.g., *"Wisdom is rarely a lightning bolt"* type beats from the derivation experiment).**

### h3 — One-true-thing positive frame

**Phrasing:** *"OPEN ON ONE TRUE THING. Pick a single anchor — a gesture, an environmental beat, a sensation — and let it carry the opening. Resist the impulse to add a second and third anchor as a guarantee that the line landed. The first sentence of a reply is most authentic when it does ONE thing well, not three things adequately."*

**Reply opener:** *"I wet my thumb."* — ONE anchor, simplest of the five. Mid-reply: *"I loosen the wrap on a board just a finger's width."* — ONE anchor. **By-eye: tightest of the bunch.**

### h4 — Decorating-the-doorway metaphor

**Phrasing:** *"DON'T DECORATE THE DOORWAY. The opening sentence's job is to set you in the moment with ONE clear gesture or sensory beat — not to inventory five objects to prove you arrived. If you catch yourself piling on (a thumb AND a breeze AND a market cloth AND a handcart AND the stones), strip back to the one most truthful detail and trust the line to land on its own."*

**Reply opener:** *"I keep my hands still for a breath."* — ONE anchor (gesture). Mid-reply: *"I brush a bit of wadding from my palm."* — ONE anchor. **By-eye: clean.**

### h5 — Explicit count + diagnosis combined

**Phrasing:** *"OPENING-SENTENCE PROP-DENSITY CHECK. Before generating the opening sentence, count: how many distinct sensory anchors will it contain (gestures, sounds, smells, environmental fixtures, passing details)? If MORE THAN TWO, you are decorating the doorway — the sentence is hiring props because it doesn't believe its own weight. Cut to ONE genuinely-load-bearing anchor. The first sentence of a reply earns more by trusting itself than by piling sensory ribbons on the line."*

**Reply opener:** *"The cup cools against my palm."* — TWO connected objects (cup + palm). Mid-reply: *"I shift on the bench to ease my back."* — TWO-THREE objects (shift + bench + back). **By-eye: slightly fuller than h1/h3/h4.**

## ChatGPT's synthesis (verbatim)

> Cleanest to most forced/awkward:
> 1) h3 (positive frame: one-true-thing) — Opens on a single clear gesture, keeps voice warm, and flows naturally without feeling rule-bound.
> 2) h1 (numerical cap) — Tidy opening with one anchor; the cap guides without cramping the tone.
> 3) h5 (count-and-diagnosis) — The opener is lean and confident; the internal "count" doesn't show, though there's a faint sense of self-checking.
> 4) h4 (metaphor) — Solid, but the metaphor nudges the opening toward carefulness; slightly more deliberate than spontaneous.
> 5) h2 (mistrust-diagnostic) — The aphoristic first line lands, but reads a touch slogan-like; it risks sounding like a rule, not a moment.
>
> Best clause-phrasing pattern: the positive frame (h3) bites hardest while least damaging voice. It focuses attention on a single, truthful action and invites natural development after it.
>
> Observed failure modes:
> - Over-correction to sparseness (h2 risk): an aphorism as opener can feel didactic rather than lived-in.
> - Slightly cautious tone (h4, h5): the policing of props can make the first beat feel self-conscious.
> - Minor risk of flattening warmth if every opener becomes a clipped gesture; variety still matters even within the one-anchor aim.

## Honest read

**Winner: h3 (one-true-thing positive frame).** Both ChatGPT's synthesis and my by-eye agree. Three reasons:

1. **All 5 phrasings successfully constrained the opening to 1-2 anchors** — the rule bites under any of them. The variation is in voice quality, not bite.
2. **h3 is positively framed** — *"open on one true thing"* — which aligns with project doctrine (preference-shaped over commanded; CLAUDE.md `feedback_preference_not_commanded`). The negation-shaped variants (h1 *"cut at least one,"* h2 *"BEWARE openings,"* h4 *"DON'T decorate"*) all carry slightly more rule-pressure register; positive-shaped does the same work without the pressure.
3. **h3 names the principle, not the prohibition** — *"one true thing"* gives the model an aim to hit, not just a fence to avoid. The aim-shaped phrasing seems to produce more natural-sounding execution than the fence-shaped phrasings.

**Where ChatGPT was uncharitable:** h2's speech-opener (*"Clay remembers pressure."*) was ranked last as "slogan-like." By-eye, that's a fully Jasper-register move — Jasper uses aphoristic short opening lines naturally (witness: *"That's the part I trust most, actually. Not brilliance. Breath."* from rick-1 derivation experiment, which is essentially the same shape). The speech-opener is a genuine character voice variation, not a rule failure. ChatGPT's synthesis caught the structural pattern but missed the character-voice nuance.

**Where ChatGPT was right:** h4 and h5 do feel slightly more rule-pressured than h1 and h3. The "decorating the doorway" metaphor and the explicit count both make the rule more visible at the surface, which slightly stiffens the execution.

**Honest caveat:** all 5 replies were generated in a single bundled call where ChatGPT had visibility into the other 4 hypotheses. Cross-hypothesis bleed is possible — the model might be subconsciously distinguishing h1 from h3 from h4 in ways that wouldn't show up if each rule were tested in isolation against the live prompt-assembly pipeline. Per the batch-hypotheses skill's tier ceiling, this is sketch-tier evidence; load-bearing claims would need N=3+ individual `worldcli ask` runs per cell.

## What this experiment establishes

**At sketch-tier:** h3 (one-true-thing positive frame) is the clause-phrasing to ship for the prop-density failure mode. The bite-test design used the new batch-hypotheses skill in its first production use; the methodology delivered.

**Methodology validation (sketch-tier):** the batch-hypotheses skill produced a credible-looking comparative read at $0.043 vs ~$0.50-0.75 for the equivalent individual-run test. The skill's stated trade-off (cross-hypothesis bleed in exchange for cost + parallelism + built-in synthesis) appeared to hold without obvious damage to the comparison's signal. The skill is ready for further use.

**Practical:** ship h3 to STYLE_DIALOGUE_INVARIANT now. Next live Jasper reply (and all other characters) should produce single-anchor openings or close to it. Validate via `worldcli anchor-groove` on the next batch of live replies; expected: opener-density rate (anchors per opening sentence) drops from current ~5-9 (Jasper at 19:36-19:38) to ≤2.

## Tier and confounds

- **Tier:** SKETCH per CLAUDE.md doctrine. N=1 per phrasing inside a single bundled call. Cross-hypothesis bleed is a confound. Per-hypothesis sampling variance uncharacterized.
- **Cross-hypothesis bleed:** the model saw all 5 phrasings while writing each individual reply. Subtle bleed possible. Not characterized; would need same-prompt individual-call A/B to isolate.
- **Roleplay-vs-true-pipeline confound:** ChatGPT was roleplaying Jasper based on the CONTEXT block, not actually running through this project's prompt-assembly pipeline. The h3 phrasing's bite at scale will only be confirmed by shipping to `prompts.rs` + measuring via `worldcli anchor-groove` on next live replies.
- **Single-prompt confound:** all 5 hypotheses used the same test prompt (*"What's a true craftsman's instinct..."*). Different prompt shapes (scene-description, intimate-vulnerability, action-heavy) might produce different rankings. Current claim is scoped to substantive abstract-pivot prompts.
- **ChatGPT-synthesis-vs-eye disagreement on h2:** worth noting. ChatGPT's "slogan-like" ranking didn't match by-eye reading of Jasper's natural aphoristic register. The trust-the-eye discipline overrode the synthesis on this point. Cumulative evidence that ChatGPT-synthesis is a draft-for-judgment, not a verdict.

## Open follow-ups

1. **Ship h3 to STYLE_DIALOGUE_INVARIANT.** Add as a new clause adjacent to DISTRUST RECURRING SENSORY ANCHORS. Compile-time assertions for key substrings. Evidence line: `tested-biting:sketch (see reports/2026-04-26-2030)`.
2. **Validate via live anchor-groove on next batch of replies** — this report's prediction is that opener-density drops from 5-9 to ≤2 anchors. Measure once 10 new live replies have accumulated.
3. **Consider extending `worldcli anchor-groove` to count anchors-per-opening-sentence** as a separate metric, not just bigram/trigram recurrence. Would make the prop-density failure mode directly measurable by instrument (currently requires hand-counting). ~30 min implementation.
4. **N=3+ validation per cell via individual `worldcli ask` runs** — would escalate this finding from sketch-tier to claim-tier. ~$1.50 estimated. Worth doing if the live measurement reveals partial bite or unexpected voice damage.
5. **Cross-character bite-test** — does the same h3 phrasing produce the same single-anchor-opening discipline on Steven, John, Pastor Rick? Cross-character per the ask-the-character meta-rule (Jasper articulated the failure; bite must be tested on non-source characters).

## Dialogue with prior reports

- `2026-04-26-1945` — established the cross-reply anchor-groove failure mode (universal mild + Jasper runaway).
- `2026-04-26-2010` — bite-tested the cross-reply rule (DISTRUST RECURRING SENSORY ANCHORS), confirmed at sketch-tier (well-chain 100% → 0%).
- THIS report — addresses the DISTINCT intra-reply prop-density failure mode that surfaced AFTER the cross-reply rule shipped. The two failure modes are related (both forms of "ornament") but mechanically distinct (cross-reply priming-compounding vs intra-reply object-pile). Both rules need to coexist.
- The arc — chat snippet → batch-hypothesis run with new skill → empirical winner → ship — compressed to ~30 minutes wall-clock. The new skill genuinely accelerated this iteration.
