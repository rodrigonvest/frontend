import { detailedStats, type StatTone } from "../../lib/backtest-demo";
import { Panel } from "./BacktestFields";

const tones: Record<StatTone, string> = {
  default: "text-fg",
  success: "text-success",
  danger: "text-danger",
};

export default function DetailedStats() {
  return (
    <Panel title="Estatísticas Detalhadas">
      <dl className="mt-2 divide-y divide-[#122a3f]">
        {detailedStats.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 py-[3.5px] text-xs">
            <dt className="text-fg-muted">{item.label}</dt>
            <dd className={`font-medium tabular ${tones[item.tone]}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
