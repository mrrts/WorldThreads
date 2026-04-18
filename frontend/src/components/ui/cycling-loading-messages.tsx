import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Messages to cycle through, shown in order then looped. Pass the one you
   *  most want the user to see first at index 0. */
  messages: string[];
  /** Milliseconds each message is visible before cycling to the next. */
  intervalMs?: number;
  /** Optional class names applied to the wrapping span. */
  className?: string;
}

/**
 * Shows one message at a time from `messages`, cross-fading to the next every
 * `intervalMs` and pulsing gently while visible. Intended as a stand-in for a
 * static "Loading..." label when the underlying work has long ingest/prep
 * phases — gives the user something to read rather than a frozen screen.
 *
 * Implementation: all messages are rendered stacked in a single grid cell so
 * the container is sized by the longest one (no jitter on cycle). Opacity
 * transitions on the outer wrapper do the cross-fade; an inner span carries
 * the pulse so the two animations don't fight over the same property.
 */
export function CyclingLoadingMessages({ messages, intervalMs = 7200, className }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [messages.length, intervalMs]);

  // Reset if the messages array identity changes (different caller context).
  useEffect(() => { setIdx(0); }, [messages]);

  return (
    <span className={cn("inline-grid relative text-center", className)}>
      {messages.map((m, i) => (
        <span
          key={i}
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-700 ease-in-out",
            i === idx ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="animate-pulse">{m}</span>
        </span>
      ))}
    </span>
  );
}
