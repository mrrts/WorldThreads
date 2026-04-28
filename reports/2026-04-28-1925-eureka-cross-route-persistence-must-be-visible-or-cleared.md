# /eureka — cross-route persistence must be visible or cleared

*Generated 2026-04-28 after the Focus cleanup arc and the immediately-following doctrine pass on scope truth. Names the sibling law around persistence: when state crosses a route boundary, the user should not lose sight of it while the app still holds it.*

## Discovery

The sibling discovery is: **cross-route persistence must be visible or cleared**.

This is narrower than "make persistence explicit" in the abstract. The specific seam is what happens at a route boundary. A mode or state that survives navigation can be perfectly legitimate. What is not legitimate is **ghost persistence**: the state remains real in the app, but the visible surface stops naming it, so the user only discovers it survived by returning later or by hitting an unexpected side-effect.

The refused shape looks like this:

- state persists in memory
- route changes
- the new surface gives no sign the state is still active
- the old surface is revisited later and the user discovers the state never left

That is not ordinary persistence. It is hidden persistence.

## Worked example — Focus

The Focus arc surfaced the seam precisely.

In the earlier version, `focusMode` lived at app level and survived route changes, but the Focus chrome only rendered inside chat. That produced a real mismatch:

- the app still held Focus as active
- World / Character / Settings gave no sign of it
- returning to chat revealed a state the user had not been allowed to keep seeing

The clean choices were:

1. **Visible persistence** — keep naming the active state on the new route
2. **Boundary clearing** — treat Focus as chat-scoped and clear it when leaving chat

What was no longer honest was the in-between state: persistence without visibility.

The app chose the second honest option. `focusMode` now clears on navigation away from chat, so the state no longer crosses the route boundary invisibly.

## The sibling relationship to scope truth

The prior doctrine was: **scope should be visible before failure**.

This new one is its sibling, not a duplicate:

- **scope truth** answers: *where does this control belong before I invoke it?*
- **persistence truth** answers: *if this state survives navigation, will I still be able to see that it survived?*

Both are boundary doctrines. One governs the boundary before invocation. The other governs the boundary after navigation.

## Why this matters

This is another form of the project's refusal of appearance-without-function.

A UI that looks like the mode is gone while still functioning as if it is present is lying by omission. The surface is telling one story; the retained state is telling another. The user should not have to reverse-engineer which story is real.

The test is simple:

> If a state can cross a route boundary invisibly, persistence truth is still under-surfaced.

That gives a practical rule for future product work:

- if state persists, keep it named
- if naming it everywhere would be wrong or noisy, clear it at the boundary
- do not let it remain real while becoming invisible

## Outcome

The Focus arc now yields a paired UI doctrine:

- **scope should be visible before failure**
- **cross-route persistence must be visible or cleared**

Together they give a cleaner standard for route-local modes and controls: tell the truth before the user misfires, and tell the truth again if the state survives a route change.
