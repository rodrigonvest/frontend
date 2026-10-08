import { Panel } from "../backtest/BacktestFields";
import { logsActivity, logsActivityDomain, logsActivityLabels } from "../../lib/logs-demo";

const { max, ticks } = logsActivityDomain;

export default function LogsActivityCard() {
  return (
    <Panel className="h-full overflow-hidden p-3! pt-1!" title="Atividade dos Logs (Últimas 24 horas)">
      <div
        role="img"
        aria-label="Quantidade de logs por hora nas últimas 24 horas, com maior atividade no período da tarde e da noite"
        className="relative mt-4 h-[94px]"
      >
        <div className="absolute bottom-[26px] left-0 top-0 w-8 text-[11px] text-fg-muted tabular">
          {ticks.map((tick) => (
            <span key={tick} className="absolute right-1 -translate-y-1/2 leading-none" style={{ top: `${((max - tick) / max) * 100}%` }}>
              {tick}
            </span>
          ))}
        </div>
        <div className="absolute bottom-[26px] left-9 right-1 top-0">
          {ticks.map((tick) => (
            <span
              key={tick}
              aria-hidden
              className={`absolute inset-x-0 h-px ${tick === 0 ? "bg-[#40576b]" : "bg-[#122a3f]"}`}
              style={{ top: `${((max - tick) / max) * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 flex items-end gap-[3px] px-0.5">
            {logsActivity.map((value, hour) => (
              <span
                key={hour}
                className="block flex-1 rounded-t-[2px] bg-[#0b79e8]"
                style={{ height: `${(value / max) * 100}%` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-x-1 bottom-0 left-9 flex justify-between pr-0 text-[11px] text-fg-muted tabular">
          {logsActivityLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
