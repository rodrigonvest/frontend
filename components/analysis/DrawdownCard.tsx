import { Panel } from "../backtest/BacktestFields";
import { analysisDates, drawdownAxisMin, drawdownSeries, drawdownStats, drawdownTicks } from "../../lib/analysis-demo";
import type { TextTone } from "../../lib/performance-demo";

const noteTones: Record<TextTone, string> = {
  default: "text-fg",
  success: "text-success",
  danger: "text-danger",
  muted: "text-fg-muted",
};

export default function DrawdownCard() {
  const line = drawdownSeries
    .map((v, i) => `${(i / (drawdownSeries.length - 1)) * 100},${(v / drawdownAxisMin) * 100}`)
    .join(" ");
  const area = `0,0 ${line} 100,0`;

  return (
    <Panel title="Análise de Drawdown">
      <div className="mt-2 grid gap-3 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div role="img" aria-label="Curva de drawdown entre 21 de junho e 4 de setembro, com máximo de 12,1%" className="relative h-[124px]">
          <div className="absolute bottom-5 left-0 top-1 flex w-10 flex-col justify-between text-[11px] text-fg-muted tabular">
            {drawdownTicks.map((t) => <span key={t} className="-my-1 text-right leading-none">{t}</span>)}
          </div>
          <div className="absolute bottom-5 left-12 right-1 top-1.5 border-b border-l border-[#40576b]">
            {[0.25, 0.5, 0.75].map((p) => (
              <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#122a3f]" style={{ top: `${p * 100}%` }} />
            ))}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="analysis-drawdown-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4d5d" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ff4d5d" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <polygon points={area} fill="url(#analysis-drawdown-fill)" />
              <polyline points={line} fill="none" stroke="#ff4d5d" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-12 right-1 flex justify-between px-1 text-[10.5px] text-fg-muted tabular">
            {analysisDates.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-1.5">
          {drawdownStats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col justify-between rounded-lg border border-[#17344b] bg-[#081726]/80 px-2.5 py-2">
              <dt className="text-[10.5px] leading-[14px] text-fg-muted">{stat.label}</dt>
              <dd className="mt-1.5">
                <span className="block text-lg font-semibold leading-none text-fg tabular">{stat.value}</span>
                <span className={`mt-1 block text-[11px] leading-4 tabular ${noteTones[stat.noteTone]}`}>{stat.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}
