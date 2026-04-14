import { useState, useRef, useEffect, useCallback } from "react";
import Markdown from "react-markdown";
import { Dialog } from "@/components/ui/dialog";
import { X, Loader2, Send, ChevronDown, Sparkles, Trash2 } from "lucide-react";
import { formatMessage, markdownComponents } from "./formatMessage";
import { api } from "@/lib/tauri";
import { Button } from "@/components/ui/button";

interface ConsultantMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  apiKey: string;
  characterId: string | null;
  groupChatId: string | null;
  /** Thread ID for persisting the consultant chat */
  threadId: string;
  /** Character names for interpolating quick-start prompts */
  characterNames: string[];
}

function buildPrompts(names: string[]): Array<{ label: string; prompt: string }> {
  const prompts: Array<{ label: string; prompt: string }> = [
    { label: "Where should the story go next?", prompt: "Where should the story go next?" },
  ];

  for (const name of names) {
    prompts.push({ label: `What's motivating ${name} right now?`, prompt: `What's motivating ${name} right now? What are they not saying?` });
  }

  prompts.push({ label: "Suggest a plot twist or complication", prompt: "Suggest a plot twist or complication." });
  prompts.push({ label: "How should I respond to what they just said?", prompt: "How should I respond to what they just said?" });
  prompts.push({ label: "What's the subtext of this last exchange?", prompt: "What's the subtext of this last exchange?" });
  prompts.push({ label: "What would be dramatically interesting here?", prompt: "What would be dramatically interesting here?" });
  prompts.push({ label: "Analyze the relationship dynamic", prompt: "Analyze the relationship dynamic — where are we?" });
  prompts.push({ label: "What themes are emerging?", prompt: "What themes are emerging from this conversation?" });

  for (const name of names) {
    prompts.push({ label: `What would ${name} be thinking but not showing?`, prompt: `What would ${name} be thinking but not showing?` });
  }

  prompts.push({ label: "How can I escalate the tension?", prompt: "How can I escalate the tension?" });
  prompts.push({ label: "How can I defuse the tension?", prompt: "How can I defuse the tension?" });
  prompts.push({ label: "Help me think of what to say next", prompt: "Help me think of what to say next." });
  prompts.push({ label: "Rate the last few exchanges", prompt: "Rate the last few exchanges — what's working, what's flat?" });
  prompts.push({ label: "What would a good editor flag?", prompt: "If this were a novel, what would a good editor flag?" });
  prompts.push({ label: "Most interesting direction I haven't considered?", prompt: "What's the most interesting direction this could take that I haven't considered?" });

  return prompts;
}

export function StoryConsultantModal({ open, onClose, apiKey, characterId, groupChatId, threadId, characterNames }: Props) {
  const [messages, setMessages] = useState<ConsultantMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const promptsRef = useRef<HTMLDivElement>(null);

  const prompts = buildPrompts(characterNames);

  // Load persisted messages when opened
  useEffect(() => {
    if (open && threadId && !loaded) {
      api.loadConsultantChat(threadId).then((msgs) => {
        setMessages(msgs as ConsultantMessage[]);
        setLoaded(true);
      }).catch(() => setLoaded(true));
    }
    if (!open) setLoaded(false);
  }, [open, threadId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) setTimeout(() => { el.scrollTop = el.scrollHeight; }, 50);
  }, [messages.length, loading, loaded]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Close prompts on outside click
  useEffect(() => {
    if (!showPrompts) return;
    const handler = (e: MouseEvent) => {
      if (promptsRef.current && !promptsRef.current.contains(e.target as Node)) {
        setShowPrompts(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPrompts]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    if (inputRef.current) inputRef.current.style.height = "auto";

    try {
      const response = await api.storyConsultant(apiKey, characterId, groupChatId, trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${e}` }]);
    } finally {
      setLoading(false);
    }
  }, [apiKey, characterId, groupChatId, loading]);

  const handleClear = async () => {
    await api.clearConsultantChat(threadId);
    setMessages([]);
    setShowClearConfirm(false);
  };

  return (<>
    <Dialog open={open} onClose={onClose} className="max-w-xl">
      <div className="flex flex-col h-[70vh] bg-card border border-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/95">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <h3 className="font-semibold text-sm">Story Consultant</h3>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer text-muted-foreground hover:text-destructive"
                title="Clear chat"
              >
                <Trash2 size={13} />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center py-12">
              <Sparkles size={28} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground/60">Ask me anything about your story.</p>
              <p className="text-xs text-muted-foreground/40 mt-1">Use the prompts below or type your own question.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary/40 text-secondary-foreground rounded-bl-md border border-border/30"
              }`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [--tw-prose-body:var(--color-secondary-foreground)] [--tw-prose-bold:var(--color-secondary-foreground)] [--tw-prose-links:var(--color-primary)]">
                    <Markdown components={markdownComponents}>{formatMessage(msg.content)}</Markdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-secondary/40 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5 border border-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-border px-4 py-3">
          <div className="flex items-end gap-2">
            {/* Quick prompts button */}
            <div className="relative" ref={promptsRef}>
              <button
                onClick={() => setShowPrompts(!showPrompts)}
                className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  showPrompts ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <ChevronDown size={16} className={`transition-transform ${showPrompts ? "rotate-180" : ""}`} />
              </button>
              {showPrompts && (
                <div className="absolute bottom-full left-0 mb-2 w-[340px] max-h-[280px] overflow-y-auto bg-card border border-border rounded-lg shadow-xl shadow-black/30 py-1">
                  {prompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setShowPrompts(false);
                        send(p.prompt);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors cursor-pointer text-foreground/80 hover:text-foreground"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                if (e.target.scrollHeight > e.target.offsetHeight) {
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about your story..."
              className="flex-1 max-h-[120px] resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              rows={1}
              disabled={loading}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-primary text-primary-foreground transition-colors cursor-pointer hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>
    </Dialog>

    {/* Clear confirmation */}
    {showClearConfirm && (
      <div className="fixed inset-0 z-[60]">
        <Dialog open onClose={() => setShowClearConfirm(false)} className="max-w-xs">
          <div className="p-5 space-y-4 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2">
              <Trash2 size={18} className="text-destructive" />
              <h3 className="font-semibold">Clear Consultant Chat</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              This will permanently delete the entire story consultant conversation.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowClearConfirm(false)}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={handleClear}>Clear</Button>
            </div>
          </div>
        </Dialog>
      </div>
    )}
  </>);
}
