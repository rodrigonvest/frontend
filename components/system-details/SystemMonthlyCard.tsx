import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import { monthlyRows, monthlyTotal } from "../../lib/system-details-demo";

const columns = "grid grid-cols-[minmax(0,1fr)_68px_56px_86px_104px] items-center gap-x-2";

export default function SystemMonthlyCard({ className }: { className?: string }) {
  const rows = [...monthlyRows, monthlyTotal];

  return (
    <DetailPanel title="Desempenho por Mês" icon={<Icon name="calendar" size={19} />} className={className}>
      <div role="table" aria-label="Desempenho por mês" className="mx-3.5 mb-3 mt-2 flex flex-1 flex-col text-[12.5px] tabular">
        <div role="row" className={cx(columns, "pb-1.5 text-[12px] text-fg-muted")}>
          <span role="columnheader">Mês</span>
          <span role="columnheader" className="text-right">Operações</span>
          <span role="columnheader" className="text-right">Win Rate</span>
          <span role="columnheader" className="text-right">Lucro Líquido</span>
          <span role="columnheader" className="text-right">Resultado em R</span>
        </div>
        {rows.map((r) => {
          const total = r.month === "Total";
          return (
            <div
              key={r.month}
              role="row"
              className={cx(
                columns,
                "min-h-[24px] flex-1 border-t border-[#17344b]/60",
                total && "mt-0.5 border-t-[#24435d] font-semibold",
              )}
            >
              <span role="cell" className="text-fg">{r.month}</span>
              <span role="cell" className="text-right text-fg">{r.trades}</span>
              <span role="cell" className="text-right text-fg">{r.winRate}</span>
              <span role="cell" className="text-right text-success">{r.profit}</span>
              <span role="cell" className="text-right text-success">{r.resultR}</span>
            </div>
          );
        })}
      </div>
    </DetailPanel>
  );
}
