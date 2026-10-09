export type BadgeTone = "gold" | "teal" | "orange" | "slate" | "purple" | "green" | "red" | "blue";
export type RiskLevel = "Baixo" | "Médio" | "Alto";
export type SortId = "popular" | "winrate" | "profit" | "drawdown" | "recent";
export type ChartVariant = "line" | "candles";

export type Strategy = {
  id: string;
  name: string;
  badge?: { label: string; tone: BadgeTone };
  tags: string[];
  categories: string[];
  assets: string[];
  winRate: number;
  profitFactor: number;
  drawdown: number;
  author: string;
  verified: boolean;
  rating: number;
  reviews: number;
  users: number;
  price: number;
  platforms: string[];
  publishedDaysAgo: number;
  popularity: number;
  description: string;
  keywords: string[];
  risk: RiskLevel;
  stats: { returnPct: number; trades: number; avgDuration: string; months: number };
  config: { timeframe: string; riskPerTrade: string; stopLoss: string; takeProfit: string; sessions: string; maxTrades: string };
  chart: ChartVariant;
  series: number[];
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

export function makeSeries(seed: number, points: number, drift: number, volatility: number) {
  const random = mulberry32(seed);
  const values: number[] = [100];
  for (let i = 1; i < points; i += 1) {
    const step = drift + (random() - 0.5) * volatility;
    values.push(Math.max(60, values[i - 1] * (1 + step / 100)));
  }
  return values.map((value) => Number(value.toFixed(2)));
}

export const categories = [
  { id: "Todos", label: "Todos", count: 124, icon: "layers" },
  { id: "Scalping", label: "Scalping", count: 32, icon: "signal" },
  { id: "Day Trade", label: "Day Trade", count: 28, icon: "chart" },
  { id: "Swing Trade", label: "Swing Trade", count: 18, icon: "trendUp" },
  { id: "Prop Firm", label: "Prop Firm", count: 12, icon: "shieldCheck" },
  { id: "Criptomoedas", label: "Criptomoedas", count: 10, icon: "dollar" },
  { id: "Índices", label: "Índices", count: 8, icon: "analytics" },
  { id: "Conservador", label: "Conservador", count: 11, icon: "shield" },
  { id: "Agressivo", label: "Agressivo", count: 15, icon: "growth" },
] as const;

export const quickAssets = ["Todos", "XAUUSD", "EURUSD", "US100", "US500", "BTCUSDT"] as const;
export const moreAssets = ["ETHUSDT", "GBPUSD", "USDJPY"] as const;
export const strategyTypes = ["Scalping", "Day Trade", "Swing Trade", "Prop Firm", "Criptomoedas", "Conservador", "Agressivo"] as const;

export const periodFilters = [
  { id: "all", label: "Todos os Períodos", maxDays: Infinity },
  { id: "30", label: "Últimos 30 dias", maxDays: 30 },
  { id: "90", label: "Últimos 90 dias", maxDays: 90 },
  { id: "180", label: "Últimos 6 meses", maxDays: 180 },
] as const;

export const platformFilters = ["Todas as Plataformas", "MetaTrader 5", "MetaTrader 4", "Binance Futures"] as const;

export const priceFilters = [
  { id: "all", label: "Estratégias Gratuitas e Pagas" },
  { id: "free", label: "Apenas gratuitas" },
  { id: "paid", label: "Apenas pagas" },
] as const;

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "popular", label: "Mais Populares" },
  { id: "winrate", label: "Melhor Win Rate" },
  { id: "profit", label: "Melhor Fator de Lucro" },
  { id: "drawdown", label: "Menor Drawdown" },
  { id: "recent", label: "Mais Recentes" },
];

export const defaultFilters = {
  asset: "Todos",
  types: [] as string[],
  minWinRate: 50,
  minProfitFactor: 1.5,
  maxDrawdown: 20,
  period: "all",
  platform: "Todas as Plataformas",
  price: "all",
  verifiedOnly: true,
};

export type Filters = typeof defaultFilters;

export const publishTypes = ["Scalping", "Day Trade", "Swing Trade", "Prop Firm", "Criptomoedas", "Conservador", "Agressivo"];

