import { Icon } from "../Icons";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Grad, Head, Lines, Mini, SmallBtn, Stat, Strip, Tabs, walk } from "./parts";
import { IconTile, Toggle } from "./ui";

const kpis = [
  { icon: "analytics", tone: "blue" as const, label: "Total de Trades", value: "167", note: "+12.5%", noteTone: "text-emerald-400" },
  { icon: "trophy", tone: "gold" as const, label: "Win Rate", value: "52.69%", note: "88 ganhos / 79 perdas", noteTone: "text-slate-400" },
  { icon: "target", tone: "purple" as const, label: "Profit Factor", value: "2.39", note: "Lucro / Perda", noteTone: "text-slate-400" },
  { icon: "dollar", tone: "green" as const, label: "Lucro Líquido", value: "$4,187.50", note: "+418.75%", noteTone: "text-emerald-400" },
  { icon: "trendDown", tone: "red" as const, label: "Máx. Drawdown", value: "-12.10%", note: "-$1,210.00", noteTone: "text-rose-400" },
  { icon: "target", tone: "purple" as const, label: "R-Múltiplo", value: "+70.17R", note: "0.42R por trade", noteTone: "text-slate-400" },
];

const channels = [
  ["KIM GOLD SECRET", "120.4K inscritos", true],
  ["GOLD SIGNALS", "85.1K inscritos", true],
  ["TRADER ZONE", "42.7K inscritos", false],
  ["FX PREMIUM", "98.7K inscritos", true],
] as const;

const trades = [
  ["2026-08-29 14:35", "XAUUSD", "BUY", "3627.50", "3642.50", "0.01", "150", "+$150.00", "+3.00R"],
  ["2026-08-29 10:12", "XAUUSD", "SELL", "3635.20", "3628.20", "0.01", "70", "+$70.00", "+1.40R"],
  ["2026-08-28 16:21", "XAUUSD", "BUY", "3620.10", "3610.10", "0.01", "-100", "-$100.00", "-2.00R"],
  ["2026-08-28 11:05", "US100", "BUY", "19520.5", "19560.5", "0.01", "40", "+$40.00", "+0.80R"],
  ["2026-08-27 15:42", "XAUUSD", "SELL", "3638.70", "3632.50", "0.01", "62", "+$62.00", "+1.24R"],
];

const monthly = [
  ["Jun/26", "27", "61.1%", "+1,225.00", "+16.50R"],
  ["Jul/26", "45", "48.9%", "+777.50", "+14.80R"],
  ["Ago/26", "73", "52.1%", "+1,392.50", "+27.22R"],
  ["Total", "167", "52.69%", "+4,187.50", "+70.17R"],
];

const assets = [
  ["XAUUSD", "142", "53.5%", "+3,850.00", 91.9],
  ["US100", "12", "50.0%", "+210.00", 5.0],
  ["US500", "8", "37.5%", "+127.50", 3.0],
] as const;

const detail = [
  ["trendUp", "blue", "Expectativa por Trade", "+0.42R", "text-emerald-400"],
  ["growth", "green", "Média de Ganho", "+1.85R", "text-emerald-400"],
  ["trendDown", "red", "Média de Perda", "-1.20R", "text-rose-400"],
  ["trophy", "gold", "Melhor Sequência", "12 trades", "text-white"],
  ["alert", "red", "Pior Sequência", "6 trades", "text-white"],
  ["analytics", "green", "Fator de Recuperação", "3.46", "text-emerald-400"],
] as const;

