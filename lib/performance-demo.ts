export const performancePeriod = "01/06/2026 - 04/09/2026";

export type KpiTone = "green" | "purple" | "blue" | "red" | "slate";
export type TextTone = "default" | "success" | "danger" | "muted";

export const performanceKpis: Array<{
  label: string;
  value: string;
  valueTone: TextTone;
  note: string;
  noteTone: TextTone;
  icon: string;
  iconTone: KpiTone;
}> = [
  { label: "Lucro Total", value: "$ 4,187.50", valueTone: "success", note: "+70.17R", noteTone: "success", icon: "dollar", iconTone: "green" },
  { label: "Profit Factor", value: "2.39", valueTone: "default", note: "Excelente", noteTone: "success", icon: "barsFilled", iconTone: "purple" },
  { label: "Taxa de Vitória", value: "52.7%", valueTone: "default", note: "88W / 79L", noteTone: "muted", icon: "target", iconTone: "green" },
  { label: "Média por Trade", value: "+0.42R", valueTone: "success", note: "$ 25.07", noteTone: "success", icon: "trendUp", iconTone: "blue" },
  { label: "Drawdown Máximo", value: "12.1%", valueTone: "default", note: "- $ 612.30", noteTone: "danger", icon: "trendDown", iconTone: "red" },
  { label: "Total de Operações", value: "167", valueTone: "default", note: "1.8 por dia", noteTone: "muted", icon: "refresh", iconTone: "slate" },
];

export const performanceTabs = [
  { label: "Visão Geral", icon: "dashboard" },
  { label: "Evolução da Equidade", icon: "trendUp" },
  { label: "Distribuição de Resultados", icon: "barsFilled" },
  { label: "Desempenho por Mês", icon: "calendar" },
  { label: "Desempenho por Canal", icon: "send" },
  { label: "Desempenho por Conta", icon: "accounts" },
  { label: "Horários", icon: "clock" },
  { label: "Customizado", icon: "settings" },
];

const pseudoRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

export const dailyDomain = { min: -200, max: 400 };
export const dailyTicks = ["$400", "$200", "$0", "-$200"];

export const dailyPnl: number[] = (() => {
  const next = pseudoRandom(20260601);
  return Array.from({ length: 78 }, () => {
    const roll = next();
    const spike = next() > 0.9 ? 1.9 : 1;
    const value = roll > 0.44 ? 20 + next() * 150 * spike : -(20 + next() * 130);
    return Math.max(dailyDomain.min + 10, Math.min(dailyDomain.max - 20, Math.round(value)));
  });
})();

export const dailyDates = ["21 Jun", "05 Jul", "19 Jul", "02 Ago", "16 Ago", "30 Ago", "04 Set"];

export type DonutSegment = { label: string; count: number; share: string; color: string };

export const resultTypes: DonutSegment[] = [
  { label: "TP1", count: 42, share: "25.1%", color: "#12d99e" },
  { label: "TP2", count: 48, share: "28.7%", color: "#159af2" },
  { label: "TP3", count: 34, share: "20.4%", color: "#8b5cf6" },
  { label: "TP4", count: 21, share: "12.6%", color: "#f5b82e" },
  { label: "SL", count: 22, share: "13.2%", color: "#ff4d5d" },
];

export const channelOperations: DonutSegment[] = [
  { label: "KIM GOLD SECRET", count: 89, share: "53.3%", color: "#159af2" },
  { label: "FRAN SIGNALS", count: 34, share: "20.4%", color: "#8b5cf6" },
  { label: "LEZZIER FX", count: 22, share: "13.2%", color: "#ff4d5d" },
  { label: "ACADEMY CLUB", count: 15, share: "9.0%", color: "#f5b82e" },
  { label: "OUTROS", count: 7, share: "4.2%", color: "#9fb3c8" },
];

export const monthlyRows = [
  { month: "Jun/2026", trades: "27", wins: "18", losses: "9", winRate: "63.0%", usd: "+1,225.00", r: "+16.50R", pf: "2.85" },
  { month: "Jul/2026", trades: "45", wins: "25", losses: "20", winRate: "55.6%", usd: "+777.50", r: "+14.80R", pf: "2.10" },
  { month: "Ago/2026", trades: "73", wins: "36", losses: "37", winRate: "49.3%", usd: "+1,392.50", r: "+27.22R", pf: "2.45" },
  { month: "Set/2026", trades: "22", wins: "9", losses: "13", winRate: "54.5%", usd: "+792.50", r: "+11.65R", pf: "2.32" },
];

export const monthlyTotalRow = { month: "Total", trades: "167", wins: "88", losses: "79", winRate: "52.7%", usd: "+4,187.50", r: "+70.17R", pf: "2.39" };

export const bestTrades = [
  { id: 1, date: "15/08/2026 14:32", r: "+3.00R", usd: "+$300.00" },
  { id: 2, date: "28/08/2026 10:15", r: "+2.75R", usd: "+$275.00" },
  { id: 3, date: "02/08/2026 16:21", r: "+2.50R", usd: "+$250.00" },
  { id: 4, date: "19/06/2026 11:08", r: "+2.25R", usd: "+$225.00" },
  { id: 5, date: "25/08/2026 13:47", r: "+2.00R", usd: "+$200.00" },
];

export const worstTrades = [
  { id: 1, date: "01/07/2026 09:12", r: "-1.00R", usd: "-$100.00" },
  { id: 2, date: "14/08/2026 15:33", r: "-1.00R", usd: "-$100.00" },
  { id: 3, date: "22/07/2026 12:10", r: "-1.00R", usd: "-$100.00" },
  { id: 4, date: "29/06/2026 10:45", r: "-1.00R", usd: "-$100.00" },
  { id: 5, date: "05/08/2026 16:27", r: "-1.00R", usd: "-$100.00" },
];

export const additionalStats: Array<{ label: string; value: string; tone: TextTone }> = [
  { label: "Expectativa por Trade", value: "0.420R", tone: "success" },
  { label: "Maior Ganho", value: "3.00R", tone: "success" },
  { label: "Maior Perda", value: "-1.00R", tone: "danger" },
  { label: "Sequência de Vitórias", value: "8", tone: "default" },
  { label: "Sequência de Derrotas", value: "5", tone: "default" },
  { label: "Fator de Recuperação", value: "5.79", tone: "default" },
  { label: "Sharpe Ratio", value: "1.42", tone: "default" },
  { label: "Sortino Ratio", value: "2.01", tone: "default" },
];

const hourlyProfit = [1, 1, 0, 0, 1, 1, 2, 3, 6, 4, 3, 3, 5, 8, 12, 9, 6, 4, 3, 2, 5, 6, 2, 1];
const hourlyLoss = [1, 0, 1, 0, 0, 1, 2, 3, 5, 4, 3, 3, 5, 7, 11, 8, 6, 3, 3, 2, 5, 4, 2, 0];

export const hourlyAxisMax = 15;
export const hourlyTicks = [15, 10, 5, 0];

export const hourlyPerformance = hourlyProfit.map((profit, hour) => ({
  hour: String(hour).padStart(2, "0"),
  profit,
  loss: hourlyLoss[hour],
}));
