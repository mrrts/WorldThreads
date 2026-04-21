import { Package } from "lucide-react";
import type { Message } from "@/lib/tauri";

interface Props {
  message: Message;
}

interface ChangeEntry {
  character_name: string;
  action: "added" | "updated" | "swapped_out" | string;
  name: string;
  description?: string;
  kind?: string;
}

/// First-class card for the inventory_update message role. Rendered
/// inline in the chat transcript right after the trigger message.
///
/// Content shape: a "[Inventory updated:]\n" prefix followed by a JSON
/// blob `{"changes": [{character_name, action, name, description, kind}]}`.
/// The card parses the JSON and renders each change with the item's
/// full description (not just the short name), so the reader sees the
/// fuller texture the LLM wove into the update.
///
/// Falls back to raw-content rendering on parse failure (defensive —
/// covers any legacy rows written before the JSON format).
export function InventoryUpdateMessage({ message }: Props) {
  const stripped = message.content.replace(/^\[Inventory updated:\]\s*/i, "").trim();
  let changes: ChangeEntry[] = [];
  try {
    const parsed = JSON.parse(stripped);
    if (parsed && Array.isArray(parsed.changes)) {
      changes = parsed.changes as ChangeEntry[];
    }
  } catch {
    // Legacy or corrupted content — handled by the fallback path below.
  }

  return (
    <div key={message.message_id} data-message-id={message.message_id} className="flex justify-center my-2">
      <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-snug bg-amber-950/20 border border-amber-700/25 text-amber-100/85 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 mb-1.5 text-[10px] uppercase tracking-wider text-amber-500/80 font-semibold">
          <Package size={12} />
          <span>Inventory updated</span>
        </div>
        {changes.length > 0 ? (
          <ul className="space-y-1.5">
            {changes.map((c, i) => (
              <li key={i} className="text-[13px] leading-snug">
                <span className="font-medium text-amber-200">{c.character_name}</span>
                <span className="text-amber-500/70"> · {renderAction(c.action)} </span>
                <span className="font-medium">"{c.name}"</span>
                {c.description && (
                  <span className="text-amber-100/70"> — {c.description}</span>
                )}
                {c.kind && (
                  <span className="ml-1 text-[10px] uppercase tracking-wider text-amber-500/50">
                    {c.kind}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-[13px] italic whitespace-pre-line">{stripped || "(no detail)"}</div>
        )}
        <p className="text-[10px] mt-2 text-amber-500/50 not-italic">
          {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

function renderAction(action: string): string {
  switch (action) {
    case "added": return "added";
    case "updated": return "updated";
    case "swapped_out": return "swapped out";
    default: return action;
  }
}
