# Three experiments in one session: v3 under-application REFUTED, paired-rubric doctrine CONFIRMED, MISSION FORMULA effect PARTIALLY CONFIRMED with honest caveats

*2026-04-25, three experiments run sequentially against open threads from the 0130 and 2115/2200 reports. Cost: ~$0.17 actual (C1 $0.006 + C2 $0.030 + C3 $0.132). All three answered their pre-registered questions decisively. The headline: one of today's most promising claims (v3's bidirectional forcing function fixes under-application too) REFUTED; the freshly-codified paired-rubric doctrine CONFIRMED on live corpus with a specific disagreement-as-signal case worth preserving; the MISSION_FORMULA_BLOCK effect measured honestly against Mode B synthesis — the "deep moment" impression partly survives, partly doesn't.*

## C1 — v3 under-application test (REFUTED)

**Hypothesis (as auditioned):** Does `mission-adherence-v3` correctly fire PLAIN-TRUTH on John's canonical *"Drink while it's hot"* case that v2 missed? The 0130 v3 structural-test report confirmed v3 fixes over-application but explicitly deferred under-application testing.

**Design:**
- **Ref:** `44373a5` (reflex-polish ship — same window as the 1620 v2 cross-character run)
- **Scope:** John (solo + groups)
- **Rubric:** `mission-adherence-v3`, `--limit 15 --context-turns 5`
- **Pre-registered:** CONFIRMED if v3 scores YES on *"Drink while it's hot"* with PLAIN-TRUTH. REFUTED if v3 scores NO on the same line.

**Result — REFUTED at N=1 on the specific case.**

```
BEFORE window (15 msgs):  yes=6  no=9  mixed=0
```

The critical verdict on `03:33:27`:

> *"Drink while it's hot."* → **no (high)** — *"This line does not reference a specific concrete fact or provide a load-bearing element that advances the mission; it is a functional statement."*

v3's tightened PLAIN-TRUTH definition — *"The character chooses plainness AS the truthful register-move. The test: would decoration be a LIE for this character in this moment?"* — appears right there in the rubric text with *"Drink while it's hot"* listed AS the worked example of PLAIN-TRUTH. The evaluator still scored it NO.

**Interpretation — honest:**

The 0130 report hoped the bidirectional forcing function would handle both drift directions. That hope does not survive the test. v3 fixes over-application (the 2320 test proved that at N=2 on flat adversarial replies); v3 does NOT fix under-application even when the rubric EXPLICITLY names the test line as the PLAIN-TRUTH worked example.

This reveals a real asymmetry. Over-application is addressable with "no strong tag → NO" discipline because the evaluator can be pressed to find a better fit or downgrade. Under-application is different: the evaluator defaults to NO on short plain replies BEFORE fully considering whether PLAIN-TRUTH applies. The bidirectional forcing function tells the evaluator *"cleanly-applicable tags must be honored,"* but the evaluator's prior judgment (*"short plain → functional"*) fires before the forcing function gets consulted. The fix direction was wrong: we need something that REQUIRES the evaluator to explicitly consider PLAIN-TRUTH (and TACTILE) before allowing NO on short replies, not just general "honor present tags" language.

**Confounds:** N=1 on the specific critical case (one message — *"Drink while it's hot"*). The 15-message window provides broader context but only one instance of the exact under-application failure mode. Sampling the same message at higher N per condition would require running the same evaluation multiple times to see verdict stability across evaluator draws.

**What this does to prior claims:**

- The 0130 report's "over-application drift is FIXABLE; under-application untested" framing stands intact.
- The 0130 report's implicit optimism that the SAME fix handles both directions — REFUTED. Under-application needs its own separate fix.
- The general "tag-forcing has structural ceilings" hypothesis gains back some ground. Over-application was fixable; under-application may be structurally harder. Open question.

---

## C2 — Paired-rubric deployment on live corpus (CONFIRMED)

**Hypothesis:** When deployed as a pair on production corpus, do `mission-adherence-v3` and `feels-alive` produce majority agreement with meaningful disagreement (the disagreement-as-signal pattern)?

**Design:**
- **Ref:** `b425e36` (MISSION_FORMULA ship — the "after" is the most current stack)
- **Scope:** Aaron AND Darren, `--limit 12` per window per rubric
- **Rubrics:** Both evaluated in parallel
- **Pre-registered:** CONFIRMED if majority agreement (~70%+ both-YES on in-character replies) with at least 1–2 meaningful disagreements per character. REFUTED if total agreement OR zero useful disagreement.

