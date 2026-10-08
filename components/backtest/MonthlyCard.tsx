import { monthlyPerformance, monthlyTotal } from "../../lib/backtest-presentation";
import { cx } from "../UI";
import { Panel } from "./Panel";

const columns = "grid-cols-[60fr_86fr_80fr_94fr_78fr_87fr]";
const headers = ["Mês", "Operações", "Lucro (USD)", "Lucro (R)", "Win Rate", "Profit Factor"];

type Row = typeof monthlyTotal;

function MonthRow({ row, total }: { row: Row; total?: boolean }) {
  const cell = cx("tabular text-center", total && "font-semibold underline decoration-fg-subtle/60 underline-offset-[3px]");
  return (
    <div
      role="row"
      className={cx(
        "grid items-center text-[12px] text-fg",
        columns,
        total ? "mt-1 h-8 rounded-md bg-[#071522] font-semibold" : "h-[30px] border-t border-[#143049]",
      )}
    >
      <span role="cell" className={cx("pl-1", total && "font-semibold")}>
        {row.month}
      </span>
      <span role="cell" className={cell}>
        {row.trades}
      </span>
      <span role="cell" className={cx(cell, "text-success")}>
        {row.usd}
      </span>
      <span role="cell" className={cx(cell, "text-success")}>
        {row.r}
      </span>
      <span role="cell" className={cell}>
        {row.winRate}
      </span>
      <span role="cell" className={cell}>
        {row.pf}
      </span>
    </div>
  );
}

export default function MonthlyCard() {
  return (
    <Panel title="Performance Mensal" className="2xl:h-[226px]" padding="px-3 pb-3 pt-2">
      <div role="table" aria-label="Performance mensal" className="mt-2.5 overflow-x-auto">
        <div className="min-w-[440px]">
          <div role="row" className={cx("grid h-6 items-center text-[11px] text-fg-muted", columns)}>
            {headers.map((h, i) => (
              <span key={h} role="columnheader" className={cx(i > 0 && "text-center", i === 0 && "pl-1")}>
                {h}
              </span>
            ))}
          </div>
          {monthlyPerformance.map((row) => (
            <MonthRow key={row.month} row={row} />
          ))}
          <MonthRow row={monthlyTotal} total />
        </div>
      </div>
    </Panel>
  );
}
