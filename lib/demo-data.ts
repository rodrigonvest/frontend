/**
 * Demonstration data used ONLY when the Copytrix API is unreachable.
 * Nothing here is imported by lib/api.ts — the real API always has priority.
 * Set NEXT_PUBLIC_DISABLE_DEMO=1 to turn the fallback off.
 */
import type { TradeRecord, TradeSummary, TradesResponse } from "./api";
import { EXIT_KEYS, meta, nmeta } from "./trade-format";

export const DEMO_ENABLED = process.env.NEXT_PUBLIC_DISABLE_DEMO !== "1";

export const DEMO_SESSION = {
  copierOnline: true,
  telegram: "Conectado",
  mt5: "Conectado",
  plan: "Plano Pro",
  planValidUntil: "15/11/2026",
  notifications: 3,
  user: { name: "Rodrigo", role: "Usuário Pro" },
};

export type ManagementState = "done" | "unused" | "stop" | "pending";
export type ManagementItem = { label: string; state: ManagementState; detail: string };
export type DemoLog = { trade_id: string; signal_id: string; timestamp: string; message: string; level: "success" | "error" };
export type Candle = { t: string; o: number; h: number; l: number; c: number };

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
const addMin = (s: string, m: number) => {
  const d = new Date(s);
  d.setMinutes(d.getMinutes() + m);
  return iso(d);
};
const r2 = (n: number) => Math.round(n * 100) / 100;

type Seed = {
  n: number;
  at: string;
  channel: string;
  side: "BUY" | "SELL";
  entry: number;
  exit: number;
  sl: number;
  tp: number;
  tpLabel: string;
  pnl: number;
  r: number;
  pips: number;
  lot: number;
  account: string;
  minutes: number;
};

type HeadRow = [number, string, string, "BUY" | "SELL", number, number, number, string, number, number, number, string, number?];

const HEAD: HeadRow[] = [
  [167, "2026-09-04T14:32", "KIM GOLD SECRET", "BUY", 4142.5, 4143.3, 4140.5, "TP1", 0.78, 0.25, 8, "FN MT5", 4143.0],
  [166, "2026-09-04T13:28", "KIM GOLD SECRET", "SELL", 4140.2, 4137.6, 4143.0, "TP2", 1.5, 0.5, 26, "KIM GOLD"],
  [165, "2026-09-04T12:41", "FRAN SIGNALS", "BUY", 4141.1, 4143.1, 4139.1, "TP3", 2.25, 0.75, 20, "FTMO"],
  [164, "2026-09-04T12:32", "LEZZIER FX", "SELL", 4142.1, 4143.3, 4145.1, "SL", -1, -1, -12, "Blue Guardian"],
  [163, "2026-09-04T11:55", "KIM GOLD SECRET", "BUY", 4140.5, 4142.8, 4138.5, "TP2", 1.5, 0.5, 23, "Pessoal"],
  [162, "2026-09-04T11:21", "TRADING DISCIPLINE", "BUY", 4138.2, 4139.2, 4136.2, "TP1", 0.75, 0.25, 10, "FN MT5"],
  [161, "2026-09-04T10:45", "SNIPER XAU", "SELL", 4145.1, 4142.1, 4147.5, "TP4", 3, 1, 30, "FTMO"],
  [160, "2026-09-04T10:12", "KIM GOLD SECRET", "BUY", 4141.8, 4140.8, 4139.8, "SL", -1, -1, -10, "KIM GOLD"],
  [159, "2026-09-04T09:38", "ACADEMY CLUB", "SELL", 4143.2, 4141.7, 4145.2, "TP2", 1.5, 0.5, 15, "Pessoal"],
  [158, "2026-09-04T09:15", "FRAN SIGNALS", "BUY", 4140.9, 4142.4, 4138.9, "TP1", 0.75, 0.25, 15, "FN MT5"],
];

