/**
 * Demonstration data for the Notification Center (/notificacoes).
 * Shapes are kept close to what a future Core/API endpoint would return,
 * so the view layer can switch to real data without structural changes.
 */

export type NotificationCategoryId = "todas" | "operacoes" | "sistemas" | "contas" | "telegram" | "seguranca" | "atualizacoes";

export type NotificationKind =
  | "signal"
  | "order"
  | "takeProfit"
  | "report"
  | "stopLoss"
  | "account"
  | "system"
  | "update"
  | "risk"
  | "login";

export type HighlightTone = "success" | "danger" | "info" | "neutral";

export type NotificationDetailRow = { label: string; value: string; icon?: string };

export type NotificationSignal = {
  symbol: string;
  side: "BUY" | "SELL";
  entry: string;
  levels: Array<{ label: string; value: string }>;
};

export type NotificationAction = { label: string; href: string };

export type RelatedStep = {
  id: string;
  title: string;
  subtitle: string;
  time?: string;
  state: "done" | "pending";
};

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  category: Exclude<NotificationCategoryId, "todas">;
  title: string;
  summary: string;
  highlight?: { prefix?: string; value: string; tone: HighlightTone };
  time: string;
  date: string;
  unread: boolean;
  /** Ordering rank used by "Mais recentes" (lower = more recent). */
  position: number;
  detail: {
    description: string;
    signal?: NotificationSignal;
    rows: NotificationDetailRow[];
    primaryAction: NotificationAction;
    secondaryAction: NotificationAction;
    related?: RelatedStep[];
  };
};

export const notificationCategories: Array<{ id: NotificationCategoryId; label: string; icon: string }> = [
  { id: "todas", label: "Todas", icon: "dashboard" },
  { id: "operacoes", label: "Operações", icon: "trendUp" },
  { id: "sistemas", label: "Sistemas", icon: "settings" },
  { id: "contas", label: "Contas", icon: "box" },
  { id: "telegram", label: "Telegram", icon: "telegram" },
  { id: "seguranca", label: "Segurança", icon: "shieldCheck" },
  { id: "atualizacoes", label: "Atualizações", icon: "sparkles" },
];

/** Unread items that live on other pages of the API result (not part of the 10 mocked below). */
export const initialUnreadBacklog: Record<Exclude<NotificationCategoryId, "todas">, number> = {
  operacoes: 6,
  sistemas: 4,
  contas: 2,
  telegram: 2,
  seguranca: 1,
  atualizacoes: 2,
};

export const NOTIFICATIONS_TOTAL = 118;
export const NOTIFICATIONS_PAGE_SIZE = 10;

export const notificationSortOptions = [
  { id: "recent", label: "Mais recentes" },
  { id: "oldest", label: "Mais antigas" },
  { id: "unread", label: "Não lidas primeiro" },
] as const;

export type NotificationSortId = (typeof notificationSortOptions)[number]["id"];

const DATE = "06/10/2026";
const ACCOUNT_1 = "MT5 - Vantage (Conta #1)";

const signalThread: RelatedStep[] = [
  { id: "thread-order", title: "Ordem executada", subtitle: "BUY XAUUSD @ 4142.53", time: "14:28", state: "done" },
  { id: "thread-tp1", title: "TP1 atingido", subtitle: "Fechou 50% → +0.50R", time: "14:32", state: "done" },
  { id: "thread-tp2", title: "Aguardando TP2", subtitle: "Meta: 4146.50", state: "pending" },
  { id: "thread-tp3", title: "Aguardando TP3", subtitle: "Meta: 4148.50", state: "pending" },
  { id: "thread-tp4", title: "Aguardando TP4", subtitle: "Meta: 4152.50", state: "pending" },
];

