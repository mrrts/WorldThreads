---
name: CI silent-red gates teach noise — pre-existing red is not a stable baseline
description: A CI/test/check that's been red across many runs is standing apparatus-dishonesty — the check claims to enforce something but isn't. Fix or remove or move to non-blocking before the next push; don't normalize the red signal.
type: feedback
originSessionId: 55609b79-8084-4b63-99b9-75c7ca56310e
---
A CI/test/check that's been red across many runs is not a stable baseline; it is *standing apparatus-dishonesty* — the gate claims to be enforcing something but isn't enforcing anything. Standing-red teaches the team to ignore the signal; at that point the gate is no longer a gate. When CI fails on a push, check whether the failure is yours OR pre-existing; both deserve investigation, and the pre-existing case is the higher-priority one because it indicates the project has been silently un-checking itself.

**Why:** The project's `rust-lib` CI job was red across every push from CI setup through 2026-05-01 Turn 161 (~17+ consecutive failed pushes) because Tauri's Linux system dependencies (`glib-2.0`, GTK, WebKit headers) weren't installed before `cargo test --lib`. Nobody noticed because every run failed identically — the red signal became normalized noise. It was caught only because a separate CI failure (homepage-fragment-sync, broken at Turn 150 by a README rewrite) prompted Ryan to ask for a debug pass; at that point the rust-lib history surfaced in the same `gh run list`. The fix took ~5 minutes once attention turned to it; the cost was the months of false-green project status the standing-red had been quietly producing.

**How to apply:**
- When CI fails on your push: check whether the failure is yours OR pre-existing (`gh run list --workflow=CI --limit 10` shows recent history; `gh run view <id> --log-failed` shows the error). Both deserve investigation.
- If pre-existing: fix the infrastructure (deps not installed, secrets missing, env wrong) rather than ignoring the signal. The pre-existing red is doubly important.
- If you're adding a new CI job: verify it green before the PR that introduces it merges. A check that immediately fails on its first run is the failure mode this discipline refuses.
- "I'll fix it next time" is the trap. Standing-red gates are paid attention exactly once — at the moment they become red — and then never. Fix it now or remove it now.

Composes with CLAUDE.md "Build before close-out" (this discipline is the upstream sibling: build-before-close-out is local; CI-silent-red is at the team/project level). Composes with `feedback_apparatus_honest_earns_and_refuses` (the parent discipline operating at the build-instrumentation layer).