const CHANNELS = ["KIM GOLD SECRET", "FRAN SIGNALS", "LEZZIER FX", "TRADING DISCIPLINE", "SNIPER XAU", "ACADEMY CLUB"];
const ACCOUNTS = ["FN MT5", "KIM GOLD", "FTMO", "Blue Guardian", "Pessoal"];

function headSeeds(): Seed[] {
  const rand = rng(9);
  return HEAD.map(([n, at, channel, side, entry, exit, sl, tpLabel, pnl, r, pips, account, tpOverride]) => {
    const dir = side === "BUY" ? 1 : -1;
    const win = r > 0;
    return {
      n,
      at: `${at}:00`,
      channel,
      side,
      entry,
      exit,
      sl,
      tp: tpOverride ?? (win ? exit : r2(entry + dir * Math.abs(entry - sl) * 1.5)),
      tpLabel,
      pnl,
      r,
      pips,
      lot: 0.1,
      account,
      minutes: n === 167 ? 1 : 2 + Math.floor(rand() * 18),
    };
  });
}

function generatedSeeds(): Seed[] {
  const rand = rng(167);
  const outcomes = [...Array<boolean>(80).fill(true), ...Array<boolean>(77).fill(false)];
  for (let i = outcomes.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
  }
  const bigWin = outcomes.indexOf(true, 60);
  const start = new Date("2026-08-01T08:05:00").getTime();
  const end = new Date("2026-09-03T21:40:00").getTime();
  let price = 4040;

  return outcomes.map((win, i) => {
    price += (rand() - 0.43) * 8;
    const entry = r2(price);
    const side: "BUY" | "SELL" = rand() < 0.55 ? "BUY" : "SELL";
    const dir = side === "BUY" ? 1 : -1;
    const slDist = r2(1.5 + rand() * 2.5);
    const lot = [0.1, 0.1, 0.2, 0.5][Math.floor(rand() * 4)];
    const sl = r2(entry - dir * slDist);
    const channel = CHANNELS[Math.floor(rand() * CHANNELS.length)];
    const account = ACCOUNTS[Math.floor(rand() * ACCOUNTS.length)];
    const minutes = 3 + Math.floor(rand() * 40);
    const at = iso(new Date(start + ((end - start) * i) / (outcomes.length - 1)));

    if (win) {
      const r = i === bigWin ? 3.12 : [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5][Math.floor(rand() * 7)];
      const level = r < 1.25 ? 1 : r < 1.75 ? 2 : r < 2.25 ? 3 : 4;
      const exit = r2(entry + dir * slDist * r);
      return { n: i + 1, at, channel, side, entry, exit, sl, tp: exit, tpLabel: `TP${level}`, pnl: r2(r * lot * 300), r, pips: r2(slDist * r * 10), lot, account, minutes };
    }
    return {
      n: i + 1,
      at,
      channel,
      side,
      entry,
      exit: sl,
      sl,
      tp: r2(entry + dir * slDist * 1.5),
      tpLabel: "SL",
      pnl: r2(-lot * 300),
      r: -1,
      pips: r2(-slDist * 10),
      lot,
      account,
      minutes,
    };
  });
}

function management(win: boolean, tpLabel: string): ManagementItem[] {
  return win
    ? [
        { label: "Mover SL para Break Even", state: "done", detail: "Executado em +20 pips" },
        { label: "Trailing Stop", state: "unused", detail: "Não utilizado" },
        { label: "Fechamento Parcial", state: "done", detail: "Executado em TP1" },
        { label: "Fechamento Final", state: "done", detail: `${tpLabel} atingido` },
      ]
    : [
        { label: "Mover SL para Break Even", state: "unused", detail: "Não acionado" },
        { label: "Trailing Stop", state: "unused", detail: "Não utilizado" },
        { label: "Fechamento Parcial", state: "unused", detail: "Não executado" },
        { label: "Fechamento Final", state: "stop", detail: "SL atingido" },
      ];
}

