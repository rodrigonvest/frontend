import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { cx } from "../UI";
import type { RouteDetails } from "../../lib/system-route-details";

export function ToggleChip({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={cx("relative h-[18px] w-8 shrink-0 rounded-full border", on ? "border-success/70 bg-success/30" : "border-line-strong bg-surface-2")}
      >
        <span className={cx("absolute top-px size-3.5 rounded-full", on ? "left-[15px] bg-success" : "left-px bg-fg-subtle")} />
      </span>
      <span className={on ? "text-success" : "text-fg-muted"}>{label}</span>
    </span>
  );
}

export default function SystemSpecificsCard({ details, className }: { details: RouteDetails; className?: string }) {
  return (
    <DetailPanel title="Detalhes Específicos da Rota" icon={<Icon name="layers" size={19} />} className={className}>
      <dl className="mx-3.5 mb-3.5 mt-1.5 grid gap-x-6 text-[13px] md:grid-cols-2">
        {details.specifics.map((row, i) => (
          <div
            key={row.label}
            className={cx(
              "grid min-h-[34px] grid-cols-[130px_minmax(0,1fr)] items-center gap-2 border-b border-[#17344b]/70",
              i >= details.specifics.length - 2 && "md:border-b-0",
            )}
          >
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="m-0 min-w-0 truncate text-fg tabular">
              {row.kind === "toggle" ? <ToggleChip on={!!row.on} label={row.value} /> : row.value}
            </dd>
          </div>
        ))}
      </dl>
    </DetailPanel>
  );
}
