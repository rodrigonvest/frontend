import Link from "next/link";
import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { GoldLogo } from "../trade-details/TradeIcons";
import { cx } from "../UI";
import { SYSTEM_STATUS_LABEL, type SystemRouteStatus } from "../../lib/systems-catalog";
import type { RouteDetails } from "../../lib/system-route-details";

const statusText: Record<SystemRouteStatus, string> = {
  active: "text-success",
  paused: "text-warning",
  inactive: "text-fg-muted",
};

const statusDot: Record<SystemRouteStatus, string> = {
  active: "bg-success",
  paused: "bg-warning",
  inactive: "bg-fg-subtle",
};

export default function SystemAutomationCard({
  routeId,
  details,
  status,
  onTogglePause,
  className,
}: {
  routeId: string;
  details: RouteDetails;
  status: SystemRouteStatus;
  onTogglePause: () => void;
  className?: string;
}) {
  const paused = status === "paused";
  const automationRows = details.automationRows;

  return (
    <DetailPanel title="Configurações da Automação" icon={<Icon name="settings" size={19} />} className={className}>
      <dl className="mx-3.5 mt-1.5 flex flex-1 flex-col text-[13px]">
        <div className="grid min-h-[34px] flex-1 grid-cols-[150px_minmax(0,1fr)] items-center gap-2 border-b border-[#17344b]/70">
          <dt className="text-fg-muted">Status</dt>
          <dd className="m-0 flex items-center justify-between gap-2">
            <span className={cx("inline-flex items-center gap-2", statusText[status])}>
              <span aria-hidden className={cx("size-2 rounded-full", statusDot[status])} />
              {SYSTEM_STATUS_LABEL[status]}
            </span>
            <button
              type="button"
              onClick={onTogglePause}
              disabled={status === "inactive"}
              className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md border border-brand-strong/70 bg-[#0a1b2b] px-2.5 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                {paused ? (
                  <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
                ) : (
                  <>
                    <rect x="6" y="5" width="4.2" height="14" rx="1" />
                    <rect x="13.8" y="5" width="4.2" height="14" rx="1" />
                  </>
                )}
              </svg>
              {paused ? "Retomar Automação" : "Pausar Automação"}
            </button>
          </dd>
        </div>
        {automationRows.map((r, i) => (
          <div
            key={r.label}
            className={cx(
              "grid min-h-[30px] flex-1 grid-cols-[150px_minmax(0,1fr)] items-center gap-2 border-b border-[#17344b]/70 tabular",
              i === automationRows.length - 1 && "border-b-0",
            )}
          >
            <dt className="text-fg-muted">{r.label}</dt>
            <dd className="m-0 min-w-0 text-fg">
              {r.symbol ? (
                <span className="inline-flex items-center gap-2">
                  <GoldLogo size={18} />
                  {r.value}
                </span>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="px-3.5 pb-3.5 pt-2">
        <Link
          href={`/sistemas/${routeId}/configuracao`}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-brand-strong/70 bg-[#0b2238] px-3 text-[13px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
          <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
            <path d="m14.5 7.5 3 3" />
          </svg>
          Editar Configurações
        </Link>
      </div>
    </DetailPanel>
  );
}
