import { useEffect } from "react";
import { Package, X } from "lucide-react";
import type { InventoryItem } from "@/lib/tauri";

export interface InventoryUpdateSummary {
  characterName: string;
  summary: string;
}

/// Diff prior vs new inventory and produce a one-line human summary.
/// Names are matched exactly (case-insensitive). An item with the same
/// name but a different description counts as "updated"; a name only
/// in `next` is "added"; a name only in `prior` that wasn't re-added is
/// "swapped out". Returns null if nothing changed (grader lets this
/// happen rarely — the prompt requires at least one change, but we
/// don't want to show a confusing empty toast if it doesn't).
export function buildInventoryDiffSummary(
  prior: InventoryItem[],
  next: InventoryItem[],
  characterName: string,
): InventoryUpdateSummary | null {
  const norm = (s: string) => s.trim().toLowerCase();
  const priorMap = new Map(prior.map((p) => [norm(p.name), p]));
  const nextMap = new Map(next.map((p) => [norm(p.name), p]));

  const added: string[] = [];
  const updated: string[] = [];
  const removed: string[] = [];

  for (const n of next) {
    const key = norm(n.name);
    const p = priorMap.get(key);
    if (!p) {
      added.push(n.name);
    } else if (p.description.trim() !== n.description.trim()) {
      updated.push(n.name);
    }
  }
  for (const p of prior) {
    const key = norm(p.name);
    if (!nextMap.has(key)) {
      removed.push(p.name);
    }
  }

  if (added.length === 0 && updated.length === 0 && removed.length === 0) {
    return null;
  }

  const parts: string[] = [];
  if (added.length > 0) parts.push(`added ${added.join(", ")}`);
  if (updated.length > 0) parts.push(`updated ${updated.join(", ")}`);
  // When items balance (same count added + removed), the removes are
  // implicit in the adds — don't clutter the toast with both. Only show
  // the "swapped out" tail when there's an asymmetry worth naming.
  if (removed.length > added.length) {
    const tail = removed.slice(added.length);
    parts.push(`swapped out ${tail.join(", ")}`);
  }

  return { characterName, summary: parts.join("; ") };
}

interface InventoryUpdatedToastProps {
  updates: InventoryUpdateSummary[] | null;
  onDismiss: () => void;
}

export function InventoryUpdatedToast({ updates, onDismiss }: InventoryUpdatedToastProps) {
  useEffect(() => {
    if (!updates) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [updates, onDismiss]);

  if (!updates || updates.length === 0) return null;

  return (
    <div className="absolute bottom-4 right-4 z-20 bg-card border border-amber-500/30 rounded-xl shadow-xl shadow-black/30 px-4 py-3 flex items-start gap-3 max-w-md animate-in fade-in slide-in-from-bottom-2 duration-200">
      <Package size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        {updates.map((u, i) => (
          <div key={i} className="text-sm leading-snug">
            <span className="font-medium">{u.characterName}</span>
            <span className="text-muted-foreground">'s inventory updated with </span>
            <span>{u.summary}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onDismiss}
        className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors mt-0.5"
      >
        <X size={14} />
      </button>
    </div>
  );
}
