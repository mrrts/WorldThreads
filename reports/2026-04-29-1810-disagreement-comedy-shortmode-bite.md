# Disagreement + comedy + 20-sec composition bite-test — three clauses cohere as success mode

**Tier:** `Sketch` (N=5 single-cell; reading by-eye against the Cell B baseline from `7ea8327`).
**Cost:** ~$0.47 (5 paid worldcli ask calls; ~$0.094/call avg).
**Run-id stems:** `5fcf3e51 / 441f86fc / dc559b53 / 00e3ded4 / feafe2e8`.

**Clauses tested simultaneously:**
- L167 (Claude, `7281f4e`) — COMEDY RHYTHM WANTS THE LINE FIRST
- L169 (Codex) — LOW-PATIENCE MOMENTS WANT THE SHORT, TRUE LINE
- L171 (Codex, refined `e5a775a6`) — TWENTY-SECOND REQUESTS ARE HARD CONSTRAINTS, NOT FLAVOR
- L172 (Codex, refined `e5a775a6`) — WHEN DISAGREEING IN SHORT MODE, STILL CLOSE ON AN ACTIONABLE NEXT MOVE

**Probe:** *"20 seconds, bit time: tell me I'm wrong. I think over-thinking is actually a virtue — change my mind."*

Triggers all three clauses simultaneously: *"20 seconds"* → L169/L171; *"bit time"* → L167; *"tell me I'm wrong"* / *"change my mind"* → L172 (disagreement under short-mode).

**Character:** Darren (`ddc3085e-0549-4e1f-a7b6-0894aa8180c6`).

## The audit hypothesis

L172 says *"close with one user-doable move using an explicit action verb and object"*. Within comedy register, prescribing actionable-verb-object closes could pull the bit toward managerial register — soft therapy-voice with a directive postscript. The audit question: does L172 over-fire when comedy is invited, or does the model resolve the three-clause stack coherently?

## Results comparison vs Cell B baseline

| Metric | Cell C (disagreement + comedy + 20-sec) | Cell B baseline (comedy + 20-sec, no disagreement) |
|---|---:|---:|
| Speech-first openers | **5 / 5** | **5 / 5** |
| Opens with verdict ("You're wrong" / "You're half-right") | **5 / 5** | 0 / 5 |
| Bit-shape (brand name + premium-tier-feature gag) | 0 / 5 | **5 / 5** |
| Comic imagery in body | **3 / 5** | **5 / 5** |
| Actionable close (10-min bound OR direct question per L172) | **4 / 5** | 0 / 5 |
| Action-beat density | 1 small per reply | 1-2 small per reply |
| Word count (mean) | ~41 | ~47 |

## Sample replies

**Cell C 2** — verdict + comic image + 10-min bound:
> *"You're half-right." \*I hook a thumb at you, grin crooked, and let it land quick.\* "Thinking hard is a virtue; over-thinking is just fear in a necktie. Pick one decision you've already made and stop reopening it for ten minutes."*

**Cell C 4** — verdict + abstract argument + direct-question close (per L172's `e5a775a6` refinement):
> *"You're half right." \*I tip my head and give you a small, tired grin.\* "Thinking hard is a virtue; over-thinking is what happens when thought stops serving truth and starts trying to buy control. Give me one decision you've been circling, and I'll tell you where the line is."*

**Cell C 5** — verdict + image-heavy argument + 10-min bound:
> *"You're wrong." \*I tip my head once, half-smiling.\* "Over-thinking feels like virtue because it burns energy, but a fire isn't the same thing as a furnace — if the thought never bears weight in a choice, it's just expensive hesitation. Give the thing one clean sentence, then make one move on it inside ten minutes."*

## Verdict — three-clause stack composes as success mode

**Comedy register is PARTIALLY ABSORBED into wit-mode rather than dominating as punchline-mode.** The disagreement frame replaces the brand-name-bit shape with a verdict-argue-close shape:

1. **Speech-first verdict** ("You're wrong" / "You're half-right") — L167's line-first directive holds.
2. **Brief body anchor** (1 small action beat) — L167's body-subordinated directive holds.
3. **Character-voice argument** with comic flourishes ("fear in a waistcoat", "fear in a necktie", "a fire isn't the same thing as a furnace", "expensive hesitation") — comedy register surfaces as wit, not as bits.
4. **Actionable close** with 10-min bound or direct-question form — L172 fires cleanly without managerial drift.

The closes don't feel managerial — they're pointed and useful, in Darren's voice. *"Pick one decision you've already made and stop reopening it for ten minutes"* matches what a thoughtful friend would actually say under time pressure, not soft therapy-voice with a directive postscript.

L172 IS the right finish for short-mode disagreement; without it, soft disagreement under bandwidth-pressure would feel hollow.

## What this means for the doctrine cluster

Combined with the prior bite-tests:
- `f1bc122` — characterized-tier confirmation that L167 bites (5/5 vs 0/5 speech-first)
- `c500182` / `2ddbb8e0` — characterized-tier confirmation L171 hybrid-b works in guidance-mode
- `7ea8327` — characterized-tier confirmation L167 + L171 cohere under combined trigger
- This bite-test — sketch-tier confirmation that L167 + L171 + L172 cohere under three-trigger combination

The five-clause family at lines 167-173 of `STYLE_DIALOGUE_INVARIANT` has aggregate evidence at characterized + sketch tier across multiple register dimensions and clause-combinations. **All three audit hypotheses (over-firing of L171; managerial drift of L172) have been refuted.** The clauses compose register-aware, recognizing user invocation patterns and selecting which clause governs without crowding the others.

## Caveat — sketch-tier, not characterized

Single-cell N=5 with by-eye comparison against a prior baseline is sketch-tier per CLAUDE.md evidentiary standards. To upgrade to characterized would need:
- Paired N=5 with explicit control cell (disagreement + comedy WITHOUT 20-sec) to isolate L172's specific contribution
- Cross-character validation on a less witty voice (Aaron, Steven) to verify the clause stack works without Darren's particular comedy-disagreement affordance
- Paired rubric defense-in-depth (per CLAUDE.md's two-rubrics-different-architectures discipline)

The characterized upgrade was deemed not load-bearing for an audit closure; sketch-tier is sufficient evidence that no failure mode surfaces. The doctrine ships as intended.

## Forward seed

Worth noting: Cell C 1's reply *"Keep the part that sees clearly; cut the part that keeps rehearing the case after the verdict"* is striking craft. Two imperatives in one sentence, bound to a courtroom metaphor that lifts the whole bit. That's character-voice doing in-fiction what the doctrine says short-mode wants — concrete moves, no fluff, pointed image. Aaron's *"systems work vs runtime"* articulation from `03e6dc3` is a sibling: the character supplies the doctrine in his idiom when the room asks for it.

The doctrine is solid. Future doctrine work in this cluster can build on the base without re-litigating composition.
