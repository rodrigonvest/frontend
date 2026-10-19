import Image from "next/image";
import { BrandMark, type BrandId } from "./brands";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Dot, Grad, Head, Mini, SideCard } from "./parts";
import { IconTile } from "./ui";

const left = [
  { icon: "pulse", tone: "blue" as const, title: "Mais Tempo para Operar", text: "Automatize o envio e execução dos sinais e foque no que realmente importa: sua estratégia." },
  { icon: "growth", tone: "green" as const, title: "Execução Rápida e Precisa", text: "Seus sinais são executados em segundos, com alta confiabilidade e baixa latência." },
  { icon: "shield", tone: "purple" as const, title: "Mais Segurança", text: "Gerencie risco, limites e regras automáticas para proteger seu capital." },
  { icon: "settings", tone: "gold" as const, title: "Total Flexibilidade", text: "Copie, gerencie e opere em múltiplas plataformas e contas ao mesmo tempo." },
  { icon: "analytics", tone: "blue" as const, title: "Resultados Comprovados", text: "Faça backtest dos sinais, analise desempenho e valide sua estratégia antes de operar ao vivo." },
];

const right = [
  { icon: "trendUp", tone: "purple" as const, title: "Aumente sua Consistência", text: "Elimine erros manuais e siga suas regras de forma disciplinada." },
  { icon: "dollar", tone: "green" as const, title: "Reduza Custos", text: "Mais eficiência operacional e menos retrabalho." },
  { icon: "accounts", tone: "blue" as const, title: "Ideal para Qualquer Perfil", text: "Funciona para traders iniciantes, experientes, sinais gratuitos ou salas privadas." },
  { icon: "trophy", tone: "gold" as const, title: "Escalabilidade", text: "Opere em várias contas, diferentes corretoras e estratégias sem complicação." },
  { icon: "clock", tone: "purple" as const, title: "Mais Liberdade", text: "Automatize o operacional e tenha mais tempo para estudar, analisar e evoluir como trader." },
];

const signals = [
  ["KIM GOLD SECRET", "XAUUSD BUY", "Entry: 3627.50", true],
  ["GOLD SIGNALS", "XAUUSD SELL", "Entry: 3638.20", false],
  ["TRADER ZONE", "US100 BUY", "Entry: 19520.5", true],
] as const;

const executions: [BrandId, string][] = [
  ["mt5", "MetaTrader 5"],
  ["mt4", "MetaTrader 4"],
  ["ninja", "NinjaTrader"],
  ["dxtrade", "DXtrade"],
  ["ctrader", "cTrader"],
  ["oanda", "OANDA"],
  ["tradelocker", "TradeLocker"],
  ["binance", "Binance Futures"],
];

const kpis = [
  { icon: "accounts", tone: "blue" as const, count: { to: 10000, group: true, suffix: "+" }, title: "Traders no Mundo", text: "Confiam no Copytrix" },
  { icon: "trendUp", tone: "green" as const, count: { to: 4.9, decimals: 1, suffix: "/5" }, title: "Avaliação dos Usuários", text: "Na nossa comunidade" },
  { icon: "barsFilled", tone: "purple" as const, count: { to: 38, suffix: "+" }, title: "Integrações", text: "Com principais plataformas" },
  { icon: "clock", tone: "blue" as const, label: "Segundos", title: "Tempo de Execução", text: "Do sinal ao mercado" },
  { icon: "shieldCheck", tone: "green" as const, count: { to: 99.9, decimals: 1, suffix: "%" }, title: "Estabilidade", text: "Operação contínua e segura" },
];

export function Benefits() {
  return (
    <Block id="beneficios" labelledBy="benefits-title">
      <Head
        id="benefits-title"
        eyebrow="Benefícios para traders"
        title={
          <>
            Mais resultados, <Grad>menos complicação</Grad>
          </>
        }
        description="O Copytrix foi criado para traders que querem praticidade, segurança e performance de verdade, sem perder tempo com processos manuais."
      />

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,.85fr)_minmax(0,1.5fr)_minmax(0,.85fr)]">
        <div className="space-y-3">
          {left.map((b, i) => (
            <SideCard key={b.title} {...b} delay={i * 50} />
          ))}
        </div>

        <Reveal className="order-first lg:col-span-2 xl:order-none xl:col-span-1">
          <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-sky-400/20 bg-[#040b1d] shadow-[0_0_80px_-30px_rgba(30,120,255,.8)] sm:min-h-[520px]">
            <Image src="/images/landing/trader-desk.png" alt="Trader acompanhando o dashboard do Copytrix em três monitores" fill sizes="(min-width: 1280px) 600px, 100vw" className="object-cover object-center" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#040b1d]/80 via-transparent to-[#040b1d]/50" />
            <div className="absolute left-3 top-3 w-[46%] min-w-[180px] max-w-[250px] sm:left-5 sm:top-5">
              <Mini title="Telegram - Sinais" icon={<BrandMark id="telegram" size={18} />} className="bg-[#06122a]/90 backdrop-blur">
                <ul className="space-y-1.5">
                  {signals.map(([ch, sig, entry, buy]) => (
                    <li key={ch} className="rounded-lg border border-sky-400/10 bg-[#050e22] p-1.5 text-[9px] leading-tight text-slate-300">
                      <span className="text-[8px] text-slate-400">{ch}</span>
                      <strong className={`block text-[11px] ${buy ? "text-emerald-400" : "text-rose-400"}`}>{sig}</strong>
                      {entry}
                    </li>
                  ))}
                </ul>
              </Mini>
            </div>
            <div className="absolute bottom-3 right-3 w-[46%] min-w-[170px] max-w-[240px] sm:bottom-5 sm:right-5">
              <Mini title="Execução Multi-Plataforma" className="bg-[#06122a]/90 backdrop-blur">
                <ul className="space-y-1.5">
                  {executions.slice(0, 6).map(([id, name]) => (
                    <li key={id} className="flex items-center gap-1.5 text-[10px] text-slate-100">
                      <BrandMark id={id} size={16} />
                      <span className="flex-1 truncate">{name}</span>
                      <span className="flex items-center gap-1 text-[9px] text-emerald-400"><Dot /> Executado</span>
                    </li>
                  ))}
                </ul>
              </Mini>
            </div>
            <div className="absolute bottom-3 left-3 grid grid-cols-3 gap-3 rounded-xl border border-sky-400/20 bg-[#06122a]/90 px-3 py-2 backdrop-blur sm:bottom-5 sm:left-5">
              {[["Trades Hoje", "73"], ["Win Rate", "67.6%"], ["Profit Factor", "2.39"]].map(([k, v]) => (
                <p key={k} className="text-[9px] leading-tight text-slate-400">{k}<strong className="block text-[15px] text-white">{v}</strong></p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-3">
          {right.map((b, i) => (
            <SideCard key={b.title} {...b} delay={i * 50} />
          ))}
        </div>
      </div>

      <Reveal className="mt-6">
        <ul className="lp-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-0 lg:p-0">
          {kpis.map((k, i) => (
            <li key={k.title} className={`flex items-center gap-3.5 lg:p-5 ${i > 0 ? "lg:border-l lg:border-sky-400/15" : ""}`}>
              <IconTile name={k.icon} tone={k.tone} size={50} />
              <div className="min-w-0">
                <p className="text-2xl font-extrabold leading-none text-white">{k.count ? <CountUp {...k.count} /> : k.label}</p>
                <p className="mt-1 text-[13px] font-semibold text-white">{k.title}</p>
                <p className="text-[11px] text-slate-400">{k.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <CtaRow className="mt-8" />
    </Block>
  );
}
