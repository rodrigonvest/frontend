"use client";
import { Icon } from "../Icons";
import { cx, Notice } from "../UI";
import { formatPercent, formatPrice, formatUsers, type RiskLevel, type Strategy } from "../../lib/marketplace-data";
import { Avatar, HighlightBadge, StarIcon, Tag, VerifiedBadge } from "./MpPrimitives";
import { MpModal } from "./MpModal";
import { StrategyChart } from "./StrategyChart";

const riskScore: Record<RiskLevel, number> = { Baixo: 2, Médio: 3, Alto: 5 };
const riskColor: Record<RiskLevel, string> = { Baixo: "bg-success", Médio: "bg-warning", Alto: "bg-danger" };

function Kpi({ label, value, tone = "text-fg" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-line bg-canvas/40 px-3 py-2.5">
      <p className="text-[11px] text-fg-subtle">{label}</p>
      <p className={cx("tabular mt-0.5 text-[17px] font-semibold leading-6", tone)}>{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-[13px] font-semibold text-fg">{title}</h3>
      {children}
    </section>
  );
}

export function StrategyDetailModal({ strategy, selected, onClose, onUse }: { strategy: Strategy; selected: boolean; onClose: () => void; onUse: () => void }) {
  const configRows: [string, string][] = [
    ["Timeframe", strategy.config.timeframe],
    ["Risco por operação", strategy.config.riskPerTrade],
    ["Stop Loss", strategy.config.stopLoss],
    ["Take Profit", strategy.config.takeProfit],
    ["Sessões", strategy.config.sessions],
    ["Operações simultâneas", strategy.config.maxTrades],
  ];
  const score = riskScore[strategy.risk];

  return (
    <MpModal
      wide
      titleId="mp-detail-title"
      title={
        <span className="flex flex-wrap items-center gap-2.5">
          {strategy.name}
          {strategy.badge && <HighlightBadge label={strategy.badge.label} tone={strategy.badge.tone} />}
        </span>
      }
      subtitle={
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1.5">
            <Avatar name={strategy.author} size={20} />
            {strategy.author}
            {strategy.verified && <VerifiedBadge />}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-warning">
              <StarIcon />
            </span>
            <span className="tabular font-semibold text-fg">{strategy.rating.toFixed(1).replace(".", ",")}</span>
            <span className="text-fg-subtle">({strategy.reviews} avaliações)</span>
          </span>
          <span className="flex items-center gap-1">
            <Icon name="download" size={13} />
            {formatUsers(strategy.users)} usuários
          </span>
        </span>
      }
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line-strong px-4 text-[13px] font-medium text-fg hover:border-brand/60 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-brand"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={onUse}
            aria-pressed={selected}
            className={cx(
              "inline-flex h-10 items-center gap-2 rounded-lg px-5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              selected ? "border border-success/60 bg-success/15 text-success hover:bg-success/25" : "bg-brand-strong text-white hover:bg-brand",
            )}
          >
            {selected && <Icon name="check" size={14} stroke={2.6} />}
            {selected ? "Estratégia selecionada" : "Usar Estratégia"}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Section title="Performance">
            <div className="rounded-xl border border-line bg-canvas/40 p-3">
              <div className="mb-2 flex items-center justify-between text-[11.5px] text-fg-subtle">
                <span>Curva de capital ({strategy.stats.months} meses)</span>
                <span className="tabular font-semibold text-success">+{strategy.stats.returnPct}%</span>
              </div>
              <StrategyChart series={strategy.series} variant="line" height={170} grid label={`Curva de capital de ${strategy.name}`} />
            </div>
          </Section>

          <Section title="Métricas">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Kpi label="Win Rate" value={formatPercent(strategy.winRate)} tone="text-success" />
              <Kpi label="Fator de Lucro" value={strategy.profitFactor.toFixed(1).replace(".", ",")} />
              <Kpi label="Drawdown máx." value={`-${formatPercent(strategy.drawdown)}`} tone="text-danger" />
              <Kpi label="Retorno acumulado" value={`+${strategy.stats.returnPct}%`} tone="text-success" />
              <Kpi label="Operações" value={strategy.stats.trades.toLocaleString("pt-BR")} />
              <Kpi label="Duração média" value={strategy.stats.avgDuration} />
              <Kpi label="Histórico" value={`${strategy.stats.months} meses`} />
              <Kpi label="Preço" value={formatPrice(strategy.price)} />
            </div>
          </Section>

          <Section title="Descrição">
            <p className="text-[13px] leading-6 text-fg-muted">{strategy.description}</p>
          </Section>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <Section title="Ativos e plataformas">
            <ul className="flex flex-wrap gap-1.5" aria-label="Ativos">
              {strategy.assets.map((asset) => (
                <li key={asset}>
                  <Tag label={asset} />
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[12.5px] text-fg-muted">Plataformas: {strategy.platforms.join(", ")}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Categorias">
              {strategy.categories.map((category) => (
                <li key={category}>
                  <Tag label={category} />
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Perfil de risco">
            <div className="rounded-lg border border-line bg-canvas/40 p-3">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-fg-muted">Nível de risco</span>
                <span className="font-semibold text-fg">{strategy.risk}</span>
              </div>
              <div className="mt-2 flex gap-1" role="img" aria-label={`Risco ${strategy.risk}: ${score} de 5`}>
                {[1, 2, 3, 4, 5].map((step) => (
                  <span key={step} className={cx("h-1.5 flex-1 rounded-full", step <= score ? riskColor[strategy.risk] : "bg-surface-3")} />
                ))}
              </div>
            </div>
          </Section>

          <Section title="Configurações recomendadas">
            <dl className="divide-y divide-line rounded-lg border border-line bg-canvas/40">
              {configRows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 px-3 py-2 text-[12.5px]">
                  <dt className="text-fg-subtle">{label}</dt>
                  <dd className="text-right font-medium text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Notice tone="warning">Dados demonstrativos. Selecionar a estratégia não executa operações nem integra com contas reais.</Notice>
        </div>
      </div>
    </MpModal>
  );
}
