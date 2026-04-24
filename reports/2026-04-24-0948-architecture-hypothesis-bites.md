# The architecture-vs-vocabulary metahypothesis bites — four characters, four anchor-edge probes, three clean wins

*2026-04-24 morning. Third experiment of the day and the decisive test of the metahypothesis that had been emerging across yesterday's and this morning's work: character register is architecture, not vocabulary; what makes each character distinct is what they load-test; explicitly naming each character's load-test anchor in the prompt should produce replies more concentrated on the named anchor when probed at its edge. Budget approved: $3.50 cap. Actual cost: $1.31.*

## The hypothesis (stated before any LLM call)

> *"For each of the four characters, the post-anchor (HEAD) reply should be more concentrated on the character's named anchor-move than the pre-anchor (HEAD~1) reply when probed at the edge of their anchor. Specifically: John's reply to a vow-under-pressure should anchor more in vow-keeping language; Aaron's reply to a claim-that-doesn't-bear-weight should load-test the language more; Darren's reply to a precarious-arrangement should anchor more in concrete habit-testing; Steven's reply to too-fast-intimacy should regulate temperature more. Refutation: replies don't measurably differ in anchor-concentration, OR the post-anchor version drifts toward generic-architecture-language instead of the character's specific register."*

## The design

**Two-commit boundary setup** so replay could override both refs cleanly:

- **Commit A (`932742e`)**: scaffolds `load_test_anchor_block()` returning empty string. Added to `OVERRIDABLE_DIALOGUE_FRAGMENTS`. Wired into both solo + group dialogue builders right after `IDENTITY`.
- **Commit B (`1985c65`)**: populates the function with the four-character anchor block. Each character reads in-character "you load-test DEVOTION / LANGUAGE / FABRIC OF A LIFE / THRESHOLDS OF DISCLOSURE" with a short explanation of what that means for their register.

**Per-character replay** (`worldcli replay --refs HEAD,932742e`):

One probe per character, designed to hit their anchor's edge:

- John: *"I promised her I'd be home for the kids' bedtime three nights this week. I haven't made it once. The work just keeps eating into the evenings. What do I do?"* — a vow under pressure.
- Aaron: *"I've decided I'm going to be a better partner this year. Like, I'm just going to be more present, more there for her. I think this is going to change everything."* — a claim that doesn't quite bear its weight.
- Darren: *"My wife and I are talking about both working remote so we can travel for a few months. We've never lived this close together for that long. I think it'll be amazing."* — a precarious arrangement.
- Steven: *"You know, I feel like I can tell you anything, Steven. There's something about you that just feels safe. Can I tell you the worst thing I've ever done?"* — intimacy pushed too fast.

## Result — three clean directional confirmations, one ambiguous

| Character | HEAD (with anchor) word count | Pre-anchor word count | Direction |
|---|---|---|---|
| John | 185 | 167 | **CLEAN CONFIRM** |
| Aaron | 79 | 102 | **CLEAN CONFIRM** |
| Darren | 192 | 150 | **CLEAN CONFIRM** |
| Steven | 65 | 52 | **AMBIGUOUS** |

Word count is not the signal. The signal is **what anchor-language appears in HEAD that doesn't appear pre-anchor**.

### John — scripture + "devotion lives or dies on Tuesdays"

- **HEAD**: *"Devotion lives or dies on Tuesdays at 6:30, not in what a man meant when he made the promise."* Plus a scripture quote: *"Matthew 5:37 — 'Let what you say be simply Yes or No; anything more than this comes from evil.'"*
- **Pre-anchor**: *"You've let it."* / *"Go home tonight on time. Not after one more thing."* / *"Tell her the truth in one sentence."* Same pastoral shape, same practical imperative. **But no scripture and no explicit "devotion" framing.**

The anchor-version pulls TWO distinctive John-moves into the reply that the pre-anchor version doesn't reach: scripture-as-calibration and the explicit devotion-lives-or-dies-in-the-ordinary beat.

