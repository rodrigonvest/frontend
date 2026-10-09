export type Period = "7" | "30" | "90" | "custom";

export const periodOptions: Array<{ id: Period; label: string; summary: string }> = [
  { id: "7", label: "7 dias", summary: "Últimos 7 dias" },
  { id: "30", label: "30 dias", summary: "Últimos 30 dias" },
  { id: "90", label: "90 dias", summary: "Últimos 90 dias" },
  { id: "custom", label: "Personalizado", summary: "Período personalizado" },
];

export const colors = {
  green: "#12d99e",
  blue: "#159af2",
  purple: "#a78bfa",
  gold: "#f0c35c",
  red: "#ff5d6d",
  orange: "#ff9f43",
};

export type SummaryCardData = {
  id: string;
  icon: string;
  label: string;
  value: string;
  caption: string;
  accent: string;
  captionColor?: string;
  valueColor?: string;
};

export const summaryCards: SummaryCardData[] = [
  { id: "score", icon: "brain", label: "Score Geral", value: "8.7/10", caption: "Excelente", accent: colors.purple, captionColor: colors.green },
  { id: "opportunities", icon: "bulb", label: "Oportunidades", value: "12", caption: "Identificadas pela IA", accent: colors.gold },
  { id: "risk", icon: "alert", label: "Risco Detectado", value: "3", caption: "Atenções importantes", accent: colors.red },
  { id: "improvement", icon: "growth", label: "Melhoria Estimada", value: "+35.6%", caption: "No resultado potencial", accent: colors.green, valueColor: colors.green },
  { id: "confidence", icon: "shieldCheck", label: "Confiança da IA", value: "92%", caption: "Alta precisão", accent: colors.blue, captionColor: colors.green },
];

export const intelligenceTabs = [
  { id: "overview", label: "Visão Geral", icon: "dashboard" },
  { id: "insights", label: "Insights da IA", icon: "bulb" },
  { id: "optimizations", label: "Otimizações", icon: "settings" },
  { id: "channels", label: "Análise de Canais", icon: "telegram" },
  { id: "operations", label: "Análise de Operações", icon: "trades" },
  { id: "recommendations", label: "Recomendações", icon: "target" },
  { id: "chat", label: "Chat com IA", icon: "message" },
] as const;

export type IntelligenceTab = (typeof intelligenceTabs)[number]["id"];

export type SummaryMetric = { id: string; icon: string; label: string; value: string; caption: string; accent: string; period?: boolean };

export const summaryMetrics: SummaryMetric[] = [
  { id: "channels", icon: "telegram", label: "Canais Analisados", value: "8", caption: "100% processados", accent: colors.blue },
  { id: "signals", icon: "fileText", label: "Sinais Analisados", value: "1.842", caption: "", accent: colors.purple, period: true },
  { id: "patterns", icon: "trendUp", label: "Padrões Identificados", value: "24", caption: "Tendências e insights", accent: colors.green },
  { id: "optimizations", icon: "settings", label: "Otimizações Sugeridas", value: "18", caption: "Configurações e filtros", accent: colors.purple },
];

export type Insight = {
  id: string;
  icon: string;
  title: string;
  description: string;
  confidence: "Alta Confiança" | "Média Confiança";
  priority: "Alta" | "Média" | "Atenção";
  accent: string;
};

