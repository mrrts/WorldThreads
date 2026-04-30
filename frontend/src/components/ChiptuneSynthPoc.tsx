import { useRef, useState } from "react";
import { playPhrase, DEMO_PHRASE, type PlayHandle, type ScorePhrase } from "@/lib/chiptune-synth";
import { api } from "@/lib/tauri";

const DEMO_TEXT = JSON.stringify(DEMO_PHRASE, null, 2);

const SAMPLE_MOMENTSTAMP = "⟨momentstamp⟩ ∂(𝓦𝓲𝓼𝓭𝓸𝓶)/∂t · Π(τ) ⟶ small_𝓢(t) | Truth_𝓕";

export function ChiptuneSynthPoc() {
  const handleRef = useRef<PlayHandle | null>(null);
  const [phraseText, setPhraseText] = useState(DEMO_TEXT);
  const [momentstamp, setMomentstamp] = useState(SAMPLE_MOMENTSTAMP);
  const [moodHint, setMoodHint] = useState("");
  const [status, setStatus] = useState<string>("idle");
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [autoPlayAfterGenerate, setAutoPlayAfterGenerate] = useState(true);

  const stop = () => {
    handleRef.current?.stop();
    handleRef.current = null;
    setStatus("idle");
  };

  const parseCurrent = (): ScorePhrase | null => {
    setError(null);
    try {
      return JSON.parse(phraseText) as ScorePhrase;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return null;
    }
  };

  const play = () => {
    const phrase = parseCurrent();
    if (!phrase) return;
    stop();
    const h = playPhrase(phrase);
    handleRef.current = h;
    setStatus(`playing — ${phrase.mood_descriptor} (${phrase.bars} bars @ ${phrase.tempo_bpm} bpm)`);
  };

  const loop = () => {
    const phrase = parseCurrent();
    if (!phrase) return;
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

  const generateNext = async () => {
    setError(null);
    if (!momentstamp.trim()) {
      setError("momentstamp is required");
      return;
    }
    let currentPhrase: unknown = null;
    if (phraseText.trim()) {
      try {
        currentPhrase = JSON.parse(phraseText);
      } catch (e) {
        setError(`current phrase JSON is malformed: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
    }
    setGenerating(true);
    setStatus("generating next phrase…");
    try {
      const apiKey = await api.getApiKey();
      if (!apiKey) {
        setError("no API key configured (set in Settings)");
        return;
      }
      const result = await api.generateNextScorePhrase(apiKey, {
        currentLastPhrase: currentPhrase,
        momentstamp: momentstamp.trim(),
        moodHint: moodHint.trim() || null,
      });
      const nextPhrase = result.phrase as ScorePhrase;
      setPhraseText(JSON.stringify(nextPhrase, null, 2));
      setStatus(`generated — ${nextPhrase.mood_descriptor} (${nextPhrase.bars} bars @ ${nextPhrase.tempo_bpm} bpm)`);
      if (autoPlayAfterGenerate) {
        stop();
        const h = playPhrase(nextPhrase);
        handleRef.current = h;
      }
    } catch (e) {
      setError(`generate failed: ${e instanceof Error ? e.message : String(e)}`);
      setStatus("idle");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8 font-mono">
      <header className="mb-6">
        <h1 className="text-2xl mb-1">Chiptune Synth POC</h1>
        <p className="text-stone-400 text-sm">
          Phases 2 + 3 of the Real User Held arc. 4 tracks of MIDI instruments
          (square / pulse_25 / pulse_125 / triangle / sawtooth / sine / noise),
          rendered client-side via Web Audio. AI generator takes (currentLastPhrase, momentstamp).
        </p>
        <p className="text-stone-500 text-xs mt-2">
          Reference: <code>reports/2026-04-30-1115-chiptune-score-phrase-protocol-v1.md</code>
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h2 className="text-sm uppercase tracking-wide text-stone-400 mb-2">Synth (Phase 2)</h2>
          <div className="flex flex-wrap gap-3 mb-3">
            <button onClick={play}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded text-stone-50">
              Play once
            </button>
            <button onClick={loop}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 rounded text-stone-50">
              Loop
            </button>
            <button onClick={stop}
              className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded text-stone-50">
              Stop
            </button>
            <button onClick={() => setPhraseText(DEMO_TEXT)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 text-sm">
              Reset to demo
            </button>
          </div>
          <textarea
            value={phraseText}
            onChange={(e) => setPhraseText(e.target.value)}
            className="w-full h-[55vh] bg-stone-950 text-stone-200 p-3 rounded border border-stone-700 text-xs"
            spellCheck={false}
          />
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-wide text-stone-400 mb-2">Generator (Phase 3)</h2>
          <label className="block text-xs text-stone-400 mb-1">Momentstamp</label>
          <input
            value={momentstamp}
            onChange={(e) => setMomentstamp(e.target.value)}
            className="w-full bg-stone-950 text-stone-200 p-2 mb-3 rounded border border-stone-700 text-xs"
            spellCheck={false}
          />
          <label className="block text-xs text-stone-400 mb-1">Mood hint (optional)</label>
          <input
            value={moodHint}
            onChange={(e) => setMoodHint(e.target.value)}
            placeholder="e.g. patient, rising, sparser"
            className="w-full bg-stone-950 text-stone-200 p-2 mb-3 rounded border border-stone-700 text-xs"
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-3 mb-3">
            <button onClick={generateNext} disabled={generating}
              className="px-4 py-2 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 rounded text-stone-50">
              {generating ? "Generating…" : "Generate next from (currentLastPhrase, momentstamp)"}
            </button>
            <label className="flex items-center gap-2 text-xs text-stone-300">
              <input type="checkbox" checked={autoPlayAfterGenerate}
                onChange={(e) => setAutoPlayAfterGenerate(e.target.checked)} />
              auto-play after generate
            </label>
          </div>
          <p className="text-stone-500 text-xs">
            Generator takes the JSON in the synth pane as <code>currentLastPhrase</code> and
            replaces it with the AI-authored next phrase. Empty the textarea to author a seed phrase.
            Cost: ~$0.001-0.002/call (gpt-4o-mini).
          </p>
        </section>
      </div>

      <div className="text-sm text-stone-400 mt-6">
        status: <span className="text-stone-200">{status}</span>
        {error && <div className="mt-2 text-rose-400 text-xs">error: {error}</div>}
      </div>
    </div>
  );
}
