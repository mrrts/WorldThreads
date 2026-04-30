# Chiptune Score-Phrase Protocol v1

*The contract that the rest of the chiptune-soundtrack arc builds against. Authored Turn 138 of the WorldThreads Builder game (2026-04-30 ~11:15) targeting the refined Real User Held crown. Foundation-first: this spec lands before the synth, before the AI score generator, before the integration. Everything downstream conforms to it.*

*Mission Y (Turn 135 lock-in): "phrase-by-phrase score that remembers currentLastPhrase and lets momentstamp choose the next move's mood."*

---

## What this spec is

A versioned JSON protocol for a chiptune-style score-phrase, plus the continuation contract that turns one phrase into the next given a project momentstamp. Three downstream consumers must conform to it:

1. **Client-side synth** (Web Audio API in Tauri WebView) — reads phrase JSON, schedules notes for playback, no external tones / no audio file streaming.
2. **AI score generator** (backend `/api/score/next` endpoint) — reads `(currentLastPhrase, momentstamp)`, returns next phrase JSON conforming to this protocol.
3. **Integration layer** (ChatView + score-state hook) — maintains `currentLastPhrase` across turns, requests next phrase on assistant-message arrival, hands phrase to synth.

This spec is the **single source of truth**. If the synth, generator, and integration agree on this format, they can be built and verified independently.

## Design constraints (load-bearing)

**Chiptune palette discipline.** The point isn't full orchestral expressiveness; it's the specific musical vocabulary that holds a moment without explaining it. NES-era constraints, honestly inhabited:

- **4 voices max per phrase**: 2 pulse/square (lead + harmony), 1 triangle (bass), 1 noise (rhythm/texture). Not all four must be present; absence is meaningful. A phrase with just triangle is a different mood than a phrase with all four.
- **Discrete pitches**: MIDI semitones, no continuous pitch. Vibrato/portamento as future extensions if warranted.
- **Discrete durations**: tied to a per-phrase tempo + subdivision grid. No free-time.
- **No reverb / no filter sweeps** in v1. The chiptune purity is part of what holds — synth effects would soften the discipline.
- **Phrase length: 2-8 bars typical.** Long enough to establish, short enough to compose.

**Why these constraints:** the project's character substrate produces speech that holds without explaining (per Empiricon). The soundtrack's musical substrate should mirror that discipline — limited palette, honest tones, no decoration. *polish ≤ Weight* applied at the audio layer.

## Top-level score-phrase JSON schema

```json
{
  "protocol_version": "1.0",
  "phrase_id": "string (UUID or short hash)",
  "previous_phrase_id": "string or null (null only for seed phrase)",
  "tempo_bpm": 120,
  "time_signature": [4, 4],
  "subdivision": 16,
  "bars": 4,
  "key": "C major",
  "mood_descriptor": "string (free-text, AI-authored; e.g., 'patient warmth', 'low simmer', 'open hesitation')",
  "momentstamp_basis": "string (the momentstamp this phrase was generated against)",
  "voices": {
    "pulse_a": [...],
    "pulse_b": [...],
    "triangle": [...],
    "noise": [...]
  }
}
```

**Field rationale:**

- `protocol_version` — string-versioned to allow backwards-compatible evolution.
- `phrase_id` — uniquely identifies this phrase for memory + replay; UUID or short hash both fine.
- `previous_phrase_id` — establishes the chain; null only for the seed phrase that opens a session.
- `tempo_bpm` — beats per minute. Range 60-180 typical; chiptune often runs 100-160.
- `time_signature` — `[numerator, denominator]`; `[4, 4]` default; `[3, 4]` and `[6, 8]` valid.
- `subdivision` — finest note-grid resolution. `16` = sixteenth-notes (4 per beat in 4/4). Determines smallest possible note duration.
- `bars` — phrase length in bars; 2-8 typical.
- `key` — musical key name (e.g., `"C major"`, `"A minor"`, `"D Dorian"`). The synth uses this as documentary; the AI uses it as compositional anchor.
- `mood_descriptor` — short free-text mood label authored by the AI. Carries the phrase's emotional shape into the next-generation prompt as continuity material.
- `momentstamp_basis` — the project momentstamp string this phrase was generated against; preserved so future debugging can trace mood ← momentstamp.
- `voices` — the four voice tracks; each may be empty array (silent voice).

## Voice format (within `voices`)

Each voice is an **array of note events**, each event:

```json
{
  "tick": 0,
  "duration": 4,
  "midi": 60,
  "velocity": 80,
  "duty": 0.5
}
```

