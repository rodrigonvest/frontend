import { ChannelConfigUpdateSchema, type CoreChannelConfig, type CoreChannelConfigUpdate, type WeekDayWire } from "../schemas/channel-config";
import type { TelegramChannel } from "../schemas/channel";

/**
 * Modelo da TELA (camelCase, números como string para os inputs) + tradução de/para o contrato
 * do Core (schemas/channel-config.ts). Seguro para client e server.
 */

export type SignalFormat = "multi" | "kim" | "fran" | "lezzier" | "regex";
export type RiskMode = "percent" | "fixed_lot" | "fixed_amount";
export type WeekDay = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export type SymbolMapping = { id: string; from: string; to: string; custom?: boolean };

export type ChannelConfig = {
  name: string;
  username: string;
  description: string;
  active: boolean;
  primary: boolean;
  timezone: string;
  language: string;
  mainSymbol: string;
  symbolMap: SymbolMapping[];
  autoDetect: boolean;
  format: SignalFormat | null;
  riskMode: RiskMode;
  riskValue: string;
  minLot: string;
  maxLot: string;
  leverage: string;
  filters: {
    spread: { enabled: boolean; pips: string };
    distance: { enabled: boolean; pips: string };
    outsideHours: { enabled: boolean; from: string; to: string };
    onlyMainSymbol: boolean;
    duplicates: boolean;
  };
  schedule: { restrict: boolean; start: string; end: string; days: WeekDay[] };
  position: {
    breakEven: { enabled: boolean; pips: string };
    trailing: { enabled: boolean; pips: string };
    partial: { enabled: boolean; percent: string };
    closeAtLastTp: boolean;
  };
};

export type ConfigPanelProps = {
  channel: TelegramChannel;
  config: ChannelConfig;
  update: (patch: Partial<ChannelConfig>) => void;
};

type Option = { value: string; label: string };

export const SYMBOLS = ["XAUUSD", "XAGUSD", "US30", "NAS100", "EURUSD", "GBPUSD", "USDJPY", "BTCUSD"];

export const TIMEZONES: Option[] = [
  { value: "America/Sao_Paulo", label: "(GMT-3) Brasília" },
  { value: "UTC", label: "(GMT+0) UTC" },
  { value: "America/New_York", label: "(GMT-5) Nova York" },
  { value: "Europe/London", label: "(GMT+1) Londres" },
  { value: "Europe/Moscow", label: "(GMT+3) Moscou" },
];

