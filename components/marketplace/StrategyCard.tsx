"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { formatPercent, formatUsers, type Strategy } from "../../lib/marketplace-data";
import { Avatar, HeartIcon, HighlightBadge, StarIcon, Tag, VerifiedBadge } from "./MpPrimitives";
import { StrategyChart } from "./StrategyChart";

function Metric({ value, label, tone }: { value: string; label: string; tone: "green" | "neutral" | "red" }) {
  return (
    <div className="min-w-0 flex-1 text-center">
      <p className={cx("tabular text-[17px] font-semibold leading-6", tone === "green" ? "text-success" : tone === "red" ? "text-danger" : "text-fg")}>{value}</p>
      <p className="truncate text-[11px] text-fg-subtle">{label}</p>
    </div>
  );
}

export function StrategyCard({
  strategy,
  favorite,
  selected,
  onFavorite,
  onDetails,
  onUse,
}: {
  strategy: Strategy;
  favorite: boolean;
  selected: boolean;
  onFavorite: () => void;
  onDetails: () => void;
  onUse: () => void;
}) {
  return (
    <article
      aria-labelledby={`strategy-${strategy.id}`}
      className="group flex min-w-0 flex-col rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface p-3.5 transition-[border-color,box-shadow] hover:border-brand/50 hover:shadow-[0_0_28px_-10px_rgba(21,154,242,.55)]"
    >
      <div className="flex min-h-6 items-center justify-between gap-2">
        {strategy.badge ? <HighlightBadge label={strategy.badge.label} tone={strategy.badge.tone} /> : <span />}
        <button
          type="button"
          onClick={onFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? `Remover ${strategy.name} dos favoritos` : `Favoritar ${strategy.name}`}
          className={cx(
            "flex size-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-brand",
            favorite ? "text-danger" : "text-fg-muted hover:bg-white/[.06] hover:text-fg",
          )}
        >
          <HeartIcon filled={favorite} />
        </button>
      </div>

      <h3 id={`strategy-${strategy.id}`} className="mt-2.5 text-[15px] font-semibold leading-5 text-fg">
        {strategy.name}
      </h3>
      <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tags da estratégia">
        {strategy.tags.map((tag) => (
          <li key={tag}>
            <Tag label={tag} />
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <StrategyChart series={strategy.series} variant={strategy.chart} height={62} label={`Gráfico de performance de ${strategy.name}`} />
      </div>

      <div className="mt-3 flex items-start gap-1 border-y border-line py-2.5">
        <Metric value={formatPercent(strategy.winRate)} label="Win Rate" tone="green" />
        <Metric value={strategy.profitFactor.toFixed(1).replace(".", ",")} label="Fator de Lucro" tone="neutral" />
        <Metric value={`-${formatPercent(strategy.drawdown)}`} label="Drawdown" tone="red" />
      </div>

      <div className="mt-3 flex items-center gap-2 text-[12px]">
        <Avatar name={strategy.author} />
        <span className="flex min-w-0 items-center gap-1 text-fg">
          <span className="truncate">{strategy.author}</span>
          {strategy.verified && <VerifiedBadge />}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1 text-fg-muted">
          <span className="text-warning">
            <StarIcon />
          </span>
          <span className="tabular font-semibold text-fg">{strategy.rating.toFixed(1).replace(".", ",")}</span>
          <span className="tabular text-fg-subtle">({strategy.reviews})</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 text-fg-muted" title={`${strategy.users} usuários`}>
          <Icon name="download" size={13} />
          <span className="tabular">{formatUsers(strategy.users)}</span>
          <span className="sr-only">usuários</span>
        </span>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onDetails}
          className="h-9 rounded-lg border border-line-strong bg-surface px-2 text-[12.5px] font-medium text-fg transition-colors hover:border-brand/60 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-brand"
        >
          Ver Detalhes
        </button>
        <button
          type="button"
          onClick={onUse}
          aria-pressed={selected}
          className={cx(
            "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-2 text-[12.5px] font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
            selected ? "border border-success/60 bg-success/15 text-success hover:bg-success/25" : "bg-brand-strong hover:bg-brand",
          )}
        >
          {selected && <Icon name="check" size={13} stroke={2.6} />}
          {selected ? "Selecionada" : "Usar Estratégia"}
        </button>
      </div>
    </article>
  );
}
