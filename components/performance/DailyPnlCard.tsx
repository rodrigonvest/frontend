import { Panel, SelectField } from "../backtest/BacktestFields";
import { dailyDates, dailyDomain, dailyPnl, dailyTicks } from "../../lib/performance-demo";

const span = dailyDomain.max - dailyDomain.min;
const zeroFromTop = (dailyDomain.max / span) * 100;

export default function DailyPnlCard() {
  return (
    <Panel
      title="Lucro/Prejuízo por Dia"
      action={
        <SelectField aria-label="Agrupamento" defaultValue="Diário" className="h-8 w-[130px]" selectClassName="text-xs">
          <option>Diário</option>
          <option>Semanal</option>
          <option>Mensal</option>
        </SelectField>
      }
    >
      <div role="img" aria-label="Barras de lucro e prejuízo diário entre 21 de junho e 4 de setembro" className="relative mt-2 h-[152px]">
        <div className="absolute bottom-6 left-0 top-1 flex w-12 flex-col justify-between text-[11px] text-fg-muted tabular">
          {dailyTicks.map((t) => <span key={t} className="leading-none">{t}</span>)}
        </div>
        <div className="absolute bottom-6 left-[52px] right-1 top-1.5 border-b border-l border-[#40576b]">
          {[1 / 3, 2 / 3].map((p) => (
            <span key={p} aria-hidden className="absolute inset-x-0 h-px bg-[#17344b]" style={{ top: `${p * 100}%` }} />
          ))}
          <div className="absolute inset-0 flex px-1">
            {dailyPnl.map((value, i) => {
              const height = (Math.abs(value) / span) * 100;
              return (
                <div key={i} className="relative h-full flex-1">
                  <span
                    className={`absolute left-1/2 block w-[62%] -translate-x-1/2 ${value >= 0 ? "bg-[#10d98f]" : "bg-[#ff3b4a]"}`}
                    style={value >= 0 ? { bottom: `${100 - zeroFromTop}%`, height: `${height}%` } : { top: `${zeroFromTop}%`, height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-[52px] right-1 flex justify-between px-1 text-[11px] text-fg-muted tabular">
          {dailyDates.map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>
    </Panel>
  );
}
