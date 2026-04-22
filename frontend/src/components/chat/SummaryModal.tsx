import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { listen } from "@tauri-apps/api/event";
import { playChime } from "@/lib/chime";
import { CyclingLoadingMessages } from "@/components/ui/cycling-loading-messages";

// Playful flavor for the summary loading state (local-model prompt ingest).
// First entry is what the reader sees first.
const SUMMARY_LOADING_MESSAGES = [
  "Skimming the conversation...",
  "Finding the through-line...",
  "Piecing it together...",
  "Catching up...",
  "Noticing what mattered...",
  "Tracing the arc...",
  "Gathering the threads...",
  "Sorting the beats...",
  "Pulling it into focus...",
  "Highlighting the key moments...",
  "Listening for the subtext...",
  "Mapping what happened...",
  "Revisiting the highlights...",
  "Finding the shape of it...",
  "Settling on what matters...",
  "Re-reading one more time...",
  "Jotting notes in the margin...",
  "Cross-referencing the moments...",
  "Remembering how it started...",
  "Putting it into plain words...",
];

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  generateSummary: () => Promise<string>;
  notifyOnMessage?: boolean;
}

export function SummaryModal({
  open, onClose, title, generateSummary, notifyOnMessage,
}: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  // Initial-render-safe: if the modal opens already open, loading is true on
  // the very first paint — otherwise there's a one-render flash of empty
  // body before useEffect fires and flips loading=true.
  const [loading, setLoading] = useState(() => open);
  const [error, setError] = useState<string | null>(null);

  // Keep the streaming body scrolled to the bottom as tokens land, unless
  // the user has deliberately scrolled up to re-read.
  const streamRef = useRef<HTMLDivElement | null>(null);
  const userScrolledUpRef = useRef(false);
  useEffect(() => {
    const el = streamRef.current;
    if (!el) return;
    if (userScrolledUpRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [summary]);

  useEffect(() => {
    if (!open) return;
    setSummary("");
    setError(null);
    setLoading(true);

    let unlisten: (() => void) | null = null;

    (async () => {
      let chimePlayed = false;
      unlisten = await listen<string>("summary-token", (event) => {
        if (!chimePlayed && notifyOnMessage) { playChime(); chimePlayed = true; }
        setSummary((prev) => (prev ?? "") + event.payload);
      });
      try {
        const result = await generateSummary();
        setSummary(result);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
        unlisten?.();
      }
    })();

    return () => { unlisten?.(); };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>On-demand summary of the current conversation.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          {loading && !summary ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 size={20} className="animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                <CyclingLoadingMessages messages={SUMMARY_LOADING_MESSAGES} />
              </span>
            </div>
          ) : error ? (
            <div className="text-sm text-destructive py-4">{error}</div>
          ) : !loading && !summary ? (
            // Request completed but returned an empty string — don't leave
            // the modal blank. Surfaces a clear hint instead of silent void.
            <div className="text-sm text-muted-foreground py-6 text-center">
              The model returned no summary. Try again?
            </div>
          ) : summary ? (
            <div
              ref={streamRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                // If the user pulls away from the bottom (>40px slack),
                // stop auto-scrolling so they can re-read. Sticking back to
                // the bottom re-engages auto-scroll.
                const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
                userScrolledUpRef.current = !atBottom;
              }}
              className="text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto pr-2"
            >
              {summary}{loading ? <span className="inline-block w-1.5 h-4 bg-primary/60 animate-pulse ml-0.5 align-text-bottom" /> : null}
            </div>
          ) : null}
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