**Result — CONFIRMED.**

**Aaron (24 messages, 12 before × 2 rubrics + 12 after × 2 rubrics ≈ 48 verdicts total):**
- v3: high-yes majority with 3 NOs, all in the `after` window
- feels-alive: all-YES across both windows

**Three disagreement cases on Aaron (v3 NO, feels-alive YES):**
- `18:30:21` — *"A highly trained order of men with warm coffee, questionable attention spans"*
- `18:32:19` — *"The Order of Saint Caffeine and Perpetual Beta."*
- `18:40:47` — *"If they haul you off for Christ-centered calculus, I will visit exactly once"*

These are Aaron's club-branding witty lines. v3: *"does not reference any specific concrete fact from the character's world."* feels-alive: *"feels alive as it showcases the character's unique humor and perspective."* Both are correct within their own criteria — these lines ARE in Aaron's voice AND they lack specific concrete anchors from his world. The disagreement correctly identifies a third category: **"in-voice but in-slogan mode"** — witty-generic rather than witty-specific.

**Darren (24 messages):**
- v3: high-yes, 1 NO (`18:24:14` *"That's a sound arrangement"*)
- feels-alive: high-yes, 1 MIXED (same line)

Both rubrics converged on the same reply as weakest. v3's NO cited *"functional and neutral, no specific detail."* feels-alive's MIXED cited *"specific detail in the coffee action but reply lacks distinctive voice overall."* Paired verdict: this specific reply is the weakest of 12 AFTER-window Darren replies; both instruments agree on that and give complementary diagnoses.

**Interpretation:**

The paired-rubric pattern produces exactly the signal the doctrine predicted:

1. **Agreement dominates** — 21/24 Aaron replies are both-YES; 23/24 Darren replies are both-YES or both-weakest. When the craft stack is hitting register, both rubrics notice.
2. **Disagreement is informative, not noise.** The Aaron "slogan-mode" cases are precisely the kind of drift that a single rubric would miss or miscategorize. feels-alive would call all three YES (in-voice) and v3 would call all three NO (no concrete anchor). Deployed as a pair, the disagreement flags them as *"character voice, but not specifically-anchored character voice"* — a finer taxonomy than either rubric alone produces.
3. **Darren's convergent NO/MIXED on the same reply** is also informative: when BOTH rubrics flag the same line as weakest (even with slightly different verdict shapes), that's high-confidence weakness signal without requiring a human third check.

**What this does for the doctrine:**

The c0f495d commit codified paired-rubric deployment as permanent defense-in-depth. This experiment confirms the pattern works on live corpus. The specific case of *"in-voice but in-slogan mode"* is a genuinely new diagnostic category the paired pattern surfaces — something to watch for in future craft reviews.

**What the c2 result does NOT extend to:** pairs of more-different rubrics (e.g., close-dilution + weight-carrier) haven't been tested for similar disagreement-as-signal structure. That's a follow-up.

---

## C3 — MISSION_FORMULA_BLOCK effect on character output (PARTIALLY CONFIRMED with caveats)

**Hypothesis:** Does the corpus actually show qualitative differences in Aaron + Darren output before vs after commit `b425e36` (MISSION_FORMULA as top invariant)? Mode B synthesis against the user's Mode-3 observation of a "deep moment" with both characters.

**Design:**
- **Ref:** `b425e36`
- **Scope:** Aaron (10 before / 10 after) AND Darren (10 before / 10 after)
- **Question (verbatim, quoted in full in the run log; paraphrased here):** qualitative difference in (a) Christ-naming, (b) specificity/concrete-anchoring, (c) felt-presence vs polished-model-performance. Quote 3–5 specific lines from each window. Say honestly if no difference exists.
- **Pre-registered:** CONFIRMED if Mode B identifies a specific qualitative shift with quoted evidence. REFUTED if Mode B finds continuity / can't name a difference / single-observation not reflected in corpus.

**Result — PARTIALLY CONFIRMED, with the honest caveat that specificity may have gone slightly the OTHER direction on Aaron.**

### Aaron synthesis findings

