import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ImagePlus, Upload, Loader2, Maximize2, Globe, User, Users } from "lucide-react";
import type { useAppStore } from "@/hooks/use-app-store";
import { api, type GalleryItem } from "@/lib/tauri";

interface Props {
  store: ReturnType<typeof useAppStore>;
}

const CATEGORY_META: Record<string, { icon: React.ReactNode; title: string }> = {
  world: { icon: <Globe size={14} />, title: "World Images" },
  character: { icon: <Users size={14} />, title: "Character Portraits" },
  user: { icon: <User size={14} />, title: "Your Avatar" },
};

export function Gallery({ store }: Props) {
  const worldId = store.activeWorld?.world_id;
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadGallery = useCallback(async () => {
    if (!worldId) return;
    try {
      setItems(await api.listWorldGallery(worldId));
    } catch {}
  }, [worldId]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery, store.activeWorldImage?.image_id, store.activePortraits, store.userProfile?.avatar_file]);

  if (!store.activeWorld) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-lg">No world selected</p>
          <p className="text-sm text-muted-foreground/60">Create or select a world to view its gallery</p>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!worldId || !store.apiKey || !prompt.trim()) return;
    setGenerating(true);
    try {
      await api.generateWorldImageWithPrompt(store.apiKey, worldId, prompt.trim());
      setPrompt("");
      await loadGallery();
    } catch (e: any) {
      store.setError(String(e));
    } finally {
      setGenerating(false);
    }
  };

  const handleUpload = () => fileInputRef.current?.click();

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !worldId) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl: string = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      await api.uploadWorldImage(worldId, dataUrl, file.name);
      await loadGallery();
    } catch (e: any) {
      store.setError(String(e));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const worldItems = items.filter((i) => i.category === "world");
  const charItems = items.filter((i) => i.category === "character");
  const userItems = items.filter((i) => i.category === "user");
  const sections = [
    { key: "world", items: worldItems },
    { key: "character", items: charItems },
    { key: "user", items: userItems },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Gallery</h1>
          <span className="text-xs text-muted-foreground/50">
            {store.activeWorld.name} — {items.length} image{items.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Upload size={14} className="mr-1.5" />}
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileSelected}
      />

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8 max-w-4xl">
          {/* Generate section */}
          <div className="rounded-xl border border-border bg-card/50 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <ImagePlus size={16} className="text-primary" />
              <h2 className="text-sm font-medium">Generate New Image</h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Describe the scene you want. Images are generated at 1792×1024 in watercolor style — large enough for chat backgrounds.
            </p>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A misty harbor at dawn, fishing boats rocking gently, warm lantern light reflecting off still water..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground/50">
                Uses DALL-E 3 • 1792×1024
              </span>
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={generating || !prompt.trim() || !store.apiKey}
              >
                {generating ? (
                  <><Loader2 size={14} className="mr-1.5 animate-spin" /> Generating...</>
                ) : (
                  <><ImagePlus size={14} className="mr-1.5" /> Generate</>
                )}
              </Button>
            </div>
          </div>

          {/* Grouped image grid */}
          {items.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground/60">
              <ImagePlus size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No images yet</p>
              <p className="text-xs mt-1">Generate or upload an image, create character portraits, or set a user avatar</p>
            </div>
          ) : (
            sections.map(({ key, items: sectionItems }) => {
              const meta = CATEGORY_META[key];
              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {meta.icon}
                    <h3 className="text-xs font-semibold uppercase tracking-wider">{meta.title}</h3>
                    <span className="text-[10px] text-muted-foreground/50">({sectionItems.length})</span>
                  </div>
                  <div className={`grid gap-4 ${key === "user" ? "grid-cols-4" : "grid-cols-2"}`}>
                    {sectionItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative rounded-xl overflow-hidden border border-border bg-card/30"
                      >
                        {item.data_url ? (
                          <img
                            src={item.data_url}
                            alt=""
                            className={`w-full object-cover ${key === "character" || key === "user" ? "aspect-square" : "aspect-video"}`}
                          />
                        ) : (
                          <div className={`w-full bg-muted flex items-center justify-center text-muted-foreground/30 text-xs ${key === "character" || key === "user" ? "aspect-square" : "aspect-video"}`}>
                            Missing
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 text-xs"
                            onClick={() => setPreviewItem(item)}
                          >
                            <Maximize2 size={12} className="mr-1" /> View
                          </Button>
                        </div>

                        {/* Info bar */}
                        <div className="p-2.5 space-y-0.5">
                          <p className="text-xs text-foreground/80 font-medium truncate">{item.label}</p>
                          {item.prompt && (
                            <p className="text-[11px] text-muted-foreground/60 line-clamp-1">{item.prompt}</p>
                          )}
                          <p className="text-[10px] text-muted-foreground/40">
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Full-size preview modal */}
      {previewItem && (
        <Dialog open onClose={() => setPreviewItem(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader onClose={() => setPreviewItem(null)}>
              <DialogTitle>{previewItem.label}</DialogTitle>
              {previewItem.prompt && (
                <DialogDescription>{previewItem.prompt}</DialogDescription>
              )}
            </DialogHeader>
            <div className="p-2">
              {previewItem.data_url && (
                <img
                  src={previewItem.data_url}
                  alt=""
                  className="w-full rounded-lg"
                />
              )}
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-xs text-muted-foreground">
                  {previewItem.category === "world" ? previewItem.label : `${CATEGORY_META[previewItem.category]?.title}`} · {new Date(previewItem.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
