import { Panel } from "../backtest/BacktestFields";
import { additionalStats, type TextTone } from "../../lib/performance-demo";

const valueTones: Record<TextTone, string> = {
  default: "bg-[#0b2033] text-fg",
  success: "bg-[#073a33] text-success",
  danger: "bg-[#3a1620] text-danger",
  muted: "bg-[#0b2033] text-fg-muted",
};

export default function AdditionalStatsCard() {
  return (
    <Panel title="Estatísticas Adicionais">
      <dl className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4 2xl:grid-cols-8">
        {additionalStats.map((stat) => (
          <div key={stat.label} className="flex min-w-0 flex-col justify-between gap-1.5 rounded-lg border border-[#17344b] bg-[#081726]/80 p-1.5">
            <dt className="text-center text-[10px] leading-[13px] text-fg-muted">{stat.label}</dt>
            <dd className={`rounded-md py-1.5 text-center text-base font-semibold leading-none tabular ${valueTones[stat.tone]}`}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
