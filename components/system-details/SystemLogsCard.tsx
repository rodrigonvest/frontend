import Link from "next/link";
import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import type { RouteDetails, RouteLog } from "../../lib/system-route-details";

const columns = "grid grid-cols-[96px_132px_minmax(0,1fr)] items-center gap-x-2";

const dotTone: Record<RouteLog["tone"], string> = {
  success: "bg-success",
  brand: "bg-brand",
  warning: "bg-warning",
  muted: "bg-fg-subtle",
};

export default function SystemLogsCard({ details, className }: { details: RouteDetails; className?: string }) {
  return (
    <DetailPanel
      title="Logs da Automação"
      icon={<Icon name="logs" size={19} />}
      className={className}
      action={
        <Link
          href="/logs"
          className="inline-flex h-8 items-center rounded-md border border-brand-strong/70 bg-[#0a1b2b] px-3 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          Ver Todos
        </Link>
      }
    >
      <div className="overflow-x-auto">
        <div role="table" aria-label="Logs da automação" className="mx-3.5 mb-3 mt-1.5 min-w-[520px] text-[12px] tabular">
          <div role="row" className={cx(columns, "pb-1.5 text-fg-muted")}>
            <span role="columnheader">Horário</span>
            <span role="columnheader">Evento</span>
            <span role="columnheader">Mensagem</span>
          </div>
          {details.logs.map((log) => (
            <div key={`${log.time}-${log.event}`} role="row" className={cx(columns, "min-h-[30px] border-t border-[#17344b]/50")}>
              <span role="cell" className="text-fg-muted">{log.time}</span>
              <span role="cell" className="inline-flex items-center gap-2 text-fg">
                <span aria-hidden className={cx("size-2 shrink-0 rounded-full", dotTone[log.tone])} />
                <span className="truncate">{log.event}</span>
              </span>
              <span role="cell" className="truncate text-fg-muted" title={log.message}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </DetailPanel>
  );
}
