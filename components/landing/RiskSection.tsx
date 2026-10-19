import { Icon } from "../Icons";
import { Reveal } from "./Reveal";
import { Bars, Block, CtaRow, Grad, Head, Pill, SideCard, Strip, Tabs, ToggleRow } from "./parts";
import { Donut, IconTile } from "./ui";

const side = [
  { icon: "shield", tone: "blue" as const, title: "Controle Total do Risco", text: "Defina exatamente quanto você quer arriscar em cada operação." },
  { icon: "settings", tone: "purple" as const, title: "Regras Personalizadas", text: "Configure Stop Loss, Take Profit, Break Even, Trailing e muito mais." },
  { icon: "clock", tone: "green" as const, title: "Limites de Perda", text: "Defina limites diários, semanais e mensais para proteger seu capital." },
  { icon: "settings", tone: "blue" as const, title: "Gestão por Conta", text: "Regras específicas para cada conta e plataforma." },
  { icon: "barsFilled", tone: "gold" as const, title: "Ajuste de Lote Automático", text: "Cálculo de lote baseado no seu risco, stop loss e saldo da conta." },
  { icon: "pulse", tone: "purple" as const, title: "Execução Inteligente", text: "Evita operações fora das suas regras e bloqueia sinais de alto risco." },
];

const rules: [string, string, string, boolean, string][] = [
  ["trendUp", "blue", "Mover SL para Break Even", true, "20 pips"],
  ["pulse", "blue", "Trailing Stop", true, "30 pips"],
  ["target", "purple", "Fechar Parcial no TP1", true, "50 %"],
  ["target", "green", "Fechar no TP2", true, "25 %"],
  ["target", "gold", "Fechar no TP3", true, "25 %"],
];

const summary = [
  ["Saldo da Conta", "$10,000.00", "", "text-white"],
  ["Risco por Operação", "0.50%", "$50.00", "text-emerald-400"],
  ["Limite de Perda Diário", "3.00%", "$300.00", "text-emerald-400"],
  ["Limite de Perda Mensal", "6.00%", "$600.00", "text-emerald-400"],
];

const after50 = [
  { icon: "trendUp", tone: "green" as const, label: "Cenário de Ganhos (70% Win Rate)", value: "+$2,980.00", pct: "+29.8%", color: "text-emerald-400" },
  { icon: "minus", tone: "blue" as const, label: "Cenário Realista (52% Win Rate)", value: "+$787.50", pct: "+7.9%", color: "text-sky-300" },
  { icon: "trendDown", tone: "red" as const, label: "Cenário de Perdas (30% Win Rate)", value: "-$1,250.00", pct: "-12.5%", color: "text-rose-400" },
];

const bottom = [
  { icon: "shieldCheck", tone: "green" as const, title: "Stop Loss Automático", text: "Protege seu capital em todas as operações." },
  { icon: "target", tone: "purple" as const, title: "Take Profit Personalizado", text: "Defina múltiplos alvos de lucro." },
  { icon: "settings", tone: "blue" as const, title: "Break Even Inteligente", text: "Move o stop para o ponto de equilíbrio automaticamente." },
  { icon: "trendUp", tone: "gold" as const, title: "Trailing Stop", text: "Acompanhe a tendência e proteja seus lucros." },
  { icon: "filter", tone: "purple" as const, title: "Filtros de Risco", text: "Evita operações fora dos seus critérios." },
  { icon: "clock", tone: "red" as const, title: "Limites de Perda", text: "Controle diário, semanal e mensal." },
];

const simulator = Array.from({ length: 50 }, (_, i) => (i % 3 === 2 ? -0.28 : 0.2 + i * 0.012));

