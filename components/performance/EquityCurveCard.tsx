import { Panel, SelectField } from "../backtest/BacktestFields";
import { equityDates, equityDomain, equitySeries, equityTicks } from "../../lib/backtest-demo";

export default function EquityCurveCard() {
  const { min, max } = equityDomain;
  const points = equitySeries.map((v, i) => `${(i / (equitySeries.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`);
  const line = points.join(" ");
  const area = `0,100 ${line} 100,100`;

  return (
    <Panel
      title="Curva de Equidade"
      action={
        <SelectField aria-label="Métrica da curva" defaultValue="Saldo" className="h-8 w-[130px]" selectClassName="text-xs">
          <option>Saldo</option>
          <option>Equidade</option>
        </SelectField>
      }
    >
      <div role="img" aria-label="Curva de equidade crescendo de $700 para cerca de $1,500 entre 21 de junho e 4 de setembro" className="relative mt-2 h-[152px]">
        <div className="absolute bottom-6 left-0 top-1 flex w-12 flex-col justify-between text-[11px] text-fg-muted tabular">
          {equityTicks.map((t) => <span key={t} className="leading-none">{t}</span>)}
        </div>
        <div className="absolute bottom-6 left-[52px] right-1 top-1.5 border-b border-l border-[#40576b]">
          {[0.25, 0.5, 0.75].map((p) => (
            <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#17344b]" style={{ top: `${p * 100}%` }} />
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="perf-equity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12d99e" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#12d99e" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <polygon points={area} fill="url(#perf-equity-fill)" />
            <polyline points={line} fill="none" stroke="#12d99e" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-[52px] right-1 flex justify-between px-1 text-[11px] text-fg-muted tabular">
          {equityDates.map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>
    </Panel>
  );
}
