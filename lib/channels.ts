import { DEMO_ENABLED } from "./demo-data";
import { getDemoChannels } from "./channels-demo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export type ChannelStatus = "connected" | "disconnected" | "paused";

export type TelegramChannel = {
  id: string;
  name: string;
  status: ChannelStatus;
  is_primary?: boolean;
  active: boolean;
  signals_today: number;
  signals_total: number;
  last_signal_at: string | null;
  avatar_url?: string | null;
  logo_key?: string | null;
};

export type ChannelsOverview = {
  connected: number;
  allowed: number;
  signals_7d: number;
  signals_7d_change: number;
  executed: number;
  execution_rate: number;
  avg_signal_seconds: number;
  avg_signal_change: number;
};

export type ChannelsResponse = {
  items: TelegramChannel[];
  overview: ChannelsOverview;
  generated_at: string;
  source: "api" | "demo";
  error?: string;
};

const emptyOverview: ChannelsOverview = {
  connected: 0,
  allowed: 0,
  signals_7d: 0,
  signals_7d_change: 0,
  executed: 0,
  execution_rate: 0,
  avg_signal_seconds: 0,
  avg_signal_change: 0,
};

export async function getChannels(): Promise<ChannelsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/channels`, { cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (!response.ok) throw new Error(`Channels request failed: ${response.status}`);
    const body = (await response.json()) as Omit<ChannelsResponse, "source">;
    return { ...body, source: "api" };
  } catch {
    if (DEMO_ENABLED) return getDemoChannels();
    return {
      items: [],
      overview: emptyOverview,
      generated_at: new Date().toISOString(),
      source: "api",
      error: "Não foi possível conectar à API do Copytrix. Verifique se o backend está ativo.",
    };
  }
}