export function RiskSection() {
  return (
    <Block id="risco" labelledBy="risk-title">
      <Head
        id="risk-title"
        eyebrow="Risk Management"
        title={
          <>
            Proteja seu capital e opere com <Grad>mais consistência</Grad>
          </>
        }
        description="O Copytrix oferece um sistema completo de gerenciamento de risco para você operar com mais segurança, controlando cada detalhe das suas operações."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,.62fr)_minmax(0,1.9fr)_minmax(0,.78fr)]">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {side.map((s, i) => (
            <SideCard key={s.title} {...s} delay={i * 50} />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <Reveal>
            <section aria-label="Configuração de risco" className="lp-card p-4">
              <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-white"><IconTile name="settings" tone="blue" size={34} /> Configuração de Risco</h3>
              <Tabs items={["Geral", "Lote e Alavancagem", "Stops e Targets", "Filtros", "Limites", "Horários", "Avançado"]} className="mb-3" />
              <div className="grid gap-3 md:grid-cols-[1fr_1.1fr]">
                <div className="space-y-2.5 rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3 text-[11px] text-slate-300">
                  {[["Tamanho do Lote", "Por % de risco", true], ["Risco por operação", "0.50  %", false], ["Saldo da conta (USD)", "10,000.00", false], ["Stop Loss (pips)", "50", false]].map(([k, v, caret]) => (
                    <div key={String(k)} className="grid grid-cols-[1fr_1.2fr] items-center gap-2">
                      {k}
                      <span className="flex items-center justify-between rounded-lg border border-sky-400/20 bg-[#050e22] px-3 py-2 text-white">{v}{caret && <Icon name="chevronDown" size={12} />}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-[1fr_1.2fr] items-center gap-2">
                    Lote calculado
                    <span className="flex items-center justify-between rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-base font-bold text-emerald-400">0.10 <Icon name="clipboard" size={14} /></span>
                  </div>
                </div>
                <div className="rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
                  <p className="mb-2 text-[12px] font-semibold text-white">Regras de Execução</p>
                  <ul className="space-y-1.5">
                    {rules.map(([icon, tone, label, on, val]) => (
                      <li key={label} className="grid grid-cols-[1fr_auto] items-center gap-2 text-[11px] text-slate-100">
                        <span className="flex items-center gap-2"><IconTile name={icon} tone={tone as "blue"} size={26} />{label}</span>
                        <span className="flex items-center gap-2">
                          <ToggleSwitch on={on} />
                          <span className="min-w-[58px] rounded-md border border-sky-400/20 bg-[#050e22] px-2 py-1 text-center text-slate-200">{val}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal delay={80}>
            <section aria-label="Simulador de risco" className="lp-card p-4">
              <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-white"><IconTile name="clipboard" tone="blue" size={34} /> Simulador de Risco</h3>
                <Tabs items={["Visualização", "Tabela", "Gráfico"]} />
              </header>
              <div className="grid gap-3 md:grid-cols-[.8fr_1.6fr]">
                <div className="space-y-2.5 text-[10px] text-slate-400">
                  {[["Saldo da Conta (USD)", "10,000.00"], ["Risco por Operação", "0.50  %"], ["Stop Loss (pips)", "50"]].map(([k, v]) => (
                    <label key={k} className="block">
                      {k}
                      <span className="mt-1 block rounded-lg border border-sky-400/20 bg-[#050e22] px-3 py-2 text-[12px] text-white">{v}</span>
                    </label>
                  ))}
                  <p>Resultado por Operação</p>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-2 text-emerald-400"><strong className="block text-[13px]">$50.00</strong>1R (Take Profit)</span>
                    <span className="rounded-lg border border-rose-400/40 bg-rose-500/10 p-2 text-rose-400"><strong className="block text-[13px]">-$50.00</strong>1R (Stop Loss)</span>
                  </div>
                </div>
                <div className="rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
                  <p className="text-[11px] font-semibold text-white">Evolução do Capital (Exemplo)</p>
                  <p className="mb-2 mt-1 flex flex-wrap gap-3 text-[9px] text-slate-300">
                    <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-emerald-400" /> Cenário de Ganhos</span>
                    <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-rose-400" /> Cenário de Perdas</span>
                    <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-sky-400" /> Cenário Realista</span>
                  </p>
                  <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-[8px] text-slate-400" aria-hidden>
                      {["13,000", "12,000", "11,000", "10,000", "9,000", "8,000"].map((l) => <span key={l}>{l}</span>)}
                    </div>
                    <Bars values={simulator} className="h-36 flex-1" />
                  </div>
                  <div className="mt-1 flex justify-between pl-10 text-[8px] text-slate-400" aria-hidden>{[0, 10, 20, 30, 40, 50].map((l) => <span key={l}>{l}</span>)}</div>
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <Reveal delay={60}>
            <section aria-label="Resumo do risco da conta" className="lp-card p-4">
              <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="shieldCheck" tone="green" size={30} /> Resumo do Risco da Conta</h3>
                <Pill>Protegido</Pill>
              </header>
              <dl className="divide-y divide-sky-400/10 rounded-xl border border-sky-400/15 bg-[#06122a]/80 px-3 text-[11px]">
                {summary.map(([k, v, amt, c]) => (
                  <div key={k} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2">
                    <dt className="text-slate-300">{k}</dt>
                    <dd className={`text-[13px] font-bold ${c}`}>{v}</dd>
                    <dd className="min-w-[48px] text-right text-slate-300">{amt}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section aria-label="Exposição atual" className="lp-card p-4">
              <h3 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="analytics" tone="blue" size={30} /> Exposição Atual</h3>
              <div className="flex items-center gap-3">
                <Donut percent={12.5} size={104}>
                  <span className="text-lg font-extrabold leading-none text-white">12.5%</span>
                  <span className="text-[9px] text-slate-300">do limite diário</span>
                </Donut>
                <dl className="min-w-0 flex-1 space-y-2 text-[10px]">
                  {[["Risco Atual (USD)", "$125.00"], ["Limite Diário (USD)", "$300.00"], ["Operações Abertas", "3"]].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-2"><dt className="text-slate-300">{k}</dt><dd className="font-semibold text-emerald-400">{v}</dd></div>
                  ))}
                  <span className="block h-1.5 rounded-full bg-sky-400/15"><span className="lp-barh block h-full w-[42%] rounded-full bg-emerald-500" /></span>
                </dl>
              </div>
            </section>
          </Reveal>

          <Reveal delay={180}>
            <section aria-label="Resultados após 50 operações" className="lp-card p-4">
              <h3 className="mb-3 text-[13px] font-bold text-white">Resultados Após 50 Operações</h3>
              <ul className="space-y-2">
                {after50.map((a) => (
                  <li key={a.label} className="flex items-center gap-2.5 rounded-lg border border-sky-400/10 bg-[#06122a]/80 p-2">
                    <IconTile name={a.icon} tone={a.tone} size={32} />
                    <span className="min-w-0 flex-1 text-[10px] leading-tight text-slate-300">{a.label}<strong className={`block text-[14px] ${a.color}`}>{a.value}</strong></span>
                    <span className={`text-[12px] font-bold ${a.color}`}>{a.pct}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>

      <Strip items={bottom} />
      <CtaRow className="mt-8" />
    </Block>
  );
}

function ToggleSwitch({ on }: { on: boolean }) {
  return (
    <span aria-hidden className={`relative inline-block h-[18px] w-8 shrink-0 rounded-full ${on ? "bg-sky-500" : "bg-slate-600/70"}`}>
      <span className={`absolute top-0.5 size-3.5 rounded-full bg-white shadow ${on ? "left-4" : "left-0.5"}`} />
    </span>
  );
}
