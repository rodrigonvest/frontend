import { monthlyPerformance, monthlyTotal } from "../../lib/backtest-demo";
import { Panel } from "./BacktestFields";

const head = "px-2! pb-2! pt-0! text-right text-[11px]! font-normal! text-fg-muted first:pl-3.5! first:text-left last:pr-3.5!";
const cell = "px-2! py-[6.5px]! text-right text-xs align-middle tabular first:pl-3.5! first:text-left last:pr-3.5!";
const underline = "underline decoration-1 underline-offset-4";

export default function MonthlyPerformance() {
  return (
    <Panel title="Performance Mensal" className="pb-1">
      <div className="-mx-3.5 mt-2.5 overflow-x-auto">
        <table className="w-full min-w-[440px] border-collapse text-xs">
          <caption className="sr-only">Performance mensal do backtest</caption>
          <thead>
            <tr>
              <th scope="col" className={head}>Mês</th>
              <th scope="col" className={head}>Operações</th>
              <th scope="col" className={head}>Lucro (USD)</th>
              <th scope="col" className={head}>Lucro (R)</th>
              <th scope="col" className={head}>Win Rate</th>
              <th scope="col" className={head}>Profit Factor</th>
            </tr>
          </thead>
          <tbody>
            {monthlyPerformance.map((row) => (
              <tr key={row.month} className="border-t border-[#17344b] text-[#e0e8f0]">
                <td className={cell}>{row.month}</td>
                <td className={cell}>{row.trades}</td>
                <td className={`${cell} text-success`}>{row.usd}</td>
                <td className={`${cell} text-success`}>{row.r}</td>
                <td className={cell}>{row.winRate}</td>
                <td className={cell}>{row.pf}</td>
              </tr>
            ))}
            <tr className="border-t border-[#2a4c68] bg-[#0b2033] font-semibold text-fg">
              <td className={cell}>{monthlyTotal.month}</td>
              <td className={cell}><span className={underline}>{monthlyTotal.trades}</span></td>
              <td className={`${cell} text-success`}><span className={underline}>{monthlyTotal.usd}</span></td>
              <td className={`${cell} text-success`}><span className={underline}>{monthlyTotal.r}</span></td>
              <td className={cell}><span className={underline}>{monthlyTotal.winRate}</span></td>
              <td className={cell}><span className={underline}>{monthlyTotal.pf}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
