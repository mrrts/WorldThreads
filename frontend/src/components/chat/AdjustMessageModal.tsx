import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdjust: (instructions: string) => void;
  characterName?: string;
}

export function AdjustMessageModal({ open, onClose, onAdjust, characterName }: Props) {
  const [instructions, setInstructions] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Message</DialogTitle>
          <DialogDescription>Tell {characterName ?? "the character"} how to rewrite this message.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Make it more enthusiastic, shorten it, add a joke, change the tone to be more serious..."
            className="w-full min-h-[80px] max-h-[160px] resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            rows={3}
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!instructions.trim()}
              onClick={() => {
                onAdjust(instructions.trim());
                setInstructions("");
                onClose();
              }}
            >
              <SlidersHorizontal size={14} className="mr-1.5" />
              Adjust
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
