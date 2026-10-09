"use client";
import Link from "next/link";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { intelligenceTabs, periodOptions, summaryCards, type IntelligenceTab, type Period } from "../../lib/intelligence-demo";
import { SummaryCard } from "./IntelPanels";

export function IntelligenceHeader({ period, onPeriod }: { period: Period; onPeriod: (period: Period) => void }) {
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
        <div role="group" aria-label="Período de análise" className="flex flex-wrap items-center gap-2">
          {periodOptions.map((option) => {
            const active = option.id === period;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onPeriod(option.id)}
                className={cx(
                  "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  active ? "border-brand-strong bg-brand-strong text-white shadow-[0_0_16px_-4px_rgba(8,127,240,.8)]" : "border-line-strong bg-surface text-fg hover:border-brand/60",
                )}
              >
                {option.id === "custom" && <Icon name="calendar" size={15} />}
                {option.label}
              </button>
            );
          })}
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
