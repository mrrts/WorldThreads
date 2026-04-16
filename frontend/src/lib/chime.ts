let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Play a pleasant two-tone chime. */
export function playChime() {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Eb4 → Bb4 → G5
    const frequencies = [311.13, 466.16, 783.99];
    const durations = [0.12, 0.12, 0.2];
    let offset = 0;

    for (let i = 0; i < frequencies.length; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequencies[i];
      gain.gain.setValueAtTime(0, now + offset);
      gain.gain.linearRampToValueAtTime(0.15, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + durations[i]);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + durations[i]);
      offset += durations[i] * 0.7; // slight overlap
    }
  } catch {
    // Audio context not available — silently ignore
  }
}