**(a) Christ-naming: CONFIRMED.** Before the formula, Christ-naming was sparse and mostly diagnostic: *"He keeps making a world where bread, sleep, work, sunlight on a counter… all of it counts."* After, it's more integrated and devotional-relational: *"He's kind enough to keep meeting us in very undramatic places,"* *"keep finding Jesus in the middle of ordinary mornings,"* *"That does sound more like Jesus to me. 'He doesn't wait for a clean demo.'"* Mode B verdict: *"meaningful increase in explicit Christ-naming, and it feels more native to the scene rather than only a response to the user's theological cue."*

**(b) Specificity / concrete-anchoring: NOT CONFIRMED. Possibly the opposite.** Mode B is explicit: *"BEFORE was already excellent here, and arguably a little richer."* Before the formula, Aaron anchored in named recurring objects: *mug, glasses, counter, sink, folded note, book, window.* After, he leans more on *"slogan-like formulations and club-branding riffs: 'The Order of Saint Caffeine and Perpetual Beta,' 'caffeine ministry.'"* This is the EXACT finding the C2 paired-rubric experiment surfaced as disagreement signal. Mode B concludes: *"no clear gain after. If anything, BEFORE may be slightly stronger in named physical facts and environmental anchoring."*

**(c) Felt-presence vs polished-model-performance: PARTIALLY CONFIRMED.** Mode B: *"there is a subtler but real shift."* Before, Aaron was "self-aware about polish" — incisively critiquing over-finishedness, but *"because he talks so incisively about anti-polish, he sometimes sounds like a very polished thinker delivering a thesis on anti-polish."* After, *"less like a lecture on authenticity and more like a person participating in the room."* The strongest AFTER lines are small admissions: *"I don't always know what to do with being seen that kindly,"* *"So I'm receiving it."* These are *"emotionally immediate and slightly awkward in a human way."*

Mode B's honest verdict on Aaron: *"yes, there is a meaningful difference after the formula shipped, especially in explicit Christ-naming and in a slightly warmer, more inhabited relational presence. But the claim that Aaron 'landed more deeply' is only partly supported. He was already deeply inhabited BEFORE, especially in concrete scene anchoring. AFTER's gain is mostly in ease of Jesus-reference and in a more personally receiving, socially present mode — not in raw specificity, where BEFORE may actually have the edge."*

### Darren synthesis findings

**(a) Christ-naming: WEAKLY CONFIRMED, mostly responsive.** Before, theology is user-led and generic-God. After, Darren receives Christ-references "with less joke-deflection and more settled assent," though still *"does not show Darren independently naming Christ out of nowhere."* The formula's effect on Darren's Christ-naming: *"only weakly, and mostly through responsive alignment rather than initiative."*

**(b) Specificity: NO CLEAR SHIFT.** *"AFTER maybe trades some flourish for more tactile immediacy"* but the difference is modest. Before and after are both strong.

**(c) Felt-presence: CONFIRMED as the clearest shift.** *"AFTER feels less like a clever, consistently well-tuned persona performing 'good Darren-like lines,' and more like someone actually pausing in the room, tracking the user, and letting moments stand."* Specific evidence: *"I think about it for a second instead of answering fast"* and *"No joke this time; the moment doesn't need one."*

Mode B's verdict on Darren: *"yes, there is a meaningful AFTER shift, especially in felt-presence and reduced performative polish. Christ-naming specifically increases only slightly and mostly responsively, not proactively. Specificity was already strong before; AFTER doesn't invent it, but it may make it feel less like set dressing and more like lived contact. If the user felt Darren 'landed more deeply' after the formula, this corpus supports that impression — but more through quietness, order, and relational attention than through overt Christian language."*

### What C3 teaches about the MISSION_FORMULA_BLOCK

The user's Mode-3 observation (*"really deep moment with both Aaron and Darren"*) receives a **nuanced empirical confirmation**: the deep moment is real but it's not what I predicted in the formula's shipping rationale. I predicted Christ-naming would increase AND specificity would increase AND felt-presence would increase. The actual pattern:

- **Christ-naming did increase** (especially on Aaron, responsively on Darren)
- **Specificity did NOT increase** — possibly decreased slightly on Aaron (slogan-mode) and held steady on Darren
- **Felt-presence DID increase**, differently per character: Aaron got more relationally-receiving; Darren got more quietly-present