export const notificationsDemo: NotificationItem[] = [
  {
    id: "n-signal",
    kind: "signal",
    category: "telegram",
    title: "Novo sinal recebido",
    summary: "KIM GOLD SECRET enviou um novo sinal",
    highlight: { value: "BUY XAUUSD @ 4142.50", tone: "success" },
    time: "14:28",
    date: DATE,
    unread: true,
    position: 1,
    detail: {
      description: "O canal KIM GOLD SECRET enviou um novo sinal de compra.",
      signal: {
        symbol: "XAUUSD",
        side: "BUY",
        entry: "4142.50",
        levels: [
          { label: "SL", value: "4140.50" },
          { label: "TP1", value: "4144.50" },
          { label: "TP2", value: "4146.50" },
          { label: "TP3", value: "4148.50" },
          { label: "TP4", value: "4152.50" },
        ],
      },
      rows: [
        { label: "Canal", value: "KIM GOLD SECRET", icon: "telegram" },
        { label: "Sistema", value: "KIM GOLD SECRET (Copy)", icon: "layers" },
        { label: "Conta de destino", value: ACCOUNT_1, icon: "box" },
        { label: "Lote", value: "0.10 lots", icon: "accounts" },
        { label: "Risco estimado", value: "0.50% ($50.00)", icon: "shieldCheck" },
      ],
      primaryAction: { label: "Ver operação", href: "/trades" },
      secondaryAction: { label: "Ir para o canal", href: "/connectors" },
      related: signalThread,
    },
  },
  {
    id: "n-order",
    kind: "order",
    category: "operacoes",
    title: "Ordem executada",
    summary: "BUY XAUUSD executada com sucesso",
    highlight: { value: "0.10 lots @ 4142.53", tone: "neutral" },
    time: "14:28",
    date: DATE,
    unread: true,
    position: 2,
    detail: {
      description: "A ordem de compra foi executada na conta de destino sem rejeições.",
      rows: [
        { label: "Ativo", value: "XAUUSD" },
        { label: "Direção", value: "BUY" },
        { label: "Preço de execução", value: "4142.53" },
        { label: "Lote", value: "0.10 lots" },
        { label: "Conta", value: ACCOUNT_1 },
      ],
      primaryAction: { label: "Ver operação", href: "/trades" },
      secondaryAction: { label: "Ver logs", href: "/logs" },
      related: signalThread,
    },
  },
  {
    id: "n-tp1",
    kind: "takeProfit",
    category: "operacoes",
    title: "TP1 atingido",
    summary: "XAUUSD fechou 50% da posição",
    highlight: { prefix: "Lucro: ", value: "+0.50R (+$25.00)", tone: "success" },
    time: "14:32",
    date: DATE,
    unread: true,
    position: 3,
    detail: {
      description: "O primeiro alvo foi atingido e metade da posição foi encerrada com lucro.",
      rows: [
        { label: "Ativo", value: "XAUUSD" },
        { label: "Alvo atingido", value: "TP1 — 4144.50" },
        { label: "Fechamento", value: "50% da posição" },
        { label: "Resultado", value: "+0.50R (+$25.00)" },
        { label: "Conta", value: ACCOUNT_1 },
      ],
      primaryAction: { label: "Ver operação", href: "/trades" },
      secondaryAction: { label: "Ver desempenho", href: "/desempenho" },
      related: signalThread,
    },
  },
  {
    id: "n-report",
    kind: "report",
    category: "sistemas",
    title: "Relatório diário disponível",
    summary: "Seu relatório diário de desempenho está pronto",
    time: "14:10",
    date: DATE,
    unread: false,
    position: 4,
    detail: {
      description: "O resumo de desempenho do dia foi gerado e já pode ser consultado.",
      rows: [
        { label: "Período", value: DATE },
        { label: "Operações", value: "12" },
        { label: "Resultado", value: "+2.40R (+$120.00)" },
        { label: "Taxa de acerto", value: "66,7%" },
      ],
      primaryAction: { label: "Abrir relatório", href: "/relatorios" },
      secondaryAction: { label: "Ver desempenho", href: "/desempenho" },
    },
  },
  {
    id: "n-stop",
    kind: "stopLoss",
    category: "operacoes",
    title: "Stop Loss atingido",
    summary: "XAUUSD posição fechada no Stop Loss",
    highlight: { prefix: "Prejuízo: ", value: "-1.00R (-$50.00)", tone: "danger" },
    time: "13:58",
    date: DATE,
    unread: false,
    position: 5,
    detail: {
      description: "A posição foi encerrada automaticamente ao atingir o nível de Stop Loss.",
      rows: [
        { label: "Ativo", value: "XAUUSD" },
        { label: "Stop Loss", value: "4138.50" },
        { label: "Resultado", value: "-1.00R (-$50.00)" },
        { label: "Canal", value: "KIM GOLD SECRET" },
        { label: "Conta", value: ACCOUNT_1 },
      ],
      primaryAction: { label: "Ver operação", href: "/trades" },
      secondaryAction: { label: "Ver logs", href: "/logs" },
    },
  },
  {
    id: "n-account",
    kind: "account",
    category: "contas",
    title: "Conta MT5 desconectada",
    summary: "A conta #2 (Vantage-Live) foi desconectada",
    time: "13:41",
    date: DATE,
    unread: false,
    position: 6,
    detail: {
      description: "A conexão com o servidor da corretora foi perdida. Novas ordens não serão replicadas nesta conta.",
      rows: [
        { label: "Conta", value: "#2 (Vantage-Live)" },
        { label: "Plataforma", value: "MT5" },
        { label: "Motivo", value: "Tempo limite de conexão" },
        { label: "Última conexão", value: "13:38" },
      ],
      primaryAction: { label: "Ver contas", href: "/accounts" },
      secondaryAction: { label: "Ver logs", href: "/logs" },
    },
  },
  {
    id: "n-system",
    kind: "system",
    category: "sistemas",
    title: "Novo sistema criado",
    summary: "Sistema \"KIM GOLD SECRET\" criado com sucesso",
    time: "12:36",
    date: DATE,
    unread: false,
    position: 7,
    detail: {
      description: "O sistema foi criado e está pronto para receber sinais do canal configurado.",
      rows: [
        { label: "Sistema", value: "KIM GOLD SECRET" },
        { label: "Modo", value: "Copy" },
        { label: "Status", value: "Ativo" },
        { label: "Criado em", value: `${DATE} às 12:36` },
      ],
      primaryAction: { label: "Ver sistemas", href: "/sistemas" },
      secondaryAction: { label: "Ver logs", href: "/logs" },
    },
  },
  {
    id: "n-update",
    kind: "update",
    category: "atualizacoes",
    title: "Nova atualização disponível",
    summary: "Versão v1.1.0 com melhorias de performance",
    time: "11:20",
    date: DATE,
    unread: false,
    position: 8,
    detail: {
      description: "Uma nova versão do Copytrix foi publicada com ajustes de desempenho e estabilidade.",
      rows: [
        { label: "Versão", value: "v1.1.0" },
        { label: "Tipo", value: "Melhorias de performance" },
        { label: "Disponível desde", value: `${DATE} às 11:20` },
      ],
      primaryAction: { label: "Ver roadmap", href: "/roadmap" },
      secondaryAction: { label: "Ajuda & Suporte", href: "/help" },
    },
  },
  {
    id: "n-risk",
    kind: "risk",
    category: "operacoes",
    title: "Limite de risco atingido",
    summary: "Você atingiu 80% do seu limite diário de perda",
    time: "10:15",
    date: DATE,
    unread: false,
    position: 9,
    detail: {
      description: "O uso do limite diário de perda chegou a 80%. Ao atingir 100%, novas operações podem ser bloqueadas.",
      rows: [
        { label: "Limite diário", value: "5.00% ($500.00)" },
        { label: "Utilizado", value: "80% ($400.00)" },
        { label: "Conta", value: ACCOUNT_1 },
        { label: "Ação sugerida", value: "Revisar tamanho de lote" },
      ],
      primaryAction: { label: "Gerenciar risco", href: "/sistemas/risk-management-pro" },
      secondaryAction: { label: "Ver contas", href: "/accounts" },
    },
  },
  {
    id: "n-login",
    kind: "login",
    category: "seguranca",
    title: "Novo login detectado",
    summary: "Novo acesso à sua conta de São Paulo - BR",
    time: "09:22",
    date: DATE,
    unread: false,
    position: 10,
    detail: {
      description: "Detectamos um novo acesso à sua conta. Se não foi você, revise a segurança imediatamente.",
      rows: [
        { label: "Local", value: "São Paulo - BR" },
        { label: "Dispositivo", value: "Windows • Chrome" },
        { label: "Horário", value: `${DATE} às 09:22` },
        { label: "Endereço IP", value: "189.xxx.xxx.12" },
      ],
      primaryAction: { label: "Histórico de conexões", href: "/settings/seguranca/historico-conexoes" },
      secondaryAction: { label: "Revisar segurança", href: "/settings" },
    },
  },
];
