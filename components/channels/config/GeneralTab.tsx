"use client";
import type { ConfigPanelProps } from "../../../lib/channel-config";
import { ExecutionFiltersPanel, PositionManagementPanel, TradingHoursPanel } from "./ExecutionPanels";
import { ChannelInfoPanel, DefaultSymbolPanel, GeneralSettingsPanel } from "./IdentityPanels";
import { RiskPanel, SignalExamplePanel, SignalFormatPanel } from "./SignalPanels";

const row = "grid grid-cols-1 gap-2.5 md:grid-cols-2 md:[&>*:last-child]:col-span-2 xl:[&>*:last-child]:col-span-1";

export default function GeneralTab(props: ConfigPanelProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`${row} xl:grid-cols-[1.3fr_1.15fr_1fr]`}>
        <ChannelInfoPanel {...props} />
        <GeneralSettingsPanel {...props} />
        <DefaultSymbolPanel {...props} />
      </div>
      <div className={`${row} xl:grid-cols-[1.1fr_1fr_1.05fr]`}>
        <SignalFormatPanel {...props} />
        <SignalExamplePanel {...props} />
        <RiskPanel {...props} />
      </div>
      <div className={`${row} xl:grid-cols-[1.1fr_1fr_1.05fr]`}>
        <ExecutionFiltersPanel {...props} />
        <TradingHoursPanel {...props} />
        <PositionManagementPanel {...props} />
      </div>
    </div>
  );
}
