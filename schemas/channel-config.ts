import { z } from "zod";
import { ChannelIdSchema, ChannelStatusSchema } from "./channel";

/**
 * CONTRATO ESPERADO DO CORE — configuração do canal (aba "Geral")
 *
 *   GET   /api/channels/{id}/config  -> ChannelConfig
 *   PATCH /api/channels/{id}/config  -> ChannelConfig (já atualizado)   body: ChannelConfigUpdate
 *
 * Formato "wire" (snake_case, números como number). A tradução para o modelo da tela
 * (strings, camelCase) fica em lib/channel-config.ts.
 *
 * Campos somente leitura nesta rota: channel_id, status, active, is_primary.
 * `active` e `is_primary` são alterados por PATCH /api/channels/{id} (ver schemas/channel.ts).
 *
 * Campos marcados "extensão" complementam o conjunto mínimo acordado porque a tela possui
 * controles que não cabem nos demais campos (janela de sinais, liga/desliga do horário).
 * (Contrato esperado — ainda não confirmado pelo Core.)
 */

const HHMM = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Horário deve estar no formato HH:MM");

export const SignalFormatSchema = z.enum(["kim", "fran", "lezzier", "regex"]);
export const RiskModeSchema = z.enum(["percent", "fixed_lot", "fixed_amount"]);
export const WeekDayWireSchema = z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);

export const SymbolMappingSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  /** Mapeamentos criados pelo usuário podem ser removidos na tela. Ausente => removível. */
  custom: z.boolean().optional(),
});

export const ChannelIdentitySchema = z.object({
  channel_id: ChannelIdSchema,
  name: z.string().min(1),
  username: z.string(),
  description: z.string(),
  status: ChannelStatusSchema,
  active: z.boolean(),
  is_primary: z.boolean(),
});

export const LocaleConfigSchema = z.object({
  /** Identificador IANA, ex.: "America/Sao_Paulo". */
  timezone: z.string().min(1),
  /** "auto" | "pt" | "en" | "es" */
  signal_language: z.string().min(1),
});

export const SymbolConfigSchema = z.object({
  symbol_default: z.string().min(1),
  symbol_mapping: z.array(SymbolMappingSchema),
});

export const SignalFormatConfigSchema = z.object({
  signal_format: SignalFormatSchema.nullable(),
  automatic_format_detection: z.boolean(),
  multiple_formats: z.boolean(),
});

export const RiskConfigSchema = z.object({
  risk_mode: RiskModeSchema,
  risk_value: z.number().nonnegative(),
  min_lot: z.number().nonnegative(),
  max_lot: z.number().nonnegative(),
  /** 100 => 1:100. null => não definida. */
  leverage: z.number().positive().nullable(),
});

export const ExecutionFilterSchema = z.object({
  /** null => verificação de spread desativada. */
  max_spread: z.number().nonnegative().nullable(),
  /** null => verificação de distância desativada. */
  max_entry_distance: z.number().nonnegative().nullable(),
  ignore_out_of_schedule: z.boolean(),
  /** extensão: janela usada por "Ignorar sinais fora do horário". */
  signal_window_start: HHMM,
  signal_window_end: HHMM,
  execute_only_symbol: z.boolean(),
  ignore_duplicates: z.boolean(),
});

export const ScheduleConfigSchema = z.object({
  /** extensão: liga/desliga "Restringir horário de execução". */
  execution_schedule_enabled: z.boolean(),
  execution_start: HHMM,
  execution_end: HHMM,
  execution_days: z.array(WeekDayWireSchema),
});

export const PositionManagementSchema = z.object({
  break_even_enabled: z.boolean(),
  break_even_pips: z.number().nonnegative().nullable(),
  trailing_stop_enabled: z.boolean(),
  trailing_stop_pips: z.number().nonnegative().nullable(),
  partial_close_enabled: z.boolean(),
  partial_close_percent: z.number().min(0).max(100).nullable(),
  close_all_at_last_tp: z.boolean(),
});

/** Configuração completa (resposta de GET/PATCH /api/channels/{id}/config). */
export const ChannelConfigSchema = z.object({
  ...ChannelIdentitySchema.shape,
  ...LocaleConfigSchema.shape,
  ...SymbolConfigSchema.shape,
  ...SignalFormatConfigSchema.shape,
  ...RiskConfigSchema.shape,
  ...ExecutionFilterSchema.shape,
  ...ScheduleConfigSchema.shape,
  ...PositionManagementSchema.shape,
});

/** Corpo de PATCH /api/channels/{id}/config: somente campos editáveis de configuração. */
export const ChannelConfigUpdateSchema = ChannelConfigSchema.omit({ channel_id: true, status: true, active: true, is_primary: true }).refine((v) => v.min_lot <= v.max_lot, {
  message: "O lote mínimo não pode ser maior que o lote máximo.",
  path: ["min_lot"],
});

export type SymbolMappingWire = z.infer<typeof SymbolMappingSchema>;
export type WeekDayWire = z.infer<typeof WeekDayWireSchema>;
export type CoreChannelConfig = z.infer<typeof ChannelConfigSchema>;
export type CoreChannelConfigUpdate = z.infer<typeof ChannelConfigUpdateSchema>;
