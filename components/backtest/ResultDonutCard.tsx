import { resultSegments } from "../../lib/backtest-presentation";
import { Panel } from "./Panel";

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 2.2;

function Donut() {
  const { winners, losers, total } = resultSegments;
  const winnersLength = (winners.percent / 100) * CIRCUMFERENCE;
  const losersLength = (losers.percent / 100) * CIRCUMFERENCE;
  return (
    <div className="relative size-[112px] shrink-0 min-[1800px]:size-[120px]" role="img" aria-label={`${total} operações: ${winners.count} vencedoras e ${losers.count} perdedoras`}>
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="#12d99e"
          strokeWidth="15"
          strokeDasharray={`${winnersLength - GAP} ${CIRCUMFERENCE}`}
          strokeDashoffset={-GAP / 2}
        />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="#f5b82e"
          strokeWidth="15"
          strokeDasharray={`${losersLength - GAP} ${CIRCUMFERENCE}`}
          strokeDashoffset={-(winnersLength + GAP / 2)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular text-[22px] font-bold leading-6 text-fg">{total}</span>
        <span className="text-[11px] leading-4 text-fg-muted">Operações</span>
      </div>
    </div>
  );
}

function LegendItem({ color, label, count, percent }: { color: string; label: string; count: number; percent: number }) {
  return (
    <li>
      <div className="flex items-center gap-1.5 text-[12px] leading-4 text-fg-muted">
        <span aria-hidden className="size-2.5 shrink-0 rounded-[3px]" style={{ backgroundColor: color }} />
        {label}
      </div>
      <div className="tabular whitespace-nowrap pl-[9px] text-[13px] font-semibold leading-5 text-fg">
        {count} ({percent}%)
      </div>
    </li>
  );
}

export default function ResultDonutCard() {
  const { winners, losers } = resultSegments;
  return (
    <Panel title="Distribuição por Resultado" className="2xl:h-[278px] 2xl:self-end" padding="px-2.5 pb-3 pt-2.5">
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-4 2xl:flex-nowrap">
        <Donut />
        <ul className="space-y-3.5">
          <LegendItem color="#12d99e" label={winners.label} count={winners.count} percent={winners.percent} />
          <LegendItem color="#ff3d4f" label={losers.label} count={losers.count} percent={losers.percent} />
        </ul>
      </div>
    </Panel>
  );
}
