import { Panel } from "../backtest/BacktestFields";
import { logsByLevel, logsTotal } from "../../lib/logs-demo";

const radius = 50;
const circumference = 2 * Math.PI * radius;
const gap = 0.006;

export default function LogsByLevelCard() {
  let offset = 0;
  const arcs = logsByLevel.map((segment) => {
    const share = segment.count / logsTotal;
    const arc = { ...segment, length: Math.max(share - gap, 0) * circumference, start: (offset + gap / 2) * circumference };
    offset += share;
    return arc;
  });

  return (
    <Panel className="h-full overflow-hidden p-3! pt-1!" title="Logs por Nível">
      <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3 sm:flex-nowrap">
        <div className="relative ml-1 size-[128px] shrink-0">
          <svg
            viewBox="0 0 130 130"
            className="size-full -rotate-90"
            role="img"
            aria-label={`Logs por nível: ${logsByLevel.map((s) => `${s.label} ${s.display} (${s.share})`).join(", ")}`}
          >
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
            <strong className="text-[19px] font-semibold leading-none tracking-tight text-fg tabular">2,847</strong>
            <span className="mt-1 text-[10.5px] text-fg-muted">Logs</span>
          </div>
        </div>
        <ul className="grid min-w-0 flex-1 gap-y-2 text-[13px]">
          {logsByLevel.map((segment) => (
            <li key={segment.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3">
              <span className="flex min-w-0 items-center gap-2 text-fg">
                <span aria-hidden className="size-3 shrink-0 rounded-[3px]" style={{ backgroundColor: segment.color }} />
                <span className="truncate">{segment.label}</span>
              </span>
              <span className="whitespace-nowrap text-fg-muted tabular">
                <span className="text-fg">{segment.display}</span> ({segment.share})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
