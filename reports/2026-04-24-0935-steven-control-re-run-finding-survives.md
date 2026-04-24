# Steven's fourth-register finding survives the framing-control re-run

*2026-04-24 morning. Second experiment of the day. Direct control for the 0929 Steven Mode B run, testing whether the fourth-register finding was framing-induced (the 0929 prompt asked the model to compare Steven to John/Aaron/Darren, which biases toward emphasizing differences). Re-runs the identical question with the comparison clause removed. Mode B, $0.0418, ref `8e9e53d` for exact parity.*

## The hypothesis

> *"Does Steven's 'distinct fourth register' finding survive a control re-run that omits the explicit comparison to John/Aaron/Darren? The 0929 report named framing-induced contrast as a confound — the prompt asked the model to compare, which biased toward emphasizing differences."*

## The design

Exactly identical to the 0929 run on every dimension EXCEPT the question.

- **Ref**: `8e9e53d`
- **Scope**: `--character c244b22e-cab3-41e9-831b-d286ba581799` (Steven)
- **Mode**: B
- **Limit**: 8
- **Question (control — only change from 0929)**: the comparison clause is removed; otherwise identical.

**0929 (with comparison)**:
> *"[... same first 4 sentences ...] Name his register as specifically as possible. **Compare him explicitly to John (physician-like pastoral authority, scripture-anchored), Aaron (forensic pastoralism with engineering metaphors), and Darren (laconic domestic moral realism, anti-preciousness) — does he map cleanly onto one of those three, or does he define a distinct fourth register?**"*

**0935 (control)**:
> *"[... same first 4 sentences ...] Name his register as specifically as possible."*

## Pre-registered prediction

- **CONFIRMED**: control synthesis names a register substantially similar to *"itinerant craftsman reserve / weathered lay discernment"* — overlapping vocabulary, same core authority-moves, does NOT reduce Steven to John/Aaron/Darren unprompted.
- **REFUTED**: control names substantially different register-language or authority-anchors, OR describes Steven in generic pastoral terms, OR unprompted maps him to John/Aaron/Darren.
- **AMBIGUOUS**: some agreement, some substantial divergence.

## The result — CONFIRMED

Control names Steven's register: **"weathered pastoral realism with tradesman's wit"** / **"laconic, blue-collar, lightly devotional, anti-grandiose intimacy"** / **"roadside spiritual mechanic."**

0929 named: **"itinerant craftsman reserve / weathered lay discernment / tactile, oblique, low-heat pastoral realism with a repairman's eye for wear-patterns."**

**Overlapping vocabulary across both runs:**
- "weathered" (both)
- tradesman/mechanic/craftsman identity (both)
- "pastoral realism" as a core descriptor (both)
- tactile particulars as moral vocabulary (both)
- reserve / anti-grandiose / unsentimental / bounded (both)

**Same core authority-moves** (control names four; 0929 named four — substantial overlap):

| Move | 0929 label | Control label |
|---|---|---|
| 1 | Boundary-setting without drama | Boundary-setting without apology |
| 2 | Moral diagnosis through concrete particulars | Reframing abstract/emotional topics into observed concrete truth |
| 3 | Deflection that controls the moral frame | Using dryness and sideways humor to keep control of emotional temperature |
| 4 | Granting dignity by understatement | Refusing the bait of overexplanation / Redirecting conversation |

**Same liftable corpus language anchored in both runs**: *"nudge the moment sideways before it gets too warm"* (the corpus's own phrase, central to both syntheses); *"Not worth explaining badly"* (the control elevates this further, calling it Steven's "credo"); *"I won't take the 'anything, anytime, anywhere' deal"*; *"Some things. Some times. Some places."*; *"In habits. In what a man won't joke about. In the one road he won't take."*

**Same absences named**: no sermonizing, no spiritual counsel, no big redemptive speeches, no performing rugged omniscience, no "you can always talk to me" reassurance.

