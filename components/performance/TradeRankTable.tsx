import { Panel } from "../backtest/BacktestFields";

type RankRow = { id: number; date: string; r: string; usd: string };

const head = "px-1.5 pb-2 text-right text-[11px] font-normal text-fg-muted first:pl-1 first:text-left [&:nth-child(2)]:text-left last:pr-1";
const cell = "px-1.5 py-[7px] text-right text-xs tabular first:pl-1 first:text-left [&:nth-child(2)]:text-left last:pr-1";

export default function TradeRankTable({
  title,
  rows,
  lastColumn,
  tone,
}: {
  title: string;
  rows: RankRow[];
  lastColumn: string;
  tone: "success" | "danger";
}) {
  const toneClass = tone === "success" ? "text-success" : "text-danger";
  return (
    <Panel title={title}>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[300px] border-collapse">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr>
              {["#", "Data/Hora", "Resultado (R)", lastColumn].map((h) => (
                <th key={h} scope="col" className={head}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#17344b] text-[#e0e8f0]">
                <td className={cell}>{row.id}</td>
                <td className={`${cell} whitespace-nowrap`}>{row.date}</td>
                <td className={`${cell} ${toneClass}`}>{row.r}</td>
                <td className={`${cell} ${toneClass}`}>{row.usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
