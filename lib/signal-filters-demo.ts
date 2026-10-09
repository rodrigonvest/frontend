export type CustomRule = { id: string; name: string; description: string; enabled: boolean };

export type SignalFiltersConfig = {
  symbols: string[];
  buy: boolean;
  sell: boolean;
  maxEntryDistance: number;
  minSl: number;
  maxSl: number;
  minTp1: number;
  minRr: number;
  maxSpread: number;
  maxAtr: number;
  hours: string;
  avoidNews: boolean;
  avoidGaps: boolean;
  emaTrendOnly: boolean;
  includedChannels: string[];
  excludedChannels: string[];
  adminOnly: boolean;
  minConfidence: number;
  filterByPerformance: boolean;
  requireSlTp: boolean;
  requireImage: boolean;
  minTps: number;
  ignoreEdited: boolean;
  excludeCancelled: boolean;
  minChars: number;
  includeKeywords: string;
  excludeKeywords: string;
  wholeWord: boolean;
  blockDuplicates: boolean;
  ignoreReplies: boolean;
  days: boolean[];
  sessions: { london: boolean; newYork: boolean; asia: boolean };
  customRules: CustomRule[];
};

export const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export const targetOptions = ["Todas as Contas", "Contas MT5", "Contas MT4", "Contas Prop Firm"].map((value) => ({ value, label: value }));
export const symbolOptions = ["XAUUSD", "XAGUSD", "US100", "US500", "EURUSD", "BTCUSD"];
export const channelOptions = ["KIM GOLD SECRET", "Sinais Grátis", "FX Premium VIP", "Crypto Whales"];
export const hoursOptions = ["00:00 - 23:59", "09:00 - 23:00", "08:00 - 18:00", "13:00 - 22:00"].map((value) => ({ value, label: value }));
export const minTpsOptions = [1, 2, 3, 4].map((value) => ({ value: String(value), label: String(value) }));
export const periodOptions = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

export const initialConfig: SignalFiltersConfig = {
  symbols: ["XAUUSD", "XAGUSD", "US100"],
  buy: true,
  sell: true,
  maxEntryDistance: 5,
  minSl: 10,
  maxSl: 50,
  minTp1: 10,
  minRr: 1.5,
  maxSpread: 0.6,
  maxAtr: 0.5,
  hours: "09:00 - 23:00",
  avoidNews: true,
  avoidGaps: true,
  emaTrendOnly: true,
  includedChannels: ["KIM GOLD SECRET"],
  excludedChannels: ["Sinais Grátis"],
  adminOnly: true,
  minConfidence: 70,
  filterByPerformance: true,
  requireSlTp: true,
  requireImage: true,
  minTps: 1,
  ignoreEdited: true,
  excludeCancelled: true,
  minChars: 10,
  includeKeywords: "BUY\nSELL\nENTRY\nTP\nSL\nGOLD\nXAU",
  excludeKeywords: "scalper\nlongo prazo\ninvestimento\nnão é recomendação",
  wholeWord: false,
  blockDuplicates: true,
  ignoreReplies: false,
  days: [true, true, true, true, true, false, false],
  sessions: { london: true, newYork: true, asia: false },
  customRules: [
    { id: "r1", name: "Pausar XAUUSD na abertura de Nova York", description: "Ignora sinais de ouro entre 10:25 e 10:35 (BRT).", enabled: true },
    { id: "r2", name: "Reduzir sinais às sextas após 18:00", description: "Aprova apenas sinais com confiança acima de 85%.", enabled: false },
    { id: "r3", name: "Bloquear sinais com SL maior que 2x o TP1", description: "Evita entradas com risco desproporcional.", enabled: true },
  ],
};

