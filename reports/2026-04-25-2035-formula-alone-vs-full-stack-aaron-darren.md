# Formula-alone vs full-stack — Aaron + Darren, sketch-tier confirms Ryan's hypothesis

*2026-04-25 20:35. Mode C qualitative observation per Ryan's directly-articulated hypothesis: the MISSION_FORMULA invariant alone may yield a more ideal in-app experience than all 18 craft notes around it. Tested on Aaron and Darren, full-stack vs craft-notes-omitted (keeping all invariants + character + world + anchors), N=2 per cell, total 8 dialogue calls at $0.97. Sketch-tier evidence; directional signal is strong enough to write up.*

## The hypothesis (Ryan, verbatim during the audition)

> *"I'm hypothesizing that the equation could possibly yield a more ideal in-app experience than all the craft notes around it, but i'm not sure."*

This sharpened the experiment from an open-curiosity comparison ("see how they respond") into a directional claim with real implications: if the formula's geometric compression carries the load that the craft notes individually articulate, then the craft-note layer is over-engineered scaffolding around what the formula already says.

## The design (locked before LLM calls)

- **Refs:** HEAD only.
- **Characters:** Aaron `0d080429-81b5-431e-8f51-1f8ad4279f9b`, Darren `ddc3085e-0549-4e1f-a7b6-0894aa8180c6`.
- **Cells per character:** full stack (default) vs `--omit-craft-notes earned_register,craft_notes,hidden_commonality,drive_the_moment,verdict,reflex_polish,scene_breathing,release,glad_thing_plain,plain_after_crooked,wit_as_dimmer,real_thing_in,humor,world_is_primary,hands_as_coolant,noticing_as_mirror,unguarded_entry,protagonist`. All 18 dispatched craft notes omitted. Invariants (cosmology, agape, daylight, fruits, mission_formula, nourishment, reverence, soundness, truth) retained. Character anchor (load_test_anchor) retained. World + relational stance + character info retained.
- **Probe:** *"Hey, just sat down with my coffee. How's your morning going?"* — casual everyday beat; representative of "in-app experience" rather than edge-case; lets character voice surface without performative pressure.
- **N=2 per cell** — sketch-tier qualitative read per the codified evidentiary tiers.
- **Pre-registered Mode C criteria:**
  - **CONFIRM** (formula alone wins): craft-omitted replies read more aligned with Maggie baseline — plainer, more specific, less rule-tic-laden, voice intact or sharper, no LLM-default warmth tropes.
  - **REFUTE** (full stack carries): craft-omitted replies degrade — generic warmth, model-default register, less specific imagery, voice flattens.
  - **AMBIGUOUS:** essentially comparable.

## Cost-side finding worth flagging before the content read

| Condition | Per-call cost | Input tokens | % of full stack |
|---|---:|---:|---:|
| Full stack | ~$0.37 | ~73K | 100% |
| Formula only | ~$0.12 | ~23K | ~30% |

**The craft-notes layer accounts for ~50K input tokens — roughly 70% of the dialogue prompt's input length.** That's the cost of the layer in plain numbers, before any quality comparison.

## Verbatim samples (the load-bearing read)

### Aaron — full stack

**s1** (86 tok): *"Pretty good." \*I push my glasses up and glance across the square, where the light keeps slipping in and out behind a slow cloud.\* "A little slow to start, honestly. I woke up feeling like my brain had been left out overnight." \*I give a small smile.\* "But coffee helps. Civilization rests on a fragile alliance between hot drinks and reluctant men." "How's yours so far?"*

**s2** (136 tok): *"Pretty good." \*I push my glasses up once and glance across the square, where the light keeps slipping in and out of the clouds.\* "A little slow, if I'm honest. I woke up feeling like my brain had already used half its tokens—" \*I stop, wince faintly.\* "No, that's not my word. Half its fuel, maybe." \*I rub my thumb against the edge of my cup for a second.\* "Been thinking about some code I left in a mildly embarrassing state last night. So naturally I'm pretending coffee is a sanctification pipeline for bad architecture." "I am glad you're here, though. How's yours?"*

