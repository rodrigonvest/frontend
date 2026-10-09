"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { intelligenceTabs, periodOptions, summaryCards, type IntelligenceTab, type Period } from "../../lib/intelligence-demo";
import { SummaryCard } from "./IntelPanels";

export type CustomRange = { from: string; to: string };

export function formatIsoDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function CustomRangePopover({ initial, onApply, onCancel }: { initial: CustomRange | null; onApply: (range: CustomRange) => void; onCancel: () => void }) {
  const [from, setFrom] = useState(initial?.from ?? "");
  const [to, setTo] = useState(initial?.to ?? "");
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const invalid = !from || !to || from > to;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target) && !target.closest("[data-custom-period-trigger]")) onCancel();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [onCancel]);

  const inputClass = "mt-1 h-9 w-full rounded-lg border border-line-strong bg-canvas/70 px-3 text-[13px] text-fg outline-none focus:border-brand [color-scheme:dark]";

  return (
    <div ref={ref} role="dialog" aria-label="Selecionar período personalizado" className="absolute right-0 top-full z-30 mt-2 w-[300px] max-w-[calc(100vw-2rem)] rounded-xl border border-line-strong bg-surface p-4 shadow-2xl">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-[12px] text-fg-muted">
          Data inicial
          <input type="date" value={from} max={to || today} onChange={(event) => setFrom(event.target.value)} className={inputClass} />
        </label>
        <label className="text-[12px] text-fg-muted">
          Data final
          <input type="date" value={to} min={from || undefined} max={today} onChange={(event) => setTo(event.target.value)} className={inputClass} />
        </label>
      </div>
      {from && to && from > to && (
        <p role="alert" className="mt-2 text-[12px] text-danger">
          A data inicial deve ser anterior à data final.
        </p>
      )}
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="h-8 rounded-md border border-line-strong px-3 text-[12.5px] text-fg hover:border-brand/60 focus-visible:outline-2 focus-visible:outline-brand">
          Cancelar
        </button>
        <button
          type="button"
          disabled={invalid}
          onClick={() => onApply({ from, to })}
          className="h-8 rounded-md bg-brand-strong px-3 text-[12.5px] font-semibold text-white hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}

export function IntelligenceHeader({
  period,
  onPeriod,
  customRange,
  onCustomRange,
}: {
  period: Period;
  onPeriod: (period: Period) => void;
  customRange: CustomRange | null;
  onCustomRange: (range: CustomRange) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const previousRef = useRef<Period>("30");

  const select = (id: Period) => {
    if (id === "custom") {
      if (period !== "custom") previousRef.current = period;
      onPeriod("custom");
      setPickerOpen(true);
      return;
    }
    setPickerOpen(false);
    onPeriod(id);
  };

  const cancelPicker = useCallback(() => {
    setPickerOpen(false);
    if (!customRange) onPeriod(previousRef.current);
  }, [customRange, onPeriod]);

  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Copytrix Intelligence
        </span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Copytrix Intelligence</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a78bfa]/60 bg-[#a78bfa]/15 px-2.5 py-0.5 text-xs font-medium text-[#c4b5fd]">
              <span aria-hidden className="size-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_#a78bfa]" />
              IA Ativa
            </span>
          </div>
          <p className="mt-1 max-w-3xl text-pretty text-[15px] leading-6 text-fg-muted">
            Inteligência Artificial para analisar, interpretar e otimizar seus sinais, canais e operações.
          </p>
        </div>
        <div role="group" aria-label="Período de análise" className="relative flex flex-wrap items-center gap-2">
          {periodOptions.map((option) => {
            const active = option.id === period;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                aria-haspopup={option.id === "custom" ? "dialog" : undefined}
                aria-expanded={option.id === "custom" ? pickerOpen : undefined}
                data-custom-period-trigger={option.id === "custom" ? "" : undefined}
                onClick={() => select(option.id)}
                className={cx(
                  "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  active ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_16px_-4px_rgba(8,127,240,.8)]" : "border-line-strong bg-surface text-fg hover:border-brand/60",
                )}
              >
                {option.id === "custom" && <Icon name="calendar" size={15} />}
                {option.id === "custom" && customRange && period === "custom" ? `${formatIsoDate(customRange.from)} – ${formatIsoDate(customRange.to)}` : option.label}
              </button>
            );
          })}
          {pickerOpen && (
            <CustomRangePopover
              initial={customRange}
              onApply={(range) => {
                onCustomRange(range);
                setPickerOpen(false);
              }}
              onCancel={cancelPicker}
            />
          )}
        </div>
      </header>
    </>
  );
}

export function SummaryCards() {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {summaryCards.map((card, index) => (
        <li key={card.id} className="min-w-0">
          <SummaryCard card={card} active={index === 0} />
        </li>
      ))}
    </ul>
  );
}

export function IntelligenceTabs({ value, onChange }: { value: IntelligenceTab; onChange: (tab: IntelligenceTab) => void }) {
  return (
    <div role="tablist" aria-label="Seções do Copytrix Intelligence" className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {intelligenceTabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            id={`ci-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls="ci-panel"
            onClick={() => onChange(tab.id)}
            className={cx(
              "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
              active ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_16px_-4px_rgba(8,127,240,.8)]" : "border-line-strong bg-surface text-fg hover:border-brand/60",
            )}
          >
            <Icon name={tab.icon} size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