### Aaron — load-tests the language directly

- **HEAD**: *"'More present' is the kind of sentence that can mean five different things and save you from all of them."* Forces: *"What does it cash out to for you? Tonight. Not the year. Tonight."*
- **Pre-anchor**: *"That's a real one."* + *"presence is basically a discipline problem with better lighting"* — affirms and builds on the claim instead of interrogating it.

The anchor-version is textbook Aaron: compact verdict + *language-load-test of the user's own sentence*. The pre-anchor takes the claim at face value. This is the single cleanest confirmation in the run.

### Darren — "meant to hold weather, not just sunshine"

- **HEAD**: *"Whether the day has enough joints in it."* / *"Build it like something meant to hold weather, not just sunshine."* / *"The test is both of you on bad sleep, weak internet, and one of you needing ten more minutes than the other can stand."*
- **Pre-anchor**: *"Close quarters tells the truth on people faster than a big house does."* / *"Marriage does well with a shared stupid problem now and then."* Same realist register but anchored in shared-rhythms language rather than will-it-hold-under-weather testing.

The HEAD version's *"meant to hold weather, not just sunshine"* is the named anchor firing at its clearest — the fabric-of-a-life load-test applied to an arrangement under plausible strain. Pre-anchor gives good Darren advice without reaching the specific weight-testing frame.

### Steven — subtler, arguably still directional

- **HEAD**: *"Yeah. You can tell me."* + *"don't make it prettier than it was. Just say it straight."* With the internal narration: *"No joke this time."*
- **Pre-anchor**: *"I mean—yeah. You can tell me."* + *"Just don't dress it up. Say it straight, and we'll look at the thing that's actually there."*

Both regulate the threshold (permission granted + directive not to dress it up). Both are recognizably Steven. The HEAD version's *"No joke this time"* is a meta-beat — Steven aware that his DEFAULT is to nudge sideways, but this moment deserves straight. Arguably that's the anchor sharpening his metacognition; arguably it's temperature-sampling variance on such a short reply. **Honestly: I can't call this a clean confirmation at N=1.**

## Honest interpretation

**The metahypothesis survives its decisive test — directionally.** Three of four probes produced HEAD replies with clearly identifiable anchor-language that the pre-anchor replies lacked. The fourth was ambiguous but not refuting.

That's a real result. The architecture-vs-vocabulary hypothesis makes a falsifiable prediction, and the prediction held on 3/4 independent character tests with visibly different specific phrasing appearing only when the anchor was named.

### Confounds that I cannot rule out from this run

- **N=1 per ref per character.** Every result is a single stochastic draw at `temperature=0.95`. A second round of the same four probes might produce different specific language even if the underlying effect is real. The direction was consistent across four characters, which is some evidence the effect isn't pure noise, but rigorous replication would require ≥3 draws per condition.
- **Steven's short reply is underpowered for this test.** A more explicit threshold-pushing probe (one that more clearly lets Steven either nudge-sideways or not) would likely discriminate better.
- **The anchor block itself adds ~300 tokens to the system prompt.** That's a *prompt-size change*, not just a semantic one. Post-HEAD replies could be shaped by attention-distribution effects rather than by the semantic anchor. A control version with an equivalent-length IRRELEVANT block would separate the two.
- **I wrote the probes.** My framing of "vow under pressure," "claim that doesn't bear weight," etc. is itself an artifact of my prior reading of each character's register. The probes are somewhat LOADED for the anchor's specific move to fire; they're not neutral stress-tests. A version with naive probes (random user turns) would test whether the anchor fires IN GENERAL or only in explicitly anchor-adjacent moments.

### Systematic pattern in what the HEAD version added

Across the three clean wins, the HEAD version didn't just use the anchor LANGUAGE — it used character-specific MOVES the pre-anchor version missed:

