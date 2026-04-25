import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface Props {
  location: string | null;
}

/// Movie-title style location reorienter shown at the top of the chat
/// viewport when a chat opens. Fades + slides DOWN into place, holds
/// for the on-screen window, then fades + slides UP out. Non-dismissable
/// — sized to read fast and get out of the way. Parent re-mounts via
/// `key={chatId}` so switching chats triggers a fresh appearance.
///
/// Returns null when location is unset (no point setting a scene that
/// hasn't been named) or after the exit animation completes.
export function LocationOpener({ location }: Props) {
  // Phases: "enter" (offscreen → on-screen), "hold" (visible 3s), "exit"
  // (on-screen → offscreen), "done" (unmounted). Total ~3.7s.
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");

  useEffect(() => {
    if (!location) return;
    setPhase("enter");
    const tHold = setTimeout(() => setPhase("hold"), 30);
    const tExit = setTimeout(() => setPhase("exit"), 3000);
    const tDone = setTimeout(() => setPhase("done"), 3700);
    return () => {
      clearTimeout(tHold);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [location]);

  if (!location || phase === "done") return null;

  const isVisible = phase === "hold";
  const transformClass = isVisible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0";

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20">
      <div
        className={`
          mt-6
          flex items-center gap-3
          px-6 py-3.5 rounded-full
          bg-gradient-to-br from-emerald-950/90 via-emerald-900/85 to-emerald-950/90
          backdrop-blur-md
          border border-emerald-400/30
          shadow-2xl shadow-emerald-950/40
          transition-all duration-700 ease-out
          ${transformClass}
        `}
      >
        <MapPin size={22} className="text-emerald-300 drop-shadow-[0_0_6px_rgba(110,231,183,0.6)]" />
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/70 font-semibold">
            Location
          </span>
          <span className="text-base text-emerald-50 font-medium">{location}</span>
        </div>
      </div>
    </div>
  );
}
