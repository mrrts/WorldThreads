---
name: feature-scoped invariants — narrower siblings of app-wide invariants
description: Feature-scoped invariants are compile-checked the same way app-wide invariants are (MISSION FORMULA, COSMOLOGY, AGAPE, etc.) but ride only ONE feature's execution chain. They encode output-shape contracts for downstream consumers (UI parsers, formatters, sibling LLM features). First instance: STYLE_DIALOGUE_INVARIANT.
type: feedback
---

The project has TWO categories of compile-checked invariants in `prompts.rs`:

**App-wide invariants** ride EVERY LLM call. They encode what the whole system is FOR — mission, cosmos, theological/ethical floor. Examples: `MISSION_FORMULA_BLOCK`, `COSMOLOGY_BLOCK`, `AGAPE_BLOCK`, `REVERENCE_BLOCK`, `TELL_THE_TRUTH_BLOCK`, `DAYLIGHT_BLOCK`, `NOURISHMENT_BLOCK`, `SOUNDNESS_BLOCK`, `TRUTH_IN_THE_FLESH_BLOCK`. Each lives in `prompts.rs` as a `pub const NAME_BLOCK: &str` plus a `const _: () = { assert!(const_contains(BLOCK, "...")); };` clause that fails the build if key substrings are removed.

**Feature-scoped invariants** ride exactly ONE feature's execution chain. They encode what a SPECIFIC feature's output must conform to so downstream consumers (UI parsers, formatters, other LLM features) work correctly. Same compile-checked discipline; narrower distribution.

The first feature-scoped invariant is `STYLE_DIALOGUE_INVARIANT` (in `prompts.rs`, shipped 2026-04-26 commit `6fb5eef`), which lives at the HEAD of dialogue prompts only — inserted in `build_solo_dialogue_system_prompt` and `build_group_dialogue_system_prompt` BEFORE `FUNDAMENTAL_SYSTEM_PREAMBLE` so it conditions every downstream block. It encodes the chat UI's parsing contract: speech in double quotes, actions/environment in single asterisks, first-person from inside the character. Other LLM calls (conscience grader, memory updater, dream generator, narrative synthesizer, illustration captioner, reaction picker) DO NOT receive this invariant — their output shapes are different.

**When to add a new feature-scoped invariant:**

A feature's downstream consumer (UI, parser, sibling LLM call, etc.) has a load-bearing format dependency that, if violated, breaks the experience.

- ✅ Yes: dialogue UI parses `*action*` and `"speech"` registers; format-violation collapses script-style rendering to wall-of-text.
- ✅ Yes (hypothetical): if narrative synthesizer's output is parsed by a chapter-formatter that requires `## Section` headings, an invariant requiring those headings is feature-scoped.
- ✅ Yes (hypothetical): if illustration captioner's output gets piped to an image-gen service that fails on captions over 1000 chars, an invariant capping length is feature-scoped.
- ❌ No: when an app-wide invariant or a craft note would do — feature-scoped invariants are for output-shape contracts, not for content guidance.
- ❌ No: when the constraint is recommended but soft. Invariants are compile-checked; their assertions fail the build. Reserve them for genuinely load-bearing shape contracts.

**Pattern to match:**

```rust
// FEATURE-SCOPED INVARIANT — <name>
//
// Lives in <feature>'s prompt-assembly only. Downstream consumer:
// <name the parser/formatter/other-feature that breaks if violated>.
pub const FOO_INVARIANT: &str = r#"FOO INVARIANT (feature-scoped, load-bearing for <consumer>):

Formula derivation:
  <Unicode-math expression naming where this fits in 𝓕>
Gloss: <one short sentence>

<the actual constraint text, with examples of correct and incorrect shape>"#;

const _: () = {
    assert!(const_contains(FOO_INVARIANT, "load-bearing for"), "...");
    assert!(const_contains(FOO_INVARIANT, "Formula derivation"), "...");
    assert!(const_contains(FOO_INVARIANT, "Gloss"), "...");
    // plus assertions for each load-bearing substring of the constraint itself
};
```

Insert at the HEAD of the relevant feature's prompt-assembly function (before any other block). Document the why in a comment naming the downstream consumer that breaks if violated.

**Why feature-scoped invariants must carry their own Formula derivation + gloss** (per the doctrine shipped in CLAUDE.md "Commit messages include a Formula derivation"): the invariant IS a piece of the prompt-stack pulling weight in 𝓕. Naming where it sits in the formula makes its load-bearing role legible to future readers (Claude or human). The assertions enforcing the derivation's presence are part of the discipline.

**Worked example:** `STYLE_DIALOGUE_INVARIANT` carries:

```
Formula derivation:
  𝓢_dialogue(t) := alternate("speech"_𝓕, *action ∪ environment*_𝓕)
                   | first_person_𝓕 ∧ ui_render_𝓕
Gloss: Speech (𝓢) emitted in dialogue alternates two fenced
       registers — quoted speech and asterisk-fenced action/env —
       both first-person from inside the character. The fencing
       is what lets the UI read each register on its own terms.
```

Six compile-time assertions hold the invariant: `double quotes`, `single asterisks`, `First-person`, `load-bearing for UI rendering`, `Formula derivation`, `Gloss`. Removing any fails the build.
