import { patchChannel } from "../../../../lib/channels";
import { errorResponse, readJson, resultResponse } from "../../../../lib/route-response";
import { ChannelIdSchema, ChannelPatchSchema } from "../../../../schemas/channel";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

/** Altera `active` e/ou `is_primary` do canal no Core. */
export async function PATCH(request: Request, { params }: Context) {
  const id = ChannelIdSchema.safeParse((await params).id);
  if (!id.success) return errorResponse("not_found");

  const json = await readJson(request);
  if (!json.ok) return errorResponse("invalid_request", "Corpo da requisição inválido.");
  const body = ChannelPatchSchema.safeParse(json.body);
  if (!body.success) return errorResponse("invalid_request", body.error.issues[0]?.message ?? "Dados inválidos.");

  return resultResponse(await patchChannel(id.data, body.data));
}
