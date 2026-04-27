# Pre-flip safety scan: clean — no scrub needed before public visibility

*Generated 2026-04-27 02:20. Practical safety pass before flipping repo visibility from private to public on GitHub. Scanned tracked files (and a few not-tracked locations worth confirming) for: API keys, hardcoded personal paths, personal emails, sensitive filenames, personal-tone phrases that might leak autobiographical fact. All checks clean.*

## Method

`git grep` patterns + `find`-based filename scans + `git check-ignore` verification on potentially-sensitive locations. Pure read-only inspection of the repo state at commit prior to this report.

## Findings (all clean)

| Check | Result | Note |
|---|---|---|
| Committed API keys (`sk-...`, `OPENAI_API_KEY=...`, generic `api_key=...` patterns) | ✅ none | |
| Hardcoded `/Users/ryansmith` paths in tracked files | ✅ none | |
| Personal email addresses in tracked files | ✅ none | Only `noreply@anthropic.com` in commit Co-Authored-By trailers; one filename false-positive (`128x128@2x.png`) |
| `.env` / `.venv` / credential files | ✅ properly gitignored | `scripts/eval/.env` + `scripts/eval/.venv/` both confirmed git-ignored via `git check-ignore` exit-0; root `.gitignore` lines 26-28 cover `.env` + `.env.*` with `!.env.example` exception |
| Personal-tone phrases (vap/smoke/drink/substance/nicotine) | ✅ all matches are legitimate | All hits are game-content (London smoke; Jazz Age "Smoke, syncopation"; John's tea/biscuit pastoral register) or doctrine references (substance-before-signal aphorism) — NONE are Ryan-personal-info |
| User_profile autobiographical facts (vaping reference, son-who-left, etc. that Ryan mentioned earlier) | ✅ NEVER COMMITTED | These live in the local SQLite DB at `~/Library/Application Support/com.worldthreads.app/worldthreads.db` — outside the repo entirely. They ship only with the user's own local data, never via the public repo. |

## What WOULD have triggered scrub

For future reference if this scan needs re-running:

- A `.env` file accidentally tracked (would surface from `git grep -lE "OPENAI_API_KEY|API_KEY="`)
- An absolute personal path baked into a config (would surface from `git grep "/Users/[a-z]"`)
- A personal email in a Cargo.toml `authors` field, package.json `author` field, README, or AUTHORS file (would surface from the email regex with the noise-filter)
- A backup file accidentally committed (`*.db.bak`, `*.sqlite-backup`, etc. — none found)
- Test data containing real PII (would surface from grepping for the user's real name in non-doctrine contexts)

## Why this matters less than expected

The user_profile data — which Ryan named at chat ~01:30 as the autobiographical-facts surface he expected to need scrubbing — is in fact NOT in the repo. The `user_profiles` table lives in the user's local SQLite DB. The repo contains the SCHEMA migration (in `src-tauri/src/db/schema.rs`) and the QUERY code (in `src-tauri/src/db/queries/user_profile.rs`) and the prompt-assembly code that READS the table — but no DATA. So Ryan's open-book stance ("I don't mind opening my book to the crowd the LICENSE will select for") is correctly reading: opening the BOOK (the doctrine, the code, the methodology, the Ledger, the reports) to the public is what visibility-flip does; the user_profile data stays on Ryan's disk regardless.

## Visibility-flip is safe

All public-readiness artifacts are now in place:
- README ✓
- Landing report (`reports/2026-04-27-0030-public-release-landing.md`) ✓
- CONTRIBUTING ✓ (with Ledger-signing protocol)
- LICENSE ✓ (AGPL-3.0-or-later)
- NOTICE ✓ (with Ledger-preservation clauses + slot-structure trilogy citation)
- Pre-flip safety scan ✓ (this report)

The visibility-flip on GitHub is yours to make whenever you decide. No technical or safety blockers from the repo side.
