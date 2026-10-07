import type { z } from "zod";
import { API_ERROR_MESSAGES, ApiErrorResponseSchema, apiSuccessSchema, type ApiResult } from "../schemas/api";
import { ChannelSchema, type Channel, type ChannelPatch } from "../schemas/channel";
import { ChannelConfigSchema, type CoreChannelConfig, type CoreChannelConfigUpdate } from "../schemas/channel-config";

/** Chamadas do navegador aos Route Handlers do frontend (que falam com o Core). */

async function call<S extends z.ZodType>(url: string, method: "PATCH", body: unknown, schema: S): Promise<ApiResult<z.output<S>>> {
  let response: Response;
  try {
    response = await fetch(url, { method, headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body), cache: "no-store" });
  } catch {
    return { ok: false, error: { kind: "unavailable", message: API_ERROR_MESSAGES.unavailable } };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return { ok: false, error: { kind: "invalid_response", message: API_ERROR_MESSAGES.invalid_response } };
  }

  if (!response.ok) {
    const failure = ApiErrorResponseSchema.safeParse(payload);
    return { ok: false, error: failure.success ? failure.data.error : { kind: "error", message: API_ERROR_MESSAGES.error } };
  }

  const success = apiSuccessSchema(schema).safeParse(payload);
  if (!success.success) return { ok: false, error: { kind: "invalid_response", message: API_ERROR_MESSAGES.invalid_response } };
  const parsed = success.data as { data: z.output<S>; source: "core" | "demo" };
  return { ok: true, data: parsed.data, source: parsed.source };
}

export function saveChannelConfig(channelId: string, update: CoreChannelConfigUpdate): Promise<ApiResult<CoreChannelConfig>> {
  return call(`/api/channels/${encodeURIComponent(channelId)}/config`, "PATCH", update, ChannelConfigSchema);
}

export function saveChannelFlags(channelId: string, patch: ChannelPatch): Promise<ApiResult<Channel>> {
  return call(`/api/channels/${encodeURIComponent(channelId)}`, "PATCH", patch, ChannelSchema);
}
