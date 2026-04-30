// Chiptune Score-Phrase synth (Phase 2 POC of Real User Held arc).
// Reads phrase JSON conforming to reports/2026-04-30-1115-chiptune-score-phrase-protocol-v1.md
// and renders it via Web Audio: 2 pulse voices (PeriodicWave with arbitrary duty cycle),
// 1 triangle (built-in oscillator), 1 noise (looped white-noise AudioBuffer with playback-rate
// pitching). NES-era constraints honored: discrete pitches, discrete durations, no reverb,
// no filter sweeps.

export type VoiceName = 'pulse_a' | 'pulse_b' | 'triangle' | 'noise';

export interface NoteEvent {
  tick: number;
  duration: number;
  midi: number | null;
  velocity?: number;
  duty?: number;
}

export interface ScorePhrase {
  protocol_version: string;
  phrase_id: string;
  previous_phrase_id: string | null;
  tempo_bpm: number;
  time_signature: [number, number];
  subdivision: number;
  bars: number;
  key: string;
  mood_descriptor: string;
  momentstamp_basis: string;
  voices: Partial<Record<VoiceName, NoteEvent[]>>;
}

let audioCtx: AudioContext | null = null;
const pulseWaveCache = new Map<number, PeriodicWave>();
let noiseBuffer: AudioBuffer | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Pulse-wave Fourier coefficients for arbitrary duty d ∈ (0, 1):
//   real[n] = (2/πn) sin(2πnd)
//   imag[n] = (2/πn) (1 − cos(2πnd))
// Verified at d=0.5: real[n]=0; imag[n]=4/(πn) for odd n — the classic 50% square wave.
function getPulsePeriodicWave(ctx: AudioContext, duty: number): PeriodicWave {
  const key = Math.round(duty * 1000) / 1000;
  const cached = pulseWaveCache.get(key);
  if (cached) return cached;
  const harmonics = 64;
  const real = new Float32Array(harmonics + 1);
  const imag = new Float32Array(harmonics + 1);
  for (let n = 1; n <= harmonics; n++) {
    real[n] = (2 / (Math.PI * n)) * Math.sin(2 * Math.PI * n * key);
    imag[n] = (2 / (Math.PI * n)) * (1 - Math.cos(2 * Math.PI * n * key));
  }
  const wave = ctx.createPeriodicWave(real, imag, { disableNormalization: false });
  pulseWaveCache.set(key, wave);
  return wave;
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (noiseBuffer) return noiseBuffer;
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  noiseBuffer = buf;
  return buf;
}

// secondsPerTick = 1 / (beatsPerSecond × ticksPerBeat).
// ticksPerBeat = subdivision / time_signature[1] (denominator names the beat-note value).
// 4/4 with subdivision=16 → 4 ticks/beat (sixteenth-notes). 6/8 with subdivision=16 → 2 ticks/beat (eighth-notes).
export function secondsPerTick(phrase: ScorePhrase): number {
  const beatsPerSecond = phrase.tempo_bpm / 60;
  const ticksPerBeat = phrase.subdivision / phrase.time_signature[1];
  return 1 / (beatsPerSecond * ticksPerBeat);
}

function scheduleNote(
  ctx: AudioContext,
  voice: VoiceName,
  note: NoteEvent,
  startTime: number,
  endTime: number,
  destination: AudioNode,
): void {
  if (note.midi === null) return;

  const velocity = (note.velocity ?? 80) / 127;
  // Triangle bass needs slightly more headroom or it gets buried.
  const voiceTrim = voice === 'triangle' ? 0.28 : voice === 'noise' ? 0.12 : 0.18;
  const peak = velocity * voiceTrim;

  const attack = 0.005;
  const release = 0.025;
  const sustainStart = startTime + attack;
  const releaseStart = Math.max(sustainStart, endTime - release);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peak, sustainStart);
  gain.gain.setValueAtTime(peak, releaseStart);
  gain.gain.exponentialRampToValueAtTime(0.0001, endTime);
  gain.connect(destination);

  if (voice === 'noise') {
    const src = ctx.createBufferSource();
    src.buffer = getNoiseBuffer(ctx);
    src.loop = true;
    // Treat midi=60 as 1.0×; higher midi → brighter noise via faster playback.
    src.playbackRate.value = Math.pow(2, (note.midi - 60) / 12);
    src.connect(gain);
    src.start(startTime);
    src.stop(endTime + 0.05);
  } else {
    const osc = ctx.createOscillator();
    if (voice === 'triangle') {
      osc.type = 'triangle';
    } else {
      osc.setPeriodicWave(getPulsePeriodicWave(ctx, note.duty ?? 0.5));
    }
    osc.frequency.value = midiToFreq(note.midi);
    osc.connect(gain);
    osc.start(startTime);
    osc.stop(endTime + 0.05);
  }
}