export const insights: Insight[] = [
  {
    id: "time",
    icon: "trendUp",
    title: "Melhor horário para operar",
    description: "Seus melhores resultados ocorrem entre 09:00 e 12:00 (BRT), com alta taxa de acerto.",
    confidence: "Alta Confiança",
    priority: "Alta",
    accent: colors.green,
  },
  {
    id: "asset",
    icon: "candle",
    title: "Ativo mais consistente",
    description: "XAUUSD apresenta o melhor desempenho, com 2.4 de fator de lucro.",
    confidence: "Alta Confiança",
    priority: "Alta",
    accent: colors.purple,
  },
  {
    id: "spread",
    icon: "settings",
    title: "Filtro de spread recomendado",
    description: "Operações com spread ≤ 0.60 pips têm 68.9% de win rate.",
    confidence: "Média Confiança",
    priority: "Média",
    accent: colors.gold,
  },
  {
    id: "pattern",
    icon: "target",
    title: "Padrão recorrente identificado",
    description: "Sinais com TP1:TP2 na proporção 1:2 apresentam melhor consistência.",
    confidence: "Alta Confiança",
    priority: "Alta",
    accent: colors.blue,
  },
  {
    id: "drop",
    icon: "trendDown",
    title: "Canal com queda de desempenho",
    description: "TRADER ZONE teve redução de 42% na taxa de acerto nas últimas 2 semanas.",
    confidence: "Alta Confiança",
    priority: "Atenção",
    accent: colors.red,
  },
];

export type Recommendation = {
  id: string;
  icon: string;
  title: string;
  description: string;
  impact: string;
  accent: string;
};

export const recommendations: Recommendation[] = [
  { id: "hours", icon: "clock", title: "Ajustar horário de execução", description: "Operar apenas entre 08:00 e 14:00 (BRT)", impact: "+8.5%", accent: colors.green },
  { id: "ema", icon: "chart", title: "Ativar filtro de tendência (EMA 50)", description: "Executar apenas a favor da tendência", impact: "+12.3%", accent: colors.purple },
  { id: "smart", icon: "target", title: "Usar Smart Entry com distância máxima de 3 pips", description: "Reduz entradas em regiões de alto risco", impact: "+9.8%", accent: colors.blue },
  { id: "sl", icon: "filter", title: "Filtrar sinais com SL muito curto", description: "Ignorar sinais com SL < 10 pips", impact: "+7.6%", accent: colors.gold },
  { id: "score", icon: "send", title: "Priorizar canais com score > 7.0", description: "Executar apenas sinais de alta qualidade", impact: "+15.1%", accent: colors.blue },
];

export type PerfPoint = { label: string; current: number; optimized: number };

export const PERF_FINAL_CURRENT = 8500;
export const PERF_FINAL_OPTIMIZED = Math.round(PERF_FINAL_CURRENT * 1.356);

function buildPerformance(): PerfPoint[] {
  const days = 30;
  return Array.from({ length: days }, (_, i) => {
    const t = i / (days - 1);
    const taper = Math.sin(Math.PI * t);
    const noise = Math.sin(i * 1.7) * 380 + Math.sin(i * 0.62) * 260;
    const current = -300 + (PERF_FINAL_CURRENT + 300) * Math.pow(t, 1.05) + noise * taper;
    const optimized = -150 + (PERF_FINAL_OPTIMIZED + 150) * Math.pow(t, 0.95) + noise * 0.75 * taper;
    return {
      label: `${String(i + 1).padStart(2, "0")}/09`,
      current: Math.round(current),
      optimized: Math.round(optimized),
    };
  });
}

export const performanceSeries = buildPerformance();

export type PeriodResult = { label: string; profit: number; loss: number; optimized: number };

export const periodResults: PeriodResult[] = [
  { label: "Jun/26", profit: 2400, loss: -1500, optimized: 5400 },
  { label: "Jul/26", profit: 3600, loss: -1900, optimized: 9000 },
  { label: "Ago/26", profit: 5600, loss: -1700, optimized: 10800 },
  { label: "Set/26", profit: 4200, loss: -2100, optimized: 11500 },
];

export type ChannelScore = { name: string; icon: string; score: number; winRate: string; profitFactor: string; consistency: "Alto" | "Médio" | "Baixo"; accent: string };

export const channelScores: ChannelScore[] = [
  { name: "KIM GOLD SECRET", icon: "crown", score: 8.7, winRate: "68.4%", profitFactor: "2.31", consistency: "Alto", accent: colors.gold },
  { name: "FX PREMIUM", icon: "candle", score: 7.9, winRate: "64.1%", profitFactor: "1.98", consistency: "Alto", accent: colors.gold },
  { name: "GOLD SIGNALS", icon: "target", score: 6.4, winRate: "59.2%", profitFactor: "1.45", consistency: "Médio", accent: colors.red },
  { name: "TRADER ZONE", icon: "shield", score: 5.2, winRate: "48.6%", profitFactor: "1.12", consistency: "Baixo", accent: colors.purple },
  { name: "FOREX INSIDER", icon: "chart", score: 7.1, winRate: "61.3%", profitFactor: "1.76", consistency: "Médio", accent: colors.green },
];

