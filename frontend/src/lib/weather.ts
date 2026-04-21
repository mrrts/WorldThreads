/**
 * Canonical weather catalog for the app's world state. IDs are stable
 * string keys stored in `world.state.weather` — the backend has a
 * parallel mapping in `src-tauri/src/ai/prompts.rs` (`weather_meta`)
 * that must stay in lockstep with this list. Change both sides
 * together.
 *
 * Emoji choice: one emoji per state, distinct across the set so each
 * icon reads unambiguously in the sidebar / picker. Labels are short
 * (few words) — user-requested simplicity, no numeric temperatures.
 */
export interface WeatherOption {
  id: string;
  emoji: string;
  label: string;
}

export const WEATHER_OPTIONS: readonly WeatherOption[] = [
  { id: "sunny_clear",       emoji: "☀️",  label: "Sunny and clear" },
  { id: "mostly_sunny",      emoji: "🌤️", label: "Mostly sunny" },
  { id: "partly_cloudy",     emoji: "⛅",  label: "Partly cloudy" },
  { id: "overcast",          emoji: "☁️",  label: "Overcast" },
  { id: "sun_showers",       emoji: "🌦️", label: "Sun showers" },
  { id: "drizzle",           emoji: "💧",  label: "Light drizzle" },
  { id: "steady_rain",       emoji: "🌧️", label: "Steady rain" },
  { id: "thunderstorm",      emoji: "⛈️",  label: "Thunderstorm" },
  { id: "distant_lightning", emoji: "🌩️", label: "Distant lightning" },
  { id: "light_snow",        emoji: "🌨️", label: "Light snow" },
  { id: "heavy_snow",        emoji: "❄️",  label: "Heavy snow" },
  { id: "fog",               emoji: "🌫️", label: "Foggy" },
  { id: "windy",             emoji: "🌬️", label: "Windy" },
  { id: "windstorm",         emoji: "🌪️", label: "Windstorm" },
  { id: "rainbow",           emoji: "🌈",  label: "Rainbow after rain" },
  { id: "hot",               emoji: "🥵",  label: "Sweltering heat" },
  { id: "humid",             emoji: "🌡️", label: "Humid and close" },
  { id: "freezing",          emoji: "🥶",  label: "Freezing" },
  { id: "cool_crisp",        emoji: "🍂",  label: "Cool and crisp" },
];

export function weatherById(id: string | null | undefined): WeatherOption | null {
  if (!id) return null;
  return WEATHER_OPTIONS.find((w) => w.id === id) ?? null;
}
