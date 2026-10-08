// Dados locais de APRESENTAÇÃO da página de Backtest. Não são contrato de produção
// e não vêm do motor de backtest nem do Copytrix Core.

export const backtestConfig = {
  channels: ["KIM GOLD SECRET"],
  period: "01/06/2026 - 04/09/2026",
  symbols: ["XAUUSD"],
  deposit: "1,000",
};

export type MetricTone = "default" | "positive";

export const backtestMetrics: Array<{ label: string; value: string; note?: string; tone: MetricTone }> = [
  { label: "Total de Operações", value: "167", tone: "default" },
  { label: "Taxa de Vitória", value: "52.7%", tone: "default" },
  { label: "Lucro Total", value: "$4,187.50", note: "(70.17R)", tone: "positive" },
  { label: "Profit Factor", value: "2.39", tone: "default" },
  { label: "Drawdown Máximo", value: "12.1%", tone: "default" },
];

export const resultSegments = {
  total: 167,
  winners: { label: "Vencedoras", count: 88, percent: 52.7 },
  losers: { label: "Perdedoras", count: 79, percent: 47.3 },
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const equityAxis = { min: 700, max: 1500, ticks: [1500, 1300, 1100, 900, 700], labels: ["21 Jun", "05 Jul", "19 Jul", "02 Ago", "16 Ago", "30 Ago", "04 Set"] };

const equityAnchors: Array<[number, number]> = [
  [0, 790],
  [0.08, 770],
  [0.18, 840],
  [0.3, 890],
  [0.4, 990],
  [0.5, 1060],
  [0.6, 1130],
  [0.7, 1215],
  [0.8, 1300],
  [0.9, 1385],
  [1, 1505],
];

export const equitySeries: number[] = (() => {
  const rand = mulberry32(21);
  const count = 96;
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const upper = equityAnchors.findIndex(([x]) => x >= t);
    const [x1, y1] = equityAnchors[Math.max(upper - 1, 0)];
    const [x2, y2] = equityAnchors[Math.max(upper, 1)];
    const base = y1 + ((y2 - y1) * (t - x1)) / (x2 - x1 || 1);
    const noise = i === 0 || i === count - 1 ? 0 : (rand() - 0.5) * 70;
    return Math.min(Math.max(base + noise, equityAxis.min + 20), equityAxis.max - 4);
  });
})();

export const monthlyPerformance = [
  { month: "Jun/2026", trades: "27", usd: "+1,225.00", r: "+16.50R", winRate: "63.0%", pf: "2.85" },
  { month: "Jul/2026", trades: "45", usd: "+777.50", r: "+14.80R", winRate: "55.6%", pf: "2.10" },
  { month: "Ago/2026", trades: "73", usd: "+1,392.50", r: "+27.22R", winRate: "49.3%", pf: "2.45" },
  { month: "Set/2026", trades: "22", usd: "+792.50", r: "+11.65R", winRate: "54.5%", pf: "2.32" },
];

export const monthlyTotal = { month: "Total", trades: "167", usd: "+4,187.50", r: "+70.17R", winRate: "52.7%", pf: "2.39" };

export const rDistribution = {
  ticks: [50, 40, 30, 20, 10, 0],
  bars: [
    { label: "≤ -1R", value: 16, height: 30, negative: true },
    { label: "-1R a 0R", value: 63, height: 80, negative: true },
    { label: "0R a 0.5R", value: 28, height: 52, negative: false },
    { label: "0.5R a 1R", value: 31, height: 57, negative: false },
    { label: "1R a 2R", value: 22, height: 38, negative: false },
    { label: "> 2R", value: 7, height: 15, negative: false },
  ],
};

export type StatTone = "default" | "positive" | "negative";

