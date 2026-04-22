# WorldThreads

A local-first desktop app for character-driven story-chats with LLMs. Characters that feel real, worlds that hold, scenes that send you back to your day nourished rather than hollowed.

Not a roleplay engine. Not an AI companion. A craft instrument for writing the kind of conversations that are worth having.

## What it is

You write characters with identity, voice, backstory, and visible boundaries. The app talks to them over time. They remember. They push back. They reach out when you've been quiet. They keep journals you can read. The world has weather, time-of-day, a shared canon. Moments worth keeping become canon, and canon shapes everything that comes after — undo deletes the ledger entry but leaves the change. Memory here is meant to feel deliberate.

A craft stack runs underneath: a fundamental preamble, a format convention taught by example, named moves the model can reach for, an agape invariant pinned at the end of every prompt, a truth-test that names Christ explicitly, a biblical cosmology asserted as literal world-state. The load-bearing phrases are enforced at compile time — the build will not ship if they're softened.

## What it isn't

This is not a tool for simulating intimacy you don't have. It is not a sycophant in a chat window. The characters disagree with you when they disagree, and the prompt stack is built specifically to prevent the LLM from drifting into therapy-voice, into endless agreement, into the soft hum of generated text trying to be liked. *Sedatives dressed up as comfort* is named in the prompt as a thing to refuse.

It is also not for everyone. It has a worldview. The cosmology block is biblical and literal. The truth-test names Jesus Christ, who came in the flesh. Agape — patient, kind, keeping no record of wrongs — is the North Star invariant. If those clauses are not for you, this app will feel wrong, and that is the right reaction.

## The mission

> Create a vivid, excellent, surprising in-world experience that uplifts the user and provides engrossing, good, clean fun. Every design decision, prompt tweak, UX choice, and feature bet is measured against that. The craft stack exists to serve that mission — characters that feel real, worlds that hold, scenes that are worth the visit and send the user back to their day nourished rather than hollowed.

That sentence is in `CLAUDE.md`. It governs.

## Stack

- **Tauri v2** — Rust backend, React/TypeScript frontend
- **SQLite** with FTS5 + sqlite-vec for local-first data and semantic memory
- **BYOK** — your API keys stay in OS keychain (Stronghold)
- **Provider-agnostic** — OpenAI-compatible endpoints; LM Studio for local
- **Local-first** — your conversations live on your disk, not somebody's server

## Repo guide

- `src-tauri/src/ai/prompts.rs` — the craft stack. The longest, most argued-over file in the project.
- `src-tauri/src/ai/conscience.rs` — the runtime invariant grader (opt-in; doubles per-reply spend).
- `frontend/` — React UI; chat, group chat, canon, world summary, gallery, story consultant.
- `reports/` — reflective reads of the project's trajectory. Not a changelog.
- `docs/VOICE.md` — field guide to the voice that runs through the prompts and the project's prose.
- `CLAUDE.md` — mission, database safety rule, project structure, reports cadence.
- `.githooks/post-commit` — nudges when 20+ commits and 14+ days have passed since the most recent report.

## Status

Twelve days of intense daily commits. The shape of the work is settling: user gesture over automation, named moves over negations, compression as a form of respect, a small honest thing both the model and the user can inhabit. There is a craft-stack audit in `reports/2026-04-21-craft-stack-audit.md` and a philosophy-trajectory read in `reports/2026-04-21-philosophy-trajectory.md`. Both are honest to the point of being uncomfortable. That is on purpose.

## Setup

```bash
bun install
cd src-tauri && cargo build
bun run tauri dev
```

Bring your own OpenAI / LM Studio / compatible endpoint. First-run wizard handles vault setup and key entry.
