import { Panel } from "../backtest/BacktestFields";
import { scatterDomain, scatterXTicks, scatterYTicks, tradeResults } from "../../lib/analysis-demo";

const { xMax, yMin, yMax } = scatterDomain;
const ySpan = yMax - yMin;

export default function RiskReturnCard() {
  return (
    <Panel
      title="Relação Risco x Retorno"
      action={
        <div className="flex items-center gap-4 text-xs text-fg-muted">
          <span className="flex items-center gap-1.5"><i aria-hidden className="size-2.5 rounded-[3px] bg-[#12d99e]" />Lucro</span>
          <span className="flex items-center gap-1.5"><i aria-hidden className="size-2.5 rounded-[3px] bg-[#ff4d5d]" />Prejuízo</span>
        </div>
      }
    >
      <div role="img" aria-label="Dispersão do resultado em R de cada uma das 167 operações" className="relative mt-2 h-[118px]">
        <span aria-hidden className="absolute left-0 top-1/2 origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10.5px] text-fg-muted">Resultado (R)</span>
        <div className="absolute bottom-8 left-5 top-1.5 w-6 text-[11px] text-fg-muted tabular">
          {scatterYTicks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2 leading-none" style={{ top: `${((yMax - t) / ySpan) * 100}%` }}>{t}</span>
          ))}
        </div>
        <div className="absolute bottom-8 left-[52px] right-2 top-1.5 border-b border-l border-[#40576b]">
          {scatterYTicks.map((t) => (
            <span
              key={t}
              aria-hidden
              className={`absolute inset-x-0 h-px ${t === 0 ? "bg-[#2a4c68]" : "bg-[#122a3f]"}`}
              style={{ top: `${((yMax - t) / ySpan) * 100}%` }}
            />
          ))}
          {tradeResults.map((result, index) => (
            <span
              key={index}
              aria-hidden
              className={`absolute block size-[3.5px] -translate-x-1/2 -translate-y-1/2 rounded-full ${result >= 0 ? "bg-[#12d99e]" : "bg-[#ff4d5d]"}`}
              style={{ left: `${((index + 1) / xMax) * 100}%`, top: `${((yMax - result) / ySpan) * 100}%` }}
            />
          ))}
        </div>
        <div className="absolute bottom-[17px] left-[52px] right-2 h-3 text-[10.5px] leading-3 text-fg-muted tabular">
          {scatterXTicks.map((t) => (
            <span key={t} className="absolute top-0 -translate-x-1/2" style={{ left: `${(t / xMax) * 100}%` }}>{t}</span>
          ))}
        </div>
        <span className="absolute inset-x-0 bottom-0 pl-[52px] text-center text-[10.5px] leading-3 text-fg-muted">Número da Operação</span>
      </div>
    </Panel>
  );
}
