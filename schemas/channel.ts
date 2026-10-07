import { z } from "zod";
import type { ApiErrorKind } from "./api";

/**
 * CONTRATO ESPERADO DO CORE — canais
 *
 *   GET   /api/channels        -> ChannelsBody
 *   PATCH /api/channels/{id}   -> Channel   (body: ChannelPatch)
 *
 * PATCH /api/channels/{id} é o endpoint esperado para `active` e `is_primary`.
 * Ao definir `is_primary: true` o Core é responsável por remover a marca dos demais canais.
 * (Contrato esperado — ainda não confirmado pelo Core.)
 */

export const ChannelIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9._-]+$/, "Identificador de canal inválido");

export const ChannelStatusSchema = z.enum(["connected", "disconnected", "paused"]);
export type ChannelStatus = z.infer<typeof ChannelStatusSchema>;

export const ChannelSchema = z.object({
  id: ChannelIdSchema,
  name: z.string(),
  status: ChannelStatusSchema,
  is_primary: z.boolean().optional(),
  active: z.boolean(),
  signals_today: z.number(),
  signals_total: z.number(),
  last_signal_at: z.string().nullable(),
  avatar_url: z.string().nullish(),
  logo_key: z.string().nullish(),
});
export type Channel = z.infer<typeof ChannelSchema>;
export type TelegramChannel = Channel;

export const ChannelsOverviewSchema = z.object({
  connected: z.number(),
  allowed: z.number(),
  signals_7d: z.number(),
  signals_7d_change: z.number(),
  executed: z.number(),
  execution_rate: z.number(),
  avg_signal_seconds: z.number(),
  avg_signal_change: z.number(),
});
export type ChannelsOverview = z.infer<typeof ChannelsOverviewSchema>;

export const ChannelsBodySchema = z.object({
  items: z.array(ChannelSchema),
  overview: ChannelsOverviewSchema,
  generated_at: z.string(),
});

/** Resposta da camada de serviço (corpo do Core + origem + erro, quando houver). */
export type ChannelsResponse = z.infer<typeof ChannelsBodySchema> & {
  source: "api" | "demo";
  error?: string;
  errorKind?: ApiErrorKind;
};

/** Payload de PATCH /api/channels/{id}: somente flags de estado do canal. */
export const ChannelPatchSchema = z
  .object({ active: z.boolean().optional(), is_primary: z.boolean().optional() })
  .refine((v) => v.active !== undefined || v.is_primary !== undefined, "Informe ao menos um campo para atualizar.");
export type ChannelPatch = z.infer<typeof ChannelPatchSchema>;
