# Chiptune density-discipline probe (N=10) — calibrated to observed substrate

**Tier:** sketch (N=2-3 per condition).
**Arc:** Real User Held (chiptune-soundtrack), Phase-4 musicality refinement.
**Instrument:** `worldcli chiptune-probe`, gpt-4o-mini, all cold-seed (no prev_phrase).
**Total cost:** ~$0.012 across 10 probes.
**Companion to:** `reports/2026-04-30-1230-chiptune-musicality-probe.md` (the wider 5-probe + tightening arc that named density-follows-mood as the borderline-but-bears-more-probing axis).

## Why this probe

Phase 4.5 (key-relationship tightening) flagged density-follows-mood as the one continuation-contract leg that didn't bite cleanly. The fix shipped numerical ranges per mood class (heavy ≤8 events; patient 8-14; bright 12-20) but didn't probe whether they actually fired. This probe characterizes that.

## Pass 1 — initial 5 probes against published ranges

Five cold-seed probes, varying momentstamps across heavy/patient/bright mood classes:

| Probe | Stamp shape | Mood result | Total events (incl. rests) | In published range? |
|---|---|---|---|---|
| D1 | Burden·∫unresolved | heavy and grounded | 15 (8n+7r) | ✗ (≤8 cap) |
| D2 | ∂Burden·weight_𝓦 | low and unresolved | 7 (4n+3r) | ✓ |
| D3 | ∫Wisdom·discern·holds | gentle unfolding | 7 (4n+3r) | ✗ (8-14 floor) |
| D4 | Π·γ·Grace | bright and reverent | 13 (9n+4r) | ✓ |
| D5 | ∫Grace·pneuma | light and open | 13 (9n+4r) | ✓ |

3/5 hit. **Two findings surfaced:**

(a) **Metric was ambiguous in the prompt.** "≤8 events" read either as note-count or note+rest-count. D1 was at 8 notes exactly (right at the intended cap) but had 7 rests, totaling 15 "events" — a doctrine-craft bug, not a substrate failure.

(b) **Patient/bright floors didn't bite.** D3 had 4 notes for "gentle unfolding" — well below 8. D4/D5 had 9 notes each for bright moods — below 12.

## Tightening attempt — clarify the metric

Edited prompt to count NOTES only, not rests:

> *"Voicing density follows mood — count **notes only** (rests are silence, not compositional weight). ... heavy → ≤8 notes; patient → 8-14 notes; bright → 12-20 notes."*

## Pass 2 — re-probe + new probes (N=5 more)

| Probe | Stamp | Notes (rests) | Hit notes-only range? |
|---|---|---|---|
| D6 (heavy re) | Burden·∫unresolved | 5 (2r) | ✓ |
| D7 (patient re) | ∫Wisdom | 7 (4r) | ✗ floor |
| D8 (patient re2) | ∫Wisdom | 7 (5r) | ✗ floor |
| D9 (bright re2) | Π·γ·Grace | 12 (after stronger urge) | ✗ floor (was 14 floor) |
| D10 (heavy re2) | Burden·∫unresolved | 8 (after stronger urge) | ✓ |

**Per-mood-class summary across all 10 probes:**

| Mood class | N | Note range observed | Original doctrine | Hit rate |
|---|---|---|---|---|
| heavy/burden | 4 | 4–8 | ≤8 | 4/4 |
| patient/wisdom | 3 | 4–7 | 8–14 (floor 8) | 0/3 |
| bright/grace | 3 | 9–12 | 12–20 (floor 12) | 1/3 |

## Honest reading

**The CAP on heavy holds.** 4/4 cold-seed probes produced 4-8 notes for heavy/burden moods. The substrate naturally produces sparse phrases for heavy moods; the doctrine's cap is consistent with substrate tendency.

**The FLOORS on patient and bright don't bite cold.** Three patient probes produced 4-7 notes; three bright probes produced 9-12. Even after explicit "push past the lower bound" prompt urging, the cold-baseline LLM substrate doesn't reach the doctrine's floors. This is an instance of CLAUDE.md's *"Cold probes measure cold baselines, not capacity"* doctrine — the substrate may produce denser phrases under continuation context (when prev_phrase establishes density and the new phrase is asked to escalate), but cold-seed alone won't reach floors above ~12.

**Apparatus-honest calibration: lower the doctrine ranges to match observed substrate.** Rather than fighting the LLM's prior with stronger commandments, calibrate ranges to what cold-baseline behavior actually produces:

| Mood class | Old range | Calibrated range | Reason |
|---|---|---|---|
| heavy/burden | ≤8 | 4-8 (unchanged cap) | verified 4/4 at sketch tier |
| patient/wisdom | 8-14 | 7-14 | observed lower bound is 4-7; floor lowered to 7 |
| bright/grace | 12-20 | 12-22 | observed lower bound is 9-12; floor held at 12 with "reach higher under continuation" guidance |

Plus: prompt now adds *"Under continuation (prev_phrase present), bright moods following bright should reach the higher end of the range; bright moods escalating from heavy should clearly add notes vs. the previous phrase"* — this puts the floor-discipline in the place where the substrate has more contextual material to push against.

## Tier verdict

- **Heavy density discipline:** sketch tier verified (4/4 cold-seed within cap).
- **Patient density discipline:** uncalibrated → calibrated to observed cold-baseline; sketch-tier-pending verification under continuation context.
- **Bright density discipline:** uncalibrated → calibrated; sketch-tier-pending verification under continuation context.

Continuation-context probes are the natural next sharpening — but Phase 5 (lived-play held-or-not) is the gate that actually matters for the crown. The continuation-density question is borderline-load-bearing for the held-or-not test; if Phase 5 surfaces register-mismatch on bright moods, this comes back into focus.

## Forward-pointing seed

Add `--prev-phrase-file` continuation probes to the chiptune-probe characterization library when (a) Phase 5 surfaces a density-related finding, OR (b) a future arc adds the held-or-not feedback loop and the soundtrack's escalation behavior matters for the held experience.
