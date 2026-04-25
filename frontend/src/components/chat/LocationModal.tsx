import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, X, Trash2 } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import type { Message } from "@/lib/tauri";

interface SavedPlace {
  saved_place_id: string;
  world_id: string;
  name: string;
  created_at: string;
}

interface ChatLocationResponse {
  current_location: string | null;
  message: Message | null;
  saved_place: SavedPlace | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  worldId: string;
  /// Exactly one of characterId / groupChatId should be set, matching
  /// the chat surface this modal is attached to.
  characterId?: string;
  groupChatId?: string;
  currentLocation: string | null;
  /// Called after a successful update with the new location string and
  /// the inserted location_change message (when one was inserted —
  /// null on no-op same-as-previous updates).
  onUpdated: (newLocation: string, insertedMessage: Message | null) => void;
}

/// Modal for setting / changing the current chat location. Includes:
///   - one-line input (initialized to currentLocation if set)
///   - dropdown of saved places (selecting populates input)
///   - "save this place" checkbox (DISABLED when trimmed input matches
///     any existing saved place — keeps the UNIQUE(world_id, name)
///     constraint unreachable in normal use)
export function LocationModal({
  open,
  onClose,
  worldId,
  characterId,
  groupChatId,
  currentLocation,
  onUpdated,
}: Props) {
  const [input, setInput] = useState(currentLocation ?? "");
  const [saveToLibrary, setSaveToLibrary] = useState(false);
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setInput(currentLocation ?? "");
    setSaveToLibrary(false);
    setError(null);
    invoke<SavedPlace[]>("list_saved_places_cmd", { worldId })
      .then(setPlaces)
      .catch((e) => setError(String(e)));
    setTimeout(() => inputRef.current?.focus(), 30);
  }, [open, worldId, currentLocation]);

  const trimmed = input.trim();
  const matchesSavedPlace = useMemo(
    () => trimmed.length > 0 && places.some((p) => p.name.toLowerCase() === trimmed.toLowerCase()),
    [trimmed, places],
  );

  // Auto-uncheck Save when the input matches a saved place.
  useEffect(() => {
    if (matchesSavedPlace && saveToLibrary) setSaveToLibrary(false);
  }, [matchesSavedPlace, saveToLibrary]);

  if (!open) return null;

  const handleUpdate = async () => {
    if (!trimmed) {
      setError("Location must not be empty");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await invoke<ChatLocationResponse>("set_chat_location_cmd", {
        characterId,
        groupChatId,
        location: trimmed,
        saveToLibrary,
      });
      onUpdated(trimmed, res.message ?? null);
      onClose();
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlace = async (id: string) => {
    try {
      await invoke("delete_saved_place_cmd", { savedPlaceId: id });
      setPlaces((prev) => prev.filter((p) => p.saved_place_id !== id));
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl shadow-2xl shadow-black/50 w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-emerald-400" />
            <h2 className="text-sm font-semibold">Update location</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {currentLocation && (
            <p className="text-xs text-muted-foreground">
              Currently: <span className="text-foreground/80">{currentLocation}</span>
            </p>
          )}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              New location
            </label>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) handleUpdate();
                if (e.key === "Escape") onClose();
              }}
              placeholder="Ryan's House, the porch, the kitchen table…"
              className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40"
            />
          </div>

          <label
            className={`flex items-center gap-2 text-xs ${
              matchesSavedPlace ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            title={matchesSavedPlace ? "Already in your saved places" : undefined}
          >
            <input
              type="checkbox"
              checked={saveToLibrary}
              disabled={matchesSavedPlace}
              onChange={(e) => setSaveToLibrary(e.target.checked)}
              className="rounded border-border cursor-pointer disabled:cursor-not-allowed"
            />
            <span>Save this place to your world's library</span>
          </label>

          {places.length > 0 && (
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                Saved places
              </label>
              <div className="max-h-40 overflow-y-auto rounded-md border border-border/50 divide-y divide-border/40">
                {places.map((p) => (
                  <div
                    key={p.saved_place_id}
                    className="group flex items-center justify-between px-3 py-1.5 text-sm hover:bg-accent/40 transition-colors"
                  >
                    <button
                      onClick={() => setInput(p.name)}
                      className="flex-1 text-left cursor-pointer text-foreground/85 hover:text-foreground"
                    >
                      {p.name}
                    </button>
                    <button
                      onClick={() => handleDeletePlace(p.saved_place_id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1 cursor-pointer"
                      title="Remove from saved places"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border/50 bg-card/40">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading || !trimmed}
            className="px-4 py-1.5 text-sm font-medium rounded-md bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {loading ? "Updating…" : "Update Location"}
          </button>
        </div>
      </div>
    </div>
  );
}
