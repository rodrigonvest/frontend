import { cx } from "../UI";
import { USAGE_METRICS } from "../../lib/billing-data";
import { BillingIcon } from "./BillingIcons";
import { SectionHeader, SmallActionButton, SURFACE, UsageBar } from "./BillingPrimitives";

const iconTones = { green: "bg-success/12 text-success", blue: "bg-brand/15 text-brand" };

export default function UsageCard({ onDetails }: { onDetails: () => void }) {
  return (
    <section aria-labelledby="usage-title" className={cx(SURFACE, "flex flex-col gap-4 p-4 sm:p-5")}>
      <SectionHeader
        id="usage-title"
        title="Uso do Plano"
        icon={<BillingIcon name="settings" size={22} />}
        action={<SmallActionButton onClick={onDetails}>Ver detalhes</SmallActionButton>}
      />
      <ul className="grid flex-1 gap-3 sm:grid-cols-2">
        {USAGE_METRICS.map((metric) => {
          const unlimited = metric.limit === null;
          const barLabel = unlimited
            ? `${metric.label}: ${metric.used} registros, sem limite`
            : `${metric.label}: ${metric.used} de ${metric.limit}`;
          return (
            <li key={metric.id} className="flex flex-col justify-between gap-3 rounded-xl border border-line bg-canvas/35 p-3.5">
              <div className="flex items-center gap-3">
                <span aria-hidden className={cx("flex size-11 shrink-0 items-center justify-center rounded-lg", iconTones[metric.tone])}>
                  <BillingIcon name={metric.icon} size={22} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] text-fg-muted">{metric.label}</p>
                  <p className="tabular mt-0.5 text-[19px] font-semibold leading-tight text-fg">{metric.value}</p>
                </div>
              </div>
              <UsageBar label={barLabel} percent={metric.percent} tone={metric.tone} unlimited={unlimited} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
