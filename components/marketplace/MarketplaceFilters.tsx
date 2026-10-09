"use client";
import { cx } from "../UI";
import {
  moreAssets,
  periodFilters,
  platformFilters,
  priceFilters,
  quickAssets,
  strategyTypes,
  type Filters,
} from "../../lib/marketplace-data";
import { MpSelect, RangeField, Switch } from "./MpPrimitives";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-4 first:border-t-0 first:pt-0">
      <legend className="mb-2.5 text-[13px] font-semibold text-fg">{title}</legend>
      {children}
    </fieldset>
  );
}

export function MarketplaceFilters({
  filters,
  onChange,
  onClear,
  className,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
  className?: string;
}) {
  const toggleType = (type: string) =>
    onChange({ types: filters.types.includes(type) ? filters.types.filter((item) => item !== type) : [...filters.types, type] });
  const moreSelected = (moreAssets as readonly string[]).includes(filters.asset) ? filters.asset : "";

  return (
    <aside aria-label="Filtros de estratégias" className={cx("flex flex-col gap-4 rounded-xl border border-line bg-gradient-to-b from-surface-2/50 to-surface p-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-fg">Filtros</h2>
        <button type="button" onClick={onClear} className="text-[12px] text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
          Limpar Filtros
        </button>
      </div>

      <Group title="Ativos">
        <div className="grid grid-cols-3 gap-1.5">
          {quickAssets.map((asset) => {
            const active = filters.asset === asset;
            return (
              <button
                key={asset}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ asset })}
                className={cx(
                  "h-8 rounded-md border text-[11.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                  active ? "border-brand bg-brand-strong text-white" : "border-line-strong bg-canvas/50 text-fg-muted hover:border-brand/50 hover:text-fg",
                )}
              >
                {asset}
              </button>
            );
          })}
        </div>
        <MpSelect
          className="mt-2"
          aria-label="Mais ativos"
          value={moreSelected}
          onChange={(event) => onChange({ asset: event.target.value || "Todos" })}
        >
          <option value="">Mais ativos...</option>
          {moreAssets.map((asset) => (
            <option key={asset} value={asset}>
              {asset}
            </option>
          ))}
        </MpSelect>
      </Group>

      <Group title="Tipo de Estratégia">
        <ul className="flex flex-col gap-2">
          {strategyTypes.map((type) => (
            <li key={type}>
              <label className="flex cursor-pointer items-center gap-2.5 text-[12.5px] text-fg-muted hover:text-fg">
                <input type="checkbox" checked={filters.types.includes(type)} onChange={() => toggleType(type)} className="size-4 cursor-pointer rounded accent-brand" />
                {type}
              </label>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Desempenho Mínimo">
        <div className="flex flex-col gap-3.5">
          <RangeField id="mp-win" label="Win Rate mínimo" value={filters.minWinRate} min={40} max={90} step={1} format={(value) => `${value}%`} onChange={(minWinRate) => onChange({ minWinRate })} />
          <RangeField id="mp-pf" label="Fator de lucro mínimo" value={filters.minProfitFactor} min={1} max={4} step={0.1} format={(value) => value.toFixed(1)} onChange={(minProfitFactor) => onChange({ minProfitFactor })} />
          <RangeField id="mp-dd" label="Drawdown máximo" value={filters.maxDrawdown} min={3} max={30} step={1} format={(value) => `${value}%`} onChange={(maxDrawdown) => onChange({ maxDrawdown })} />
        </div>
      </Group>

      <Group title="Outros Filtros">
        <div className="flex flex-col gap-2">
          <MpSelect aria-label="Período de publicação" value={filters.period} onChange={(event) => onChange({ period: event.target.value })}>
            {periodFilters.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </MpSelect>
          <MpSelect aria-label="Plataforma" value={filters.platform} onChange={(event) => onChange({ platform: event.target.value })}>
            {platformFilters.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </MpSelect>
          <MpSelect aria-label="Preço" value={filters.price} onChange={(event) => onChange({ price: event.target.value })}>
            {priceFilters.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </MpSelect>
          <div className="mt-2">
            <Switch label="Apenas estratégias verificadas" checked={filters.verifiedOnly} onChange={(verifiedOnly) => onChange({ verifiedOnly })} />
          </div>
        </div>
      </Group>
    </aside>
  );
}
