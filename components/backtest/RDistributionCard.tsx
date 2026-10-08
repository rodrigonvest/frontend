import { rDistribution } from "../../lib/backtest-presentation";
import { cx } from "../UI";
import { Panel } from "./Panel";

export default function RDistributionCard() {
  const { ticks, bars } = rDistribution;
  return (
    <Panel title="Distribuição de Resultados (R)" className="2xl:h-[226px]">
      <div className="relative mt-[19px] h-[160px]" role="img" aria-label="Histograma de operações por faixa de resultado em R">
        <div aria-hidden className="absolute left-0 top-0 flex h-[147px] w-[22px] flex-col justify-between text-right text-[12px] leading-[14px] text-fg-muted tabular">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="absolute left-[28px] right-[6px] top-[7px] h-[133px] border-b border-l border-line-strong/70">
          {[0, 20, 40, 60, 80].map((p) => (
            <div key={p} aria-hidden className="absolute inset-x-0 border-t border-[#173249]" style={{ top: `${p}%` }} />
          ))}
          <div className="absolute inset-0 flex items-end">
            {bars.map((b) => (
              <div key={b.label} className="relative flex h-full flex-1 items-end justify-center">
                <div className="relative w-[68%] max-w-[46px]" style={{ height: `${b.height}%` }}>
                  <span className="tabular absolute inset-x-0 bottom-full mb-0.5 text-center text-[12px] leading-4 text-fg">{b.value}</span>
                  <div className={cx("size-full rounded-t-[2px]", b.negative ? "bg-[#ff3d4f]" : "bg-success")} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden className="absolute bottom-0 left-[28px] right-[6px] grid grid-cols-6 text-center text-[11px] leading-[14px] text-fg-muted">
          {bars.map((b) => (
            <span key={b.label}>{b.label}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
