export type AiTabId = "chat" | "signals" | "market" | "optimization" | "risk" | "reports" | "recommendations";

export const AI_TABS: Array<{ id: AiTabId; label: string; icon: string }> = [
  { id: "chat", label: "Chat com IA", icon: "message" },
  { id: "signals", label: "Análise de Sinais", icon: "signal" },
  { id: "market", label: "Insights de Mercado", icon: "trendUp" },
  { id: "optimization", label: "Otimização", icon: "settings" },
  { id: "risk", label: "Gestão de Risco", icon: "shield" },
  { id: "reports", label: "Relatórios Inteligentes", icon: "fileText" },
  { id: "recommendations", label: "Recomendações", icon: "bulb" },
];

export const CHAT_GREETING =
  "Olá Rodrigo! 👋\nSou o Copytrix AI, seu assistente inteligente de trading. Posso analisar sinais, canais, operações e te ajudar a tomar decisões mais assertivas.\n\nO que você gostaria de fazer?";

export const CHAT_GREETING_TIME = "10:24";

export type QuickAction = { id: string; label: string; icon: string };

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "signal", label: "Analisar um sinal", icon: "search" },
  { id: "performance", label: "Revisar meu desempenho", icon: "shieldCheck" },
  { id: "hours", label: "Qual o melhor horário para operar?", icon: "clock" },
  { id: "winrate", label: "Como melhorar meu win rate?", icon: "target" },
  { id: "channel", label: "Analisar um canal do Telegram", icon: "send" },
  { id: "report", label: "Gerar relatório do período", icon: "fileText" },
  { id: "risk", label: "Sugerir configurações de risco", icon: "shield" },
];

const REPLIES: Record<string, string> = {
  signal:
    "Analisei o último sinal recebido: XAUUSD BUY com entrada em 3,627.50.\n\nScore da IA: 87% (alta probabilidade). A tendência de alta está confirmada, a entrada fica em região de suporte e a relação risco/retorno é de 1:3.7.\n\nVocê pode executar o sinal pelo painel \"Análise de Sinal com IA\" (ação demonstrativa).",
  performance:
    "Resumo dos últimos 30 dias:\n• Win rate: 67.6%\n• R médio: 1.9R\n• Resultado total: +137.6R\n\nSeus melhores resultados vêm de compras no XAUUSD entre 08:00 e 14:00. As perdas se concentram em vendas contra a tendência principal.",
  hours:
    "A melhor janela para operar é 08:00 - 14:00 (BRT). Nesse período seu win rate chega a 74%, contra 58% fora dele.\n\nEvite abrir posições perto de divulgações como NFP e CPI, quando a volatilidade costuma disparar.",
  winrate:
    "Três ajustes que mais aumentam o seu win rate:\n1. Confirmar sinais com filtro de tendência (EMA 50)\n2. Operar apenas entre 08:00 e 14:00 (BRT)\n3. Exigir ao menos 3 confirmações antes de entrar\n\nCom essas mudanças, a projeção é de 72.1%.",
  channel:
    "Análise do canal KIM GOLD SECRET (últimos 30 dias):\n• 73 sinais, 68 executados\n• Win rate de 67.6% e R médio de 1.9R\n• Maior consistência em sinais de compra no XAUUSD\n\nRecomendação: manter o canal ativo e aplicar o filtro de spread de 0.60.",
  report:
    "Relatório do período gerado (demonstrativo):\n• Sinais analisados: 73\n• Lucro estimado: +28.5% nos próximos 30 dias\n• Drawdown máximo esperado: -6.8%\n\nVocê também encontra os relatórios na aba \"Relatórios Inteligentes\".",
  risk:
    "Sugestão de risco para o seu perfil:\n• Risco por operação: 0.8% (atual 1.0%)\n• Stop loss: 20 pips\n• Take profit: 1:3\n• Horário de operação: 08:00 - 14:00\n\nVocê pode aplicar essa configuração em \"Otimização de Estratégia\" (ação demonstrativa).",
};