export function BacktestSection() {
  const equity = walk(21, 46, 0.9, 5, 5);
  return (
    <Block id="backtest" labelledBy="backtest-title">
      <Head
        id="backtest-title"
        eyebrow="Backtest e análise"
        title={
          <>
            Teste seus sinais com dados <Grad>reais antes de operar</Grad>
          </>
        }
        description="O Copytrix permite que você faça backtest dos sinais do Telegram, analise resultados detalhados e valide suas estratégias com dados reais de mercado, antes de executar nas suas contas."
      />

      <div className="grid gap-4 xl:grid-cols-[290px_minmax(0,1fr)]">
        <Reveal>
          <div className="flex h-full flex-col gap-3">
            <section aria-label="Fonte dos sinais" className="lp-card p-3.5">
              <h3 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="telegram" tone="blue" size={32} /> Fonte dos Sinais</h3>
              <p className="-mt-2 mb-2 pl-10 text-[10px] text-slate-400">Use seus próprios canais do Telegram</p>
              <ul className="space-y-1.5">
                {channels.map(([n, s, on]) => (
                  <li key={n} className="flex items-center gap-2.5 rounded-lg border border-sky-400/10 bg-[#07132a] p-2">
                    <IconTile name="telegram" tone="blue" size={30} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-semibold text-white">{n}</span>
                      <span className="block text-[9px] text-slate-400">{s}</span>
                    </span>
                    <Toggle on={on} tone="green" />
                  </li>
                ))}
              </ul>
              <SmallBtn className="mt-3 w-full !py-2.5 !text-[12px]"><Icon name="plus" size={13} /> Adicionar Canal</SmallBtn>
            </section>

            <section aria-label="Período do backtest" className="lp-card p-3.5">
              <h3 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="calendar" tone="blue" size={32} /> Período do Backtest</h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-200">
                <span className="flex-1 rounded-lg border border-sky-400/20 bg-[#050e22] px-3 py-2">01/06/2026</span>
                <Icon name="arrowRight" size={13} />
                <span className="flex flex-1 items-center justify-between rounded-lg border border-sky-400/20 bg-[#050e22] px-3 py-2">31/08/2026 <Icon name="calendar" size={12} /></span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[10px] font-medium" aria-hidden>
                {["7 dias", "30 dias", "3 meses", "6 meses", "1 ano", "Personalizado"].map((p, i) => (
                  <span key={p} className={`rounded-md px-1 py-1.5 ${i === 2 ? "bg-sky-500 text-white" : "border border-sky-400/15 bg-[#07132a] text-slate-300"}`}>{p}</span>
                ))}
              </div>
            </section>

            <section aria-label="Configurações de simulação" className="lp-card p-3.5">
              <h3 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="settings" tone="blue" size={32} /> Configurações de Simulação</h3>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                {[["Depósito Inicial (USD)", "1,000"], ["Tamanho do Lote", "0.01"], ["Alavancagem", "1:100"], ["Spread (pips)", "0.50"]].map(([k, v]) => (
                  <label key={k} className="block">
                    {k}
                    <span className="mt-1 block rounded-lg border border-sky-400/20 bg-[#050e22] px-3 py-2 text-[12px] text-white">{v}</span>
                  </label>
                ))}
                <label className="col-span-2 block">
                  Comissão (USD)
                  <span className="mt-1 block rounded-lg border border-sky-400/20 bg-[#050e22] px-3 py-2 text-[12px] text-white">0.00</span>
                </label>
              </div>
              <SmallBtn className="mt-3 w-full !py-2.5 !text-[12px]"><Icon name="chevron" size={13} /> Iniciar Backtest</SmallBtn>
            </section>
          </div>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-4">
          <Reveal>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 min-[1500px]:grid-cols-6">
              {kpis.map((k) => (
                <li key={k.label} className="lp-card flex items-center gap-2.5 p-3">
                  <IconTile name={k.icon} tone={k.tone} size={38} />
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-slate-400">{k.label}</p>
                    <p className="text-[17px] font-extrabold leading-tight text-white">{k.value}</p>
                    <p className={`truncate text-[9px] ${k.noteTone}`}>{k.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid min-w-0 gap-4 min-[1500px]:grid-cols-[minmax(0,1fr)_340px]">
            <div className="flex min-w-0 flex-col gap-4">
              <Reveal>
                <section aria-label="Curva de equidade" className="lp-card p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <Tabs items={["Curva de Equidade", "Lucro/Prejuízo", "Drawdown", "Distribuição", "Analytics"]} />
                    <Tabs items={["Saldo", "Lucro", "R-Múltiplo"]} />
                  </div>
                  <div className="relative">
                    <div className="flex gap-2">
                      <div className="flex flex-col justify-between py-1 text-[9px] text-slate-400" aria-hidden>
                        {["6,000", "4,000", "2,000", "0", "-2,000"].map((l) => <span key={l}>{l}</span>)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Lines id="bt-eq" w={640} h={210} grid={4} series={[{ points: equity, color: "#12d99e", area: true }]} />
                        <div className="mt-1 flex justify-between text-[9px] text-slate-400" aria-hidden>
                          {["01/06", "15/06", "01/07", "15/07", "01/08", "15/08", "31/08"].map((l) => <span key={l}>{l}</span>)}
                        </div>
                      </div>
                    </div>
                    <span className="absolute right-2 top-1 rounded-lg border border-sky-400/30 bg-[#07132a] px-2.5 py-1 text-[10px] leading-tight text-slate-300">
                      Equity Final
                      <strong className="block text-[12px] text-white">$5,187.50</strong>
                    </span>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={80}>
                <section aria-label="Histórico de trades" className="lp-card p-4">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <h3 className="mr-1 flex items-center gap-2 text-[14px] font-bold text-white"><Icon name="fileText" size={16} /> Histórico de Trades</h3>
                    <Tabs items={["Todos (167)", "Win (88)", "Loss (79)"]} />
                    <span className="ml-auto flex items-center gap-1.5 rounded-lg border border-sky-400/15 bg-[#050e22] px-3 py-1.5 text-[10px] text-slate-400"><Icon name="search" size={11} /> Buscar trades...</span>
                    <span className="flex items-center gap-1.5 rounded-lg border border-sky-400/20 px-3 py-1.5 text-[10px] text-slate-200"><Icon name="download" size={11} /> Exportar</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-[11px]">
                      <thead className="text-slate-400">
                        <tr className="border-b border-sky-400/10">{["Data/Hora", "Ativo", "Direção", "Entrada", "Saída", "Lote", "Pips", "Lucro (USD)", "R"].map((h) => <th key={h} className="px-2 py-2 font-medium">{h}</th>)}</tr>
                      </thead>
                      <tbody className="text-slate-100">
                        {trades.map((t) => {
                          const win = t[7].startsWith("+");
                          return (
                            <tr key={t[0]} className="border-b border-sky-400/10 last:border-0">
                              <td className="px-2 py-2">{t[0]}</td>
                              <td className="px-2 py-2">{t[1]}</td>
                              <td className={`px-2 py-2 font-semibold ${t[2] === "BUY" ? "text-emerald-400" : "text-rose-400"}`}>{t[2]}</td>
                              <td className="px-2 py-2">{t[3]}</td>
                              <td className="px-2 py-2">{t[4]}</td>
                              <td className="px-2 py-2">{t[5]}</td>
                              <td className={`px-2 py-2 ${win ? "text-emerald-400" : "text-rose-400"}`}>{t[6]}</td>
                              <td className={`px-2 py-2 font-semibold ${win ? "text-emerald-400" : "text-rose-400"}`}>{t[7]}</td>
                              <td className={`px-2 py-2 ${win ? "text-emerald-400" : "text-rose-400"}`}>{t[8]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <Reveal delay={60}>
                <section aria-label="Estatísticas por mês" className="lp-card p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="calendar" tone="blue" size={30} /> Estatísticas por Mês</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[300px] text-left text-[10.5px]">
                      <thead className="text-slate-400"><tr>{["Mês", "Trades", "Win Rate", "Lucro (USD)", "R-Múltiplo"].map((h) => <th key={h} className="py-1.5 pr-2 font-medium">{h}</th>)}</tr></thead>
                      <tbody className="text-slate-100">
                        {monthly.map((m, i) => (
                          <tr key={m[0]} className={`border-t border-sky-400/10 ${i === 3 ? "font-bold" : ""}`}>
                            <td className="py-1.5 pr-2">{m[0]}</td><td className="pr-2">{m[1]}</td><td className="pr-2">{m[2]}</td><td className="pr-2 text-emerald-400">{m[3]}</td><td className="text-emerald-400">{m[4]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={120}>
                <section aria-label="Performance por ativo" className="lp-card p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="analytics" tone="blue" size={30} /> Performance por Ativo</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[300px] text-left text-[10.5px]">
                      <thead className="text-slate-400"><tr>{["Ativo", "Trades", "Win Rate", "Lucro (USD)", "% do Total"].map((h) => <th key={h} className="py-1.5 pr-2 font-medium">{h}</th>)}</tr></thead>
                      <tbody className="text-slate-100">
                        {assets.map(([a, t, w, p, pct], i) => (
                          <tr key={a} className="border-t border-sky-400/10">
                            <td className="py-1.5 pr-2">{a}</td><td className="pr-2">{t}</td><td className="pr-2">{w}</td><td className="pr-2 text-emerald-400">{p}</td>
                            <td className="min-w-[90px]"><span className="flex items-center gap-1.5"><span className="h-1.5 flex-1 rounded-full bg-sky-400/15"><span className="lp-barh block h-full rounded-full bg-sky-500" style={{ width: `${pct}%`, "--i": i } as React.CSSProperties} /></span>{pct}%</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </Reveal>

              <Reveal delay={180}>
                <section aria-label="Análise detalhada" className="lp-card p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-[14px] font-bold text-white"><IconTile name="fileText" tone="purple" size={30} /> Análise Detalhada</h3>
                  <Tabs items={["Expectativa", "Horários", "Dias da Semana", "Duração"]} className="mb-3" />
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-3">
                    {detail.map(([icon, tone, label, value, color]) => (
                      <li key={label} className="flex items-center gap-2">
                        <IconTile name={icon} tone={tone} size={30} />
                        <Stat label={label} value={<span className={`text-[13px] ${color}`}>{value}</span>} />
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <Strip
        items={[
          { icon: "barsFilled", tone: "purple", title: "Dados Reais de Mercado", text: "Backtest com dados históricos precisos das principais corretoras." },
          { icon: "filter", tone: "green", title: "Filtros Avançados", text: "Teste com diferentes spreads, horários, filtros e regras de gerenciamento." },
          { icon: "analytics", tone: "blue", title: "Análises Completas", text: "Curva de equidade, drawdown, estatísticas e relatório detalhado de cada trade." },
          { icon: "brain", tone: "purple", title: "Valide suas Estratégias", text: "Identifique o que realmente funciona antes de operar com dinheiro real." },
        ]}
      />
      <CtaRow className="mt-8" />
    </Block>
  );
}
