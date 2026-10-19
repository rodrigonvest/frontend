import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { BrandMark, type BrandId } from "./brands";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Grad, Head, Strip } from "./parts";
import { CheckDot, IconTile } from "./ui";

const stepRing = ["border-sky-400/60 text-sky-300", "border-violet-400/60 text-violet-300", "border-emerald-400/60 text-emerald-300"];

function StepCard({ n, title, text, children, delay }: { n: number; title: string; text: string; children: ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <section aria-label={title} className="lp-card flex h-full flex-col gap-3 p-4">
        <span aria-hidden className="absolute -left-[13px] top-1/2 z-10 hidden -translate-y-1/2 text-sky-400 drop-shadow-[0_0_8px_rgba(56,170,255,.8)] xl:block">
          <Icon name="chevron" size={20} />
        </span>
        <header className="flex items-start gap-3">
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-[#06122a] text-base font-extrabold ${stepRing[n - 1]}`}>{n}</span>
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold leading-tight text-white">{title}</h3>
            <p className="mt-1 text-[12px] leading-snug text-slate-300/90">{text}</p>
          </div>
        </header>
        {children}
      </section>
    </Reveal>
  );
}

const parsed: { icon: string; tone: "gold" | "green" | "blue" | "red" | "cyan" | "purple"; label: string; value: string }[] = [
  { icon: "chart", tone: "gold", label: "Ativo", value: "XAUUSD" },
  { icon: "trendUp", tone: "green", label: "Direção", value: "BUY" },
  { icon: "target", tone: "blue", label: "Entrada", value: "3627.50" },
  { icon: "shield", tone: "red", label: "Stop Loss", value: "3607.50" },
  { icon: "target", tone: "green", label: "Take Profits", value: "3632.50 / 3637.50 / 3642.50" },
  { icon: "settings", tone: "purple", label: "Gerenciamento", value: "BE, Parcial, Fechar" },
];

const processing: { icon: string; tone: "purple" | "green" | "cyan" | "gold" | "blue"; title: string; text?: string }[] = [
  { icon: "brain", tone: "purple", title: "Valida o sinal com IA" },
  { icon: "filter", tone: "purple", title: "Aplica filtros avançados", text: "Spread, horário, volatilidade, etc." },
  { icon: "settings", tone: "cyan", title: "Calcula o tamanho do lote", text: "De acordo com seu risco" },
  { icon: "dollar", tone: "gold", title: "Aplica suas regras personalizadas", text: "SL, TP, BE, parcial, trailing" },
  { icon: "analytics", tone: "purple", title: "Verifica condições de mercado", text: "Preço, spread e volume" },
  { icon: "shieldCheck", tone: "blue", title: "Prepara a execução nas plataformas" },
];

const platforms: [BrandId, string][] = [
  ["mt5", "MetaTrader 5"],
  ["mt4", "MetaTrader 4"],
  ["ninja", "NinjaTrader"],
  ["tradelocker", "TradeLocker"],
  ["dxtrade", "DXtrade"],
  ["binance", "Binance Futures"],
  ["oanda", "OANDA"],
  ["matchtrader", "MatchTrader"],
];

const highlights = [
  { icon: "pulse", tone: "purple" as const, title: "Execução em segundos", text: "Do sinal à ordem em tempo real." },
  { icon: "shieldCheck", tone: "green" as const, title: "100% Automatizado", text: "Sem intervenção manual." },
  { icon: "settings", tone: "blue" as const, title: "Multi-plataforma", text: "Execute o mesmo sinal em várias contas." },
  { icon: "analytics", tone: "blue" as const, title: "Total controle", text: "Monitore tudo em tempo real no seu dashboard." },
];

export function Pipeline() {
  return (
    <Block id="fluxo" labelledBy="pipeline-title">
      <Head
        id="pipeline-title"
        eyebrow="Telegram → Trading"
        title={
          <>
            Do sinal no Telegram à <Grad>execução automática</Grad>
          </>
        }
        description="O Copytrix lê, interpreta e executa os sinais do Telegram nas suas contas e plataformas, em tempo real, com precisão, segurança e total controle."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.05fr_1fr_1fr_1.05fr_0.72fr]">
        <Reveal className="md:col-span-2 xl:col-span-1">
          <div className="grid h-full gap-4 sm:grid-cols-2 xl:grid-cols-1 xl:grid-rows-[auto_auto]">
            <div className="relative mx-auto w-full max-w-[320px] pt-6 sm:max-w-none xl:max-w-none">
              <span aria-hidden className="absolute -left-1 top-0 z-10 flex size-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-[0_0_40px_-4px_rgba(30,150,255,.9)]">
                <Icon name="telegram" size={28} />
              </span>
              <div className="lp-float rounded-[28px] border-2 border-sky-400/40 bg-[#050e22] p-3 shadow-[0_0_60px_-18px_rgba(30,140,255,.8)]">
                <div className="mb-3 flex items-center gap-2 border-b border-sky-400/10 pb-2 pl-8 text-white">
                  <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    <Icon name="crown" size={16} />
                  </span>
                  <span>
                    <span className="block text-[12px] font-bold leading-none">KIM GOLD SECRET</span>
                    <span className="text-[9px] text-slate-400">120.4K inscritos</span>
                  </span>
                </div>
                <div className="rounded-xl bg-[#0b1d3f] p-3">
                  <p className="text-[9px] font-semibold text-sky-300">KIM GOLD SECRET</p>
                  <p className="mt-1 text-lg font-extrabold leading-none text-white">XAUUSD BUY</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-200">
                    Entry: 3627.50
                    <br />
                    SL: 3607.50
                    <br />
                    TP1: 3632.50
                    <br />
                    TP2: 3637.50
                    <br />
                    TP3: 3642.50
                  </p>
                  <p className="mt-1 flex justify-end gap-2 text-[9px] text-slate-400">
                    <span className="flex items-center gap-1"><Icon name="eye" size={10} /> 4.2K</span> 14:35
                  </p>
                </div>
                <div className="mt-2 rounded-xl bg-[#0b1d3f] p-3">
                  <p className="text-[12px] font-bold text-white">Gerenciamento</p>
                  <ul className="mt-1 space-y-0.5 text-[11px] text-slate-200">
                    <li>• Mover SL para BE +20 pips</li>
                    <li>• Fechar 50% no TP2</li>
                    <li>• Fechar tudo no TP3</li>
                  </ul>
                  <p className="mt-1 flex justify-end gap-2 text-[9px] text-slate-400">
                    <span className="flex items-center gap-1"><Icon name="eye" size={10} /> 3.1K</span> 15:10
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-full border border-sky-400/15 bg-[#07132a] px-3 py-1.5 text-[10px] text-slate-400">
                  <Icon name="send" size={11} /> Transmitir mensagem...
                </div>
              </div>
            </div>
            <div className="lp-card self-end p-4">
              <h3 className="text-[14px] font-bold text-white">Qualquer formato de sinal</h3>
              <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[12px] text-slate-200">
                {["Texto", "Imagem", "Mensagem editada", "Gerenciamento (FECHAR, BE, PARCIAL)"].map((t, i) => (
                  <li key={t} className={`flex items-center gap-1.5 ${i === 3 ? "col-span-2" : ""}`}>
                    <CheckDot /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <StepCard n={1} title="Parser de Sinais" text="A IA interpreta o sinal em qualquer formato e extrai todas as informações." delay={80}>
          <ul className="space-y-2">
            {parsed.map((p) => (
              <li key={p.label} className="flex items-center gap-3 rounded-lg border border-sky-400/10 bg-[#06122a]/80 p-2">
                <IconTile name={p.icon} tone={p.tone} size={34} />
                <span className="min-w-0">
                  <span className="block text-[10px] text-slate-400">{p.label}</span>
                  <span className="block truncate text-[13px] font-semibold text-white">{p.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </StepCard>

        <StepCard n={2} title="Processamento Inteligente" text="O Copytrix aplica suas regras, filtros e gerenciamento de risco antes de executar." delay={160}>
          <ul className="space-y-2">
            {processing.map((p) => (
              <li key={p.title} className="flex items-center gap-3 rounded-lg border border-sky-400/10 bg-[#06122a]/80 p-2">
                <IconTile name={p.icon} tone={p.tone} size={34} />
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold leading-tight text-white">{p.title}</span>
                  {p.text && <span className="block text-[10px] text-slate-400">{p.text}</span>}
                </span>
              </li>
            ))}
          </ul>
        </StepCard>

        <StepCard n={3} title="Execução nas Plataformas" text="O sinal é executado automaticamente nas suas contas e plataformas configuradas." delay={240}>
          <ul className="space-y-1.5">
            {platforms.map(([id, name]) => (
              <li key={id} className="flex items-center gap-2 rounded-lg border border-sky-400/10 bg-[#06122a]/80 p-1.5 pr-2">
                <BrandMark id={id} size={26} />
                <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-white">{name}</span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> Executando
                </span>
                <CheckDot />
              </li>
            ))}
            <li className="flex items-center gap-2 rounded-lg border border-sky-400/10 bg-[#06122a]/80 p-2 text-[12px] text-slate-300">
              <Icon name="chevronDown" size={14} /> E muitas outras...
            </li>
          </ul>
        </StepCard>

        <div className="grid gap-3 sm:grid-cols-2 md:col-span-2 xl:col-span-1 xl:grid-cols-1">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 70}>
              <div className="lp-card lp-card-hover flex h-full items-center gap-3 p-4">
                <IconTile name={h.icon} tone={h.tone} size={42} />
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold leading-tight text-white">{h.title}</h3>
                  <p className="mt-1 text-[11.5px] leading-snug text-slate-300/90">{h.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Strip
        items={[
          { icon: "clock", title: "Processamento em tempo real", text: "Sinais interpretados e executados em segundos." },
          { icon: "brain", tone: "purple", title: "IA que entende qualquer formato", text: "Funciona com mensagens de texto, imagem e sinal editado." },
          { icon: "filter", tone: "cyan", title: "Filtros e regras avançadas", text: "Opere do seu jeito, com total flexibilidade." },
          { icon: "layers", tone: "purple", title: "Execute em múltiplas contas", text: "Copie um sinal para várias plataformas ao mesmo tempo." },
        ]}
      />
      <CtaRow className="mt-8" />
    </Block>
  );
}
