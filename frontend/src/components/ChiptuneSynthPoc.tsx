import { useRef, useState } from "react";
import { playPhrase, DEMO_PHRASE, type PlayHandle, type ScorePhrase } from "@/lib/chiptune-synth";

const DEMO_TEXT = JSON.stringify(DEMO_PHRASE, null, 2);

export function ChiptuneSynthPoc() {
  const handleRef = useRef<PlayHandle | null>(null);
  const [phraseText, setPhraseText] = useState(DEMO_TEXT);
  const [status, setStatus] = useState<string>("idle");
  const [error, setError] = useState<string | null>(null);

  const stop = () => {
    handleRef.current?.stop();
    handleRef.current = null;
    setStatus("idle");
  };

  const play = () => {
    setError(null);
    let phrase: ScorePhrase;
    try {
      phrase = JSON.parse(phraseText) as ScorePhrase;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return;
    }
    stop();
    const h = playPhrase(phrase);
    handleRef.current = h;
    setStatus(`playing — ${phrase.mood_descriptor} (${phrase.bars} bars @ ${phrase.tempo_bpm} bpm)`);
  };

  const loop = () => {
    setError(null);
    let phrase: ScorePhrase;
    try {
      phrase = JSON.parse(phraseText) as ScorePhrase;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return;
    }
    stop();
    let cancelled = false;
    const playOnce = () => {
      if (cancelled) return;
      const h = playPhrase(phrase);
      handleRef.current = {
        endsAt: h.endsAt,
        stop: () => {
          cancelled = true;
          h.stop();
        },
      };
      const ms = Math.max(0, (h.endsAt - performance.now() / 1000) * 1000) + 50;
      setTimeout(playOnce, ms);
    };
    playOnce();
    setStatus(`looping — ${phrase.mood_descriptor}`);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8 font-mono">
      <header className="mb-6">
        <h1 className="text-2xl mb-1">Chiptune Synth POC</h1>
        <p className="text-stone-400 text-sm">
          Phase 2 of the Real User Held arc. Reads a Score-Phrase Protocol v1 JSON object and
          renders it via Web Audio (4-voice NES-shape palette: 2 pulse / triangle / noise).
        </p>
        <p className="text-stone-500 text-xs mt-2">
          Reference: <code>reports/2026-04-30-1115-chiptune-score-phrase-protocol-v1.md</code>
        </p>
      </header>

      <div className="flex gap-3 mb-4">
        <button
          onClick={play}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded text-stone-50"
        >
          Play once
        </button>
        <button
          onClick={loop}
          className="px-4 py-2 bg-sky-700 hover:bg-sky-600 rounded text-stone-50"
        >
          Loop
        </button>
        <button
          onClick={stop}
          className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded text-stone-50"
        >
          Stop
        </button>
        <button
          onClick={() => setPhraseText(DEMO_TEXT)}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 text-sm"
        >
          Reset to demo
        </button>
      </div>

      <div className="text-sm text-stone-400 mb-2">
        status: <span className="text-stone-200">{status}</span>
        {error && <span className="ml-4 text-rose-400">parse error: {error}</span>}
      </div>

      <textarea
        value={phraseText}
        onChange={(e) => setPhraseText(e.target.value)}
        className="w-full h-[60vh] bg-stone-950 text-stone-200 p-3 rounded border border-stone-700 text-xs"
        spellCheck={false}
      />

      <p className="text-stone-500 text-xs mt-3">
        Edit the JSON above and click Play. Phase 5 (the held-or-not gate) is not this; this is
        the audible probe that proves the synth honors the protocol.
      </p>
    </div>
  );
}
