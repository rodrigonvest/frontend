import { backtestMetrics, equityDates, equityDomain, equitySeries, equityTicks } from "../../lib/backtest-demo";
import { Panel, SelectField } from "./BacktestFields";

function MetricBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-lg border border-[#17344b] bg-[#081726]/80 px-2.5 py-2">
      <p className="whitespace-nowrap text-[10.5px] text-fg-muted">{label}</p>
      <div className="mt-1.5 whitespace-nowrap text-xl font-semibold leading-none tracking-tight text-fg tabular">{children}</div>
    </div>
  );
}

function EquityChart() {
  const { min, max } = equityDomain;
  const points = equitySeries.map((v, i) => `${(i / (equitySeries.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`);
  const line = points.join(" ");
  const area = `0,100 ${line} 100,100`;

  return (
    <div role="img" aria-label="Curva de equidade crescendo de $700 para cerca de $1,500 entre 21 de junho e 4 de setembro" className="relative mt-2 h-[136px]">
      <div className="absolute bottom-6 left-0 top-1 flex w-12 flex-col justify-between text-[11px] text-fg-muted tabular">
        {equityTicks.map((t) => <span key={t} className="leading-none">{t}</span>)}
      </div>
      <div className="absolute bottom-6 left-[52px] right-1 top-1.5 border-b border-l border-[#40576b]">
        {[0.25, 0.5, 0.75].map((p) => (
          <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#17344b]" style={{ top: `${p * 100}%` }} />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="bt-equity-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12d99e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#12d99e" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <polygon points={area} fill="url(#bt-equity-fill)" />
          <polyline points={line} fill="none" stroke="#12d99e" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[52px] right-1 flex justify-between px-1 text-[11px] text-fg-muted tabular">
        {equityDates.map((d) => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

export default function BacktestResults() {
  return (
    <Panel title="Resultados do Backtest">
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1.25fr_1fr_1fr]">
        <MetricBox label="Total de Operações">{backtestMetrics.totalTrades}</MetricBox>
        <MetricBox label="Taxa de Vitória">{backtestMetrics.winRate}</MetricBox>
        <MetricBox label="Lucro Total">
          <span className="text-success">{backtestMetrics.totalProfit}</span>
          <span className="mt-1 block text-[11px] font-normal leading-none text-fg-muted">{backtestMetrics.totalProfitR}</span>
        </MetricBox>
        <MetricBox label="Profit Factor">{backtestMetrics.profitFactor}</MetricBox>
        <MetricBox label="Drawdown Máximo">{backtestMetrics.maxDrawdown}</MetricBox>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-fg">Curva de Equidade</h3>
        <SelectField aria-label="Métrica da curva" defaultValue="Saldo" className="h-7 w-[132px]" selectClassName="text-xs">
          <option>Saldo</option>
          <option>Equidade</option>
        </SelectField>
      </div>
      <EquityChart />
    </Panel>
  );
}
