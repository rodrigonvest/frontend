"use client";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { IconButton, Menu, PencilGlyph } from "../multi-account/MaPrimitives";
import { Panel } from "../risk-management/RiskFields";
import { Donut } from "./FilterFields";
import { type CategoryCount, type SignalTemplate } from "../../lib/signal-filters-demo";

export function TemplatesPanel({
  templates,
  activeId,
  onApply,
  onCreate,
  onDuplicate,
  onDelete,
}: {
  templates: SignalTemplate[];
  activeId: string | null;
  onApply: (id: string) => void;
  onCreate: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Panel
      title="Templates de Filtros"
      icon="clipboard"
      action={
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-brand-strong/70 bg-[#0a1b2b] px-3 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Icon name="plus" size={13} />
          Novo
        </button>
      }
    >
      {templates.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line py-6 text-center text-[13px] text-fg-muted">Nenhum template salvo.</p>
      ) : (
        <ul className="space-y-1">
          {templates.map((template) => {
            const active = template.id === activeId;
            return (
              <li
                key={template.id}
                className={cx("flex items-center gap-1 rounded-lg border px-3 py-2", active ? "border-brand-strong bg-brand-strong/15" : "border-transparent hover:bg-white/[.03]")}
              >
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onApply(template.id)}
                  className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <span className="block truncate text-[13px] font-medium text-fg">{template.name}</span>
                  <span className="block truncate text-[12px] text-fg-muted">{template.description}</span>
                </button>
                <IconButton label={`Aplicar template ${template.name}`} onClick={() => onApply(template.id)}>
                  <PencilGlyph />
                </IconButton>
                <Menu
                  ariaLabel={`Mais ações de ${template.name}`}
                  buttonClassName="flex size-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-white/[.06] hover:text-fg"
                  items={[
                    { label: "Duplicar", onSelect: () => onDuplicate(template.id) },
                    { label: "Excluir", tone: "danger", separatorBefore: true, onSelect: () => onDelete(template.id) },
                  ]}
                >
                  <Icon name="more" size={16} />
                </Menu>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

export function SummaryPanel({ counts, customActive }: { counts: CategoryCount[]; customActive: number }) {
  const total = counts.reduce((sum, item) => sum + item.count, 0) + customActive;
  return (
    <Panel title="Resumo dos Filtros Ativos" icon="check">
      <div className="flex flex-wrap items-center gap-4">
        <Donut size={116} thickness={14} segments={counts.map((item) => ({ value: item.count, color: item.color }))}>
          <span className="text-[26px] font-semibold leading-none text-fg">{total}</span>
          <span className="mt-0.5 text-[11px] text-fg-muted">filtros ativos</span>
        </Donut>
        <ul className="min-w-[150px] flex-1 space-y-1.5">
          {counts.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-[12px]">
              <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="min-w-0 flex-1 truncate text-fg-muted">{item.label}</span>
              <span className="tabular-nums text-fg">{item.count}</span>
            </li>
          ))}
          {customActive > 0 && (
            <li className="flex items-center gap-2 text-[12px]">
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-fg-muted" />
              <span className="min-w-0 flex-1 truncate text-fg-muted">Regras personalizadas</span>
              <span className="tabular-nums text-fg">{customActive}</span>
            </li>
          )}
        </ul>
      </div>
      <p className="mt-3 text-center text-[12px] text-fg-muted">Sinais serão validados em tempo real</p>
    </Panel>
  );
}
