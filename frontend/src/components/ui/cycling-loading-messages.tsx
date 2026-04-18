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
 * Shows one message at a time from `messages`, cycling every `intervalMs` and
 * fading between them. Intended as a stand-in for a static "Loading..." label
 * when the underlying work has long ingest/prep phases — gives the user
 * something to read rather than a frozen screen.
 */
export function CyclingLoadingMessages({ messages, intervalMs = 2400, className }: Props) {
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

  const current = messages[idx] ?? "";

  // key={idx} remounts the span so the fade-in animation retriggers each cycle.
  return (
    <span
      key={idx}
      className={cn("inline-block animate-in fade-in duration-500", className)}
    >
      {current}
    </span>
  );
}
