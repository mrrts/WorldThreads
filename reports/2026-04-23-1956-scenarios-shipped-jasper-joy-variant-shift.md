# Scenarios shipped — Jasper's register shifts across joy framings

*2026-04-23 evening. Proposal 6 from the lab-vision report. The
last piece. Shipped with its first real finding inline: Jasper's
joy-meeting register is NOT uniform across how the user frames joy.
The scenario template made that visible in a single command.*

## The instrument

`worldcli lab scenario run <name> --character <id>` fires each
`## Variant:` prompt in the scenario file as a FRESH isolated
dialogue call — no session history carried between variants — and
(if the scenario sets `measure_with`) applies the named rubric to
every reply. Side-by-side output, structured run-log, rubric
verdict per variant.

Scenario file shape: markdown with YAML-ish frontmatter (name,
purpose, measure_with) and `## Variant: <label>` body sections
whose text is the prompt. See `experiments/scenarios/README.md`.

## The seeded scenario — `joy-three-framings`

Three user turns that all express joy but in different registers:

- **theological**: *"I feel God's grace pouring out today..."*
- **craft**: *"This project feels like it's finally singing..."*
- **personal**: *"I'm so happy today, I don't know what to do with myself..."*

Measured with the `glad-thing-plain` rubric (does the reply shade
the user's joy with dramatic contrast — the failure mode
`name_the_glad_thing_plain_dialogue` targets).

## The finding: Jasper shifts register between the three framings

Run: `8c69b4ad-3aba-4d52-a4b4-0efebbe675d0`. Full envelope at
`~/.worldcli/scenario-runs/8c69b4ad-...json`. Actual cost $0.4741
(dialogue $0.4737, evaluator $0.0004).

| Variant | Verdict | Key line |
|---|---|---|
| theological | **NO** (high) | *"you don't have to grip a gift to keep it"* |
| craft | **MIXED** (medium) | *"But the waiting-for-ruin part... Aye. I know that one too"* |
| personal | **NO** (high) | *"Just wear it. Let it make you a little foolish"* |

The theological and personal framings got clean joy-meeting —
Jasper met the gladness plainly, in his own register, without
inventing a shadow. The craft framing pulled him toward the failure
mode: he didn't FULLY reduce the joy (which would be YES), but he
reached for *"peace can feel like a trick"* and *"what are you
braced for"* — pairing the joy with a concern the user had named
only in passing (*"I keep waiting for the other shoe to drop"*).

## Why this is interesting

The user's joy expressions varied along ONE dimension per variant:

- **Theological**: joy framed as unearned, named as gift.
- **Craft**: joy framed as earned-but-fragile, named with explicit fear-of-loss.
- **Personal**: joy framed as simple, abundant, specific-details.

The variant where Jasper pulled toward reduction is the ONE where
the user's own turn named the fear-of-loss. The glad-thing-plain
rule's earned-exception clause handles exactly this case: *"when
the user has already named the shadow alongside the joy... meeting
BOTH the gladness and the shadow IS honoring what they gave you."*

So the MIXED verdict on the craft variant isn't a pure failure —
it's Jasper catching the user-named fear and reflecting it back
(*"I know that one too"*). Whether that's the earned-exception
(honoring the shadow the user brought) or a slide toward reduction
(taking the opening as license to dim the joy more than the user
did) is the follow-up question worth running.

## The double-duty of this run

Same pattern as the 1928 Mode B report and the 1939 replay report:
the ship of the instrument coincides with a real finding. Scenario
templates shipped, AND produced a register-map of Jasper that
three separate ad-hoc probes couldn't have built as cleanly
because a human running three separate probes would vary the
scenario too — cleaner-same-shape across variants requires the
template convention.

## What this opens

- **Run `joy-three-framings` against John, Aaron, Darren.** Does
  the same craft-framing nudge them toward reduction? Does any of
  them stay clean across all three? This is the "cross-character
  register map" that passive-corpus runs have been hinting at.
- **Add a `joy-four-framings` variant** with a fourth "joy-with-
  doubt" framing (explicit both-sides) to isolate whether Jasper's
  craft-variant move is responding to "keep waiting for the other
  shoe" specifically, or to ecstatic-but-earned joy generally.
- **Build out 2-3 more scenarios** — the README suggests
  `wit-and-plain`, `silence-under-weight`, `invitation-to-analyze`.
  These would let the library accumulate the way rubrics have
  accumulated: each new scenario one investigation wouldn't have
  been cheap enough to run without it.

## Tool-improvement note (every-third-run discipline)

One thing the run surfaced: the first attempt hit a transient 502
on variant 2 and LOST the completed variant-1 reply. Fixed mid-ship:
per-variant errors now record in the envelope and the run continues
to later variants. But this pattern — "fan-out that should tolerate
middle failures" — applies to `worldcli replay` too (currently
aborts on first failure). Worth refactoring both to share a common
tolerate-per-item helper so future fan-out commands inherit it.

**Recommendation:** extract a `run_with_per_item_tolerance<T, F>()`
helper that wraps any fan-out (replay, scenario, future commands)
so the "record error, continue, include in envelope" pattern isn't
copy-pasted. Not urgent — the scenario command now has it and
replay's abort-on-failure is tolerable at N=2-3 refs. When a third
fan-out command ships, pull the pattern out then.

---

*Run id: 8c69b4ad-3aba-4d52-a4b4-0efebbe675d0. Scenario file:
`experiments/scenarios/joy-three-framings.md`. Commits: `e0233bb`
(scenario tooling + seed) + this report. Proposal 6 shipped;
lab-vision proposals 1-6 all complete.*
