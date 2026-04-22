import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCw, ScrollText, Sparkles } from "lucide-react";
import {
  api,
  type KeptRecord,
  type Character,
  type Message,
  type UserProfile,
  type World,
  type ProposedCanonUpdate,
  type AppliedCanonUpdate,
  type CanonKind,
} from "@/lib/tauri";

/// Props kept compatible with the previous modal so existing callers
/// (ChatView, GroupChatView, NarrativeMessage) don't need to change.
/// `onSaved` now fires once per applied update — one row per kind, as
/// before, so toast/notification logic still works per-record.
export function KeepRecordModal({
  open,
  onOpenChange,
  sourceMessage,
  sourceSpeakerLabel,
  world,
  userProfile,
  characters,
  apiKey,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceMessage: Message | null;
  sourceSpeakerLabel: string;
  world: World | null;
  userProfile: UserProfile | null;
  characters: Character[];
  apiKey: string;
  onSaved: (saved: { entry: KeptRecord; subjectLabel: string }) => void;
}) {
  // Unused in the auto flow but kept to satisfy the prop signature.
  void world;
  void userProfile;
  void characters;

  type Phase = "idle" | "proposing" | "preview" | "committing" | "applied";
  const [phase, setPhase] = useState<Phase>("idle");
  const [userHint, setUserHint] = useState("");
  const [userNote, setUserNote] = useState("");
  const [proposals, setProposals] = useState<ProposedCanonUpdate[]>([]);
  const [applied, setApplied] = useState<AppliedCanonUpdate[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Reset modal state each time it opens or closes.
  useEffect(() => {
    if (!open) {
      setPhase("idle");
      setUserHint("");
      setUserNote("");
      setProposals([]);
      setApplied([]);
      setError(null);
    }
  }, [open]);

  async function runPropose() {
    if (!sourceMessage) return;
    setPhase("proposing");
    setError(null);
    try {
      const got = await api.proposeAutoCanon(apiKey, {
        sourceMessageId: sourceMessage.message_id,
        userHint: userHint.trim() || undefined,
      });
      setProposals(got);
      setPhase("preview");
    } catch (e) {
      setError(String(e));
      setPhase("idle");
    }
  }

  async function runCommit() {
    if (!sourceMessage) return;
    // Strip proposals whose content was cleared — the user effectively
    // removed them from the batch by emptying the field.
    const cleaned = proposals
      .map((p) => ({ ...p, new_content: p.new_content.trim() }))
      .filter((p) => p.new_content.length > 0);
    if (cleaned.length === 0) {
      setError("All proposed updates are empty — edit content or regenerate.");
      return;
    }
    setPhase("committing");
    setError(null);
    try {
      const got = await api.commitAutoCanon({
        sourceMessageId: sourceMessage.message_id,
        updates: cleaned,
        userNote: userNote.trim() || undefined,
      });
      setApplied(got);
      setPhase("applied");
      // Fire onSaved per applied update so the parent's toast/log logic
      // (which expects one call per saved KeptRecord) keeps working.
      for (const a of got) {
        onSaved({
          entry: {
            kept_id: a.kept_id,
            source_message_id: sourceMessage.message_id,
            source_thread_id: null,
            source_world_day: null,
            source_created_at: null,
            subject_type: a.subject_type,
            subject_id: a.subject_id,
            record_type: a.kind,
            content: a.new_content,
            user_note: "",
            created_at: new Date().toISOString(),
          },
          subjectLabel: a.subject_label,
        });
      }
    } catch (e) {
      setError(String(e));
      setPhase("preview");
    }
  }

  function updateProposalAt(i: number, patch: Partial<ProposedCanonUpdate>) {
    setProposals((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }

  if (!open || !sourceMessage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-2xl my-8 bg-card border border-border rounded-xl shadow-2xl shadow-black/40 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2">
            <ScrollText size={18} className="text-primary" />
            <h2 className="text-base font-semibold">
              {phase === "applied" ? "Canonized" : "Canonize this moment"}
            </h2>
          </div>

          {/* Source message preview — shown in every phase */}
          <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
              Source — {sourceSpeakerLabel}
              {sourceMessage.world_day != null && sourceMessage.world_time ? (
                <span> · Day {sourceMessage.world_day}, {sourceMessage.world_time}</span>
              ) : null}
            </div>
            <div className="text-sm whitespace-pre-wrap line-clamp-6">{sourceMessage.content}</div>
          </div>

          {/* Phase: idle — collect optional hint + fire propose */}
          {phase === "idle" && (
            <>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                  Optional hint for the classifier
                </label>
                <textarea
                  value={userHint}
                  onChange={(e) => setUserHint(e.target.value)}
                  rows={2}
                  placeholder={`e.g. "add this as a boundary for Darren" or "remember Anna likes her coffee with a splash of cream, no sugar"`}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
                />
                <div className="text-[11px] text-muted-foreground/70 mt-1">
                  Steers the LLM's choice of update type and subject. Leave blank to let it decide.
                </div>
              </div>
            </>
          )}

          {/* Phase: proposing / committing — spinner states */}
          {(phase === "proposing" || phase === "committing") && (
            <div className="flex items-center justify-center py-8 gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              <span>{phase === "proposing" ? "Classifying the moment…" : "Applying updates…"}</span>
            </div>
          )}

          {/* Phase: preview — show proposed updates, editable */}
          {phase === "preview" && proposals.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">
                {proposals.length === 1
                  ? "The classifier proposed 1 update. Edit the content below if you want to tweak it, then Commit."
                  : `The classifier proposed ${proposals.length} updates. Edit any content below if you want to tweak it, then Commit.`}
              </div>
              {proposals.map((p, i) => (
                <ProposalCard
                  key={i}
                  proposal={p}
                  onContentChange={(next) => updateProposalAt(i, { new_content: next })}
                />
              ))}
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                  Optional note (why this matters to you — stored on every record)
                </label>
                <input
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="A private note stored with each kept record."
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          )}

          {/* Phase: applied — final report */}
          {phase === "applied" && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                {applied.length === 1 ? "1 update applied:" : `${applied.length} updates applied:`}
              </div>
              {applied.map((a) => (
                <AppliedCard key={a.kept_id} applied={a} />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 text-destructive text-xs p-2">
              {error}
            </div>
          )}

          {/* Actions — phase-dependent */}
          <div className="flex items-center justify-end gap-2 pt-1">
            {phase === "idle" && (
              <>
                <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={runPropose} disabled={!apiKey}>
                  <Sparkles size={14} className="mr-1.5" />
                  Canonize
                </Button>
              </>
            )}
            {phase === "preview" && (
              <>
                <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button variant="outline" onClick={runPropose}>
                  <RotateCw size={14} className="mr-1.5" />
                  Regenerate
                </Button>
                <Button onClick={runCommit}>Commit</Button>
              </>
            )}
            {phase === "applied" && (
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/// Render one proposed update with edit controls that match the
/// CharacterEditor shape for that kind:
/// - description_weave → big textarea (with "before" collapsible)
/// - voice_rule / boundary / known_fact / open_loop → single-line input
function ProposalCard({
  proposal,
  onContentChange,
}: {
  proposal: ProposedCanonUpdate;
  onContentChange: (next: string) => void;
}) {
  const label = KIND_LABEL[proposal.kind];
  const isWeave = proposal.kind === "description_weave";
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/20 p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 border border-primary/30 rounded px-1.5 py-0.5">
            {label}
          </span>
          <span className="text-xs text-muted-foreground">for {proposal.subject_label}</span>
        </div>
      </div>
      {proposal.justification && (
        <div className="text-[11px] text-muted-foreground italic leading-snug">
          {proposal.justification}
        </div>
      )}
      {isWeave ? (
        <>
          <textarea
            value={proposal.new_content}
            onChange={(e) => onContentChange(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
          />
          {proposal.prior_content && proposal.prior_content.trim() && (
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground select-none">
                Show current description (before)
              </summary>
              <div className="mt-2 rounded-lg border border-border/60 bg-secondary/10 p-2 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                {proposal.prior_content}
              </div>
            </details>
          )}
        </>
      ) : (
        <input
          value={proposal.new_content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
      )}
    </div>
  );
}

/// Applied-state row — read-only summary of what just happened.
function AppliedCard({ applied }: { applied: AppliedCanonUpdate }) {
  const label = KIND_LABEL[applied.kind];
  const isWeave = applied.kind === "description_weave";
  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded px-1.5 py-0.5">
          {label}
        </span>
        <span className="text-xs text-muted-foreground">for {applied.subject_label}</span>
      </div>
      {isWeave ? (
        <>
          <div className="text-sm whitespace-pre-wrap">{applied.new_content}</div>
          {applied.prior_content && applied.prior_content.trim() && (
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground select-none">
                Show before
              </summary>
              <div className="mt-1.5 text-muted-foreground/80 whitespace-pre-wrap max-h-32 overflow-y-auto">
                {applied.prior_content}
              </div>
            </details>
          )}
        </>
      ) : (
        <div className="text-sm">{applied.new_content}</div>
      )}
    </div>
  );
}

const KIND_LABEL: Record<CanonKind, string> = {
  description_weave: "Description",
  voice_rule: "Voice rule",
  boundary: "Boundary",
  known_fact: "Known fact",
  open_loop: "Open loop",
};
