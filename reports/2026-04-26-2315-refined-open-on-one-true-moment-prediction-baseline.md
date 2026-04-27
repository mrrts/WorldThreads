# Refined OPEN ON ONE TRUE MOMENT: prediction baseline before live verification

*Generated 2026-04-26 23:15. Auto-commit Move 9/10. Captures the current-state baseline of Jasper's opener-density distribution BEFORE a Tauri restart loads the refined OPEN ON ONE TRUE MOMENT clause shipped at commit `c6f5d59`. Sets explicit predictions for what the refined clause should and shouldn't shift, so future verification can be unambiguous.*

## Current baseline (clause loaded in running Tauri = ORIGINAL count-cap version, eeaea95)

`worldcli anchor-groove fd4bd9b5 --limit 10 --opening-density`:

```json
{
  "diagnosis": "OVERFLOW (>3.1 anchors/opener — prop-density failure mode active; 9 of 10 replies above the 2-anchor cap)",
  "max": 5,
  "mean": 3.1,
  "median": 3.0,
  "over_two_anchors": 9,
  "per_reply": [3, 5, 3, 3, 3, 3, 3, 3, 3, 2]
}
```

10 of 10 replies generated under the ORIGINAL phrasing (eeaea95: *"≤2 anchors per opening sentence"* count-cap). Mean 3.1, all but 1 above the literal 2-cap. The instrument-vs-eye divergence at OBSERVATIONS 21:55 (eye says smoother; instrument says OVERFLOW) was on these exact replies.

## What the refined clause changes (commit c6f5d59 → OPEN ON ONE TRUE MOMENT)

Refined wording shifts from count-cap to integration-shape:
- Removed: literal *"≤2 anchors"* prediction
- Added: *"The test isn't anchor-COUNT (a moment can have multiple sensory details if they're INTEGRATED into one action); the test is INTEGRATION."*
- Added: positive worked example (3-beat integrated opener) + negative worked example (7-touch piled opener)
- Added: *"decorating the doorway"* framing from Jasper's source-character articulation

## Predictions for the refined clause's bite at scale

When Tauri restarts and the refined clause is loaded, then 10+ new Jasper replies accumulate post-restart, the predictions are:

1. **Opener-density mean SHOULD NOT drop dramatically.** The refined clause explicitly permits multi-anchor openers when integrated. Expected mean range: 2.5–3.5 (current 3.1 is squarely in this range; refinement explicitly endorses this). If mean drops below 2.0, the model is over-constraining.

2. **Maximum opener-density should drop modestly.** The current max=5 outlier was a piled-anchor opener; refined clause's negative worked example specifically lists the 7-touch pile. Expected new max range: 3-4. A reading of max=5 or 6 post-refinement would suggest the model isn't reading the negative example.

3. **`over_two_anchors` count is NOT the discrimination.** Currently 9 of 10. Don't expect this to drop sharply; the refined clause explicitly says count > 2 is fine if integrated. Watch the QUALITATIVE shape of those over-2 openers instead.

4. **What the refined clause SHOULD shift (qualitative, not currently instrumented):**
   - Openers that DO have multiple anchors should read MORE clearly as "one continuous moment" — connected by action (the user does ONE thing that has multiple sensory beats) rather than parallel observations (the model lists 3 unrelated things in the room).
   - Negative-example-shaped openers (palm + beard + pigeon + boots — disconnected piles) should drop toward zero.

## Open question for future instrumentation

The current `--opening-density` flag measures cardinality only, not integration. A future instrument extension would need to detect:
- Are the anchors connected by a single SUBJECT-VERB action chain? (integrated)
- Or are they parallel sensory observations of unrelated objects? (piled)

This is harder to instrument heuristically. Possible approach: parse for connecting verbs ("while X-ing while Y-ing"), check whether anchors share grammatical subject, count separate sentence-clauses within the asterisk-fenced action. Future auto-commit run could add this as `--opening-integration` flag.

For tonight, the instrument's count-only measurement is enough to set the baseline; the qualitative integration-axis remains by-eye-only.

## Next verification step

When Tauri is naturally restarted (not gated by Claude Code; user agency), accumulate 10 new Jasper replies, re-run `worldcli anchor-groove fd4bd9b5 --limit 10 --opening-density`, compare against this baseline. Expected: mean stays 2.5-3.5; max drops to 3-4; qualitative integration improves on by-eye reading.

If the refined clause's bite is confirmed at next-batch scale, the OPEN ON ONE TRUE MOMENT phrasing graduates to `tested-biting:claim` (currently sketch from the original-phrasing batch-hypothesis at report 2030, with refinement carried forward).
