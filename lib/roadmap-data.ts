export type RoadmapStatus = "delivered" | "developing" | "planned" | "future";
export type RoadmapFilter = "all" | RoadmapStatus;

export interface RoadmapVersion {
  id: string;
  version: string;
  stage: string;
  date: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  icon: string;
  badge?: string;
  highlighted?: boolean;
  items: string[];
}

export const ROADMAP_TITLE = "Roadmap";
export const ROADMAP_DESCRIPTION =
  "Acompanhe o desenvolvimento do Copytrix e veja o que já foi lançado, o que está em desenvolvimento e o que vem por aí.";

export const SUMMARY_CARDS: Array<{ status: RoadmapStatus; label: string; value: number; caption: string; icon: string }> = [
  { status: "delivered", label: "Entregues", value: 28, caption: "funcionalidades lançadas", icon: "check" },
  { status: "developing", label: "Em Desenvolvimento", value: 8, caption: "em andamento", icon: "settings" },
  { status: "planned", label: "Planejadas", value: 15, caption: "próximas atualizações", icon: "clock" },
  { status: "future", label: "Ideias Futuras", value: 12, caption: "em avaliação", icon: "sparkles" },
];

export const FILTERS: Array<{ id: RoadmapFilter; label: string; count: number }> = [
  { id: "all", label: "Todos", count: 63 },
  { id: "delivered", label: "Entregues", count: 28 },
  { id: "developing", label: "Em Desenvolvimento", count: 8 },
  { id: "planned", label: "Planejadas", count: 15 },
  { id: "future", label: "Ideias Futuras", count: 12 },
];

export const PROGRESS_TOTAL = 63;

export const PROGRESS_SEGMENTS: Array<{ status: RoadmapStatus; label: string; count: number; percent: number }> = [
  { status: "delivered", label: "Entregues", count: 28, percent: 44 },
  { status: "developing", label: "Em desenvolvimento", count: 8, percent: 13 },
  { status: "planned", label: "Planejadas", count: 15, percent: 24 },
  { status: "future", label: "Ideias futuras", count: 12, percent: 19 },
];

