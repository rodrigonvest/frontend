import { Icon } from "../Icons";
import { Badge } from "../UI";
import { AssetBadge } from "../replay/RpPrimitives";
import { MARKET_INSIGHT } from "../../lib/copytrix-ai-data";
import { MetricBar, Panel } from "./AiPrimitives";

export default function MarketInsightPanel() {
  return (
    <Panel title="Insight de Mercado com IA" icon="crown">
      <div className="flex items-center gap-2.5">
        <AssetBadge asset={MARKET_INSIGHT.asset} size={30} />
        <h3 className="min-w-0 flex-1 truncate text-[14px] font-semibold text-fg">{MARKET_INSIGHT.title}</h3>
        <Badge tone="green" className="px-2.5">
          {MARKET_INSIGHT.badge}
        </Badge>
      </div>
      <p className="mt-3 text-pretty text-[13px] leading-[1.6] text-fg-muted">{MARKET_INSIGHT.text}</p>

      <div className="mt-4 space-y-3.5">
        {MARKET_INSIGHT.indicators.map((indicator) => (
          <MetricBar key={indicator.label} label={indicator.label} value={indicator.value} percent={indicator.percent} tone={indicator.tone} />
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#9b63ff]/40 bg-[#9b63ff]/[.07] p-3">
        <span aria-hidden className="mt-0.5 shrink-0 text-warning">
          <Icon name="bulb" size={22} />
        </span>
        <p className="text-pretty text-[13px] leading-[1.55] text-fg">{MARKET_INSIGHT.recommendation}</p>
      </div>
    </Panel>
  );
}
