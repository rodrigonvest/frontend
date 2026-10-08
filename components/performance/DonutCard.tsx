import { Panel } from "../backtest/BacktestFields";
import type { DonutSegment } from "../../lib/performance-demo";

const radius = 50;
const circumference = 2 * Math.PI * radius;
const gap = 0.008;

export default function DonutCard({ title, segments, total, label }: { title: string; segments: DonutSegment[]; total: number; label: string }) {
  let offset = 0;
  const arcs = segments.map((segment) => {
    const share = segment.count / total;
    const arc = { ...segment, length: Math.max(share - gap, 0) * circumference, start: offset * circumference + (gap / 2) * circumference };
    offset += share;
    return arc;
  });

  return (
    <Panel title={title}>
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3 sm:flex-nowrap">
        <div className="relative size-[132px] shrink-0">
          <svg viewBox="0 0 130 130" className="size-full -rotate-90" role="img" aria-label={`${label}: ${segments.map((s) => `${s.label} ${s.count}`).join(", ")}`}>
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx="65"
                cy="65"
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth="18"
                strokeDasharray={`${arc.length} ${circumference}`}
                strokeDashoffset={-arc.start}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-[22px] font-semibold leading-none tracking-tight text-fg tabular">{total}</strong>
            <span className="mt-1 text-[10.5px] text-fg-muted">{label}</span>
          </div>
        </div>
        <ul className="grid min-w-0 flex-1 gap-y-2 text-xs">
          {segments.map((segment) => (
            <li key={segment.label} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3">
              <span className="flex min-w-0 items-center gap-2 text-fg">
                <span aria-hidden className="size-3 shrink-0 rounded-[3px]" style={{ backgroundColor: segment.color }} />
                <span className="truncate">{segment.label}</span>
              </span>
              <span className="text-right text-fg-muted tabular">{segment.count}</span>
              <span className="min-w-[52px] text-right text-fg-muted tabular">({segment.share})</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
