export type ChannelStatus = "Excelente" | "Bom" | "Regular" | "Atenção";

export type Slice = { label: string; pct: number; color: string };
export type MonthlyPoint = { month: string; profit: number; loss: number; winRate: number };
export type AssetShare = { symbol: string; pct: number };
export type Dimension = { label: string; value: number };

export type Channel = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  accent: string;
  score: number;
  status: ChannelStatus;
  description: string;
  tags: string[];
  totalSignals: number;
  validSignals: number;
  canceledSignals: number;
  winRate: number;
  profitFactor: number;
  rrAvg: number;
  drawdown: number;
  equity: number[];
  monthly: MonthlyPoint[];
  heat: number[][];
  assets: AssetShare[];
  signalTypes: Slice[];
  quality: Slice[];
  metrics: { execSeconds: number; entryDistance: number; slAvg: number; tpAvg: number };
  consistency: { profitableDays: number; positiveWeeks: string; bestStreak: number; worstStreak: number; stability: number; dimensions: Dimension[] };
  strengths: string[];
  warnings: string[];
};

export const PERIOD_LABEL = "01/06/2026 - 30/09/2026";
export const PERIOD_DAYS = 121;
export const EQUITY_POINTS = 122;

export const HOURS = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
export const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export const statusColor: Record<ChannelStatus, string> = {
  Excelente: "#12d99e",
  Bom: "#12d99e",
  Regular: "#f0c35c",
  Atenção: "#ff5d6d",
};

