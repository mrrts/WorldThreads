import { useState, useEffect, useCallback } from "react";
import { api, type CharacterMood, type MoodSettings } from "@/lib/tauri";
import { Activity, X, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  characterId: string | undefined;
}

function Sparkline({ data, color, height = 32, width = 160 }: { data: number[]; color: string; height?: number; width?: number }) {
  if (data.length < 2) return <div style={{ width, height }} className="bg-muted/30 rounded" />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={width} height={height} className="block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoodBar({ label, value, color, range }: { label: string; value: number; color: string; range: [number, number] }) {
  const [min, max] = range;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground w-12 text-right">{label}</span>
      <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden relative">
        {range[0] < 0 && (
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/20" />
        )}
        <div
          className="absolute top-0 bottom-0 rounded-full transition-all duration-500"
          style={{
            backgroundColor: color,
            left: range[0] < 0 ? `${Math.min(pct, 50)}%` : "0%",
            width: range[0] < 0 ? `${Math.abs(pct - 50)}%` : `${pct}%`,
          }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-10 text-right">{value.toFixed(2)}</span>
    </div>
  );
}

export function MoodDebugPanel({ characterId }: Props) {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState<CharacterMood | null>(null);
  const [settings, setSettings] = useState<MoodSettings>({ enabled: true, drift_rate: 0.15 });
  const [showHistory, setShowHistory] = useState(false);

  const loadMood = useCallback(async () => {
    if (!characterId) return;
    const m = await api.getCharacterMood(characterId);
    setMood(m);
  }, [characterId]);

  useEffect(() => {
    api.getMoodSettings().then(setSettings).catch(() => {});
  }, []);

  useEffect(() => {
    loadMood();
  }, [loadMood]);

  // Poll for mood updates while open
  useEffect(() => {
    if (!open || !characterId) return;
    const interval = setInterval(loadMood, 2000);
    return () => clearInterval(interval);
  }, [open, characterId, loadMood]);

  const toggleEnabled = async () => {
    const updated = { ...settings, enabled: !settings.enabled };
    setSettings(updated);
    await api.setMoodSettings(updated);
  };

  const updateRate = async (rate: number) => {
    const updated = { ...settings, drift_rate: rate };
    setSettings(updated);
    await api.setMoodSettings(updated);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-8 h-8 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        title="Mood Debug"
      >
        <Activity size={14} />
      </button>
    );
  }

  const history = mood?.history ?? [];
  const valenceHistory = history.map((h) => h.v);
  const energyHistory = history.map((h) => h.e);
  const tensionHistory = history.map((h) => h.t);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity size={12} className="text-primary" />
          <span className="text-xs font-semibold">Mood Drift</span>
        </div>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
          <X size={14} />
        </button>
      </div>

      <div className="p-3 space-y-3">
        {/* Toggle + drift rate */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={toggleEnabled}
              className="accent-primary w-3.5 h-3.5"
            />
            <span className="text-[11px]">Enabled</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Rate</span>
            <input
              type="range"
              min={0.01}
              max={0.5}
              step={0.01}
              value={settings.drift_rate}
              onChange={(e) => updateRate(Number(e.target.value))}
              className="w-16 accent-primary h-1"
            />
            <span className="text-[10px] font-mono text-muted-foreground w-7">{settings.drift_rate.toFixed(2)}</span>
          </div>
        </div>

        {!mood && (
          <p className="text-[11px] text-muted-foreground text-center py-2">
            No mood data yet — send a message to initialize.
          </p>
        )}

        {mood && (
          <>
            {/* Current values */}
            <div className="space-y-1.5">
              <MoodBar label="Valence" value={mood.valence} color="#22c55e" range={[-1, 1]} />
              <MoodBar label="Energy" value={mood.energy} color="#3b82f6" range={[-1, 1]} />
              <MoodBar label="Tension" value={mood.tension} color="#ef4444" range={[0, 1]} />
            </div>

            {/* Sparklines */}
            {history.length >= 2 && (
              <div>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground cursor-pointer mb-1.5"
                >
                  {showHistory ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  History ({history.length} points)
                </button>
                {showHistory && (
                  <div className="space-y-1.5 bg-muted/20 rounded-lg p-2">
                    <div>
                      <span className="text-[9px] text-muted-foreground">Valence</span>
                      <Sparkline data={valenceHistory} color="#22c55e" />
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground">Energy</span>
                      <Sparkline data={energyHistory} color="#3b82f6" />
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground">Tension</span>
                      <Sparkline data={tensionHistory} color="#ef4444" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
