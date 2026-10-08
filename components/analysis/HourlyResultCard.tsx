import { Panel } from "../backtest/BacktestFields";
import { hourlyResultDomain, hourlyResults, hourlyResultTicks } from "../../lib/analysis-demo";

const span = hourlyResultDomain.max - hourlyResultDomain.min;
const zeroTop = (hourlyResultDomain.max / span) * 100;

export default function HourlyResultCard() {
  return (
    <Panel
      title="Horários de Maior Performance (BRT)"
      action={
        <div className="flex items-center gap-4 text-xs text-fg-muted">
          <span className="flex items-center gap-1.5"><i aria-hidden className="size-2.5 rounded-[3px] bg-[#12d99e]" />Lucro (R)</span>
          <span className="flex items-center gap-1.5"><i aria-hidden className="size-2.5 rounded-[3px] bg-[#ff4d5d]" />Prejuízo (R)</span>
        </div>
      }
    >
      <div role="img" aria-label="Resultado em R por hora do dia, de 00 a 23, separando lucro e prejuízo" className="relative mt-2 h-[132px]">
        <span aria-hidden className="absolute left-0 top-[44%] origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10.5px] text-fg-muted">Resultado (R)</span>
        <div className="absolute bottom-9 left-5 top-1.5 w-7 text-[11px] text-fg-muted tabular">
          {hourlyResultTicks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 leading-none"
              style={{ top: `${((hourlyResultDomain.max - t) / span) * 100}%` }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="absolute bottom-9 left-[58px] right-1 top-1.5 border-l border-[#40576b]">
          {hourlyResultTicks.map((t) => (
            <span
              key={t}
              aria-hidden
              className={`absolute inset-x-0 h-px ${t === 0 ? "bg-[#40576b]" : "bg-[#122a3f]"}`}
              style={{ top: `${((hourlyResultDomain.max - t) / span) * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 flex">
            {hourlyResults.map((slot) => (
              <div key={slot.hour} className="relative h-full flex-1">
                <span
                  className="absolute left-1/2 block w-[62%] max-w-[10px] -translate-x-1/2 rounded-t-[2px] bg-[#12d99e]"
                  style={{ bottom: `${100 - zeroTop}%`, height: `${(slot.profit / span) * 100}%` }}
                />
                <span
                  className="absolute left-1/2 block w-[62%] max-w-[10px] -translate-x-1/2 rounded-b-[2px] bg-[#ff4d5d]"
                  style={{ top: `${zeroTop}%`, height: `${(Math.abs(slot.loss) / span) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-[18px] left-[58px] right-1 flex text-[10px] text-fg-muted tabular">
          {hourlyResults.map((slot) => (
            <span key={slot.hour} className="flex-1 text-center">{slot.hour}</span>
          ))}
        </div>
        <span className="absolute inset-x-0 bottom-0 pl-[58px] text-center text-[10.5px] text-fg-muted">Hora do Dia (BRT)</span>
      </div>
    </Panel>
  );
}
