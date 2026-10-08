export type SelectOption = { value: string; label: string };

const opts = (pairs: Array<[string, string]>): SelectOption[] => pairs.map(([value, label]) => ({ value, label }));

export const languageOptions = opts([
  ["pt-BR", "Português (Brasil)"],
  ["en-US", "English (US)"],
  ["es-ES", "Español"],
]);

export const timezoneOptions = opts([
  ["America/Sao_Paulo", "(GMT-3) Brasília - São Paulo"],
  ["UTC", "(GMT+0) UTC"],
  ["Europe/London", "(GMT+0) Londres"],
  ["America/New_York", "(GMT-5) Nova York"],
]);

export const dateFormatOptions = opts([
  ["dd/mm/yyyy", "dd/mm/aaaa (31/12/2026)"],
  ["mm/dd/yyyy", "mm/dd/aaaa (12/31/2026)"],
  ["yyyy-mm-dd", "aaaa-mm-dd (2026-12-31)"],
]);

export const timeFormatOptions = opts([
  ["24h", "24 horas (14:30)"],
  ["12h", "12 horas (2:30 PM)"],
]);

export const decimalOptions = opts([
  ["2", "2 casas (0.01)"],
  ["3", "3 casas (0.001)"],
  ["1", "1 casa (0.1)"],
]);

export const currencyOptions = opts([
  ["USD", "USD - Dólar Americano"],
  ["EUR", "EUR - Euro"],
  ["BRL", "BRL - Real Brasileiro"],
]);

export const symbolOptions = opts([
  ["XAUUSD", "XAUUSD"],
  ["EURUSD", "EURUSD"],
  ["GBPUSD", "GBPUSD"],
  ["US30", "US30"],
  ["NAS100", "NAS100"],
]);

export const priceViewOptions = opts([
  ["bid-ask", "Bid/Ask"],
  ["mid", "Médio"],
  ["last", "Último"],
]);

export const unitOptions = opts([
  ["pips", "Pips"],
  ["points", "Pontos"],
  ["currency", "Moeda"],
]);

export const chartSizeOptions = opts([
  ["M1", "M1"],
  ["M5", "M5"],
  ["M15", "M15"],
  ["H1", "H1"],
  ["H4", "H4"],
  ["D1", "D1"],
]);

export const historyPeriodOptions = opts([
  ["3", "3 meses"],
  ["6", "6 meses"],
  ["12", "12 meses"],
  ["24", "24 meses"],
]);

export const syncIntervalOptions = opts([
  ["30s", "30 segundos"],
  ["1m", "1 minuto"],
  ["5m", "5 minutos"],
  ["15m", "15 minutos"],
]);

export type GeneralSettingsValues = {
  name: string;
  email: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  decimals: string;
  currency: string;
  mainSymbol: string;
  priceView: string;
  unit: string;
  chartSize: string;
  confirmManual: boolean;
  alertSound: boolean;
  platformNotifications: boolean;
  historyPeriod: string;
  syncInterval: string;
  keepSystemLogs: boolean;
  keepTradeHistory: boolean;
  autoBackup: boolean;
  shareUsageData: boolean;
  sharePerformance: boolean;
};

export const defaultGeneralSettings: GeneralSettingsValues = {
  name: "Rodrigo de Barros Francisco",
  email: "rodrigo@example.com",
  language: "pt-BR",
  timezone: "America/Sao_Paulo",
  dateFormat: "dd/mm/yyyy",
  timeFormat: "24h",
  decimals: "2",
  currency: "USD",
  mainSymbol: "XAUUSD",
  priceView: "bid-ask",
  unit: "pips",
  chartSize: "M5",
  confirmManual: true,
  alertSound: true,
  platformNotifications: true,
  historyPeriod: "12",
  syncInterval: "1m",
  keepSystemLogs: true,
  keepTradeHistory: true,
  autoBackup: true,
  shareUsageData: true,
  sharePerformance: false,
};
