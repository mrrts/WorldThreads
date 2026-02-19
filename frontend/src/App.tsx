import { useState, useEffect, useCallback, useRef } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { api, type DailyUsage } from "@/lib/tauri";
import { Sidebar } from "@/components/Sidebar";
import { ChatView } from "@/components/ChatView";
import { WorldCanonEditor } from "@/components/WorldCanonEditor";
import { CharacterEditor } from "@/components/CharacterEditor";
import { CharacterGrid } from "@/components/CharacterGrid";
import { UserProfileEditor } from "@/components/UserProfileEditor";
import { WorldFeed } from "@/components/WorldFeed";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SceneView } from "@/components/SceneView";
import { Gallery } from "@/components/Gallery";
import { MoodDebugPanel } from "@/components/MoodDebugPanel";
import { MessageSquare, Globe, Users, Settings, Sparkles, Coins, Image } from "lucide-react";

type View = "chat" | "world" | "character" | "feed" | "settings" | "scene" | "gallery";
type CharSubView = "grid" | "editor" | "profile";

export default function App() {
  const store = useAppStore();
  const [view, setView] = useState<View>("chat");
  const [charSubView, setCharSubView] = useState<CharSubView>("grid");
  const lastChatCharRef = useRef<string | null>(null);
  const viewRef = useRef<View>("chat");

  const setViewTracked = useCallback((next: View) => {
    const prev = viewRef.current;
    if (prev === "chat" && next !== "chat" && store.activeCharacter) {
      lastChatCharRef.current = store.activeCharacter.character_id;
    }
    viewRef.current = next;
    setView(next);
  }, [store.activeCharacter]);

  const handleNavigate = useCallback((v: string) => {
    setViewTracked(v as View);
    if (v === "character" && !store.editingUserProfile) {
      setCharSubView("editor");
    }
  }, [store.editingUserProfile, setViewTracked]);

  const handleCharNav = useCallback(() => {
    setViewTracked("character");
    setCharSubView("grid");
  }, [setViewTracked]);

  const handleChatNav = useCallback(() => {
    if (lastChatCharRef.current) {
      const ch = store.characters.find((c) => c.character_id === lastChatCharRef.current);
      if (ch) {
        store.selectCharacter(ch);
      }
    }
    setViewTracked("chat");
  }, [store, setViewTracked]);

  if (store.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-pulse text-primary text-4xl mb-4">✦</div>
          <p className="text-muted-foreground">Loading WorldThreads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {store.error && (
        <div className="fixed top-4 right-4 z-50 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg max-w-md text-sm">
          {store.error}
        </div>
      )}

      <div className="w-16 flex-shrink-0 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
        <NavButton icon={<MessageSquare size={20} />} active={view === "chat"} onClick={handleChatNav} title="Chat" />
        <NavButton icon={<Globe size={20} />} active={view === "world"} onClick={() => setViewTracked("world")} title="World Canon" />
        <NavButton icon={<Users size={20} />} active={view === "character"} onClick={handleCharNav} title="Characters" />
        <NavButton icon={<Image size={20} />} active={view === "gallery"} onClick={() => setViewTracked("gallery")} title="Gallery" />
        <NavButton icon={<Sparkles size={20} />} active={view === "feed"} onClick={() => setViewTracked("feed")} title="World Feed" />
        <NavButton icon={<span className="text-lg">◆</span>} active={view === "scene"} onClick={() => setViewTracked("scene")} title="Scene" />
        <div className="flex-1" />
        <UsageBadge sending={store.sending} />
        <NavButton icon={<Settings size={20} />} active={view === "settings"} onClick={() => setViewTracked("settings")} title="Settings" />
      </div>

      <Sidebar store={store} onNavigate={handleNavigate} />

      <main className="flex-1 flex flex-col min-w-0">
        {!store.apiKey && view === "chat" && (
          <div className="m-4 p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm">
            <p className="font-medium text-primary">API key required</p>
            <p className="text-muted-foreground mt-1">
              Go to <button className="underline text-primary cursor-pointer" onClick={() => setViewTracked("settings")}>Settings</button> to add your OpenAI API key before chatting.
            </p>
          </div>
        )}
        {view === "chat" && <ChatView store={store} />}
        {view === "world" && <WorldCanonEditor store={store} />}
        {view === "character" && (
          store.editingUserProfile ? <UserProfileEditor store={store} /> :
          charSubView === "grid" ? (
            <CharacterGrid
              store={store}
              onChat={(id) => {
                const ch = store.characters.find((c) => c.character_id === id);
                if (ch) { store.selectCharacter(ch); lastChatCharRef.current = id; setViewTracked("chat"); }
              }}
              onSettings={(id) => {
                const ch = store.characters.find((c) => c.character_id === id);
                if (ch) { store.selectCharacter(ch); setCharSubView("editor"); }
              }}
            />
          ) : <CharacterEditor store={store} />
        )}
        {view === "gallery" && <Gallery store={store} />}
        {view === "feed" && <WorldFeed store={store} />}
        {view === "settings" && <SettingsPanel store={store} />}
        {view === "scene" && <SceneView store={store} />}
      </main>

      <MoodDebugPanel characterId={store.activeCharacter?.character_id} />
    </div>
  );
}

