import "server-only";
import { API_ERROR_MESSAGES, type ApiResult } from "../schemas/api";
import { ChannelConfigSchema, type CoreChannelConfig, type CoreChannelConfigUpdate } from "../schemas/channel-config";
import { attempt, coreRequest } from "./core-client";
import { getDemoChannelConfig, updateDemoChannelConfig } from "./channel-config-demo";
import { getDemoChannels } from "./channels-demo";
import { DEMO_MODE } from "./demo-mode";

const configPath = (channelId: string) => `/api/channels/${encodeURIComponent(channelId)}/config`;

function demoChannel(channelId: string) {
  return getDemoChannels().items.find((c) => c.id === channelId);
}

const notFound = { ok: false, error: { kind: "not_found", message: API_ERROR_MESSAGES.not_found } } as const;

/** GET /api/channels/{id}/config */
export async function getChannelConfig(channelId: string): Promise<ApiResult<CoreChannelConfig>> {
  const result = await attempt(() => coreRequest(configPath(channelId), { schema: ChannelConfigSchema }));
  if (!result.ok && DEMO_MODE && result.error.kind === "unavailable") {
    const channel = demoChannel(channelId);
    return channel ? { ok: true, data: getDemoChannelConfig(channel), source: "demo" } : notFound;
  }
  return result;
}

/** PATCH /api/channels/{id}/config — devolve a configuração como o Core a persistiu. */
export async function updateChannelConfig(channelId: string, update: CoreChannelConfigUpdate): Promise<ApiResult<CoreChannelConfig>> {
  const result = await attempt(() => coreRequest(configPath(channelId), { method: "PATCH", body: update, schema: ChannelConfigSchema }));
  if (!result.ok && DEMO_MODE && result.error.kind === "unavailable") {
    const channel = demoChannel(channelId);
    return channel ? { ok: true, data: updateDemoChannelConfig(channel, update), source: "demo" } : notFound;
  }
  return result;
}
