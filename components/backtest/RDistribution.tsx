import { rDistribution } from "../../lib/backtest-demo";
import { Panel } from "./BacktestFields";

const axisMax = 70;
const ticks = [70, 60, 50, 40, 30, 20, 10, 0];

export default function RDistribution() {
  return (
    <Panel title="Distribuição de Resultados (R)">
      <div role="img" aria-label="Histograma de resultados em R: 16, 63, 28, 31, 22 e 7 operações" className="relative mt-3 h-[165px]">
        <div className="absolute bottom-6 left-0 top-3 flex w-7 flex-col justify-between text-[11px] text-fg-muted tabular">
          {ticks.map((t) => <span key={t} className="-my-1.5 leading-none">{t}</span>)}
        </div>
        <div className="absolute inset-y-0 left-8 right-0">
          <div className="absolute inset-x-0 bottom-6 top-3 border-b border-l border-[#40576b]">
            {ticks.slice(1, -1).map((t) => (
              <span key={t} aria-hidden className="absolute inset-x-0 h-px bg-[#122a3f]" style={{ top: `${100 - (t / axisMax) * 100}%` }} />
            ))}
            <div className="absolute inset-0 flex items-end justify-around px-1">
              {rDistribution.map((item) => (
                <div key={item.label} className="relative h-full w-full">
                  <span
                    className={`absolute bottom-0 left-1/2 block w-[52%] max-w-[46px] -translate-x-1/2 rounded-t-[3px] ${item.negative ? "bg-[#ff3b4a]" : "bg-[#10d98f]"}`}
                    style={{ height: `${(item.value / axisMax) * 100}%` }}
                  />
                  <span
                    className="absolute left-0 right-0 text-center text-xs font-medium leading-none text-fg tabular"
                    style={{ bottom: `calc(${(item.value / axisMax) * 100}% + 5px)` }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-around px-1 text-[11px] text-fg-muted">
            {rDistribution.map((item) => (
              <span key={item.label} className="w-full text-center tabular">{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
