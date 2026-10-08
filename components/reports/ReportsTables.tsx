import type { ReactNode } from "react";
import { cx } from "../UI";
import { symbolRows, systemRows, type PerformanceRow } from "../../lib/reports-demo";
import ReportPanel from "./ReportPanel";
import { SymbolMark, SystemMark } from "./ReportsIcons";

const head = "whitespace-nowrap px-2 pb-2 text-right text-xs! font-normal text-fg-muted first:pl-1 first:text-left last:pr-1";
const cell = "whitespace-nowrap px-2 py-2.5 text-right text-[13px] tabular first:pl-1 first:text-left last:pr-1";

function PerformanceTable<K extends string>({
  caption,
  firstColumn,
  rows,
  renderMark,
}: {
  caption: string;
  firstColumn: string;
  rows: PerformanceRow<K>[];
  renderMark: (key: K) => ReactNode;
}) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[460px] border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {[firstColumn, "Operações", "Win Rate", "Lucro Líquido", "Resultado em R"].map((h) => (
              <th key={h} scope="col" className={head}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const tone = row.positive ? "text-success" : "text-fg";
            return (
              <tr key={row.key} className="border-t border-[#17344b] text-[#e0e8f0]">
                <td className={cx(cell, "align-middle font-medium")}>
                  <span className="flex items-center gap-2.5">
                    {renderMark(row.key)}
                    {row.name}
                  </span>
                </td>
                <td className={cell}>{row.trades}</td>
                <td className={cell}>{row.winRate}</td>
                <td className={cx(cell, tone)}>{row.profit}</td>
                <td className={cx(cell, tone)}>{row.resultR}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function SymbolPerformanceCard() {
  return (
    <ReportPanel icon="candle" title="Desempenho por Símbolo" description="Resultado consolidado por ativo negociado.">
      <PerformanceTable
        caption="Desempenho por símbolo"
        firstColumn="Símbolo"
        rows={symbolRows}
        renderMark={(key) => <SymbolMark symbol={key} />}
      />
    </ReportPanel>
  );
}

export function SystemPerformanceCard() {
  return (
    <ReportPanel icon="layers" title="Desempenho por Sistema" description="Resultado de cada sistema/canal de sinais.">
      <PerformanceTable
        caption="Desempenho por sistema"
        firstColumn="Sistema"
        rows={systemRows}
        renderMark={(key) => <SystemMark system={key} />}
      />
    </ReportPanel>
  );
}