export const VERSIONS: RoadmapVersion[] = [
  {
    id: "v1-0",
    version: "v1.0",
    stage: "Lançado",
    date: "Jul 2026",
    title: "MVP - Core do Copytrix",
    description: "Funcionalidades essenciais para copiar sinais do Telegram para resultados reais.",
    status: "delivered",
    icon: "box",
    items: [
      "Conexão Telegram",
      "Contas MT4/MT5",
      "Cópia de sinais em tempo real",
      "Gestão de risco básica",
      "Dashboard e operações",
      "Backtest de sinais (básico)",
      "Logs e relatórios",
      "Sistema de notificações",
      "Configurações gerais",
      "Múltiplos canais",
      "Suporte por e-mail",
      "Plano Pro",
    ],
  },
  {
    id: "v1-1",
    version: "v1.1",
    stage: "Lançado",
    date: "Out 2026",
    title: "Recursos Avançados",
    description: "Mais controle, automação e ferramentas para o seu copytrading.",
    status: "delivered",
    icon: "settings",
    items: [
      "Multi-conta avançado",
      "Risk Management Pro",
      "Smart Entry",
      "Filtros avançados de sinais",
      "Templates de configuração",
      "Análise automática de canais",
      "Relatórios detalhados",
      "Replay de sinais",
      "Marketplace (beta)",
      "API e Webhooks",
      "Integrações adicionais",
      "Suporte prioritário",
    ],
  },
  {
    id: "v1-2",
    version: "v1.2",
    stage: "Lançado",
    date: "Dez 2026",
    title: "Copytrix Intelligence (IA)",
    description: "Inteligência artificial para análise de sinais, insights e automações.",
    status: "delivered",
    icon: "brain",
    items: [
      "Análise de sentimento",
      "Detecção de oportunidades",
      "Relatórios com IA",
      "Insights e recomendações",
      "Comparativo de estratégias",
      "Exportação de dados (CSV/PDF)",
      "Alertas inteligentes",
      "Painel de performance com IA",
    ],
  },
  {
    id: "v1-3",
    version: "v1.3",
    stage: "Lançado",
    date: "Jan 2027",
    title: "Copytrix MCP",
    description: "Conecte o Copytrix ao ChatGPT, Claude e outros agentes de IA.",
    status: "delivered",
    icon: "bot",
    badge: "Novo",
    highlighted: true,
    items: [
      "Servidor MCP",
      "Integração com ChatGPT",
      "Integração com Claude",
      "Comandos por IA",
      "Gerenciar sistemas e contas",
      "Consultar operações e relatórios",
      "Executar backtests por comando",
      "Configurar riscos e parâmetros",
      "Criar e gerenciar Rooms",
      "Permissões e segurança",
      "Logs de comandos",
      "Documentação completa",
    ],
  },
  {
    id: "v1-4",
    version: "v1.4",
    stage: "Em Desenvolvimento",
    date: "Fev 2027",
    title: "Expansão de Plataformas",
    description: "Mais integrações e recursos para uma experiência ainda mais completa.",
    status: "developing",
    icon: "layers",
    items: [
      "NinjaTrader (execução)",
      "DXtrade (execução)",
      "OANDA (execução)",
      "MatchTrader (execução)",
      "Tradovate (execução)",
      "Integrações / exchanges",
    ],
  },
  {
    id: "v1-5",
    version: "v1.5",
    stage: "Planejado",
    date: "Mar 2027",
    title: "Experiência Mobile e Sinais",
    description: "Aplicativo móvel e novos recursos para acompanhar e filtrar sinais em qualquer lugar.",
    status: "planned",
    icon: "signal",
    items: [
      "Mobile App (iOS/Android)",
      "Mais integrações de corretoras",
      "Novos filtros de sinais",
      "Sistema de assinaturas de sinais",
    ],
  },
  {
    id: "v2-0",
    version: "v2.0",
    stage: "Em avaliação",
    date: "Sem data",
    title: "Ideias em Avaliação",
    description: "Sugestões da comunidade que a equipe está avaliando para as próximas fases.",
    status: "future",
    icon: "bulb",
    items: [
      "Painel multiusuário para equipes",
      "Notificações por WhatsApp",
      "Templates compartilhados da comunidade",
      "Relatórios agendados por e-mail",
      "Mais fontes de sinais",
      "Personalização do painel",
    ],
  },
];

export interface Highlight {
  id: string;
  title: string;
  note: string;
  icon: string;
  tone: "purple" | "gold" | "blue";
  versionId: string;
  badge?: string;
}

export const HIGHLIGHTS: Highlight[] = [
  { id: "mcp", title: "Copytrix MCP", note: "Conecte com ChatGPT, Claude e IA", icon: "bot", tone: "purple", versionId: "v1-3", badge: "Novo" },
  { id: "intelligence", title: "Copytrix Intelligence (IA)", note: "Relatórios e insights com IA", icon: "brain", tone: "purple", versionId: "v1-2" },
  { id: "marketplace", title: "Marketplace (beta)", note: "Estratégias da comunidade", icon: "systems", tone: "gold", versionId: "v1-1" },
  { id: "multi", title: "Multi-conta avançado", note: "Gestão completa de múltiplas contas", icon: "accounts", tone: "blue", versionId: "v1-1" },
  { id: "risk", title: "Risk Management Pro", note: "Controle avançado de risco", icon: "shield", tone: "blue", versionId: "v1-1" },
];

export const UPCOMING: Array<{ id: string; title: string; note: string }> = [
  { id: "mobile", title: "Mobile App (iOS/Android)", note: "Previsto para Fev 2027" },
  { id: "brokers", title: "Mais integrações de corretoras", note: "Previsto para Mar 2027" },
  { id: "filters", title: "Novos filtros de sinais", note: "Previsto para Mar 2027" },
  { id: "subscriptions", title: "Sistema de assinaturas de sinais", note: "Previsto para Abr 2027" },
];
