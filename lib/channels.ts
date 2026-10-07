import "server-only";
import { type ApiResult } from "../schemas/api";
import { ChannelSchema, ChannelsBodySchema, type Channel, type ChannelPatch, type ChannelsOverview, type ChannelsResponse } from "../schemas/channel";
import { attempt, coreRequest } from "./core-client";
import { patchDemoChannel, getDemoChannels } from "./channels-demo";
import { DEMO_MODE } from "./demo-mode";

export type { ChannelStatus, ChannelsOverview, ChannelsResponse, TelegramChannel } from "../schemas/channel";

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

/** GET /api/channels. Dados demo só são usados com NEXT_PUBLIC_ENABLE_DEMO=1 e Core indisponível. */
export async function getChannels(): Promise<ChannelsResponse> {
  const result = await attempt(() => coreRequest("/api/channels", { schema: ChannelsBodySchema, timeoutMs: 3000 }));
  if (result.ok) return { ...result.data, source: "api" };
  if (DEMO_MODE && result.error.kind === "unavailable") return getDemoChannels();
  return {
    items: [],
    overview: emptyOverview,
    generated_at: new Date().toISOString(),
    source: "api",
    error: result.error.message,
    errorKind: result.error.kind,
  };
}

/** PATCH /api/channels/{id} — alterna `active` / `is_primary` e devolve o canal como o Core o persistiu. */
export async function patchChannel(id: string, patch: ChannelPatch): Promise<ApiResult<Channel>> {
  const result = await attempt(() => coreRequest(`/api/channels/${encodeURIComponent(id)}`, { method: "PATCH", body: patch, schema: ChannelSchema }));
  if (!result.ok && DEMO_MODE && result.error.kind === "unavailable") {
    const channel = patchDemoChannel(id, patch);
    if (channel) return { ok: true, data: channel, source: "demo" };
  }
  return result;
}
