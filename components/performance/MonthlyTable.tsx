import { Panel } from "../backtest/BacktestFields";
import { monthlyRows, monthlyTotalRow } from "../../lib/performance-demo";

const head = "whitespace-nowrap px-[3px] pb-1.5 text-right text-[10.5px] font-normal text-fg-muted first:pl-1 first:text-left last:pr-1";
const cell = "whitespace-nowrap px-[3px] py-[5px] text-right text-[11px] tabular first:pl-1 first:text-left last:pr-1";
const underline = "underline decoration-1 underline-offset-4";

export default function MonthlyTable({ title = "Desempenho por Mês" }: { title?: string }) {
  return (
    <Panel title={title}>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-0 border-collapse">
          <caption className="sr-only">Desempenho por mês</caption>
          <thead>
            <tr>
              {["Mês", "Operações", "Vitórias", "Derrotas", "Win Rate", "Lucro (USD)", "Lucro (R)", "Profit Factor"].map((h) => (
                <th key={h} scope="col" className={head}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthlyRows.map((row) => (
              <tr key={row.month} className="border-t border-[#17344b] text-[#e0e8f0]">
                <td className={cell}>{row.month}</td>
                <td className={cell}>{row.trades}</td>
                <td className={`${cell} text-success`}>{row.wins}</td>
                <td className={`${cell} text-danger`}>{row.losses}</td>
                <td className={cell}>{row.winRate}</td>
                <td className={`${cell} text-success`}>{row.usd}</td>
                <td className={`${cell} text-success`}>{row.r}</td>
                <td className={cell}>{row.pf}</td>
              </tr>
            ))}
            <tr className="border-t border-[#2a4c68] bg-[#0b2033] font-semibold text-fg">
              <td className={cell}>{monthlyTotalRow.month}</td>
              <td className={cell}><span className={underline}>{monthlyTotalRow.trades}</span></td>
              <td className={`${cell} text-success`}><span className={underline}>{monthlyTotalRow.wins}</span></td>
              <td className={`${cell} text-danger`}><span className={underline}>{monthlyTotalRow.losses}</span></td>
              <td className={cell}><span className={underline}>{monthlyTotalRow.winRate}</span></td>
              <td className={`${cell} text-success`}><span className={underline}>{monthlyTotalRow.usd}</span></td>
              <td className={`${cell} text-success`}><span className={underline}>{monthlyTotalRow.r}</span></td>
              <td className={cell}><span className={underline}>{monthlyTotalRow.pf}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
