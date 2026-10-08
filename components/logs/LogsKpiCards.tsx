import { Icon } from "../Icons";
import { logsKpis, type LogTone } from "../../lib/logs-demo";

const iconTones: Record<LogTone, string> = {
  blue: "bg-[#083c57] text-[#1bb5e9]",
  green: "bg-[#063d37] text-[#12d99e]",
  amber: "bg-[#3a2d12] text-[#f5b82e]",
  red: "bg-[#3c1d2a] text-[#ff5d6d]",
  indigo: "bg-[#14263f] text-[#8fa6c4]",
};

function KpiIcon({ name }: { name: (typeof logsKpis)[number]["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "check-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
          <path d="m8 12.5 3 3 5-6" stroke="#06111d" strokeWidth={2.4} />
        </svg>
      );
    case "alert-triangle":
      return (
        <svg {...common}>
          <path d="M12 3.2 2.6 19.4a1 1 0 0 0 .9 1.5h17a1 1 0 0 0 .9-1.5L12 3.2Z" fill="currentColor" stroke="none" />
          <path d="M12 9.5v4.5M12 17h.01" stroke="#06111d" strokeWidth={2.4} />
        </svg>
      );
    case "alert-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
          <path d="M12 7.5v5.5M12 16.5h.01" stroke="#06111d" strokeWidth={2.4} />
        </svg>
      );
    case "logs":
      return (
        <svg {...common}>
          <rect x="3.5" y="4" width="6" height="5" rx="1.2" fill="currentColor" stroke="none" />
          <rect x="3.5" y="14" width="6" height="5" rx="1.2" fill="currentColor" stroke="none" />
          <path d="M13 6.5h7.5M13 11.5h7.5M13 16.5h7.5" />
        </svg>
      );
    default:
      return <Icon name={name} size={28} stroke={2} />;
  }
}

export default function LogsKpiCards() {
  return (
    <section
      aria-label="Resumo dos logs"
      className="grid grid-cols-1 gap-[13px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[242fr_232fr_240fr_244fr_261fr]"
    >
      {logsKpis.map((kpi) => (
        <article
          key={kpi.label}
          className="flex min-h-[92px] min-w-0 items-center gap-4 rounded-[10px] border border-[#17344b] bg-gradient-to-br from-[#10263a] to-[#091a2a] px-3 py-1.5"
        >
          <span aria-hidden className={`flex size-[55px] shrink-0 items-center justify-center rounded-xl ${iconTones[kpi.tone]}`}>
            <KpiIcon name={kpi.icon} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs text-fg-muted">{kpi.label}</p>
            <p className="mt-1.5 truncate text-[22px] font-bold leading-none tracking-tight text-fg tabular">{kpi.value}</p>
            <p className={`mt-2 whitespace-nowrap text-[12px] font-medium tabular ${kpi.noteTone === "success" ? "text-success" : "text-fg-muted"}`}>{kpi.note}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
