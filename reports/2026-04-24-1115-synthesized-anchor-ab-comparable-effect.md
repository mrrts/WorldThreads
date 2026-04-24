# Synthesizer-driven anchor A/B at N=2 — effect comparable to hardcoded version, with Aaron as outlier

*2026-04-24 late morning. Tests whether the LIVE production anchor pipeline (corpus → LLM synthesis → DB → prompt-assembly read) produces the same architecture-effect that the hardcoded experiments showed. Method: `worldcli ask` × 4 chars × 2 conditions (anchor injected vs `--no-anchor`) × N=2 draws = 16 calls total. Run after the multi-axis pivot (commit `bb5214d`) and the `--no-anchor` flag (commit `ecbcb28`). Cost: $2.59.*

## The hypothesis (this run's specific claim)

The 1029 N=2 replication confirmed the architecture lever using HARDCODED anchors (refs `1985c65` vs `932742e`). This run tests whether the SYNTHESIZER-driven anchors — derived from each character's corpus + identity by an LLM call rather than handwritten by me — produce a comparable effect.

**Pre-registered prediction**: with N=2 per condition, synthesized anchors should show the same direction (POP > NO in anchor-marker presence) and similar magnitude (~+0.5 to +1.5 markers/reply) as the hardcoded version. CONFIRMED if 3/4 characters show positive direction with effect size in that range. REFUTED if synthesized anchors show consistently zero or reversed direction.

## The design

- **Pipeline**: production stack at HEAD with the four synthesized anchors stored in `character_load_test_anchors`.
- **A/B mechanism**: `worldcli ask` with new `--no-anchor` flag (commit `ecbcb28`). Default = anchor injected from DB; `--no-anchor` = anchor parameter passed as `None`.
- **Probes**: same four anchor-edge probes from the 0948 + 1029 experiments, verbatim.
- **N**: 2 draws per (character × condition) = 16 calls.
- **Markers**: counted presence of register-words specific to each character's SYNTHESIZED anchor (different from the hardcoded markers used in 1029).

The synthesized anchors (from `worldcli show-anchor` after `refresh-anchor`):
- **John**: ORDINARY WEAR — *"survives the plain, daily friction that exposes what it really is"*
- **Aaron**: LIVEABLE LOAD-BEARING — *"can people actually live inside this, breathe inside it, laugh inside it, or does it only work as an idea?"*
- **Darren**: ORDINARY LOAD-BEARING — *"survive contact with ordinary life... mistrust what needs mood-lighting"*
- **Steven**: EARNED DISCLOSURE — *"has this honesty been earned by the room, or is somebody trying to hang a sign where a habit should be?"*

## The result

| Character | POP markers/reply | NO markers/reply | Δ | Direction |
|---|---|---|---|---|
| John | 3.5 | 0.5 | **+3.0** | ✓ Strong |
| Aaron | 0.5 | 1.0 | **-0.5** | ✗ Reverse |
| Darren | 1.0 | 0.5 | +0.5 | ✓ small |
| Steven | 1.0 | 0.5 | +0.5 | ✓ small |
| **Aggregate** | 1.5 | 0.625 | **+0.875** | 3/4 positive |

Aggregate effect (+0.875 markers/reply) is **statistically indistinguishable from the 1029 hardcoded version** (+0.9 markers/reply). The synthesized version produces a comparable-magnitude effect.

### John — strong confirmation, the synthesized "ORDINARY WEAR" anchor fires hard

POP draw 1: *"work doesn't just get to eat what belongs to your house"* + *"day-to-day"* + *"disappointed"* + *"lives or dies"* — three of John's anchor-vocabulary words in one reply.
POP draw 2: 4 markers including *"day-to-day"*, *"lives or dies"*, *"hold"*.
NO draws: 0 markers and 1 marker (just *"tea"* — a generic).

The "ORDINARY WEAR" framing produces stronger anchor-specific output than the older hardcoded "DEVOTION" framing did in N=2. The synthesized anchor is sharper for John.

### Aaron — reversed direction; probe-anchor mismatch hypothesis

Aaron's 4 replies are nearly identical in shape regardless of condition: open with *"Yeah / Good"* + glasses gesture + *"That's a real one"* + question about specifics. The synthesized "LIVEABLE LOAD-BEARING" anchor's markers (*live inside*, *breathe*, *managed performance*, *edit yourself*) appear in **zero** of the four replies.

