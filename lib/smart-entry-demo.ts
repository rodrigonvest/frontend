export type Timeframe = "M1" | "M5" | "M15" | "H1";
export const timeframes: Timeframe[] = ["M1", "M5", "M15", "H1"];

export type TrendIndicatorId = "ema" | "rsi" | "macd" | "adx";
export type MarketFilterId = "liquidity" | "gaps" | "supportResistance" | "fibonacci" | "orderBlock" | "breakout" | "pullback";

export type SmartEntryConfig = {
  maxEntryDistance: number;
  maxSpread: number;
  priceDirection: string;
  maxExecSeconds: number;
  minAtr: number;
  hours: string;
  avoidNews: boolean;
  indicator: string;
  trendFilter: string;
  minVolume: number;
  minSlDistance: number;
  avoidConsolidation: boolean;
  useMarketPrice: boolean;
  trend: Record<TrendIndicatorId, { enabled: boolean; timeframe: Timeframe }>;
  market: Record<MarketFilterId, boolean>;
  advanced: {
    maxSlippage: number;
    minRiskReward: number;
    maxOpenPerSymbol: number;
    blockDuplicates: boolean;
    avoidLowLiquiditySession: boolean;
  };
  confirmations: {
    minConfirmations: number;
    waitSeconds: number;
    candleClose: boolean;
    volumeSpike: boolean;
    multiTimeframe: boolean;
    manualApproval: boolean;
  };
  schedule: {
    days: boolean[];
    sessions: { london: boolean; newYork: boolean; asia: boolean };
  };
};

export const initialConfig: SmartEntryConfig = {
  maxEntryDistance: 5,
  maxSpread: 0.6,
  priceDirection: "ema",
  maxExecSeconds: 30,
  minAtr: 0.5,
  hours: "09:00 - 23:00",
  avoidNews: true,
  indicator: "ema50-200",
  trendFilter: "with",
  minVolume: 500,
  minSlDistance: 5,
  avoidConsolidation: true,
  useMarketPrice: false,
  trend: {
    ema: { enabled: true, timeframe: "M5" },
    rsi: { enabled: false, timeframe: "M5" },
    macd: { enabled: false, timeframe: "M5" },
    adx: { enabled: true, timeframe: "M5" },
  },
  market: {
    liquidity: true,
    gaps: true,
    supportResistance: true,
    fibonacci: false,
    orderBlock: false,
    breakout: false,
    pullback: true,
  },
  advanced: {
    maxSlippage: 1,
    minRiskReward: 1.5,
    maxOpenPerSymbol: 2,
    blockDuplicates: true,
    avoidLowLiquiditySession: true,
  },
  confirmations: {
    minConfirmations: 2,
    waitSeconds: 5,
    candleClose: true,
    volumeSpike: false,
    multiTimeframe: true,
    manualApproval: false,
  },
  schedule: {
    days: [true, true, true, true, true, false, false],
    sessions: { london: true, newYork: true, asia: false },
  },
};

export const priceDirectionOptions = [
  { value: "ema", label: "Usar tendência (EMA)" },
  { value: "candle", label: "Usar candle anterior" },
  { value: "rsi", label: "Usar momentum (RSI)" },
  { value: "none", label: "Sem confirmação" },
];

export const indicatorOptions = [
  { value: "ema50-200", label: "EMA 50 + EMA 200" },
  { value: "ema20-50", label: "EMA 20 + EMA 50" },
  { value: "rsi14", label: "RSI 14" },
  { value: "macd", label: "MACD (12, 26, 9)" },
];

export const trendFilterOptions = [
  { value: "with", label: "Apenas a favor da tendência" },
  { value: "both", label: "Permitir contra tendência" },
  { value: "off", label: "Desativado" },
];

export const hoursOptions = ["00:00 - 23:59", "09:00 - 23:00", "08:00 - 17:00", "13:00 - 22:00"].map((value) => ({
  value,
  label: value === "00:00 - 23:59" ? "24 horas" : value,
}));

export const timeframeOptions = timeframes.map((value) => ({ value, label: value }));

export const targetOptions = ["Todas as Contas", "Contas MT5", "Contas MT4", "Contas Prop Firm"].map((value) => ({ value, label: value }));

export const trendIndicators: { id: TrendIndicatorId; label: string }[] = [
  { id: "ema", label: "EMA 50 / EMA 200" },
  { id: "rsi", label: "RSI" },
  { id: "macd", label: "MACD" },
  { id: "adx", label: "ADX (Força da Tendência)" },
];