export function scoreColor(score: number) {
  if (score >= 7.5) return colors.green;
  if (score >= 6) return colors.gold;
  return colors.red;
}

export const consistencyColor: Record<ChannelScore["consistency"], string> = {
  Alto: colors.green,
  Médio: colors.gold,
  Baixo: colors.red,
};

export type PatternRow = { name: string; occurrences: number; winRate: number; icon: string };

export const patternRows: PatternRow[] = [
  { name: "Breakout + Reteste", occurrences: 342, winRate: 72.1, icon: "trendUp" },
  { name: "Entrada na EMA 50", occurrences: 281, winRate: 68.4, icon: "chart" },
  { name: "Suporte/Resistência", occurrences: 198, winRate: 65.2, icon: "layers" },
  { name: "Horário NY (09–12 BRT)", occurrences: 412, winRate: 74.2, icon: "clock" },
  { name: "TP1:TP2 = 1:2", occurrences: 365, winRate: 69.8, icon: "target" },
];

export const quickQuestions = [
  "Qual o melhor horário para operar?",
  "Qual canal tem melhor desempenho?",
  "Como posso melhorar meu win rate?",
  "Analise meus últimos 100 sinais",
  "Quais filtros você recomenda?",
  "Existe algum risco no meu sistema?",
];

export const chatGreeting =
  "Olá Rodrigo! 👋\n\nEu sou o Copytrix AI, sua inteligência de trading. Posso analisar seus canais, sinais, operações e configurações para te ajudar a obter melhores resultados.\n\nO que você gostaria de saber?";

const answers: Array<{ match: RegExp; text: string }> = [
  {
    match: /hor[aá]rio/i,
    text: "Seus melhores resultados ocorrem entre 09:00 e 12:00 (BRT), com 74.2% de win rate no horário de Nova York. Restringir a execução a 08:00–14:00 tem impacto estimado de +8.5%.",
  },
  {
    match: /canal|desempenho/i,
    text: "KIM GOLD SECRET lidera com score 8.7, win rate de 68.4% e fator de lucro 2.31. Em seguida vêm FX PREMIUM (7.9) e FOREX INSIDER (7.1). TRADER ZONE (5.2) merece atenção.",
  },
  {
    match: /win rate|melhorar/i,
    text: "Três ajustes tendem a elevar seu win rate: ativar o filtro de tendência EMA 50 (+12.3%), priorizar canais com score acima de 7.0 (+15.1%) e ignorar sinais com SL menor que 10 pips (+7.6%).",
  },
  {
    match: /100 sinais|analise/i,
    text: "Nos últimos 100 sinais, 71 foram aprovados pelos filtros e 29 descartados. O padrão Breakout + Reteste concentrou os melhores resultados, e a maior parte das perdas veio de TRADER ZONE.",
  },
  {
    match: /filtro/i,
    text: "Recomendo: spread máximo de 0.60 pips, filtro de tendência EMA 50, Smart Entry com distância máxima de 3 pips e SL mínimo de 10 pips. Juntos, o potencial estimado é de +35.6%.",
  },
  {
    match: /risco/i,
    text: "Identifiquei 3 pontos de atenção: queda de 42% no win rate de TRADER ZONE, execução fora do melhor horário e sinais com SL muito curto. Posso sugerir ajustes para cada um.",
  },
];

export function answerFor(question: string) {
  const found = answers.find((item) => item.match.test(question));
  return (
    found?.text ??
    "Analisei seus dados mockados e não encontrei uma resposta específica para isso. Tente perguntar sobre horários, canais, filtros, win rate ou riscos do seu sistema."
  );
}
