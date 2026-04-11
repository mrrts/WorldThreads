import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { api, type PortraitInfo } from "@/lib/tauri";

interface Props {
  characterId: string | null;
  characterName?: string;
  onClose: () => void;
}

export function PortraitModal({ characterId, characterName, onClose }: Props) {
  const [portraits, setPortraits] = useState<PortraitInfo[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!characterId) return;
    (async () => {
      const all = await api.listPortraits(characterId);
      setPortraits(all);
      const activeIdx = all.findIndex((p) => p.is_active);
      setSelectedIdx(activeIdx >= 0 ? activeIdx : 0);
    })();
  }, [characterId]);

  const selected = portraits[selectedIdx];

  const prev = () => setSelectedIdx((i) => (i - 1 + portraits.length) % portraits.length);
  const next = () => setSelectedIdx((i) => (i + 1) % portraits.length);

  if (!selected?.data_url) return null;

  return (
    <Dialog open={!!characterId} onClose={onClose} className="max-w-md">
      <div className="relative">
        <img
          src={selected.data_url}
          alt={characterName}
          className="w-full rounded-2xl shadow-2xl shadow-black/50"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer backdrop-blur-sm"
        >
          <X size={16} />
        </button>

        {portraits.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
          <p className="text-white font-semibold text-lg">{characterName}</p>
        </div>
      </div>

      {portraits.length > 1 && (
        <div className="flex gap-1.5 justify-center mt-3 px-3 pb-1 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          {portraits.map((p, i) => (
            <button
              key={p.portrait_id}
              onClick={() => setSelectedIdx(i)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all cursor-pointer ${
                i === selectedIdx
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
      )}
    </Dialog>
  );
}
