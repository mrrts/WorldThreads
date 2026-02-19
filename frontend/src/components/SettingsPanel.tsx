import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Field, FieldGroup } from "@/components/ui/field";
import { Save, Eye, EyeOff, Check } from "lucide-react";
import type { useAppStore } from "@/hooks/use-app-store";
import type { ModelConfig } from "@/lib/tauri";

interface Props {
  store: ReturnType<typeof useAppStore>;
}

export function SettingsPanel({ store }: Props) {
  const [apiKey, setApiKey] = useState(store.apiKey);
  const [showKey, setShowKey] = useState(false);
  const [config, setConfig] = useState<ModelConfig>(store.modelConfig);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiKey(store.apiKey);
    setConfig(store.modelConfig);
  }, [store.apiKey, store.modelConfig]);

  const handleSave = async () => {
    await store.setApiKey(apiKey);
    await store.setModelConfig(config);
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-6 py-3 border-b border-border flex items-center justify-between">
        <h1 className="font-semibold">Settings</h1>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check size={10} /> Saved
            </span>
          )}
          {dirty && !saved && (
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Unsaved changes
            </span>
          )}
          <Button size="sm" onClick={handleSave} disabled={!dirty}>
            <Save size={14} className="mr-1.5" /> Save
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-6">
        <div className="max-w-xl space-y-10">
          <FieldGroup label="API Key">
            <Field label="OpenAI API Key" hint="Stored locally. Only sent to the OpenAI API.">
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => { setApiKey(e.target.value); setDirty(true); }}
                  placeholder="sk-..."
                  className="pr-10 font-mono text-xs"
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>
          </FieldGroup>

          <FieldGroup label="Models">
            <p className="text-xs text-muted-foreground/60 -mt-2">
              Configure which OpenAI model to use for each function. Use cheaper models for background tasks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Dialogue" hint="Character responses — higher quality">
                <Input
                  value={config.dialogue_model}
                  onChange={(v) => { setConfig({ ...config, dialogue_model: v.target.value }); setDirty(true); }}
                  className="font-mono text-xs"
                />
              </Field>
              <Field label="World Tick" hint="Off-screen simulation — cheaper">
                <Input
                  value={config.tick_model}
                  onChange={(v) => { setConfig({ ...config, tick_model: v.target.value }); setDirty(true); }}
                  className="font-mono text-xs"
                />
              </Field>
              <Field label="Memory" hint="Summaries & canon updates — cheaper">
                <Input
                  value={config.memory_model}
                  onChange={(v) => { setConfig({ ...config, memory_model: v.target.value }); setDirty(true); }}
                  className="font-mono text-xs"
                />
              </Field>
              <Field label="Embeddings" hint="Vector search">
                <Input
                  value={config.embedding_model}
                  onChange={(v) => { setConfig({ ...config, embedding_model: v.target.value }); setDirty(true); }}
                  className="font-mono text-xs"
                />
              </Field>
            </div>
          </FieldGroup>

          <FieldGroup label="Cost Controls">
            <div className="flex items-center justify-between py-2 px-4 rounded-lg border border-border bg-card/50">
              <div>
                <p className="text-sm font-medium">Budget Mode</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Reduce world tick frequency and summary updates to save tokens
                </p>
              </div>
              <Switch
                checked={store.budgetMode}
                onCheckedChange={(checked) => store.setBudgetMode(checked)}
              />
            </div>
          </FieldGroup>
        </div>
      </ScrollArea>
    </div>
  );
}