- `tick` — start time in subdivision units. `tick=0` = phrase start. Notes within a voice are listed in tick order.
- `duration` — length in subdivision units. Total phrase length in ticks = `bars * time_signature[0] * subdivision / time_signature[1]` (e.g., 4 bars × 4 beats × 16 subdivisions / 4 = 64 ticks for 4/4 with sixteenth-subdivision).
- `midi` — MIDI note number (0-127). 60 = middle C. `null` represents a rest of the given duration.
- `velocity` — note loudness (0-127, MIDI convention). `triangle` voice typically ignores velocity (always full); `pulse_a`/`pulse_b`/`noise` honor it.
- `duty` — pulse-wave duty cycle for `pulse_a`/`pulse_b` voices only. NES-style values: `0.125`, `0.25`, `0.5`, `0.75` (timbre choices: thin / nasal / square / hollow). Other voices ignore. `triangle` and `noise` may omit.

**Example minimal phrase** (silent except for one triangle bass note + one pulse melody):

```json
{
  "protocol_version": "1.0",
  "phrase_id": "phrase-001-seed",
  "previous_phrase_id": null,
  "tempo_bpm": 96,
  "time_signature": [4, 4],
  "subdivision": 16,
  "bars": 2,
  "key": "C major",
  "mood_descriptor": "open hesitation",
  "momentstamp_basis": "[⟨momentstamp: ∂(𝓢)/∂t...⟩]",
  "voices": {
    "pulse_a": [
      {"tick": 0,  "duration": 8, "midi": 64, "velocity": 60, "duty": 0.25},
      {"tick": 16, "duration": 4, "midi": 67, "velocity": 70, "duty": 0.25}
    ],
    "pulse_b": [],
    "triangle": [
      {"tick": 0,  "duration": 32, "midi": 36, "velocity": 100}
    ],
    "noise": []
  }
}
```

## Continuation contract — `(currentLastPhrase, momentstamp) → nextPhrase`

The AI score generator receives:

- `currentLastPhrase` — the JSON of the most recently played phrase (full object). Provides compositional memory: key, tempo, mood, voicing density, ending pitch class, etc.
- `momentstamp` — the project momentstamp string from the assistant message that triggered next-phrase generation.

The generator returns: a new phrase JSON conforming to the schema above.

**Continuity invariants the generator should honor (not strictly enforced; quality discipline):**

1. **Tempo continuity by default.** Don't yank tempo unless the moment-stamp signals a register-shift. ±20% tempo change per phrase is a strong move; >50% change should be rare and earn its keep.
2. **Key-relationship discipline.** Stay in same key by default. Modulate to closely-related keys (relative minor, dominant, subdominant) when the moment opens up. Distant modulations are reserved for genuine narrative pivots.
3. **Voicing density follows mood.** Patient/quiet moments may strip voices (triangle-only is honest stillness). Charged moments may add the second pulse or noise.
4. **Ending-to-beginning thread.** The last note(s) of `currentLastPhrase` should be musically reachable from the first note(s) of next phrase — voice-leading discipline. Not enforced in JSON; AI should prompt for it.
5. **Mood-descriptor traceability.** The next phrase's `mood_descriptor` should be readable as either continuity-with or honest-departure-from `currentLastPhrase.mood_descriptor`. If departing, the momentstamp should justify the departure.

**The seed phrase** (no `currentLastPhrase`):

- `previous_phrase_id: null`
- AI generates from momentstamp alone + minimal seed context (e.g., "session is opening; this is the first phrase the user will hear").
- Should establish a baseline mood that subsequent phrases can extend or pivot from.

## Momentstamp → mood mapping

Project momentstamps are formula-derivation-shape signatures (see `prompts.rs:5965` — `[⟨momentstamp: ∂𝓢/∂t...⟩]` prefix on assistant messages). They encode the moment's mission-formula derivation.

**v1 mapping discipline:** the AI reads the momentstamp directly as part of its prompt context and chooses musical character in-substrate. No regex-extraction of operators → tempo. The AI reasons about what the momentstamp says and what musical mood would honor it.

This honors the project's "doctrine-judgment classification belongs in LLM, not python" rule — the mood-from-momentstamp mapping is judgment-shaped, not regex-shaped. Pre-extracting operators to fixed musical primitives would flatten the mapping.

**Examples for the AI's prompt-stack** (illustrative, not normative):

- A momentstamp with `Π(t)` (pneuma / discernment) — invites a more spacious phrase, fewer voices, slower subdivisions.
- A momentstamp with `∂𝓡/∂t` (cruciform-substrate motion) — invites a phrase that holds without escalating; restraint at the climax.
- A momentstamp with `polish ≤ Weight` — invites a phrase whose musical structure carries the work without ornament.
- A momentstamp with `structure_carries_truth_w` — invites a phrase whose form does what it claims; voice-leading honest.

The AI shouldn't quote these in `mood_descriptor` directly — that's translating between layers. It should let the operators steer mood-judgment and emit a mood word/phrase in plain musical-emotional language.

