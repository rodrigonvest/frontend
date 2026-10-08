import { Panel } from "../backtest/BacktestFields";
import { hourlyAxisMax, hourlyPerformance, hourlyTicks } from "../../lib/performance-demo";

export default function HourlyPerformanceCard() {
  return (
    <Panel
      title="Horários de Maior Performance (BRT)"
      action={
        <div className="flex items-center gap-4 text-xs text-fg-muted">
          <span className="flex items-center gap-1.5"><i aria-hidden className="size-2.5 rounded-[3px] bg-[#12d99e]" />Lucro</span>
          <span className="flex items-center gap-1.5"><i aria-hidden className="size-2.5 rounded-[3px] bg-[#ff4d5d]" />Prejuízo</span>
        </div>
      }
    >
      <div role="img" aria-label="Operações com lucro e prejuízo por hora do dia, de 00 a 23" className="relative mt-2 h-[112px]">
        <span aria-hidden className="absolute left-0 top-1/2 -translate-x-[30%] -translate-y-1/2 -rotate-90 text-[10.5px] text-fg-muted">Operações</span>
        <div className="absolute bottom-6 left-6 top-1 flex w-6 flex-col justify-between text-[11px] text-fg-muted tabular">
          {hourlyTicks.map((t) => <span key={t} className="text-right leading-none">{t}</span>)}
        </div>
        <div className="absolute bottom-6 left-[56px] right-1 top-1.5 border-b border-l border-[#40576b]">
          {[0.33, 0.66].map((p) => (
            <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#17344b]" style={{ top: `${p * 100}%` }} />
          ))}
          <div className="absolute inset-0 flex">
            {hourlyPerformance.map((slot) => (
              <div key={slot.hour} className="flex h-full flex-1 items-end justify-center gap-px px-px">
                <span className="block w-1/2 max-w-[8px] rounded-t-[2px] bg-[#12d99e]" style={{ height: `${(slot.profit / hourlyAxisMax) * 100}%` }} />
                <span className="block w-1/2 max-w-[8px] rounded-t-[2px] bg-[#ff4d5d]" style={{ height: `${(slot.loss / hourlyAxisMax) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-[56px] right-1 flex text-[10.5px] text-fg-muted tabular">
          {hourlyPerformance.map((slot) => (
            <span key={slot.hour} className="flex-1 text-center">{slot.hour}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
