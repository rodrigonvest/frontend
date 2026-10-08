import { Panel } from "../backtest/BacktestFields";
import { rResultAxisMax, rResultBuckets, rResultTicks } from "../../lib/analysis-demo";

export default function RResultDistributionCard() {
  return (
    <Panel title="Distribuição de Resultados (R)">
      <div role="img" aria-label="Histograma de resultados em R: 16, 63, 28, 31, 22 e 7 operações" className="relative mt-2 h-[212px]">
        <div className="absolute bottom-6 left-0 top-2 w-7 text-[11px] text-fg-muted tabular">
          {rResultTicks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 leading-none"
              style={{ top: `${100 - (t / rResultAxisMax) * 100}%` }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="absolute inset-y-0 left-10 right-0">
          <div className="absolute inset-x-0 bottom-6 top-2 border-b border-l border-[#40576b]">
            {rResultTicks.slice(0, -1).map((t) => (
              <span key={t} aria-hidden className="absolute inset-x-0 h-px bg-[#122a3f]" style={{ top: `${100 - (t / rResultAxisMax) * 100}%` }} />
            ))}
            <div className="absolute inset-0 flex items-end justify-around px-1">
              {rResultBuckets.map((item) => (
                <div key={item.label} className="relative h-full w-full">
                  <span
                    className={`absolute bottom-0 left-1/2 block w-[56%] max-w-[50px] -translate-x-1/2 rounded-t-[3px] ${item.negative ? "bg-[#ff3b4a]" : "bg-[#10d98f]"}`}
                    style={{ height: `${(item.value / rResultAxisMax) * 100}%` }}
                  />
                  <span
                    className="absolute left-0 right-0 text-center text-xs font-medium leading-none text-fg tabular"
                    style={{ bottom: `calc(${(item.value / rResultAxisMax) * 100}% + 5px)` }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-around px-1 text-[11px] text-fg-muted">
            {rResultBuckets.map((item) => (
              <span key={item.label} className="w-full text-center tabular">{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
