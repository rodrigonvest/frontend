import { createRng, hashString, TP_R, tpOffsetMinutes, TIMEFRAMES, type ReplaySignal, type TimeframeId } from "./replay-data";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const CANDLE_COUNT = 96;
export const SIGNAL_INDEX = 24;

export const timeframeMinutes = (id: TimeframeId) => TIMEFRAMES.find((tf) => tf.id === id)?.minutes ?? 5;

export const windowStart = (signal: ReplaySignal, tf: TimeframeId) => signal.time - SIGNAL_INDEX * timeframeMinutes(tf) * 60000;

export const timeAtProgress = (signal: ReplaySignal, tf: TimeframeId, progress: number) =>
  windowStart(signal, tf) + progress * (CANDLE_COUNT - 1) * timeframeMinutes(tf) * 60000;

export const progressAtTime = (signal: ReplaySignal, tf: TimeframeId, ms: number) =>
  Math.min(1, Math.max(0, (ms - windowStart(signal, tf)) / ((CANDLE_COUNT - 1) * timeframeMinutes(tf) * 60000)));

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

export function buildCandles(signal: ReplaySignal, tf: TimeframeId): Candle[] {
  const minutes = timeframeMinutes(tf);
  const rnd = createRng(hashString(`${signal.channelId}-${signal.id}-${tf}`));
  const dir = signal.direction === "Buy" ? 1 : -1;
  const S = SIGNAL_INDEX;
  const N = CANDLE_COUNT;
  const vol = 0.055 * Math.pow(minutes / 5, 0.25);
  const phase = rnd() * Math.PI * 2;

  const reached = signal.outcome === "SL" ? 0 : signal.outcome === "TP1" ? 1 : signal.outcome === "TP2" ? 2 : 3;
  const anchors: Array<[number, number]> = [];
  if (reached > 0) {
    let previous = S;
    for (let level = 1; level <= reached; level++) {
      const offset = tpOffsetMinutes(signal, level as 1 | 2 | 3);
      const index = Math.min(N - 2, Math.max(previous + 1, S + Math.max(1, Math.floor(offset / minutes))));
      anchors.push([index, TP_R[level - 1] + 0.03]);
      previous = index;
    }
  } else {
    const index = Math.min(N - 2, S + Math.max(2, Math.floor((signal.execMinutes ?? 30) / minutes)));
    anchors.push([index, -1.03]);
  }
  const finalR = { TP1: 0.08, TP2: 0.3, TP3: 0.55, SL: -1.15 }[signal.outcome];
  const maxR = { TP1: 0.46, TP2: 0.71, TP3: 1.2, SL: 0.22 }[signal.outcome];
  const minR = signal.outcome === "SL" ? -3 : -0.9;
  const points: Array<[number, number]> = [[S, 0], ...anchors];
  const [lastIndex, lastValue] = points[points.length - 1];

  const path = (i: number) => {
    if (i <= S) {
      const k = (S - i) / S;
      return -0.3 * k + 0.12 * Math.sin(i / 3.5 + phase) * k;
    }
    if (i <= lastIndex) {
      for (let p = 1; p < points.length; p++) {
        if (i <= points[p][0]) {
          const [x0, y0] = points[p - 1];
          const [x1, y1] = points[p];
          return y0 + ((y1 - y0) * (i - x0)) / (x1 - x0);
        }
      }
    }
    return lastValue + (finalR - lastValue) * smooth((i - lastIndex) / Math.max(1, N - 1 - lastIndex));
  };

  const start = windowStart(signal, tf);
  const toPrice = (r: number) => signal.entry + dir * signal.slDist * r;
  const candles: Candle[] = [];
  let noise = 0;
  let previousClose = path(0);
  const anchorMap = new Map(anchors.map(([index, value]) => [index, value]));

  for (let i = 0; i < N; i++) {
    noise = noise * 0.6 + (rnd() - 0.5) * 2 * vol;
    let close = path(i) + noise;
    if (i > S) close = Math.min(maxR, Math.max(minR, close));
    const open = i === 0 ? close - noise : previousClose;
    let high = Math.max(open, close) + rnd() * vol * 0.7;
    let low = Math.min(open, close) - rnd() * vol * 0.7;
    if (i > S) {
      high = Math.min(maxR, Math.max(minR, high));
      low = Math.min(maxR, Math.max(minR, low));
    }
    const forced = anchorMap.get(i);
    if (forced !== undefined) {
      if (reached > 0) high = Math.max(high, forced - 0.01);
      else low = Math.min(low, forced + 0.01);
    }
    high = Math.max(high, open, close);
    low = Math.min(low, open, close);
    previousClose = close;

    const nearSignal = Math.abs(i - S) < 8 ? 1.9 : 1;
    const volume = Math.round((24 + rnd() * 46) * nearSignal);
    const priceHigh = dir > 0 ? toPrice(high) : toPrice(low);
    const priceLow = dir > 0 ? toPrice(low) : toPrice(high);
    candles.push({
      time: start + i * minutes * 60000,
      open: toPrice(open),
      high: priceHigh,
      low: priceLow,
      close: toPrice(close),
      volume,
    });
  }
  return candles;
}

export function sma(values: number[], period: number): Array<number | null> {
  return values.map((_, i) => {
    if (i < period - 1) return null;
    let sum = 0;
    for (let k = i - period + 1; k <= i; k++) sum += values[k];
    return sum / period;
  });
}

export function ema(values: number[], period: number): Array<number | null> {
  const k = 2 / (period + 1);
  const out: Array<number | null> = [];
  let previous: number | null = null;
  values.forEach((value, i) => {
    previous = previous === null ? value : value * k + previous * (1 - k);
    out.push(i < period - 1 ? null : previous);
  });
  return out;
}

export function bollinger(values: number[], period = 20, deviations = 2) {
  const middle = sma(values, period);
  const upper: Array<number | null> = [];
  const lower: Array<number | null> = [];
  values.forEach((_, i) => {
    const mean = middle[i];
    if (mean === null) {
      upper.push(null);
      lower.push(null);
      return;
    }
    let variance = 0;
    for (let k = i - period + 1; k <= i; k++) variance += (values[k] - mean) ** 2;
    const sd = Math.sqrt(variance / period);
    upper.push(mean + deviations * sd);
    lower.push(mean - deviations * sd);
  });
  return { middle, upper, lower };
}

export function niceTicks(min: number, max: number, target = 6) {
  const range = max - min;
  const rough = range / target;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalized = rough / magnitude;
  const step = (normalized < 1.5 ? 1 : normalized < 3.5 ? 2 : normalized < 7.5 ? 5 : 10) * magnitude;
  const ticks: number[] = [];
  for (let value = Math.ceil(min / step) * step; value <= max; value += step) ticks.push(Number(value.toFixed(10)));
  return ticks;
}
