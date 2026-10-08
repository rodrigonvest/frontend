import { Icon } from "../Icons";
import { performanceKpis, type KpiTone, type TextTone } from "../../lib/performance-demo";

const iconTones: Record<KpiTone, string> = {
  green: "bg-[#063d37] text-[#12d99e]",
  purple: "bg-[#211849] text-[#9b63ff]",
  blue: "bg-[#083c57] text-[#1bb5e9]",
  red: "bg-[#3c1d2a] text-[#ff6b6b]",
  slate: "bg-[#14263f] text-[#8fa6c4]",
};

const textTones: Record<TextTone, string> = {
  default: "text-fg",
  success: "text-success",
  danger: "text-danger",
  muted: "text-fg-muted",
};

export default function KpiCards() {
  return (
    <section aria-label="Indicadores de desempenho" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {performanceKpis.map((kpi) => (
        <article
          key={kpi.label}
          className="flex min-w-0 items-center gap-2.5 rounded-[10px] border border-[#17344b] bg-gradient-to-br from-[#10263a] to-[#091a2a] px-3 py-3"
        >
          <span aria-hidden className={`flex size-[46px] shrink-0 items-center justify-center rounded-xl ${iconTones[kpi.iconTone]}`}>
            <Icon name={kpi.icon} size={24} stroke={2} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs text-fg-muted">{kpi.label}</p>
            <p className={`mt-1 truncate text-[21px] font-bold leading-none tracking-tight tabular ${textTones[kpi.valueTone]}`}>{kpi.value}</p>
            <p className={`mt-1.5 truncate text-xs font-medium tabular ${textTones[kpi.noteTone]}`}>{kpi.note}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
