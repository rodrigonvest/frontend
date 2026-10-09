import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import { distribution, distributionMax, distributionTicks } from "../../lib/system-details-demo";

const barTone = {
  danger: "bg-[#f0555f]",
  success: "bg-[#16c596]",
  muted: "bg-[#2f9d7c]",
} as const;

export default function SystemDistributionCard({ className }: { className?: string }) {
  const summary = distribution.map((d) => `${d.label}: ${d.count}`).join("; ");

  return (
    <DetailPanel
      title="Distribuição de Resultados (R)"
      icon={
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="3" y="12" width="4.5" height="9" rx="1" />
          <rect x="9.75" y="3" width="4.5" height="18" rx="1" />
          <rect x="16.5" y="8" width="4.5" height="13" rx="1" />
        </svg>
      }
      className={className}
    >
      <div className="mt-2 flex flex-1 flex-col px-3.5 pb-3" role="img" aria-label={`Distribuição de resultados em R. ${summary}`}>
        <div className="grid min-h-[130px] flex-1 grid-cols-[26px_minmax(0,1fr)] gap-x-1.5">
          <div aria-hidden className="relative">
            {distributionTicks.map((t) => (
              <span
                key={t}
                className="absolute right-0 -translate-y-1/2 text-[11.5px] tabular text-fg-muted"
                style={{ top: `${100 - (t / distributionMax) * 100}%` }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="relative">
            {distributionTicks.map((t) => (
              <span
                key={t}
                aria-hidden
                className="absolute inset-x-0 border-t border-[#17344b]/80"
                style={{ top: `${100 - (t / distributionMax) * 100}%` }}
              />
            ))}
            <div className="absolute inset-0 flex items-end justify-around gap-1.5 px-1">
              {distribution.map((d) => (
                <div key={d.label} className="relative flex h-full flex-1 items-end justify-center">
                  <div className={cx("w-full max-w-[38px] rounded-t-[3px]", barTone[d.tone])} style={{ height: `${(d.count / distributionMax) * 100}%` }}>
                    <span className="absolute left-0 right-0 -translate-y-full pb-0.5 text-center text-[11.5px] font-medium tabular text-fg" style={{ top: `${100 - (d.count / distributionMax) * 100}%` }}>
                      {d.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div aria-hidden className="mt-1.5 grid grid-cols-[26px_minmax(0,1fr)] gap-x-1.5">
          <span />
          <div className="flex justify-around gap-1.5 px-1">
            {distribution.map((d) => (
              <span key={d.label} className="flex-1 text-center text-[10.5px] leading-[13px] text-fg-muted">
                {d.lines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">{line}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DetailPanel>
  );
}
