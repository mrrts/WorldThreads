import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCw, ScrollText } from "lucide-react";
import { api, type KeptRecord, type Character, type Message, type UserProfile, type World } from "@/lib/tauri";

type SubjectOption =
  | { type: "character"; id: string; label: string }
  | { type: "user"; id: string; label: string }; // id = world_id

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
  const speakerChar = useMemo(() => {
    if (!sourceMessage) return null;
    if (sourceMessage.role === "user") return null;
    if (sourceMessage.sender_character_id) {
      return characters.find((c) => c.character_id === sourceMessage.sender_character_id) ?? null;
    }
    // Solo chat — fall back to first character in this chat
    return characters[0] ?? null;
  }, [sourceMessage, characters]);

  // Available subjects: every character + the user. Weaving is the only
  // mode this modal supports, so subjects are limited to entities that
  // HAVE a description to revise (characters, user — not the world).
  const subjects: SubjectOption[] = useMemo(() => {
    const out: SubjectOption[] = characters.map((c) => ({ type: "character", id: c.character_id, label: c.display_name }));
    if (world && userProfile) {
      out.push({ type: "user", id: world.world_id, label: `${userProfile.display_name || "Me"} (you)` });
    }
    return out;
  }, [characters, world, userProfile]);

  // Default subject: speaker for assistant messages; user for user messages.
  const [subjectKey, setSubjectKey] = useState<string>("");
  useEffect(() => {
    if (!open || !sourceMessage) return;
    if (sourceMessage.role === "user") {
      const userOpt = subjects.find((s) => s.type === "user");
      if (userOpt) setSubjectKey(`${userOpt.type}:${userOpt.id}`);
    } else if (speakerChar) {
      setSubjectKey(`character:${speakerChar.character_id}`);
    } else if (subjects[0]) {
      setSubjectKey(`${subjects[0].type}:${subjects[0].id}`);
    }
  }, [open, sourceMessage, speakerChar, subjects]);

  const selectedSubject = useMemo(
    () => subjects.find((s) => `${s.type}:${s.id}` === subjectKey) ?? null,
    [subjects, subjectKey]
  );

  const [content, setContent] = useState("");
  const [userNote, setUserNote] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [loadingWeave, setLoadingWeave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Staleness token for runWeave. When the user changes the "Record is
  // about" dropdown quickly, two weave calls race; without this token
  // the older call's response can land AFTER the newer one and
  // overwrite the display with the wrong character's description.
  const weaveToken = useRef(0);

  // Reset per open
  useEffect(() => {
    if (!open) {
      setContent("");
      setUserNote("");
      setCurrentDescription("");
      setError(null);
      setSaving(false);
    }
  }, [open]);

  // Auto-run weave when subject changes
  useEffect(() => {
    if (!open || !sourceMessage || !selectedSubject) return;
    runWeave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedSubject?.type, selectedSubject?.id]);

  async function runWeave() {
    if (!sourceMessage || !selectedSubject) return;
    const myToken = ++weaveToken.current;
    const targetType = selectedSubject.type;
    const targetId = selectedSubject.id;
    setLoadingWeave(true);
    setError(null);
    try {
      const res = await api.proposeKeptWeave(apiKey, {
        sourceMessageId: sourceMessage.message_id,
        subjectType: targetType,
        subjectId: targetId,
      });
      // Bail if a newer weave was kicked off while this one was in
      // flight — the newer call's target is the one the user is
      // actually looking at.
      if (weaveToken.current !== myToken) return;
      setCurrentDescription(res.current_description);
      setContent(res.proposed_description);
    } catch (e) {
      if (weaveToken.current !== myToken) return;
      setError(String(e));
    } finally {
      if (weaveToken.current === myToken) setLoadingWeave(false);
    }
  }

  async function handleSave() {
    if (!sourceMessage || !selectedSubject) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await api.saveKeptRecord({
        sourceMessageId: sourceMessage.message_id,
        subjectType: selectedSubject.type,
        subjectId: selectedSubject.id,
        recordType: "description_weave",
        content,
        userNote,
      });
      onSaved({ entry: saved, subjectLabel: selectedSubject.label });
      onOpenChange(false);
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  if (!open || !sourceMessage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-2xl my-8 bg-card border border-border rounded-xl shadow-2xl shadow-black/40 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2">
            <ScrollText size={18} className="text-primary" />
            <h2 className="text-base font-semibold">Weave this moment into the description</h2>
          </div>

          {/* Source message preview */}
          <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
              Source — {sourceSpeakerLabel}
              {sourceMessage.world_day != null && sourceMessage.world_time ? (
                <span> · Day {sourceMessage.world_day}, {sourceMessage.world_time}</span>
              ) : null}
            </div>
            <div className="text-sm whitespace-pre-wrap line-clamp-6">{sourceMessage.content}</div>
          </div>

          {/* Target subject */}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Whose description should this weave into?</label>
            <select
              value={subjectKey}
              onChange={(e) => setSubjectKey(e.target.value)}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {subjects.map((s) => (
                <option key={`${s.type}:${s.id}`} value={`${s.type}:${s.id}`}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Proposed revised description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted-foreground">Proposed revised description</label>
              <button
                onClick={runWeave}
                disabled={loadingWeave}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 cursor-pointer"
              >
                {loadingWeave ? <Loader2 size={12} className="animate-spin" /> : <RotateCw size={12} />}
                <span>{loadingWeave ? "Weaving..." : "Regenerate"}</span>
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder={loadingWeave ? "Weaving..." : ""}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
            />
          </div>

          {/* Diff — current vs proposed */}
          {currentDescription && (
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground select-none">Show current description</summary>
              <div className="mt-2 rounded-lg border border-border/60 bg-secondary/20 p-3 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                {currentDescription}
              </div>
            </details>
          )}

          {/* User note */}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Optional note (why this matters to you)</label>
            <input
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="A private note stored with the record."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 text-destructive text-xs p-2">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || loadingWeave || !content.trim()}>
              {(saving || loadingWeave) ? <Loader2 size={14} className="animate-spin mr-1.5" /> : null}
              {saving ? "Saving..." : loadingWeave ? "Loading preview..." : "Keep it"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
