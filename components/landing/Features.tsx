import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { BrandMark, type BrandId } from "./brands";
import { Reveal } from "./Reveal";
import { Block, Bars, Dot, Grad, Head, Kv, Lines, Mini, Pill, SmallBtn, Stat, ToggleRow, walk, type ToneName } from "./parts";
import { Eyebrow, IconTile } from "./ui";

export function CompleteIntro() {
  return (
    <section aria-labelledby="intro-title" className="relative px-5 pt-10 sm:px-8">
      <Reveal className="mx-auto grid max-w-[1360px] items-end gap-6 lg:grid-cols-2 lg:gap-12">
        <div>
          <Eyebrow>Completo e inteligente</Eyebrow>
          <h2 id="intro-title" className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Muito mais que um simples <Grad>copiador de sinais</Grad>
          </h2>
        </div>
        <p className="text-pretty text-base leading-relaxed text-slate-300 lg:pb-2">
          O Copytrix combina automação, backtest, gestão de risco e agora inteligência artificial através do <strong className="text-white">Copytrix MCP</strong>. Tudo em uma única plataforma para você operar com mais resultado, segurança e liberdade.
        </p>
      </Reveal>
    </section>
  );
}

function FeatureCard({ icon, tone, title, text, badge, delay = 0, children }: { icon: string; tone: ToneName; title: string; text: string; badge?: string; delay?: number; children: ReactNode }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="lp-card lp-card-hover flex h-full flex-col gap-3.5 p-4">
        <header className="flex items-start gap-3">
          <IconTile name={icon} tone={tone} size={44} />
          <div className="min-w-0">
            <h3 className="flex flex-wrap items-center gap-2 text-[16px] font-bold leading-tight text-white">
              {title}
              {badge && <span className="rounded-md bg-violet-500/30 px-1.5 py-0.5 text-[10px] font-bold text-violet-200">{badge}</span>}
            </h3>
            <p className="mt-1 text-[12.5px] leading-snug text-slate-300/90">{text}</p>
          </div>
        </header>
        <div className="flex flex-1 flex-col [&>*]:flex-1">{children}</div>
      </article>
    </Reveal>
  );
}

function PlatformRow({ id, name }: { id: BrandId; name: string }) {
  return (
    <li className="flex items-center gap-1.5 text-[9.5px] leading-tight text-slate-200">
      <BrandMark id={id} size={16} />
      <span className="min-w-0 flex-1">{name}</span>
      <Dot />
    </li>
  );
}

const alerts = [
  { icon: "check", tone: "green" as const, title: "Ordem Executada", text: "BUY XAUUSD 0.10 lot 6200", time: "Hoje, 14:32" },
  { icon: "alert", tone: "red" as const, title: "Spread Alto Detectado", text: "Sinal ignorado (spread > 0.60)", time: "Hoje, 13:45" },
  { icon: "telegram", tone: "purple" as const, title: "Novo Sinal Recebido", text: "XAUUSD SELL no canal KIM GOLD", time: "Hoje, 11:22" },
];

const rules = ["Mover SL para BE (+20 pips)", "Fechar parcial no TP1", "Ignorar sinais com risco > 1%", "Notificar no Telegram"];

