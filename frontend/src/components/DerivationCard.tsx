import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markdownComponents, remarkPlugins, rehypePlugins } from "./chat/formatMessage";

/**
 * Convert LaTeX-style display-math delimiters \[ ... \] and inline \( ... \)
 * into the dollar-sign delimiters that remark-math expects ($$ ... $$ for
 * block, $ ... $ for inline). The Copy-raw button preserves the original
 * \[...\] text — this conversion is render-side only.
 *
 * Why: stored derivations were authored with the LaTeX-canonical \[...\]
 * delimiters, but remark-math by default only parses dollar-delimited math.
 * Rather than re-storing the data or switching to a non-default remark-math
 * config, this small conversion at render-time keeps the stored format
 * LaTeX-canonical (what an LLM expects to receive when the user copies it)
 * while still rendering prettily through the existing pipeline.
 */
function normalizeMathDelimiters(text: string): string {
  return text
    .replace(/\\\[([\s\S]+?)\\\]/g, (_m, inner) => `\n$$${inner}$$\n`)
    .replace(/\\\(([\s\S]+?)\\\)/g, (_m, inner) => `$${inner}$`);
}

interface Props {
  /** "Character Formula" or "World Formula" */
  label: string;
  /** Loader function returning the stored derivation text (or null if not set). */
  load: () => Promise<string | null>;
  /** Re-fetch dependency — pass character_id or world_id so the component
   * refreshes when the editor switches subject. */
  refetchKey: string;
}

/**
 * Read-only documentary rendering of an entity's derived_formula. The stored
 * text is markdown with KaTeX-renderable display-math blocks (\[ ... \]) at
 * the top and plain-English summary bullets below. Renders both via the
 * existing chat-message markdown pipeline (rehype-katex + remark-math) so
 * formula and prose flow through the same typography rules.
 *
 * Includes a Copy button that copies the RAW derivation text (including the
 * LaTeX sources) to clipboard, so the user can paste into another LLM to
 * tune that LLM to this character/world's register.
 *
 * Editing is intentionally not provided here — per the auto-derivation
 * feature design discipline (.claude/memory/feedback_auto_derivation_
 * design_discipline.md), editable UI requires careful user-friendly design
 * that's not too LaTeX-y, and is deferred. Authoring happens via worldcli
 * derive-character / derive-world for now.
 */
export function DerivationCard({ label, load, refetchKey }: Props) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    load().then((t) => {
      if (cancelled) return;
      setText(t);
      setLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setText(null);
      setLoading(false);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchKey]);

  if (loading) return null;
  if (!text || text.trim().length === 0) return null;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mb-6 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-amber-50/50 via-amber-50/40 to-rose-50/50 dark:from-amber-950/25 dark:via-amber-950/20 dark:to-rose-950/25 px-5 py-4 shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/90">
            {label}
          </h3>
          <span className="text-[10px] italic text-primary/60 truncate">
            — a one-of-a-kind shorthand of how characters in this world hold you
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="h-7 gap-1.5 text-xs text-primary/80 hover:text-primary hover:bg-primary/10 flex-shrink-0"
          title="Copy raw derivation (LaTeX + plain English) to paste into another LLM"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy raw"}
        </Button>
      </div>
      <div className="prose prose-sm max-w-none text-foreground/95">
        <Markdown components={markdownComponents} remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
          {normalizeMathDelimiters(text)}
        </Markdown>
      </div>
    </div>
  );
}
