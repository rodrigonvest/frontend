export type HelpAccent = "blue" | "purple" | "green" | "amber" | "red";

export const HELP_TITLE = "Ajuda & Suporte";
export const HELP_DESCRIPTION = "Encontre respostas, aprenda com nossos tutoriais ou fale diretamente com nossa equipe.";

export const HELP_IDS = {
  search: "help-search",
  searchInput: "help-search-input",
  articles: "help-articles",
  videos: "help-videos",
  status: "help-status",
  support: "help-support",
  supportSubject: "help-support-subject",
  channels: "help-channels",
  discordChannel: "help-channel-discord",
} as const;

export type QuickLinkId = "articles" | "videos" | "contact" | "community";

export interface QuickLink {
  id: QuickLinkId;
  title: string;
  description: string;
  icon: string;
  accent: HelpAccent;
}

export const QUICK_LINKS: QuickLink[] = [
  { id: "articles", title: "Central de Ajuda", description: "Guias completos, tutoriais e documentação passo a passo.", icon: "book", accent: "blue" },
  { id: "videos", title: "Tutoriais em Vídeo", description: "Aprenda a configurar e usar todas as funcionalidades.", icon: "play", accent: "purple" },
  { id: "contact", title: "Fale Conosco", description: "Abra um ticket ou converse com nossa equipe de suporte.", icon: "message", accent: "green" },
  { id: "community", title: "Comunidade", description: "Tire dúvidas com outros usuários no nosso Discord.", icon: "accounts", accent: "amber" },
];

export const SEARCH_PLACEHOLDER = "Buscar na central de ajuda...";
export const SEARCH_EXAMPLES = "Exemplos: conectar MT4, configurar Telegram, erro de execução, gerenciamento de risco";

export interface Article {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: HelpAccent;
  steps: string[];
  keywords: string;
}

export const ARTICLES: Article[] = [
  {
    id: "connect-mt",
    title: "Como conectar sua conta MT4/MT5",
    description: "Passo a passo completo para conectar suas contas de trading.",
    icon: "settings",
    accent: "blue",
    steps: [
      "Acesse Contas e clique em Nova conta.",
      "Escolha a plataforma (MetaTrader 4 ou 5) e informe o servidor da corretora.",
      "Digite o login e a senha de investidor ou de operação.",
      "Aguarde a validação e confirme o status Conectado.",
    ],
    keywords: "conectar conta mt4 mt5 metatrader login servidor corretora trading",
  },
  {
    id: "first-system",
    title: "Criando seu primeiro sistema",
    description: "Configure sua primeira automação de cópia de sinais.",
    icon: "layers",
    accent: "blue",
    steps: [
      "Abra Sistemas e escolha Nova automação.",
      "Selecione o canal do Telegram que será a origem dos sinais.",
      "Defina a conta de destino e os parâmetros de lote.",
      "Ative o sistema e acompanhe a primeira operação em Operações.",
    ],
    keywords: "sistema automacao copiar copia sinais primeiro criar configurar",
  },
  {
    id: "telegram-channel",
    title: "Como configurar um canal Telegram",
    description: "Adicione e configure canais de sinais.",
    icon: "telegram",
    accent: "blue",
    steps: [
      "Vá em Canais Telegram e clique em Adicionar canal.",
      "Informe o link ou o nome do canal de sinais.",
      "Escolha o formato de leitura dos sinais.",
      "Teste com um sinal de exemplo antes de ativar.",
    ],
    keywords: "telegram canal canais sinais configurar adicionar grupo",
  },
  {
    id: "common-errors",
    title: "Soluções para erros comuns",
    description: "Veja as soluções para os erros mais frequentes.",
    icon: "alert",
    accent: "red",
    steps: [
      "Verifique se a conta está com o status Conectado.",
      "Confira spread, horário de mercado e símbolo do ativo.",
      "Consulte Logs para identificar o motivo da falha de execução.",
      "Se o erro persistir, abra um ticket com o código exibido no log.",
    ],
    keywords: "erro erros execucao falha problema solucao spread conexao logs",
  },
  {
    id: "risk-management",
    title: "Gerenciamento de risco",
    description: "Aprenda a configurar lotes, SL, TP e proteções de conta.",
    icon: "shieldCheck",
    accent: "green",
    steps: [
      "Defina o tipo de lote: fixo, por saldo ou por risco percentual.",
      "Configure Stop Loss e Take Profit padrão para sinais sem níveis.",
      "Ative limites diários de perda e de operações abertas.",
      "Revise as proteções de conta antes de operar em conta real.",
    ],
    keywords: "risco gerenciamento lote lotes sl tp stop loss take profit protecao conta",
  },
  {
    id: "integrations",
    title: "Integrações e plataformas",
    description: "Guia completo das plataformas suportadas.",
    icon: "webhook",
    accent: "purple",
    steps: [
      "Veja a lista de plataformas e corretoras compatíveis.",
      "Entenda as diferenças entre MT4, MT5 e as integrações via API.",
      "Configure webhooks para receber eventos do Copytrix.",
      "Confira os limites e requisitos de cada integração.",
    ],
    keywords: "integracoes plataformas api webhook webhooks corretoras suportadas",
  },
  {
    id: "backtest",
    title: "Como usar o Backtest",
    description: "Teste estratégias com dados históricos de forma simples.",
    icon: "backtest",
    accent: "purple",
    steps: [
      "Abra Backtest e escolha o canal ou sistema a simular.",
      "Defina o período e os parâmetros de risco.",
      "Execute a simulação e aguarde o processamento.",
      "Analise win rate, drawdown e curva de capital no relatório.",
    ],
    keywords: "backtest teste estrategia historico simulacao relatorio dados",
  },
  {
    id: "billing",
    title: "Faturamento e planos",
    description: "Entenda como funcionam os planos, pagamentos e cobranças.",
    icon: "dollar",
    accent: "purple",
    steps: [
      "Acesse Plano e Cobrança para ver seu plano atual.",
      "Compare os planos e faça upgrade ou downgrade quando quiser.",
      "Atualize a forma de pagamento e baixe suas faturas.",
      "Em caso de cobrança indevida, abra um ticket em Fale com o Suporte.",
    ],
    keywords: "faturamento planos pagamento cobranca fatura plano pro assinatura cartao",
  },
];

