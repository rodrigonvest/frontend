/**
 * Canais de demonstração, usados SOMENTE com NEXT_PUBLIC_ENABLE_DEMO=1 e Core indisponível.
 * As alterações (active / is_primary) ficam apenas em memória do processo do servidor.
 */
import type { Channel, ChannelPatch, ChannelsResponse } from "../schemas/channel";

type Overrides = Map<string, ChannelPatch>;
const globalStore = globalThis as typeof globalThis & { __copytrixDemoChannelOverrides?: Overrides };
const overrides: Overrides = (globalStore.__copytrixDemoChannelOverrides ??= new Map());

const BASE_CHANNELS: Channel[] = [
  { id: "ch-kim-gold", name: "KIM GOLD SECRET", status: "connected", is_primary: true, active: true, signals_today: 12, signals_total: 1245, last_signal_at: "2026-09-04T14:32:00", logo_key: "crown" },
  { id: "ch-fran", name: "FRAN SIGNALS", status: "connected", active: true, signals_today: 8, signals_total: 892, last_signal_at: "2026-09-04T13:15:00", logo_key: "telegram" },
  { id: "ch-lezzier", name: "LEZZIER FX", status: "connected", active: true, signals_today: 5, signals_total: 654, last_signal_at: "2026-09-04T12:48:00", logo_key: "fx" },
  { id: "ch-academy", name: "ACADEMY CLUB", status: "disconnected", active: false, signals_today: 0, signals_total: 312, last_signal_at: "2026-09-02T14:35:00", logo_key: "ac" },
  { id: "ch-trading-discipline", name: "TRADING DISCIPLINE", status: "connected", active: true, signals_today: 4, signals_total: 521, last_signal_at: "2026-09-04T11:27:00", logo_key: "td" },
  { id: "ch-sniper", name: "SNIPER XAU", status: "connected", active: true, signals_today: 6, signals_total: 438, last_signal_at: "2026-09-04T14:20:00", logo_key: "sniper" },
  { id: "ch-forex-insights", name: "FOREX INSIGHTS", status: "paused", active: false, signals_today: 0, signals_total: 210, last_signal_at: "2026-09-03T14:00:00", logo_key: "bars" },
  { id: "ch-gold-vision", name: "GOLD VISION", status: "connected", active: true, signals_today: 7, signals_total: 396, last_signal_at: "2026-09-04T13:54:00", logo_key: "g" },
];

const withOverrides = (channel: Channel): Channel => ({ ...channel, ...overrides.get(channel.id) });

export function getDemoChannels(): ChannelsResponse {
  return {
    source: "demo",
    generated_at: "2026-09-04T14:35:00",
    overview: {
      connected: 4,
      allowed: 10,
      signals_7d: 2718,
      signals_7d_change: 12.4,
      executed: 2541,
      execution_rate: 93.5,
      avg_signal_seconds: 2.8,
      avg_signal_change: -35,
    },
    items: BASE_CHANNELS.map(withOverrides),
  };
}

export function patchDemoChannel(id: string, patch: ChannelPatch): Channel | null {
  const base = BASE_CHANNELS.find((c) => c.id === id);
  if (!base) return null;
  if (patch.is_primary) {
    for (const other of BASE_CHANNELS) if (other.id !== id) overrides.set(other.id, { ...overrides.get(other.id), is_primary: false });
  }
  overrides.set(id, { ...overrides.get(id), ...patch });
  return withOverrides(base);
}
