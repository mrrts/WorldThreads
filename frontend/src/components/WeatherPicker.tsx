import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { WEATHER_OPTIONS } from "@/lib/weather";

interface Props {
  currentId: string | null;
  onPick: (id: string | null) => void;
  onClose: () => void;
  /** The button that opened the popover. Used to (a) position the
   *  popover above it and (b) ignore click-outside events on it, so
   *  toggling the button doesn't race against auto-close. */
  anchor: HTMLElement | null;
}

const POPOVER_WIDTH = 280;
const POPOVER_MAX_HEIGHT = 360;
const GAP = 8;

/// Popover grid of weather options. Portaled to document.body with
/// fixed positioning so sidebar overflow / scroll containers can't
/// clip it. Opens UPWARD from the anchor (weather emoji button in the
/// World State section) — if the anchor is too close to the top of
/// the viewport, flips to below. Click-outside closes; clicks on the
/// anchor are ignored so the button can re-toggle cleanly.
export function WeatherPicker({ currentId, onPick, onClose, anchor }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  // Compute position from anchor rect on mount + on window resize/scroll.
  useLayoutEffect(() => {
    if (!anchor) return;
    const place = () => {
      const rect = anchor.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
      // Prefer opening upward. Flip to below if not enough room above.
      const roomAbove = rect.top;
      const openUp = roomAbove >= POPOVER_MAX_HEIGHT + GAP;
      const top = openUp
        ? Math.max(8, rect.top - POPOVER_MAX_HEIGHT - GAP)
        : Math.min(viewportH - POPOVER_MAX_HEIGHT - 8, rect.bottom + GAP);
      const left = Math.min(
        Math.max(8, rect.left),
        viewportW - POPOVER_WIDTH - 8,
      );
      setPos({ top, left });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchor]);

  // Outside-click close. Ignore clicks on the anchor button so the
  // button's own onClick can toggle us off cleanly.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && ref.current.contains(target)) return;
      if (anchor && anchor.contains(target)) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchor]);

  if (!pos) return null;

  const content = (
    <div
      ref={ref}
      style={{ position: "fixed", top: pos.top, left: pos.left, width: POPOVER_WIDTH, maxHeight: POPOVER_MAX_HEIGHT }}
      className="z-[1000] bg-card border border-border rounded-xl shadow-xl shadow-black/40 animate-in fade-in zoom-in-95 duration-150 flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/60">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Weather</span>
        <button
          onClick={() => { onPick(null); onClose(); }}
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
          title="Clear weather"
        >
          <X size={10} />
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-3 gap-1.5">
          {WEATHER_OPTIONS.map((w) => {
            const isCurrent = w.id === currentId;
            return (
              <button
                key={w.id}
                onClick={() => { onPick(w.id); onClose(); }}
                title={w.label}
                className={`relative h-[72px] rounded-lg border flex flex-col items-center pt-2 pb-1.5 px-1.5 transition-colors cursor-pointer ${
                  isCurrent
                    ? "bg-primary/20 border-primary/60"
                    : "bg-secondary/30 border-border/40 hover:bg-secondary/60 hover:border-border"
                }`}
              >
                {/* Fixed-height emoji zone — keeps every cell's emoji on
                    the same y-line even when labels below wrap to two. */}
                <span className="h-7 flex items-center text-2xl leading-none">{w.emoji}</span>
                {/* Fixed-height label zone, reserves space for two lines. */}
                <span className="h-8 mt-1 text-[10px] text-muted-foreground leading-[1.15] text-center whitespace-normal break-words flex items-start justify-center">
                  {w.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
