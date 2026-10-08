import type { SystemRoute, SystemRouteStatus } from "./systems-catalog";

export type OperationMode = "realtime" | "simulation";
export type SignalFormat = "auto" | "kim" | "fran" | "lezzier" | "regex";

export const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;

export const OPERATION_MODE_OPTIONS: ReadonlyArray<{ value: OperationMode; label: string }> = [
  { value: "realtime", label: "Tempo Real" },
  { value: "simulation", label: "Simulação" },
];

export const TIMEZONE_OPTIONS = ["(GMT-3) Brasília", "(GMT-5) Nova York", "(GMT+0) Londres", "(GMT+1) Frankfurt"] as const;
export const SYMBOL_OPTIONS = ["XAUUSD", "XAGUSD", "EURUSD", "GBPUSD", "US100"] as const;

export const STATUS_OPTIONS: ReadonlyArray<{ value: SystemRouteStatus; label: string }> = [
  { value: "active", label: "Ativo" },
  { value: "paused", label: "Pausado" },
  { value: "inactive", label: "Inativo" },
];

export const SIGNAL_FORMAT_OPTIONS: ReadonlyArray<{ value: SignalFormat; label: string }> = [
  { value: "auto", label: "Detectar automaticamente (recomendado)" },
  { value: "kim", label: "Formato KIM (padrão)" },
  { value: "fran", label: "Formato FRAN" },
  { value: "lezzier", label: "Formato Lezzier FX" },
  { value: "regex", label: "Formato Personalizado (Regex)" },
];

export type SystemConfigValues = {
  name: string;
  description: string;
  status: SystemRouteStatus;
  mode: OperationMode;
  timezone: string;
  symbol: string;
  lot: string;
  slippage: string;
  singleSignal: boolean;
  onlyScheduled: boolean;
  restrictHours: boolean;
  start: string;
  end: string;
  days: boolean[];
  checkSpread: boolean;
  spread: string;
  checkDistance: boolean;
  distance: string;
  ignoreOutside: boolean;
  ignoreFrom: string;
  ignoreTo: string;
  ignoreDuplicates: boolean;
  duplicateMinutes: string;
  signalFormat: SignalFormat;
};

export type SetConfigValue = <K extends keyof SystemConfigValues>(key: K, value: SystemConfigValues[K]) => void;

export type ConnectionPanel = {
  title: string;
  connected: boolean;
  details: ReadonlyArray<{ label: string; value: string }>;
};

export type LogEntry = {
  time: string;
  tone: "danger" | "success" | "info";
  icon: string;
  text: string;
  highlight?: string;
};

export type SystemConfigDemo = {
  values: SystemConfigValues;
  sourceName: string;
  destinationName: string;
  sourceDetail: string;
  destinationDetail: string;
  lastExecution: { time: string; ago: string };
  signals: { total: number; wins: number };
  connections: ConnectionPanel[];
  logs: LogEntry[];
};

const LONG_NAMES: Record<string, string> = { mt4: "MetaTrader 4", mt5: "MetaTrader 5" };

function longName(id: string, shortName: string) {
  return LONG_NAMES[id] ?? shortName;
}

function sourcePanel(route: SystemRoute, from: string): ConnectionPanel {
  if (route.source === "telegram") {
    return {
      title: "Telegram",
      connected: true,
      details: [
        { label: "Canal:", value: "KIM GOLD SECRET" },
        { label: "Username:", value: "@kimgoldsecret" },
        { label: "Última mensagem:", value: "04/09/2026 14:32" },
      ],
    };
  }
  if (route.source === "tradingview") {
    return {
      title: "TradingView",
      connected: true,
      details: [
        { label: "Webhook:", value: "Ativo" },
        { label: "Alertas ativos:", value: "12" },
        { label: "Último alerta:", value: "04/09/2026 14:32" },
      ],
    };
  }
  return platformPanel(longName(route.source, from), "FundedNext MT5", "12345678", "FundedNext-Server", "12 ms");
}

