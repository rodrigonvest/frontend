import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { BrandMark, type BrandId } from "./brands";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { Dot, Mini } from "./parts";
import { APP_HREF, CheckDot, CtaButton, Eyebrow, IconTile } from "./ui";

const script = Dancing_Script({ subsets: ["latin"], weight: ["600"], display: "swap" });

const chips = [
  { icon: "pulse", tone: "blue" as const, text: "Setup em minutos" },
  { icon: "shieldCheck", tone: "green" as const, text: "Sem complicação" },
  { icon: "layers", tone: "blue" as const, text: "Funciona em múltiplas contas" },
  { icon: "barsFilled", tone: "purple" as const, text: "Mais tempo para o que importa" },
];

const executions: [BrandId, string][] = [
  ["mt5", "MetaTrader 5"],
  ["mt4", "MetaTrader 4"],
  ["dxtrade", "DXtrade"],
  ["tradelocker", "TradeLocker"],
  ["ninja", "NinjaTrader"],
  ["ctrader", "cTrader"],
  ["oanda", "OANDA"],
  ["binance", "Binance Futures"],
];

const kpis = [
  { icon: "accounts", tone: "blue" as const, count: { to: 10000, group: true, suffix: "+" }, title: "Traders no mundo", text: "Confiam no Copytrix" },
  { icon: "trophy", tone: "gold" as const, count: { to: 4.9, decimals: 1, suffix: "/5" }, title: "Avaliação dos usuários", text: "Com base em +1.200 reviews" },
  { icon: "barsFilled", tone: "blue" as const, count: { to: 38, suffix: "+" }, title: "Integrações", text: "Com as principais plataformas" },
  { icon: "shieldCheck", tone: "green" as const, count: { to: 99.9, decimals: 1, suffix: "%" }, title: "Uptime e estabilidade", text: "Operação contínua e segura" },
];

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>Comece agora</Eyebrow>
          <h2 id="final-cta-title" className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[58px]">
            Transforme sinais <span className="lp-grad">em resultados</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            Junte-se a milhares de traders que já automatizam seus sinais do Telegram com o Copytrix e operam com mais segurança, praticidade e performance.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {chips.map((c) => (
              <li key={c.text} className="flex items-center gap-3.5 rounded-xl p-2">
                <IconTile name={c.icon} tone={c.tone} size={54} />
                <span className="text-[15px] font-medium leading-snug text-slate-100">{c.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="mt-8">
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-sky-400/20 bg-[#040b1d] sm:min-h-[560px]">
            <Image src="/images/landing/trader-win.png" alt="Trader comemorando os resultados no dashboard do Copytrix" fill sizes="(min-width: 1360px) 1360px, 100vw" className="object-cover object-center" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#040b1d] via-[#040b1d]/20 to-[#040b1d]/50" />
            <p aria-hidden className={`${script.className} absolute left-5 top-6 hidden text-4xl font-semibold leading-[1.15] text-sky-400/90 md:block lg:left-10 lg:text-5xl`}>
              Automatize
              <br />
              Escale
              <br />
              Conquiste
              <br />
              Mais
            </p>
            <div className="absolute left-3 top-3 hidden w-[240px] md:left-[22%] md:top-auto md:bottom-[96px] md:block lg:left-[18%]">
              <Mini title="Olá, Trader!" className="bg-[#06122a]/90 backdrop-blur">
                <p className="-mt-1.5 mb-2 text-[10px] text-slate-400">Seus sinais, automatizados e em tempo real.</p>
                <div className="grid grid-cols-3 gap-2 text-[9px] text-slate-400">
                  <p>Operações Hoje<strong className="block text-[14px] text-white">24</strong></p>
                  <p>Lucro Hoje<strong className="block text-[13px] text-emerald-400">+$287.50</strong></p>
                  <p>Win Rate<strong className="block text-[14px] text-white">68.3%</strong></p>
                </div>
              </Mini>
            </div>
            <div className="absolute right-3 top-3 w-[200px] sm:right-6 sm:top-6 sm:w-[240px]">
              <Mini title="Execução em Tempo Real" className="bg-[#06122a]/90 backdrop-blur">
                <ul className="space-y-1.5">
                  {executions.map(([id, name]) => (
                    <li key={id} className="flex items-center gap-1.5 text-[10px] text-slate-100">
                      <BrandMark id={id} size={16} />
                      <span className="flex-1 truncate">{name}</span>
                      <span className="flex items-center gap-1 text-[9px] text-emerald-400"><Dot /> Executando</span>
                    </li>
                  ))}
                </ul>
              </Mini>
            </div>
            <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 px-4">
              <CtaButton href={APP_HREF} arrow>
                Comece agora grátis
              </CtaButton>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-sm text-slate-200">
                {["Sem cartão de crédito", "Ativação imediata", "Suporte especializado"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckDot tone="blue" /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <ul className="lp-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-0 lg:p-0">
            {kpis.map((k, i) => (
              <li key={k.title} className={`flex items-center gap-3.5 lg:p-5 ${i > 0 ? "lg:border-l lg:border-sky-400/15" : ""}`}>
                <IconTile name={k.icon} tone={k.tone} size={52} />
                <div className="min-w-0">
                  <p className="text-[26px] font-extrabold leading-none text-sky-300"><CountUp {...k.count} /></p>
                  <p className="mt-1 text-[14px] font-semibold text-white">{k.title}</p>
                  <p className="text-[12px] text-slate-400">{k.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
