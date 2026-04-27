import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Compass, Loader2, Check, X, RotateCcw, Trash2, Plus } from "lucide-react";
import { api, type Quest } from "@/lib/tauri";
import { QuestAcceptanceDialog } from "@/components/chat/QuestAcceptanceDialog";

/// Read-oriented view over a world's quests — active, completed, and
/// abandoned. Completion and abandonment are ceremonies of their own
/// (each with a short reflection), not one-tap actions. Completed and
/// abandoned quests stay visible as part of the accumulated history,
/// not archived to silence.
interface Props {
  open: boolean;
  onClose: () => void;
  worldId: string;
  worldName: string;
}

type Section = "active" | "completed" | "abandoned";

export function QuestsModal({ open, onClose, worldId, worldName }: Props) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<Section>("active");
  const [showNewQuest, setShowNewQuest] = useState(false);
  const [closingQuest, setClosingQuest] = useState<{ quest: Quest; kind: "complete" | "abandon" } | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesBuffer, setNotesBuffer] = useState("");

  const load = useCallback(async () => {
    if (!worldId) return;
    setLoading(true);
    try {
      const all = await api.listQuests(worldId);
      setQuests(all);
    } finally {
      setLoading(false);
    }
  }, [worldId]);

  useEffect(() => {
    if (open) { load(); }
  }, [open, load]);

  const active = quests.filter((q) => !q.completed_at && !q.abandoned_at);
  const completed = quests.filter((q) => !!q.completed_at);
  const abandoned = quests.filter((q) => !!q.abandoned_at);
  const visible = section === "active" ? active : section === "completed" ? completed : abandoned;

  const onReopen = async (id: string) => {
    try { await api.reopenQuest(id); await load(); setSection("active"); }
    catch (e) { console.error(e); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this quest entirely? This removes it from the accumulated history — prefer Abandon if you want to keep the record of having tried.")) return;
    try { await api.deleteQuest(id); await load(); }
    catch (e) { console.error(e); }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className="max-w-3xl">
        <DialogContent>
          <DialogHeader onClose={onClose}>
            <DialogTitle>
              <Compass size={16} className="inline mr-2 text-amber-400" />
              Quests in {worldName}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex rounded-lg overflow-hidden border border-border/60 bg-background/40">
                {(["active", "completed", "abandoned"] as Section[]).map((s) => {
                  const count = s === "active" ? active.length : s === "completed" ? completed.length : abandoned.length;
                  const isActive = section === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSection(s)}
                      className={`px-4 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer ${isActive ? "bg-amber-500/15 text-amber-300" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}
                    >
                      {s} {count > 0 && <span className="opacity-70">({count})</span>}
                    </button>
                  );
                })}
              </div>
              <Button size="sm" onClick={() => setShowNewQuest(true)}>
                <Plus size={12} className="mr-1.5" />
                New quest
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
                <Loader2 size={16} className="animate-spin mr-2" />
                Loading…
              </div>
            ) : visible.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground/70 italic">
                {section === "active" && "No active quests. Ask Backstage what's worth reaching for, or start one yourself."}
                {section === "completed" && "No completed quests yet."}
                {section === "abandoned" && "No abandoned quests. (An abandoned quest is an honest act, not a failure.)"}
              </div>
            ) : (
              <div className="space-y-3 max-h-[58vh] overflow-y-auto pr-1">
                {visible.map((q) => (
                  <div key={q.quest_id} className={`rounded-xl border p-4 ${
                    q.completed_at ? "border-emerald-500/30 bg-emerald-500/5" :
                    q.abandoned_at ? "border-border/40 bg-muted/20" :
                    "border-amber-400/30 bg-amber-500/5"
                  }`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground/95">{q.title}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                          Accepted{q.accepted_world_day !== null ? ` · Day ${q.accepted_world_day}` : ""}
                          {q.completed_at && q.completed_world_day !== null && ` · Completed Day ${q.completed_world_day}`}
                          {q.abandoned_at && q.abandoned_world_day !== null && ` · Abandoned Day ${q.abandoned_world_day}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!q.completed_at && !q.abandoned_at && (
                          <>
                            <button
                              onClick={() => setClosingQuest({ quest: q, kind: "complete" })}
                              className="text-[11px] px-2 py-1 rounded border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                              title="Mark this quest complete"
                            >
                              <Check size={11} className="inline mr-1" />Complete
                            </button>
                            <button
                              onClick={() => setClosingQuest({ quest: q, kind: "abandon" })}
                              className="text-[11px] px-2 py-1 rounded border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
                              title="Abandon this quest (an honest act, not a failure)"
                            >
                              <X size={11} className="inline mr-1" />Abandon
                            </button>
                          </>
                        )}
                        {(q.completed_at || q.abandoned_at) && (
                          <>
                            <button
                              onClick={() => onReopen(q.quest_id)}
                              className="text-[11px] px-2 py-1 rounded border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
                              title="Reopen — brings it back to active"
                            >
                              <RotateCcw size={11} className="inline mr-1" />Reopen
                            </button>
                            <button
                              onClick={() => onDelete(q.quest_id)}
                              className="text-[11px] px-2 py-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 cursor-pointer"
                              title="Delete entirely (removes from history — prefer Reopen/Abandon)"
                            >
                              <Trash2 size={11} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed mb-2">{q.description}</p>
                    {q.completion_note && (
                      <div className="mt-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 p-2.5">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 mb-1">How it landed</p>
                        <p className="text-sm text-foreground/85 whitespace-pre-wrap italic">{q.completion_note}</p>
                      </div>
                    )}
                    {q.abandonment_note && (
                      <div className="mt-2 rounded-md bg-muted/30 border border-border/40 p-2.5">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Why I let it go</p>
                        <p className="text-sm text-foreground/80 whitespace-pre-wrap italic">{q.abandonment_note}</p>
                      </div>
                    )}
                    {!q.completed_at && !q.abandoned_at && (
                      <div className="mt-2">
                        {editingNotesId === q.quest_id ? (
                          <div className="space-y-1.5">
                            <Textarea
                              value={notesBuffer}
                              onChange={(e) => setNotesBuffer(e.target.value)}
                              className="min-h-[70px] text-sm"
                              placeholder="Running notes — what's happened with this quest so far."
                            />
                            <div className="flex items-center gap-1.5 justify-end">
                              <Button size="sm" variant="ghost" onClick={() => { setEditingNotesId(null); setNotesBuffer(""); }}>Cancel</Button>
                              <Button size="sm" onClick={async () => {
                                await api.updateQuestNotes(q.quest_id, notesBuffer);
                                setEditingNotesId(null);
                                setNotesBuffer("");
                                await load();
                              }}>Save notes</Button>
                            </div>
                          </div>
                        ) : q.notes ? (
                          <button
                            onClick={() => { setEditingNotesId(q.quest_id); setNotesBuffer(q.notes); }}
                            className="w-full text-left rounded-md bg-background/40 border border-border/40 p-2.5 hover:bg-background/60 transition-colors cursor-pointer"
                          >
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Notes (click to edit)</p>
                            <p className="text-sm text-foreground/80 whitespace-pre-wrap">{q.notes}</p>
                          </button>
                        ) : (
                          <button
                            onClick={() => { setEditingNotesId(q.quest_id); setNotesBuffer(""); }}
                            className="text-[11px] text-muted-foreground/70 hover:text-foreground italic cursor-pointer"
                          >
                            + Add running notes
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>

      {showNewQuest && (
        <QuestAcceptanceDialog
          worldId={worldId}
          initialTitle=""
          initialDescription=""
          originKind="user_authored"
          onClose={() => setShowNewQuest(false)}
          onAccepted={() => { setShowNewQuest(false); load(); setSection("active"); }}
        />
      )}

      {closingQuest && (
        <QuestClosingDialog
          quest={closingQuest.quest}
          kind={closingQuest.kind}
          onClose={() => setClosingQuest(null)}
          onClosed={async () => { setClosingQuest(null); await load(); }}
        />
      )}
    </>
  );
}

/// Completion / abandonment ceremony. Both terminal acts get their own
/// reflection note; the record is kept visibly in the world's history.
function QuestClosingDialog({
  quest,
  kind,
  onClose,
  onClosed,
}: {
  quest: Quest;
  kind: "complete" | "abandon";
  onClose: () => void;
  onClosed: () => void;
}) {
  const [note, setNote] = useState("");
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCommit = async () => {
    if (committing) return;
    setCommitting(true);
    setError(null);
    try {
      if (kind === "complete") {
        await api.completeQuest(quest.quest_id, note.trim());
      } else {
        await api.abandonQuest(quest.quest_id, note.trim());
      }
      onClosed();
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
            {kind === "complete" ? (
              <><Check size={16} className="inline mr-2 text-emerald-400" />Complete this quest?</>
            ) : (
              <><X size={16} className="inline mr-2 text-muted-foreground" />Let this quest go?</>
            )}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-3">
          <p className="text-sm font-medium text-foreground/95">{quest.title}</p>
          <p className="text-xs text-muted-foreground italic leading-relaxed">
            {kind === "complete"
              ? "Completion is named, not detected. One sentence about how this landed — what happened, what changed, what was earned. It becomes part of the world's history."
              : "Abandoning is an honest act, not a failure. One sentence about why you're letting this go. It becomes part of the world's history too."}
          </p>
          <Textarea
            className="min-h-[100px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={kind === "complete"
              ? "How it landed — plainspoken. What actually happened."
              : "Why you're letting it go — plainspoken. Not an apology."}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={committing}>Never mind</Button>
          <Button
            onClick={onCommit}
            disabled={committing}
            className={kind === "complete" ? "bg-emerald-500/90 hover:bg-emerald-500 text-black" : ""}
          >
            {committing ? <Loader2 size={14} className="animate-spin mr-1.5" /> : (kind === "complete" ? <Check size={14} className="mr-1.5" /> : <X size={14} className="mr-1.5" />)}
            {kind === "complete" ? "Mark complete" : "Let it go"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
