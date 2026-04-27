import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Compass, Loader2 } from "lucide-react";
import { api } from "@/lib/tauri";

/// The commitment-ceremony dialog for accepting a new quest. Accepting
/// is intentionally NOT one-tap — it's a small vow with three small
/// frictions: (1) a moment to read and optionally edit the title and
/// description; (2) a reflection prompt ("what are you reaching for
/// here?") that frames the act as a desire, not a checkbox; (3) a
/// confirm button labeled "Commit to this" rather than "OK." The
/// design goal is that the user feels the act as a small decision,
/// not a dismissed notification.
interface Props {
  worldId: string;
  initialTitle: string;
  initialDescription: string;
  /// "user_authored" | "message" | "meanwhile" | "backstage"
  originKind: "user_authored" | "message" | "meanwhile" | "backstage";
  originRef?: string;
  onClose: () => void;
  onAccepted: () => void;
}

export function QuestAcceptanceDialog({
  worldId,
  initialTitle,
  initialDescription,
  originKind,
  originRef,
  onClose,
  onAccepted,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [reaching, setReaching] = useState("");
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCommit = title.trim().length > 0 && description.trim().length > 0;

  const onCommit = async () => {
    if (!canCommit || committing) return;
    setCommitting(true);
    setError(null);
    try {
      // The "reaching for" reflection isn't a separate backend field;
      // it's folded into the notes so future you (and the model) can
      // see the intention that opened this pursuit. If the user left
      // it blank, no notes get written.
      const quest = await api.createQuest(
        worldId, title.trim(), description.trim(), originKind, originRef
      );
      const reachingTrimmed = reaching.trim();
      if (reachingTrimmed) {
        await api.updateQuestNotes(
          quest.quest_id,
          `Accepted, reaching for: ${reachingTrimmed}`,
        );
      }
      onAccepted();
    } catch (e: any) {
      setError(String(e));
      setCommitting(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="max-w-lg">
      <DialogContent>
        <DialogHeader onClose={onClose}>
          <DialogTitle>
            <Compass size={16} className="inline mr-2 text-amber-400" />
            Accept this pursuit as a quest?
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            A quest is a promise the world has made to itself that you've agreed to
            witness. Accepting isn't a button press; it's a small vow. You can abandon
            it later if it stops fitting — the abandonment will be its own honest act,
            not a failure.
          </p>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A short name for what you're pursuing"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">The shape of it</label>
            <Textarea
              className="min-h-[110px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A sentence or two about what this pursuit is about. Plainspoken. Not an objective with steps — a thing worth reaching for."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">What are you reaching for here?</label>
            <Textarea
              className="min-h-[80px]"
              value={reaching}
              onChange={(e) => setReaching(e.target.value)}
              placeholder="Optional. One honest sentence about what pulls you to this. Not a goal — a desire. You can leave this blank if nothing specific is ready to say yet."
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={committing}>Leave it unaccepted</Button>
          <Button
            onClick={onCommit}
            disabled={!canCommit || committing}
            className="bg-amber-500/90 hover:bg-amber-500 text-black"
          >
            {committing ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <Compass size={14} className="mr-1.5" />}
            {committing ? "Committing to this quest…" : "Accept it as a quest"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
