import { SelectField } from "../backtest/BacktestFields";
import { equityLabels, equityMax, equitySeries, equityTicks } from "../../lib/reports-demo";
import ReportPanel from "./ReportPanel";

export default function ReportsEquityCard() {
  const last = equitySeries.length - 1;
  const line = equitySeries.map((v, i) => `${(i / last) * 100},${100 - (v / equityMax) * 100}`).join(" ");
  const area = `0,100 ${line} 100,100`;

  return (
    <ReportPanel
      icon="chart"
      title="Evolução da Equidade"
      description="Acompanhe o crescimento da sua conta ao longo do tempo."
      action={
        <SelectField aria-label="Métrica da evolução" defaultValue="Equidade" className="h-9 w-[130px]" selectClassName="text-[13px]">
          <option>Equidade</option>
          <option>Saldo</option>
        </SelectField>
      }
    >
      <div role="img" aria-label="Evolução da equidade de $0 a cerca de $4.800 entre 1 e 30 de setembro" className="relative mt-4 h-[200px]">
        <div className="absolute bottom-7 left-0 top-1.5 flex w-14 flex-col justify-between text-[11px] text-fg-muted tabular">
          {equityTicks.map((t) => (
            <span key={t} className="-my-1 leading-none">{t}</span>
          ))}
        </div>
        <div className="absolute bottom-7 left-[60px] right-1 top-1.5 border-b border-l border-[#40576b]">
          {[1, 2, 3].map((p) => (
            <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#122a3f]" style={{ top: `${(p / 4) * 100}%` }} />
          ))}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="reports-equity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f78ff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#1f78ff" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <polygon points={area} fill="url(#reports-equity-fill)" />
            <polyline points={line} fill="none" stroke="#2b86ff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-[60px] right-1 h-5 text-[11px] text-fg-muted tabular">
          {equityLabels.map(({ day, label }) => (
            <span key={label} className="absolute top-0 -translate-x-1/2" style={{ left: `${((day - 1) / 29) * 100}%` }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </ReportPanel>
  );
}
