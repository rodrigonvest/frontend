import { Icon } from "../Icons";
import { cx } from "../UI";
import { customReports } from "../../lib/reports-demo";
import ReportPanel from "./ReportPanel";

const iconTones = {
  blue: "bg-[#0b3256] text-[#2f95ff]",
  green: "bg-[#0a3d37] text-[#12d99e]",
  purple: "bg-[#2a1b63] text-[#b58aff]",
} as const;

export default function ReportsCustomCard() {
  return (
    <ReportPanel icon="fileText" title="Relatórios Personalizados" description="Gere relatórios específicos para sua necessidade.">
      <ul className="mt-3.5 grid gap-2.5 md:grid-cols-3">
        {customReports.map((report) => (
          <li key={report.id} className="flex min-w-0 flex-col rounded-lg border border-[#17344b] bg-[#0b1d30] p-3">
            <div className="flex min-w-0 flex-1 items-start gap-2.5">
              <span aria-hidden className={cx("flex size-10 shrink-0 items-center justify-center rounded-lg", iconTones[report.tone])}>
                <Icon name={report.icon} size={20} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold leading-5 text-fg">{report.title}</h3>
                <p className="mt-1 text-pretty text-[11px] leading-4 text-fg-muted">{report.description}</p>
              </div>
            </div>
            <button
              type="button"
              aria-haspopup="menu"
              aria-label={`${report.title}: opções de exportação`}
              className="mt-3 flex h-9 w-full items-center justify-between rounded-lg border border-brand-strong/60 bg-[#0a1b2b] px-3 text-[13px] text-fg transition-colors hover:border-brand hover:bg-[#0d2238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span className="flex-1 text-center">Exportar</span>
              <span aria-hidden className="border-l border-[#24435d] pl-2.5 text-fg-muted">
                <Icon name="chevronDown" size={14} stroke={2.2} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </ReportPanel>
  );
}
