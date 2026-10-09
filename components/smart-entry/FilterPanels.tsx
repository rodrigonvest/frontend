"use client";
import type { Dispatch, SetStateAction } from "react";
import { Panel, SelectBox, ToggleRow } from "../risk-management/RiskFields";
import {
  marketFilters,
  timeframeOptions,
  trendIndicators,
  type SmartEntryConfig,
  type Timeframe,
} from "../../lib/smart-entry-demo";

type Props = { config: SmartEntryConfig; onChange: Dispatch<SetStateAction<SmartEntryConfig>> };

export function TrendFilters({ config, onChange }: Props) {
  return (
    <Panel title="Filtros de Tendência" icon="trendUp">
      <p className="-mt-1 mb-3 text-[13px] leading-5 text-fg-muted">Use indicadores para validar a direção da operação.</p>
      <div className="mb-1 flex items-center justify-between text-[13px] font-medium text-fg">
        <span>Indicadores</span>
        <span className="w-[84px]">Timeframe</span>
      </div>
      <ul className="space-y-1">
        {trendIndicators.map(({ id, label }) => {
          const item = config.trend[id];
          const patch = (partial: Partial<typeof item>) =>
            onChange((current) => ({ ...current, trend: { ...current.trend, [id]: { ...current.trend[id], ...partial } } }));
          return (
            <li key={id} className="flex min-h-10 items-center gap-3">
              <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-[13px] text-fg">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(event) => patch({ enabled: event.target.checked })}
                  className="size-[18px] shrink-0 cursor-pointer rounded accent-[#087ff0]"
                />
                <span className="truncate">{label}</span>
              </label>
              <div className="w-[84px] shrink-0">
                <SelectBox label={`Timeframe ${label}`} value={item.timeframe} options={timeframeOptions} onChange={(v) => patch({ timeframe: v as Timeframe })} />
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

export function MarketFilters({ config, onChange }: Props) {
  return (
    <Panel title="Filtros de Preço e Mercado" icon="chart">
      <p className="-mt-1 mb-2 text-[13px] leading-5 text-fg-muted">Condições de mercado para entrada mais precisa.</p>
      <div className="divide-y divide-line/30">
        {marketFilters.map(({ id, label, help }) => (
          <ToggleRow
            key={id}
            label={label}
            help={help}
            checked={config.market[id]}
            onChange={(v) => onChange((current) => ({ ...current, market: { ...current.market, [id]: v } }))}
          />
        ))}
      </div>
    </Panel>
  );
}
