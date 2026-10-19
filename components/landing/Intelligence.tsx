import { Icon } from "../Icons";
import { BrandMark, type BrandId } from "./brands";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Dot, Grad, Head, Lines, Mini, Pill, SideCard, Stat, walk } from "./parts";
import { RobotArt } from "./Showcase";
import { CheckDot, Donut, IconTile } from "./ui";

const features = [
  { icon: "fileText", tone: "blue" as const, title: "Interpreta qualquer formato", text: "Texto, imagem e mensagem editada com alta precisão." },
  { icon: "brain", tone: "purple" as const, title: "Validação inteligente", text: "Confirma símbolo, direção, preço, SL/TP e contexto do mercado." },
  { icon: "filter", tone: "green" as const, title: "Aplica filtros avançados", text: "Spread, horário, volatilidade e muito mais." },
  { icon: "shield", tone: "gold" as const, title: "Gerenciamento de risco", text: "Aplica suas regras personalizadas automaticamente." },
  { icon: "pulse", tone: "blue" as const, title: "Execução automatizada", text: "Envia os sinais para múltiplas contas e plataformas em segundos." },
];

const interpreted = [
  ["Símbolo", "XAUUSD"],
  ["Direção", "BUY"],
  ["Entrada", "3627.50"],
  ["Stop Loss", "3607.50 (20 pips)"],
  ["Take Profit 1", "3632.50 (50 pips)"],
  ["Take Profit 2", "3637.50 (100 pips)"],
  ["Take Profit 3", "3642.50 (150 pips)"],
];

const validations = ["Formato reconhecido", "Símbolo válido", "Preços válidos", "SL/TP coerentes", "Spread dentro do limite", "Horário permitido", "Risco dentro da regra"];

const executions: [BrandId, string, string, string, string, string][] = [
  ["mt5", "MetaTrader 5", "FundedNext", "0.05", "3627.52", "14:35:12"],
  ["mt4", "MetaTrader 4", "Conta Pessoal", "0.02", "3627.53", "14:35:12"],
  ["ninja", "NinjaTrader", "Conta 01", "1", "3627.50", "14:35:13"],
  ["dxtrade", "DXtrade", "Conta Prop", "0.01", "3627.51", "14:35:13"],
];

const formats = ["Texto simples", "Com emojis", "Com ou sem labels", "Imagem / Print", "Mensagem editada", "Sinais parciais e encerramentos"];
const precision = ["Símbolo correto", "Direção correta", "Preços corretos", "Contexto validado", "Execução segura"];
const steps = ["Interpreta o sinal (IA)", "Valida regras e filtros", "Calcula o tamanho do lote", "Aplica gerenciamento de risco", "Prepara a execução"];

const perfCurrent = walk(3, 18, 0.3, 1.2);
const perfOptimized = walk(3, 18, 0.55, 1.2);
const insights = ["Evitar entradas com spread acima de 0.60", "Reduzir o lote após 2 perdas seguidas", "Priorizar a sessão de Londres"];