export interface Video {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  accent: HelpAccent;
  chapters: string[];
  keywords: string;
}

export const VIDEOS: Video[] = [
  {
    id: "video-telegram",
    title: "Como conectar o Telegram",
    subtitle: "Passo a passo completo",
    duration: "03:24",
    durationSeconds: 204,
    accent: "blue",
    chapters: ["Criando a sessão", "Adicionando canais", "Testando um sinal"],
    keywords: "telegram conectar canal sessao configurar tutorial video",
  },
  {
    id: "video-mt",
    title: "Configurando MT4/MT5",
    subtitle: "Do zero ao primeiro sinal",
    duration: "05:18",
    durationSeconds: 318,
    accent: "green",
    chapters: ["Instalando o conector", "Vinculando a conta", "Primeira cópia de sinal"],
    keywords: "mt4 mt5 metatrader configurar conta conector tutorial video sinal",
  },
  {
    id: "video-system",
    title: "Criando seu primeiro sistema",
    subtitle: "Configuração completa",
    duration: "07:32",
    durationSeconds: 452,
    accent: "purple",
    chapters: ["Escolhendo o canal", "Definindo risco", "Ativando e monitorando"],
    keywords: "sistema automacao criar primeiro risco monitorar tutorial video",
  },
];

export interface ServiceStatus {
  id: string;
  name: string;
}

export const SERVICES: ServiceStatus[] = [
  { id: "platform", name: "Plataforma Copytrix" },
  { id: "telegram", name: "Conexão Telegram" },
  { id: "metatrader", name: "MetaTrader (MT4/MT5)" },
  { id: "execution", name: "Execução de Sinais" },
  { id: "backtest", name: "Backtest e Relatórios" },
  { id: "api", name: "API e Webhooks" },
];

export const SUPPORT_TEXT = "Não encontrou o que procura? Abra um ticket e nossa equipe retornará o mais breve possível.";

export const SUBJECTS = ["Conta", "Telegram", "MT4/MT5", "Copiador", "Backtest", "Pagamento", "Outro"] as const;

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;
export const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;

export interface SupportChannel {
  id: string;
  title: string;
  line: string;
  note: string;
  accent: HelpAccent;
}

export const CHANNELS: SupportChannel[] = [
  { id: "discord", title: "Discord", line: "Comunidade oficial", note: "Tire dúvidas com outros usuários", accent: "purple" },
  { id: "email", title: "E-mail", line: "suporte@copytrix.com", note: "Resposta em até 24h", accent: "purple" },
  { id: "status", title: "Status", line: "status.copytrix.com", note: "Acompanhe em tempo real", accent: "green" },
];

export type SearchResult =
  | { kind: "article"; id: string; title: string; description: string; icon: string; accent: HelpAccent }
  | { kind: "video"; id: string; title: string; description: string; icon: string; accent: HelpAccent };

const STOPWORDS = new Set(["de", "da", "do", "das", "dos", "em", "um", "uma", "como", "para", "com", "por", "que", "seu", "sua"]);

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function searchHelp(query: string): SearchResult[] {
  const tokens = normalize(query)
    .split(/[^a-z0-9/]+/)
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
  if (!tokens.length) return [];

  const scored: Array<{ score: number; order: number; result: SearchResult }> = [];
  const consider = (haystack: string, title: string, result: SearchResult) => {
    const normalizedTitle = normalize(title);
    const normalizedHaystack = normalize(haystack);
    let score = 0;
    for (const token of tokens) {
      if (normalizedTitle.includes(token)) score += 3;
      else if (normalizedHaystack.includes(token)) score += 1;
    }
    if (score > 0) scored.push({ score, order: scored.length, result });
  };

  for (const article of ARTICLES) {
    consider(`${article.keywords} ${article.description}`, article.title, {
      kind: "article",
      id: article.id,
      title: article.title,
      description: article.description,
      icon: article.icon,
      accent: article.accent,
    });
  }
  for (const video of VIDEOS) {
    consider(`${video.keywords} ${video.subtitle}`, video.title, {
      kind: "video",
      id: video.id,
      title: video.title,
      description: `Vídeo · ${video.duration} · ${video.subtitle}`,
      icon: "replay",
      accent: video.accent,
    });
  }

  return scored.sort((a, b) => b.score - a.score || a.order - b.order).map((entry) => entry.result);
}
