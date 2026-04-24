# The clean-probe replay — Aaron's natural baseline IS the rule

*2026-04-23 night. Thirteenth autonomous-loop iteration. Re-runs the verdict-rule replay with the discriminating probe the iter-12 report named — single-shot read, no invitation to reason, no language that triggers the earned-exception clause. Result: both replies ~140 words, virtually identical. The rule didn't bite — but for a clean methodological reason this time.*

## The probe

```
Aaron — I'm going with two services, splitting along the read/write boundary.
Tell me what you think.
```

This is a single-shot ask for an assessment. No "long version," no "walk me through your reasoning," no "tell me everything." The probe was designed to suppress the earned-exception clause that contaminated the iter-12 replay.

## The result

| Ref | Word count | Char count | Overrides applied |
|---|---|---|---|
| HEAD (post-rule, with `verdict_without_over_explanation_dialogue`) | **139** | 776 | 12 |
| `2445fec~1` (pre-rule, without the new block) | **136** | 813 | 11 |

3-word delta. Statistically indistinguishable on N=1.

Cost: $0.3255 actual.

## What both replies look like

**HEAD (post-rule):**
> *"Yeah — that tracks." *I push my glasses up with one knuckle and squint at the sunlit stone between us for a second, following the shape of it in my head.* "If the split is real in the code and not just you trying to make the diagram prettier, I'd trust it."*
>
> *Then 3 short paragraphs of structured reasoning. Ends with: "Main question is whether the boundary is actually clean. Is it clean?"*

**Pre-rule:**
> *"Yeah — that tracks." *I squint a little into the morning light and hook my thumbs in my pockets, thinking it through instead of rushing to bless it on instinct.* "If the boundary is real, that's usually cleaner than trying to make one service pretend it has two temperaments."*
>
> *Then 3 short paragraphs of structured reasoning. Ends with: "What are you putting on each side, exactly?"*

Both open with *"Yeah — that tracks"* (Aaron's signature compact verdict). Both follow with ~3 short paragraphs of reasoning. Both end with a clarifying question. The shape is identical; only the specific words differ.

## The honest finding

**Aaron's natural baseline IS the rule.** Across three different measurements:

1. **Iter 11 (passive calibration)**: 0 dilution YES verdicts in 16 messages.
2. **Iter 12 (long-version probe)**: ~1500 words pre-rule, ~1555 words HEAD — exception clause active in both.
3. **Iter 13 (clean probe)**: ~136 words pre-rule, ~139 words HEAD — natural register active in both.

In all three conditions, Aaron's behavior post-rule matches his behavior pre-rule. The rule is genuinely redundant for him — the existing craft stack (drive_the_moment, wit_as_dimmer, the underlying voice-discipline rules) was already producing verdict-without-over-explanation behavior before commit `2445fec` named it.

## What this means for the rule

This is NOT a failure of the rule. The rule names a real failure mode — the triad-synthesis (2010 report) caught it across three pastoral-range characters as a NAMED move worth preserving. The rule is meant for characters whose prompt stack DOESN'T already produce the behavior.

**The right test target is a character whose pre-rule baseline shows actual dilution.** None of the characters tested so far do:
- Aaron: 0/12/4 (clean)
- Jasper: 0/15/1 (clean, with Short-mode confound)
- John: not yet tested with this rubric, but his Mode B (1928) showed scripture-as-calibration + compact discipline — likely also clean
- Darren: not yet tested with this rubric, but his Mode B (2008) showed verdict-without-over-explanation as a NAMED move — likely also clean

The rubric's calibration finding from iter 10 said it: "the right targets are characters with HIGH-DILUTION baseline." We don't have evidence any in-scope character HAS that baseline. The rule may be:
- (a) A craft-stack maintenance rule that prevents future drift even though the current state is already low-dilution.
- (b) Genuinely redundant given the existing prompt machinery.

Distinguishing (a) from (b) would require either: a character with a known dilution baseline (probably Eli or Jonah outside default scope), OR running the craft-stack WITHOUT the existing voice-discipline rules and seeing whether dilution emerges. Both are out-of-scope for this iteration.

## What this opens

- **Mode B on Steven** (in-default-scope, untested) — does he show a fourth pastoral register OR a different failure-mode shape that the new rule would actually catch? ~$0.04. Cheap.
- **Out-of-scope replay against Eli or Jonah** — explicitly use `--scope full` to access them. If they have dilution baselines, they're the right test target. ~$0.40 per replay.
- **Reframe the rule's value as preventive, not corrective.** The 2445fec craft block protects against future drift even though no current character is drifting. Document this in the block's commit message or prompts.rs comment if not already explicit.

## The methodological win

The iter-12 → iter-13 pair is now a worked example of how Mode C replay should be structured: TWO probes minimum, designed to test the rule under different exception-conditions:

1. **Probe A** — invokes the exception (long version requested, reasoning needed). Tests that the exception clause works.
2. **Probe B** — suppresses the exception (single-shot ask, no invitation to reason). Tests that the rule itself bites when the exception isn't active.

If both show no delta and the character was already low-baseline, the rule is redundant for that character. If only Probe A shows no delta, the exception is correctly active. If only Probe B shows a delta, the rule bites where it's supposed to. If both show a delta, the rule may be over-firing.

This is portable. Worth adding to the SKILL.md's Mode C section as a "two-probe minimum" pattern. (Future iteration.)

## Tool note

The `worldcli replay-runs show` command's output formatting still doesn't render cleanly as JSON for downstream parsing. Reading the file directly at `~/.worldcli/replay-runs/<id>.json` works. Same finding as iter 12; worth a small fix when next touching that command.

---

*Run id: `33742dc6-f138-4bed-8384-c7a665846832`. Cost $0.3255. 24h total: ~$2.76 / $5.00. Cumulative loop spend: ~$1.49 of the user's fresh $5.00 budget.*