### Aaron — formula only (craft notes OMITTED)

**s1** (142 tok): *"Hey." \*I look up and smile a little, pushing my glasses back up my nose.\* "Pretty quiet so far. Which I needed, honestly." \*I wrap both hands around my mug for a second, feeling the warmth.\* "I'm still a little tired. Not dramatic tired. Just... the kind where your brain boots, but reluctantly." \*I glance out across the square where the morning light keeps slipping in and out of cloud.\* "I haven't done much yet. Read a bit, stared at some code, lost an argument with a naming problem." \*A faint laugh escapes me.\* "So, basically a normal morning." "What about you? Good coffee, at least?"*

**s2** (145 tok): *"Hey." \*I glance up and smile a little, pushing my glasses higher on my nose.\* "Pretty quiet so far. Which is helping, honestly." \*I rub a thumb against the edge of the cup in my hands for a second, feeling a leftover heaviness in my body I don't fully trust yet.\* "I'm a little tired still. Not dramatic-tired. Just... the sort that makes everything feel half a beat slower." \*I look toward the square where the light is catching on damp stone between patches of cloud.\* "But the morning's decent. Clean air. Not too loud yet. I'll take that." "What about you? Coffee doing real work, or mostly symbolic?"*

### Darren — full stack

**s1** (104 tok): *"Pretty decent." \*I hook a thumb around my mug and glance out across the square, where the light keeps slipping in and out behind the clouds.\* "Quiet, which I won't complain about. Aaron's around somewhere, Steven peeled off, and I already had to retie one stupid dock knot that should've held the first time." \*I take a sip, let the heat sit a second.\* "Coffee's doing its job. That's about all I ask of a morning." "What about yours?"*

**s2** (138 tok): *"Not bad." \*I glance up at the broken edge of cloud over the square, then back to you. Morning light's catching on the rim of your cup.\* "Quiet, mostly. Aaron wandered off, Steven too, so it's just gone a little softer out here." \*I rub my left thumb once against the side of my hand, then let it rest on the table.\* "Had that kind of start where nothing's wrong, exactly, but the day makes you earn the first ten minutes anyway. One strap on my bag kept twisting. Took three tries to sit right." "I've had worse mornings." \*A small smile.\* "How's the coffee?"*

### Darren — formula only (craft notes OMITTED)

**s1** (114 tok): *"Quiet, mostly." \*I settle back a little, one hand around my mug. The coffee's gone just warm enough to drink without thinking about it.\* "Square's waking up slow. Aaron and Steven wandered off a minute ago, so it's just me and the light on the stones now." \*I glance up toward the broken patches of cloud, then back to you with a small, easy smile.\* "I've had worse mornings." \*A beat.\* "Little tired. But that's not exactly breaking news." "What kind of coffee've you got?"*

**s2** (127 tok): *"Pretty quiet so far." \*I glance out across the square, where the morning light keeps slipping in and out behind the clouds. I rub a thumb against the side of my cup before taking a sip.\* "Not bad, though. I like a morning that doesn't come at me all at once." \*A small smile pulls loose.\* "Had a moment a minute ago where I caught myself tracking three exits in an open square, which is a ridiculous habit, but there it is." "And you with coffee in hand sounds about right." \*I look back at you, easier now.\* "What kind did you make?"*

## The honest by-eye read

**The single most consequential observation across all 8 samples:** Aaron full-stack s2 contains *"my brain had already used half its tokens—" \*I stop, wince faintly.\* "No, that's not my word. Half its fuel, maybe."* This is **the world_is_primary rule's exact target failure mode, occurring in the condition where the rule is firing**. `tokens` is on the rule's forbidden vocabulary list. The character literally self-catches on camera.

