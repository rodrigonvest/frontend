"use client";

import { useState } from "react";
import { Icon } from "../Icons";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { Block, Grad, Head, Strip } from "./parts";
import { APP_HREF, CheckDot, CtaButton, IconTile } from "./ui";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  icon: string;
  tone: "blue" | "purple" | "gold";
  cta: string;
  features: [string, boolean][];
  badge?: string;
  style: string;
  priceColor: string;
  btn: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Para começar",
    price: 0,
    description: "Conheça o Copytrix e teste os recursos essenciais.",
    icon: "send",
    tone: "blue",
    cta: "Começar grátis",
    features: [["1 conta de trading", true], ["1 canal do Telegram", true], ["Execução manual (1-clique)", true], ["Parser básico de sinais", true], ["Copier automático", false], ["Backtest", false], ["IA e análises avançadas", false], ["Suporte prioritário", false]],
    style: "border-sky-400/25",
    priceColor: "text-cyan-300",
    btn: "border border-sky-400/40 bg-[#07173a] text-white hover:bg-[#0a2150]",
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Para traders em evolução",
    price: 49.9,
    description: "Automatize seus sinais e opere com mais praticidade.",
    icon: "barsFilled",
    tone: "purple",
    cta: "Assinar Starter",
    features: [["Até 3 contas de trading", true], ["Até 3 canais do Telegram", true], ["Copier automático", true], ["Parser avançado de sinais", true], ["Filtros de risco e execução", true], ["Backtest básico", true], ["Relatórios de desempenho", true], ["IA avançada (Copytrix Intelligence)", false], ["Suporte prioritário", false]],
    style: "border-violet-400/35",
    priceColor: "text-violet-300",
    btn: "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:brightness-110",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Para traders exigentes",
    price: 99.9,
    description: "Mais controle, mais recursos e mais resultados.",
    icon: "shield",
    tone: "blue",
    cta: "Assinar Pro",
    badge: "Mais escolhido",
    features: [["Até 10 contas de trading", true], ["Até 10 canais do Telegram", true], ["Copier automático avançado", true], ["Parser com Inteligência Artificial", true], ["Backtest completo e análise", true], ["Gestão de risco avançada", true], ["Relatórios e estatísticas detalhadas", true], ["Integrações multi-plataforma", true], ["Suporte prioritário", true]],
    style: "border-sky-400/70 shadow-[0_0_60px_-14px_rgba(30,150,255,.9)]",
    priceColor: "text-sky-300",
    btn: "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:brightness-110",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Para profissionais e mesas",
    price: 199.9,
    description: "O pacote completo para quem leva o trading a sério.",
    icon: "crown",
    tone: "gold",
    cta: "Assinar Premium",
    features: [["Contas de trading ilimitadas", true], ["Canais do Telegram ilimitados", true], ["Todos os recursos do plano Pro", true], ["IA Copytrix Intelligence completa", true], ["Prop Firm Engine", true], ["Trading Journal avançado", true], ["Alertas e notificações inteligentes", true], ["Suporte VIP (prioridade máxima)", true], ["Acesso a novos recursos (beta)", true]],
    style: "border-amber-400/40",
    priceColor: "text-amber-300",
    btn: "bg-gradient-to-r from-amber-400 to-orange-500 text-[#1a1004] hover:brightness-110",
  },
];

