import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import { detailedStats } from "../../lib/reports-demo";

const tileTone = {
  blue: { box: "border-[#17344b] bg-[#0b2238]", icon: "text-[#2f95ff]", value: "text-[#2f95ff]" },
  green: { box: "border-success/20 bg-success/[0.07]", icon: "text-success", value: "text-success" },
  red: { box: "border-danger/20 bg-danger/[0.07]", icon: "text-danger", value: "text-danger" },
} as const;

export default function SystemStatsCard({ className }: { className?: string }) {
  return (
    <DetailPanel title="Estatísticas Gerais" icon={<Icon name="analytics" size={19} />} className={className}>
      <dl className="mx-3.5 mb-3.5 mt-2.5 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
        {detailedStats.map((s) => {
          const t = tileTone[s.tone];
          return (
            <div key={s.label} className={cx("flex min-w-0 flex-col justify-between gap-1 rounded-lg border px-2.5 py-2.5", t.box)}>
              <dt className="flex items-center gap-1.5 text-[10.5px] leading-tight text-fg-muted">
                <span aria-hidden className={cx("shrink-0", t.icon)}>
                  <Icon name={s.icon} size={16} />
                </span>
                <span className="min-w-0">{s.label}</span>
              </dt>
              <dd className={cx("m-0 text-[20px] font-semibold leading-tight tabular", t.value)}>{s.value}</dd>
            </div>
          );
        })}
      </dl>
    </DetailPanel>
  );
}