export const clearedConfig: SignalFiltersConfig = {
  ...initialConfig,
  symbols: [...symbolOptions],
  buy: true,
  sell: true,
  maxEntryDistance: 0,
  minSl: 0,
  maxSl: 0,
  minTp1: 0,
  minRr: 0,
  maxSpread: 0,
  maxAtr: 0,
  hours: "00:00 - 23:59",
  avoidNews: false,
  avoidGaps: false,
  emaTrendOnly: false,
  includedChannels: [],
  excludedChannels: [],
  adminOnly: false,
  minConfidence: 0,
  filterByPerformance: false,
  requireSlTp: false,
  requireImage: false,
  minTps: 1,
  ignoreEdited: false,
  excludeCancelled: false,
  minChars: 0,
  includeKeywords: "",
  excludeKeywords: "",
  wholeWord: false,
  blockDuplicates: false,
  ignoreReplies: false,
  days: [true, true, true, true, true, true, true],
  sessions: { london: true, newYork: true, asia: true },
  customRules: initialConfig.customRules.map((rule) => ({ ...rule, enabled: false })),
};

export type SignalTemplate = { id: string; name: string; description: string; config: SignalFiltersConfig };

export const initialTemplates: SignalTemplate[] = [
  { id: "t1", name: "Scalping XAUUSD", description: "Sinais rápidos e precisos para ouro", config: initialConfig },
  {
    id: "t2",
    name: "Prop Firm Seguro",
    description: "Filtros conservadores para mesas",
    config: { ...initialConfig, symbols: ["XAUUSD", "US100"], maxSl: 30, minRr: 2, maxSpread: 0.4, minConfidence: 80, avoidNews: true },
  },
  {
    id: "t3",
    name: "Day Trade Índices",
    description: "US100, US500 e NASDAQ",
    config: { ...initialConfig, symbols: ["US100", "US500"], minSl: 20, maxSl: 80, minTp1: 20, hours: "13:00 - 22:00" },
  },
  {
    id: "t4",
    name: "Swing Trade",
    description: "Médio prazo com confirmação",
    config: { ...initialConfig, minSl: 30, maxSl: 150, minTp1: 60, minRr: 2.5, hours: "00:00 - 23:59", excludeKeywords: "scalper\ninvestimento" },
  },
  {
    id: "t5",
    name: "Crypto Futuro",
    description: "Filtros para Binance Futures",
    config: { ...initialConfig, symbols: ["BTCUSD"], includedChannels: ["Crypto Whales"], excludedChannels: [], hours: "00:00 - 23:59", maxSpread: 1.2 },
  },
];

export type FeedSignal = {
  id: string;
  date: string;
  time: string;
  weekday: number;
  channel: string;
  symbol: string;
  side: "Buy" | "Sell";
  entry: number;
  decimals: number;
  slPips: number;
  tp1Pips: number;
  spread: number;
  atr: number;
  entryDistance: number;
  confidence: number;
  winRate: number;
  admin: boolean;
  hasImage: boolean;
  hasSlTp: boolean;
  tps: number;
  edited: boolean;
  cancelled: boolean;
  reply: boolean;
  duplicate: boolean;
  highImpactNews: boolean;
  gap: boolean;
  trendAligned: boolean;
  text: string;
};

type SignalSeed = Omit<FeedSignal, "id" | "date" | "time" | "weekday" | "text"> & { text?: string };

const baseSeed = {
  admin: true,
  hasImage: true,
  hasSlTp: true,
  tps: 2,
  edited: false,
  cancelled: false,
  reply: false,
  duplicate: false,
  highImpactNews: false,
  gap: false,
  trendAligned: true,
  winRate: 78,
  confidence: 88,
  atr: 0.32,
  entryDistance: 1.2,
} as const;

export const feedPool: SignalSeed[] = [
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "XAUUSD", side: "Buy", entry: 2648.5, decimals: 2, slPips: 20, tp1Pips: 40, spread: 0.38 },
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "US100", side: "Buy", entry: 21482.5, decimals: 2, slPips: 30, tp1Pips: 60, spread: 0.22 },
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "XAGUSD", side: "Sell", entry: 30.185, decimals: 3, slPips: 20, tp1Pips: 40, spread: 0.41 },
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "XAUUSD", side: "Buy", entry: 2642.5, decimals: 2, slPips: 20, tp1Pips: 40, spread: 0.52 },
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "US500", side: "Buy", entry: 6421, decimals: 2, slPips: 30, tp1Pips: 60, spread: 0.33 },
  { ...baseSeed, channel: "Sinais Grátis", symbol: "XAUUSD", side: "Sell", entry: 2651.2, decimals: 2, slPips: 25, tp1Pips: 50, spread: 0.45, admin: false, confidence: 61, winRate: 48 },
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "XAUUSD", side: "Sell", entry: 2653.8, decimals: 2, slPips: 22, tp1Pips: 28, spread: 0.71 },
  { ...baseSeed, channel: "KIM GOLD SECRET", symbol: "US100", side: "Sell", entry: 21510, decimals: 2, slPips: 35, tp1Pips: 70, spread: 0.3, hasImage: false },
  {
    ...baseSeed,
    channel: "KIM GOLD SECRET",
    symbol: "XAUUSD",
    side: "Buy",
    entry: 2645.9,
    decimals: 2,
    slPips: 18,
    tp1Pips: 36,
    spread: 0.35,
    text: "GOLD BUY scalper rápido, não é recomendação",
  },
];