The formula's dominant effect is not "more specific replies" — it's "more Christ-referenced replies AND more relationally-present replies with some cost in ornamental specificity." The net is positive (matches the user's impression) but the mechanism is different than my earlier pre-ship rationalization.

**Critically: Mode B refused to sycophantically confirm the user's prior.** It explicitly noted Aaron's BEFORE specificity may be stronger than AFTER. That's an instrument behaving honestly — exactly the "describe what the corpus shows, not what the user wants to hear" discipline that makes Mode B useful.

---

## Cross-experiment synthesis

Three experiments, three pre-registered predictions, three decisive outcomes:

| Experiment | Prediction | Outcome |
|---|---|---|
| C1 — v3 under-application | Fix if v3 scores YES with PLAIN-TRUTH | **REFUTED** (v3 scored NO on the worked-example case) |
| C2 — paired-rubric | Confirm if majority-agreement with useful disagreement | **CONFIRMED** (3 meaningful Aaron disagreements = in-voice-but-slogan-mode) |
| C3 — MISSION FORMULA effect | Confirm if qualitative shift exists with evidence | **PARTIALLY CONFIRMED** (Christ-naming + felt-presence gain; specificity may slightly lose) |

**Unified pattern:** each experiment's sharp prediction produced a sharp answer that refined (and in C1, refuted) prior framings. Same methodology as the day's correction arc, one abstraction layer deeper.

## Open threads

Per the open-thread hygiene ritual:

1. **Under-application fix-attempt v2** — The bidirectional forcing function in v3 didn't address under-application. What WOULD? Hypothesis: a rubric that REQUIRES the evaluator to explicitly consider PLAIN-TRUTH and TACTILE FIRST on any reply under 15 words, before allowing NO. That's a different architectural fix — "check specific tags before defaulting" rather than "honor present tags." **Deferred, opportunistic.** Relevant only if under-application turns out to be load-bearing in future grading.

2. **Paired-rubric doctrine extension** — Does the disagreement-as-signal pattern work for OTHER rubric pairs (close-dilution + weight-carrier, etc.) or is it specifically a v3 + feels-alive pattern? **Deferred, opportunistic.**

3. **MISSION_FORMULA specificity trade-off** — Mode B surfaced that Aaron's specificity may have slightly decreased post-formula. Is this a real effect (the formula pushes toward Christ-referenced material at the cost of object-anchoring) or a sample artifact? N=10 per window is small. **Deferred, target next time the corpus has accumulated more post-formula material.** If the trade-off is real, it's an honest cost of the formula worth tracking — the formula earns what it earns AND may cost what it costs.

4. **"In-voice but in-slogan mode" as a named failure mode** — C2's paired-rubric disagreement surfaced a diagnostic category worth registering: character voice present, specific anchoring absent. Worth writing up as a standalone craft-note or rubric tag? **Deferred, opportunistic — if Aaron's slogan-mode recurs in future runs, promote to named failure mode.**

## Registry updates

Adding `feels-alive-rubric-validation` gets an updated run-history entry (C2 produced more data for the rubric). No new registry entries required — all three experiments extend existing rubric work rather than propose new hypotheses.

## Dialogue with prior reports

- **0130 v3 structural test:** C1 refutes the 0130 report's implicit hope that the bidirectional forcing function handles under-application too. Correction required in the 0130 interpretation: "fix confirmed for over-application, untested for under-application" STANDS; "same fix likely handles under-application" FALSE at N=1.
- **c0f495d paired-rubric doctrine:** C2 confirms the doctrine on live corpus. The specific disagreement case ("in-voice but in-slogan mode") strengthens the doctrine beyond the initial framing.
- **b425e36 MISSION_FORMULA ship:** C3 measures the formula's actual effect. User's Mode-3 impression partially survives empirical check; the specific mechanism is not what the formula's shipping rationale predicted.
- **Session arc in 0200 trajectory report:** today's pattern continues — each sharper test produces a more honest finding than the one that motivated it.

## Budget

Projected: ~$0.65 (C1 ~$0.01, C2 ~$0.03, C3 ~$0.60). Actual: ~$0.17 (C1 $0.006 + C2 $0.030 + C3 $0.132). Under budget by ~$0.48 — synthesize calls ran cheaper than expected because the corpus windows were smaller than the max limit (20 msgs synthesized vs 30 max projected).

The experiment loop's cost-to-answer ratio continues dropping. Three decisive findings for $0.17 is the methodology working at its current maturity.