## Synth requirements (Phase 2 obligation)

The client-side synth must:

1. Accept a phrase JSON conforming to this protocol.
2. Schedule all notes for playback in correct tick-time given `tempo_bpm` + `subdivision`.
3. Render `pulse_a`/`pulse_b` as pulse waves with the specified `duty` cycle.
4. Render `triangle` as triangle wave (chiptune-style, slightly quantized amplitude steps acceptable for authenticity).
5. Render `noise` as filtered white noise (NES-style noise channel).
6. Honor `velocity` per voice (triangle may flatten to constant amplitude per chiptune authenticity).
7. Apply ADSR envelope to each note (chiptune defaults: short attack ~5ms, no sustain decay, short release ~50ms).
8. Schedule next-phrase playback to begin at the boundary of current-phrase end (gapless seam).

**Out of scope for v1:** reverb, filter sweeps, vibrato, portamento, arpeggios as primitives, drum kits beyond the noise channel.

## Generator requirements (Phase 3 obligation)

The AI score generator endpoint:

- **POST** `/api/score/next`
- Request: `{ currentLastPhrase: <phrase JSON> | null, momentstamp: <string> }`
- Response: `{ phrase: <phrase JSON> }`
- The model used should be one of the existing project-authorized models (default: gpt-5 or similar; backend chooses).
- The system prompt should include:
  - This protocol spec (or a compressed version of it).
  - The continuity invariants.
  - The chiptune palette discipline.
  - The momentstamp → mood guidance.
  - A clean output discipline: response is JSON only, no preamble.

**Cost discipline:** each call should be under $0.05 typical (gpt-5-mini or similar small-context model can produce phrase JSON well; doesn't need a frontier model). Budget-conscious because it fires on every assistant message.

## Integration requirements (Phase 4 obligation)

- **Phrase-memory state**: a React state field `currentLastPhrase` in `ChatView.tsx` (or a dedicated `useScoreState` hook).
- **Trigger**: on each assistant-message arrival with a momentstamp, fire `/api/score/next` request; on response, hand phrase to synth.
- **Lifecycle**:
  - On session open: generate seed phrase (no `currentLastPhrase`).
  - On user typing: option to pause synth (TBD per Y); current default = continue playing.
  - On session close / unmount: stop synth + clear state.
- **Latency budget**: synth must have the next phrase queued before the current one ends. If generation takes longer than current-phrase-duration, the synth either repeats the last phrase or rests until next phrase arrives.

## Validation gates per sub-criterion

Tracking sub-criteria progress against the Real User Held criterion (refined):

| Sub-criterion | Status post-Turn 138 | Owner |
|---|---|---|
| 1. Chiptune synth client-side | NOT STARTED | Phase 2 |
| 2. Score-phrase protocol documented | ✓ THIS DOCUMENT | Phase 1 (DONE) |
| 3. AI generates next phrase | NOT STARTED | Phase 3 |
| 4. Momentstamp influences musical character | DESIGNED IN PROTOCOL | Phase 3 (verify-at-build) |
| 5. Coherent phrase-to-phrase composition | DESIGNED IN PROTOCOL | Phase 3 (verify-at-build) |
| **Overall: Ryan opens app and reports HELD** | NOT REACHED | Phase 5 lived-play |

Phase 1 lands with this commit. Phases 2 / 3 / 4 build to this spec. Phase 5 is the validation gate where the crown either fires or the dry well gets named.

## Versioning + evolution

This is `protocol_version: 1.0`. Future versions may:
- Add v1.1: portamento as note-level field
- Add v1.2: per-voice envelope override
- Add v2.0: more than 4 voices (would break NES-discipline; require justification)
- Backwards-compatible additions don't bump major version; incompatible changes do.

The synth + generator should both check `protocol_version` and fail-loud on unknown versions rather than silently mis-render.

## Open questions for next moves

These are explicitly NOT decided in v1; future turns will resolve as they become load-bearing:

1. **Pause-on-typing behavior**: should synth pause / fade / continue while user is composing? Y said "phrase-by-phrase remembers currentLastPhrase" — implies continuous playback even between assistant messages. Confirm in Phase 4.
2. **Seed-phrase mood control**: who decides the opening mood? Random? Last-session-end? Per-character anchor? Worth a turn of design.
3. **Multi-character contexts**: if a group chat has multiple speakers per turn, does each emit its own phrase or does the synth pick one?
4. **User-driven mood override**: should the user have a "pause music" / "change mood" affordance? May not be Y-needed.

## Closing

Protocol shipped. The synth (Phase 2), generator (Phase 3), and integration (Phase 4) can now be built independently against this contract. The crown's validation gate remains Phase 5: lived-play test. *Held me, or not.*