export const strategies: Strategy[] = [
  {
    id: "scalping-xauusd-pro",
    name: "Scalping XAUUSD Pro",
    badge: { label: "Mais Popular", tone: "gold" },
    tags: ["Scalping", "XAUUSD", "Prop Firm"],
    categories: ["Scalping", "Prop Firm"],
    assets: ["XAUUSD"],
    winRate: 82.7,
    profitFactor: 2.4,
    drawdown: 8.6,
    author: "KIM Trader",
    verified: true,
    rating: 4.9,
    reviews: 124,
    users: 1200,
    price: 97,
    platforms: ["MetaTrader 5", "MetaTrader 4"],
    publishedDaysAgo: 12,
    popularity: 100,
    description:
      "Scalping de alta frequência no ouro, focado nas aberturas de Londres e Nova York. Entradas por rompimento de microestrutura com stop curto e saída parcial automática, desenhado para respeitar as regras de contas Prop Firm.",
    keywords: ["ouro", "gold", "londres", "nova york", "microestrutura"],
    risk: "Médio",
    stats: { returnPct: 285, trades: 1842, avgDuration: "6 min", months: 14 },
    config: { timeframe: "M1 / M5", riskPerTrade: "0,5% por operação", stopLoss: "45 pontos", takeProfit: "RR 1:1,6 + parcial", sessions: "Londres e Nova York", maxTrades: "3 simultâneas" },
    chart: "candles",
    series: makeSeries(41, 48, 0.55, 2.4),
  },
  {
    id: "prop-firm-seguro",
    name: "Prop Firm Seguro",
    badge: { label: "Alta Performance", tone: "teal" },
    tags: ["Prop Firm", "Conservador", "Multi-Ativos"],
    categories: ["Prop Firm", "Conservador"],
    assets: ["EURUSD", "XAUUSD", "US100"],
    winRate: 76.3,
    profitFactor: 1.8,
    drawdown: 6.2,
    author: "FX Premium",
    verified: true,
    rating: 4.8,
    reviews: 98,
    users: 856,
    price: 129,
    platforms: ["MetaTrader 5"],
    publishedDaysAgo: 25,
    popularity: 95,
    description:
      "Estratégia multi-ativos pensada para passar e manter desafios de Prop Firm. Limita o risco diário e o drawdown total, distribuindo o risco entre três ativos descorrelacionados.",
    keywords: ["desafio", "ftmo", "risco diário", "descorrelacionado"],
    risk: "Baixo",
    stats: { returnPct: 172, trades: 964, avgDuration: "2 h 10 min", months: 11 },
    config: { timeframe: "M15", riskPerTrade: "0,3% por operação", stopLoss: "ATR x 1,5", takeProfit: "RR 1:2", sessions: "Londres", maxTrades: "2 simultâneas" },
    chart: "line",
    series: makeSeries(7, 48, 0.42, 1.2),
  },
  {
    id: "day-trade-indices",
    name: "Day Trade Índices",
    badge: { label: "Melhor Risk/Reward", tone: "orange" },
    tags: ["Day Trade", "US100", "US500"],
    categories: ["Day Trade", "Índices"],
    assets: ["US100", "US500"],
    winRate: 71.9,
    profitFactor: 2.6,
    drawdown: 9.1,
    author: "Trader Zone",
    verified: true,
    rating: 4.7,
    reviews: 76,
    users: 642,
    price: 89,
    platforms: ["MetaTrader 5"],
    publishedDaysAgo: 48,
    popularity: 90,
    description:
      "Day trade nos índices americanos com entradas na abertura do pregão e fechamento obrigatório no fim do dia. Foco em relação risco/retorno elevada com gestão de posição por volatilidade.",
    keywords: ["nasdaq", "s&p", "abertura", "pregão"],
    risk: "Médio",
    stats: { returnPct: 210, trades: 712, avgDuration: "1 h 25 min", months: 9 },
    config: { timeframe: "M5 / M15", riskPerTrade: "0,6% por operação", stopLoss: "Estrutura + buffer", takeProfit: "RR 1:2,6", sessions: "Abertura de Nova York", maxTrades: "2 simultâneas" },
    chart: "candles",
    series: makeSeries(23, 48, 0.5, 2.2),
  },
  {
    id: "crypto-trend",
    name: "Crypto Trend",
    badge: { label: "Gratuita", tone: "slate" },
    tags: ["Criptomoedas", "BTCUSDT", "ETHUSDT"],
    categories: ["Criptomoedas"],
    assets: ["BTCUSDT", "ETHUSDT"],
    winRate: 68.4,
    profitFactor: 2.1,
    drawdown: 11.3,
    author: "CryptoMaster",
    verified: true,
    rating: 4.6,
    reviews: 52,
    users: 1100,
    price: 0,
    platforms: ["Binance Futures"],
    publishedDaysAgo: 70,
    popularity: 85,
    description:
      "Seguidor de tendência para futuros de BTC e ETH. Combina médias adaptativas e filtro de volatilidade para capturar movimentos longos, com saída por trailing stop.",
    keywords: ["bitcoin", "ethereum", "futuros", "tendência", "trailing"],
    risk: "Médio",
    stats: { returnPct: 156, trades: 538, avgDuration: "9 h", months: 16 },
    config: { timeframe: "H1 / H4", riskPerTrade: "1% por operação", stopLoss: "Trailing ATR x 2", takeProfit: "Saída por tendência", sessions: "24 h", maxTrades: "2 simultâneas" },
    chart: "candles",
    series: makeSeries(61, 48, 0.46, 3.2),
  },
  {
    id: "swing-trade-forex",
    name: "Swing Trade Forex",
    badge: { label: "Estável", tone: "purple" },
    tags: ["Swing Trade", "EURUSD", "GBPUSD"],
    categories: ["Swing Trade"],
    assets: ["EURUSD", "GBPUSD"],
    winRate: 65.2,
    profitFactor: 1.9,
    drawdown: 7.8,
    author: "Forex Insider",
    verified: true,
    rating: 4.6,
    reviews: 41,
    users: 532,
    price: 69,
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    publishedDaysAgo: 120,
    popularity: 80,
    description:
      "Swing trade em pares de forex maiores, operando retrações em tendências diárias. Posições mantidas por dias com stop estrutural e baixa frequência de operações.",
    keywords: ["retração", "diário", "tendência", "euro", "libra"],
    risk: "Baixo",
    stats: { returnPct: 98, trades: 286, avgDuration: "3 dias", months: 18 },
    config: { timeframe: "H4 / D1", riskPerTrade: "0,8% por operação", stopLoss: "Estrutura semanal", takeProfit: "RR 1:2", sessions: "Todas", maxTrades: "2 simultâneas" },
    chart: "line",
    series: makeSeries(89, 48, 0.34, 1.4),
  },
  {
    id: "conservador-fx",
    name: "Conservador FX",
    badge: { label: "Baixo Risco", tone: "green" },
    tags: ["Conservador", "EURUSD", "USDJPY"],
    categories: ["Conservador"],
    assets: ["EURUSD", "USDJPY"],
    winRate: 72.1,
    profitFactor: 1.7,
    drawdown: 5.6,
    author: "Safe Trading",
    verified: true,
    rating: 4.8,
    reviews: 67,
    users: 489,
    price: 59,
    platforms: ["MetaTrader 4", "MetaTrader 5"],
    publishedDaysAgo: 95,
    popularity: 75,
    description:
      "Abordagem de baixo risco com lotes reduzidos e saídas rápidas. Prioriza a preservação de capital e uma curva de patrimônio suave, ideal para quem está começando no copy trading.",
    keywords: ["iniciante", "capital", "suave", "baixo risco"],
    risk: "Baixo",
    stats: { returnPct: 74, trades: 1204, avgDuration: "55 min", months: 20 },
    config: { timeframe: "M15", riskPerTrade: "0,25% por operação", stopLoss: "30 pontos", takeProfit: "RR 1:1,5", sessions: "Londres e Tóquio", maxTrades: "1 simultânea" },
    chart: "line",
    series: makeSeries(103, 48, 0.3, 0.9),
  },
  {
    id: "agressivo-gold",
    name: "Agressivo Gold",
    badge: { label: "Alto Retorno", tone: "red" },
    tags: ["Agressivo", "XAUUSD", "US100"],
    categories: ["Agressivo"],
    assets: ["XAUUSD", "US100"],
    winRate: 58.6,
    profitFactor: 3.4,
    drawdown: 14.2,
    author: "Gold Signals",
    verified: true,
    rating: 4.5,
    reviews: 38,
    users: 321,
    price: 149,
    platforms: ["MetaTrader 5"],
    publishedDaysAgo: 160,
    popularity: 70,
    description:
      "Estratégia agressiva que busca grandes movimentos no ouro e no Nasdaq. Win rate menor, compensado por alvos longos e fator de lucro elevado. Recomendada apenas para perfis com tolerância a drawdown.",
    keywords: ["alvo longo", "alto risco", "ouro", "nasdaq"],
    risk: "Alto",
    stats: { returnPct: 342, trades: 426, avgDuration: "5 h", months: 10 },
    config: { timeframe: "M30 / H1", riskPerTrade: "1,5% por operação", stopLoss: "ATR x 1,2", takeProfit: "RR 1:3,5", sessions: "Londres e Nova York", maxTrades: "4 simultâneas" },
    chart: "candles",
    series: makeSeries(131, 48, 0.62, 4),
  },
  {
    id: "multi-ativos-ia",
    name: "Multi-Ativos IA",
    badge: { label: "Com IA", tone: "blue" },
    tags: ["Multi-Ativos", "XAUUSD", "US500"],
    categories: ["Day Trade", "Índices"],
    assets: ["XAUUSD", "US500", "EURUSD"],
    winRate: 69.8,
    profitFactor: 2.3,
    drawdown: 9.4,
    author: "Copytrix AI",
    verified: true,
    rating: 4.9,
    reviews: 112,
    users: 978,
    price: 119,
    platforms: ["MetaTrader 5", "MetaTrader 4"],
    publishedDaysAgo: 8,
    popularity: 65,
    description:
      "Estratégia otimizada continuamente pelo Copytrix Intelligence. Ajusta filtros de horário e tamanho de posição conforme o regime de mercado detectado, operando ouro, S&P 500 e EURUSD.",
    keywords: ["inteligência artificial", "ia", "adaptativa", "regime de mercado"],
    risk: "Médio",
    stats: { returnPct: 198, trades: 1056, avgDuration: "1 h 40 min", months: 7 },
    config: { timeframe: "M5 / M15", riskPerTrade: "Dinâmico (0,3% a 0,8%)", stopLoss: "Adaptativo", takeProfit: "Adaptativo (RR 1:1,5 a 1:3)", sessions: "Filtro por IA", maxTrades: "3 simultâneas" },
    chart: "line",
    series: makeSeries(157, 48, 0.5, 1.8),
  },
  {
    id: "scalping-eurusd-rapido",
    name: "Scalping EURUSD Rápido",
    tags: ["Scalping", "EURUSD"],
    categories: ["Scalping"],
    assets: ["EURUSD"],
    winRate: 63.2,
    profitFactor: 1.6,
    drawdown: 12.4,
    author: "NovoTrader",
    verified: false,
    rating: 4.1,
    reviews: 12,
    users: 87,
    price: 39,
    platforms: ["MetaTrader 4"],
    publishedDaysAgo: 5,
    popularity: 40,
    description: "Scalping rápido em EURUSD durante a sobreposição de Londres e Nova York. Estratégia nova da comunidade, ainda sem verificação de desempenho.",
    keywords: ["euro", "sobreposição", "novo"],
    risk: "Médio",
    stats: { returnPct: 41, trades: 318, avgDuration: "4 min", months: 3 },
    config: { timeframe: "M1", riskPerTrade: "0,5% por operação", stopLoss: "20 pontos", takeProfit: "RR 1:1,3", sessions: "Londres e Nova York", maxTrades: "2 simultâneas" },
    chart: "candles",
    series: makeSeries(211, 48, 0.28, 2.6),
  },
  {
    id: "grid-eth-beta",
    name: "Grid ETH Beta",
    tags: ["Criptomoedas", "ETHUSDT", "Agressivo"],
    categories: ["Criptomoedas", "Agressivo"],
    assets: ["ETHUSDT"],
    winRate: 61,
    profitFactor: 1.55,
    drawdown: 17.8,
    author: "GridLab",
    verified: false,
    rating: 4,
    reviews: 9,
    users: 64,
    price: 0,
    platforms: ["Binance Futures"],
    publishedDaysAgo: 3,
    popularity: 35,
    description: "Grade de ordens em ETHUSDT para mercados laterais. Estratégia em fase beta, publicada recentemente e ainda sem verificação.",
    keywords: ["grid", "lateral", "beta", "ethereum"],
    risk: "Alto",
    stats: { returnPct: 36, trades: 207, avgDuration: "14 h", months: 2 },
    config: { timeframe: "M15", riskPerTrade: "1% por grade", stopLoss: "Limite de grade", takeProfit: "Por nível", sessions: "24 h", maxTrades: "8 ordens" },
    chart: "line",
    series: makeSeries(251, 48, 0.3, 3),
  },
];

export const bannerHighlights = [
  { id: "xauusd", title: "XAUUSD", subtitle: "Scalping Pro", ret: "+285%", image: "/marketplace/gold.png", alt: "Barras de ouro", target: "scalping-xauusd-pro" },
  { id: "forex", title: "Forex Pairs", subtitle: "Day Trade", ret: "+172%", image: "/marketplace/forex.png", alt: "Bandeiras da União Europeia e do Reino Unido", target: "prop-firm-seguro" },
  { id: "crypto", title: "Crypto Trend", subtitle: "Futures", ret: "+210%", image: "/marketplace/crypto.png", alt: "Moedas Bitcoin e Ethereum", target: "crypto-trend" },
  { id: "us", title: "US Índices", subtitle: "Swing Trade", ret: "+156%", image: "/marketplace/us.png", alt: "Bandeira dos Estados Unidos", target: "day-trade-indices" },
] as const;

export function formatUsers(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(".", ",")}k` : String(value);
}

export function formatPercent(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function formatPrice(price: number) {
  return price === 0 ? "Gratuita" : `R$ ${price}/mês`;
}

export function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
