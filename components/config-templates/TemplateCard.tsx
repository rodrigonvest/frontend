"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import type { ConfigTemplate } from "../../lib/config-templates-demo";

const tagTones = {
  blue: "border-brand/50 bg-brand-strong/20 text-[#5cc2ff]",
  gold: "border-warning/50 bg-warning/15 text-warning",
  green: "border-success/40 bg-success/15 text-success",
  purple: "border-[#8b5cf6]/50 bg-[#8b5cf6]/20 text-[#c4b0ff]",
  orange: "border-[#f59e0b]/50 bg-[#f97316]/20 text-[#fdba74]",
  neutral: "border-line-strong bg-surface-2 text-fg-muted",
} as const;

export function TagChip({ label, tone }: { label: string; tone: keyof typeof tagTones }) {
  return (
    <span className={cx("inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-medium leading-5", tagTones[tone])}>{label}</span>
  );
}

export function PopularBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-warning/60 bg-[#2b2210]/90 px-2.5 py-0.5 text-[11px] font-semibold text-warning backdrop-blur">
      <Icon name="crown" size={12} />
      Mais Popular
    </span>
  );
}

export function MetricsRow({ template, large = false }: { template: ConfigTemplate; large?: boolean }) {
  const items = [
    { label: "Win Rate", value: `${template.winRate.toFixed(1)}%`, accent: true },
    { label: "RR Médio", value: template.rr.toFixed(1), accent: false },
    { label: "Usuários", value: String(template.users), accent: false },
  ];
  return (
    <dl className={cx("grid grid-cols-3 divide-x divide-line rounded-lg border border-line bg-canvas/50", large ? "py-3" : "py-2")}>
      {items.map((item) => (
        <div key={item.label} className="min-w-0 px-2 text-center">
          <dd className={cx("tabular font-semibold leading-tight", large ? "text-xl" : "text-[17px]", item.accent ? "text-success" : "text-fg")}>{item.value}</dd>
          <dt className="mt-0.5 truncate text-[11px] text-fg-muted">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export default function TemplateCard({
  template,
  selected,
  applied,
  onSelect,
  onUse,
}: {
  template: ConfigTemplate;
  selected: boolean;
  applied: boolean;
  onSelect: () => void;
  onUse: () => void;
}) {
  return (
    <article
      aria-current={selected ? "true" : undefined}
      onClick={onSelect}
      className={cx(
        "group flex min-w-0 cursor-pointer flex-col gap-2.5 rounded-xl border bg-gradient-to-b from-surface-2/60 to-surface p-2.5 transition-all",
        selected ? "border-warning shadow-[0_0_0_1px_rgba(240,195,92,.35),0_0_24px_-6px_rgba(240,195,92,.45)]" : "border-line hover:border-line-strong hover:shadow-[0_0_20px_-8px_rgba(21,154,242,.5)]",
      )}
    >
      <div className="relative h-[84px] overflow-hidden rounded-lg bg-canvas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={template.image || "/placeholder.svg"} alt="" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent" />
        {template.popular && (
          <div className="absolute right-1.5 top-1.5">
            <PopularBadge />
          </div>
        )}
      </div>

      <div className="min-w-0 px-0.5">
        <h3 className="truncate text-[16px] font-semibold tracking-tight text-fg">{template.name}</h3>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <TagChip key={tag.label} label={tag.label} tone={tag.tone} />
          ))}
        </div>
        <p className="mt-2 line-clamp-2 min-h-[36px] text-pretty text-[12px] leading-[18px] text-fg-muted">{template.description}</p>
      </div>

      <MetricsRow template={template} />

      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onUse();
          }}
          className={cx(
            "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-2 text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.98]",
            applied ? "border border-success/50 bg-success/15 text-success" : "bg-brand-strong text-white hover:bg-brand",
          )}
        >
          {applied && <Icon name="check" size={13} stroke={2.6} />}
          {applied ? "Em Uso" : "Usar Template"}
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-[#0a1b2b] px-2 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.98]"
        >
          <Icon name="eye" size={14} />
          Ver Detalhes
        </button>
      </div>
    </article>
  );
}
