import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { reportKpis, type ReportKpi } from "../../lib/reports-demo";
import { ArrowGlyph, WinRateRing } from "./ReportsIcons";

function KpiGlyph({ kpi }: { kpi: ReportKpi }): ReactNode {
  switch (kpi.id) {
    case "profit":
      return (
        <span aria-hidden className="flex size-[52px] shrink-0 items-center justify-center rounded-xl bg-[#063d37] text-[28px] font-bold leading-none text-[#12d99e]">
          $
        </span>
      );
    case "trades":
      return (
        <span aria-hidden className="flex size-[52px] shrink-0 items-center justify-center rounded-xl bg-[#0a3558] text-[#2f95ff]">
          <Icon name="barsFilled" size={26} />
        </span>
      );
    case "winRate":
      return <WinRateRing value={kpi.progress ?? 0} />;
    case "resultR":
      return (
        <span aria-hidden className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#2a1b63] text-[24px] font-bold leading-none text-[#b58aff] ring-2 ring-[#7c4dff]/70">
          R
        </span>
      );
    case "drawdown":
      return (
        <span aria-hidden className="flex size-[52px] shrink-0 items-center justify-center rounded-xl bg-[#4a1c2b] text-[#ff5d6d]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v15M6 13l6 6 6-6" />
          </svg>
        </span>
      );
  }
}

export default function ReportsKpiCards() {
  return (
    <section aria-label="Indicadores do relatório" className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {reportKpis.map((kpi) => {
        const danger = kpi.tone === "danger";
        return (
          <article
            key={kpi.id}
            className={cx(
              "flex min-w-0 items-center gap-3 rounded-[10px] border px-3 py-4",
              danger
                ? "border-[#4a2230] bg-gradient-to-br from-[#2a1722] to-[#1a1220]"
                : "border-[#17344b] bg-gradient-to-br from-[#0f2438] to-[#091a2a]",
            )}
          >
            <KpiGlyph kpi={kpi} />
            <div className="min-w-0">
              <p className="truncate text-[13px] text-fg-muted">{kpi.label}</p>
              <p className={cx("tabular mt-0.5 truncate text-[26px] font-semibold leading-8 tracking-tight", danger ? "text-danger" : "text-fg")}>
                {kpi.value}
              </p>
              <p className={cx("mt-1 flex items-center gap-1 whitespace-nowrap text-[10.5px]", danger ? "text-danger" : "text-success")}>
                <ArrowGlyph direction={kpi.direction} />
                <span className="font-medium">{kpi.delta}</span>
                <span className="text-fg-muted">vs período anterior</span>
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
