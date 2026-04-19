import type { Reaction } from "@/lib/tauri";

export function ReactionBubbles({
  reactions,
  isUser: _isUser,
}: {
  reactions: Reaction[];
  isUser: boolean;
}) {
  if (reactions.length === 0) return null;

  // Split by reactor so we can style character-emitted reactions larger —
  // the character's emoji arc across a thread is a primary UX signal of
  // how the scene is landing, and deserves visual prominence over the
  // user's own reactions.
  const userGroups = new Map<string, number>();
  const charGroups = new Map<string, number>();
  for (const r of reactions) {
    const bucket = r.reactor === "assistant" ? charGroups : userGroups;
    bucket.set(r.emoji, (bucket.get(r.emoji) ?? 0) + 1);
  }

  return (
    <>
      {Array.from(userGroups.entries()).map(([emoji, count]) => (
        <span
          key={`u-${emoji}`}
          className="inline-flex items-center gap-0.5 text-xs bg-secondary/80 border border-border rounded-full px-1.5 py-0.5 backdrop-blur-sm"
          title="You"
        >
          <span className="text-sm leading-none">{emoji}</span>
          {count > 1 && (
            <span className="text-[10px] text-muted-foreground">{count}</span>
          )}
        </span>
      ))}
      {Array.from(charGroups.entries()).map(([emoji, count]) => (
        <span
          key={`a-${emoji}`}
          className="inline-flex items-center gap-1 bg-secondary/80 border border-border rounded-full px-2.5 py-1 backdrop-blur-sm shadow-sm"
          title="Character"
        >
          <span className="text-2xl leading-none">{emoji}</span>
          {count > 1 && (
            <span className="text-xs text-muted-foreground">{count}</span>
          )}
        </span>
      ))}
    </>
  );
}
