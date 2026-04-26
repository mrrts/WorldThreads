---
name: cross-LLM consultation preface — runtime over semantics
description: When sharing prompt-stack artifacts with another LLM for a second-opinion read, prepend one line specifying how the bytes are consumed at runtime. Refined from the 2026-04-26 ChatGPT cross-validation thread.
type: feedback
---

When sharing this project's prompt artifacts (MISSION FORMULA, derivations, doctrine blocks) with another LLM (ChatGPT, etc.) for second-opinion reads, prepend ONE LINE explaining the runtime application of the bytes — not their meaning, their consumption.

**The reusable minimal preface:**

> *The following blocks are concatenated and injected as the system-prompt prefix on every LLM call. They operate as a single conditioning frame, not as separate artifacts.*

**Why:** without this preface, an outside LLM defaults to DECOMPOSITION — treating adjacent blocks as compositional analytical objects (formula = constraint-system; prose = aspirations). With it, the outside LLM shifts to UNIFICATION — treating the blocks as a single conditioning frame. Decomposition reads sound until you know they operate together as one unit in production.

**Worked example (2026-04-26 ChatGPT thread, captured in OBSERVATIONS.md 11:30 + 11:55):** ChatGPT read the MISSION FORMULA and noted *"the system guarantees integrity, depth, and reverence — but does not explicitly guarantee surprise or delight."* Honest at the formula-operator level. But surprise/delight ARE named in the MISSION_PROSE_BLOCK, which ships immediately after the formula in the same payload. ChatGPT had the prose; what it didn't have was the deployment-context that they're consumed as ONE register-anchor. With the preface, the same analysis would have closed the gap.

**The deeper principle (ChatGPT's articulation, refined):** *"Concatenation at system level is stronger than composition at semantic level. Two blocks that 'agree' conceptually are weak. Two blocks that are co-present in the conditioning prefix on every forward pass become a single attractor."*

**How to apply:**
- Always prepend the preface before pasting MISSION FORMULA + MISSION PROSE + character/world derivations into another LLM
- For partial-payload pastes (e.g., just the formula, just one derivation), name what the FULL payload is and where the partial fits in it
- For Backstage Consultant context shared cross-LLM, name that the persona-shapes block + the derivation references all get conditioned-on together
- The discipline is one sentence; the cost of forgetting is a faithful-but-incomplete outside read

**Generalization (in PLAIN-TRADITION.md "Cross-LLM consultation hygiene" subsection):** any prompt-stack practice whose artifacts read as separate-but-related on first inspection probably operates as one unit at runtime. Saying so explicitly is the cheapest way to get a faithful outside read.