export interface PlayHandle {
  endsAt: number;
  stop: () => void;
}

export function playPhrase(
  phrase: ScorePhrase,
  opts?: { masterVolume?: number; startAt?: number },
): PlayHandle {
  const ctx = getContext();
  if (ctx.state === 'suspended') void ctx.resume();
  const sptick = secondsPerTick(phrase);
  const masterVolume = opts?.masterVolume ?? 0.5;
  const start = opts?.startAt ?? ctx.currentTime + 0.05;

  const master = ctx.createGain();
  master.gain.value = masterVolume;
  master.connect(ctx.destination);

  let phraseEnd = start;
  const voices: VoiceName[] = ['pulse_a', 'pulse_b', 'triangle', 'noise'];
  for (const v of voices) {
    const notes = phrase.voices[v] ?? [];
    for (const note of notes) {
      const noteStart = start + note.tick * sptick;
      const noteEnd = noteStart + note.duration * sptick;
      scheduleNote(ctx, v, note, noteStart, noteEnd, master);
      if (noteEnd > phraseEnd) phraseEnd = noteEnd;
    }
  }

  return {
    endsAt: phraseEnd,
    stop: () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.01);
        setTimeout(() => master.disconnect(), 200);
      } catch {
        // ctx torn down — ignore
      }
    },
  };
}

// Hand-authored demo phrase. Not from a real momentstamp; used to verify the synth
// renders all four voices correctly before the AI generator (Phase 3) goes live.
// Mood: "open hesitation" — sparse pulse melody over a slow triangle bass walk,
// quiet noise hits on the second and fourth quarters of each bar.
export const DEMO_PHRASE: ScorePhrase = {
  protocol_version: '1.0',
  phrase_id: 'demo-phrase-001',
  previous_phrase_id: null,
  tempo_bpm: 96,
  time_signature: [4, 4],
  subdivision: 16,
  bars: 2,
  key: 'C major',
  mood_descriptor: 'open hesitation',
  momentstamp_basis: 'demo (hand-authored, not from real momentstamp)',
  voices: {
    pulse_a: [
      { tick: 0,  duration: 6, midi: 64, velocity: 65, duty: 0.25 },
      { tick: 8,  duration: 4, midi: 67, velocity: 75, duty: 0.25 },
      { tick: 12, duration: 4, midi: 65, velocity: 60, duty: 0.25 },
      { tick: 16, duration: 6, midi: 64, velocity: 70, duty: 0.25 },
      { tick: 24, duration: 8, midi: 60, velocity: 70, duty: 0.25 },
    ],
    pulse_b: [
      { tick: 0,  duration: 16, midi: 55, velocity: 45, duty: 0.5 },
      { tick: 16, duration: 16, midi: 57, velocity: 45, duty: 0.5 },
    ],
    triangle: [
      { tick: 0,  duration: 16, midi: 36, velocity: 100 },
      { tick: 16, duration: 16, midi: 41, velocity: 100 },
    ],
    noise: [
      { tick: 4,  duration: 1, midi: 72, velocity: 35 },
      { tick: 12, duration: 1, midi: 72, velocity: 35 },
      { tick: 20, duration: 1, midi: 72, velocity: 35 },
      { tick: 28, duration: 1, midi: 72, velocity: 35 },
    ],
  },
};