function toTrade(s: Seed): TradeRecord {
  const closed = addMin(s.at, s.minutes);
  return {
    trade_id: `demo-${s.n}`,
    signal_id: `demo-sig-${s.n}`,
    receiver_id: s.account,
    symbol: "XAUUSD",
    side: s.side,
    volume: s.lot,
    entry_price: s.entry,
    stop_loss: s.sl,
    take_profit: s.tp,
    status: "CLOSED",
    order_ticket: 50_120_000 + s.n * 7,
    position_ticket: 50_120_000 + s.n * 7 + 1,
    created_at: s.at,
    updated_at: closed,
    opened_at: s.at,
    closed_at: closed,
    metadata_json: JSON.stringify({
      demo: true,
      number: s.n,
      channel: s.channel,
      account: s.account,
      tp_label: s.tpLabel,
      pnl: s.pnl,
      result_r: s.r,
      pips: s.pips,
      exit_price: s.exit,
      management: management(s.r > 0, s.tpLabel),
    }),
  };
}

let cache: TradeRecord[] | null = null;
function allDemoTrades() {
  if (!cache) cache = [...headSeeds(), ...generatedSeeds()].sort((a, b) => b.n - a.n).map(toTrade);
  return cache;
}

const DEMO_TOTALS = { pnl_total: 4187.5, avg_r: 0.42, max_r: 3.12, min_r: -1 };

export function getDemoTrades(params: { symbol?: string; side?: string; status?: string; receiver?: string; search?: string } = {}): TradesResponse {
  const q = params.search?.trim().toLowerCase();
  const items = allDemoTrades().filter((t) => {
    const m = meta(t);
    if (params.symbol && t.symbol !== params.symbol) return false;
    if (params.side && t.side !== params.side) return false;
    if (params.status && t.status !== params.status) return false;
    if (params.receiver && (t.receiver_id || "Pessoal") !== params.receiver) return false;
    if (q) {
      const hay = [t.trade_id, t.symbol, t.side, m.channel, m.account, m.number].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const filtered = Boolean(params.symbol || params.side || params.status || params.receiver || q);
  const summary: TradeSummary = {
    total: items.length,
    open: items.filter((t) => t.status === "OPEN").length,
    partial: items.filter((t) => t.status === "PARTIAL").length,
    closed: items.filter((t) => t.status === "CLOSED").length,
    pending: items.filter((t) => t.status === "PENDING").length,
    buy: items.filter((t) => t.side === "BUY").length,
    sell: items.filter((t) => t.side === "SELL").length,
    ...(filtered ? {} : DEMO_TOTALS),
  };
  return { items, total: items.length, summary };
}

export function getDemoLogs(): DemoLog[] {
  return allDemoTrades().flatMap((t) => {
    const m = meta(t);
    const win = Number(m.result_r) > 0;
    const pnl = Number(m.pnl);
    const opened = t.opened_at as string;
    const closed = t.closed_at as string;
    const money = `${pnl >= 0 ? "+" : "-"}$${Math.abs(pnl).toFixed(2)}`;
    const base = { trade_id: t.trade_id, signal_id: t.signal_id };
    return [
      { ...base, timestamp: opened, message: "Sinal recebido do Telegram", level: "success" as const },
      { ...base, timestamp: opened, message: `Ordem executada (${t.side} ${t.volume.toFixed(2)})`, level: "success" as const },
      win
        ? { ...base, timestamp: closed, message: `${m.tp_label} atingido (${money})`, level: "success" as const }
        : { ...base, timestamp: closed, message: `Stop Loss atingido (${money})`, level: "error" as const },
      { ...base, timestamp: closed, message: "Operação fechada", level: "success" as const },
    ];
  });
}

// Candles for operation #167 (14:20 → 14:48, M1), traced from the reference screenshot.
// Extremes (4143.61 / 4140.39) make the axis read 4144.00 → 4140.00 exactly.
const REFERENCE_167: [number, number, number, number][] = [
  [4143.35, 4143.61, 4142.45, 4142.6],
  [4142.6, 4142.75, 4141.95, 4142.05],
  [4142.05, 4142.2, 4141.3, 4141.45],
  [4141.45, 4142.1, 4141.35, 4141.95],
  [4141.95, 4142.35, 4141.7, 4141.8],
  [4141.8, 4142.55, 4141.75, 4142.4],
  [4142.4, 4142.85, 4142.2, 4142.7],
  [4142.7, 4142.9, 4142.25, 4142.35],
  [4142.35, 4142.6, 4142.0, 4142.5],
  [4142.5, 4142.7, 4141.9, 4142.05],
  [4142.05, 4142.25, 4141.4, 4141.55],
  [4141.55, 4141.8, 4140.95, 4141.1],
  [4141.1, 4141.4, 4140.6, 4140.75],
  [4140.75, 4141.05, 4140.39, 4140.55],
  [4140.55, 4141.3, 4140.45, 4141.15],
  [4141.15, 4141.75, 4141.0, 4141.6],
  [4141.6, 4141.7, 4141.05, 4141.25],
  [4141.25, 4142.1, 4141.2, 4141.95],
  [4141.95, 4142.55, 4141.85, 4142.4],
  [4142.4, 4142.5, 4141.9, 4142.05],
  [4142.05, 4142.45, 4141.95, 4142.3],
  [4142.3, 4142.6, 4141.95, 4142.0],
  [4142.0, 4142.15, 4141.6, 4141.75],
  [4141.75, 4142.25, 4141.7, 4142.15],
  [4142.15, 4142.35, 4141.8, 4141.9],
  [4141.9, 4142.05, 4141.55, 4141.7],
  [4141.7, 4142.2, 4141.65, 4142.1],
  [4142.1, 4142.45, 4142.0, 4142.35],
  [4142.35, 4142.5, 4142.05, 4142.2],
];

export function demoCandles(t: TradeRecord): { timeframe: string; candles: Candle[] } {
  if (meta(t).number === 167) {
    return {
      timeframe: "M1",
      candles: REFERENCE_167.map(([o, h, l, c], i) => ({ t: addMin("2026-09-04T14:20:00", i), o, h, l, c })),
    };
  }
  const entry = t.entry_price ?? 0;
  const exit = nmeta(t, EXIT_KEYS) ?? entry;
  const sl = t.stop_loss ?? entry;
  const opened = t.opened_at || t.created_at;
  const closed = t.closed_at || opened;
  const duration = Math.max(1, Math.round((new Date(closed).getTime() - new Date(opened).getTime()) / 60000));
  const tf = duration > 20 ? 5 : 1;
  const total = 34;
  const pre = 12;
  const closeIdx = Math.min(total - 4, pre + Math.max(1, Math.ceil(duration / tf)));
  const span = Math.max(Math.abs(entry - sl), Math.abs(exit - entry), 0.6);
  const rand = rng(hash(t.trade_id));
  const startP = entry + (rand() - 0.2) * span * 1.6;
  const endP = exit + (rand() - 0.5) * span * 0.9;
  const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
  const anchor = (i: number) =>
    i <= pre ? lerp(startP, entry, i / pre) : i <= closeIdx ? lerp(entry, exit, (i - pre) / (closeIdx - pre)) : lerp(exit, endP, (i - closeIdx) / (total - 1 - closeIdx));

  const candles: Candle[] = [];
  let prev = startP;
  for (let i = 0; i < total; i++) {
    const c = i === pre ? entry : i === closeIdx ? exit : anchor(i) + (rand() - 0.5) * span * 0.45;
    const o = prev;
    candles.push({
      t: addMin(opened, (i - pre) * tf),
      o: r2(o),
      c: r2(c),
      h: r2(Math.max(o, c) + rand() * span * 0.18),
      l: r2(Math.min(o, c) - rand() * span * 0.18),
    });
    prev = c;
  }
  return { timeframe: `M${tf}`, candles };
}
