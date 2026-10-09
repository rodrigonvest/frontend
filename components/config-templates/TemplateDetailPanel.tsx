"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { includedSettings, type ConfigTemplate } from "../../lib/config-templates-demo";
import { MetricsRow, PopularBadge, TagChip } from "./TemplateCard";

const secondaryAction =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line-strong bg-[#0a1b2b] px-3 text-[13px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.98]";

const scopeLabel = {
  official: "Template oficial do Copytrix",
  mine: "Meu template personalizado",
  community: "Template da comunidade",
} as const;

export default function TemplateDetailPanel({
  template,
  applied,
  favorite,
  testing,
  onUse,
  onBacktest,
  onEdit,
  onDuplicate,
  onShare,
  onToggleFavorite,
}: {
  template: ConfigTemplate;
  applied: boolean;
  favorite: boolean;
  testing: boolean;
  onUse: () => void;
  onBacktest: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <aside aria-label={`Detalhes de ${template.name}`} className="flex min-w-0 flex-col gap-3 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-3 xl:sticky xl:top-20">
      <div className="relative h-[120px] overflow-hidden rounded-lg bg-canvas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={template.image || "/placeholder.svg"} alt="" className="size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
        {template.popular && (
          <div className="absolute left-2 top-2">
            <PopularBadge />
          </div>
        )}
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={favorite ? "#ff5d6d" : "none"} stroke={favorite ? "#ff5d6d" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21.8l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z" />
          </svg>
        </button>
      </div>

      <div className="min-w-0">
        <h2 className="text-balance text-xl font-semibold tracking-tight text-fg">{template.name}</h2>
        <p className="mt-0.5 text-[13px] text-fg-muted">{scopeLabel[template.scope]}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <TagChip key={tag.label} label={tag.label} tone={tag.tone} />
          ))}
        </div>
        <p className="mt-2.5 text-pretty text-[13px] leading-5 text-fg-muted">{template.description}</p>
      </div>

      <MetricsRow template={template} large />

      <section aria-labelledby="included-title">
        <h3 id="included-title" className="mb-2 flex items-center gap-2 text-[14px] font-semibold text-fg">
          <span className="text-brand">
            <Icon name="clipboard" size={16} />
          </span>
          Configurações incluídas
        </h3>
        <ul className="space-y-1.5">
          {includedSettings.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12.5px] leading-5 text-fg">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-success text-canvas">
                <Icon name="check" size={10} stroke={3.2} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-2">
        <button
          type="button"
          onClick={onUse}
          className={cx(
            "inline-flex h-11 items-center justify-center gap-2 rounded-lg text-[14px] font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.99]",
            applied ? "border border-success/50 bg-success/20 text-success" : "bg-brand-strong shadow-[0_0_18px_-4px_rgba(8,127,240,.8)] hover:bg-brand",
          )}
        >
          <Icon name={applied ? "check" : "download"} size={16} />
          {applied ? "Template em Uso" : "Usar Este Template"}
        </button>
        <button type="button" onClick={onBacktest} disabled={testing} className={cx(secondaryAction, "h-10 disabled:cursor-wait disabled:opacity-70")}>
          <Icon name={testing ? "refresh" : "backtest"} size={15} />
          {testing ? "Executando backtest..." : "Testar no Backtest"}
        </button>
        <div className="grid grid-cols-3 gap-2">
          <button type="button" onClick={onEdit} className={secondaryAction}>
            <Icon name="settings" size={14} />
            Editar
          </button>
          <button type="button" onClick={onDuplicate} className={secondaryAction}>
            <Icon name="copy" size={14} />
            Duplicar
          </button>
          <button type="button" onClick={onShare} className={secondaryAction}>
            <Icon name="external" size={14} />
            Compartilhar
          </button>
        </div>
      </div>
    </aside>
  );
}
