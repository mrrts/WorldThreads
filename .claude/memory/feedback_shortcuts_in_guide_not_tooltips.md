---
name: Shortcuts go in a shortcuts guide, not tooltips
description: Don't annotate tooltips with keyboard shortcuts (e.g., "Hide sidebar (Cmd+Shift+F)"). Keep tooltips to plain function labels; shortcuts will live in a dedicated guide later.
type: feedback
originSessionId: 0704b307-1436-463c-9d33-25ee758ec227
---
When designing UI tooltips for buttons that have keyboard shortcuts, **do NOT include the shortcut in the tooltip text** (e.g., "Hide sidebar (Cmd+Shift+F)" / "Toggle Focus mode (Cmd+Shift+F)"). Keep tooltips to plain function labels: "Hide sidebar", "Show sidebar", "Open consultant", etc.

**Why:** Ryan plans to ship a separate shortcuts guide as the canonical place for keyboard shortcuts. Annotating tooltips inline with shortcuts:

1. Couples tooltip copy to shortcut binding — if the shortcut changes, every tooltip needs updating.
2. Crowds the tooltip with secondary information at the moment when the user just wants to know what the button does.
3. Pre-empts the dedicated shortcuts guide's role as the canonical surface for that information.

**How to apply:** When drafting any new UI button tooltip, write the function label only. If the button has a shortcut, leave that to the future shortcuts guide. When reviewing existing tooltips, strip shortcut annotations from them. Same goes for any "press X to do Y" hint text added to UI affordances — keep the affordance plain; the shortcuts guide is the place for keystroke information.

**Worked example:** Focus mode v5's title-bar PanelLeft button initially had tooltip "Hide sidebar / Focus mode (Cmd+Shift+F)" and "Show sidebar (Cmd+Shift+F)". After Ryan's correction, simplified to "Hide sidebar" / "Show sidebar" (commit `3d2de28`, 2026-04-28). The bottom-right Focus pill (which is itself a status indicator, not a button tooltip) does still show "Cmd+Shift+F or Esc to exit" — that's a different surface (status pill telling the user what to do TO exit a state they're currently in), not a hover tooltip on a button. The distinction is: tooltips on buttons = plain function label; status pills indicating an active state = may include the gesture to exit that state.
