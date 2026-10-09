"use client";
import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import {
  colors,
  insights,
  recommendations,
  summaryMetrics,
  type Insight,
  type Recommendation,
  type SummaryCardData,
} from "../../lib/intelligence-demo";

export function IPanel({
  title,
  icon,
  iconColor = colors.blue,
  action,
  className,
  children,
}: {
  title: string;
  icon: string;
  iconColor?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cx("flex min-w-0 flex-col rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-4", className)}>
      <header className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md" style={{ background: `${iconColor}1f`, color: iconColor }}>
          <Icon name={icon} size={16} />
        </span>
        <h2 className="min-w-0 flex-1 basis-40 truncate text-[15px] font-semibold tracking-tight text-fg">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

export function GhostButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 items-center rounded-md border border-brand/50 bg-brand-soft/40 px-3 text-[12px] font-medium text-[#cfe3ff] transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      {children}
    </button>
  );
}

export function SummaryCard({ card, active }: { card: SummaryCardData; active: boolean }) {
  return (
    <div
      className={cx(
        "flex min-w-0 items-center gap-3.5 rounded-xl border bg-gradient-to-b from-surface-2/60 to-surface px-4 py-3.5",
        active ? "border-brand shadow-[0_0_22px_-6px_rgba(21,154,242,.75)]" : "border-line",
      )}
    >
      <span
        className="flex size-[52px] shrink-0 items-center justify-center rounded-xl border"
        style={{ color: card.accent, background: `${card.accent}1f`, borderColor: `${card.accent}40`, boxShadow: `0 0 18px -6px ${card.accent}` }}
      >
        <Icon name={card.icon} size={28} stroke={1.6} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] text-fg-muted">{card.label}</p>
        <p className="tabular truncate text-[26px] font-semibold leading-8 tracking-tight" style={{ color: card.valueColor ?? "#f2f6fa" }}>
          {card.value}
        </p>
        <p className="truncate text-[12.5px]" style={{ color: card.captionColor ?? "#b7c8d9" }}>
          {card.caption}
        </p>
      </div>
    </div>
  );
}

export function SummaryPanel({ periodLabel, signalsValue, className }: { periodLabel: string; signalsValue?: string; className?: string }) {
  return (
    <IPanel title="Resumo da Inteligência" icon="brain" iconColor={colors.blue} className={className}>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <li key={metric.id} className="flex min-w-0 items-center gap-3 rounded-lg border border-line bg-canvas/50 px-3 py-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full" style={{ color: metric.accent, background: `${metric.accent}22` }}>
              <Icon name={metric.icon} size={22} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] text-fg-muted">{metric.label}</p>
              <p className="tabular text-[22px] font-semibold leading-7 text-fg">{metric.period && signalsValue ? signalsValue : metric.value}</p>
              <p className="truncate text-[11.5px] text-fg-muted">{metric.period ? periodLabel : metric.caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </IPanel>
  );
}

function ConfidenceBadge({ level }: { level: Insight["confidence"] }) {
  const color = level === "Alta Confiança" ? colors.green : colors.gold;
  return (
    <span className="shrink-0 whitespace-nowrap rounded border px-1.5 text-[10.5px] font-medium leading-5" style={{ color, borderColor: `${color}66`, background: `${color}1a` }}>
      {level}
    </span>
  );
}

function InsightRow({ insight }: { insight: Insight }) {
  const priorityColor = insight.priority === "Atenção" ? colors.red : insight.priority === "Alta" ? colors.green : colors.gold;
  return (
    <li className="flex min-w-0 gap-3 rounded-lg border border-line bg-canvas/50 py-2.5 pl-3 pr-3" style={{ borderLeft: `3px solid ${insight.accent}` }}>
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ color: insight.accent, background: `${insight.accent}22` }}>
        <Icon name={insight.icon} size={19} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
          <h3 className="min-w-0 flex-1 basis-32 text-[13.5px] font-semibold leading-5 text-fg">{insight.title}</h3>
          <ConfidenceBadge level={insight.confidence} />
        </div>
        <p className="mt-0.5 text-pretty text-[12px] leading-[17px] text-fg-muted">{insight.description}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-fg-subtle">
          <span aria-hidden className="size-1.5 rounded-full" style={{ background: priorityColor, boxShadow: `0 0 6px ${priorityColor}` }} />
          Prioridade {insight.priority.toLowerCase()}
        </p>
      </div>
    </li>
  );
}

export function InsightsPanel({ className }: { className?: string }) {
  return (
    <IPanel title="Principais Insights da IA" icon="bulb" iconColor={colors.gold} className={className}>
      <ul className="flex flex-col gap-2">
        {insights.map((insight) => (
          <InsightRow key={insight.id} insight={insight} />
        ))}
      </ul>
    </IPanel>
  );
}

function RecommendationRow({ item, applied, onApply }: { item: Recommendation; applied: boolean; onApply: () => void }) {
  return (
    <li className="flex min-w-0 items-center gap-3 rounded-lg border border-line bg-canvas/50 px-3 py-2.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ color: item.accent, background: `${item.accent}22`, boxShadow: `0 0 14px -6px ${item.accent}` }}>
        <Icon name={item.icon} size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-[13px] font-semibold leading-[18px] text-fg">{item.title}</h3>
        <p className="text-[12px] leading-[17px] text-fg-muted">{item.description}</p>
        <p className="mt-0.5 text-[12px] font-medium text-success">Impacto estimado: {item.impact}</p>
      </div>
      <button
        type="button"
        onClick={onApply}
        disabled={applied}
        aria-label={`${applied ? "Aplicado" : "Aplicar"}: ${item.title}`}
        className={cx(
          "inline-flex h-8 min-w-[70px] shrink-0 items-center justify-center gap-1 rounded-md px-3 text-[12.5px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          applied ? "border border-success/50 bg-success/15 text-success" : "bg-brand-strong text-white shadow-[0_0_14px_-4px_rgba(8,127,240,.8)] hover:bg-brand active:scale-[.97]",
        )}
      >
        {applied && <Icon name="check" size={13} />}
        {applied ? "Aplicado" : "Aplicar"}
      </button>
    </li>
  );
}

export function RecommendationsPanel({ applied, onApply, onSeeAll, showAllButton = true, className }: { applied: string[]; onApply: (id: string) => void; onSeeAll: () => void; showAllButton?: boolean; className?: string }) {
  return (
    <IPanel title="Recomendações da IA" icon="target" iconColor={colors.blue} action={showAllButton ? <GhostButton onClick={onSeeAll}>Ver Todas</GhostButton> : undefined} className={className}>
      <ul className="flex flex-col gap-2">
        {recommendations.map((item) => (
          <RecommendationRow key={item.id} item={item} applied={applied.includes(item.id)} onApply={() => onApply(item.id)} />
        ))}
      </ul>
    </IPanel>
  );
}