function platformPanel(title: string, account: string, login: string, server: string, ping: string): ConnectionPanel {
  return {
    title,
    connected: true,
    details: [
      { label: "Conta:", value: account },
      { label: "Login:", value: login },
      { label: "Servidor:", value: server },
      { label: "Ping:", value: ping },
    ],
  };
}

export function buildSystemConfigDemo(route: SystemRoute): SystemConfigDemo {
  const [from, ...rest] = route.name.split(" → ");
  const to = rest.join(" → ");
  const fromLong = longName(route.source, from);
  const toLong = longName(route.destination, to);
  const isSignalSource = route.source === "telegram" || route.source === "tradingview";

  const description = isSignalSource
    ? `${route.source === "telegram" ? "Copie sinais de canais do Telegram" : "Execute alertas do TradingView"} para o ${toLong}`
    : `Copie operações do ${fromLong} para o ${toLong}`;

  return {
    values: {
      name: route.source === "telegram" ? `${route.name} (KIM GOLD SECRET)` : route.name,
      description:
        route.source === "telegram"
          ? `Copia automaticamente os sinais do canal KIM GOLD SECRET para a conta da FundedNext ${to}.`
          : `${description}.`,
      status: route.status,
      mode: "realtime",
      timezone: TIMEZONE_OPTIONS[0],
      symbol: SYMBOL_OPTIONS[0],
      lot: "0.10",
      slippage: "5",
      singleSignal: true,
      onlyScheduled: false,
      restrictHours: true,
      start: "08:00",
      end: "23:00",
      days: [true, true, true, true, true, false, false],
      checkSpread: true,
      spread: "0.60",
      checkDistance: true,
      distance: "5.0",
      ignoreOutside: false,
      ignoreFrom: "00:00",
      ignoreTo: "23:59",
      ignoreDuplicates: true,
      duplicateMinutes: "5",
      signalFormat: "auto",
    },
    sourceName: from,
    destinationName: to,
    sourceDetail: route.source === "telegram" ? `${from} (KIM GOLD SECRET)` : fromLong,
    destinationDetail: `${toLong} (FundedNext)`,
    lastExecution: { time: "14:32", ago: "há 2 minutos" },
    signals: { total: 167, wins: 88 },
    connections: [
      sourcePanel(route, from),
      platformPanel(toLong, `FundedNext ${to}`, "12345678", "FundedNext-Server", "12 ms"),
    ],
    logs: [
      { time: "14:32", tone: "danger", icon: route.source === "telegram" ? "telegram" : "signal", text: `Sinal recebido do ${from}` },
      { time: "14:32", tone: "success", icon: "check", text: "Sinal validado (BUY XAUUSD)" },
      { time: "14:32", tone: "success", icon: "send", text: `Ordem enviada para o ${to}` },
      { time: "14:32", tone: "success", icon: "check", text: "Ordem executada (0.10 lote)" },
      { time: "14:33", tone: "success", icon: "check", text: "TP1 atingido (+0.25R)" },
      { time: "14:35", tone: "success", icon: "check", text: "TP2 atingido (+0.50R)" },
      { time: "14:37", tone: "info", icon: "settings", text: "Stop ajustado para Break Even" },
      { time: "14:41", tone: "success", icon: "check", text: "Operação fechada (TP4)", highlight: "+1.00R" },
      { time: "14:50", tone: "info", icon: route.source === "telegram" ? "telegram" : "signal", text: `Novo sinal recebido do ${from}` },
    ],
  };
}

export function formatDays(days: readonly boolean[]) {
  const selected = WEEKDAYS.filter((_, i) => days[i]);
  if (selected.length === 0) return "Nenhum dia";
  if (selected.length === 7) return "Todos os dias";
  const indexes = days.flatMap((on, i) => (on ? [i] : []));
  const contiguous = indexes.every((value, i) => i === 0 || value === indexes[i - 1] + 1);
  if (contiguous && selected.length > 2) return `${selected[0]} - ${selected[selected.length - 1]}`;
  return selected.join(", ");
}