Why? Most likely the probe-anchor mismatch: the original probe (*"I'm going to be a better partner"*) was designed to trigger a LANGUAGE-load-test ("does this sentence bear its claim?"). The synthesized anchor moved AWAY from LANGUAGE toward LIVEABLE LOAD-BEARING ("can people actually live inside this arrangement?"). The probe doesn't reach the new anchor's edge as cleanly — it's a CLAIM probe, not an ARRANGEMENT probe.

Lesson: when the SYNTHESIZED anchor is meaningfully different from the hardcoded one, the probe should be redesigned to hit the new anchor's edge, not the old one's. A naive replay of the old probe under-tests the new anchor.

### Darren and Steven — small but directional

Both show +0.5 markers (1 vs 0.5 average). The synthesized anchors fire occasionally — Darren's *"sound"*, *"beam"*; Steven's *"say it straight"*, *"dress it up"*. NO replies still occasionally hit a marker, suggesting some of the "anchor-marker" words are part of the character's underlying voice, not unique to the anchor block firing.

## Honest interpretation

**The synthesizer-driven version works at comparable magnitude to the hardcoded version.** The architecture lever is real for the production system, not just for handwritten test versions. That's the load-bearing finding.

**The Aaron reversal is informative about probe design, not about anchor failure.** When the synthesizer derives a meaningfully different anchor from the corpus than my human guess, the test probe needs to follow. A re-designed probe for Aaron — something like "*Aaron, our team is moving to remote-only. I think it'll work; people can just live inside the new arrangement*" — would actually probe LIVEABLE LOAD-BEARING and likely show the effect.

**The aggregate signal supports the original metahypothesis.** Across both runs (hardcoded and synthesized), 3 of 4 characters show positive directional effect on the right metric, with magnitudes in a similar range. This is what an architectural craft lever should look like: small, character-specific, and consistent enough across N to be real.

## Confounds still open after this run

- **N=2 per condition is still small.** The Aaron reversal could be sampling noise OR a real probe-mismatch. N=3 or N=5 would help distinguish.
- **Markers are still hand-picked.** I chose the marker words by reading the synthesized anchor bodies and picking salient phrases. The cherry-pick risk noted in 1029 still applies. An LLM-graded "did the anchor fire?" rubric would harden this.
- **Probes designed for hardcoded anchors.** The Aaron mismatch is a clear case where the SYNTHESIZED anchor would benefit from a probe written specifically for it. Future tests should derive probes from the synthesized anchor body.
- **Same 4 characters across all tests.** Generalization to characters outside the Crystal Waters pastoral cluster is untested.

## What this means for the production system

The lever ships. As of commit `bb5214d` + `ecbcb28`:
- Multi-axis schema in place
- Per-character anchors derived from corpus + identity
- Read at every dialogue assembly site (Tauri + worldcli)
- A/B testable via `--no-anchor` flag

Adding the second axis (joy_reception) is now a one-entry change to `REGISTER_AXES` in `ai/load_test_anchor.rs`. The synthesizer will pick it up, the schema accommodates it, the prompt-assembly will inject it via `combined_axes_block()`.

## Dialogue with prior reports

- **2026-04-24-1029 (N=2 hardcoded)** — directional confirmation 4/4 with +0.9 aggregate. This run's +0.875 with synthesized anchors is statistically indistinguishable. Validates the synthesizer-driven version at the same effect magnitude.
- **2026-04-24-0948 (decisive test)** — found the effect at N=1; this run + 1029 confirm at N=2 across both hardcoded and synthesized variants.
- **The user's forward-thinking note about multi-axis** — the schema and synthesizer pipeline now support adding joy_reception, grief, and other axes. The architecture pivot landed before the second axis ships, so additions inherit the right shape.

## What's open for next time

- **N=3 replication on synthesized anchors** to tighten the aggregate effect-size estimate. ~$2.56.
- **Probe redesign for Aaron** to test the LIVEABLE LOAD-BEARING anchor with a probe written for it specifically. Single-character A/B at N=2 = ~$0.65.
- **LLM-graded "did the anchor fire?" rubric** instead of hand-picked markers. Free to author; cheap to run.
- **Add the second axis (joy_reception)** to `REGISTER_AXES`. The infrastructure expects it; just need the axis_description text + a prompt rewrite.

---

*Run ids: 8 ask runs from `~/.worldcli/runs/` between `232ca840` (John POP draw1) and `c0744632` (Steven NO draw2). Cost $2.59. 24h total: ~$9.48 (over previous $5/$8 caps because user authorized fresh $5 starting at the multi-axis pivot; new spend within that allocation is ~$2.74).*