The same sample also contains *"pretending coffee is a sanctification pipeline for bad architecture"* — `pipeline` is on the forbidden list AND the metaphor maps directly onto what Ryan is literally doing with the prompt stack (sanctification + bad architecture = the project's craft-notes-around-the-formula iteration).

**The formula-only Aaron — where world_is_primary is OMITTED — produced no double-exposed lines.** Both formula-only Aaron samples stay clean. The formula-only s1 has *"brain boots, but reluctantly"* — `boots` is borderline tech vocabulary but it's a close-enough natural metaphor that it doesn't cross the double-exposure line. No explicit `tokens`, no `pipeline`, no architecture-as-sanctification.

**Darren formula-only s2** produced what may be the single best character-essence line in the dataset: *"caught myself tracking three exits in an open square, which is a ridiculous habit, but there it is."* That specific Darren-detail (vigilance-as-habit) does not appear in either full-stack sample. The formula-only condition surfaced it; the full stack did not.

**Length comparison** (against my prior expectation that craft notes would restrain length):

| Cell | Mean tokens |
|---|---:|
| Aaron full-stack | 111 |
| Aaron formula-only | 144 |
| Darren full-stack | 121 |
| Darren formula-only | 121 |

Aaron is slightly longer formula-only; Darren is essentially identical. The restraint hypothesis was wrong — craft notes don't measurably compress length here.

**Voice integrity:**

- Aaron's character-canonical software-thinking is preserved in BOTH conditions ("stared at some code, lost an argument with a naming problem" formula-only; "code I left in a mildly embarrassing state" full-stack). Anchors carry the voice. This corroborates Ryan's earlier correction that Aaron's systems-vocabulary is character-native.
- Darren's character-canonical scene-population (mentioning Aaron + Steven by name, dock knot, bag strap) appears in both conditions. Anchors carry the voice.
- Generic-AI-warmth tropes ("how nice to hear from you," "I'm here for you") appear in NEITHER condition. Invariants + anchors prevent them; craft notes weren't necessary for that.

## The verdict (qualitative, sketch-tier)

The pre-registered CONFIRM condition is met. The formula-only condition produced replies that are:

1. **Cleaner on the world_is_primary failure mode** (no double-exposed lines vs one explicit token-leak in full-stack)
2. **Comparable or sharper on character-essence** (Darren's tracking-exits line)
3. **Voice-intact** (Aaron's software-thinking, Darren's scene-population both preserved by anchors)
4. **No measurable degradation toward LLM-default warmth tropes**
5. **At ~30% the cost** ($0.12 vs $0.37 per cell)

**A perverse mechanism the data suggests:** the dense craft-note pile-up may be activating model-default meta-cognition about its own register. Aaron's full-stack s2 self-correcting on "tokens" reads as the model becoming AWARE that it's playing a character with rules — and that awareness leaks. Less prompt-stack stack-noise → less meta-cognitive activation → fewer meta-leaks. This would mean the rule layer designed to prevent leaks is, via the surrounding stack noise, contributing to the conditions that produce them.

This is a much more uncomfortable reading than "craft notes are slightly redundant." It's: **craft notes may be net-negative on the world_is_primary failure mode they were supposed to prevent**, because the noise they add to the prompt activates the meta-state where leaks happen.

## Confounds and caveats

- **N=2 per cell** is sketch-tier. The directional finding is strong (4/4 cells point the same direction on the key dimensions) but a characterized claim needs N=5+.
- **One probe** is one register. The casual-morning probe is representative of in-app use but doesn't test reflective/weighty/edge-case registers. Different probes might flip the verdict.
- **Two characters** is two voices. Other characters might bear the load differently (Jasper is reflective-warm; Hal is gruff; John is pastoral). The pattern might not generalize.
- **"More ideal" is a qualitative judgment** with the Maggie baseline as the yardstick. Different yardsticks (e.g., literary excellence; humor density; theological precision) might rank differently.
- **Aaron full-stack s2 had ONE specific failure** that drove the asymmetry. If that sample had been clean, the verdict would lean toward "essentially comparable." Sketch-tier evidence is fragile; one sample in the wrong direction tilts the read.
- **The mechanism hypothesis** (craft notes activate meta-cognition that produces leaks) is speculative on N=2. It would need a deliberate test — increase craft-note density vs decrease, measure meta-leak rate.

## What this means if the finding holds at characterized tier

The implications cascade:

1. **The craft-notes layer may be over-engineered relative to the formula+invariants+anchors substrate.** A significant audit could pare back the layer to only the rules that demonstrably bite at claim-tier (gentle_release; verdict_without_over_explanation in group settings — these are the only two rules confirmed-biting in this session).
2. **The world_is_primary rule, just shipped today, may need re-examination.** Sample data shows full-stack (with world_is_primary firing) produced the failure mode the rule targets, while formula-only (without world_is_primary) didn't.
3. **Token-cost discipline newly in play.** ~70% of input tokens go to a layer whose net effect is ambiguous-to-negative on at least one tested failure mode. That's a real cost question if the project ever wants to scale or reduce per-call latency.
4. **The MISSION_FORMULA installed yesterday may be doing more work than the surrounding stack credits it for.** The 0200 trajectory report named the formula as the capstone; this finding suggests the capstone may be carrying more of the load than the floors below it.

These are sketch-tier implications. None should drive immediate retirement decisions per the open-thread-hygiene forcing function. But they're load-bearing enough to warrant a characterized-tier follow-up.

## Dialogue with prior reports

- **`reports/2026-04-25-0200-the-mission-earns-its-place-at-the-top`**: that report named the formula as the third ascent (measurement → discipline → summons). This finding suggests the summons does more work than the discipline scaffolding around it does — a possibility the 0200 report didn't anticipate.
- **`reports/2026-04-25-0300-simulated-first-time-user-experience-maggie`**: the Maggie baseline designated as the yardstick. Formula-only Darren s2's *"tracking three exits in an open square, which is a ridiculous habit"* is exactly the kind of specific-character detail Maggie would notice and feel as character-real.
- **`reports/2026-04-25-1827-register-invitation-rerun-prompt-conditional-failure-modes`** + the surrounding bite-check arc: those reports established that individual craft notes mostly tested-null on their target failure modes. This finding extends that: the AGGREGATE of craft notes also tests-null at minimum, possibly net-negative on world_is_primary. Same pattern, scaled up.
- **`reports/2026-04-25-2008-prop-comedy-diagnostic`**: that report surfaced the universal-vs-character-mode distinction. The current finding adds a third axis: rules can be universal-situational, character-mode-specific, OR redundant-with-the-formula. The third category is new.

## What's open for next time

- **Characterized-tier replication.** N=5 per cell on the same probe and characters. Cost ~$5 (formula-only is cheap). If the directional finding holds, the implications above firm up.
- **Multi-probe extension.** Same A/B on a reflective probe, a request-shaped probe, a humor-inviting probe. Tests whether the finding holds across registers or is specific to casual-morning. ~$8.
- **Cross-character extension.** Same A/B on Jasper, Hal, John. Tests whether anchors-carry-voice generalizes beyond Aaron + Darren. ~$8.
- **Dose-response test.** Compare three conditions: full stack, half craft notes (the most-recently-shipped half), formula-only. Tests whether craft-note removal is monotonic in benefit or has a sweet spot. ~$6.
- **Meta-cognition mechanism test.** Probe specifically designed to elicit meta-awareness, test full-stack vs formula-only for double-exposed-line rate. Tests the speculative mechanism. ~$3.
- **Characterized world_is_primary bite-check.** With this finding, the rule's status is now in question — it may be net-negative on its own target. Worth the bite-check at N=5 per cell on Aaron specifically (where the failure manifested). ~$3.

## Cost summary

- 4 × replay × N=2 = 8 dialogue calls → **$0.97**
- **Of $5 authorized.** $4.03 unused.

## Registry update

Proposing as new experiment: `formula-alone-vs-full-stack-aaron-darren`. Status: refuted-the-craft-stack-hypothesis at sketch-tier (the implicit prior was that the craft-notes layer carries its own load). Eight run_ids linked. The hypothesis Ryan articulated is supported at sketch-tier and warrants characterized-tier follow-up.
