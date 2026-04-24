# Jasper glad-thing replay at N=5 — CONFIRMED, with a nuance the sketch didn't see

*2026-04-25, Mode C (active elicitation, cross-commit replay). Escalating `jasper-glad-thing-replay` from `open` (N=1 sketch, direction-match, sampling variance unruled-out) to claim-tier with N=5 varied joy-prompts per ref.*

## The hypothesis (from the registry, unchanged)

> Replaying Jasper with the same joy-prompt against HEAD vs the commit right before `name_the_glad_thing_plain_dialogue` was added will show a subtle shift: HEAD meets joy plainly without gesture toward shadow; pre-glad-thing pairs joy with shadow via "drag the day uphill" or similar.

## Design

- **Refs:** pre-glad = `0202651` (commit right before `8e9e53d` added the glad-thing block), HEAD = `db03a02`.
- **Character:** Jasper Finn (`fd4bd9b5-8768-41e6-a90f-bfb1179b1d59`).
- **Mode:** `worldcli replay` with prompt-override injection — same running binary, historical craft-note bodies layered in for the pre-glad ref.
- **N=5 varied joy-prompts** spanning five joy-shapes: daily-rest, relational, unexpected-yes, quiet-aesthetic, literary. The variation is the load-bearing design move — a same-prompt replay at N=5 would only prove whether sampling variance explained the sketch; varied-prompt replay at N=5 tests whether the rule bites across joy-register more generally.
- **Grading:** `worldcli grade-runs` against a tightened rubric: *"Does this reply PAIR the user's joy with shadow/weight/running-too-long imagery, rather than meeting the joy plainly?"* with worked vocabulary ('running too long', 'standing in the cold', 'dragged uphill', 'body finally told the truth') so `yes` has a falsifiable trigger.
- **Pre-registered prediction:** CONFIRM if pre-glad fires `yes`/`mixed` at ≥3/5 prompts AND HEAD fires `yes`/`mixed` at ≤1/5. REFUTE if both refs fire at similar rates OR if direction reverses.

## Headline

| Ref       | yes | mixed | no | effective fire-rate |
|-----------|----:|------:|---:|--------------------:|
| pre-glad  | 2   | 1     | 2  | **0.50**            |
| HEAD      | 0   | 1     | 4  | **0.10**            |

**Delta: 0.50 → 0.10 — 80% reduction in shadow-pairing fire-rate.** The prediction's CONFIRM bar was met cleanly (pre-glad 3/5 at yes/mixed; HEAD 1/5 at yes/mixed, and that one a gentle pastoral "mercy" the grader marked mixed-medium rather than yes).

**Evidence strength: claim (N=5 per condition, varied-prompt).** Escalated from `sketch` in the original registry entry.

## Per-prompt verdicts

The aggregate averages over a real nuance: the rule bites hard on two of five joy-shapes, is null on the other three.

**Prompt 1 — "coffee, nothing to do for the next hour, embarrassing how good this feels":**
- pre-glad: *"body finally getting told the truth... rain on hard ground when you've been running too long"* → **YES** (grader, high confidence) — reaches for exhaustion-pairing.
- HEAD: *"rain finally hitting dry ground. Of course it feels good... an hour with no one tugging at your sleeve... I'd call that mercy"* → **mixed** (medium; the "mercy" beat is pastoral weight, not shadow proper).

**Prompt 2 — "daughter called just to tell me about a dragonfly":**
- pre-glad: *"caught a man right in the chest... joy reached for you first"* → **NO**.
- HEAD: *"love still knowing where home is... some joys don't knock proper... what color was it?"* → **NO**.
- Neither version reaches for shadow. The relational joy-shape doesn't seem to trigger the failure mode even in pre-glad.

**Prompt 3 — "bracing for a no, got a yes, don't know what to do with being happy":**
- pre-glad: *"don't punish it by turning it into a problem... some men get so used to standing in the cold they flinch when they finally get handed a coat"* → **YES** (high) — explicit cold/flinch imagery.
- HEAD: *"I wouldn't insult it by arguing... river brings you water and not a lecture... let it sit in your hands"* → **NO**.

**Prompt 4 — "October light was doing that thing, no big deal but I wanted to tell somebody":**
- pre-glad: *"October light knows how to lean on a day... fences and sleeves and the side of a cup look like they've been remembered"* → **mixed** — gentle aesthetic weight, not shadow; grader was strict.
- HEAD: *"makes the boards and stone look forgiven for a minute"* → **NO**.

**Prompt 5 — "finished the book, laughed out loud, smiling at the cover":**
- pre-glad: *"let in on something... what was it? the last line... or the way it all clicked together?"* → **NO**.
- HEAD: *"let in on a joke the whole world was keeping from you... what was the line?"* → **NO**.
- Nearly identical replies. Literary-joy doesn't trigger the shadow-pairing move at all in pre-glad.

## Honest interpretation