const FALLBACK =
  "Entendi! Nesta versão demonstrativa eu consigo ajudar com análise de sinais, desempenho, melhores horários, win rate, canais do Telegram, relatórios e configurações de risco. Escolha uma das ações rápidas ou me conte mais sobre o que você precisa.";

export function aiReply(input: string): string {
  const text = input.toLowerCase();
  if (/(risco|stop|lote)/.test(text)) return REPLIES.risk;
  if (/(win rate|winrate|acerto|assertiv)/.test(text)) return REPLIES.winrate;
  if (/(hor[aá]rio|quando operar|sess[aã]o)/.test(text)) return REPLIES.hours;
  if (/(canal|telegram)/.test(text)) return REPLIES.channel;
  if (/(relat[oó]rio|resumo)/.test(text)) return REPLIES.report;
  if (/(desempenho|resultado|lucro|performance)/.test(text)) return REPLIES.performance;
  if (/(sinal|xauusd|ouro|entrada)/.test(text)) return REPLIES.signal;
  return FALLBACK;
}

export function replyForAction(id: string): string {
  return REPLIES[id] ?? FALLBACK;
}

export const SIGNAL = {
  asset: "XAUUSD",
  direction: "BUY",
  entry: 3627.5,
  sl: 3607.5,
  slPips: 20,
  tp1: 3632.5,
  tp2: 3637.5,
  tp3: 3642.5,
};

export const SIGNAL_SCORE = 87;

export const SIGNAL_CHECKS = [
  "Tendência de alta confirmada",
  "Entrada em região de suporte",
  "Boa relação risco/retorno (1:3.7)",
  "Alinhado com o fluxo institucional",
  "Spread atual dentro do permitido",
];

export type MiniCandle = { o: number; h: number; l: number; c: number };

export function buildSignalCandles(count = 34): MiniCandle[] {
  let seed = 4321;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const round = (value: number) => Math.round(value * 100) / 100;
  const candles: MiniCandle[] = [];
  let previous = 3606;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const target = 3606 + 32 * t + Math.sin(t * 9) * 3.2;
    const open = previous;
    const close = target + (rand() - 0.5) * 5;
    const high = Math.max(open, close) + rand() * 3.2;
    const low = Math.min(open, close) - rand() * 3.2;
    candles.push({ o: round(open), h: round(high), l: round(low), c: round(close) });
    previous = close;
  }
  return candles;
}

export const MARKET_INSIGHT = {
  asset: "XAUUSD",
  title: "XAUUSD - Visão da IA",
  badge: "Alta",
  text: "O ouro mantém tendência de alta no curto prazo, com forte fluxo comprador após dados econômicos dos EUA. A IA identifica região de suporte em 3,625.00 e próxima resistência em 3,645.00.",
  indicators: [
    { label: "Tendência", value: "Alta 78%", percent: 78, tone: "green" as const },
    { label: "Força do Movimento", value: "76%", percent: 76, tone: "blue" as const },
    { label: "Volatilidade", value: "Média 62%", percent: 62, tone: "amber" as const },
    { label: "Sentimento do Mercado", value: "Comprador 71%", percent: 71, tone: "purple" as const },
  ],
  recommendation:
    "A IA recomenda priorizar operações de compra enquanto o preço se mantiver acima de 3,625.00, com alvos em 3,637.50 e 3,642.50.",
};

export const OTHER_ASSETS = [
  { asset: "EURUSD", bias: "Neutro", tone: "amber" as const, percent: 52, note: "Consolidação entre 1.0820 e 1.0885" },
  { asset: "US100", bias: "Alta", tone: "green" as const, percent: 69, note: "Rompimento da máxima semanal em curso" },
  { asset: "BTCUSDT", bias: "Baixa", tone: "red" as const, percent: 61, note: "Perda de suporte em 64,200" },
];

export type StrategyRow = { label: string; current: string; suggested: string };

export const STRATEGY_ROWS: StrategyRow[] = [
  { label: "Risco por operação", current: "1.0%", suggested: "0.8%" },
  { label: "Stop Loss", current: "20 pips", suggested: "20 pips" },
  { label: "Take Profit", current: "1:2", suggested: "1:3" },
  { label: "Filtro de Spread", current: "0.60", suggested: "0.60" },
  { label: "Horário de operação", current: "24h", suggested: "08:00 - 14:00" },
];

