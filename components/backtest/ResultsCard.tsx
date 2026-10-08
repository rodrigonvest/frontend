import { backtestMetrics, equityAxis, equitySeries } from "../../lib/backtest-presentation";
import { cx } from "../UI";
import { Panel, SelectBox } from "./Panel";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function EquityChart() {
  const { min, max, ticks, labels } = equityAxis;
  const last = equitySeries.length - 1;
  const points = equitySeries.map((v, i) => `${((i / last) * 100).toFixed(2)},${(100 - ((v - min) / (max - min)) * 100).toFixed(2)}`);
  const line = `M${points.join(" L")}`;
  const area = `${line} L100,100 L0,100 Z`;

  return (
    <div className="relative mt-1 h-[150px]" role="img" aria-label="Curva de equidade do backtest, de 21 Jun a 04 Set">
      <div aria-hidden className="absolute left-0 top-[5px] flex h-[122px] w-[46px] flex-col justify-between text-right text-[12px] leading-[14px] text-fg-muted tabular">
        {ticks.map((t) => (
          <span key={t}>{money(t)}</span>
        ))}
      </div>

      <div className="absolute left-[52px] right-[10px] top-[12px] h-[108px] border-b border-l border-line-strong/70">
        {[0, 25, 50, 75].map((p) => (
          <div key={p} aria-hidden className="absolute inset-x-0 border-t border-[#173249]" style={{ top: `${p}%` }} />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="bt-equity-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12d99e" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#12d99e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#bt-equity-fill)" />
          <path d={line} fill="none" stroke="#12d99e" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div aria-hidden className="absolute bottom-[4px] left-[40px] right-[18px] flex justify-between text-[12px] leading-[14px] text-fg-muted">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export default function ResultsCard() {
  return (
    <Panel title="Resultados do Backtest" className="2xl:h-[313px]">
      <dl className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-[124fr_123fr_137fr_107fr_121fr]">
        {backtestMetrics.map((m) => (
          <div key={m.label} className="h-[71px] rounded-lg border border-line bg-[#0b2033]/70 px-3 pt-2.5">
            <dt className="truncate text-[11px] leading-[14px] text-fg-muted">{m.label}</dt>
            <dd className={cx("tabular mt-0.5 truncate text-[22px] font-bold leading-[26px] tracking-tight", m.tone === "positive" ? "text-success" : "text-fg")}>
              {m.value}
            </dd>
            {m.note && <dd className="tabular -mt-0.5 text-[11px] leading-[14px] text-success">{m.note}</dd>}
          </div>
        ))}
      </dl>

      <div className="mt-3 flex h-7 items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-fg">Curva de Equidade</h3>
        <SelectBox
          id="bt-equity-mode"
          ariaLabel="Série do gráfico"
          options={["Saldo", "Equity"]}
          className="h-7 w-[133px]"
          selectClassName="px-3 text-[12px]"
        />
      </div>
      <EquityChart />
    </Panel>
  );
}
