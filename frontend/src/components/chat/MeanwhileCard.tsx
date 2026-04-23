import type { MeanwhileEvent } from "@/lib/tauri";

interface Props {
  event: MeanwhileEvent;
  /** Portrait data URL for the character, if available. Falls back to a
   *  solid color band (from avatar_color) when missing. */
  portraitUrl?: string;
}

/// Inline "meanwhile" card placed chronologically in chat history.
/// Ambient rather than eventful: left band shows the character's
/// FULL portrait fading into the background; the rest carries a small
/// "Meanwhile" label + world-time marker + italic event summary,
/// vertically centered against the portrait's height. Distinct visual
/// register from message bubbles and illustrations — reads as "life
/// happening off-screen" rather than "something said into the chat."
export function MeanwhileCard({ event, portraitUrl }: Props) {
  const timeLabel = formatTimeOfDay(event.time_of_day);
  return (
    <div className="flex justify-center my-3">
      <div className="relative w-full max-w-[720px] h-[260px] rounded-xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm">
        {/* Portrait background — full-height left band, contained (not
            cropped) so the entire portrait reads, faded toward the right
            so the text sits cleanly over it. */}
        {portraitUrl ? (
          <div
            className="absolute inset-y-0 left-0 w-[55%] bg-contain bg-left bg-no-repeat"
            style={{
              backgroundImage: `url(${portraitUrl})`,
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0) 100%)",
              opacity: 0.7,
            }}
            aria-hidden
          />
        ) : (
          <div
            className="absolute inset-y-0 left-0 w-[40%]"
            style={{
              background: `linear-gradient(to right, ${event.avatar_color}66 0%, transparent 100%)`,
            }}
            aria-hidden
          />
        )}

        {/* Content sits on top, vertically centered against the card's
            full height so it visually anchors to the portrait's gaze. */}
        <div className="relative z-10 h-full px-5 py-4 flex flex-col justify-center gap-2">
          <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-wider text-muted-foreground/90 font-semibold">
            <span>Meanwhile</span>
            <span className="opacity-60">·</span>
            <span>{event.character_name}</span>
            <span className="opacity-60">·</span>
            <span className="opacity-80">
              Day {event.world_day}
              {timeLabel ? ` · ${timeLabel}` : ""}
            </span>
          </div>
          <div className="text-sm text-foreground/90 italic leading-relaxed max-w-[60%] ml-auto">
            {event.summary}
          </div>
        </div>
      </div>
    </div>
  );
}

/// Format "MORNING" → "morning" (lowercase for the inline time label).
/// Keeps unknown values untouched.
function formatTimeOfDay(raw: string): string {
  if (!raw) return "";
  // Common values: MORNING / MIDDAY / AFTERNOON / EVENING / LATE NIGHT
  return raw.toLowerCase();
}
