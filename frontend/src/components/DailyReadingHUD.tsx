import { ChevronRight, Loader2, Plus, Activity } from "lucide-react";
import type { DailyReading } from "@/lib/tauri";

interface Props {
  reading: DailyReading | null;
  loading: boolean;
  generating: boolean;
  expanded: boolean;
  onToggle: () => void;
  onGenerate: () => void;
  canGenerate: boolean;
}

/// Daily-reading HUD rendered inside the Sidebar's World State block.
/// A collapsed header → meters + phrases + complication when expanded.
/// Percent is visualized as a horizontal bar; the qualitative phrase
/// sits on the line below, grounding the number in specifics.
///
/// Color-bands the bars so the HUD reads at a glance — but only
/// coarsely, to avoid encouraging optimization-thinking against the
/// percentage itself.
export function DailyReadingHUD({
  reading, loading, generating, expanded, onToggle, onGenerate, canGenerate,
}: Props) {
  const dayLabel = reading ? `Day ${reading.world_day}` : "";

  return (
    <div className="pt-2 border-t border-border/40">
      <div className="flex items-center justify-between">
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronRight size={10} className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
          <Activity size={10} />
          Reading
          {dayLabel && <span className="text-muted-foreground/50">({dayLabel})</span>}
        </button>
        <button
          onClick={onGenerate}
          disabled={generating || !canGenerate}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait flex items-center gap-1"
          title={reading ? "Regenerate today's reading" : "Generate today's reading"}
        >
          {generating ? <Loader2 size={9} className="animate-spin" /> : <Plus size={9} />}
          {generating ? "Reading…" : reading ? "Refresh" : "Generate"}
        </button>
      </div>

      {expanded && (
        <div className="mt-2 space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-[10px] text-muted-foreground italic py-2 text-center">Loading…</div>
          ) : !reading ? (
            <div className="text-[10px] text-muted-foreground/60 italic py-2 text-center">
              No reading yet. Click Generate to measure the day.
            </div>
          ) : (
            <>
              {reading.complication.trim() && (
                <div className="px-2 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                  <div className="text-[9px] uppercase tracking-wider text-amber-500/80 font-semibold mb-0.5">Complication</div>
                  <div className="text-[11px] text-foreground/85 italic leading-snug">{reading.complication}</div>
                </div>
              )}
              <div className="space-y-1.5">
                {reading.domains.map((d) => (
                  <div key={d.name} className="text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-[72px] font-medium text-foreground/90 flex-shrink-0">{d.name}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-secondary/40 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${bandColor(d.percent)}`}
                          style={{ width: `${Math.max(2, Math.min(100, d.percent))}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">{d.percent}%</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground italic leading-snug mt-0.5 pl-[80px]">
                      {d.phrase}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[9px] text-muted-foreground/50 text-right italic">
                {new Date(reading.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Coarse three-tier color bands. Deliberately not fine-grained — the
// percentage is a barometer, not a leaderboard, and a rainbow gradient
// invites optimization-thinking. Low / steady / high is enough.
function bandColor(percent: number): string {
  if (percent < 35) return "bg-rose-500/70";
  if (percent < 70) return "bg-amber-500/70";
  return "bg-emerald-500/70";
}
