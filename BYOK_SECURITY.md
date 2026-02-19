# BYOK + Security

## Key handling

- User supplies an API key (and optionally selects provider).
- Store keys in OS keychain/credential vault when possible.
- Never write keys to logs.
- Never include keys in export bundles.

## Local data

- Store all transcripts, state, events locally.
- Provide an option for at-rest encryption of the local DB.
- Provide export/import:
  - Export world bible + canon + events + transcripts (user-controlled)
  - Optionally exclude raw transcripts for privacy

## Privacy expectations

- The app sends only the necessary prompt context to the model provider.
- Inform the user what is sent:
  - recent thread turns
  - relevant retrieved snippets
  - world/canon summaries
- Provide a “redaction” feature for messages (optional v1.1).

## Abuse prevention (in-world)

- Characters should not be able to solicit sensitive secrets unnecessarily.
- Keep a clear separation: roleplay world vs. real-world instructions.
