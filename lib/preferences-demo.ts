import type { SelectOption } from "./settings-demo";

const opts = (pairs: Array<[string, string]>): SelectOption[] => pairs.map(([value, label]) => ({ value, label }));

export const languageOptions = opts([
  ["pt-BR", "Português (Brasil)"],
  ["en-US", "English (US)"],
  ["es-ES", "Español"],
]);

export const timezoneOptions = opts([
  ["America/Sao_Paulo", "(GMT-03:00) Brasília"],
  ["UTC", "(GMT+00:00) UTC"],
  ["Europe/London", "(GMT+00:00) Londres"],
  ["America/New_York", "(GMT-05:00) Nova York"],
]);

export const dateFormatOptions = opts([
  ["dd/mm/yyyy", "DD/MM/AAAA"],
  ["mm/dd/yyyy", "MM/DD/AAAA"],
  ["yyyy-mm-dd", "AAAA-MM-DD"],
]);

export const timeFormatOptions = opts([
  ["24h", "24 horas (14:30)"],
  ["12h", "12 horas (2:30 PM)"],
]);

export const currencyOptions = opts([
  ["USD", "USD - Dólar Americano"],
  ["EUR", "EUR - Euro"],
  ["BRL", "BRL - Real Brasileiro"],
]);

export const numberFormatOptions = opts([
  ["dot", "1,234.56 (ponto)"],
  ["comma", "1.234,56 (vírgula)"],
]);

export const measureUnitOptions = opts([
  ["pips", "Pips"],
  ["points", "Pontos"],
  ["currency", "Moeda"],
]);

export const decimalPlacesOptions = opts([
  ["2", "2 casas (0.01)"],
  ["3", "3 casas (0.001)"],
  ["1", "1 casa (0.1)"],
]);

export const reportPeriodOptions = opts([
  ["7d", "Últimos 7 dias"],
  ["30d", "Últimos 30 dias"],
  ["90d", "Últimos 90 dias"],
  ["ytd", "Ano até hoje"],
]);

export const chartTypeOptions = opts([
  ["line", "Linha (Evolução)"],
  ["bar", "Barras"],
  ["area", "Área"],
]);

export const groupingOptions = opts([
  ["daily", "Diário"],
  ["weekly", "Semanal"],
  ["monthly", "Mensal"],
]);

export const exportFormatOptions = opts([
  ["csv", "CSV"],
  ["xlsx", "Excel (XLSX)"],
  ["pdf", "PDF"],
]);

export type PreferenceFlagKey =
  | "confirmStart"
  | "tradeSound"
  | "browserNotifications"
  | "groupMessages"
  | "pauseOnTelegram"
  | "pauseOnAccount"
  | "lowPower"
  | "saveHistory"
  | "miniCharts"
  | "profitColumns"
  | "systemStatus"
  | "realtimeData"
  | "tooltips"
  | "compactTables"
  | "autosave"
  | "updateAlerts"
  | "devMode"
  | "betaPrograms";

export type PreferenceSelectKey =
  | "language"
  | "timezone"
  | "dateFormat"
  | "timeFormat"
  | "currency"
  | "numberFormat"
  | "unit"
  | "decimals"
  | "reportPeriod"
  | "chartType"
  | "grouping"
  | "exportFormat";

export type PreferencesValues = Record<PreferenceSelectKey, string> & Record<PreferenceFlagKey, boolean>;

export const defaultPreferences: PreferencesValues = {
  language: "pt-BR",
  timezone: "America/Sao_Paulo",
  dateFormat: "dd/mm/yyyy",
  timeFormat: "24h",
  currency: "USD",
  numberFormat: "dot",
  unit: "pips",
  decimals: "2",
  reportPeriod: "30d",
  chartType: "line",
  grouping: "daily",
  exportFormat: "csv",
  confirmStart: true,
  tradeSound: true,
  browserNotifications: true,
  groupMessages: true,
  pauseOnTelegram: true,
  pauseOnAccount: true,
  lowPower: false,
  saveHistory: true,
  miniCharts: true,
  profitColumns: true,
  systemStatus: true,
  realtimeData: true,
  tooltips: true,
  compactTables: false,
  autosave: true,
  updateAlerts: true,
  devMode: false,
  betaPrograms: false,
};

export type FlagItem = { key: PreferenceFlagKey; title: string; description?: string };

export const operationFlagsLeft: FlagItem[] = [
  { key: "confirmStart", title: "Confirmar antes de iniciar operações", description: "Exibe uma confirmação antes de ativar o copier." },
  { key: "tradeSound", title: "Mostrar som ao abrir/fechar operações" },
  { key: "browserNotifications", title: "Exibir notificações no navegador" },
  { key: "groupMessages", title: "Agrupar mensagens do mesmo sinal" },
];

export const operationFlagsRight: FlagItem[] = [
  { key: "pauseOnTelegram", title: "Pausar copier ao desconectar do Telegram" },
  { key: "pauseOnAccount", title: "Pausar copier ao desconectar da conta" },
  { key: "lowPower", title: "Ativar modo de baixo consumo" },
  { key: "saveHistory", title: "Salvar histórico local de operações" },
];

export const displayFlagsLeft: FlagItem[] = [
  { key: "miniCharts", title: "Mostrar mini gráficos nas tabelas" },
  { key: "profitColumns", title: "Exibir colunas de lucro em R e %" },
  { key: "systemStatus", title: "Mostrar status dos sistemas" },
];

export const displayFlagsRight: FlagItem[] = [
  { key: "realtimeData", title: "Exibir dados em tempo real" },
  { key: "tooltips", title: "Mostrar dicas (tooltips)" },
  { key: "compactTables", title: "Modo compacto nas tabelas" },
];

export const otherFlagsLeft: FlagItem[] = [
  { key: "autosave", title: "Autosalvamento de configurações", description: "Salva automaticamente suas preferências." },
  { key: "updateAlerts", title: "Exibir alertas de atualização", description: "Notifica sobre novas funcionalidades." },
];

export const otherFlagsRight: FlagItem[] = [
  { key: "devMode", title: "Modo desenvolvedor (logs)", description: "Exibe informações técnicas." },
  { key: "betaPrograms", title: "Participar de programas beta", description: "Receba e teste novidades da plataforma." },
];