const fixedTimes = ["15:42", "15:28", "15:17", "14:55", "14:33"];

const buildText = (seed: SignalSeed) => {
  if (seed.text) return seed.text;
  const sign = seed.side === "Buy" ? 1 : -1;
  const step = seed.symbol === "XAGUSD" ? 0.01 : 0.1;
  const tp = (seed.entry + sign * seed.tp1Pips * step).toFixed(seed.decimals);
  const sl = (seed.entry - sign * seed.slPips * step).toFixed(seed.decimals);
  return `${seed.symbol} ${seed.side.toUpperCase()} ENTRY ${seed.entry.toFixed(seed.decimals)} TP ${tp} SL ${sl} GOLD XAU`;
};

export const makeSignal = (seed: SignalSeed, id: string, time: string, weekday: number): FeedSignal => ({
  ...seed,
  id,
  date: "10/09",
  time,
  weekday,
  text: buildText(seed),
});

export const initialFeed: FeedSignal[] = feedPool.slice(0, 5).map((seed, index) => makeSignal(seed, `s${index}`, fixedTimes[index], 3));

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const inRange = (minutes: number, start: number, end: number) => (start <= end ? minutes >= start && minutes <= end : minutes >= start || minutes <= end);

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lines = (text: string) => text.split("\n").map((line) => line.trim()).filter(Boolean);

