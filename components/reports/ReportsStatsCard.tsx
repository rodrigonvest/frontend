import { Icon } from "../Icons";
import { cx } from "../UI";
import { detailedStats, type DetailedStat } from "../../lib/reports-demo";
import ReportPanel from "./ReportPanel";

const tones: Record<DetailedStat["tone"], { box: string; icon: string; value: string }> = {
  blue: { box: "border-[#17344b] bg-[#0b1d30]", icon: "text-[#2f95ff]", value: "text-[#2f95ff]" },
  green: { box: "border-[#134238] bg-[#0a2429]", icon: "text-[#12d99e]", value: "text-success" },
  red: { box: "border-[#4a2230] bg-[#1d1522]", icon: "text-[#ff5d6d]", value: "text-danger" },
};

export default function ReportsStatsCard() {
  return (
    <ReportPanel icon="clipboard" title="Estatísticas Detalhadas" description="Métricas avançadas de performance.">
      <dl className="mt-3.5 grid flex-1 auto-rows-fr grid-cols-2 gap-2.5 lg:grid-cols-4">
        {detailedStats.map((stat) => {
          const tone = tones[stat.tone];
          return (
            <div key={stat.label} className={cx("flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-3", tone.box)}>
              <span aria-hidden className={cx("flex size-6 shrink-0 items-center justify-center", tone.icon)}>
                <Icon name={stat.icon} size={20} />
              </span>
              <div className="min-w-0">
                <dt className="text-[11px] leading-[14px] text-fg-muted">{stat.label}</dt>
                <dd className={cx("tabular mt-0.5 text-[19px] font-semibold leading-6", tone.value)}>{stat.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </ReportPanel>
  );
}
