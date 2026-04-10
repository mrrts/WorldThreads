import { useState, useEffect, useRef } from "react";
import { api, type PortraitInfo } from "@/lib/tauri";

interface Props {
  characterId: string;
}

export function PortraitPopout({ characterId }: Props) {
  const [portraits, setPortraits] = useState<PortraitInfo[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState("");
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const [allPortraits, ch] = await Promise.all([
          api.listPortraits(characterId),
          api.getCharacter(characterId),
        ]);
        setPortraits(allPortraits);
        const active = allPortraits.find((p) => p.is_active);
        setSelectedId(active?.portrait_id ?? allPortraits[0]?.portrait_id ?? null);
        setCharacterName(ch.display_name);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [characterId]);

  const selected = portraits.find((p) => p.portrait_id === selectedId);

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-2xl">...</div>
      </div>
    );
  }

  if (!selected?.data_url) {
    return (
      <div className="h-screen bg-background flex items-center justify-center text-muted-foreground text-sm">
        No portrait available
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div
        data-tauri-drag-region
        className="h-8 flex-shrink-0 flex items-center pl-[72px] pr-3 bg-card border-b border-border select-none"
      >
        <span className="text-xs text-muted-foreground truncate">{characterName}</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-2 min-h-0">
        <img
          src={selected.data_url}
          alt={characterName}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
      {portraits.length > 1 && (
        <div className="flex-shrink-0 border-t border-border bg-card/50 px-2 py-2">
          <div
            ref={carouselRef}
            className="flex gap-1.5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
          >
            {portraits.map((p) => (
              <button
                key={p.portrait_id}
                onClick={() => setSelectedId(p.portrait_id)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all cursor-pointer ${
                  p.portrait_id === selectedId
                    ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                    : "ring-1 ring-border opacity-60 hover:opacity-100"
                }`}
              >
                {p.data_url ? (
                  <img src={p.data_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
