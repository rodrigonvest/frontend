import "server-only";
import type { ApiResult } from "../schemas/api";
import { PendingSectionSchema, CHANNEL_SECTIONS, type ChannelSectionId } from "../schemas/channel-sections";
import { attempt, coreRequest } from "./core-client";

const sectionPath = (channelId: string, section: ChannelSectionId) => `/api/channels/${encodeURIComponent(channelId)}/${CHANNEL_SECTIONS[section].path}`;

/** GET /api/channels/{id}/<seção>. Sem fallback demo: seções ainda não têm contrato confirmado. */
export function getChannelSection(channelId: string, section: ChannelSectionId): Promise<ApiResult<unknown>> {
  return attempt(() => coreRequest(sectionPath(channelId, section), { schema: CHANNEL_SECTIONS[section].schema }));
}

/** PATCH /api/channels/{id}/<seção> (somente seções graváveis). */
export function updateChannelSection(channelId: string, section: ChannelSectionId, body: Record<string, unknown>): Promise<ApiResult<unknown>> {
  return attempt(() => coreRequest(sectionPath(channelId, section), { method: "PATCH", body, schema: PendingSectionSchema }));
}
