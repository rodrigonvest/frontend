import { z } from "zod";

/** Estados comuns aos quatro indicadores da Topbar. `unavailable` = sem dado real (Core inacessível ou endpoint ainda não confirmado). */
export const SystemStatusValueSchema = z.enum(["connected", "disconnected", "connecting", "error", "unavailable"]);
export type SystemStatusValue = z.infer<typeof SystemStatusValueSchema>;

const IntegrationStatusSchema = z.object({ status: SystemStatusValueSchema });

/** Contrato do status do sistema consumido pela UI: { copier, telegram, mt4, mt5 }. */
export const SystemStatusSchema = z.object({
  copier: IntegrationStatusSchema,
  telegram: IntegrationStatusSchema,
  mt4: IntegrationStatusSchema,
  mt5: IntegrationStatusSchema,
});
export type SystemStatus = z.infer<typeof SystemStatusSchema>;

/** Estado neutro "aguardando dados": nunca representa uma conexão real. */
export const UNAVAILABLE_SYSTEM_STATUS: SystemStatus = {
  copier: { status: "unavailable" },
  telegram: { status: "unavailable" },
  mt4: { status: "unavailable" },
  mt5: { status: "unavailable" },
};
