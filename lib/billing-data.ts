export type PlanTone = "slate" | "brand" | "purple";

export interface PlanOffer {
  id: "basic" | "pro" | "ultra";
  name: string;
  price: string;
  icon: string;
  tone: PlanTone;
  features: string[];
  highlight: string;
  cta: string;
  current?: boolean;
}

export const CURRENT_PLAN = {
  name: "Pro",
  description: "Acesso completo a todas as funcionalidades do Copytrix, sem limitações.",
  status: "Ativo",
  details: [
    { id: "valid", icon: "calendar", label: "Válido até", value: "15/11/2026", note: "(38 dias restantes)" },
    { id: "price", icon: "dollar", label: "Valor Mensal", value: "R$ 59,90", note: "(próxima cobrança)" },
    { id: "cycle", icon: "refresh", label: "Ciclo de Cobrança", value: "Mensal", note: "(renovação automática)" },
  ],
};

export interface UsageMetric {
  id: string;
  icon: string;
  label: string;
  value: string;
  used: number;
  limit: number | null;
  percent: number;
  tone: "green" | "blue";
}

export const USAGE_METRICS: UsageMetric[] = [
  { id: "accounts", icon: "server", label: "Contas MT4/MT5", value: "2 / 10", used: 2, limit: 10, percent: 20, tone: "green" },
  { id: "channels", icon: "telegram", label: "Canais Telegram", value: "3 / 20", used: 3, limit: 20, percent: 15, tone: "blue" },
  { id: "systems", icon: "layers", label: "Sistemas de Cópia", value: "5 / 50", used: 5, limit: 50, percent: 10, tone: "green" },
  { id: "history", icon: "fileText", label: "Histórico de Operações", value: "167 / Ilimitado", used: 167, limit: null, percent: 0, tone: "green" },
];

export const PLAN_OFFERS: PlanOffer[] = [
  {
    id: "basic",
    name: "Básico",
    price: "R$ 29,90",
    icon: "analytics",
    tone: "slate",
    features: [
      "3 contas MT4/MT5",
      "5 canais Telegram",
      "10 sistemas de cópia",
      "Backtester (básico)",
      "Relatórios básicos",
      "Suporte por e-mail",
    ],
    highlight: "Backtester (básico)",
    cta: "Fazer Upgrade",
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 59,90",
    icon: "crown",
    tone: "brand",
    features: [
      "10 contas MT4/MT5",
      "20 canais Telegram",
      "50 sistemas de cópia",
      "Backtester completo",
      "Replay de sinais",
      "Relatórios avançados",
      "Acesso à API",
      "Suporte prioritário",
    ],
    highlight: "Backtester completo",
    cta: "Plano Atual",
    current: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "R$ 99,90",
    icon: "rocket",
    tone: "purple",
    features: [
      "Contas MT4/MT5 ilimitadas",
      "Canais Telegram ilimitados",
      "Sistemas de cópia ilimitados",
      "Backtester completo + IA",
      "Replay de sinais avançado",
      "Relatórios e análises avançadas",
      "Acesso à API",
      "Suporte VIP (WhatsApp)",
      "Recursos exclusivos (em breve)",
    ],
    highlight: "Backtester completo + IA",
    cta: "Fazer Upgrade",
  },
];

export const PAYMENT_METHOD = {
  name: "PIX",
  maskedEmail: "rodrigo***@gmail.com",
  badge: "Principal",
};

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Pago";
}

export const INVOICES: Invoice[] = [
  { id: "inv-2026-10", date: "15/10/2026", amount: "R$ 59,90", status: "Pago" },
  { id: "inv-2026-09", date: "15/09/2026", amount: "R$ 59,90", status: "Pago" },
  { id: "inv-2026-08", date: "15/08/2026", amount: "R$ 59,90", status: "Pago" },
  { id: "inv-2026-07", date: "15/07/2026", amount: "R$ 59,90", status: "Pago" },
  { id: "inv-2026-06", date: "15/06/2026", amount: "R$ 59,90", status: "Pago" },
];

export interface IncludedFeature {
  id: string;
  icon: string;
  title: string;
  note: string;
  tone: "blue" | "purple" | "green";
}

export const INCLUDED_FEATURES: IncludedFeature[] = [
  { id: "copier", icon: "infinity", title: "Copier ilimitado", note: "MT4/MT5/Outros", tone: "blue" },
  { id: "telegram", icon: "telegram", title: "Canais Telegram", note: "até 20 canais", tone: "blue" },
  { id: "backtester", icon: "analytics", title: "Backtester", note: "completo", tone: "purple" },
  { id: "replay", icon: "replay", title: "Replay de sinais", note: "análise e histórico", tone: "blue" },
  { id: "reports", icon: "growth", title: "Relatórios avançados", note: "performance completa", tone: "purple" },
  { id: "risk", icon: "shieldCheck", title: "Gestão de risco", note: "avançada", tone: "green" },
  { id: "api", icon: "code", title: "Acesso à API", note: "integração total", tone: "purple" },
  { id: "support", icon: "headset", title: "Suporte prioritário", note: "atendimento rápido", tone: "purple" },
];
