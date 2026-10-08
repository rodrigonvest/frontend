"use client";
import { OPERATION_MODE_OPTIONS, type SystemConfigDemo, type SystemConfigValues } from "../../../lib/system-config-demo";
import { SYSTEM_STATUS_LABEL, type SystemRoute, type SystemRouteStatus } from "../../../lib/systems-catalog";
import { Icon } from "../../Icons";
import { cx } from "../../UI";
import SystemLogo from "../SystemLogo";
import { Toggle } from "./fields";

const pillTone: Record<SystemRouteStatus, string> = {
  active: "border-success/45 bg-success-soft/70 text-success",
  paused: "border-warning/40 bg-warning-soft text-warning",
  inactive: "border-line-strong bg-surface-2 text-fg-subtle",
};
const dotTone: Record<SystemRouteStatus, string> = { active: "bg-success", paused: "bg-warning", inactive: "bg-fg-subtle" };

function Stat({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3.5 px-5 py-3 xl:py-0">
      <span aria-hidden className="shrink-0 text-brand">
        <Icon name={icon} size={30} stroke={1.6} />
      </span>
      <div className="min-w-0">
        <div className="text-xs leading-4 text-fg-muted">{label}</div>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-fg">{children}</div>
      </div>
    </div>
  );
}

export default function SystemSummaryCard({
  route,
  values,
  demo,
  onStatusChange,
}: {
  route: SystemRoute;
  values: SystemConfigValues;
  demo: SystemConfigDemo;
  onStatusChange: (active: boolean) => void;
}) {
  const modeLabel = OPERATION_MODE_OPTIONS.find((o) => o.value === values.mode)?.label ?? values.mode;

  return (
    <section
      aria-label="Resumo do sistema"
      className="flex flex-col divide-y divide-line rounded-lg border border-line bg-gradient-to-b from-surface-2/60 to-surface xl:flex-row xl:items-stretch xl:divide-x xl:divide-y-0"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4 p-4 xl:basis-[34%]">
        <SystemLogo logo={route.icon.source} size={56} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-xl font-semibold leading-7 tracking-tight text-fg">{route.name}</h2>
            <span className={cx("inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium", pillTone[values.status])}>
              <span aria-hidden className={cx("size-2 rounded-full", dotTone[values.status])} />
              {SYSTEM_STATUS_LABEL[values.status]}
            </span>
          </div>
          <p className="mt-0.5 text-[13px] leading-5 text-fg-muted">{route.description.replace(/^Copie sinais do /, "Copie sinais de canais do ")}</p>
        </div>
      </div>

      <Stat icon="clock" label="Última execução">
        <span className="tabular text-xl font-semibold leading-7">{demo.lastExecution.time}</span>
        <span className="text-xs text-fg-muted">{demo.lastExecution.ago}</span>
      </Stat>

      <Stat icon="barsFilled" label="Sinais executados">
        <span className="tabular text-xl font-semibold leading-7">{demo.signals.total}</span>
        <span className="text-xs text-fg-muted">({demo.signals.wins} wins)</span>
      </Stat>

      <Stat icon="settings" label="Modo de Operação">
        <span className="text-xl font-semibold leading-7">{modeLabel}</span>
      </Stat>

      <div className="flex items-center px-5 py-3 xl:py-0">
        <Toggle checked={values.status === "active"} onChange={onStatusChange} label="Sistema Ativo" />
      </div>
    </section>
  );
}