export function Features() {
  const aiNow = walk(3, 18, 0.3, 1.2);
  const aiOpt = walk(3, 18, 0.55, 1.2);
  const evo = walk(8, 22, 0.5, 2.4, 10);
  const backtestBars = [0.5, -0.3, 0.7, 0.2, -0.5, 0.8, 0.4, -0.2, 0.9, 0.6, -0.4, 0.7, 0.3, 0.8, -0.3, 0.5, 0.9, -0.2, 0.6, 0.4];
  return (
    <Block id="recursos" labelledBy="features-title">
      <Head
        id="features-title"
        eyebrow="Principais recursos"
        title={
          <>
            Tudo que você precisa para transformar sinais em <Grad>resultados</Grad>
          </>
        }
        description="O Copytrix combina automação, inteligência artificial e ferramentas profissionais para você operar com mais eficiência, segurança e total controle, tudo em um só lugar."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard icon="send" tone="blue" title="Trade Copier" text="Copie sinais do Telegram automaticamente nas suas contas.">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.08fr)] items-stretch gap-1">
            <Mini className="!p-2.5" title={<span className="text-[10px]">Canal Telegram</span>} icon={<BrandMark id="telegram" size={16} />} right={<span className="text-[8px] text-slate-400">Agora</span>}>
              <p className="text-[10px] leading-relaxed text-slate-200">
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
              </p>
            </Mini>
            <span aria-hidden className="flex items-center text-sky-400">
              <Icon name="chevron" size={18} />
            </span>
            <Mini className="!p-2.5" title={<span className="text-[10px]">Execução Automática</span>}>
              <ul className="space-y-2.5">
                <PlatformRow id="mt5" name="MetaTrader 5" />
                <PlatformRow id="ninja" name="NinjaTrader" />
                <PlatformRow id="tradelocker" name="TradeLocker" />
                <PlatformRow id="binance" name="Binance Futures" />
              </ul>
            </Mini>
          </div>
        </FeatureCard>

        <FeatureCard icon="brain" tone="purple" title="Copytrix Intelligence" badge="IA" text="Analise, interprete e otimize seus sinais com inteligência artificial." delay={60}>
          <Mini title="Análise de Performance com IA" right={<span className="text-right text-[9px] leading-tight text-emerald-400"><span className="block text-sm font-bold">+35.6%</span>Potencial de melhoria</span>}>
            <div className="mb-1 flex gap-3 text-[9px] text-slate-300">
              <span className="flex items-center gap-1"><Dot tone="blue" /> Resultado Atual</span>
              <span className="flex items-center gap-1"><Dot /> Resultado Otimizado (IA)</span>
            </div>
            <Lines id="ft-ai" w={300} h={92} series={[{ points: aiNow, color: "#2f8bff" }, { points: aiOpt, color: "#12d99e", area: true }]} />
          </Mini>
        </FeatureCard>

        <FeatureCard icon="backtest" tone="green" title="Backtest Avançado" text="Teste seus sinais com dados reais e veja os resultados antes de operar." delay={120}>
          <Mini title="Resultado do Backtest">
            <div className="grid grid-cols-4 gap-2">
              <Stat label="Total de Trades" value="167" />
              <Stat label="Win Rate" value="52.69%" />
              <Stat label="Profit Factor" value="2.39" />
              <Stat label="Lucro Líquido" value="$4,187.50" tone="green" />
            </div>
            <Bars values={backtestBars} className="mt-3 h-14" />
          </Mini>
        </FeatureCard>

        <FeatureCard icon="shieldCheck" tone="gold" title="Gerenciamento de Risco" text="Proteja seu capital com regras e controles avançados." delay={180}>
          <Mini title="Configuração de Risco">
            <div className="space-y-2">
              <Kv k="Tamanho do Lote" v="0.01" caret />
              <Kv k="Risco por operação" v="0.5%" caret />
              <Kv k="Máx. de operações" v="3" caret />
            </div>
            <ul className="mt-2.5">
              <ToggleRow label="Stop Loss Automático" on />
            </ul>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="filter" tone="purple" title="Filtros Avançados" text="Filtre sinais por spread, horário, notícias e muito mais." delay={0}>
          <Mini title="Filtros de Sinais">
            <ul className="space-y-1.5">
              <ToggleRow label="Filtro por Spread (máx. 0.60)" on />
              <ToggleRow label="Apenas horário de alta liquidez" on />
              <ToggleRow label="Evitar notícias de alto impacto" on={false} />
              <ToggleRow label="Filtrar por ativo" on={false} />
            </ul>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="accounts" tone="cyan" title="Multi-Conta e Multi-Plataforma" text="Opere em várias contas e plataformas ao mesmo tempo." delay={60}>
          <Mini title="Contas Conectadas">
            <ul className="space-y-2">
              {([["mt5", "MetaTrader 5"], ["mt4", "MetaTrader 4"], ["ninja", "NinjaTrader"], ["tradelocker", "TradeLocker"], ["binance", "Binance Futures"]] as const).map(([id, name]) => (
                <li key={id} className="flex items-center gap-2 text-[11px] text-slate-200">
                  <BrandMark id={id} size={20} />
                  <span className="flex-1 truncate">{name}</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-emerald-400"><Dot /> Conectado</span>
                </li>
              ))}
            </ul>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="book" tone="blue" title="Trading Journal" text="Acompanhe todas as suas operações com análises detalhadas." delay={120}>
          <Mini title="Resumo do Período" right={<span className="rounded-md border border-sky-400/20 bg-[#050e22] px-2 py-0.5 text-[10px] text-slate-200">30 dias</span>}>
            <div className="grid grid-cols-4 gap-2">
              <Stat label="Trades" value="167" />
              <Stat label="Win Rate" value="52.69%" tone="blue" />
              <Stat label="Profit Factor" value="2.39" />
              <Stat label="Lucro Líquido" value="$4,187.50" tone="green" />
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[220px] text-left text-[10px]">
                <thead className="text-slate-400">
                  <tr>{["Data", "Ativo", "Tipo", "Resultado"].map((h) => <th key={h} className="pb-1 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody className="text-slate-200">
                  {[["04/09", "XAUUSD", "BUY", "+$125.50", "text-emerald-400"], ["04/09", "XAUUSD", "SELL", "-$20.00", "text-rose-400"], ["03/09", "XAUUSD", "BUY", "+$87.00", "text-emerald-400"]].map(([d, a, t, r, c]) => (
                    <tr key={d + r} className="border-t border-sky-400/10"><td className="py-1">{d}</td><td>{a}</td><td>{t}</td><td className={`font-semibold ${c}`}>{r}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="sparkles" tone="cyan" title="Execução Inteligente" text="Entradas precisas e configurações avançadas de execução." delay={180}>
          <Mini title="Smart Entry">
            <ul className="space-y-1.5">
              <ToggleRow label="Entrada por distância (pips)" on />
              <ToggleRow label="Entrada por preço exato" on={false} />
              <ToggleRow label="Ignorar sinais com SL muito curto" on />
              <ToggleRow label="Mover SL para BE (+20 pips)" on />
            </ul>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="bell" tone="blue" title="Alertas e Notificações" text="Receba alertas em tempo real sobre sinais, execuções e eventos importantes." delay={0}>
          <Mini className="!p-2">
            <ul className="divide-y divide-sky-400/10">
              {alerts.map((a) => (
                <li key={a.title} className="flex items-center gap-2.5 py-2">
                  <IconTile name={a.icon} tone={a.tone} size={32} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-semibold text-white">{a.title}</span>
                    <span className="block truncate text-[9px] text-slate-400">{a.text}</span>
                  </span>
                  <span className="shrink-0 text-[9px] text-slate-400">{a.time}</span>
                </li>
              ))}
            </ul>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="analytics" tone="gold" title="Analytics Avançado" text="Gráficos, estatísticas e métricas para melhorar sua performance." delay={60}>
          <Mini title="Evolução de Resultados" right={<span className="rounded-md border border-sky-400/20 bg-[#050e22] px-2 py-0.5 text-[10px] text-slate-200">30 dias</span>}>
            <div className="flex gap-2">
              <div className="flex flex-col justify-between py-1 text-[8px] text-slate-400" aria-hidden>
                {["12,000", "8,000", "4,000", "0", "-4,000"].map((l) => <span key={l}>{l}</span>)}
              </div>
              <div className="min-w-0 flex-1">
                <Lines id="ft-evo" w={300} h={96} grid={4} series={[{ points: evo, color: "#2f8bff", area: true }]} />
                <div className="mt-1 flex justify-between text-[8px] text-slate-400" aria-hidden>
                  {["01/09", "08/09", "15/09", "22/09", "30/09"].map((l) => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="settings" tone="cyan" title="Automação e Personalização" text="Crie suas próprias regras e estratégias de execução." delay={120}>
          <Mini title="Regras de Automação" right={<SmallBtn className="!px-2 !py-1 !text-[9px]">+ Nova Regra</SmallBtn>}>
            <ul className="space-y-1.5">
              {rules.map((r) => (
                <ToggleRow key={r} on label={<span className="flex items-center gap-2"><Icon name="chevron" size={11} />{r}</span>} />
              ))}
            </ul>
          </Mini>
        </FeatureCard>

        <FeatureCard icon="lock" tone="purple" title="Segurança e Confiabilidade" text="Seus dados e contas sempre protegidos com criptografia e conexão segura." delay={180}>
          <Mini title="Segurança" right={<Pill>100% Seguro</Pill>}>
            <ul className="space-y-2 text-[11px] text-slate-200">
              {["Conexão criptografada (SSL)", "Dados protegidos", "Sem acesso à sua senha", "Infraestrutura em nuvem", "Alta disponibilidade (99.9%)"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="inline-flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400"><Icon name="check" size={10} stroke={3} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </Mini>
        </FeatureCard>
      </div>
    </Block>
  );
}
