import { useState } from "react";
import Markdown from "react-markdown";
import { Moon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { formatMessage, markdownComponents, remarkPlugins, rehypePlugins } from "./formatMessage";
import type { Message } from "@/lib/tauri";
import { chatFontPx } from "@/lib/chat-font";

interface DreamMessageProps {
  message: Message;
  dreamerName: string;
  isPending: boolean;
  onDelete: (messageId: string) => void;
  chatFontSize?: number;
}

export function DreamMessage({
  message, dreamerName, isPending, onDelete, chatFontSize = 2,
}: DreamMessageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const timeLabel = new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (<>
    <div key={message.message_id} data-message-id={message.message_id} className="flex justify-center my-3">
      <div
        className="relative group max-w-[85%] rounded-2xl px-6 py-4 text-sm leading-relaxed italic backdrop-blur-md border border-indigo-400/20 text-indigo-50/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(49,46,129,0.35) 0%, rgba(30,27,75,0.45) 50%, rgba(15,23,42,0.55) 100%)",
        }}
      >
        {/* Soft star-field wash — keeps the card feeling like weather, not a button. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background: "radial-gradient(ellipse at 20% 10%, rgba(165,180,252,0.12) 0%, transparent 45%), radial-gradient(ellipse at 80% 90%, rgba(216,180,254,0.10) 0%, transparent 50%)",
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-1.5 mb-2 text-[10px] uppercase tracking-[0.18em] text-indigo-300/70 font-semibold not-italic">
            <Moon size={11} className="text-indigo-300/80" />
            <span>{dreamerName} dreams</span>
          </div>

          {!isPending && (
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="relative group/ddel">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-7 h-7 rounded-full bg-black/40 text-white/80 flex items-center justify-center cursor-pointer hover:bg-destructive hover:text-white transition-colors backdrop-blur-sm"
                >
                  <Trash2 size={12} />
                </button>
                <span className="absolute top-full right-0 mt-1.5 px-2 py-0.5 text-[10px] font-medium text-white bg-black rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover/ddel:opacity-100 pointer-events-none transition-opacity not-italic">Delete dream</span>
              </div>
            </div>
          )}

          <div
            style={{ fontSize: `${chatFontPx(chatFontSize)}px` }}
            className="prose prose-sm max-w-none prose-p:my-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [--tw-prose-body:rgb(224,231,255)] [--tw-prose-bold:rgb(196,181,253)]"
          >
            <Markdown components={markdownComponents} remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
              {formatMessage(message.content)}
            </Markdown>
          </div>

          <p className="text-[10px] mt-2 text-indigo-300/50 not-italic flex items-center gap-2">
            <span>— {timeLabel}</span>
          </p>
        </div>
      </div>
    </div>

    <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="max-w-xs">
      <div className="p-5 space-y-4 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2">
          <Trash2 size={18} className="text-destructive" />
          <h3 className="font-semibold">Delete dream</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          This will permanently remove this dream from the thread.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setShowDeleteConfirm(false);
              onDelete(message.message_id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  </>);
}
