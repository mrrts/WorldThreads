import { useState, useEffect, useCallback, useRef, startTransition, type ReactNode } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { api, type DailyUsage } from "@/lib/tauri";
import { Sidebar } from "@/components/Sidebar";
import { ChatView } from "@/components/ChatView";
import { GroupChatView } from "@/components/GroupChatView";
import { WorldCanonEditor } from "@/components/WorldCanonEditor";
import { CharacterEditor } from "@/components/CharacterEditor";
import { UserProfileEditor } from "@/components/UserProfileEditor";
import { SettingsPanel } from "@/components/SettingsPanel";
import { WorldSummary } from "@/components/WorldSummary";
import { PortraitPopout } from "@/components/PortraitPopout";
import { SapphirePitch } from "@/components/SapphirePitch";
import { Scroll, Settings, Coins, BookOpen, Download, Square, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type View = "chat" | "world" | "character" | "settings" | "summary";

export default function App() {
  // Check if this window is a popout
  const params = new URLSearchParams(window.location.search);
  const popoutCharacterId = params.get("portrait");
  if (popoutCharacterId) {
    return <PortraitPopout characterId={popoutCharacterId} />;
  }
  const illustrationMsgId = params.get("illustration");
  if (illustrationMsgId) {
    return <IllustrationPopout messageId={illustrationMsgId} />;
  }
  const sapphirePitch = params.get("pitch");
  if (sapphirePitch === "1" || sapphirePitch === "sapphire") {
    return <SapphirePitch />;
  }

  return <MainApp />;
}

function MainApp() {
  const store = useAppStore();
  const [view, setView] = useState<View>("chat");
  const lastChatCharRef = useRef<string | null>(null);

  // Focus mode v4 — single-key control scheme; iteration loop's stopping point.
  //
  // Behavior (the trivially-expressible mental model the v3-followup /play's
  // verdict named as the loop's stopping rule, reports/2026-04-28-0950-...):
  //
  //   "Hold F to peek; tap F to toggle Focus; Esc to exit."
  //
  // - TAP F (short, < 250ms): toggle Focus on/off. Focus = chat clamped to
  //   72ch + chrome hidden + Sidebar shown as OPAQUE persistent overlay.
  // - HOLD F (≥ 250ms) when Focus is OFF: transient TRANSLUCENT Sidebar
  //   overlay shown while held; auto-dismisses on F release. Use-case: glance
  //   at sidebar without committing to chat-clamping.
  // - HOLD F when Focus is ON: no-op (the sidebar overlay is already shown
  //   opaque; nothing to peek to).
  // - Esc when Focus is ON: exit Focus.
  //
  // v4 changes from v3:
  // - Removes the F+Space chord (Space was high-conflict — users hit
  //   reflexively for scroll/play/pause; would misfire as lock-trigger).
  // - Removes the separate lockedPeek state. The persistent overlay IS Focus
  //   mode now; tap F enters that state directly.
  // - Removes the discoverability-tax of having to learn a chord.
  // - Single-sentence mental model: "Hold F to peek; tap to toggle Focus;
  //   Esc to exit." Per the v3-followup verdict's stopping-rule heuristic:
  //   "stop when the interaction can be expressed in a single short
  //   sentence; remaining tweaks are aesthetic, not state/flow comprehension."
  //
  // Pattern: composability via key-semantic-multiplexing on a single key
  // (tap vs hold), no chord, no second key. Vim's single-leader pattern
  // simplified.
  const [focusMode, setFocusMode] = useState(false);
  const [peekActive, setPeekActive] = useState(false);
  // Refs so the keydown/keyup handlers see latest state without re-registering.
  const focusModeRef = useRef(focusMode);
  useEffect(() => { focusModeRef.current = focusMode; }, [focusMode]);
  const peekTimerRef = useRef<number | null>(null);
  useEffect(() => {
    const isFKey = (e: KeyboardEvent) => e.key === 'f' || e.key === 'F';
    const isInputTarget = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return true;
      const tag = t.tagName?.toLowerCase();
      return tag === 'input' || tag === 'textarea' || t.isContentEditable;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      // Esc: exit Focus mode if on. Other Esc behavior unaffected.
      if (e.key === 'Escape' && focusModeRef.current) {
        e.preventDefault();
        setFocusMode(false);
        return;
      }
      if (!isFKey(e)) return;
      if (e.repeat) return; // ignore OS key-repeat from holding
      if (isInputTarget(e)) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (view !== 'chat') return;
      e.preventDefault();
      // Schedule hold-detection. Released before threshold → tap (toggles Focus).
      // Held past threshold → peek (only meaningful when Focus is off).
      if (peekTimerRef.current !== null) {
        clearTimeout(peekTimerRef.current);
      }
      peekTimerRef.current = window.setTimeout(() => {
        // Hold detected. Show peek only if Focus is OFF (when Focus is on,
        // the opaque sidebar overlay is already showing; peek would be a no-op
        // visual change). Keeps the mental model simple: peek = "show
        // sidebar without committing to Focus."
        if (!focusModeRef.current) {
          setPeekActive(true);
        }
        peekTimerRef.current = null;
      }, 250);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (!isFKey(e)) return;
      // Always clear peek on F release.
      setPeekActive(false);
      if (peekTimerRef.current !== null) {
        // Released before hold-threshold → tap; toggle Focus.
        clearTimeout(peekTimerRef.current);
        peekTimerRef.current = null;
        setFocusMode((f) => !f);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (peekTimerRef.current !== null) {
        clearTimeout(peekTimerRef.current);
        peekTimerRef.current = null;
      }
    };
  }, [view]);

  // Background novelization: fires after 20 minutes of idle time (no user
  // activity and no window focus), iterates through un-novelized days, and
  // writes chapters silently. Any user activity or window focus aborts the
  // in-flight sweep immediately — the backend drops the HTTP streams so
  // LM Studio halts generation within a token batch and foreground chat
  // responses aren't blocked. Backend no-ops for non-local providers.
  useEffect(() => {
    if (!store.apiKey) return;
    const IDLE_MS = 20 * 60 * 1000;
    let idleTimer: number | null = null;
    let running = false;

    const start = () => {
      if (running) return;
      running = true;
      api.runBackgroundNovelization(store.apiKey).catch(() => { running = false; });
    };
    const cancel = () => {
      if (!running) return;
      running = false;
      api.cancelBackgroundNovelization().catch(() => {});
    };
    const reset = () => {
      if (idleTimer !== null) window.clearTimeout(idleTimer);
      cancel();
      idleTimer = window.setTimeout(start, IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousedown", "mousemove", "keydown", "scroll", "touchstart", "focus",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleTimer !== null) window.clearTimeout(idleTimer);
      cancel();
    };
  }, [store.apiKey]);
  const viewRef = useRef<View>("chat");

  // Time-of-day check modal
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [timeDay, setTimeDay] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState("MORNING");
  const [baseDayIndex, setBaseDayIndex] = useState(1);
  const timeCheckRef = useRef<string | null>(null);

  const checkWorldTime = useCallback(() => {
    const worldId = store.activeWorld?.world_id;
    if (!worldId || !store.activeWorld?.state?.time) return;
    if (timeCheckRef.current === worldId) return;
    timeCheckRef.current = worldId;

    const todayStr = new Date().toDateString();

    // Check if we already showed the modal today for this world
    api.getSetting(`time_modal_shown.${worldId}`).then((lastShown) => {
      if (lastShown === todayStr) return;

      api.getLastMessageTime(worldId).then((ts) => {
        if (!ts) return;
        const lastDay = new Date(new Date(ts).toDateString());
        const todayDay = new Date(todayStr);
        if (lastDay < todayDay) {
          const currentDay = store.activeWorld?.state?.time?.day_index ?? 1;
          const currentTime = store.activeWorld?.state?.time?.time_of_day ?? "MORNING";
          setBaseDayIndex(currentDay);
          setTimeDay(currentDay + 1);
          setTimeOfDay(currentTime);
          setShowTimeModal(true);
          // Mark as shown today
          api.setSetting(`time_modal_shown.${worldId}`, todayStr).catch(() => {});
        }
      });
    });
  }, [store.activeWorld]);

  // Check on world change
  useEffect(() => { checkWorldTime(); }, [checkWorldTime]);

  // Proactive pings: characters may reach out between turns. The backend
  // enforces the eligibility gates (quiet window after the last user
  // message, cooldown between pings, max 2 consecutive without a reply).
  // We kick a sweep on mount and whenever the window regains focus — both
  // natural "returning to the app" moments. Unread counts refresh on the
  // same cadence so the sidebar badge stays current.
  const refreshUnread = store.refreshProactiveUnreadCounts;
  const runSweep = store.runProactivePingSweep;
  useEffect(() => {
    if (!store.apiKey) return;
    refreshUnread();
    runSweep();
    const onFocus = () => { refreshUnread(); runSweep(); };
    window.addEventListener("focus", onFocus);
    // Periodic refresh of just the badge counts (no LLM call) — catches
    // pings fired by other windows / sweeps without waiting for focus.
    const interval = window.setInterval(() => refreshUnread(), 60_000);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(interval);
    };
  }, [store.apiKey, refreshUnread, runSweep]);

  // Backfill visual descriptions for portraited characters that don't
  // have one yet (or whose description is stale relative to the current
  // active portrait). Runs once per world-change + once on initial load,
  // paced so we don't stampede the vision endpoint.
  const backfillVisuals = store.backfillVisualDescriptions;
  useEffect(() => {
    if (!store.apiKey || !store.activeWorld) return;
    const t = window.setTimeout(() => { backfillVisuals(); }, 2000);
    return () => window.clearTimeout(t);
  }, [store.apiKey, store.activeWorld?.world_id, backfillVisuals]);

  // Backfill semantic embeddings for any messages (solo + group) that
  // don't yet have chunk coverage for the characters who should remember
  // them. Safe to run on every mount — the backend short-circuits on
  // already-covered rows and is a no-op in LM Studio mode. Delayed so
  // initial app load settles first.
  useEffect(() => {
    if (!store.apiKey) return;
    const t = window.setTimeout(() => {
      api.backfillEmbeddings(store.apiKey)
        .then((s) => {
          if (s.embedded > 0 || s.errors > 0) {
            console.info(`[Backfill] embedded=${s.embedded} skipped=${s.skipped} errors=${s.errors}`);
          }
        })
        .catch(() => { /* non-fatal */ });
    }, 5000);
    return () => window.clearTimeout(t);
  }, [store.apiKey]);

  // Re-check on window focus
  useEffect(() => {
    const handler = () => {
      timeCheckRef.current = null;
      checkWorldTime();
    };
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, [checkWorldTime]);

  // Keyboard shortcuts (Cmd+Shift+key)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.metaKey || !e.shiftKey) return;
      switch (e.code) {
        case "KeyR":
          e.preventDefault();
          store.setAutoRespond(!store.autoRespond);
          break;
        case "KeyG":
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("wt:open-gallery"));
          break;
        case "KeyC":
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("wt:open-consultant"));
          break;
        case "KeyS":
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("wt:open-summary"));
          break;
        case "Comma":
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("wt:open-settings"));
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [store.autoRespond]);

  const setViewTracked = useCallback((next: View) => {
    const prev = viewRef.current;
    if (prev === "chat" && next !== "chat" && store.activeCharacter) {
      lastChatCharRef.current = store.activeCharacter.character_id;
    }
    viewRef.current = next;
    startTransition(() => setView(next));
  }, [store.activeCharacter]);

  const handleNavigate = useCallback((v: string) => {
    setViewTracked(v as View);
  }, [setViewTracked]);





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

      {!focusMode && (
        <div className="w-16 flex-shrink-0 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
          <NavButton icon={<BookOpen size={20} />} active={view === "summary"} onClick={() => setViewTracked("summary")} title="Summary" description="World overview and conversation recaps for each character." />
          <NavButton icon={<Scroll size={20} />} active={view === "world"} onClick={() => setViewTracked("world")} title="World Canon" description="Edit your world's name, description, tone, and rules." />
          <div className="flex-1" />
          <UsageBadge sending={!!store.sending} />
          <NavButton icon={<Settings size={20} />} active={view === "settings"} onClick={() => setViewTracked("settings")} title="Settings" description="API key, model config, and app preferences." />
        </div>
      )}

      {!focusMode && !peekActive && <Sidebar store={store} onNavigate={handleNavigate} />}

      {(focusMode || peekActive) && (
        // Sidebar overlay: shown both when Focus is committed (opaque, persistent)
        // AND when peeking (translucent, while F held). Same JSX structure for
        // both states — only the className differs — so the Sidebar component
        // instance is preserved across peek↔Focus transitions, which preserves
        // its internal scroll state. The structurally-verified scroll-state
        // preservation finding from the v3 implementation carries forward to v4.
        // Slides in from left; Sidebar contents are the existing Sidebar
        // component (no reinvention).
        <div className="absolute left-0 top-0 bottom-0 z-40 animate-in slide-in-from-left fade-in duration-150">
          <div className={
            peekActive
              ? "bg-background/95 backdrop-blur-md shadow-2xl border-r border-border h-full" // translucent during transient peek
              : "bg-background shadow-2xl border-r border-border h-full" // opaque when Focus is committed
          }>
            <Sidebar store={store} onNavigate={handleNavigate} />
          </div>
        </div>
      )}

      {focusMode && view === "chat" && (
        // Subtle indicator that Focus is on. Hover reveals the v4 single-sentence
        // mental model: "Hold F to peek; tap to toggle Focus; Esc to exit."
        // Per the v3-followup verdict's stopping rule for the iteration loop:
        // the trivially-expressible control scheme is the goal state; remaining
        // tweaks are aesthetic, not flow comprehension.
        <button
          type="button"
          onClick={() => setFocusMode(false)}
          className="group fixed bottom-4 right-4 z-30 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/80 backdrop-blur text-muted-foreground hover:text-foreground border border-border/50 transition-colors"
          title="Tap F or Esc to exit Focus · hold F (when off) to peek sidebar"
        >
          <span className="opacity-70">Focus</span>
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">· F or Esc to exit</span>
        </button>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        {!store.apiKey && view === "chat" && (
          <div className="m-4 p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm">
            <p className="font-medium text-primary">API key required</p>
            <p className="text-muted-foreground mt-1">
              Go to <button className="underline text-primary cursor-pointer" onClick={() => setViewTracked("settings")}>Settings</button> to add your OpenAI API key before chatting.
              {" "}Already added one?{" "}
              <button
                className="underline text-primary cursor-pointer"
                onClick={async () => {
                  const key = await api.getApiKey();
                  if (key) store.setApiKey(key);
                }}
              >
                Try again
              </button>
            </p>
          </div>
        )}
        {view === "chat" && (
          <DeferredMount key="chat">
            {store.activeGroupChat
              ? <GroupChatView store={store} focusMode={focusMode} onNavigateToCharacter={(id) => { store.selectCharacter(store.characters.find((c) => c.character_id === id)!); setViewTracked("character"); }} />
              : <ChatView store={store} focusMode={focusMode} onNavigateToCharacter={(id) => { store.selectCharacter(store.characters.find((c) => c.character_id === id)!); setViewTracked("character"); }} />}
          </DeferredMount>
        )}
        {view === "world" && (
          <DeferredMount key="world">
            <WorldCanonEditor store={store} />
          </DeferredMount>
        )}
        {view === "character" && (
          <DeferredMount key="character">
            {store.editingUserProfile ? <UserProfileEditor store={store} /> : <CharacterEditor store={store} />}
          </DeferredMount>
        )}
        {view === "settings" && (
          <DeferredMount key="settings">
            <SettingsPanel store={store} />
          </DeferredMount>
        )}
        {view === "summary" && (
          <DeferredMount key="summary">
            <WorldSummary
              store={store}
              onChat={(id) => {
                const ch = store.characters.find((c) => c.character_id === id);
                if (ch) { store.selectCharacter(ch); lastChatCharRef.current = id; setViewTracked("chat"); }
              }}
              onSettings={(id) => {
                const ch = store.characters.find((c) => c.character_id === id);
                if (ch) { store.selectCharacter(ch); setViewTracked("character"); }
              }}
            />
          </DeferredMount>
        )}
      </main>


      <Dialog open={showTimeModal} onClose={() => setShowTimeModal(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set a New Time?</DialogTitle>
            <DialogDescription>It's been a while since you were last here. Want to advance the world clock?</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Day</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTimeDay((d) => Math.max(baseDayIndex, d - 1))}
                    disabled={timeDay <= baseDayIndex}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-lg font-semibold w-10 text-center">{timeDay}</span>
                  <button
                    onClick={() => setTimeDay((d) => d + 1)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Time of Day</label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm"
                >
                  {["DAWN", "MORNING", "MIDDAY", "AFTERNOON", "EVENING", "NIGHT", "LATE NIGHT"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowTimeModal(false)}>No Thanks</Button>
            <Button onClick={() => {
              if (store.activeWorld) {
                const newState = structuredClone(store.activeWorld.state);
                newState.time = { ...newState.time, day_index: timeDay, time_of_day: timeOfDay };
                store.updateWorldState(newState);
              }
              setShowTimeModal(false);
            }}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeferredMount({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!ready) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-primary text-2xl">✦</div>
      </div>
    );
  }
  return <>{children}</>;
}

function NavButton({ icon, active, onClick, title, description }: { icon: React.ReactNode; active: boolean; onClick: () => void; title: string; description?: string }) {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        onClick={onClick}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
          active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        {icon}
      </button>
      {hovering && (
        <div className="absolute left-12 top-1/2 -translate-y-1/2 z-50 w-48 bg-card border border-border rounded-lg shadow-xl shadow-black/30 px-3 py-2.5 pointer-events-none animate-in fade-in zoom-in-95 duration-100">
          <p className="text-xs font-semibold text-foreground">{title}</p>
          {description && <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{description}</p>}
        </div>
      )}
    </div>
  );
}

function IllustrationPopout({ messageId }: { messageId: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [dataUrl, vf] = await Promise.all([
          api.getIllustrationData(messageId),
          api.getVideoFile(messageId).catch(() => null),
        ]);
        setImageUrl(dataUrl);
        setVideoFile(vf);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, [messageId]);

  const handlePlayVideo = async () => {
    if (!videoFile) return;
    if (!videoBlobUrl) {
      try {
        const bytes = await api.getVideoBytes(videoFile);
        const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: "video/mp4" }));
        setVideoBlobUrl(url);
      } catch { return; }
    }
    setPlayingVideo(true);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full" />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-muted-foreground text-sm">
        Illustration not found
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <div
        data-tauri-drag-region
        className="h-8 flex-shrink-0 flex items-center pl-[72px] pr-3 bg-card border-b border-border select-none"
      >
        <span className="text-xs text-muted-foreground">Illustration</span>
      </div>
      <div className="flex-1 min-h-0 relative flex items-center justify-center p-2 group/popout">
        <div className="absolute top-4 left-4 z-20 opacity-0 group-hover/popout:opacity-100 transition-opacity">
          <div className="relative group/pop-dl">
            <button
              onClick={() => api.downloadIllustration(messageId)}
              className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <Download size={14} />
            </button>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 text-[10px] font-medium text-white bg-black rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover/pop-dl:opacity-100 pointer-events-none transition-opacity">Download</span>
          </div>
        </div>
        {playingVideo && videoBlobUrl ? (
          <video
            key={`video-${messageId}`}
            src={videoBlobUrl}
            autoPlay
            loop
            playsInline
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <img
            src={imageUrl}
            alt="Illustration"
            className="max-w-full max-h-full object-contain"
          />
        )}
        {videoFile && !playingVideo && (
          <button
            onClick={handlePlayVideo}
            className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors backdrop-blur-sm opacity-0 group-hover/popout:opacity-100"
          >
            <span className="text-xl ml-0.5">&#9654;</span>
          </button>
        )}
        {playingVideo && (
          <button
            onClick={() => setPlayingVideo(false)}
            className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors backdrop-blur-sm opacity-0 group-hover/popout:opacity-100"
          >
            <Square size={16} fill="white" />
          </button>
        )}
      </div>
    </div>
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
