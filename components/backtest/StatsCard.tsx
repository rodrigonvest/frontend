import { detailedStats } from "../../lib/backtest-presentation";
import { cx } from "../UI";
import { Panel } from "./Panel";

const toneClass = { default: "text-fg", positive: "text-success", negative: "text-danger" } as const;

export default function StatsCard() {
  return (
    <Panel title="Estatísticas Detalhadas" className="2xl:h-[236px]" padding="px-3 pb-1 pt-2">
      <dl className="mt-0.5">
        {detailedStats.map((s) => (
          <div key={s.label} className="flex h-[18.8px] items-center justify-between gap-3 text-[12px]">
            <dt className="truncate text-fg-muted">{s.label}</dt>
            <dd className={cx("tabular whitespace-nowrap font-semibold", toneClass[s.tone])}>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
