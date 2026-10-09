export type DemoCandle = { o: number; h: number; l: number; c: number };

const closes = [
  2641.6, 2641.2, 2640.9, 2641.4, 2641.9, 2641.5, 2641.1, 2640.8, 2641.3, 2641.7, 2642.2, 2641.8, 2641.4, 2641.9, 2642.4, 2642.0,
  2641.6, 2641.2, 2641.7, 2642.3, 2641.9, 2641.5, 2641.1, 2641.6, 2641.3, 2641.0, 2641.5, 2641.9, 2641.6, 2641.8, 2642.0, 2642.15,
  2642.5, 2642.9, 2643.4, 2643.0, 2643.6, 2644.2, 2644.0, 2644.9, 2645.9, 2645.5, 2645.9,
];

export const tradeCandles: DemoCandle[] = closes.map((c, i) => {
  const o = i === 0 ? 2641.98 : closes[i - 1];
  const h = Math.max(o, c) + 0.12 + ((i * 7) % 5) * 0.07;
  const l = Math.min(o, c) - (0.1 + ((i * 3) % 4) * 0.08);
  return { o, h, l, c };
});

export const tradeLevels = {
  entry: 2642.15,
  stopLoss: 2640.15,
  takeProfit: 2645.9,
  entryIndex: 31,
  exitIndex: 40,
};

export const tradeTimeframes = ["M1", "M5", "M15", "M30", "H1", "H4", "D1"];

export const tradeSignalLines = [
  "XAUUSD BUY",
  "Entry: 2642.10 - 2642.30",
  "SL: 2640.10",
  "TP1: 2643.10",
  "TP2: 2644.50",
  "TP3: 2645.90",
  "TP4: 2647.50",
];

export const tradeTimeline = [
  { time: "14:31:05", title: "Sinal recebido", detail: "Processado em 120 ms" },
  { time: "14:31:18", title: "Validação de regras", detail: "Spread: 0.26 pips", check: true },
  { time: "14:32:15", title: "Ordem enviada", detail: "Buy 0.10 lot a 2,642.15" },
  { time: "14:32:15", title: "Ordem executada", detail: "Ticket: 893745621" },
  { time: "15:18:43", title: "TP3 atingido", detail: "Fechamento automático" },
];

export const tradeSteps = [
  { stage: "Entrada", price: "2,642.15", pips: "-", result: "-", done: true },
  { stage: "TP1", price: "2,643.10", pips: "+9.5", result: "+$47.50 (0.25R)", done: true },
  { stage: "TP2", price: "2,644.50", pips: "+23.5", result: "+$117.50 (0.50R)", done: true },
  { stage: "TP3", price: "2,645.90", pips: "+37.5", result: "+$187.50 (0.75R)", done: true },
  { stage: "TP4", price: "-", pips: "-", result: "-", done: false },
];
