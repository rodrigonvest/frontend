export type BacktestTrade = {
  id: number;
  dateTime: string;
  symbol: string;
  side: "BUY" | "SELL";
  entry: string;
  exit: string;
  sl: string;
  tp: string;
  result: string;
  pips: string;
  win: boolean;
};

export const backtestPeriod = "01/06/2026 - 04/09/2026";

export const backtestMetrics = {
  totalTrades: "167",
  winRate: "52.7%",
  totalProfit: "$4,187.50",
  totalProfitR: "(70.17R)",
  profitFactor: "2.39",
  maxDrawdown: "12.1%",
};

export const monthlyPerformance = [
  { month: "Jun/2026", trades: "27", usd: "+1,225.00", r: "+16.50R", winRate: "63.0%", pf: "2.85" },
  { month: "Jul/2026", trades: "45", usd: "+777.50", r: "+14.80R", winRate: "55.6%", pf: "2.10" },
  { month: "Ago/2026", trades: "73", usd: "+1,392.50", r: "+27.22R", winRate: "49.3%", pf: "2.45" },
  { month: "Set/2026", trades: "22", usd: "+792.50", r: "+11.65R", winRate: "54.5%", pf: "2.32" },
];

export const monthlyTotal = { month: "Total", trades: "167", usd: "+4,187.50", r: "+70.17R", winRate: "52.7%", pf: "2.39" };

export const rDistribution = [
  { label: "≤ -1R", value: 16, negative: true },
  { label: "-1R a 0R", value: 63, negative: true },
  { label: "0R a 0.5R", value: 28, negative: false },
  { label: "0.5R a 1R", value: 31, negative: false },
  { label: "1R a 2R", value: 22, negative: false },
  { label: "> 2R", value: 7, negative: false },
];

export type StatTone = "default" | "success" | "danger";

export const detailedStats: Array<{ label: string; value: string; tone: StatTone }> = [
  { label: "Total de Operações", value: "167", tone: "default" },
  { label: "Operações Vencedoras", value: "88 (52.7%)", tone: "default" },
  { label: "Operações Perdedoras", value: "79 (47.3%)", tone: "default" },
  { label: "Lucro Total", value: "$4,187.50", tone: "success" },
  { label: "Lucro em R", value: "70.17R", tone: "success" },
  { label: "Profit Factor", value: "2.39", tone: "default" },
  { label: "Expectativa por Trade", value: "0.420R", tone: "success" },
  { label: "Maior Ganho", value: "3.00R", tone: "success" },
  { label: "Maior Perda", value: "-1.00R", tone: "danger" },
  { label: "Drawdown Máximo", value: "12.1%", tone: "default" },
  { label: "Tempo no Mercado", value: "2d 14h 32m", tone: "default" },
];

export const backtestTrades: BacktestTrade[] = [
  { id: 1, dateTime: "04/09/2026 14:32", symbol: "XAUUSD", side: "BUY", entry: "4142.50", exit: "4143.30", sl: "4140.50", tp: "TP1", result: "+0.25R", pips: "+8.0", win: true },
  { id: 2, dateTime: "04/09/2026 13:28", symbol: "XAUUSD", side: "SELL", entry: "4140.20", exit: "4137.60", sl: "4143.00", tp: "TP2", result: "+0.50R", pips: "+26.0", win: true },
  { id: 3, dateTime: "04/09/2026 12:41", symbol: "XAUUSD", side: "BUY", entry: "4141.10", exit: "4143.10", sl: "4139.10", tp: "TP3", result: "+0.75R", pips: "+20.0", win: true },
  { id: 4, dateTime: "04/09/2026 12:32", symbol: "XAUUSD", side: "SELL", entry: "4142.10", exit: "4143.30", sl: "4145.10", tp: "SL", result: "-1.00R", pips: "-12.0", win: false },
  { id: 5, dateTime: "04/09/2026 11:55", symbol: "XAUUSD", side: "BUY", entry: "4140.50", exit: "4142.80", sl: "4138.50", tp: "TP2", result: "+0.50R", pips: "+23.0", win: true },
  { id: 6, dateTime: "04/09/2026 11:21", symbol: "XAUUSD", side: "BUY", entry: "4138.20", exit: "4139.20", sl: "4136.20", tp: "TP1", result: "+0.25R", pips: "+10.0", win: true },
  { id: 7, dateTime: "04/09/2026 10:45", symbol: "XAUUSD", side: "SELL", entry: "4145.10", exit: "4142.10", sl: "4147.50", tp: "TP4", result: "+1.00R", pips: "+30.0", win: true },
  { id: 8, dateTime: "04/09/2026 10:12", symbol: "XAUUSD", side: "BUY", entry: "4141.80", exit: "4140.80", sl: "4139.80", tp: "SL", result: "-1.00R", pips: "-10.0", win: false },
  { id: 9, dateTime: "04/09/2026 09:38", symbol: "XAUUSD", side: "SELL", entry: "4143.20", exit: "4141.70", sl: "4145.20", tp: "TP2", result: "+0.50R", pips: "+15.0", win: true },
  { id: 10, dateTime: "04/09/2026 09:15", symbol: "XAUUSD", side: "BUY", entry: "4140.90", exit: "4142.40", sl: "4138.90", tp: "TP1", result: "+0.25R", pips: "+15.0", win: true },
];

function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const equityDomain = { min: 700, max: 1500 };
export const equityTicks = ["$1,500", "$1,300", "$1,100", "$900", "$700"];
export const equityDates = ["21 Jun", "05 Jul", "19 Jul", "02 Ago", "16 Ago", "30 Ago", "04 Set"];

export const equitySeries: number[] = (() => {
  const rand = seeded(7);
  const n = 84;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const trend = 715 + 770 * Math.pow(t, 0.92);
    const wave = 34 * Math.sin(i * 0.9) + 22 * Math.sin(i * 0.35 + 1);
    const noise = (rand() - 0.5) * 44;
    const fade = 1 - t * 0.25;
    out.push(Math.min(1500, Math.max(705, trend + (wave + noise) * fade)));
  }
  return out;
})();

export type Candle = { open: number; close: number; high: number; low: number };

export const candleDomain = { min: 4130, max: 4150 };

export const candles: Candle[] = (() => {
  const rand = seeded(21);
  const n = 62;
  const out: Candle[] = [];
  let prev = 4141;
  for (let i = 0; i < n; i++) {
    const target = 4141 + 6.5 * Math.sin(i * 0.28 + 0.4) + 3 * Math.sin(i * 0.77);
    const open = prev;
    const close = Math.min(4148.5, Math.max(4131.5, open + (target - open) * 0.45 + (rand() - 0.5) * 3.2));
    const high = Math.min(4149.5, Math.max(open, close) + rand() * 1.8);
    const low = Math.max(4130.5, Math.min(open, close) - rand() * 1.8);
    out.push({ open, close, high, low });
    prev = close;
  }
  return out;
})();

export const buyMarkers = [3, 11, 17, 24, 31, 38, 44, 52, 58];
export const sellMarkers = [1, 7, 14, 21, 28, 35, 42, 49, 55];
export const chartHours = ["10:00", "11:00", "12:00", "13:00", "14:00"];
export const chartPriceTicks = [4150, 4145, 4140, 4135, 4130];
