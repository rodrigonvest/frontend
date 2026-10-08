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
    features: ["1 canal Telegram", "1 conta de trading", "Backtest básico", "Suporte da comunidade"],
    cta: "Plano Atual",
  },
  {
    id: "starter",
    name: "Starter",
    description: "Para traders que estão dando os primeiros passos.",
    monthlyPrice: 14.9,
    features: ["5 canais Telegram", "5 contas de trading", "Todos os sistemas", "Backtest avançado", "Suporte prioritário"],
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
      "Todos os sistemas",
      "Backtest completo",
      "Relatórios avançados",
      "Suporte prioritário",
      "Recursos de IA",
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
      "API avançada",
      "Relatórios personalizadas",
      "Suporte VIP (24/7)",
      "Recursos exclusivos",
    ],
    cta: "Assinar Enterprise",
  },
];

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
