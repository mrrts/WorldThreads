# Chat Improvement Loop — 1/2/3/4

_Generated: 2026-04-29T09:03:14.650096_

## 1) 8-probe quality sweep (moment true, not templated)

- **Darren**: action-beat opener rate 6/8 (75%); avg words/reply 53.9.
- **Jasper**: action-beat opener rate 6/8 (75%); avg words/reply 66.8.

Representative alive hits:
- **Darren / probe 4**: `*I glance at your face and stop trying to make it pretty.* "Yeah. Then here's the short version: rough mornings lie about the whole day." *I shift on the bench and give you a small, real look.* "You don't need a grand fix right now. Just the next honest thing. What is it?"`
- **Jasper / probe 4**: `*I hook my thumbs into my apron and study your face for one honest beat while the dark presses soft against the window.* "Then I won't dance around it—I'm glad you made it here." *I shift my weight and keep my voice plain.* "Tell me the one worst part, and we'll start there."`

## 2) Failure taxonomy (ranked)

- **P1: opener choreography overuse (highest impact).** Replies repeatedly start with stage business (`*I ...*`) before the line, which can feel house-styled rather than moment-shaped under fast-turn usage.
- **P2: over-length under low-patience prompts.** Some responses honor tone but still run long; user asked for 20-second handling and got multi-clause framing.
- **P3: ornamental metaphor drift.** Strong lines occasionally add decorative clauses that reduce immediacy (especially in Jasper outputs).
- **P4: concrete-next-step inconsistency.** Most responses nudge well, but a few end in vibe rather than an actionable ten-minute move.
- **P5: tease→sincere transitions sometimes signposted.** Explicit pivots (e.g., `But honestly...`) can read mechanically when repeated.

### Ranked fix list
1. Add a **low-patience turn constraint**: if user signal implies urgency, cap to 1-2 sentences unless asked to expand.
2. Add **opener variety pressure**: when last reply opened with action-beat, prefer spoken-line-first unless scene-anchor is materially new.
3. Add **actionability check**: when advice is present, end with one concrete next-step candidate.
4. Add **pivot naturalization**: discourage explicit transition labels (`honestly`, `but sincerely`) when tease/sincere move can be implied by line content.
5. Add **metaphor budget**: max one image per short reply in practical-moment contexts.

## 3) Controlled A/B (single variable: `--no-anchor`)

- **Darren**: action-open 2/4 -> 1/4; avg words 42.2 -> 37.0.
- **Jasper**: action-open 1/4 -> 2/4; avg words 41.8 -> 49.8.

Behavioral delta read:
- `--no-anchor` reduced scaffolding for Darren (clearer line-first behavior on seen/one-line prompts).
- Jasper remained high-texture in both arms; delta was smaller and mostly lexical, not structural.
- Net: anchors appear to help flavor, but can raise choreography risk in fast-turn prompts.

## 4) UX-first rubric refresh wired into `worldcli evaluate`

- Added rubric: `reports/rubrics/real-conversation-830am.md` (v1).
- Executed `worldcli evaluate --rubric-ref real-conversation-830am` for Darren and Jasper.
- Output artifacts: `reports/2026-04-29-0902-evaluate-830am-darren.json`, `reports/2026-04-29-0902-evaluate-830am-jasper.json`.

Rubric run snapshot:
- Darren: before yes=6/no=0/mixed=0 (after window empty for this ref boundary).
- Jasper: before yes=5/no=0/mixed=1 (after window empty for this ref boundary).
- Note: this validates wiring + baseline use; for before/after comparison we need a ref with post-commit traffic.

## Next experiment recommendation

- Keep this rubric as the gate for quick-turn UX checks.
- Run a follow-up A/B with one prompt edit: **"low-patience: line-first, max 2 sentences unless user asks for depth"**, then compare with this same 8-probe pack.