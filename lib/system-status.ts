import "server-only";
import { type ApiResult } from "../schemas/api";
import { SystemStatusSchema, type SystemStatus } from "../schemas/system-status";
import { attempt, coreRequest } from "./core-client";

/**
 * PENDENTE DO CORE: o endpoint que expõe copier/telegram/mt4/mt5 ainda não foi confirmado.
 * Enquanto for `null`, nenhuma chamada ao Core é feita e o serviço devolve falha `unavailable`
 * (a UI mostra o estado neutro). Ao confirmar o endpoint:
 *   1. defina o caminho aqui (ex.: "/api/..."),
 *   2. ajuste `CorePayloadSchema` ao payload real,
 *   3. ajuste `mapCorePayload` para converter o payload no contrato SystemStatus.
 */
const CORE_SYSTEM_STATUS_PATH = null as string | null;

/** Payload esperado do Core. Hoje assume o mesmo formato de SystemStatus; confirmar com o Core. */
const CorePayloadSchema = SystemStatusSchema;

function mapCorePayload(payload: typeof CorePayloadSchema._output): SystemStatus {
  return payload;
}

/** Core payload -> validar -> mapear -> SystemStatus. Nunca devolve dados fictícios. */
export async function getSystemStatus(): Promise<ApiResult<SystemStatus>> {
  if (CORE_SYSTEM_STATUS_PATH === null) {
    return { ok: false, error: { kind: "unavailable", message: "O status do sistema ainda não está disponível no Core." } };
  }
  const path = CORE_SYSTEM_STATUS_PATH;

  const result = await attempt(() => coreRequest(path, { schema: CorePayloadSchema, timeoutMs: 3000 }));
  if (!result.ok) return result;
  return { ok: true, data: mapCorePayload(result.data), source: result.source };
}
