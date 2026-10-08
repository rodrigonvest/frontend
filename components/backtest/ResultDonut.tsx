import { Panel } from "./BacktestFields";

const radius = 50;
const circumference = 2 * Math.PI * radius;
const winShare = 0.527;
const gap = 0.012;

export default function ResultDonut() {
  const winLength = (winShare - gap) * circumference;
  const lossLength = (1 - winShare - gap) * circumference;

  return (
    <Panel title="Distribuição por Resultado">
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-4 xl:flex-nowrap xl:justify-start">
        <div className="relative -ml-1 size-[116px] shrink-0">
          <svg viewBox="0 0 130 130" className="size-full -rotate-90" role="img" aria-label="167 operações: 88 vencedoras e 79 perdedoras">
            <circle cx="65" cy="65" r={radius} fill="none" stroke="#ff4d5d" strokeWidth="18" strokeDasharray={`${lossLength} ${circumference}`} strokeDashoffset={-(winShare + gap / 2) * circumference} />
            <circle cx="65" cy="65" r={radius} fill="none" stroke="#12d99e" strokeWidth="18" strokeDasharray={`${winLength} ${circumference}`} strokeDashoffset={-(gap / 2) * circumference} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-xl font-semibold leading-none tracking-tight text-fg tabular">167</strong>
            <span className="mt-1 text-[9.5px] text-fg-muted">Operações</span>
          </div>
        </div>
        <ul className="flex min-w-0 flex-col gap-3 whitespace-nowrap text-[11px]">
          <li>
            <span className="flex items-center gap-1.5 text-fg-muted"><span aria-hidden className="size-2.5 rounded-[3px] bg-success" />Vencedoras</span>
            <span className="mt-0.5 block pl-4 text-[12.5px] font-semibold text-fg tabular">88 (52.7%)</span>
          </li>
          <li>
            <span className="flex items-center gap-1.5 text-fg-muted"><span aria-hidden className="size-2.5 rounded-[3px] bg-danger" />Perdedoras</span>
            <span className="mt-0.5 block pl-4 text-[12.5px] font-semibold text-fg tabular">79 (47.3%)</span>
          </li>
        </ul>
      </div>
    </Panel>
  );
}