export function Intelligence() {
  return (
    <Block id="intelligence" labelledBy="ai-title">
      <Head
        id="ai-title"
        eyebrow="Copytrix Intelligence"
        tone="blue"
        title={
          <>
            Inteligência Artificial que <Grad>entende e executa seus sinais</Grad>
          </>
        }
        description="A Copytrix Intelligence analisa, interpreta e valida os sinais do Telegram em qualquer formato, com alta precisão, aplicando filtros inteligentes e executando nas suas contas com total segurança."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.3fr)_minmax(0,1.6fr)]">
        <div className="space-y-3">
          {features.map((f, i) => (
            <SideCard key={f.title} {...f} delay={i * 60} />
          ))}
        </div>

        <Reveal delay={120}>
          <div className="relative flex h-full flex-col items-center gap-3">
            <div className="lp-card w-full max-w-[420px] p-3 xl:max-w-none">
              <p className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-white">
                <BrandMark id="telegram" size={22} /> Mensagem recebida no Telegram
              </p>
              <div className="rounded-lg bg-[#0b1d3f] p-3 text-[12px] leading-relaxed text-slate-100">
                <strong>XAUUSD BUY</strong>
                <br />
                Entry: 3627.50
                <br />
                SL: 3607.50
                <br />
                TP1: 3632.50
                <br />
                TP2: 3637.50
                <br />
                TP3: 3642.50
                <span className="block text-right text-[9px] text-slate-400">14:35</span>
              </div>
            </div>
            <div className="relative grid w-full max-w-[520px] grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-end gap-1 xl:max-w-none">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-6 bottom-0 size-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(40,140,255,.38),rgba(150,80,255,.16)_60%,transparent)] blur-xl"
                style={{ animation: "lp-glow 4s ease-in-out infinite" }}
              />
              <div className="relative">
                <div className="lp-float -ml-6 -mt-2">
                  <div className="origin-bottom scale-[1.12]">
                    <RobotArt />
                  </div>
                </div>
                <span className="absolute left-1 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-emerald-400/40 bg-[#04122b]/90 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                  <span className="lp-ping relative size-1.5 rounded-full bg-emerald-400" aria-hidden /> IA ativa
                </span>
                <span className="absolute bottom-6 left-0 z-10 rounded-md border border-sky-400/40 bg-[#04122b]/90 px-2 py-1 text-[10px] font-semibold text-sky-300">Latência 0.4s</span>
              </div>
              <div className="lp-card relative z-10 -ml-10 mb-4 border-violet-400/50 p-3 shadow-[0_0_50px_-14px_rgba(160,90,255,.8)]">
                <p className="mb-2 flex items-center gap-2 text-[12px] font-bold text-white">
                  <Icon name="brain" size={15} /> Copytrix Intelligence
                </p>
                <ul className="space-y-1.5 text-[10.5px] text-slate-100">
                  {steps.map((s) => (
                    <li key={s} className="flex items-center gap-1.5"><CheckDot tone="green" /> {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-4">
          <Reveal delay={180}>
            <section aria-label="Análise do sinal com IA" className="lp-card p-4">
              <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-white"><Icon name="brain" size={18} /> Análise do Sinal com IA</h3>
                <Pill>Confiança: 99.8%</Pill>
              </header>
              <div className="grid gap-3 md:grid-cols-[.8fr_1.3fr_1fr]">
                <Mini title="Sinal Original">
                  <p className="rounded-lg border border-sky-400/10 bg-[#050e22] p-2.5 text-[11px] leading-relaxed text-slate-200">
                    <strong className="text-white">XAUUSD BUY</strong>
                    <br />
                    Entry: 3627.50
                    <br />
                    SL: 3607.50
                    <br />
                    TP1: 3632.50
                    <br />
                    TP2: 3637.50
                    <br />
                    TP3: 3642.50
                    <span className="block text-right text-[9px] text-slate-400">14:35</span>
                  </p>
                </Mini>
                <Mini title="Sinal Interpretado pela IA">
                  <dl className="divide-y divide-sky-400/10 text-[11px]">
                    {interpreted.map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-2 py-1.5">
                        <dt className="text-slate-300">{k}</dt>
                        <dd className="flex items-center gap-2 font-semibold text-white">{v}<span className="text-emerald-400"><Icon name="check" size={13} stroke={3} /></span></dd>
                      </div>
                    ))}
                  </dl>
                </Mini>
                <Mini title="Validações da IA">
                  <ul className="space-y-1.5 text-[11px] text-slate-200">
                    {validations.map((v) => (
                      <li key={v} className="flex items-center gap-2"><CheckDot tone="green" /> {v}</li>
                    ))}
                  </ul>
                </Mini>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-[1.35fr_1fr]">
                <Mini
                  title="Atual vs Otimizado pela IA"
                  right={
                    <span className="text-right text-[9px] leading-tight text-emerald-400">
                      <span className="block text-sm font-bold">+35.6%</span>de melhoria
                    </span>
                  }
                >
                  <div className="mb-1 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-slate-300">
                    <span className="flex items-center gap-1"><Dot tone="blue" /> Resultado Atual</span>
                    <span className="flex items-center gap-1"><Dot /> Resultado Otimizado (IA)</span>
                  </div>
                  <Lines id="ai-perf" w={300} h={84} series={[{ points: perfCurrent, color: "#2f8bff" }, { points: perfOptimized, color: "#12d99e", area: true }]} />
                </Mini>
                <Mini title="Insights da IA" icon={<Icon name="sparkles" size={14} />} right={<Pill tone="blue">Análise concluída</Pill>}>
                  <div className="mb-2 grid grid-cols-3 gap-2">
                    <Stat label="Win Rate" value="+8.7%" tone="green" />
                    <Stat label="Drawdown" value="-18%" tone="green" />
                    <Stat label="Profit Factor" value="3.10" tone="blue" />
                  </div>
                  <ul className="space-y-1.5 text-[10.5px] leading-snug text-slate-200">
                    {insights.map((t) => (
                      <li key={t} className="flex items-start gap-2"><span className="mt-1"><Dot tone="blue" /></span> {t}</li>
                    ))}
                  </ul>
                </Mini>
              </div>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <section aria-label="Resultado da execução" className="lp-card p-4">
              <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-[15px] font-bold text-white"><Icon name="pulse" size={17} /> Resultado da Execução</h3>
                <Pill>Executado com Sucesso</Pill>
              </header>
              <div className="overflow-x-auto rounded-xl border border-sky-400/15 bg-[#06122a]/80">
                <table className="w-full min-w-[520px] text-left text-[11px]">
                  <thead className="text-slate-400">
                    <tr className="border-b border-sky-400/10">{["Plataforma", "Conta", "Lote", "Preço", "Status", "Horário"].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody className="text-slate-100">
                    {executions.map(([id, name, acc, lot, price, time]) => (
                      <tr key={name} className="border-b border-sky-400/10 last:border-0">
                        <td className="px-3 py-2"><span className="flex items-center gap-2"><BrandMark id={id} size={20} />{name}</span></td>
                        <td className="px-3 py-2">{acc}</td>
                        <td className="px-3 py-2">{lot}</td>
                        <td className="px-3 py-2">{price}</td>
                        <td className="px-3 py-2"><span className="inline-flex items-center gap-1.5 text-emerald-400"><Dot /> Executado</span></td>
                        <td className="px-3 py-2">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Reveal>
          <section className="lp-card lp-card-hover h-full p-4">
            <header className="flex items-start gap-3">
              <IconTile name="eye" tone="purple" size={40} />
              <div>
                <h3 className="text-[14px] font-bold text-white">Análise de Imagens</h3>
                <p className="mt-0.5 text-[12px] text-slate-300/90">A IA extrai informações de prints e imagens automaticamente.</p>
              </div>
            </header>
            <div className="relative mt-3 overflow-hidden rounded-lg border border-sky-400/15 bg-[#050e22] p-2">
              <div className="grid grid-cols-8 items-end gap-1" aria-hidden>
                {[40, 55, 35, 60, 48, 70, 52, 78, 62, 85, 66, 74, 58, 90, 70, 82].slice(0, 8).map((h, i) => (
                  <span key={i} className={`w-full rounded-sm ${i % 3 === 1 ? "bg-rose-500/80" : "bg-emerald-500/80"}`} style={{ height: h }} />
                ))}
              </div>
              <div className="absolute right-2 top-2 rounded bg-slate-100 p-2 text-[10px] font-semibold leading-snug text-slate-900 shadow-lg">
                <strong className="block text-[12px]">GOLD BUY</strong>
                Entry: 3627.50
                <br />
                SL: 3607.50
                <br />
                TP1: 3632.50
                <br />
                TP2: 3637.50
                <br />
                TP3: 3642.50
              </div>
              <div className="h-20" />
            </div>
          </section>
        </Reveal>

        <Reveal delay={60}>
          <section className="lp-card lp-card-hover h-full p-4">
            <header className="flex items-start gap-3">
              <IconTile name="edit" tone="green" size={40} />
              <div>
                <h3 className="text-[14px] font-bold text-white">Mensagens Editadas</h3>
                <p className="mt-0.5 text-[12px] text-slate-300/90">Detecta alterações e executa a versão mais recente.</p>
              </div>
            </header>
            <div className="mt-3 space-y-2 text-[10px] leading-snug text-slate-200">
              <div className="rounded-lg border border-sky-400/15 bg-[#0b1d3f] p-2">XAUUSD BUY<br />Entry: 3627.50<br />SL: 3607.50<br />TP: 3632.50<span className="block text-right text-[9px] text-slate-400">Editada 14:30</span></div>
              <div className="flex justify-center text-violet-400" aria-hidden><Icon name="arrowRight" size={16} /></div>
              <div className="rounded-lg border border-violet-400/50 bg-violet-600/25 p-2">XAUUSD BUY<br />Entry: 3627.50<br />SL: 3607.50<br />TP1: 3632.50<br />TP2: 3637.50<br />TP3: 3642.50<span className="block text-right text-[9px] text-slate-300">Editada 14:35</span></div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section className="lp-card lp-card-hover h-full p-4">
            <header className="flex items-start gap-3">
              <IconTile name="clipboard" tone="blue" size={40} />
              <div>
                <h3 className="text-[14px] font-bold text-white">Múltiplos Formatos</h3>
                <p className="mt-0.5 text-[12px] text-slate-300/90">A IA entende diferentes estilos de sinais, de qualquer fonte.</p>
              </div>
            </header>
            <ul className="mt-3 divide-y divide-sky-400/10 rounded-lg border border-sky-400/15 bg-[#050e22] px-2.5 text-[11.5px] text-slate-100">
              {formats.map((f) => (
                <li key={f} className="flex items-center gap-2 py-1.5"><CheckDot tone="green" /> {f}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={180}>
          <section className="lp-card lp-card-hover h-full p-4">
            <header className="flex items-start gap-3">
              <IconTile name="target" tone="purple" size={40} />
              <div>
                <h3 className="text-[14px] font-bold text-white">Alta Precisão</h3>
                <p className="mt-0.5 text-[12px] text-slate-300/90">Machine Learning treinado para sinais de Forex, índices, cripto e ações.</p>
              </div>
            </header>
            <div className="mt-3 flex items-center gap-3">
              <Donut percent={99.8} size={112}>
                <span className="text-xl font-extrabold leading-none text-white">99.8%</span>
                <span className="text-[9px] text-slate-300">de precisão</span>
              </Donut>
              <ul className="min-w-0 space-y-1.5 rounded-lg border border-sky-400/15 bg-[#050e22] p-2.5 text-[11px] text-slate-100">
                {precision.map((p) => (
                  <li key={p} className="flex items-center gap-1.5"><CheckDot tone="green" /> <span className="truncate">{p}</span></li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </div>
      <CtaRow className="mt-8" />
    </Block>
  );
}
