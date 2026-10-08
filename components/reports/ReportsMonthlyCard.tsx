import { monthlyDomain, monthlyResults, monthlyTicks } from "../../lib/reports-demo";
import ReportPanel from "./ReportPanel";

const range = monthlyDomain.max - monthlyDomain.min;
const zeroTop = (monthlyDomain.max / range) * 100;

const legend = [
  { label: "Lucro", color: "bg-[#12d99e]" },
  { label: "Prejuízo", color: "bg-[#ef5b6b]" },
  { label: "Resultado Líquido", color: "bg-[#2b86ff]" },
];

function barBox(value: number) {
  const height = (Math.abs(value) / range) * 100;
  return { top: `${value >= 0 ? zeroTop - height : zeroTop}%`, height: `${height}%` };
}

export default function ReportsMonthlyCard() {
  return (
    <ReportPanel
      icon="barsFilled"
      title="Resultado por Mês"
      description="Lucro/Prejuízo mensal dos últimos períodos."
      action={
        <ul aria-label="Legenda do gráfico" className="flex flex-wrap items-center justify-end gap-x-3.5 gap-y-1 pt-1 text-[11px] text-fg-muted">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <span aria-hidden className={`size-2.5 rounded-[3px] ${item.color}`} />
              {item.label}
            </li>
          ))}
        </ul>
      }
    >
      <div
        role="img"
        aria-label="Resultado líquido mensal: Jun/26 $1.225,00; Jul/26 $777,50; Ago/26 $1.392,50; Set/26 $792,50"
        className="relative mt-4 h-[200px]"
      >
        <div className="absolute bottom-7 left-0 top-1.5 w-14">
          {monthlyTicks.map((tick, i) => (
            <span
              key={tick}
              className="absolute right-2 -translate-y-1/2 text-[11px] leading-none text-fg-muted tabular"
              style={{ top: `${(i / (monthlyTicks.length - 1)) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>
        <div className="absolute bottom-7 left-[60px] right-1 top-1.5">
          {monthlyTicks.map((tick, i) => (
            <span
              key={tick}
              aria-hidden
              className={`absolute inset-x-0 h-px ${tick === "$0" ? "bg-[#40576b]" : "bg-[#122a3f]"}`}
              style={{ top: `${(i / (monthlyTicks.length - 1)) * 100}%` }}
            />
          ))}
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-[#40576b]" />
          {monthlyResults.map((m, i) => {
            const net = barBox(m.net);
            return (
              <div
                key={m.month}
                className="absolute inset-y-0 w-[92px] -translate-x-1/2"
                style={{ left: `${((i + 0.5) / monthlyResults.length) * 100}%` }}
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pb-1 text-xs font-medium text-fg tabular"
                  style={{ bottom: `${100 - parseFloat(net.top)}%` }}
                >
                  {m.netLabel}
                </span>
                <span aria-hidden className="absolute left-0 w-[28px] rounded-[2px] bg-[#16c596]" style={barBox(m.profit)} />
                <span aria-hidden className="absolute left-[32px] w-[28px] rounded-[2px] bg-[#d9505f]" style={barBox(m.loss)} />
                <span aria-hidden className="absolute left-[64px] w-[28px] rounded-[2px] bg-[#2b86ff]" style={net} />
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-[60px] right-1 flex h-5 text-[11px] text-fg-muted">
          {monthlyResults.map((m) => (
            <span key={m.month} className="flex-1 text-center">{m.month}</span>
          ))}
        </div>
      </div>
    </ReportPanel>
  );
}
