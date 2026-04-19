import { useEffect, useState } from "react";
import { ScrollText, Undo2, X } from "lucide-react";
import { api, type CanonEntry } from "@/lib/tauri";

/// Toast that appears after a successful canonization save. Displays the
/// subject it was added to and offers ~10 seconds to undo. Undo deletes
/// the canon_entries row via the backend; note that the side effect on
/// the subject row (e.g. character description update) is NOT rolled
/// back — the entry's absence just removes the provenance. This is a
/// deliberate choice: rollbacks would require snapshotting pre-state,
/// and canon is meant to feel deliberate (the friction is the point).
export function CanonToast({
  entry,
  subjectLabel,
  onDismiss,
  onUndone,
}: {
  entry: CanonEntry | null;
  subjectLabel: string;
  onDismiss: () => void;
  onUndone: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!entry) return;
    setSecondsLeft(10);
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { onDismiss(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [entry, onDismiss]);

  if (!entry) return null;

  const handleUndo = async () => {
    try { await api.deleteCanonEntry(entry.canon_id); } catch { /* ignore */ }
    onUndone();
    onDismiss();
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto animate-in slide-in-from-bottom-2 fade-in duration-150">
      <div className="flex items-center gap-3 bg-card border border-border rounded-full shadow-2xl shadow-black/40 pl-4 pr-2 py-2">
        <ScrollText size={14} className="text-amber-500 flex-shrink-0" />
        <span className="text-sm">
          Added to <span className="font-medium">{subjectLabel}</span>'s canon
        </span>
        <button
          onClick={handleUndo}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer px-2 py-1 rounded-full hover:bg-accent/50"
          title="Undo (removes the provenance entry; does not roll back the subject)"
        >
          <Undo2 size={12} /> Undo ({secondsLeft})
        </button>
        <button
          onClick={onDismiss}
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 cursor-pointer"
          title="Dismiss"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
