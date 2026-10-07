import { getChannelSection, updateChannelSection } from "../../../../../../lib/channel-sections";
import { errorResponse, readJson, resultResponse } from "../../../../../../lib/route-response";
import { ChannelIdSchema } from "../../../../../../schemas/channel";
import { CHANNEL_SECTIONS, CHANNEL_SECTION_IDS, PendingSectionSchema, type ChannelSectionId } from "../../../../../../schemas/channel-sections";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string; section: string }> };

const isSection = (value: string): value is ChannelSectionId => (CHANNEL_SECTION_IDS as readonly string[]).includes(value);

/** Proxy genérico das abas ainda sem formulário (contrato em schemas/channel-sections.ts). */
export async function GET(_request: Request, { params }: Context) {
  const { id, section } = await params;
  const channelId = ChannelIdSchema.safeParse(id);
  if (!channelId.success || !isSection(section)) return errorResponse("not_found");
  return resultResponse(await getChannelSection(channelId.data, section));
}

export async function PATCH(request: Request, { params }: Context) {
  const { id, section } = await params;
  const channelId = ChannelIdSchema.safeParse(id);
  if (!channelId.success || !isSection(section) || !CHANNEL_SECTIONS[section].writable) return errorResponse("not_found");

  const json = await readJson(request);
  const body = json.ok ? PendingSectionSchema.safeParse(json.body) : null;
  if (!body?.success) return errorResponse("invalid_request", "Corpo da requisição inválido.");

  return resultResponse(await updateChannelSection(channelId.data, section, body.data));
}