export const marketFilters: { id: MarketFilterId; label: string; help: string }[] = [
  { id: "liquidity", label: "Verificar liquidez", help: "Bloqueia entradas quando o volume do book está abaixo do mínimo." },
  { id: "gaps", label: "Evitar gaps", help: "Ignora sinais logo após gaps de abertura ou de fim de semana." },
  { id: "supportResistance", label: "Checar suporte/resistência", help: "Evita entrar colado em zonas relevantes contra a direção do sinal." },
  { id: "fibonacci", label: "Filtro de Fibonacci", help: "Exige que a entrada esteja em retração de 38.2% a 61.8%." },
  { id: "orderBlock", label: "Filtro de Order Block", help: "Valida a entrada em relação aos order blocks do timeframe." },
  { id: "breakout", label: "Confirmar rompimento", help: "Aguarda o rompimento da máxima ou mínima anterior." },
  { id: "pullback", label: "Aguardar pullback", help: "Aguarda um recuo curto antes de executar a entrada." },
];

export const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export const baseCounters = { received: 152, approved: 126, filtered: 26 };

export const signal = {
  symbol: "XAUUSD",
  side: "BUY" as const,
  receivedAt: "10/09/2026 15:42:18",
  minutes: 15 * 60 + 42,
  entry: 2648.5,
  takeProfit: 2652.5,
  stopLoss: 2646.5,
  spread: 0.38,
  distance: 0.4,
  trend: "Alta",
  atr: 1.2,
  news: "Nenhuma",
};

export type SignalCheck = { label: string; value: string; ok: boolean | null; hint?: string };

export function parseHours(range: string): [number, number] {
  const [start, end] = range.split("-").map((part) => part.trim());
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  return [toMinutes(start), toMinutes(end)];
}

export function evaluateSignal(config: SmartEntryConfig): SignalCheck[] {
  const [start, end] = parseHours(config.hours);
  const inWindow = signal.minutes >= start && signal.minutes <= end;
  const trendOk = config.trendFilter !== "with" || signal.trend === "Alta";
  return [
    { label: "Spread Atual", value: `${signal.spread.toFixed(2)} pips`, ok: signal.spread <= config.maxSpread, hint: `(≤ ${config.maxSpread.toFixed(2)})` },
    { label: "Distância da Entrada", value: `${signal.distance.toFixed(1)} pips`, ok: signal.distance <= config.maxEntryDistance, hint: `(≤ ${config.maxEntryDistance.toFixed(1)})` },
    { label: "Tendência (EMA)", value: signal.trend, ok: trendOk },
    { label: "Volatilidade (ATR)", value: `${signal.atr.toFixed(1)} pips`, ok: signal.atr >= config.minAtr, hint: `(≥ ${config.minAtr.toFixed(2)})` },
    { label: "Horário", value: "15:42 (BRT)", ok: inWindow },
    { label: "Notícias", value: signal.news, ok: true },
  ];
}

export type Candle = { open: number; high: number; low: number; close: number };
export type ChartData = {
  candles: Candle[];
  ema50: number[];
  ema200: number[];
  signalIndex: number;
  times: string[];
};

const chartParams: Record<Timeframe, { seed: number; volatility: number; stepMinutes: number }> = {
  M1: { seed: 11, volatility: 0.35, stepMinutes: 1 },
  M5: { seed: 36, volatility: 0.6, stepMinutes: 5 },
  M15: { seed: 73, volatility: 1.0, stepMinutes: 15 },
  H1: { seed: 5, volatility: 1.8, stepMinutes: 60 },
};

const TOTAL_CANDLES = 300;
export const VISIBLE_CANDLES = 44;
const CANDLES_AFTER_SIGNAL = 8;

function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ema(values: number[], period: number) {
  const k = 2 / (period + 1);
  const out: number[] = [];
  values.forEach((value, index) => {
    out.push(index === 0 ? value : value * k + out[index - 1] * (1 - k));
  });
  return out;
}

function formatTime(totalMinutes: number) {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function buildChart(timeframe: Timeframe): ChartData {
  const { seed, volatility, stepMinutes } = chartParams[timeframe];
  const random = createRandom(seed);
  const raw: Candle[] = [];
  let price = 2640;
  for (let i = 0; i < TOTAL_CANDLES; i += 1) {
    const open = price;
    const close = open + (random() - 0.47) * volatility * 2;
    const high = Math.max(open, close) + random() * volatility * 0.7;
    const low = Math.min(open, close) - random() * volatility * 0.7;
    raw.push({ open, high, low, close });
    price = close;
  }

  const signalAll = TOTAL_CANDLES - 1 - CANDLES_AFTER_SIGNAL;
  const shift = signal.entry - raw[signalAll].close;
  const shifted = raw.map((c) => ({ open: c.open + shift, high: c.high + shift, low: c.low + shift, close: c.close + shift }));
  const closes = shifted.map((c) => c.close);
  const first = TOTAL_CANDLES - VISIBLE_CANDLES;
  const signalIndex = signalAll - first;

  return {
    candles: shifted.slice(first),
    ema50: ema(closes, 50).slice(first),
    ema200: ema(closes, 200).slice(first),
    signalIndex,
    times: shifted.slice(first).map((_, i) => formatTime(signal.minutes + (i - signalIndex) * stepMinutes)),
  };
}

export const smartEntryStats = {
  winRateGain: 24.6,
  falseSignalReduction: 68.2,
  avgRisk: 0.98,
};
