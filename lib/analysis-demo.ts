import type { TextTone } from "./performance-demo";

const pseudoRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

export const analysisDates = ["21 Jun", "05 Jul", "19 Jul", "02 Ago", "16 Ago", "30 Ago", "04 Set"];

export const equitySummary: Array<{ label: string; value: string; tone: TextTone }> = [
  { label: "Saldo Inicial", value: "$ 1,000.00", tone: "default" },
  { label: "Saldo Final", value: "$ 5,187.50", tone: "success" },
  { label: "Lucro Total", value: "$ 4,187.50", tone: "success" },
  { label: "Retorno", value: "+418.8%", tone: "success" },
];

export const equityAxisMax = 6000;
export const equityAxisTicks = ["$6,000", "$5,000", "$4,000", "$3,000", "$2,000", "$1,000", "$0"];

export const equityEvolution: number[] = (() => {
  const next = pseudoRandom(20260904);
  const count = 78;
  return Array.from({ length: count }, (_, i) => {
    if (i === 0) return 1000;
    if (i === count - 1) return 5187.5;
    const t = i / (count - 1);
    const envelope = Math.sin(Math.PI * t);
    const trend = 1000 + 4187.5 * t;
    const wave = Math.sin(t * 17) * 140 * envelope;
    const noise = (next() - 0.5) * 380 * envelope;
    return Math.round(trend + wave + noise);
  });
})();

export const rResultBuckets = [
  { label: "≤ -1R", value: 16, negative: true },
  { label: "-1R a 0R", value: 63, negative: true },
  { label: "0R a 0.5R", value: 28, negative: false },
  { label: "0.5R a 1R", value: 31, negative: false },
  { label: "1R a 2R", value: 22, negative: false },
  { label: "> 2R", value: 7, negative: false },
];

export const rResultAxisMax = 65;
export const rResultTicks = [50, 40, 30, 20, 10, 0];

export const drawdownAxisMin = -20;
export const drawdownTicks = ["0%", "-5%", "-10%", "-15%", "-20%"];

export const drawdownSeries: number[] = (() => {
  const next = pseudoRandom(7771);
  let equity = 1000;
  let peak = 1000;
  const raw = [0];
  for (let i = 1; i < 78; i += 1) {
    equity += (next() - 0.42) * 180;
    peak = Math.max(peak, equity);
    raw.push(((equity - peak) / peak) * 100);
  }
  const deepest = Math.min(...raw);
  const scale = deepest < -0.5 ? -12.1 / deepest : 1;
  return raw.map((v) => v * scale);
})();

export const drawdownStats: Array<{ label: string; value: string; note: string; noteTone: TextTone }> = [
  { label: "Drawdown Máximo", value: "12.1%", note: "-$612.30", noteTone: "danger" },
  { label: "Drawdown Médio", value: "4.3%", note: "-$215.40", noteTone: "danger" },
  { label: "Tempo de Recuperação", value: "5.79", note: "dias", noteTone: "muted" },
  { label: "Maior Perda Consecutiva", value: "5", note: "operações", noteTone: "muted" },
];

const hourlyProfitR = [0.5, 1, 0, 0, 1, 2, 3, 4, 5, 4, 3, 4, 6, 8, 12, 10, 7, 5, 4, 8, 16, 18, 9, 2];
const hourlyLossR = [-1, -1, -1, 0, 0, -1, -2, -3, -4, -3, -2, -3, -4, -5, -7, -6, -4, -3, -2, -4, -6, -5, -3, -1];

export const hourlyResultDomain = { min: -10, max: 30 };
export const hourlyResultTicks = [30, 20, 10, 0, -10];

export const hourlyResults = hourlyProfitR.map((profit, hour) => ({
  hour: String(hour).padStart(2, "0"),
  profit,
  loss: hourlyLossR[hour],
}));

export const advancedStats: Array<{ label: string; value: string; tone: TextTone }> = [
  { label: "Expectativa por Trade", value: "0.420R", tone: "success" },
  { label: "Maior Ganho", value: "3.00R", tone: "success" },
  { label: "Maior Perda", value: "-1.00R", tone: "danger" },
  { label: "Sequência de Vitórias", value: "8", tone: "default" },
  { label: "Sequência de Derrotas", value: "5", tone: "default" },
  { label: "Fator de Recuperação", value: "5.79", tone: "default" },
  { label: "Sharpe Ratio", value: "1.42", tone: "default" },
  { label: "Sortino Ratio", value: "2.01", tone: "default" },
  { label: "Calmar Ratio", value: "2.89", tone: "default" },
];

export const scatterDomain = { xMax: 167, yMin: -4, yMax: 4 };
export const scatterXTicks = [0, 20, 40, 60, 80, 100, 120, 140, 160];
export const scatterYTicks = [4, 2, 0, -2, -4];

export const tradeResults: number[] = (() => {
  const next = pseudoRandom(167167);
  const wins = Array.from({ length: 88 }, (_, i) => (i === 0 ? 3 : Math.round((0.3 + Math.pow(next(), 1.7) * 2.6) * 100) / 100));
  const losses = Array.from({ length: 79 }, () => (next() > 0.3 ? -1 : -Math.round((0.3 + next() * 0.6) * 100) / 100));
  const all = [...wins, ...losses];
  for (let i = all.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
})();

export const analysisTabs = [
  { label: "Visão Geral", icon: "dashboard" },
  { label: "Análise de Risco", icon: "shield" },
  { label: "Análise de Operações", icon: "clipboard" },
  { label: "Análise por Canal", icon: "send" },
  { label: "Análise por Conta", icon: "accounts" },
  { label: "Horários", icon: "clock" },
  { label: "Correlação", icon: "signal" },
  { label: "Relatório", icon: "fileText" },
];