function NavButton({ icon, active, onClick, title }: { icon: React.ReactNode; active: boolean; onClick: () => void; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
    >
      {icon}
    </button>
  );
}

function estimateCost(usage: DailyUsage): { input: string; output: string; total: string } {
  // Pricing per 1M tokens (approx, blended for gpt-4o / gpt-4o-mini / embeddings)
  // gpt-4o: $2.50 in / $10 out, gpt-4o-mini: $0.15 in / $0.60 out
  // Using a weighted average since we mix models: ~$2 in / $6 out per 1M
  const inputCostPer1M = 2.0;
  const outputCostPer1M = 6.0;
  const inputCost = (usage.prompt_tokens / 1_000_000) * inputCostPer1M;
  const outputCost = (usage.completion_tokens / 1_000_000) * outputCostPer1M;
  const total = inputCost + outputCost;
  return {
    input: inputCost < 0.01 ? "<$0.01" : `$${inputCost.toFixed(2)}`,
    output: outputCost < 0.01 ? "<$0.01" : `$${outputCost.toFixed(2)}`,
    total: total < 0.01 ? "<$0.01" : `$${total.toFixed(2)}`,
  };
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function UsageBadge({ sending }: { sending: boolean }) {
  const [usage, setUsage] = useState<DailyUsage | null>(null);
  const [hovering, setHovering] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setUsage(await api.getTodayUsage());
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Refresh after each send completes
  useEffect(() => {
    if (!sending) refresh();
  }, [sending, refresh]);

  const today = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const cost = usage ? estimateCost(usage) : null;
  const totalTokens = usage ? usage.prompt_tokens + usage.completion_tokens : 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-default">
        <Coins size={20} />
      </div>

      {hovering && usage && cost && (
        <div className="absolute left-12 bottom-0 z-50 w-56 bg-card border border-border rounded-xl shadow-2xl shadow-black/40 p-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-primary">Today's Usage</span>
            <span className="text-[10px] text-muted-foreground">{today}</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tokens in</span>
              <span className="font-mono">{formatTokens(usage.prompt_tokens)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tokens out</span>
              <span className="font-mono">{formatTokens(usage.completion_tokens)}</span>
            </div>

            <div className="border-t border-border pt-2 mt-2 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Input cost</span>
                <span className="font-mono">{cost.input}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Output cost</span>
                <span className="font-mono">{cost.output}</span>
              </div>
              <div className="flex justify-between font-medium pt-1 border-t border-border">
                <span>Est. total</span>
                <span className="text-primary font-mono">{cost.total}</span>
              </div>
            </div>
          </div>

          {totalTokens === 0 && (
            <p className="text-[10px] text-muted-foreground/60 mt-2 text-center">No API calls yet today</p>
          )}

          <p className="text-[10px] text-muted-foreground/50 leading-relaxed mt-3 pt-2 border-t border-border/50">
            Includes: dialogue replies, world ticks, emoji reactions, memory summaries, embeddings, image generation, and any other API calls for new features.
          </p>
        </div>
      )}
    </div>
  );
}
