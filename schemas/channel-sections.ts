import { z } from "zod";

/**
 * CONTRATO ESPERADO DO CORE — abas além de "Geral"
 *
 * NENHUM destes endpoints está confirmado no Core. A estrutura abaixo existe para que cada aba
 * possa ser conectada sem refatorar: basta (1) confirmar o path, (2) substituir o schema
 * `PendingSectionSchema` pelo schema real e (3) renderizar o formulário na aba.
 *
 *   GET|PATCH /api/channels/{id}/signal-filters   -> aba "Filtro de Sinais"
 *   GET|PATCH /api/channels/{id}/management       -> aba "Gerenciamento"
 *   GET|PATCH /api/channels/{id}/notifications    -> aba "Notificações"
 *   GET|PATCH /api/channels/{id}/auto-reply       -> aba "Resposta Automática"
 *   GET       /api/channels/{id}/logs             -> aba "Logs do Canal" (somente leitura)
 *
 * Enquanto o Core não define os campos, o payload é aceito como objeto genérico e NÃO é
 * renderizado — a UI continua exibindo o estado "seção ainda não disponível".
 */

// TODO(core): substituir por schemas específicos assim que os endpoints forem definidos.
export const PendingSectionSchema = z.record(z.string(), z.unknown());
export type PendingSection = z.infer<typeof PendingSectionSchema>;

export const ChannelLogEntrySchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  level: z.enum(["info", "warning", "error", "success"]),
  message: z.string(),
});

export const ChannelLogsSchema = z.object({
  items: z.array(ChannelLogEntrySchema),
  total: z.number(),
});
export type ChannelLogs = z.infer<typeof ChannelLogsSchema>;

export const CHANNEL_SECTION_IDS = ["signal-filters", "management", "notifications", "auto-reply", "logs"] as const;
export type ChannelSectionId = (typeof CHANNEL_SECTION_IDS)[number];

export type ChannelSectionDefinition = {
  /** Path no Core, relativo a /api/channels/{id}. */
  path: string;
  writable: boolean;
  schema: z.ZodType;
  /** Endpoint ainda não confirmado pelo Core. */
  confirmed: boolean;
};

export const CHANNEL_SECTIONS: Record<ChannelSectionId, ChannelSectionDefinition> = {
  "signal-filters": { path: "signal-filters", writable: true, schema: PendingSectionSchema, confirmed: false },
  management: { path: "management", writable: true, schema: PendingSectionSchema, confirmed: false },
  notifications: { path: "notifications", writable: true, schema: PendingSectionSchema, confirmed: false },
  "auto-reply": { path: "auto-reply", writable: true, schema: PendingSectionSchema, confirmed: false },
  logs: { path: "logs", writable: false, schema: ChannelLogsSchema, confirmed: false },
};

/** Relação aba da tela -> seção do Core. A aba "general" usa /config (schemas/channel-config.ts). */
export const TAB_SECTION = {
  filters: "signal-filters",
  management: "management",
  notifications: "notifications",
  autoreply: "auto-reply",
  logs: "logs",
} as const satisfies Record<string, ChannelSectionId>;
