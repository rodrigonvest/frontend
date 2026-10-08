import { getSystemStatus } from "../../../lib/system-status";
import { errorResponse, resultResponse } from "../../../lib/route-response";
import { SystemStatusSchema } from "../../../schemas/system-status";

export const dynamic = "force-dynamic";

/** GET /api/system-status — status de copier, telegram, mt4 e mt5. Falhas do Core nunca viram sucesso. */
export async function GET() {
  const result = await getSystemStatus();
  if (result.ok && !SystemStatusSchema.safeParse(result.data).success) return errorResponse("invalid_response");
  return resultResponse(result);
}
