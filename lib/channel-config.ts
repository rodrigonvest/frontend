import type { TelegramChannel } from "./channels";

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

export const SYMBOLS = ["XAUUSD", "XAGUSD", "US30", "NAS100", "EURUSD", "GBPUSD", "USDJPY", "BTCUSD"];

export const TIMEZONES = ["(GMT-3) Brasília", "(GMT+0) UTC", "(GMT-5) Nova York", "(GMT+1) Londres", "(GMT+3) Moscou"];

export const LANGUAGES = ["Automático (Detectar)", "Português", "English", "Español"];

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

/**
 * Valores iniciais da tela. O backend ainda não expõe a configuração por canal;
 * quando expuser, basta substituir esta função pela resposta da API.
 */
export function defaultChannelConfig(channel: TelegramChannel): ChannelConfig {
  const slug = channel.name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    name: channel.name,
    username: `@${slug}`,
    description: "Sinais de XAUUSD com alta assertividade",
    active: channel.active,
    primary: Boolean(channel.is_primary),
    timezone: TIMEZONES[0],
    language: LANGUAGES[0],
    mainSymbol: "XAUUSD",
    symbolMap: [
      { id: "map-xauusd", from: "XAUUSD", to: "XAUUSD" },
      { id: "map-gold", from: "GOLD", to: "XAUUSD" },
      { id: "map-xagusd", from: "XAGUSD", to: "XAGUSD" },
    ],
    autoDetect: true,
    format: null,
    riskMode: "percent",
    riskValue: "1.0",
    minLot: "0.01",
    maxLot: "5.00",
    leverage: "1:100",
    filters: {
      spread: { enabled: true, pips: "0.60" },
      distance: { enabled: true, pips: "5.0" },
      outsideHours: { enabled: false, from: "00:00", to: "23:59" },
      onlyMainSymbol: true,
      duplicates: false,
    },
    schedule: { restrict: true, start: "08:00", end: "23:00", days: ["seg", "ter", "qua", "qui", "sex"] },
    position: {
      breakEven: { enabled: true, pips: "20" },
      trailing: { enabled: true, pips: "30" },
      partial: { enabled: true, percent: "50" },
      closeAtLastTp: false,
    },
  };
}
