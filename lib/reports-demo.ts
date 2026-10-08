export const reportsPeriod = "01/09/2026 - 30/09/2026";

export type ReportTone = "success" | "danger" | "default";

export type ReportKpi = {
  id: "profit" | "trades" | "winRate" | "resultR" | "drawdown";
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
  tone: "success" | "danger";
  progress?: number;
};

export const reportKpis: ReportKpi[] = [
  { id: "profit", label: "Lucro Líquido", value: "$ 4,187.50", delta: "+28.4%", direction: "up", tone: "success" },
  { id: "trades", label: "Total de Operações", value: "167", delta: "+12.8%", direction: "up", tone: "success" },
  { id: "winRate", label: "Taxa de Acerto", value: "52.7%", delta: "+3.6%", direction: "up", tone: "success", progress: 52.7 },
  { id: "resultR", label: "Resultado em R", value: "70.17R", delta: "+15.2%", direction: "up", tone: "success" },
  { id: "drawdown", label: "Drawdown Máximo", value: "-12.10%", delta: "-4.3%", direction: "down", tone: "danger" },
];

export const equitySeries = [
  120, 260, 180, 340, 520, 430, 610, 780, 700, 900, 1050, 980, 1180, 1320, 1250, 1450, 1620, 1540, 1780, 1950, 2100,
  2050, 2350, 2700, 3050, 2980, 3500, 3900, 4400, 4800,
];
export const equityMax = 6000;
export const equityTicks = ["$6,000", "$4,500", "$3,000", "$1,500", "$0"];
export const equityLabels = [1, 5, 9, 13, 17, 21, 25, 30].map((day) => ({
  day,
  label: `${String(day).padStart(2, "0")}/09`,
}));

export const monthlyDomain = { min: -500, max: 2000 };
export const monthlyTicks = ["$2,000", "$1,500", "$1,000", "$500", "$0", "-$500"];
export const monthlyResults = [
  { month: "Jun/26", profit: 950, loss: 250, net: 1225, netLabel: "$1,225.00" },
  { month: "Jul/26", profit: 520, loss: -120, net: 777.5, netLabel: "$777.50" },
  { month: "Ago/26", profit: 960, loss: 180, net: 1392.5, netLabel: "$1,392.50" },
  { month: "Set/26", profit: 520, loss: 190, net: 792.5, netLabel: "$792.50" },
];

export type SymbolKey = "XAUUSD" | "XAGUSD" | "US100" | "US500";
export type SystemMarkKey = "telegram" | "discord" | "tradingview" | "manual";

export type PerformanceRow<K extends string> = {
  key: K;
  name: string;
  trades: number;
  winRate: string;
  profit: string;
  resultR: string;
  positive: boolean;
};

export const symbolRows: PerformanceRow<SymbolKey>[] = [
  { key: "XAUUSD", name: "XAUUSD", trades: 152, winRate: "53.3%", profit: "$ 3,985.50", resultR: "66.42R", positive: true },
  { key: "XAGUSD", name: "XAGUSD", trades: 9, winRate: "44.4%", profit: "$ 202.00", resultR: "3.75R", positive: true },
  { key: "US100", name: "US100", trades: 4, winRate: "50.0%", profit: "$ 0.00", resultR: "0.00R", positive: false },
  { key: "US500", name: "US500", trades: 2, winRate: "50.0%", profit: "$ 0.00", resultR: "0.00R", positive: false },
];

export const systemRows: PerformanceRow<SystemMarkKey>[] = [
  { key: "telegram", name: "KIM GOLD SECRET", trades: 167, winRate: "52.7%", profit: "$ 4,187.50", resultR: "70.17R", positive: true },
  { key: "discord", name: "FX PREMIUM", trades: 0, winRate: "0.0%", profit: "$ 0.00", resultR: "0.00R", positive: false },
  { key: "tradingview", name: "TradingView", trades: 0, winRate: "0.0%", profit: "$ 0.00", resultR: "0.00R", positive: false },
  { key: "manual", name: "Manual", trades: 0, winRate: "0.0%", profit: "$ 0.00", resultR: "0.00R", positive: false },
];

export type DetailedStat = {
  label: string;
  value: string;
  icon: "chart" | "target" | "check" | "trophy" | "trendDown" | "signal";
  tone: "blue" | "green" | "red";
};

export const detailedStats: DetailedStat[] = [
  { label: "Profit Factor", value: "2.39", icon: "chart", tone: "blue" },
  { label: "Expectativa (R)", value: "0.42R", icon: "target", tone: "green" },
  { label: "Média de Lucro", value: "1.18R", icon: "check", tone: "green" },
  { label: "Média de Perda", value: "-1.00R", icon: "trophy", tone: "red" },
  { label: "Maior Lucro", value: "5.00R", icon: "trophy", tone: "blue" },
  { label: "Maior Perda", value: "-3.00R", icon: "trophy", tone: "red" },
  { label: "Sequência de Vitórias", value: "9", icon: "trophy", tone: "blue" },
  { label: "Sequência de Perdas", value: "6", icon: "trendDown", tone: "red" },
];

export const customReports = [
  {
    id: "operations",
    title: "Exportar Operações",
    description: "Baixe o histórico completo de operações em CSV ou Excel.",
    icon: "fileText",
    tone: "blue",
  },
  {
    id: "performance",
    title: "Exportar Desempenho",
    description: "Relatório de desempenho com gráficos e métricas avançadas.",
    icon: "chart",
    tone: "green",
  },
  {
    id: "pdf",
    title: "Exportar em PDF",
    description: "Relatório completo formatado em PDF para impressão ou envio.",
    icon: "clipboard",
    tone: "purple",
  },
] as const;
