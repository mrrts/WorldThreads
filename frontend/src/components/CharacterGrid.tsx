import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Settings2, Plus } from "lucide-react";
import type { useAppStore } from "@/hooks/use-app-store";

interface Props {
  store: ReturnType<typeof useAppStore>;
  onChat: (characterId: string) => void;
  onSettings: (characterId: string) => void;
}

export function CharacterGrid({ store, onChat, onSettings }: Props) {
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");

  const submitNew = async () => {
    if (!newName.trim()) return;
    await store.createCharacter(newName.trim());
    setNewName("");
    setShowNew(false);
  };

  if (!store.activeWorld) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <p>Select a world first</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-lg">Characters</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{store.activeWorld.name}</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => { setNewName(""); setShowNew(true); }}>
          <Plus size={14} className="mr-1.5" /> New Character
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 max-w-4xl">
          {store.characters.map((ch) => {
            const portrait = store.activePortraits[ch.character_id];
            return (
              <div
                key={ch.character_id}
                className="bg-card/50 border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-4 p-4">
                  {portrait?.data_url ? (
                    <img
                      src={portrait.data_url}
                      alt=""
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-border flex-shrink-0"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full flex-shrink-0 ring-2 ring-white/10"
                      style={{ backgroundColor: ch.avatar_color }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{ch.display_name}</h3>
                    {ch.identity && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-3 leading-relaxed">
                        {ch.identity.slice(0, 120)}{ch.identity.length > 120 ? "..." : ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex border-t border-border">
                  <button
                    onClick={() => onChat(ch.character_id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer border-r border-border"
                  >
                    <MessageSquare size={14} />
                    Chat
                  </button>
                  <button
                    onClick={() => onSettings(ch.character_id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <Settings2 size={14} />
                    Settings
                  </button>
                </div>
              </div>
            );
          })}

          {store.characters.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <p className="text-sm">No characters yet</p>
              <p className="text-xs mt-1">Create your first character to get started</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <Dialog open={showNew} onClose={() => setShowNew(false)}>
        <DialogContent>
          <DialogHeader onClose={() => setShowNew(false)}>
            <DialogTitle>Add a Character</DialogTitle>
            <DialogDescription>Name your new character. You can flesh out their details later.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Input
              autoFocus
              placeholder="e.g. Mara, Ion, Wren..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submitNew(); }}
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
            <Button onClick={submitNew} disabled={!newName.trim()}>Add Character</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