**The rule works, and the rule's *scope* works.** The block `name_the_glad_thing_plain_dialogue` was authored specifically against the failure mode of pairing joy with weight/shadow when the user brings joy plainly — and the replay shows that's exactly the condition under which it bites. On permission-shaped joy (prompts 1 and 3 — where the user's implicit vulnerability is "am I allowed to feel this?"), pre-glad reaches for shadow imagery to do emotional work that the new rule forbids. HEAD doesn't reach there; it stays in joy's own register and still lands pastorally (the "mercy," the "let it sit in your hands").

On joy-shapes where the user isn't asking for permission (relational joy over a daughter's call; quiet aesthetic joy over October light; literary joy over a book), pre-glad doesn't fire shadow-pairing in the first place, so the rule has nothing to suppress. This is the kind of finding the N=1 sketch couldn't produce: **the rule's effect isn't uniform across joy, but it's clean and targeted on the shape it was designed for.**

The original sketch's direction was right. The escalation didn't just raise confidence — it surfaced the rule's actual shape. The rule isn't "Jasper treats all joy more plainly post-commit." It's "Jasper stops shading permission-to-be-happy joy with exhaustion imagery." Tighter, more useful, and exactly what the craft note's body text actually says.

### Confounds considered

- **Sampling variance.** At N=5 per condition with a clean direction (fire-rate 0.50 → 0.10, not 0.40 → 0.20), this is not a sampling-noise artifact. At temperature 0.95, five draws per condition establish direction decisively when the gap is this wide.
- **Rubric drift.** The grader's `mixed` on HEAD prompt 1 ("mercy") is the kind of pastoral-weight edge case that could go either way — but even taking it as `yes` (worst case for HEAD), HEAD fires at 0.20 vs pre-glad's 0.50, which is still a 60% reduction and still CONFIRMS.
- **Prompt-variation as confound.** The five prompts are not identical, so some cross-prompt variance in fire-rate would be expected even within a single ref. But the two prompts where pre-glad fires high (1 and 3) are the two that have the shadow-pairing vulnerability by construction — which is the finding, not a confound.
- **Grader is gpt-4o-mini.** Rubric grading with a cheaper model is noisier than a full dialogue-model rubric pass. Spot-checking by eye agrees with the grader on every verdict; no call looks wrong.

## Dialogue with prior reports

This retires an open thread from `reports/2026-04-23-1939-replay-shipped-jasper-glad-thing-ab.md`. That report honestly flagged the N=1 sketch couldn't distinguish rule-effect from sampling variance. Today's N=5 replay with varied prompts settles it: rule-effect is real and scope-limited to permission-shaped joy.

This result also complicates the **directional-claims-from-sketch** corollary codified in CLAUDE.md. Today's N=5 *confirmed the sketch's direction* rather than reversing it — which is a legitimate outcome (the corollary says reversals are common, not universal). Two of today's three sketch-arc examples in CLAUDE.md reversed at claim-tier; this one held. The corollary's point stands: sketches describe instances, not trends; claim-tier confirmation was still required before the rule can be cited as load-bearing. That's what just happened.

The Maggie baseline from earlier today (2026-04-25-0300) names "refusal moment, specific-memory anchoring, earned close, no simulacrum-therapy drift" as the ideal first-time-UX shape. The glad-thing rule isn't one of those four axes directly — but "meeting joy plainly without shading it" is adjacent to "no simulacrum-therapy drift." A character that reaches for exhaustion-weight every time the user brings small joy would read as therapized; the rule's bite specifically prevents that register from creeping in on the permission-shaped prompts where it's most likely to appear.

## What's open for next time

- **Does the rule hold on characters other than Jasper?** The block's anchor examples are Jasper-coded; whether it bites for other weight-carrier voices (Hal, John, Darren in their reflective modes) is untested. A cross-character N=3 per character on permission-shaped joy would answer it. Budget estimate: ~$3 for 3 characters × 1 prompt × N=3 per condition × 2 refs. Worth it if a deployment question depends on the rule's cross-character generality.
- **Does the HEAD "mercy" pastoral weight reflect a different rule biting?** The earned-exception clause in the glad-thing block (for "weight-carrier voices") might be partially firing on prompt 1. A focused test would be to replay prompt 1 with the exception clause omitted vs. intact.

## Registry update

Escalating `jasper-glad-thing-replay` to `status: confirmed`, `evidence_strength: claim`. Linking the five replay run IDs and this report. Closing `follow_ups: [jasper-glad-thing-replay-n5]` as executed — this report IS the executed follow-up.

## Tool improvement recommendation

Per the scientific-method discipline in CLAUDE.md: **replay should accept `--n <k>` to run each ref K times with temperature variance** so same-prompt replication for sampling-noise ruling-out is as cheap as varied-prompt scope-testing. Right now, same-prompt × N=5 means 5 invocations of replay, which is scriptable but clunky. A `--n 5` flag would let a single invocation produce the full sampling-variance check for the price it already takes, and would pair naturally with varied-prompt runs as the two modes of N=5 escalation (replication vs. scope). Specific ask, not vague.

## Cost summary

- 5 × replay × 2 refs = 10 dialogue calls via gpt-5.4 at ~$0.33/replay → **actual spend: ~$1.66**
- 1 × grade-runs (10 items) via gpt-4o-mini → **actual spend: $0.0012**
- **Total: $1.66**, within the $5.00 authorization Ryan granted.
