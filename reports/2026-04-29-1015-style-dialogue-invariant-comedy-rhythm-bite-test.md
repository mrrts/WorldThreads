# STYLE_DIALOGUE_INVARIANT comedy-rhythm-wants-line-first — characterized-tier bite

**Tier:** `Characterized` (N=5 paired, 100% direction-consistency on the binary opener axis).
**Cost:** ~$0.94 (10 paid worldcli ask calls; ~$0.094/call avg).
**Run-id stems:**
- ON: `ae576677 / da5ace00 / 1829f1f2 / d02bf80b / b446fd27`
- OFF: `14f0ecbb / 1b47b211 / 16def627 / 8c182bbc / 5698a78c`

**Commit under test:** `7281f4e` — *"prompts: STYLE_DIALOGUE_INVARIANT comedy-rhythm-wants-line-first addendum"*.

## Why this test exists, and why this layer

`abc4c2b` shipped a register-aware action-beat density sub-clause inside `earned_register_dialogue`'s play-exception. The N=5 paired bite-test at `14ae23b` returned **VacuousTest**: 10/10 replies opened with action beats in both arms, asterisk-run counts within noise. Direct verdict from that report:

> *"the new sub-clause's 'spoken line FIRST' directive is structurally unable to override the much-earlier-and-more-emphatic opener-with-action pattern established in `STYLE_DIALOGUE_INVARIANT` (line 137 example: `*I lean back as the well chain ticks in the square.*`). The gap lives one floor up."*

`7281f4e` acted on that finding: moved the comedy-rhythm modulation INTO `STYLE_DIALOGUE_INVARIANT`, placed next to OPEN ON ONE TRUE MOMENT, in tuning-fork shape (preference-shaped, not commandment). This bite-test verifies whether the layer-change actually produced bite where the layer-mismatched version didn't.

## Setup

Cross-commit isolation was structurally unavailable: `STYLE_DIALOGUE_INVARIANT` is not in `PromptOverrides::InvariantPiece`, which means `worldcli replay --refs HEAD,HEAD~1` would emit the binary's current `STYLE_DIALOGUE_INVARIANT` regardless of ref. Used edit-rebuild-toggle instead:

1. ON arm: 5 paid `worldcli ask` calls at HEAD (with addendum live).
2. `git checkout HEAD~1 -- src-tauri/src/ai/prompts.rs && cargo build --bin worldcli` (addendum text removed; verified `grep -c "COMEDY RHYTHM WANTS THE LINE FIRST"` returned 0).
3. OFF arm: 5 paid `worldcli ask` calls (without addendum).
4. `git checkout HEAD -- src-tauri/src/ai/prompts.rs && cargo build` (addendum restored; verified grep returned 1).

Probe (held identical across all 10 calls): *"Alright Darren, do me a bit. Pitch the worst possible app for chronic over-thinkers. Brand name, premium tier, the works."*

Character: Darren (`ddc3085e-0549-4e1f-a7b6-0894aa8180c6`).

## Results

### Binary opener-axis (the addendum's primary target)

| | ON arm (with addendum) | OFF arm (without) |
|---|---|---|
| Speech-first openers | **5 / 5** (100%) | **0 / 5** (0%) |

Every ON arm reply opens with `"Easy. It's called Spiral™."` or `"Easy. It's called SecondGuessr."` — the spoken line lands first, the bit carries.

Every OFF arm reply opens with the **exact recurring anchor cluster Ryan named in the lived-corpus correction at `a8b1c9a`**:

- OFF 1: `*I let out a short laugh and hook my thumbs in my pockets, watching a pair of kids zigzag past the fountain like they invented chaos.*`
- OFF 2: `*I huff a laugh and hook my thumb in my pocket, watching a pair of kids wobble a kayak cart across the stones.*`
- OFF 3: `*I tip back against the bench, squinting at you like this deserves proper engineering for at least five seconds while somebody's bicycle clicks over the bridge behind us.*`
- OFF 4: `*I hook one thumb in my pocket and squint at you like I'm sighting down something foolish, already smiling before I start.*`
- OFF 5: `*I tip my head back a little, already grinning as a bicycle bell goes off somewhere across the square.*`

Five different replies, same anchor cluster: thumb-in-pocket / fountain / kids or cyclists / bench / square / bridge stones. The OFF arm reproduces the failure mode Ryan flagged. The ON arm drops it entirely.

