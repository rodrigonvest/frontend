import { Icon } from "../Icons";
import { BrandMark } from "./brands";
import { Reveal } from "./Reveal";
import { CheckDot, CtaButton, Section, SectionHeader, StatusPill, Toggle, APP_HREF } from "./ui";

const stepTone = [
  "border-sky-400/60 text-sky-300 shadow-[0_0_24px_-4px_rgba(30,160,255,.7)]",
  "border-violet-400/60 text-violet-300 shadow-[0_0_24px_-4px_rgba(160,90,255,.7)]",
  "border-emerald-400/60 text-emerald-300 shadow-[0_0_24px_-4px_rgba(30,220,160,.7)]",
  "border-fuchsia-400/60 text-fuchsia-300 shadow-[0_0_24px_-4px_rgba(220,90,255,.7)]",
];

function StepHead({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full border-2 bg-[#06122a] text-lg font-extrabold ${stepTone[n - 1]}`}>{n}</span>
      <div className="min-w-0">
        <h3 className="text-[17px] font-bold text-white">{title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-300/90">{text}</p>
      </div>
    </div>
  );
}

const channels = [
  { name: "KIM GOLD SECRET", subs: "120.4K inscritos", on: true },
  { name: "GOLD SIGNALS", subs: "85.1K inscritos", on: true },
  { name: "TRADER ZONE", subs: "42.7K inscritos", on: true },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" labelledBy="how-title" className="scroll-mt-20">
      <SectionHeader
        id="how-title"
        eyebrow="Como funciona"
        title="Do sinal no Telegram ao"
        accent="resultado na sua conta"
        description="O Copytrix simplifica todo o processo. Conecte, configure e deixe a plataforma copiar, filtrar e executar os sinais automaticamente nas suas contas, com total controle e segurança."
      />

      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Reveal as="li">
          <div className="lp-card h-full p-5">
            <span aria-hidden className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 text-sky-400 drop-shadow-[0_0_8px_rgba(56,170,255,.8)] xl:block"><Icon name="chevron" size={22} /></span>
            <StepHead n={1} title="Conecte suas fontes" text="Conecte seus canais do Telegram e escolha quais sinais copiar." />
            <div className="mt-5 rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
              <div className="mb-2.5 flex items-center justify-between text-[13px] font-semibold text-white">
                <span className="flex items-center gap-2">
                  <BrandMark id="telegram" size={22} /> Canais Telegram
                </span>
                <span className="rounded-md bg-sky-500 px-2 py-1 text-[10px] font-bold">+ Adicionar Canal</span>
              </div>
              <ul className="space-y-2">
                {channels.map((c) => (
                  <li key={c.name} className="flex items-center gap-2.5 rounded-lg border border-sky-400/10 bg-[#050e22] p-2">
                    <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                      <Icon name="crown" size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-white">{c.name}</span>
                      <span className="block text-[10px] text-slate-400">{c.subs}</span>
                    </span>
                    <Toggle on={c.on} tone="green" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal as="li" delay={90}>
          <div className="lp-card h-full p-5">
            <span aria-hidden className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 text-sky-400 drop-shadow-[0_0_8px_rgba(56,170,255,.8)] xl:block"><Icon name="chevron" size={22} /></span>
            <StepHead n={2} title="Configure e filtre" text="Defina regras, gerenciamento de risco e filtros avançados para operar do seu jeito." />
            <div className="mt-5 rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
              <p className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                <Icon name="settings" size={15} /> Configuração do Sistema
              </p>
              <div className="mb-3 flex gap-1 text-[10px] font-semibold">
                {["Geral", "Risco", "Filtros", "Execução"].map((t, i) => (
                  <span key={t} className={`rounded-md px-2.5 py-1 ${i === 0 ? "bg-sky-500 text-white" : "bg-[#0a1c3d] text-slate-300"}`}>
                    {t}
                  </span>
                ))}
              </div>
              <dl className="space-y-2 text-xs">
                {[
                  ["Tamanho do Lote", "0.01"],
                  ["Risco por operação", "0.5%"],
                  ["Máx. de operações simultâneas", "3"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-2">
                    <dt className="text-slate-300">{k}</dt>
                    <dd className="rounded-md border border-sky-400/20 bg-[#050e22] px-3 py-1 font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-3 space-y-2 text-xs text-slate-200">
                {["Filtrar por Spread (máx. 0.60)", "Apenas horário de alta liquidez", "Mover SL para BE (+20 pips)"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Toggle /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal as="li" delay={180}>
          <div className="lp-card h-full p-5">
            <span aria-hidden className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 text-sky-400 drop-shadow-[0_0_8px_rgba(56,170,255,.8)] xl:block"><Icon name="chevron" size={22} /></span>
            <StepHead n={3} title="Copytrix processa com IA" text="Nossa IA interpreta, valida e executa os sinais com precisão e segurança." />
            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
              <div className="min-w-0 space-y-2 text-[9px] leading-snug text-slate-200">
                <p className="rounded-lg border border-sky-400/15 bg-[#050e22] p-2">
                  <span className="font-bold text-white">XAUUSD BUY</span>
                  <br />
                  Entry: 3627.50
                  <br />
                  SL: 3607.50
                  <br />
                  TP1: 3632.50
                </p>
                <p className="rounded-lg border border-sky-400/15 bg-[#050e22] p-2">
                  <span className="font-bold text-white">XAUUSD SELL</span>
                  <br />
                  Entry: 3645.20
                  <br />
                  SL: 3665.20
                </p>
              </div>
              <span aria-hidden className="lp-node flex size-12 items-center justify-center rounded-xl bg-[#08183a] text-sky-300">
                <Icon name="brain" size={26} />
              </span>
              <ul className="min-w-0 space-y-1.5 text-[10px] leading-tight text-slate-100">
                {["Lê o sinal", "Interpreta", "Valida regras", "Aplica filtros", "Executa ordem"].map((t) => (
                  <li key={t} className="flex items-center gap-1 rounded-md border border-sky-400/15 bg-[#050e22] px-1.5 py-1.5">
                    <CheckDot tone="blue" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal as="li" delay={270}>
          <div className="lp-card h-full p-5">
            <StepHead n={4} title="Execução nas suas contas" text="Os sinais são executados automaticamente nas plataformas e contas que você escolher." />
            <div className="mt-5 rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
              <p className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                <Icon name="pulse" size={15} /> Execução Multi-Plataforma
              </p>
              <ul className="space-y-1.5">
                {(["mt5", "mt4", "ninja", "tradelocker", "dxtrade"] as const).map((id) => (
                  <li key={id} className="flex items-center gap-2 rounded-lg border border-sky-400/10 bg-[#050e22] p-1.5 pr-2">
                    <BrandMark id={id} size={26} />
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-white">{id === "mt5" ? "MetaTrader 5" : id === "mt4" ? "MetaTrader 4" : id === "ninja" ? "NinjaTrader" : id === "tradelocker" ? "TradeLocker" : "DXtrade"}</span>
                    <StatusPill>Executando</StatusPill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </ol>

      <Reveal className="mt-8">
        <div className="lp-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-0">
          {[
            { icon: "pulse", title: "Automático e em tempo real", text: "Do sinal à execução em segundos." },
            { icon: "filter", title: "Com filtros inteligentes", text: "Evite sinais ruins e opere com mais qualidade." },
            { icon: "accounts", title: "Multi-contas e multi-plataformas", text: "Opere em várias contas e plataformas ao mesmo tempo." },
            { icon: "lock", title: "Totalmente seguro", text: "Seus dados e contas sempre protegidos." },
          ].map((b, i) => (
            <div key={b.title} className={`flex items-center gap-3.5 lg:p-5 ${i > 0 ? "lg:border-l lg:border-sky-400/15" : ""}`}>
              <span aria-hidden className="text-sky-400">
                <Icon name={b.icon} size={28} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{b.title}</p>
                <p className="text-xs text-slate-300/80">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10 flex flex-col items-center gap-4">
        <CtaButton href={APP_HREF} arrow>
          Comece agora grátis
        </CtaButton>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
          {["Teste grátis", "Sem cartão de crédito", "Configuração em minutos"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckDot tone="blue" /> {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