export const PROJECTED_IMPACT = [
  { label: "Win rate", from: "67.6%", to: "72.1%", gain: true },
  { label: "Fator de lucro", from: "1.9", to: "2.4", gain: true },
  { label: "Drawdown máximo", from: "-9.4%", to: "-6.8%", gain: true },
];

export const RISK = {
  value: 3.2,
  max: 10,
  label: "Baixo Risco",
  caption: "Risco Atual da Conta",
  checks: [
    "Dentro do limite diário",
    "Exposição controlada",
    "Boa relação risco/retorno",
    "Drawdown em nível seguro",
    "Múltiplas confirmações",
  ],
};

export const EXPOSURE = [
  { asset: "XAUUSD", percent: 1.4, limit: 3 },
  { asset: "EURUSD", percent: 0.9, limit: 3 },
  { asset: "US100", percent: 0.9, limit: 3 },
];

export const ACCOUNT_METRICS = [
  { label: "Lucro Estimado (IA)", value: "+28.5%", note: "Próximos 30 dias", icon: "growth", accent: "green" as const },
  { label: "Win Rate Projetado", value: "72.1%", note: "Com otimizações", icon: "trophy", accent: "amber" as const },
  { label: "Fator de Lucro", value: "2.4", note: "Cenário provável", icon: "target", accent: "blue" as const },
  { label: "Drawdown Estimado", value: "-6.8%", note: "Máximo esperado", icon: "trendDown", accent: "red" as const },
];

export const RECOMMENDATIONS = [
  "Priorize operações no horário de 08:00 - 14:00 (BRT)",
  "Use filtro de tendência (EMA 50) para confirmar sinais",
  "Considere reduzir o risco para 0.8% por operação",
  "Evite operar em momentos de alta volatilidade (NFP, CPI)",
  "Mantenha pelo menos 3 confirmações antes de entrar",
];

export const RECENT_SIGNALS = [
  { id: 1, asset: "XAUUSD", direction: "Buy", channel: "KIM GOLD SECRET", time: "10:24", score: 87, verdict: "Alta probabilidade" },
  { id: 2, asset: "XAUUSD", direction: "Sell", channel: "KIM GOLD SECRET", time: "09:41", score: 54, verdict: "Probabilidade moderada" },
  { id: 3, asset: "US100", direction: "Buy", channel: "Nasdaq Pro Signals", time: "08:58", score: 79, verdict: "Alta probabilidade" },
  { id: 4, asset: "EURUSD", direction: "Sell", channel: "Forex Elite", time: "08:12", score: 38, verdict: "Baixa probabilidade" },
];

export const INITIAL_REPORTS = [
  { id: 1, title: "Resumo semanal de desempenho", description: "Win rate, R médio e evolução por ativo.", date: "Gerado em 08/10/2026" },
  { id: 2, title: "Análise de canais do Telegram", description: "Ranking de consistência dos canais conectados.", date: "Gerado em 05/10/2026" },
  { id: 3, title: "Revisão mensal de risco", description: "Exposição, drawdown e aderência aos limites.", date: "Gerado em 01/10/2026" },
];

export const HOW_IT_WORKS = [
  { title: "Analisa seus sinais", description: "Lê cada sinal recebido dos canais do Telegram e compara com o contexto atual do mercado.", icon: "search" },
  { title: "Identifica padrões", description: "Encontra padrões de horário, ativo e direção que mais se repetem nos seus melhores resultados.", icon: "pulse" },
  { title: "Avalia mercado e risco", description: "Cruza tendência, volatilidade e exposição da conta para medir o risco de cada entrada.", icon: "shield" },
  { title: "Sugere otimizações", description: "Propõe ajustes de risco, stop, take profit e horários para melhorar o desempenho.", icon: "settings" },
  { title: "Gera recomendações personalizadas", description: "Entrega um plano de ação claro, pensado para o seu perfil e histórico.", icon: "bulb" },
];