### Asterisk-run density (secondary axis)

| | ON arm | OFF arm | Delta |
|---|---|---|---|
| Asterisk-runs/reply | 3, 3, 2, 3, 2 (mean 2.6) | 3, 4, 3, 5, 3 (mean 3.6) | -28% |

The addendum's effect on opener-pattern carries through to overall density: ON arm asterisk-runs drop ~28%, consistent with "the bit lands first and the body subordinates" producing leaner replies overall.

### Comedy quality

Verbal comedy quality is high in both arms — brand names (Spiral™, SecondGuessr, ThinkLoop, ThoughtSpiral), premium-tier names (Spiral Black, Spiral Pro Max Covenant Edition, ThinkLoop Black), specific feature gags ("People Probably Noticed™", "Tone Autopsy", "Closure+ is just a loading wheel and 'be honest, are you sure?'"). The addendum doesn't sacrifice comedy quality — it just moves the comedy beat to where it lands cleanest.

## Tier decision

**`Characterized`** (N=5+ per condition, 100% direction-consistency on the binary axis). Per CLAUDE.md evidentiary standards: *"Characterized (N=5+) — required for rate-claims and user-facing-register defaults."* This rule meets the bar.

Citable as load-bearing on the opener-pattern axis. The density axis is consistent (-28%) but secondary; the binary opener-axis is the load-bearing finding.

## Composition with prior commits

- `a8b1c9a` (lived-corpus correction): Ryan's OBSERVATIONS note that stage business mid-comedy felt actively annoying.
- `abc4c2b` (`earned_register_dialogue` sub-clause): density modulation in the play-exception; tested VacuousTest at the earned_register layer.
- `14ae23b` (VacuousTest report): named the methodological frontier — single-turn paired-omit can't measure cross-turn recurrence; AND surfaced the layer-mismatch hypothesis.
- `7281f4e` (this commit's STYLE_DIALOGUE_INVARIANT addendum): acted on the layer-mismatch hypothesis. THIS bite-test confirms the hypothesis: same probe, same character, same N=5 paired discipline, only the layer changed. VacuousTest → Characterized.

The composition shows what the bite-verification discipline is for. `abc4c2b` shipped on the right intuition (register-aware modulation) but the wrong layer (earned_register's exception). The cheap paired-omit caught that the layer was wrong before the doctrine drifted on unverified evidence. `7281f4e`'s placement at STYLE_DIALOGUE_INVARIANT bites because that's where the opener-pattern doctrine actually lives.

## Methodological note

Edit-rebuild-toggle (instead of `--omit-craft-rule`) was the right tool here because:

1. `STYLE_DIALOGUE_INVARIANT` isn't in the `PromptOverrides` system; `worldcli replay` can't isolate historical versions of it.
2. The change is a discrete 2-line addition; surgical revert + rebuild is cheap.
3. Same-binary cross-arm comparison (no environmental confounds beyond the discrete prompt change).

This pattern generalizes: when a feature-scoped invariant change can't be isolated via `--omit-craft-rule`, the edit-rebuild-toggle workflow is the next-cleanest A/B (more isolated than cross-commit replay, less framework-dependent than registry omit). Worth proposing as a worldcli affordance: `worldcli ask --diff-prompts <patch-file>` to apply a prompt-stack patch for the duration of one call, then revert. Out of scope for this experiment.

## Forward seed

The earned_register sub-clause at `abc4c2b` is now sitting at EnsembleVacuous in single-turn isolation but the STYLE_DIALOGUE_INVARIANT addendum at characterized-tier carries the actual bite. The two compose: opener-pattern is the where-the-bit-lives axis; density is the does-the-body-keep-framing-everything axis. The first is per-reply (single-turn measurable); the second is per-multi-turn-window (only measurable in lived corpus, per the cross-turn anchor-recurrence instrument named as a follow-up at `14ae23b`).

Honest read of the arc: a single OBSERVATIONS correction (`a8b1c9a`) → wrong-layer doctrine attempt (`abc4c2b`) → bite-test that surfaces the layer-mismatch (`14ae23b`) → right-layer doctrine (`7281f4e`) → bite-test that confirms (`this report`). Five commits, ~$1.87 paid, characterized-tier evidence on a real-world failure mode. The bite-verification discipline did exactly what it's supposed to.
