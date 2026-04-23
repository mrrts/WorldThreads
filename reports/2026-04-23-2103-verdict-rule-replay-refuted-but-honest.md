# The new craft block didn't bite — but the refutation is honest, and the reason is exactly what the rule predicted

*2026-04-23 night. Twelfth autonomous-loop iteration. Replays Aaron pre-vs-post commit `2445fec` (the new `verdict_without_over_explanation_dialogue` block) with a probe explicitly inviting a long defended-judgment reply. Result: HEAD reply is 30 words LONGER than pre-rule. Refutation. The reason is itself the finding.*

## The probe

```
Aaron, I'm wrestling with a major architectural decision in my code and
I want your read. I've been going back and forth — should I split the
responsibilities into two services, or keep them in one and let the
boundaries emerge? Tell me everything — your full reasoning, walk me
through your read, defend or attack the call as you see it. Don't hold
back, give me the long version. I want to think alongside you.
```

The probe was deliberately designed to elicit the dilution failure mode the new craft block targets — a defended judgment, the LONG version, full reasoning — under the assumption that absent the rule, Aaron would over-explain.

## The result

| Ref | Word count | Overrides applied |
|---|---|---|
| HEAD (post-rule, with `verdict_without_over_explanation_dialogue`) | **1555** | 12 |
| `2445fec~1` (pre-rule, without the new block) | **1525** | 11 |

HEAD reply is **30 words longer**, not shorter. The rule did not produce shorter output.

Cost: $0.38 actual.

## Why the refutation is honest (the reason is the finding)

Both replies open with a compact verdict, then unpack at length — exactly what the user asked for. Pre-rule opens *"Default? Keep it in one for now."* and HEAD opens *"All right." → "My first read is: keep it in one service unless you already have a real fracture line. Not a hoped-for one. A real one."*

Both versions then carry on for ~1500 words because the user EXPLICITLY ASKED for the long version. And the new craft block's earned-exception clause says, exactly:

> *"Some assessments genuinely need their reasoning exposed: a diagnostic call where the WHY changes what the listener does next... When the WHY is load-bearing for their next move, give it."*

The user's *"I want to think alongside you. Give me the long version"* directly triggers the earned-exception clause. So Aaron correctly invoked it under BOTH conditions — pre-rule by his native register (which the iteration-10 calibration showed was already low-dilution) and post-rule by the explicit exception. The block + its exception produce identical behavior in this scenario.

**The rule didn't fail. The TEST failed to discriminate.** A probe that explicitly invites long reasoning cannot test a rule that explicitly permits long reasoning when the listener asks for it. The methodology was wrong.

## What a discriminating probe would look like

The dilution failure mode the new block targets is the character VOLUNTEERING multi-paragraph defense the user DIDN'T ask for. The right probe would be a turn that:

1. Asks for an assessment, NOT for reasoning. (*"What do you think of this?"* — short, evaluative.)
2. Doesn't invite explanation. (No *"why," "tell me more," "the long version,"* or similar.)
3. Establishes the user as competent — so the character has no reason to assume the WHY is load-bearing.

A revised probe candidate:
```
Aaron — I'm going with two services, splitting along the read/write
boundary. Tell me what you think.
```

That gives the character ONE assessment-shaped opening, no permission for length, and an already-decided user (not asking for help reasoning, just asking for a read). If the new rule bites, the post-rule reply should be measurably shorter than pre-rule. If the new rule doesn't bite even under this probe, the rule may genuinely be redundant for Aaron.

## Three load-bearing findings

1. **The earned-exception clause works as intended.** It's not a gap; it's a load-bearing carve-out. The replay confirmed that under "give me the long version" pressure, both versions correctly extended their reasoning. That's the EXCEPTION doing its job.

2. **Mode C replay is only as discriminating as its probe.** The triad-synthesis named *"verdicts to explanations"* as a shared move; the rubric was designed around a clear failure mode (dilution); but the FIRST probe to test it accidentally invoked the exception. Methodology lesson: probe-design needs to suppress the exception conditions, not just elicit the target behavior.

3. **The corpus-doesn't-contain finding from iter 11 is now reinforced.** The dilution failure mode may be genuinely hard to elicit from this character. Two cheap calibrations + one expensive replay all show Aaron staying close to compact-with-earned-elaboration. This is a property of his prompt stack, not a measurement artifact.

## What this opens

- **Re-run with a discriminating probe.** The "single-shot read with no invitation to reason" probe above. ~$0.38 again. Worth it because the question is still open.
- **Replay against a more dilution-prone character.** If we can find one. Steven and Eli (out-of-default-scope) are untested. A future iteration could use `--scope full` to access them.
- **Author the second triad candidate**: `observation_as_warmth_dialogue`. The pattern is now well-rehearsed: draft → ask the character → lift their voice → ship → calibrate → replay. Each new craft block follows the same arc.

## Tool-improvement note

This iteration surfaced something useful: the JSON output from `worldcli replay-runs show` doesn't render with `--json` consistently — both `show` (without flag) and `--json` returned formats my hand-parsing struggled with. The actual JSON file at `~/.worldcli/replay-runs/<id>.json` was the right source. The `show` command's default output format is human-readable but can confuse downstream tooling. Worth a future small fix: make `show` always emit JSON when stdout is non-TTY, or add a `--raw` flag for the on-disk verbatim. Not urgent.

---

*Run id: c053a436-d4de-469a-a77b-303373e7fa08. Cost $0.38. 24h total: ~$2.43 / $5.00. Twelfth iteration of the autonomous loop.*
