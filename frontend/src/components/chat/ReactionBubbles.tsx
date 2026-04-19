import type { Reaction } from "@/lib/tauri";

export function ReactionBubbles({
  reactions,
  isUser: _isUser,
  characterNameById = {},
  userDisplayName = "You",
}: {
  reactions: Reaction[];
  isUser: boolean;
  /** character_id → display_name map, for attributing character reactions. */
  characterNameById?: Record<string, string>;
  userDisplayName?: string;
}) {
  if (reactions.length === 0) return null;

  // User-side: group by emoji only (one user → one bubble per emoji).
  const userGroups = new Map<string, number>();
  // Character-side: group by (emoji, sender_character_id) so Alice's 🥺
  // and Bob's 🥺 render as two distinct bubbles with correct tooltips.
  type CharGroup = { emoji: string; senderId: string | null; count: number };
  const charGroups = new Map<string, CharGroup>();

  for (const r of reactions) {
    if (r.reactor === "user") {
      userGroups.set(r.emoji, (userGroups.get(r.emoji) ?? 0) + 1);
    } else {
      const senderId = r.sender_character_id ?? null;
      const key = `${r.emoji}::${senderId ?? "_"}`;
      const existing = charGroups.get(key);
      if (existing) existing.count += 1;
      else charGroups.set(key, { emoji: r.emoji, senderId, count: 1 });
    }
  }

  const charName = (id: string | null): string => {
    if (!id) return "Character";
    return characterNameById[id] ?? "Character";
  };

  return (
    <>
      {Array.from(userGroups.entries()).map(([emoji, count]) => (
        <div key={`u-${emoji}`} className="relative group/rxn">
          <span className="inline-flex items-center gap-0.5 text-xs bg-secondary/80 border border-border rounded-full px-1.5 py-0.5 backdrop-blur-sm">
            <span className="text-sm leading-none">{emoji}</span>
            {count > 1 && (
              <span className="text-[10px] text-muted-foreground">{count}</span>
            )}
          </span>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 text-[10px] font-medium text-white bg-black rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover/rxn:opacity-100 pointer-events-none transition-opacity z-50">
            {userDisplayName}
          </span>
        </div>
      ))}
      {Array.from(charGroups.values()).map(({ emoji, senderId, count }) => {
        const name = charName(senderId);
        return (
          <div key={`a-${emoji}-${senderId ?? "_"}`} className="relative group/rxn">
            <span className="inline-flex items-center gap-1.5 bg-secondary/80 border border-border rounded-full pl-2.5 pr-3 py-1 backdrop-blur-sm shadow-sm">
              <span className="text-2xl leading-none">{emoji}</span>
              {/* Inline attributor: truncates past ~12ch so a line of
                  reactions doesn't sprawl; tooltip below still carries
                  the full name, and can later carry "Alice, Bob, …" when
                  multiple reactors are merged into one bubble. */}
              <span className="text-[11px] font-medium text-muted-foreground max-w-[12ch] truncate">
                {name}
              </span>
              {count > 1 && (
                <span className="text-xs text-muted-foreground">{count}</span>
              )}
            </span>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 text-[10px] font-medium text-white bg-black rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover/rxn:opacity-100 pointer-events-none transition-opacity z-50">
              {name}
            </span>
          </div>
        );
      })}
    </>
  );
}
