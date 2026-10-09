"use client";

import { useMemo, useState } from "react";
import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import {
  equityMax,
  equityPoints,
  equityRanges,
  equityTicks,
  fullRangeLabelDays,
  type EquityRange,
} from "../../lib/system-details-demo";

const GRID_STEPS = [0, 25, 50, 75, 100];

export default function SystemEquityCard({ className }: { className?: string }) {
  const [range, setRange] = useState<EquityRange>("M3");

  const { path, area, labels } = useMemo(() => {
    const data = range === "M1" ? equityPoints.slice(-31) : equityPoints;
    const last = data.length - 1;
    const pts = data.map((p, i) => `${((i / last) * 100).toFixed(2)},${(100 - (p.value / equityMax) * 100).toFixed(2)}`);
    const line = `M${pts.join(" L")}`;
    const idx = range === "M1" ? Array.from({ length: 8 }, (_, i) => Math.round((i * last) / 7)) : fullRangeLabelDays;
    return { path: line, area: `${line} L100,100 L0,100 Z`, labels: idx.map((i) => data[i].label) };
  }, [range]);

  return (
    <DetailPanel
      title="Evolução da Equidade"
      icon={<Icon name="chart" size={19} />}
      className={className}
      action={
        <div className="flex shrink-0 items-center gap-2">
          <label className="relative block">
            <span className="sr-only">Métrica do gráfico</span>
            <select
              defaultValue="Equidade"
              className="h-8 w-[104px] cursor-pointer appearance-none rounded-md border border-[#24435d] bg-[#091a2a] pl-3 pr-7 text-[12.5px] text-fg outline-none focus-visible:border-brand"
            >
              <option>Equidade</option>
            </select>
            <span aria-hidden className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fg-muted">
              <Icon name="chevronDown" size={13} stroke={2.2} />
            </span>
          </label>
          <div role="group" aria-label="Período do gráfico" className="hidden items-center rounded-md border border-[#24435d] bg-[#091a2a] p-0.5 sm:flex">
            {equityRanges.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => setRange(r)}
                className={cx(
                  "h-[26px] min-w-[34px] rounded px-2 text-[11.5px] transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                  range === r ? "bg-brand-strong/40 text-white ring-1 ring-brand-strong" : "text-fg-muted hover:text-fg",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <p className="px-3.5 text-[12px] text-fg-muted">Acompanhe o crescimento da sua conta ao longo do tempo.</p>
      <div className="mt-2 flex flex-1 flex-col px-3.5 pb-3">
        <div className="grid min-h-[150px] flex-1 grid-cols-[46px_minmax(0,1fr)] gap-x-2">
          <div aria-hidden className="relative">
            {equityTicks.map((t, i) => (
              <span
                key={t}
                className="absolute right-0 -translate-y-1/2 text-[11.5px] tabular text-fg-muted"
                style={{ top: `${GRID_STEPS[i]}%` }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="relative" role="img" aria-label="Gráfico de evolução da equidade, de $0 a cerca de $4,600 entre 21/06 e 01/09">
            {GRID_STEPS.map((s) => (
              <span key={s} aria-hidden className="absolute inset-x-0 border-t border-[#17344b]/80" style={{ top: `${s}%` }} />
            ))}
            <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="system-equity-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f8bff" stopOpacity=".55" />
                  <stop offset="100%" stopColor="#1f8bff" stopOpacity=".04" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#system-equity-fill)" />
              <path d={path} fill="none" stroke="#2f95ff" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div aria-hidden className="mt-1.5 flex justify-between pl-[54px] text-[11.5px] tabular text-fg-muted">
          {labels.map((l, i) => (
            <span key={`${l}-${i}`}>{l}</span>
          ))}
        </div>
      </div>
    </DetailPanel>
  );
}
