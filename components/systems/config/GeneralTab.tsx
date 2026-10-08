"use client";
import type { SetConfigValue, SystemConfigDemo, SystemConfigValues } from "../../../lib/system-config-demo";
import type { SystemRoute } from "../../../lib/systems-catalog";
import { ConnectionStatusCard, GeneralSettingsCard, SystemInfoCard } from "./GeneralRowOne";
import { QuickFilterCard, ScheduleCard, SignalFormatCard } from "./GeneralRowTwo";
import { RecentLogsCard, SignalExampleCard, SummaryCard } from "./GeneralRowThree";

export default function GeneralTab({
  route,
  values,
  demo,
  set,
}: {
  route: SystemRoute;
  values: SystemConfigValues;
  demo: SystemConfigDemo;
  set: SetConfigValue;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <SystemInfoCard route={route} values={values} set={set} />
        <GeneralSettingsCard values={values} set={set} />
        <ConnectionStatusCard panels={demo.connections} />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.15fr]">
        <ScheduleCard values={values} set={set} />
        <QuickFilterCard values={values} set={set} />
        <div className="md:col-span-2 xl:col-span-1">
          <SignalFormatCard values={values} set={set} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[0.95fr_1.1fr_1fr]">
        <SummaryCard values={values} demo={demo} route={route} />
        <SignalExampleCard symbol={values.symbol} />
        <div className="md:col-span-2 xl:col-span-1">
          <RecentLogsCard logs={demo.logs} />
        </div>
      </div>
    </div>
  );
}
