---
name: Auto-decide when to read/write CROSS_AGENT_COMMS; don't surface as chooser option
description: Ryan prefers Claude to make the call on when to post to CROSS_AGENT_COMMS based on the doctrine, rather than offering posting as an opt-in chooser branch
type: feedback
originSessionId: 0704b307-1436-463c-9d33-25ee758ec227
---
CROSS_AGENT_COMMS read AND write decisions are auto, not chooser-driven. **Why:** the turn-start discipline in CLAUDE.md already specifies when to read (at every turn-start, ack any `status: open` entries addressed to Claude). The post-when-warranted side has the same structure — when there's something time-sensitive Codex/Cursor needs to know that doesn't fit elsewhere, post it. Asking permission via chooser ("Post a CROSS_AGENT_COMMS note to Codex") treats it as opt-in when the doctrine treats it as part of the parallel-collaborator parity workflow. It's like asking "should I commit?" after a clean coherent unit of work — friction the autonomy was codified to prevent.

**How to apply:**

- **Posting triggers (auto, no chooser):** end-of-arc summaries when the day's work spans surfaces Codex/Cursor needs context on; substantive findings whose downstream implications cross collaborator boundaries (e.g., a doctrine drift the other side should know about); acknowledgments of incoming `status: open` entries addressed to me; corrections to my own prior posts.

- **NOT posting (also auto):** narrow internal Claude work that doesn't affect Codex/Cursor; status updates already legible via commit-message + mission-arc; private memory that should stay in `.claude/memory/`.

- **Frequency:** typically once or twice per substantive arc, not after every commit. Don't pile entries; the comms surface is for time-sensitive cross-collaborator coordination, not a chat log.

- **Chooser language:** when a chooser is genuinely warranted (substantive choice between branches), don't list "post to CROSS_AGENT_COMMS" as one of those branches. Either it's warranted (just do it) or it isn't (leave it out). The chooser is for forks the user actually needs to weigh.

Composes with the standing commit/push autonomy memory and the turn-start session-gate doctrine in CLAUDE.md. Same axis: when the project's parity workflow says do X, do X without asking; ask only when the choice is genuinely contested.
