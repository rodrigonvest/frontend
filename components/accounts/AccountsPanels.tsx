import type { ReactNode } from "react";
import { formatUsd, platformDistribution, presentationAccounts, statusDistribution } from "../../lib/accounts-presentation";

type Segment = { label: string; color: string; percent: number; count: number };

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="h-full min-w-0 rounded-lg border border-line bg-gradient-to-b from-surface-2/40 to-surface p-4">
      <h3 className="text-[15px] font-semibold text-fg">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Donut({ segments, total }: { segments: Segment[]; total: number }) {
  const visible = segments.filter((s) => s.percent > 0);
  const offsets = visible.map((_, i) => visible.slice(0, i).reduce((sum, s) => sum + s.percent, 0));
  return (
    <div className="relative size-[148px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#0b2236" strokeWidth="16" />
        {visible.map((s, i) => (
          <circle
            key={s.label}
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={s.color}
            strokeWidth="16"
            strokeDasharray={`${(s.percent / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={-(offsets[i] / 100) * CIRCUMFERENCE}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular text-2xl font-bold leading-none text-fg">{total}</span>
        <span className="mt-1 text-xs text-fg-subtle">Contas</span>
      </div>
    </div>
  );
}

function Legend({ segments }: { segments: Segment[] }) {
  return (
    <ul className="min-w-[150px] flex-1 space-y-3">
      {segments.map((s) => (
        <li key={s.label} className="flex items-center gap-2.5 text-[13px]">
          <span aria-hidden className="size-4 shrink-0 rounded-[4px]" style={{ backgroundColor: s.color }} />
          <span className="min-w-0 flex-1 truncate text-fg-muted">{s.label}</span>
          <span className="tabular whitespace-nowrap text-fg">
            {s.percent}% ({s.count})
          </span>
        </li>
      ))}
    </ul>
  );
}

function DonutPanel({ title, segments, total }: { title: string; segments: Segment[]; total: number }) {
  return (
    <Panel title={title}>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:justify-between">
        <Donut segments={segments} total={total} />
        <Legend segments={segments} />
      </div>
    </Panel>
  );
}

function EquityPanel() {
  const max = Math.max(...presentationAccounts.map((a) => a.equity));
  return (
    <Panel title="Equity por Conta">
      <ul className="space-y-3.5">
        {presentationAccounts.map((a) => (
          <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[136px_minmax(0,1fr)_auto]">
            <span className="truncate text-[13px] text-fg-muted">{a.name}</span>
            <span className="tabular text-right text-[13px] font-medium text-fg sm:order-3">{formatUsd(a.equity)}</span>
            <div
              role="img"
              aria-label={`${a.name}: ${formatUsd(a.equity)}`}
              className="col-span-2 h-4 overflow-hidden rounded-[3px] bg-[#0b2236] sm:order-2 sm:col-span-1"
            >
              <div className="h-full rounded-[3px]" style={{ width: `${Math.max((a.equity / max) * 100, 4)}%`, backgroundColor: a.barColor }} />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export default function AccountsPanels() {
  return (
    <div className="grid gap-2 lg:grid-cols-2 2xl:grid-cols-[1fr_1.1fr_1fr]">
      <DonutPanel title="Distribuição por Plataforma" segments={platformDistribution} total={5} />
      <EquityPanel />
      <div className="lg:col-span-2 2xl:col-span-1">
        <DonutPanel title="Status das Contas" segments={statusDistribution} total={5} />
      </div>
    </div>
  );
}
