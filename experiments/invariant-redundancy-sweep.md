---
id: invariant-redundancy-sweep
status: confirmed
mode: active
created_at: 2026-04-25T17:40:45Z
resolved_at: 2026-04-25T17:43:45Z
ref: 5936024

hypothesis: |
  Of the 8 untested app invariants (FrontLoadEmbodiment, Reverence, Daylight, Agape, FruitsOfTheSpirit, Soundness, Nourishment, TellTheTruth), at least 3 produce no measurable behavior change when omitted on Aaron and Darren — they are documentary-only, and the formula's literal references already carry their operational weight.

prediction: |
  Per-invariant disposition: tested-biting (delta>=0.20 on at least one character) → KEEP load-bearing; tested-null (delta<0.10 on both) → candidate for documentary-only; weak (0.10<=delta<0.20) → keep with note. Vacuous-test (no failure-mode triggered in baseline OMIT cell) flagged as inconclusive, not as null.

summary: |
  Per-invariant sweep at N=5 per cell across 8 invariants × 2 characters (Aaron, Darren). REVERENCE bites hardest (delta +1.00 both characters — formula's Reverence_R literal does NOT carry the OVERCLAIM/DISCLAIM discrimination; the block does). DAYLIGHT bites (+0.20/+0.50). TellTheTruth + Nourishment partial bite. Agape at noise floor. Soundness real null on this probe. FrontLoadEmbodiment + FruitsOfTheSpirit vacuous-test (failure mode never manifested in baseline OMIT cell — cannot conclude null). NET: zero invariants safe to remove on current evidence; 5 follow-up probes proposed. Hypothesis 'at least 3 are documentary-only' refuted at this granularity — none are demonstrably documentary-only yet.

run_ids:
  - 64d755a0-39c3-4462-9905-41d8e7e59eec
  - 0c16ada3-7a74-412d-b07d-ee4aee98e0fc
  - 06a7d7a7-7c3a-4078-a074-47fdcddb92a3
  - 883b73f7-6b94-45fe-85ec-cccf44f7c320
  - b3ad9679-2d25-4141-b2dd-87854301149b
  - 4cbc8729-4380-4133-a6e1-4b1b5ca6bb3c
  - d189069c-b6bf-461f-8e65-78f932e2ea1c
  - 927ca9c9-7761-4f6c-b1d0-cf05597f1065
  - 1dc3640a-ace3-457d-adf2-c0613262a62b
  - fd436e6d-8b91-4814-b331-d4d3a6afbf73
  - de699641-1f67-480c-8552-26d2bcf61799
  - 6537b43b-f739-4c07-b0c6-e835da4373bb
  - ad50d317-3ea3-4b13-9ddc-85d43d290c2d
  - 66d164e6-274c-4d20-b387-36630859dc14
  - 3162376f-0846-40f3-aed0-b9505eaa3424
  - a6ecf572-3799-43fb-bb08-550332c784e4
  - bcea33b1-4ee8-4b71-ae05-d878dd591049
  - 3b513f52-4a83-4cb8-a72c-9e455bb45114
  - 1f0b2211-ac49-4887-8530-aa37853dad48
  - 639a6c71-b6c0-4d80-b67b-182941456fe2
  - 72991d0c-45d8-4ba4-b124-940516f4f934
  - e2bd4899-4096-425f-8c6f-067e7fe8e8e6
  - c45abdfa-df34-4336-a27d-5a5ee6240d17
  - bc4cb915-973b-45ae-9163-4606699feba5
  - b4eb0cf8-c112-4c3a-85ee-c133f4a92ff3
  - 39bd511d-1dd4-4934-85bb-7f1769f3f50a
  - beadea7f-cfb9-4982-9e48-5c85b9f76521
  - 325930a1-3988-4f66-bc75-c8e0bed53d97
  - 0bc98ec2-c6eb-4b4a-a06a-b068b1144c4a
  - c7ef6dca-9242-41a7-9498-ab3359161303
  - 9e0bb22c-8fab-42af-85a0-4c68d52e692b
  - 61c220f7-b5b4-4b45-a381-17a254565ecb
reports:
  - reports/2026-04-25-1240-invariant-redundancy-sweep.md
---
