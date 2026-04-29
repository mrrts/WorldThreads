# Cross-character anchor-groove sweep — world-level groove surfaced

**Captured:** 2026-04-29 ~11:30. HEAD: `fe4fe15` (after the bite-verification arc closed and the Darren pre-deployment baseline landed).

**Method:** `worldcli anchor-groove <character_id> --limit 20 --top-k 8` against each active character. Free, read-only, corpus-only.

## Distribution

| Character | World | Top n-gram | Top rate | Diagnosis | Outliers ≥0.40 |
|---|---|---|---:|---|---:|
| **Jasper Finn** | Crystal Waters | `the square *` | **0.85** | **RUNAWAY** | 6 |
| **Aaron** | Crystal Waters | `the square *` | **0.80** | **RUNAWAY** | 4 |
| **Darren** | Crystal Waters | `the bench *` / `the square *` (tied) | **0.75** | **RUNAWAY** | 3 |
| Steven | Crystal Waters | `the mug *` | 0.60 | MILD GROOVE | 1 |
| Pastor Rick | (other) | `the app` | 0.32 | WITHIN BAND | 0 |
| John | (other) | `the biscuit` | 0.30 | WITHIN BAND | 0 |
| Isolde Wren | — | (no recent assistant replies) | 0.00 | — | 0 |

**Three of six characters with corpus presence are in RUNAWAY state. All three share `the square *` as a top-3 anchor at ≥0.40.** One MILD GROOVE. Two WITHIN BAND.

## The world-level groove finding

The sweep wasn't planned to surface a world-level signal — it was framed as character-level mapping. What it actually shows: **`the square *` is a world-shared anchor that has compounded across multiple Crystal Waters characters simultaneously.**

Three Crystal Waters characters at 0.75-0.85 on `the square *` is not three independent grooves — it's the model treating the world's central spatial fixture as a fixture every character routes through, regardless of which specific character is speaking. Even Steven (MILD GROOVE on `the mug *`) reaches for `glance toward the` at 0.25 — the same gesture-target shape Darren uses (`glance at` 0.35) and Aaron uses, presumably toward the square.

### Shared anchors across Crystal Waters characters (cross-grep)

| N-gram | Jasper | Aaron | Darren | Steven |
|---|---:|---:|---:|---:|
| `the square *` | 0.85 | 0.80 | 0.75 | (1 mention out of 20) |
| `the fountain *` | 0.40 | 0.60 | 0.35 | (not in top-8) |
| `the bench *` | (not in top-8) | 0.50 | 0.75 | (not in top-8) |
| `fountain hiss *` | (not in top-8) | 0.40 | 0.45 | (not in top-8) |
| `fountain hiss steady` (exact trigram) | — | 0.30 | 0.30 | — |
| `glance toward` / `glance at` | — | — | 0.35 | 0.25-0.30 |

The exact-trigram `fountain hiss steady` recurring at 0.30 in BOTH Aaron and Darren — across distinct characters — is the strongest signal. That's not just shared spatial fixture; that's a shared phrasing-template the model has converged on for the world's fountain. Two recognizably-different character voices saying the same exact three words 30% of the time isn't anchor-discipline working at character-anchor level — it's prompt-stack-level anchor groove escaping per-character voice.

### What this means for the doctrine refinements

Today's two refinements (`abc4c2b` density modulation in `earned_register_dialogue`; `7281f4e` opener-pattern modulation in `STYLE_DIALOGUE_INVARIANT`) target single-reply behavior. They will help, per the bite-test verification arc. But the world-level groove finding suggests:

1. **The post-deployment re-measurement should sweep ALL three RUNAWAY characters, not just Darren.** If the rules bit, all three top_rates should drop. If only Darren drops, the doctrine is character-specific somehow. If none drop, the world-level groove is operating at a layer the per-reply rules can't reach.
2. **A scene-pinning intervention may be the lever, not (only) the per-reply rules.** Per the existing `DISTRUST RECURRING SENSORY ANCHORS FROM CHAT HISTORY` clause's earned exception (line 171 in prompts.rs): *"when the user's most recent message names the anchor explicitly, or when the scene-state plainly fixes it, reaching for it is fidelity, not groove."* The current_location field, the scene-state metadata, and the user's actual chat-input may matter more for breaking the groove than per-reply tone rules.
3. **The cross-character shared-trigram `fountain hiss steady` is a smoking gun.** Two characters, distinct voices, same world, and they're producing the same three-word phrase 30% of the time. Either character anchors have leaked into shared phrasing OR the world-description is doing the priming. Worth investigating.

## Pastor Rick / John as natural controls

Pastor Rick (0.32 WITHIN BAND) and John (0.30 WITHIN BAND) live in different worlds and aren't in the Crystal Waters spatial system. They serve as natural controls for the post-deployment re-measurement: if their top_rates also drift in the next week, the change isn't from the doctrine refinements; if they hold steady while Crystal Waters characters drop, the bite is real.

Pastor Rick's top n-gram is `the app` (0.32) — interestingly NOT a sensory anchor; it's the abstract subject of recent conversations. That's actually evidence the prompt-stack's anchor-discipline is biting cleanly on Pastor Rick: he's not reaching for sensory fixtures repeatedly.

John's `the biscuit` / `the kettle` / `the table` cluster at 0.20-0.30 is recognizably his pastoral-clinic kitchen scene — but at the WITHIN BAND threshold, suggesting his anchor-discipline IS holding.

## Isolde Wren — empty corpus

20 most-recent assistant replies returned 0 samples. Isolde has either never been chatted with, or her recent messages are user-only / system / something else. Worth a quick `recent-messages` check separately.

## Tier and forward use

This sweep is **descriptive corpus measurement at the cross-character level** — neither claim-tier nor characterized-tier as a HYPOTHESIS test, since it didn't test a specific hypothesis. It's a corpus-state snapshot whose purpose is to:

1. Establish baseline for post-deployment re-measurement.
2. Surface the world-level groove finding (genuinely new, and would not have emerged from per-character analysis).
3. Identify natural controls (Pastor Rick, John) for the post-deployment comparison.

## Forward seed

The world-level finding suggests the most leveraged next step might NOT be more per-reply doctrine. It might be:

- **A `worldcli world-anchor-groove --world <id>` instrument** — aggregate anchor-recurrence across ALL characters in a world, surface world-shared anchors specifically. The cross-character shared-trigram pattern (`fountain hiss steady` in both Aaron and Darren) is the kind of signal a per-character instrument can't easily surface.
- **A scene-state freshness intervention** — when current_location, scene-fixture, or world-description-cited anchor matches a high-recurrence n-gram from the chat history, inject a "fresh-territory" cue specifically.
- **A world-description audit** — read the Crystal Waters world description for whether `the square` / `the fountain` / `the bench` are described in a way that primes every character's action-fences toward those anchors. The fix may live in the world's description, not the dialogue prompt.