export const assetPalette = ["#f0c35c", "#159af2", "#9b63ff", "#ff5ea8", "#12d99e", "#ff9f43", "#8197ac"];

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function equityDate(index: number) {
  const date = new Date(Date.UTC(2026, 5, 1 + index));
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return { label: `${day}/${month}/${date.getUTCFullYear()}`, month: `${MONTHS[date.getUTCMonth()]}/26` };
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(random: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function buildEquity(seed: number, target: number, volatility: number) {
  const random = mulberry32(seed);
  const path = [0];
  for (let i = 1; i < EQUITY_POINTS; i += 1) path.push(path[i - 1] + 1 + volatility * gauss(random));
  const scale = target / (EQUITY_POINTS - 1);
  const scaled = path.map((value) => value * scale);
  const gap = target - scaled[EQUITY_POINTS - 1];
  return scaled.map((value, i) => Math.round(value + (gap * i) / (EQUITY_POINTS - 1)));
}

function buildHeat(seed: number, hourProfile: number[], weekend: number) {
  const random = mulberry32(seed);
  const dayWeight = [0.92, 1, 0.96, 1, 0.9, weekend, weekend * 0.7];
  return hourProfile.map((hour) => dayWeight.map((day) => Math.min(1, Math.max(0.02, hour * day * (0.78 + random() * 0.44)))));
}

const BLUE = "#159af2";
const GREEN = "#12d99e";
const AMBER = "#f0c35c";
const PURPLE = "#9b63ff";
const RED = "#ff5d6d";
const ORANGE = "#ff9f43";

const typeSlices = (values: number[]): Slice[] => [
  { label: "Entrada Direta", pct: values[0], color: BLUE },
  { label: "Entrada Pendente", pct: values[1], color: GREEN },
  { label: "Gerenciamento", pct: values[2], color: AMBER },
  { label: "Saída Parcial", pct: values[3], color: PURPLE },
  { label: "Cancelado", pct: values[4], color: RED },
];

const qualitySlices = (values: number[]): Slice[] => [
  { label: "Excelente (9-10)", pct: values[0], color: GREEN },
  { label: "Boa (7-8)", pct: values[1], color: BLUE },
  { label: "Regular (5-6)", pct: values[2], color: AMBER },
  { label: "Ruim (3-4)", pct: values[3], color: ORANGE },
  { label: "Muito Ruim (1-2)", pct: values[4], color: RED },
];

export const channels: Channel[] = [
  {
    id: "kim-gold-secret",
    name: "KIM GOLD SECRET",
    handle: "@kimgoldsecret",
    initials: "KIM",
    accent: "#f0c35c",
    score: 8.7,
    status: "Excelente",
    description: "Canal focado em sinais de XAUUSD com alta taxa de acerto e boa gestão de risco. Ideal para scalping e day trade.",
    tags: ["XAUUSD", "Scalping", "Day Trade", "Sinais Manuais"],
    totalSignals: 1842,
    validSignals: 1573,
    canceledSignals: 269,
    winRate: 68.4,
    profitFactor: 2.31,
    rrAvg: 1.52,
    drawdown: 8.6,
    equity: buildEquity(11, 11840, 3.2),
    monthly: [
      { month: "Jun/26", profit: 31.5, loss: -9.8, winRate: 67 },
      { month: "Jul/26", profit: 38.2, loss: -11.4, winRate: 65 },
      { month: "Ago/26", profit: 42.7, loss: -12.1, winRate: 70 },
      { month: "Set/26", profit: 35.9, loss: -8.9, winRate: 72 },
    ],
    heat: buildHeat(21, [0.18, 0.12, 0.3, 0.64, 0.78, 0.9, 0.52, 0.28], 0.55),
    assets: [
      { symbol: "XAUUSD", pct: 78.6 },
      { symbol: "US100", pct: 8.4 },
      { symbol: "US500", pct: 5.2 },
      { symbol: "EURUSD", pct: 3.1 },
      { symbol: "GBPUSD", pct: 2.4 },
      { symbol: "US30", pct: 1.3 },
      { symbol: "Outros", pct: 1.0 },
    ],
    signalTypes: typeSlices([52.1, 28.4, 12.7, 4.3, 2.5]),
    quality: qualitySlices([46.2, 32.8, 15.1, 4.5, 1.4]),
    metrics: { execSeconds: 1.8, entryDistance: 2.4, slAvg: 21.3, tpAvg: 32.5 },
    consistency: {
      profitableDays: 74.2,
      positiveWeeks: "15 de 17",
      bestStreak: 14,
      worstStreak: 3,
      stability: 91,
      dimensions: [
        { label: "Estabilidade do Win Rate", value: 92 },
        { label: "Disciplina de Risco", value: 94 },
        { label: "Regularidade de Sinais", value: 88 },
        { label: "Velocidade de Publicação", value: 90 },
        { label: "Transparência de Resultados", value: 86 },
      ],
    },
    strengths: ["Win rate acima de 68% com baixa variação mensal", "Stop Loss sempre informado em 96% dos sinais", "Drawdown máximo controlado em 8.6%"],
    warnings: ["Concentração de 78.6% em XAUUSD", "Queda de liquidez nos horários de madrugada"],
  },
  {
    id: "fx-premium",
    name: "FX PREMIUM",
    handle: "@fxpremium",
    initials: "FX",
    accent: "#9b63ff",
    score: 7.9,
    status: "Bom",
    description: "Canal de forex com foco em majors e boa diversificação. Entradas pendentes e gerenciamento ativo das operações.",
    tags: ["EURUSD", "GBPUSD", "Day Trade", "Sinais Manuais"],
    totalSignals: 1468,
    validSignals: 1229,
    canceledSignals: 239,
    winRate: 63.8,
    profitFactor: 1.94,
    rrAvg: 1.41,
    drawdown: 11.2,
    equity: buildEquity(37, 8420, 4),
    monthly: [
      { month: "Jun/26", profit: 24.1, loss: -11.6, winRate: 61 },
      { month: "Jul/26", profit: 27.8, loss: -13.2, winRate: 62 },
      { month: "Ago/26", profit: 31.4, loss: -12.0, winRate: 65 },
      { month: "Set/26", profit: 26.9, loss: -12.8, winRate: 66 },
    ],
    heat: buildHeat(43, [0.3, 0.42, 0.72, 0.84, 0.7, 0.46, 0.26, 0.16], 0.4),
    assets: [
      { symbol: "EURUSD", pct: 34.2 },
      { symbol: "GBPUSD", pct: 26.8 },
      { symbol: "USDJPY", pct: 14.1 },
      { symbol: "XAUUSD", pct: 9.3 },
      { symbol: "AUDUSD", pct: 6.4 },
      { symbol: "USDCAD", pct: 4.6 },
      { symbol: "Outros", pct: 4.6 },
    ],
    signalTypes: typeSlices([44.3, 31.2, 14.5, 6.0, 4.0]),
    quality: qualitySlices([31.4, 38.6, 20.2, 7.1, 2.7]),
    metrics: { execSeconds: 2.3, entryDistance: 3.1, slAvg: 24.8, tpAvg: 35.0 },
    consistency: {
      profitableDays: 66.9,
      positiveWeeks: "13 de 17",
      bestStreak: 11,
      worstStreak: 4,
      stability: 80,
      dimensions: [
        { label: "Estabilidade do Win Rate", value: 82 },
        { label: "Disciplina de Risco", value: 79 },
        { label: "Regularidade de Sinais", value: 84 },
        { label: "Velocidade de Publicação", value: 76 },
        { label: "Transparência de Resultados", value: 78 },
      ],
    },
    strengths: ["Boa diversificação entre pares de forex", "Sinais com gerenciamento ativo (14.5%)", "Resultados positivos em todos os meses"],
    warnings: ["Drawdown de 11.2% acima da média dos canais Excelentes", "16.3% de sinais cancelados"],
  },
  {
    id: "gold-signals",
    name: "GOLD SIGNALS",
    handle: "@goldsignals",
    initials: "GS",
    accent: "#ff5d6d",
    score: 6.4,
    status: "Regular",
    description: "Canal de ouro e prata com alto volume de sinais. Resultados positivos, porém com consistência abaixo da média.",
    tags: ["XAUUSD", "XAGUSD", "Scalping", "Sinais Mistos"],
    totalSignals: 2310,
    validSignals: 1790,
    canceledSignals: 520,
    winRate: 57.2,
    profitFactor: 1.38,
    rrAvg: 1.22,
    drawdown: 17.9,
    equity: buildEquity(59, 4640, 5),
    monthly: [
      { month: "Jun/26", profit: 22.0, loss: -14.9, winRate: 56 },
      { month: "Jul/26", profit: 25.4, loss: -17.1, winRate: 57 },
      { month: "Ago/26", profit: 19.8, loss: -16.2, winRate: 55 },
      { month: "Set/26", profit: 27.3, loss: -15.4, winRate: 61 },
    ],
    heat: buildHeat(67, [0.42, 0.34, 0.46, 0.58, 0.62, 0.6, 0.48, 0.4], 0.7),
    assets: [
      { symbol: "XAUUSD", pct: 71.2 },
      { symbol: "XAGUSD", pct: 11.4 },
      { symbol: "US30", pct: 5.3 },
      { symbol: "EURUSD", pct: 4.1 },
      { symbol: "GBPUSD", pct: 3.2 },
      { symbol: "US100", pct: 2.5 },
      { symbol: "Outros", pct: 2.3 },
    ],
    signalTypes: typeSlices([38.5, 33.4, 15.9, 5.7, 6.5]),
    quality: qualitySlices([18.9, 33.4, 30.7, 12.5, 4.5]),
    metrics: { execSeconds: 3.4, entryDistance: 4.6, slAvg: 28.9, tpAvg: 34.7 },
    consistency: {
      profitableDays: 58.7,
      positiveWeeks: "11 de 17",
      bestStreak: 8,
      worstStreak: 6,
      stability: 62,
      dimensions: [
        { label: "Estabilidade do Win Rate", value: 64 },
        { label: "Disciplina de Risco", value: 58 },
        { label: "Regularidade de Sinais", value: 72 },
        { label: "Velocidade de Publicação", value: 61 },
        { label: "Transparência de Resultados", value: 55 },
      ],
    },
    strengths: ["Alto volume de sinais por dia", "Foco claro em ouro e prata"],
    warnings: ["22.5% de sinais cancelados", "Drawdown de 17.9% exige gestão de risco conservadora", "Sinais editados após publicação"],
  },
  {
    id: "trader-zone",
    name: "TRADER ZONE",
    handle: "@traderzone",
    initials: "TZ",
    accent: "#159af2",
    score: 5.2,
    status: "Atenção",
    description: "Canal de índices com operações de swing. Resultado próximo do equilíbrio e alta taxa de cancelamento de sinais.",
    tags: ["US100", "US500", "Swing Trade", "Índices"],
    totalSignals: 976,
    validSignals: 668,
    canceledSignals: 308,
    winRate: 49.6,
    profitFactor: 1.07,
    rrAvg: 1.05,
    drawdown: 26.4,
    equity: buildEquity(83, 1180, 6.2),
    monthly: [
      { month: "Jun/26", profit: 12.1, loss: -10.4, winRate: 48 },
      { month: "Jul/26", profit: 9.8, loss: -11.9, winRate: 45 },
      { month: "Ago/26", profit: 14.2, loss: -9.6, winRate: 53 },
      { month: "Set/26", profit: 11.5, loss: -10.1, winRate: 52 },
    ],
    heat: buildHeat(97, [0.1, 0.08, 0.18, 0.42, 0.74, 0.86, 0.5, 0.14], 0.3),
    assets: [
      { symbol: "US100", pct: 46.1 },
      { symbol: "US500", pct: 22.4 },
      { symbol: "US30", pct: 12.7 },
      { symbol: "GER40", pct: 8.3 },
      { symbol: "XAUUSD", pct: 4.9 },
      { symbol: "BTCUSD", pct: 3.1 },
      { symbol: "Outros", pct: 2.5 },
    ],
    signalTypes: typeSlices([33.1, 36.2, 14.8, 5.4, 10.5]),
    quality: qualitySlices([9.4, 26.3, 34.9, 20.8, 8.6]),
    metrics: { execSeconds: 4.9, entryDistance: 6.8, slAvg: 36.4, tpAvg: 38.2 },
    consistency: {
      profitableDays: 51.2,
      positiveWeeks: "8 de 17",
      bestStreak: 5,
      worstStreak: 8,
      stability: 41,
      dimensions: [
        { label: "Estabilidade do Win Rate", value: 44 },
        { label: "Disciplina de Risco", value: 39 },
        { label: "Regularidade de Sinais", value: 52 },
        { label: "Velocidade de Publicação", value: 47 },
        { label: "Transparência de Resultados", value: 36 },
      ],
    },
    strengths: ["Foco em índices com boa liquidez"],
    warnings: ["31.6% de sinais cancelados", "Drawdown de 26.4% muito elevado", "Fator de lucro próximo de 1.0 sem margem de segurança"],
  },
];

export function recommendation(status: ChannelStatus) {
  if (status === "Excelente") return { label: "Recomendado para cópia", tone: "green" as const };
  if (status === "Bom") return { label: "Recomendado com monitoramento", tone: "blue" as const };
  if (status === "Regular") return { label: "Usar com risco reduzido", tone: "amber" as const };
  return { label: "Não recomendado no momento", tone: "red" as const };
}

export function formatInt(value: number) {
  return value.toLocaleString("pt-BR");
}

export function percentOf(part: number, total: number) {
  return ((part / total) * 100).toFixed(1);
}

export function heatColor(value: number) {
  const stops: Array<[number, [number, number, number]]> = [
    [0, [28, 79, 160]],
    [0.25, [22, 152, 168]],
    [0.45, [23, 181, 122]],
    [0.62, [168, 214, 64]],
    [0.78, [244, 197, 66]],
    [0.9, [246, 137, 63]],
    [1, [239, 90, 74]],
  ];
  const v = Math.min(1, Math.max(0, value));
  for (let i = 1; i < stops.length; i += 1) {
    const [end, endColor] = stops[i];
    const [start, startColor] = stops[i - 1];
    if (v <= end) {
      const t = (v - start) / (end - start);
      const rgb = startColor.map((c, k) => Math.round(c + (endColor[k] - c) * t));
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
  }
  return "rgb(239, 90, 74)";
}

export function heatWinRate(value: number) {
  return Math.round(40 + value * 45);
}