export const LANGUAGES: Option[] = [
  { value: "auto", label: "Automático (Detectar)" },
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export const LEVERAGES = ["1:10", "1:30", "1:50", "1:100", "1:200", "1:500"];

export const RISK_MODES: Array<{ value: RiskMode; label: string; unit: string }> = [
  { value: "percent", label: "Porcentagem do saldo", unit: "%" },
  { value: "fixed_lot", label: "Lote fixo", unit: "lote" },
  { value: "fixed_amount", label: "Valor fixo (USD)", unit: "USD" },
];

export const SIGNAL_FORMATS: Array<{ value: SignalFormat; label: string }> = [
  { value: "multi", label: "Suporte a múltiplos formatos" },
  { value: "kim", label: "Formato KIM (padrão)" },
  { value: "fran", label: "Formato FRAN" },
  { value: "lezzier", label: "Formato Lezzier FX" },
  { value: "regex", label: "Formato Personalizado (Regex)" },
];

export const WEEK_DAYS: Array<{ value: WeekDay; label: string }> = [
  { value: "seg", label: "Seg" },
  { value: "ter", label: "Ter" },
  { value: "qua", label: "Qua" },
  { value: "qui", label: "Qui" },
  { value: "sex", label: "Sex" },
  { value: "sab", label: "Sáb" },
  { value: "dom", label: "Dom" },
];

const DAY_TO_WIRE: Record<WeekDay, WeekDayWire> = { seg: "mon", ter: "tue", qua: "wed", qui: "thu", sex: "fri", sab: "sat", dom: "sun" };
const DAY_FROM_WIRE = Object.fromEntries(Object.entries(DAY_TO_WIRE).map(([ui, wire]) => [wire, ui])) as Record<WeekDayWire, WeekDay>;

/** Garante que um valor vindo do Core (fora da lista fixa) continue visível e selecionável. */
export function withCurrentOption(options: Option[], value: string, emptyLabel = "Não definido"): Option[] {
  if (options.some((o) => o.value === value)) return options;
  return [...options, { value, label: value === "" ? emptyLabel : value }];
}

const fmt = (n: number | null) => (n === null ? "" : String(n));

/** Core -> tela. */
export function toViewModel(core: CoreChannelConfig): ChannelConfig {
  return {
    name: core.name,
    username: core.username,
    description: core.description,
    active: core.active,
    primary: core.is_primary,
    timezone: core.timezone,
    language: core.signal_language,
    mainSymbol: core.symbol_default,
    symbolMap: core.symbol_mapping.map((m, i) => ({ id: `map-${i}-${m.from.toLowerCase()}`, from: m.from, to: m.to, custom: m.custom ?? true })),
    autoDetect: core.automatic_format_detection,
    format: core.multiple_formats ? "multi" : core.signal_format,
    riskMode: core.risk_mode,
    riskValue: String(core.risk_value),
    minLot: core.min_lot.toFixed(2),
    maxLot: core.max_lot.toFixed(2),
    leverage: core.leverage === null ? "" : `1:${core.leverage}`,
    filters: {
      spread: { enabled: core.max_spread !== null, pips: fmt(core.max_spread) },
      distance: { enabled: core.max_entry_distance !== null, pips: fmt(core.max_entry_distance) },
      outsideHours: { enabled: core.ignore_out_of_schedule, from: core.signal_window_start, to: core.signal_window_end },
      onlyMainSymbol: core.execute_only_symbol,
      duplicates: core.ignore_duplicates,
    },
    schedule: { restrict: core.execution_schedule_enabled, start: core.execution_start, end: core.execution_end, days: core.execution_days.map((d) => DAY_FROM_WIRE[d]) },
    position: {
      breakEven: { enabled: core.break_even_enabled, pips: fmt(core.break_even_pips) },
      trailing: { enabled: core.trailing_stop_enabled, pips: fmt(core.trailing_stop_pips) },
      partial: { enabled: core.partial_close_enabled, percent: fmt(core.partial_close_percent) },
      closeAtLastTp: core.close_all_at_last_tp,
    },
  };
}

/** Compara apenas o que é salvo por PATCH /config (active/primary têm fluxo próprio). */
export function configSignature(config: ChannelConfig | null): string {
  if (!config) return "";
  const { active: _active, primary: _primary, ...persisted } = config;
  return JSON.stringify(persisted);
}

export type ConfigUpdateResult = { ok: true; update: CoreChannelConfigUpdate } | { ok: false; message: string };

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : Number.NaN;
}

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Tela -> Core, com validação. Nada é enviado quando houver erro. */
export function buildConfigUpdate(config: ChannelConfig): ConfigUpdateResult {
  const errors: string[] = [];

  const positive = (raw: string, label: string) => {
    const value = parseNumber(raw);
    if (value === null || Number.isNaN(value) || value <= 0) {
      errors.push(`${label} deve ser um número maior que zero.`);
      return 0;
    }
    return value;
  };
  const pips = (enabled: boolean, raw: string, label: string) => {
    if (enabled) return positive(raw, label);
    const value = parseNumber(raw);
    return value !== null && !Number.isNaN(value) && value > 0 ? value : null;
  };
  const time = (enabled: boolean, raw: string, label: string, fallback: string) => {
    if (TIME.test(raw)) return raw;
    if (enabled) errors.push(`${label} inválido (use HH:MM).`);
    return fallback;
  };

  const riskValue = positive(config.riskValue, "O valor de risco");
  const minLot = positive(config.minLot, "O lote mínimo");
  const maxLot = positive(config.maxLot, "O lote máximo");
  if (minLot > maxLot) errors.push("O lote mínimo não pode ser maior que o lote máximo.");

  const f = config.filters;
  const p = config.position;
  const partialPercent = pips(p.partial.enabled, p.partial.percent, "O percentual de fechamento parcial");
  if (partialPercent !== null && partialPercent > 100) errors.push("O percentual de fechamento parcial não pode passar de 100.");

  if (config.schedule.restrict && config.schedule.days.length === 0) errors.push("Selecione ao menos um dia da semana para o horário de operação.");
  if (!config.name.trim()) errors.push("Informe o nome do canal.");
  if (!config.mainSymbol) errors.push("Selecione o símbolo principal.");

  const leverageMatch = /^1:(\d+)$/.exec(config.leverage);

  const candidate: CoreChannelConfigUpdate = {
    name: config.name.trim(),
    username: config.username.trim(),
    description: config.description.trim(),
    timezone: config.timezone,
    signal_language: config.language,
    symbol_default: config.mainSymbol,
    symbol_mapping: config.symbolMap.map(({ from, to, custom }) => ({ from, to, custom })),
    signal_format: config.format === null || config.format === "multi" ? null : config.format,
    automatic_format_detection: config.autoDetect,
    multiple_formats: config.format === "multi" && !config.autoDetect,
    risk_mode: config.riskMode,
    risk_value: riskValue,
    min_lot: minLot,
    max_lot: maxLot,
    leverage: leverageMatch ? Number(leverageMatch[1]) : null,
    max_spread: f.spread.enabled ? pips(true, f.spread.pips, "O spread máximo") : null,
    max_entry_distance: f.distance.enabled ? pips(true, f.distance.pips, "A distância máxima de entrada") : null,
    ignore_out_of_schedule: f.outsideHours.enabled,
    signal_window_start: time(f.outsideHours.enabled, f.outsideHours.from, "O início do horário permitido", "00:00"),
    signal_window_end: time(f.outsideHours.enabled, f.outsideHours.to, "O fim do horário permitido", "23:59"),
    execute_only_symbol: f.onlyMainSymbol,
    ignore_duplicates: f.duplicates,
    execution_schedule_enabled: config.schedule.restrict,
    execution_start: time(config.schedule.restrict, config.schedule.start, "O horário de início", "00:00"),
    execution_end: time(config.schedule.restrict, config.schedule.end, "O horário de fim", "23:59"),
    execution_days: config.schedule.days.map((d) => DAY_TO_WIRE[d]),
    break_even_enabled: p.breakEven.enabled,
    break_even_pips: pips(p.breakEven.enabled, p.breakEven.pips, "Os pips de Break Even"),
    trailing_stop_enabled: p.trailing.enabled,
    trailing_stop_pips: pips(p.trailing.enabled, p.trailing.pips, "A distância do Trailing Stop"),
    partial_close_enabled: p.partial.enabled,
    partial_close_percent: partialPercent,
    close_all_at_last_tp: p.closeAtLastTp,
  };

  if (errors.length) return { ok: false, message: [...new Set(errors)].join(" ") };

  const parsed = ChannelConfigUpdateSchema.safeParse(candidate);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Configuração inválida." };
  return { ok: true, update: parsed.data };
}