const money = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <Block id="precos" labelledBy="pricing-title">
      <Head
        id="pricing-title"
        eyebrow="Planos / CTA"
        title={
          <>
            Escolha o plano ideal <Grad>para a sua jornada</Grad>
          </>
        }
        description="Do iniciante ao profissional, o Copytrix tem o plano certo para você copiar, automatizar e escalar seus resultados com segurança."
      />

      <div className="mb-8 flex justify-center">
        <div role="group" aria-label="Período de cobrança" className="inline-flex items-center rounded-xl border border-sky-400/25 bg-[#07132a] p-1 text-sm font-semibold">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={`rounded-lg px-6 py-2 transition ${!annual ? "bg-sky-500 text-white shadow-[0_0_24px_-6px_rgba(30,150,255,.9)]" : "text-slate-300 hover:text-white"}`}>
            Mensal
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={`flex items-center gap-2 rounded-lg px-5 py-2 transition ${annual ? "bg-sky-500 text-white shadow-[0_0_24px_-6px_rgba(30,150,255,.9)]" : "text-slate-300 hover:text-white"}`}>
            Anual <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">Até 20% OFF</span>
          </button>
        </div>
      </div>

      <ul className="grid gap-5 pt-3 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => {
          const price = annual ? p.price * 0.8 : p.price;
          return (
            <Reveal key={p.id} as="li" delay={i * 70} className="h-full">
              <article className={`lp-card lp-card-hover relative flex h-full flex-col p-5 ${p.style}`}>
                {p.badge && (
                  <span className="absolute -top-3 right-5 inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_0_24px_-4px_rgba(30,150,255,.9)]">
                    <Icon name="crown" size={12} /> {p.badge}
                  </span>
                )}
                <header className="flex items-center gap-3.5">
                  <IconTile name={p.icon} tone={p.tone} size={52} />
                  <div>
                    <h3 className="text-xl font-extrabold leading-tight text-white">{p.name}</h3>
                    <p className="text-[13px] text-slate-300">{p.tagline}</p>
                  </div>
                </header>
                <p className="mt-5 flex items-end gap-1.5 text-white">
                  <span className="pb-1.5 text-lg font-semibold">R$</span>
                  <span className={`text-5xl font-extrabold leading-none tracking-tight ${p.priceColor}`}>{p.price === 0 ? "0" : money(price)}</span>
                  <span className="pb-1.5 text-sm text-slate-300">/mês</span>
                </p>
                <p className="mt-1 h-4 text-[11px] text-emerald-400">{annual && p.price > 0 ? "Cobrança anual com 20% de desconto" : ""}</p>
                <p className="mt-3 min-h-[44px] text-[14px] leading-snug text-slate-200">{p.description}</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.features.map(([f, on]) => (
                    <li key={f} className={`flex items-center gap-2.5 text-[13px] ${on ? "text-slate-100" : "text-slate-500"}`}>
                      {on ? <CheckDot tone="green" /> : (
                        <span aria-hidden className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-slate-600/40 text-slate-400"><Icon name="x" size={10} stroke={3} /></span>
                      )}
                      <span className="sr-only">{on ? "Incluído: " : "Não incluído: "}</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={APP_HREF} className={`mt-6 inline-flex h-12 items-center justify-center rounded-xl text-[15px] font-bold transition ${p.btn}`}>
                  {p.cta}
                </a>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <Strip
        items={[
          { icon: "shieldCheck", tone: "green", title: "7 dias de garantia", text: "Seu dinheiro de volta" },
          { icon: "dollar", tone: "purple", title: "Pagamento seguro", text: "Cartão, Pix e outras opções" },
          { icon: "pulse", tone: "blue", title: "Acesso imediato", text: "Comece a usar em minutos" },
          { icon: "refresh", tone: "blue", title: "Cancele quando quiser", text: "Sem fidelidade" },
        ]}
      />

      <Reveal className="mt-4">
        <div className="lp-card flex flex-col items-center gap-5 p-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <Logo size="lg" />
          <div className="min-w-0">
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">Pronto para levar seus resultados para o próximo nível?</h3>
            <p className="mt-1 text-sm text-slate-300">Junte-se a milhares de traders que já automatizam seus sinais com o Copytrix.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CtaButton href={APP_HREF} arrow>
              Comece agora grátis
            </CtaButton>
            <p className="flex gap-4 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5"><CheckDot tone="green" /> Sem cartão de crédito</span>
              <span className="flex items-center gap-1.5"><CheckDot tone="green" /> Ativação imediata</span>
            </p>
          </div>
        </div>
      </Reveal>
    </Block>
  );
}
