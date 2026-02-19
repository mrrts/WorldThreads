import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Field, FieldGroup } from "@/components/ui/field";
import { Save, Plus, X, User, ImagePlus, Upload, Loader2 } from "lucide-react";
import type { useAppStore } from "@/hooks/use-app-store";
import { api, type UserProfile } from "@/lib/tauri";

interface Props {
  store: ReturnType<typeof useAppStore>;
}

export function UserProfileEditor({ store }: Props) {
  const worldId = store.activeWorld?.world_id;
  const existing = store.userProfile;

  const [form, setForm] = useState({
    display_name: "",
    description: "",
    facts: [] as string[],
  });
  const [dirty, setDirty] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existing) {
      setForm({
        display_name: existing.display_name,
        description: existing.description,
        facts: [...(existing.facts ?? [])],
      });
    } else {
      setForm({ display_name: "Me", description: "", facts: [] });
    }
    setDirty(false);
  }, [existing, worldId]);

  useEffect(() => {
    if (!worldId) return;
    api.getUserAvatar(worldId).then((url) => setAvatarUrl(url || ""));
  }, [worldId, existing?.avatar_file]);

  const handleGenerate = async () => {
    if (!worldId) return;
    setGenerating(true);
    try {
      const key = store.apiKey;
      const dataUrl = await api.generateUserAvatar(key, worldId);
      setAvatarUrl(dataUrl);
      await store.loadUserProfile(worldId);
    } catch (e: any) {
      console.error("Failed to generate avatar:", e);
    } finally {
      setGenerating(false);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

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
      const result = await api.uploadUserAvatar(worldId, dataUrl);
      setAvatarUrl(result);
      await store.loadUserProfile(worldId);
    } catch (err: any) {
      console.error("Failed to upload avatar:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!worldId) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <p>Select a world first</p>
      </div>
    );
  }

  const update = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
  };

  const handleSave = async () => {
    const profile: UserProfile = {
      world_id: worldId,
      display_name: form.display_name || "Me",
      description: form.description,
      facts: form.facts,
      avatar_file: existing?.avatar_file ?? "",
      updated_at: new Date().toISOString(),
    };
    await store.updateUserProfile(profile);
    setDirty(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
          )}
          <div>
            <h1 className="font-semibold">{form.display_name || "Me"}</h1>
            <span className="text-xs text-muted-foreground/50">Your Profile</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Unsaved changes
            </span>
          )}
          <Button size="sm" onClick={handleSave} disabled={!dirty}>
            <Save size={14} className="mr-1.5" /> Save
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileSelected}
      />

      <ScrollArea className="flex-1 px-6 py-6">
        <div className="max-w-2xl space-y-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tell your characters about yourself. This context is included in every conversation so they know who they're talking to.
          </p>

          <FieldGroup label="Avatar">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-28 h-28 rounded-xl object-cover border border-border" />
                ) : (
                  <div className="w-28 h-28 rounded-xl bg-muted flex items-center justify-center border border-border">
                    <User size={36} className="text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Generate a watercolor portrait from your description, or upload your own image.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={generating || uploading || !store.apiKey}
                  >
                    {generating ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <ImagePlus size={14} className="mr-1.5" />}
                    {generating ? "Generating..." : "Generate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpload}
                    disabled={generating || uploading}
                  >
                    {uploading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Upload size={14} className="mr-1.5" />}
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>
            </div>
          </FieldGroup>

          <FieldGroup label="Basics">
            <Field label="Your Name" hint="What characters will call you">
              <Input
                value={form.display_name}
                onChange={(e) => update({ display_name: e.target.value })}
                placeholder="Your name or alias"
              />
            </Field>

            <Field label="About You" hint="A short description — personality, vibe, what matters to you">
              <Textarea
                className="min-h-[100px]"
                value={form.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder="e.g. Curious, a bit sarcastic, loves old books and rainy days..."
              />
            </Field>
          </FieldGroup>

          <FieldGroup label="Facts">
            <Field label="Things Characters Should Know" hint="Details that might come up in conversation">
              <FactsList
                items={form.facts}
                onChange={(facts) => update({ facts })}
                placeholder="e.g. Lives near the coast. Has a cat named Pepper."
              />
            </Field>
          </FieldGroup>
        </div>
      </ScrollArea>
    </div>
  );
}

function FactsList({ items, onChange, placeholder }: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [newItem, setNewItem] = useState("");

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 group">
          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
          <Input className="flex-1" value={item} onChange={(e) => {
            const updated = [...items];
            updated[i] = e.target.value;
            onChange(updated);
          }} />
          <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive flex-shrink-0" onClick={() => {
            onChange(items.filter((_, j) => j !== i));
          }}>
            <X size={14} />
          </Button>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />
        <Input
          className="flex-1"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newItem.trim()) {
              onChange([...items, newItem.trim()]);
              setNewItem("");
            }
          }}
        />
        <Button variant="outline" size="sm" className="h-9 flex-shrink-0" onClick={() => {
          if (newItem.trim()) {
            onChange([...items, newItem.trim()]);
            setNewItem("");
          }
        }}>
          <Plus size={14} className="mr-1" /> Add
        </Button>
      </div>
    </div>
  );
}
