import { Panel, SelectField } from "../backtest/BacktestFields";
import { analysisDates, equityAxisMax, equityAxisTicks, equityEvolution, equitySummary } from "../../lib/analysis-demo";
import type { TextTone } from "../../lib/performance-demo";

const tones: Record<TextTone, string> = {
  default: "text-fg",
  success: "text-success",
  danger: "text-danger",
  muted: "text-fg-muted",
};

export default function EquityEvolutionCard() {
  const line = equityEvolution
    .map((v, i) => `${(i / (equityEvolution.length - 1)) * 100},${100 - (v / equityAxisMax) * 100}`)
    .join(" ");
  const area = `0,100 ${line} 100,100`;

  return (
    <Panel
      title="Evolução da Equidade"
      action={
        <SelectField aria-label="Métrica da evolução" defaultValue="Equidade" className="h-8 w-[130px]" selectClassName="text-xs">
          <option>Equidade</option>
          <option>Saldo</option>
        </SelectField>
      }
    >
      <dl className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {equitySummary.map((item) => (
          <div key={item.label} className="rounded-md border border-[#17344b] bg-[#081726]/80 px-2.5 py-1.5">
            <dt className="text-[11px] leading-4 text-fg-muted">{item.label}</dt>
            <dd className={`mt-0.5 text-[15px] font-semibold leading-5 tabular ${tones[item.tone]}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
      <div role="img" aria-label="Evolução da equidade de $1,000 para $5,187.50 entre 21 de junho e 4 de setembro" className="relative mt-3 h-[152px]">
        <div className="absolute bottom-6 left-0 top-1 flex w-12 flex-col justify-between text-[11px] text-fg-muted tabular">
          {equityAxisTicks.map((t) => <span key={t} className="-my-1 leading-none">{t}</span>)}
        </div>
        <div className="absolute bottom-6 left-[52px] right-1 top-1.5 border-b border-l border-[#40576b]">
          {[1, 2, 3, 4, 5].map((p) => (
            <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#122a3f]" style={{ top: `${(p / 6) * 100}%` }} />
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="analysis-equity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12d99e" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#12d99e" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <polygon points={area} fill="url(#analysis-equity-fill)" />
            <polyline points={line} fill="none" stroke="#12d99e" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-[52px] right-1 flex justify-between px-1 text-[11px] text-fg-muted tabular">
          {analysisDates.map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>
    </Panel>
  );
}