export const detailedStats: Array<{ label: string; value: string; tone: StatTone }> = [
  { label: "Total de Operações", value: "167", tone: "default" },
  { label: "Operações Vencedoras", value: "88 (52.7%)", tone: "default" },
  { label: "Operações Perdedoras", value: "79 (47.3%)", tone: "default" },
  { label: "Lucro Total", value: "$4,187.50", tone: "positive" },
  { label: "Lucro em R", value: "70.17R", tone: "positive" },
  { label: "Profit Factor", value: "2.39", tone: "default" },
  { label: "Expectativa por Trade", value: "0.420R", tone: "positive" },
  { label: "Maior Ganho", value: "3.00R", tone: "positive" },
  { label: "Maior Perda", value: "-1.00R", tone: "negative" },
  { label: "Drawdown Máximo", value: "12.1%", tone: "default" },
  { label: "Tempo no Mercado", value: "2d 14h 32m", tone: "default" },
];

export type PresentationTrade = {
  id: number;
  dateTime: string;
  symbol: string;
  side: "BUY" | "SELL";
  entry: string;
  exit: string;
  stopLoss: string;
  target: string;
  resultR: string;
  pips: string;
  win: boolean;
};

const t = (
  id: number,
  time: string,
  side: "BUY" | "SELL",
  entry: string,
  exit: string,
  stopLoss: string,
  target: string,
  resultR: string,
  pips: string,
): PresentationTrade => ({ id, dateTime: `04/09/2026 ${time}`, symbol: "XAUUSD", side, entry, exit, stopLoss, target, resultR, pips, win: !resultR.startsWith("-") });

export const presentationTrades: PresentationTrade[] = [
  t(1, "14:32", "BUY", "4142.50", "4143.30", "4140.50", "TP1", "+0.25R", "+8.0"),
  t(2, "13:28", "SELL", "4140.20", "4137.60", "4143.00", "TP2", "+0.50R", "+26.0"),
  t(3, "12:41", "BUY", "4141.10", "4143.10", "4139.10", "TP3", "+0.75R", "+20.0"),
  t(4, "12:32", "SELL", "4142.10", "4143.30", "4145.10", "SL", "-1.00R", "-12.0"),
  t(5, "11:55", "BUY", "4140.50", "4142.80", "4138.50", "TP2", "+0.50R", "+23.0"),
  t(6, "11:21", "BUY", "4138.20", "4139.20", "4136.20", "TP1", "+0.25R", "+10.0"),
  t(7, "10:45", "SELL", "4145.10", "4142.10", "4147.50", "TP4", "+1.00R", "+30.0"),
  t(8, "10:12", "BUY", "4141.80", "4140.80", "4139.80", "SL", "-1.00R", "-10.0"),
  t(9, "09:38", "SELL", "4143.20", "4141.70", "4145.20", "TP2", "+0.50R", "+15.0"),
  t(10, "09:15", "BUY", "4140.90", "4142.40", "4138.90", "TP1", "+0.25R", "+15.0"),
];

export const chartLegend = { buys: 88, sells: 79, symbol: "XAUUSD - M1" };

export const candleAxis = {
  min: 4126,
  max: 4151,
  prices: [4150, 4145, 4140, 4135, 4130],
  times: [
    { label: "10:00", left: 7 },
    { label: "11:00", left: 27.6 },
    { label: "12:00", left: 48.1 },
    { label: "13:00", left: 69.3 },
    { label: "14:00", left: 90 },
  ],
};

export type Candle = { open: number; high: number; low: number; close: number };
export type TradeMarker = { index: number; side: "BUY" | "SELL" };

const candleCount = 64;

export const candles: Candle[] = (() => {
  const rand = mulberry32(7);
  let previousClose = 4143;
  return Array.from({ length: candleCount }, (_, i) => {
    const target = 4140 + 5.2 * Math.sin(i / 9.5 + 0.6) + 2 * Math.sin(i / 3.1);
    const open = previousClose;
    const close = target + (rand() - 0.5) * 2.4;
    const high = Math.max(open, close) + rand() * 1.7;
    const low = Math.min(open, close) - rand() * 1.7;
    previousClose = close;
    return { open, high, low, close };
  });
})();

export const tradeMarkers: TradeMarker[] = (() => {
  const rand = mulberry32(13);
  return [2, 6, 11, 14, 19, 23, 27, 31, 36, 40, 44, 49, 54, 59].map((index) => ({ index, side: rand() > 0.5 ? "BUY" : "SELL" }));
})();
