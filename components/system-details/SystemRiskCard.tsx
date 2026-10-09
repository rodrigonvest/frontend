import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import type { RouteDetails } from "../../lib/system-route-details";
import { ToggleChip } from "./SystemSpecificsCard";

export default function SystemRiskCard({ details, className }: { details: RouteDetails; className?: string }) {
  return (
    <DetailPanel title="Gerenciamento de Risco" icon={<Icon name="shield" size={19} />} className={className}>
      <dl className="mx-3.5 mt-1.5 grid gap-x-6 text-[13px] md:grid-cols-2">
        {details.risk.map((row, i) => (
          <div
            key={row.label}
            className={cx(
              "grid min-h-[34px] grid-cols-[130px_minmax(0,1fr)] items-center gap-2 border-b border-[#17344b]/70",
              i >= details.risk.length - 2 && "md:border-b-0",
            )}
          >
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="m-0 flex min-w-0 items-center gap-2 text-fg tabular">
              {row.kind === "toggle" ? (
                <>
                  <ToggleChip on={!!row.on} label={row.value} />
                  {row.extra && <span className="truncate text-[12px] text-fg-muted">{row.extra}</span>}
                </>
              ) : (
                <>
                  <span>{row.value}</span>
                  {row.unit && <span className="text-[12px] text-fg-muted">{row.unit}</span>}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mx-3.5 mb-3.5 mt-2 flex flex-wrap items-center gap-2 border-t border-[#17344b]/70 pt-2.5 text-[12.5px]">
        <span className="mr-1 text-fg-muted">Fechamento Parcial por TP</span>
        {details.partialTps.map((tp) => (
          <span key={tp.label} className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#24435d] bg-[#091a2a] px-2 tabular">
            <span className="text-[10px] font-medium text-fg-subtle">{tp.label}</span>
            <span className="text-fg">{tp.value}</span>
          </span>
        ))}
      </div>
    </DetailPanel>
  );
}
