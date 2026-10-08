export type BillingCycle = "monthly" | "annual";

export type PlanId = "free" | "starter" | "pro" | "enterprise";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const annualDiscount = 0.2;

export const currentSubscription = {
  planName: "Plano Pro",
  status: "Ativo",
  description: "Aproveite todos os recursos do Copytrix e leve suas operações para o próximo nível.",
  validUntilLabel: "Válido até",
  validUntil: "15 de Novembro de 2026",
  remaining: "Faltam 40 dias",
};

export const billingDetails = [
  { label: "Plano", value: "Pro (Mensal)" },
  { label: "Valor", value: "US$ 29,90 / mês" },
  { label: "Próxima renovação", value: "15 de Novembro de 2026" },
];

export const paymentMethod = { mask: "•••• 1234" };

export const promoCard = {
  title: "Ganhe Desconto",
  description: "Acompanhe nossas redes sociais e receba cupons exclusivos.",
};

export const plans: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    description: "Ideal para começar e testar a plataforma.",
    monthlyPrice: 0,
    features: ["1 canal Telegram", "1 conta de trading", "Sistemas limitados (5)", "Backtest básico", "Suporte da comunidade"],
    cta: "Plano Atual",
  },
  {
    id: "starter",
    name: "Starter",
    description: "Para traders que estão dando os primeiros passos.",
    monthlyPrice: 14.9,
    features: [
      "5 canais Telegram",
      "5 contas de trading",
      "Todos os sistemas",
      "Backtest avançado",
      "Templates e alertas",
      "Suporte prioritário",
    ],
    cta: "Assinar Starter",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para traders que querem o máximo de recursos.",
    monthlyPrice: 29.9,
    features: [
      "Canais ilimitados",
      "Contas ilimitadas",
      "Todos os sistemas (54+)",
      "Backtest completo",
      "Relatórios avançados",
      "Recursos de IA",
      "API e Webhooks",
      "Suporte prioritário",
    ],
    cta: "Plano Atual",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solução completa para equipes e traders profissionais.",
    monthlyPrice: 59.9,
    features: [
      "Tudo do plano Pro",
      "Múltiplos usuários",
      "Gerente de contas dedicado",
      "Infraestrutura dedicada (opcional)",
      "Limites personalizados",
      "SLA e suporte VIP (24/7)",
      "Consultoria de configuração",
    ],
    cta: "Assinar Enterprise",
  },
];

export type ComparisonValue = string | "included" | "excluded";

export type ComparisonRow = {
  feature: string;
  values: Record<PlanId, ComparisonValue>;
};

const included: ComparisonValue = "included";
const excluded: ComparisonValue = "excluded";

export const comparisonRows: ComparisonRow[] = [
  { feature: "Canais Telegram", values: { free: "1", starter: "5", pro: "Ilimitados", enterprise: "Ilimitados" } },
  { feature: "Contas de trading", values: { free: "1", starter: "5", pro: "Ilimitadas", enterprise: "Ilimitadas" } },
  {
    feature: "Sistemas / Integrações",
    values: { free: "5", starter: "Todos (54+)", pro: "Todos (54+)", enterprise: "Todos (54+)" },
  },
  { feature: "Multi-conta avançado", values: { free: excluded, starter: excluded, pro: included, enterprise: included } },
  {
    feature: "Risk Management Pro",
    values: { free: "Básico", starter: "Avançado", pro: "Completo", enterprise: "Completo" },
  },
  { feature: "Backtest", values: { free: "Básico", starter: "Avançado", pro: "Completo", enterprise: "Completo" } },
  { feature: "Replay de sinais", values: { free: excluded, starter: excluded, pro: included, enterprise: included } },
  {
    feature: "Copytrix Intelligence (IA)",
    values: { free: excluded, starter: excluded, pro: included, enterprise: included },
  },
  { feature: "API e Webhooks", values: { free: excluded, starter: excluded, pro: included, enterprise: included } },
  {
    feature: "Templates e alertas",
    values: { free: "Básico", starter: "Avançado", pro: "Completo", enterprise: "Completo" },
  },
  {
    feature: "Relatórios avançados",
    values: { free: excluded, starter: excluded, pro: included, enterprise: included },
  },
  {
    feature: "Logs e auditoria",
    values: { free: "Básico", starter: "Básico", pro: "Completo", enterprise: "Completo" },
  },
  {
    feature: "Suporte",
    values: { free: "Comunidade", starter: "Prioritário", pro: "Prioritário", enterprise: "VIP (24/7)" },
  },
];

export const coreFeatures = [
  "Mais de 54 sistemas e integrações",
  "Multi-conta avançado",
  "Risk Management completo",
  "Backtester integrado",
  "Replay de sinais",
  "Copytrix Intelligence (IA)",
  "API e Webhooks",
  "Templates e filtros avançados",
  "Logs e auditoria",
  "Suporte prioritário",
];

export const supportedSystems = [
  { logo: "mt4", label: "MT4" },
  { logo: "ninjatrader", label: "NinjaTrader" },
  { logo: "dxtrade", label: "DXtrade" },
  { logo: "binance", label: "Binance" },
  { logo: "tradelocker", label: "TradeLocker" },
  { logo: "oanda", label: "OANDA" },
] as const;

export function formatUsd(value: number): string {
  if (value === 0) return "US$ 0";
  return `US$ ${value.toFixed(2).replace(".", ",")}`;
}

export function planPrice(plan: PlanDefinition, cycle: BillingCycle): number {
  return cycle === "annual" ? Number((plan.monthlyPrice * (1 - annualDiscount)).toFixed(2)) : plan.monthlyPrice;
}

export function planPriceCaption(plan: PlanDefinition, cycle: BillingCycle): string {
  if (plan.monthlyPrice === 0) return "para sempre";
  return cycle === "annual" ? "por mês, cobrado anualmente" : "por mês";
}
