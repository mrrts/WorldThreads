import { useMemo } from "react";
import { MapPin } from "lucide-react";
import { type Message } from "@/lib/tauri";

interface Props {
  message: Message;
}

interface ParsedBody {
  from: string | null;
  to: string;
}

/// Inline marker shown in chat history when the user updates the
/// chat's current location via the title-bar location modal. Same row
/// reaches the LLM through the dialogue prompt's history block as
/// "[Scene moved] Scene moved from X to Y" so the model knows replies
/// before this row were grounded in a different place. Visual style
/// matches SettingsUpdateMessage's quiet-system-note register.
export function LocationChangeCard({ message }: Props) {
  const parsed = useMemo<ParsedBody | null>(() => {
    try {
      const obj = JSON.parse(message.content) as ParsedBody;
      if (typeof obj?.to === "string" && obj.to.length > 0) return obj;
    } catch {
      // fall through
    }
    return null;
  }, [message.content]);

  if (!parsed) return null;

  const isFirst = !parsed.from;

  return (
    <div className="my-3 flex justify-center">
      <div
        className="
          inline-flex items-center gap-2 max-w-[80%]
          px-3 py-1.5 rounded-md
          border border-emerald-700/30
          bg-emerald-950/30
          text-[11px] leading-relaxed
          text-emerald-100/85
        "
      >
        <MapPin size={11} className="text-emerald-400/80 flex-shrink-0" />
        <span className="text-[10px] uppercase tracking-wider text-emerald-400/70 font-semibold">
          {isFirst ? "Location set" : "Scene moved"}
        </span>
        {!isFirst && (
          <>
            <span className="text-emerald-200/60">{parsed.from}</span>
            <span className="text-emerald-500/60">→</span>
          </>
        )}
        <span className="text-emerald-50">{parsed.to}</span>
      </div>
    </div>
  );
}