const matches = (text: string, word: string, whole: boolean) =>
  whole ? new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(word)}([^\\p{L}\\p{N}]|$)`, "iu").test(text) : text.toLowerCase().includes(word.toLowerCase());

export type Evaluation = { ok: boolean; reason?: string };

export function evaluateSignal(signal: FeedSignal, c: SignalFiltersConfig): Evaluation {
  const fail = (reason: string): Evaluation => ({ ok: false, reason });
  const minutes = toMinutes(signal.time);
  const [start, end] = c.hours.split(" - ").map(toMinutes);
  const rr = signal.slPips > 0 ? signal.tp1Pips / signal.slPips : 0;

  if (!c.symbols.includes(signal.symbol)) return fail("Símbolo não permitido");
  if (signal.side === "Buy" ? !c.buy : !c.sell) return fail("Direção bloqueada");
  if (c.maxEntryDistance > 0 && signal.entryDistance > c.maxEntryDistance) return fail("Entrada distante");
  if (c.minSl > 0 && signal.slPips < c.minSl) return fail("SL abaixo do mínimo");
  if (c.maxSl > 0 && signal.slPips > c.maxSl) return fail("SL acima do máximo");
  if (signal.tp1Pips < c.minTp1) return fail("TP1 abaixo do mínimo");
  if (rr < c.minRr) return fail("RR abaixo do mínimo");
  if (c.maxSpread > 0 && signal.spread > c.maxSpread) return fail("Spread acima do máximo");
  if (c.maxAtr > 0 && signal.atr > c.maxAtr) return fail("ATR acima do máximo");
  if (!inRange(minutes, start, end)) return fail("Fora do horário");
  if (!c.days[signal.weekday]) return fail("Dia bloqueado");
  const sessionOpen =
    (c.sessions.london && inRange(minutes, 240, 780)) || (c.sessions.newYork && inRange(minutes, 540, 1080)) || (c.sessions.asia && inRange(minutes, 1200, 300));
  if (!sessionOpen) return fail("Fora das sessões");
  if (c.avoidNews && signal.highImpactNews) return fail("Notícia de alto impacto");
  if (c.avoidGaps && signal.gap) return fail("Gap detectado");
  if (c.emaTrendOnly && !signal.trendAligned) return fail("Contra a tendência EMA");
  if (c.excludedChannels.includes(signal.channel)) return fail("Canal excluído");
  if (c.includedChannels.length > 0 && !c.includedChannels.includes(signal.channel)) return fail("Canal não incluído");
  if (c.adminOnly && !signal.admin) return fail("Não é sinal de admin");
  if (signal.confidence < c.minConfidence) return fail("Confiança baixa");
  if (c.filterByPerformance && signal.winRate < 60) return fail("Canal com baixa performance");
  if (c.requireSlTp && !signal.hasSlTp) return fail("Sem SL/TP");
  if (c.requireImage && !signal.hasImage) return fail("Sem imagem");
  if (signal.tps < c.minTps) return fail("TPs insuficientes");
  if (c.ignoreEdited && signal.edited) return fail("Mensagem editada");
  if (c.excludeCancelled && signal.cancelled) return fail("Sinal cancelado");
  if (signal.text.length < c.minChars) return fail("Mensagem curta");
  if (c.blockDuplicates && signal.duplicate) return fail("Sinal duplicado");
  if (c.ignoreReplies && signal.reply) return fail("Mensagem de resposta");
  const exclude = lines(c.excludeKeywords).find((word) => matches(signal.text, word, c.wholeWord));
  if (exclude) return fail(`Palavra excluída: ${exclude}`);
  const include = lines(c.includeKeywords);
  if (include.length > 0 && !include.some((word) => matches(signal.text, word, c.wholeWord))) return fail("Sem palavra-chave");
  return { ok: true };
}

export type CategoryCount = { id: string; label: string; count: number; color: string };

export function countActiveFilters(c: SignalFiltersConfig): CategoryCount[] {
  const flags = (...values: boolean[]) => values.filter(Boolean).length;
  const everySymbol = c.symbols.length === symbolOptions.length;
  return [
    { id: "asset", label: "Ativo e Direção", color: "#2b8cff", count: (everySymbol ? 0 : c.symbols.length) + flags(!(c.buy && c.sell)) },
    {
      id: "entry",
      label: "Entrada, SL e TP",
      color: "#ff4d6d",
      count: flags(c.maxEntryDistance > 0, c.minSl > 0, c.maxSl > 0, c.minTp1 > 0, c.minRr > 0),
    },
    {
      id: "market",
      label: "Mercado e Execução",
      color: "#f5b83d",
      count: flags(c.maxSpread > 0, c.maxAtr > 0, c.hours !== "00:00 - 23:59", c.avoidNews, c.avoidGaps, c.emaTrendOnly),
    },
    {
      id: "channel",
      label: "Canal",
      color: "#f58b3d",
      count: c.includedChannels.length + c.excludedChannels.length + flags(c.adminOnly, c.minConfidence > 0, c.filterByPerformance),
    },
    {
      id: "quality",
      label: "Qualidade e Conteúdo",
      color: "#12d99e",
      count: flags(c.requireSlTp, c.requireImage, c.minTps > 1, c.ignoreEdited, c.excludeCancelled, c.minChars > 0, c.blockDuplicates, c.ignoreReplies),
    },
    { id: "keywords", label: "Palavras-chave", color: "#8b7cf6", count: flags(lines(c.includeKeywords).length > 0, lines(c.excludeKeywords).length > 0) },
  ];
}

export const periodStats: Record<string, { received: number; approved: number }> = {
  "7": { received: 41, approved: 34 },
  "30": { received: 152, approved: 126 },
  "90": { received: 452, approved: 375 },
};

export const exportFileName = "filtros-avancados-copytrix.json";

export function mergeImported(value: unknown): SignalFiltersConfig | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Partial<SignalFiltersConfig>;
  const merged: SignalFiltersConfig = { ...initialConfig, ...source, sessions: { ...initialConfig.sessions, ...source.sessions } };
  if (!Array.isArray(merged.symbols) || !Array.isArray(merged.days) || merged.days.length !== 7) return null;
  if (!Array.isArray(merged.includedChannels) || !Array.isArray(merged.excludedChannels) || !Array.isArray(merged.customRules)) return null;
  return merged;
}