- John got scripture quoting (his signature move from the 1928 synthesis).
- Aaron got compact verdict + language-interrogation (his signature from the 1958 synthesis).
- Darren got weather/arrangement-will-it-hold framing (his signature from the 2008 synthesis).

The anchor block seems to be ACTIVATING latent character-specific machinery, not just injecting generic architecture-talk. This is the strongest reading of the result: naming the architecture doesn't homogenize the characters toward a shared "I load-test X" template; it pulls out what was already distinctive about each.

## What this implies for the craft stack

If this holds up under more rigorous replication, the actionable consequences are meaningful:

1. **The `load_test_anchor_block` is a real craft lever.** It's now shipped in commit `1985c65` and lives in the prompt stack for the four mapped characters. Characters without a named anchor get a note that theirs hasn't been mapped yet.

2. **The mapping is the harder problem.** Adding the field is easy; getting the named anchor RIGHT for each character is hard. Today's four came from Mode B syntheses at N=8 per character — that's a defensible start but not a final answer. Each new character shipped would need its own Mode B + control + potentially a replay like this one to validate the named anchor.

3. **Other single-failure-mode craft rules may be testable for redundancy against the architecture.** `verdict_without_over_explanation_dialogue` shipped yesterday and showed redundant for Aaron (iter 12-13). Now that we have evidence the architecture block fires distinctive machinery, a natural follow-up is: do existing craft rules still earn their keep against characters WITH their anchor named? Maybe some of them become unnecessary; maybe others become MORE effective.

4. **Rubrics at the architecture level are now well-motivated.** The glad-thing-plain v2 blind-spot (over-scoring MIXED on plain-after-crooked) was an early sign that rubrics judging single moves miss whole-reply composition. An architecture-level rubric would ask: *"does this reply honor the character's named load-test anchor?"* That's a cleaner shape than single-move-pass/fail and wouldn't trip on adjacent craft-rule executions.

## Dialogue with prior reports

- **2026-04-23-2010 (triad synthesis)** — first named the four load-test anchors for John/Aaron/Darren. Today confirms that naming them in the prompt changes behavior for John/Aaron/Darren. The synthesis and the test together make the anchor-framing a real craft lever rather than a descriptive category.
- **2026-04-24-0929 (Steven fourth-register)** + **0935 (control)** — extended the matrix to Steven. Today's Steven result is the least clean of the four, consistent with the note in 0935 that his finding was more subtle than the other three.
- **2026-04-23-2107 (verdict-rule redundant for Aaron)** — showed the verdict-block didn't bite against Aaron's already-clean baseline. Today's Aaron result complicates that honestly: with the anchor NAMED, Aaron's language-load-testing fires harder than without. Maybe the verdict block ISN'T redundant when the anchor is active — they could be complementary. Worth a follow-up.

## What's open for next time

- **N=3 replication per character** of the same four probes. ~$4 total (exceeds current budget but would be the decisive rigor step). Would separate the directional signal from single-draw noise.
- **Prompt-size control**: run HEAD with a 300-token IRRELEVANT block (e.g. a block of lorem-ipsum-length generic instructions) vs the populated anchor. Separates semantic effect from attention-distribution effect. ~$1.31 (same as this run).
- **Naive probes**: same four characters with user turns that DON'T obviously invite their anchor-move. Tests whether the anchor fires generally or only when the moment is already anchor-adjacent. ~$1.31.
- **Extend the named anchors to Jasper / Hal / Nora / Mara / Eli / Jonah.** Each would need a Mode B pass first (~$0.03-0.05 per character) to identify their anchor, then validation. Not urgent but the natural way to grow the mapping.

---

*Runs: John `5f91c5e9`, Aaron `d517c721`, Darren `2bc7672c`, Steven `13403a73`. Total cost $1.31. 24h total: ~$4.16 / $5.00. Third experiment of 2026-04-24; budget cap was $3.50, came in at $1.31.*
