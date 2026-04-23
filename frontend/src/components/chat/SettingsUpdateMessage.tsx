import { useMemo } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { type Message } from "@/lib/tauri";

interface Props {
  message: Message;
}

interface ParsedChange {
  key: string;
  label: string;
  from: string;
  to: string;
}

interface ParsedBody {
  changes: ParsedChange[];
}

/// Inline marker shown in chat history when the user changes a chat
/// setting (response length, narration tone, etc.). Earthy-codeblock
/// styling: warm neutrals, monospace, soft border — reads as a quiet
/// system note in the timeline rather than a bright callout. Same row
/// reaches the LLM through the dialogue prompt's history block, where
/// it's formatted as "[Chat settings updated at this moment] ..." so
/// the model knows previous replies were under different settings.
export function SettingsUpdateMessage({ message }: Props) {
  const parsed = useMemo<ParsedBody | null>(() => {
    try {
      const obj = JSON.parse(message.content) as ParsedBody;
      if (Array.isArray(obj?.changes)) return obj;
    } catch {
      // fall through
    }
    return null;
  }, [message.content]);

  if (!parsed || parsed.changes.length === 0) return null;

  return (
    <div className="my-3 flex justify-center">
      <div
        className="
          inline-flex flex-col gap-1 max-w-[80%]
          px-3 py-2 rounded-md
          border border-stone-500/30
          bg-stone-800/30 dark:bg-stone-900/40
          font-mono text-[11px] leading-relaxed
          text-stone-300 dark:text-stone-200/85
        "
      >
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400/70 not-italic">
          <SettingsIcon size={10} />
          <span>You changed chat settings</span>
        </div>
        {parsed.changes.map((c, i) => (
          <div key={i} className="pl-1">
            {c.label}: <span className="text-stone-400/80">{c.from || "—"}</span>
            <span className="mx-1 text-stone-500">→</span>
            <span className="text-stone-100">{c.to || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
