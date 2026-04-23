import { useState } from "react";
import { Compass, X, Check } from "lucide-react";
import { QuestAcceptanceDialog } from "./QuestAcceptanceDialog";

/// A quest-proposal card rendered INLINE in chat (not in Backstage).
/// Triggered when a character in dialogue emits a `propose_quest`
/// action block alongside their natural speech. The card sits
/// underneath the character's bubble; clicking "Consider accepting"
/// opens the same commitment-ceremony dialog the Backstage flow uses.
///
/// Visually quieter than the Backstage card — this has to coexist
/// with the character's dialogue above it without overwhelming the
/// scene's register. Amber border, subtle fill, small footprint.
interface Props {
  title: string;
  description: string;
  worldId: string;
  /// The character's message id this proposal was emitted from.
  /// Used as origin_ref when the user accepts.
  sourceMessageId: string;
}

export function InlineQuestProposalCard({ title, description, worldId, sourceMessageId }: Props) {
  const [state, setState] = useState<"idle" | "accepted" | "dismissed">("idle");
  const [dialogOpen, setDialogOpen] = useState(false);

  if (state === "accepted") {
    return (
      <div className="my-2 max-w-[560px] rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-400 flex items-center gap-2">
        <Check size={11} />
        <span>Accepted as a quest. It's on the books.</span>
      </div>
    );
  }

  if (state === "dismissed") {
    return (
      <div className="my-2 max-w-[560px] rounded-md border border-border/30 bg-muted/10 px-3 py-1.5 text-[11px] text-muted-foreground/70 italic">
        — quiet nod, didn't take it on
      </div>
    );
  }

  return (
    <>
      <div className="my-2 max-w-[560px] rounded-lg border border-amber-400/40 bg-amber-500/5 overflow-hidden">
        <div className="px-3 py-1.5 border-b border-amber-400/20 bg-amber-500/10 flex items-center gap-1.5">
          <Compass size={11} className="text-amber-400" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-300">
            A quest worth accepting?
          </span>
        </div>
        <div className="px-3 py-2.5">
          <p className="text-sm font-medium text-foreground/95 mb-1">{title}</p>
          <p className="text-[13px] text-foreground/80 leading-snug whitespace-pre-wrap">{description}</p>
          <div className="flex items-center gap-1.5 mt-2.5">
            <button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/90 hover:bg-amber-500 text-black text-[11px] font-medium transition-colors cursor-pointer"
            >
              <Compass size={10} />
              Consider accepting
            </button>
            <button
              onClick={() => setState("dismissed")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent text-[11px] transition-colors cursor-pointer"
            >
              <X size={10} />
              Not now
            </button>
          </div>
        </div>
      </div>
      {dialogOpen && (
        <QuestAcceptanceDialog
          worldId={worldId}
          initialTitle={title}
          initialDescription={description}
          originKind="message"
          originRef={sourceMessageId}
          onClose={() => setDialogOpen(false)}
          onAccepted={() => { setDialogOpen(false); setState("accepted"); }}
        />
      )}
    </>
  );
}
