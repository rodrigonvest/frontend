import { getChannelConfig, updateChannelConfig } from "../../../../../lib/channel-config-service";
import { errorResponse, readJson, resultResponse } from "../../../../../lib/route-response";
import { ChannelConfigUpdateSchema } from "../../../../../schemas/channel-config";
import { ChannelIdSchema } from "../../../../../schemas/channel";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const id = ChannelIdSchema.safeParse((await params).id);
  if (!id.success) return errorResponse("not_found");
  return resultResponse(await getChannelConfig(id.data));
}

export async function PATCH(request: Request, { params }: Context) {
  const id = ChannelIdSchema.safeParse((await params).id);
  if (!id.success) return errorResponse("not_found");

  const json = await readJson(request);
  if (!json.ok) return errorResponse("invalid_request", "Corpo da requisição inválido.");
  const body = ChannelConfigUpdateSchema.safeParse(json.body);
  if (!body.success) return errorResponse("invalid_request", body.error.issues[0]?.message ?? "Configuração inválida.");

  return resultResponse(await updateChannelConfig(id.data, body.data));
}
