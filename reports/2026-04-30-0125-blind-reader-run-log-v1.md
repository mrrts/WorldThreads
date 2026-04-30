# Blind-reader run log v1 (scaffold)

Operational log scaffold for strict Falsifier #4 execution.

Related artifacts:

- completion lock: `reports/2026-04-30-0045-receipt-arc-completion-lock.md`
- execution plan: `reports/2026-04-30-0055-strict-blind-reader-execution-plan.md`
- frozen packet: `reports/2026-04-30-0105-blind-reader-packet-v1.md`
- score sheet: `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`

---

## Run header

- run_id:
- run_date:
- operator:
- scoring_owner:
- narrative_owner:
- packet_version: v1
- packet_hash:
- score_sheet_path: `reports/2026-04-30-0115-blind-reader-score-sheet-v1.csv`

## Pre-flight checklist

- [ ] Packet is frozen and unchanged since collection start
- [ ] Packet hash captured in run header
- [ ] Score sheet columns validated
- [ ] Recruitment buckets prepared
- [ ] Reader IDs anonymized

## Stop-gate checks (must pass)

- [ ] Packet drift gate passed (no post-start edits)
- [ ] Blindness breach gate passed (no exposed readers included)
- [ ] Axis drift gate passed (no scoring-axis changes post-start)
- [ ] Sample integrity gate passed (no missing rows for included readers)

If any gate fails, mark run as invalid and restart from packet freeze.

## Reader session receipts

### Reader R001

- bucket:
- randomized_order:
- excluded: false
- exclusion_reason:
- notes:

### Reader R002

- bucket:
- randomized_order:
- excluded: false
- exclusion_reason:
- notes:

### Reader R003

- bucket:
- randomized_order:
- excluded: false
- exclusion_reason:
- notes:

### Reader R004

- bucket:
- randomized_order:
- excluded: false
- exclusion_reason:
- notes:

### Reader R005

- bucket:
- randomized_order:
- excluded: false
- exclusion_reason:
- notes:

## Exclusion ledger

| reader_id | reason | replacement_reader_id | operator_note |
|---|---|---|---|

## Completion checklist

- [ ] Raw scores collected for all included readers/cells
- [ ] Means computed per methodology thresholds
- [ ] Outcome labeled (CONFIRM / CLAIM / MIXED / REJECTION)
- [ ] Canonical results artifact drafted in `reports/`
- [ ] Doctrine updates mirrored in `CLAUDE.md` and `AGENTS.md` (if required)

## Outcome stub

- outcome:
- key numbers:
- caveats:
- next action:
