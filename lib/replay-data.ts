export type Direction = "Buy" | "Sell";
export type Outcome = "TP1" | "TP2" | "TP3" | "SL";
export type SignalStatus = "Executado" | "Ignorado";
export type Triple = [number, number, number];

export interface ReplayChannel {
  id: string;
  name: string;
  asset: string;
  word: string;
  decimals: number;
  tick: number;
  base: number;
  slDist: number;
  slPips: number;
  tpPips: Triple;
  spread: number;
  countFactor: number;
  winRate: number;
  ignoredRate: number;
  rr: number;
  seed: number;
}

export interface ReplayPeriod {
  id: string;
  label: string;
  name: string;
  start: number;
  days: number;
  count: number;
}

export interface ReplaySignal {
  id: number;
  channelId: string;
  time: number;
  asset: string;
  decimals: number;
  slDist: number;
  direction: Direction;
  entry: number;
  sl: number;
  tps: Triple;
  slPips: number;
  tpPips: Triple;
  outcome: Outcome;
  r: number;
  status: SignalStatus;
  execMinutes: number | null;
  spread: number;
  comment: string[];
  reactions: { fire: number; like: number; heart: number };
  views: number;
  ignoredReason: string | null;
}

export interface ReplaySummary {
  total: number;
  executed: number;
  ignored: number;
  executedPct: number;
  ignoredPct: number;
  wins: number;
  losses: number;
  winRate: number;
  rrAvg: number;
  resultR: number;
  resultUsd: number;
}

export interface ReplaySession {
  signals: ReplaySignal[];
  summary: ReplaySummary;
}

export interface ReplayEvent {
  id: string;
  time: number;
  kind: "signal" | "entry" | "tp" | "sl" | "end" | "ignored";
  title: string;
  detail: string;
  level?: "TP1" | "TP2" | "TP3" | "SL";
}

export const TP_R: Triple = [0.25, 0.5, 0.75];
export const R_BY_OUTCOME: Record<Outcome, number> = { TP1: 0.25, TP2: 0.5, TP3: 0.75, SL: -1 };
export const USD_PER_R = 60;
export const REPLAY_DURATION_SECONDS = 150;
export const INITIAL_PROGRESS = 0.1;

export const TIMEFRAMES = [
  { id: "M1", minutes: 1 },
  { id: "M5", minutes: 5 },
  { id: "M15", minutes: 15 },
  { id: "M30", minutes: 30 },
  { id: "H1", minutes: 60 },
  { id: "H4", minutes: 240 },
] as const;
export type TimeframeId = (typeof TIMEFRAMES)[number]["id"];

export const SPEEDS = [
  { value: 0.5, label: "0.5x", name: "Lento" },
  { value: 1, label: "1x", name: "Normal" },
  { value: 2, label: "2x", name: "Rápido" },
  { value: 4, label: "4x", name: "Muito rápido" },
] as const;

export const INDICATORS = [
  { id: "ma20", label: "Média Móvel (20)", short: "MA 20", color: "#f0c35c" },
  { id: "ema50", label: "EMA (50)", short: "EMA 50", color: "#a78bfa" },
  { id: "bb", label: "Bandas de Bollinger", short: "Bollinger", color: "#5cc2ff" },
  { id: "vol", label: "Volume", short: "Volume", color: "#8197ac" },
] as const;
export type IndicatorId = (typeof INDICATORS)[number]["id"];

export const channels: ReplayChannel[] = [
  {
    id: "kim",
    name: "KIM GOLD SECRET",
    asset: "XAUUSD",
    word: "GOLD",
    decimals: 2,
    tick: 0.05,
    base: 3627.5,
    slDist: 20,
    slPips: 20,
    tpPips: [25, 50, 75],
    spread: 0.38,
    countFactor: 1,
    winRate: 0.676,
    ignoredRate: 0.068,
    rr: 1.9,
    seed: 11,
  },
  {
    id: "fx",
    name: "FX PREMIUM",
    asset: "EURUSD",
    word: "EURUSD",
    decimals: 5,
    tick: 0.00005,
    base: 1.0842,
    slDist: 0.003,
    slPips: 30,
    tpPips: [30, 60, 90],
    spread: 0.8,
    countFactor: 1.15,
    winRate: 0.62,
    ignoredRate: 0.09,
    rr: 1.7,
    seed: 23,
  },
  {
    id: "gold",
    name: "GOLD SIGNALS",
    asset: "XAUUSD",
    word: "GOLD",
    decimals: 2,
    tick: 0.05,
    base: 3585,
    slDist: 15,
    slPips: 15,
    tpPips: [20, 40, 60],
    spread: 0.42,
    countFactor: 0.8,
    winRate: 0.62,
    ignoredRate: 0.05,
    rr: 1.6,
    seed: 37,
  },
  {
    id: "us",
    name: "TRADER ZONE",
    asset: "US100",
    word: "NAS100",
    decimals: 2,
    tick: 0.25,
    base: 21350,
    slDist: 120,
    slPips: 120,
    tpPips: [30, 60, 90],
    spread: 1.2,
    countFactor: 0.6,
    winRate: 0.66,
    ignoredRate: 0.07,
    rr: 2.1,
    seed: 41,
  },
];

export const periods: ReplayPeriod[] = [
  { id: "ago", label: "01/08/2026 - 31/08/2026", name: "Agosto/2026", start: Date.UTC(2026, 7, 1), days: 31, count: 73 },
  { id: "jul", label: "01/07/2026 - 31/07/2026", name: "Julho/2026", start: Date.UTC(2026, 6, 1), days: 31, count: 81 },
  { id: "30d", label: "02/08/2026 - 31/08/2026", name: "Últimos 30 dias", start: Date.UTC(2026, 7, 2), days: 30, count: 70 },
  { id: "7d", label: "25/08/2026 - 31/08/2026", name: "Últimos 7 dias", start: Date.UTC(2026, 7, 25), days: 7, count: 17 },
];

export const DEFAULT_CHANNEL_ID = "kim";
export const DEFAULT_PERIOD_ID = "ago";
export const DEFAULT_SIGNAL_ID = 3;

const ignoredReasons = [
  "Horário fora da janela configurada",
  "Spread acima do limite permitido",
  "Filtro de notícias ativo",
  "Limite diário de sinais atingido",
  "Risco máximo da conta excedido",
];

export function createRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const fmtDate = (ms: number) => {
  const d = new Date(ms);
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
};
export const fmtClock = (ms: number) => {
  const d = new Date(ms);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
};
export const fmtDateTime = (ms: number) => `${fmtDate(ms)} ${fmtClock(ms)}`;
export const fmtShortDateTime = (ms: number) => {
  const d = new Date(ms);
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)} ${fmtClock(ms)}`;
};
export const fmtPrice = (value: number, decimals: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
export const fmtR = (r: number, withSign = false) => {
  const text = `${Math.abs(r).toFixed(2)}R`;
  if (r < 0) return `-${text}`;
  return withSign && r > 0 ? `+${text}` : text;
};
export const fmtDuration = (seconds: number) => {
  const total = Math.max(0, Math.round(seconds));
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
};
export const fmtViews = (views: number) => (views >= 1000 ? `${(views / 1000).toFixed(1)}K` : String(views));

const roundTo = (value: number, step: number, decimals: number) => Number((Math.round(value / step) * step).toFixed(decimals));
const tpCount = (outcome: Outcome) => (outcome === "TP1" ? 1 : outcome === "TP2" ? 2 : outcome === "TP3" ? 3 : 0);

interface HeadSpec {
  time: number;
  direction: Direction;
  entry: number;
  outcome: Outcome;
  status: SignalStatus;
  execMinutes: number | null;
}

const kimHead: HeadSpec[] = [
  { time: Date.UTC(2026, 7, 12, 10, 12), direction: "Buy", entry: 3618.5, outcome: "TP2", status: "Executado", execMinutes: 12 },
  { time: Date.UTC(2026, 7, 12, 11, 48), direction: "Sell", entry: 3635.2, outcome: "SL", status: "Executado", execMinutes: 28 },
  { time: Date.UTC(2026, 7, 12, 14, 35), direction: "Buy", entry: 3627.5, outcome: "TP3", status: "Executado", execMinutes: 5 },
  { time: Date.UTC(2026, 7, 12, 16, 22), direction: "Buy", entry: 3640.1, outcome: "TP1", status: "Executado", execMinutes: 17 },
  { time: Date.UTC(2026, 7, 12, 18, 5), direction: "Sell", entry: 3648.3, outcome: "TP2", status: "Ignorado", execMinutes: null },
];

function buildSignal(
  channel: ReplayChannel,
  position: number,
  spec: HeadSpec,
  rnd: () => number,
  ignoredReason: string | null,
): ReplaySignal {
  const dir = spec.direction === "Buy" ? 1 : -1;
  const round = (value: number) => Number(value.toFixed(channel.decimals));
  const entry = spec.entry;
  const tps = TP_R.map((r) => round(entry + dir * channel.slDist * r)) as Triple;
  const sl = round(entry - dir * channel.slDist);
  const isHead = position === 3 && channel.id === "kim" && spec.time === kimHead[2].time;
  const fire = isHead ? 24 : 8 + Math.floor(rnd() * 50);
  const like = isHead ? 12 : 4 + Math.floor(rnd() * 26);
  const heart = isHead ? 8 : 2 + Math.floor(rnd() * 18);
  const views = isHead ? 1200 : 450 + Math.floor(rnd() * 2600);
  const spread = isHead ? 0.38 : Number((channel.spread * (0.6 + rnd() * 0.9)).toFixed(2));
  const fixed = (value: number) => value.toFixed(channel.decimals);
  return {
    id: position,
    channelId: channel.id,
    time: spec.time,
    asset: channel.asset,
    decimals: channel.decimals,
    slDist: channel.slDist,
    direction: spec.direction,
    entry,
    sl,
    tps,
    slPips: channel.slPips,
    tpPips: channel.tpPips,
    outcome: spec.outcome,
    r: R_BY_OUTCOME[spec.outcome],
    status: spec.status,
    execMinutes: spec.execMinutes,
    spread,
    comment: [
      `${channel.word} ${spec.direction.toUpperCase()}`,
      `Entry ${fixed(entry)}`,
      `SL ${fixed(sl)}`,
      `TP1 ${fixed(tps[0])}`,
      `TP2 ${fixed(tps[1])}`,
      `TP3 ${fixed(tps[2])}`,
    ],
    reactions: { fire, like, heart },
    views,
    ignoredReason,
  };
}

function shuffle<T>(items: T[], rnd: () => number) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function getChannel(id: string) {
  return channels.find((channel) => channel.id === id) ?? channels[0];
}
export function getPeriod(id: string) {
  return periods.find((period) => period.id === id) ?? periods[0];
}

const sessionCache = new Map<string, ReplaySession>();

export function buildSession(channelId: string, periodId: string): ReplaySession {
  const key = `${channelId}:${periodId}`;
  const cached = sessionCache.get(key);
  if (cached) return cached;

  const channel = getChannel(channelId);
  const period = getPeriod(periodId);
  const rnd = createRng(hashString(key) ^ channel.seed);
  const count = Math.round(period.count * channel.countFactor);
  const useHead = channel.id === "kim" && period.id === "ago";
  const head = useHead ? kimHead : [];

  const ignoredTotal = useHead ? 5 : Math.round(count * channel.ignoredRate);
  const executedTotal = count - ignoredTotal;
  const winsTotal = useHead ? 46 : Math.round(executedTotal * channel.winRate);
  const headIgnored = head.filter((item) => item.status === "Ignorado").length;
  const headExecuted = head.length - headIgnored;
  const headWins = head.filter((item) => item.status === "Executado" && item.outcome !== "SL").length;
  const winsRest = winsTotal - headWins;
  const lossesRest = executedTotal - headExecuted - winsRest;
  const ignoredRest = ignoredTotal - headIgnored;
  const rest = count - head.length;

  const winOutcome = (): Outcome => {
    const roll = rnd();
    return roll < 0.3 ? "TP1" : roll < 0.7 ? "TP2" : "TP3";
  };
  const pool = shuffle(
    [
      ...Array.from({ length: winsRest }, () => ({ outcome: winOutcome(), status: "Executado" as SignalStatus })),
      ...Array.from({ length: lossesRest }, () => ({ outcome: "SL" as Outcome, status: "Executado" as SignalStatus })),
      ...Array.from({ length: ignoredRest }, () => ({ outcome: winOutcome(), status: "Ignorado" as SignalStatus })),
    ],
    rnd,
  );

  const dayFrom = useHead ? 12 : 0;
  const times = Array.from({ length: rest }, (_, i) => {
    const day = Math.min(period.days - 1, dayFrom + Math.floor(((i + rnd()) / rest) * (period.days - dayFrom)));
    const minute = 7 * 60 + Math.floor(rnd() * 13 * 60);
    return period.start + day * 86400000 + minute * 60000;
  }).sort((a, b) => a - b);
  for (let i = 1; i < times.length; i++) if (times[i] <= times[i - 1]) times[i] = times[i - 1] + 60000;

  const specs: HeadSpec[] = [
    ...head,
    ...pool.map((item, i) => {
      const entry = roundTo(channel.base * (1 + (rnd() - 0.5) * 0.03), channel.tick, channel.decimals);
      return {
        time: times[i],
        direction: (rnd() < 0.5 ? "Buy" : "Sell") as Direction,
        entry,
        outcome: item.outcome,
        status: item.status,
        execMinutes: item.status === "Executado" ? 3 + Math.floor(rnd() * 60) : null,
      };
    }),
  ];

  const signals = specs.map((spec, index) =>
    buildSignal(
      channel,
      index + 1,
      spec,
      rnd,
      spec.status === "Ignorado" ? ignoredReasons[Math.floor(rnd() * ignoredReasons.length)] : null,
    ),
  );

  const executed = signals.filter((signal) => signal.status === "Executado");
  const wins = executed.filter((signal) => signal.outcome !== "SL").length;
  const losses = executed.length - wins;
  const resultR = Number(executed.reduce((sum, signal) => sum + signal.r, 0).toFixed(2));
  const summary: ReplaySummary = {
    total: signals.length,
    executed: executed.length,
    ignored: signals.length - executed.length,
    executedPct: Number(((executed.length / signals.length) * 100).toFixed(1)),
    ignoredPct: Number((((signals.length - executed.length) / signals.length) * 100).toFixed(1)),
    wins,
    losses,
    winRate: Number(((wins / executed.length) * 100).toFixed(1)),
    rrAvg: channel.rr,
    resultR,
    resultUsd: Number((resultR * USD_PER_R).toFixed(2)),
  };

  const session = { signals, summary };
  sessionCache.set(key, session);
  return session;
}

export function buildDistribution(signals: ReplaySignal[]) {
  const executed = signals.filter((signal) => signal.status === "Executado");
  const count = (outcome: Outcome) => executed.filter((signal) => signal.outcome === outcome).length;
  return {
    TP1: count("TP1"),
    TP2: count("TP2"),
    TP3: count("TP3"),
    SL: count("SL"),
    Ignorados: signals.length - executed.length,
    buy: signals.filter((signal) => signal.direction === "Buy").length,
    sell: signals.filter((signal) => signal.direction === "Sell").length,
    avgExec: executed.length ? Math.round(executed.reduce((sum, signal) => sum + (signal.execMinutes ?? 0), 0) / executed.length) : 0,
    avgSpread: signals.length ? signals.reduce((sum, signal) => sum + signal.spread, 0) / signals.length : 0,
  };
}

export function tpOffsetMinutes(signal: ReplaySignal, level: 1 | 2 | 3) {
  const reached = tpCount(signal.outcome) || 1;
  const exec = signal.execMinutes ?? 30;
  return Math.max(1, Math.round((exec * level) / reached));
}

export function buildEvents(signal: ReplaySignal): ReplayEvent[] {
  const price = (value: number) => fmtPrice(value, signal.decimals);
  const events: ReplayEvent[] = [
    { id: "signal", time: signal.time, kind: "signal", title: "Sinal recebido", detail: `${signal.asset} ${signal.direction} publicado no canal` },
  ];
  if (signal.status === "Ignorado") {
    events.push({
      id: "ignored",
      time: signal.time + 60000,
      kind: "ignored",
      title: "Sinal ignorado",
      detail: signal.ignoredReason ?? "Filtro aplicado",
    });
    events.push({
      id: "end",
      time: signal.time + 2 * 60000,
      kind: "end",
      title: "Resultado hipotético",
      detail: `${signal.outcome} (${fmtR(signal.r, true)}). Não executado`,
    });
    return events;
  }
  events.push({ id: "entry", time: signal.time, kind: "entry", title: "Entrada executada", detail: `${signal.direction} a ${price(signal.entry)}, spread ${signal.spread.toFixed(2)}` });
  const reached = tpCount(signal.outcome);
  let lastTime = signal.time;
  if (reached > 0) {
    for (let level = 1; level <= reached; level++) {
      const time = signal.time + tpOffsetMinutes(signal, level as 1 | 2 | 3) * 60000;
      lastTime = time;
      events.push({
        id: `tp${level}`,
        time,
        kind: "tp",
        level: `TP${level}` as "TP1" | "TP2" | "TP3",
        title: `TP${level} atingido`,
        detail: `Preço em ${price(signal.tps[level - 1])} (${fmtR(TP_R[level - 1], true)})`,
      });
    }
  } else {
    lastTime = signal.time + (signal.execMinutes ?? 30) * 60000;
    events.push({ id: "sl", time: lastTime, kind: "sl", level: "SL", title: "Stop Loss atingido", detail: `Preço em ${price(signal.sl)} (-1.00R)` });
  }
  events.push({
    id: "end",
    time: lastTime + 60000,
    kind: "end",
    title: "Operação encerrada",
    detail: `Resultado ${signal.outcome} (${fmtR(signal.r, true)})`,
  });
  return events;
}

export const profitPips = (signal: ReplaySignal) => signal.r * signal.slPips * 4;