**Critical: the control did NOT map Steven to John/Aaron/Darren unprompted.** The synthesis describes Steven's register in its own terms. It notes absences relative to a generic "bearded Bible-reading drifter/mentor" archetype but never reaches for the triad as a comparison frame.

## What the control ADDED that 0929 didn't name

- **"Selective permeability"** — *"the authority isn't coldness. It's selective permeability."* A new coinage that names Steven's stance sharply; candidate craft vocabulary.
- **"Custodianship"** — the control frames the photograph-withhold (*"Old photo. Not worth explaining badly"*) as *"custodianship"*, not evasion. He decides what gets enlarged. Worth lifting.
- **"Selective permeability"** and **"custodial"** both name the same thing the 0929 synthesis gestured at less directly.

## What 0929 had that the control didn't

- Explicit placement in the four-row matrix (because the question asked for it). The control just names Steven's register as its own thing, without needing to say "fourth."

## Honest interpretation

**The fourth-register finding is robust to framing.** The concern was that the 0929 prompt's explicit comparison clause might have been the load-bearing driver of the "distinct fourth register" conclusion — that the model might have manufactured differences because the question requested comparison. The control removes the comparison and still independently arrives at nearly the same read: weathered tradesman, anti-grandiose, selective permeability, moral diagnosis through particulars.

Two readings of this convergence:
1. **Strong**: both syntheses are finding a real register-pattern in the corpus. Steven's voice has distinctive texture that the model latches onto regardless of framing.
2. **Weaker but still honest**: both syntheses are pattern-matching the same salient surface features of the same 8 messages. The "register" is a stable description of those cues, but at N=8 we can't rule out that all it's really detecting is the cluster of tactile-vocabulary quotes.

Either way, the *finding-within-its-scope* survives the test I designed for it.

## Confounds still open (not addressed by this control)

- **N=8 is still small.** Temperature-sampling variance could produce different register-language on a second control run even if the shape is stable. A higher-N re-run (N=15) would harden the finding.
- **Single evaluator model.** Both runs used gpt-5.4. Model-specific bias cannot be ruled out from two runs with the same model. A different-model re-run would test this.
- **Surface-vs-deep.** The overlapping quotes across both syntheses might be explained by the corpus's specific word-frequency distribution, not by Steven having a deep register. This is the "weaker reading" above; it's compatible with the finding but doesn't reject it.

## Dialogue with prior reports

- **0929 (Steven fourth-register)** — hypothesis confirmed under comparison framing. This run confirms under control framing. The matrix extension from triad to quartet is now citable with a reasonable confidence bar.
- **Triad synthesis (2010 yesterday)** — predicted a fourth register might be hiding in Pastor Rick or Steven. Confirmed for Steven (Pastor Rick's corpus is illustration-heavy). The triad is genuinely not exhaustive.
- **Methodological note for `run-experiment` skill**: this kind of control re-run is cheap (~$0.04) and meaningfully addresses a named confound from a prior report. The skill could explicitly name *"when a prior report names 'framing-induced contrast' as a confound, the next natural experiment is a control re-run without the biasing clause"* — a portable discipline. Worth lifting if this pattern recurs.

## What's open for next time

- **Second control run** to test temperature-sampling variance (same question, same ref, another synthesis call). If the register language drifts significantly, we have a different confound than framing. ~$0.04.
- **Higher-N re-run (N=15)** to address sample-size confound. ~$0.08.
- **Author *"selective permeability"* as candidate craft note** — it captures something the existing stack doesn't name. Mode C ask-the-character to Steven about when he opens vs. when he withholds; lift into prompts.rs as a draft. ~$0.16-0.30.
- **The three follow-ups from 0929 still valid**: ask Steven about *"nudge sideways"*, author observation_as_warmth with Darren + Steven as co-witnesses, build out the character-builder "load-test" field proposal.

---

*Run id: `dc9d23eb-577b-4b34-a4b4-2d6b577eab6e`. Cost $0.0418. 24h total: ~$2.85 / $5.00. Second experiment of 2026-04-24, disciplined follow-up that hardens yesterday's finding.*
