"use client";
import { useId, useState, type Dispatch, type SetStateAction } from "react";
import { cx } from "../UI";
import { NumberBox } from "../multi-account/MaPrimitives";
import { FieldRow, Panel, SelectBox, ToggleRow } from "../risk-management/RiskFields";
import {
  hoursOptions,
  indicatorOptions,
  priceDirectionOptions,
  trendFilterOptions,
  weekdayLabels,
  type SmartEntryConfig,
} from "../../lib/smart-entry-demo";

type TabId = "main" | "advanced" | "confirmations" | "hours";

const tabs: { id: TabId; label: string }[] = [
  { id: "main", label: "Regras Principais" },
  { id: "advanced", label: "Filtros Avançados" },
  { id: "confirmations", label: "Confirmações" },
  { id: "hours", label: "Horários" },
];

type Props = { config: SmartEntryConfig; onChange: Dispatch<SetStateAction<SmartEntryConfig>> };

function MainRules({ config, onChange }: Props) {
  const patch = (partial: Partial<SmartEntryConfig>) => onChange((current) => ({ ...current, ...partial }));
  return (
    <div className="divide-y divide-line/40">
      <FieldRow label="Distância máxima da entrada" help="Distância máxima entre o preço atual e o preço de entrada do sinal.">
        <NumberBox label="Distância máxima da entrada" suffix="pips" decimals={1} value={config.maxEntryDistance} onChange={(v) => patch({ maxEntryDistance: v })} />
      </FieldRow>
      <FieldRow label="Spread máximo permitido" help="Sinais com spread acima deste valor são filtrados.">
        <NumberBox label="Spread máximo permitido" suffix="pips" decimals={2} value={config.maxSpread} onChange={(v) => patch({ maxSpread: v })} />
      </FieldRow>
      <FieldRow label="Confirmar direção do preço" help="Método usado para confirmar a direção antes de executar.">
        <SelectBox label="Confirmar direção do preço" value={config.priceDirection} options={priceDirectionOptions} onChange={(v) => patch({ priceDirection: v })} />
      </FieldRow>
      <FieldRow label="Tempo máximo para executar" help="Sinais não executados dentro deste prazo são descartados.">
        <NumberBox label="Tempo máximo para executar" suffix="segundos" min={1} value={config.maxExecSeconds} onChange={(v) => patch({ maxExecSeconds: Math.round(v) })} />
      </FieldRow>
      <FieldRow label="Volatilidade mínima (ATR)" help="ATR mínimo exigido para que o sinal seja considerado.">
        <NumberBox label="Volatilidade mínima (ATR)" suffix="pips" decimals={2} value={config.minAtr} onChange={(v) => patch({ minAtr: v })} />
      </FieldRow>
      <FieldRow label="Horário permitido (BRT)" help="Janela diária em que sinais podem ser executados.">
        <SelectBox label="Horário permitido" value={config.hours} options={hoursOptions} onChange={(v) => patch({ hours: v })} />
      </FieldRow>
      <ToggleRow label="Evitar notícias de alto impacto" help="Bloqueia entradas próximas a notícias de alto impacto." checked={config.avoidNews} onChange={(v) => patch({ avoidNews: v })} />
      <FieldRow label="Confirmar com indicador" help="Indicador usado na confirmação da entrada.">
        <SelectBox label="Confirmar com indicador" value={config.indicator} options={indicatorOptions} onChange={(v) => patch({ indicator: v })} />
      </FieldRow>
      <FieldRow label="Filtro de tendência" help="Define se operações contra a tendência são permitidas.">
        <SelectBox label="Filtro de tendência" value={config.trendFilter} options={trendFilterOptions} onChange={(v) => patch({ trendFilter: v })} />
      </FieldRow>
      <FieldRow label="Mínimo de volume (tick)" help="Volume mínimo de ticks no último candle.">
        <NumberBox label="Mínimo de volume (tick)" min={0} value={config.minVolume} onChange={(v) => patch({ minVolume: Math.round(v) })} />
      </FieldRow>
      <FieldRow label="Distância mínima do SL" help="Distância mínima entre a entrada e o Stop Loss.">
        <NumberBox label="Distância mínima do SL" suffix="pips" decimals={1} value={config.minSlDistance} onChange={(v) => patch({ minSlDistance: v })} />
      </FieldRow>
      <ToggleRow label="Evitar entrada em consolidação" help="Ignora sinais durante faixas de lateralização." checked={config.avoidConsolidation} onChange={(v) => patch({ avoidConsolidation: v })} />
      <ToggleRow label="Usar preço de mercado (se muito distante)" help="Executa a mercado quando o preço se afasta da entrada." checked={config.useMarketPrice} onChange={(v) => patch({ useMarketPrice: v })} />
    </div>
  );
}

function AdvancedFilters({ config, onChange }: Props) {
  const patch = (partial: Partial<SmartEntryConfig["advanced"]>) => onChange((current) => ({ ...current, advanced: { ...current.advanced, ...partial } }));
  const { advanced } = config;
  return (
    <div className="divide-y divide-line/40">
      <FieldRow label="Slippage máximo" help="Desvio máximo aceito entre o preço pedido e o executado.">
        <NumberBox label="Slippage máximo" suffix="pips" decimals={1} value={advanced.maxSlippage} onChange={(v) => patch({ maxSlippage: v })} />
      </FieldRow>
      <FieldRow label="Risco/retorno mínimo" help="Relação mínima entre TP e SL para aprovar o sinal.">
        <NumberBox label="Risco/retorno mínimo" suffix=": 1" decimals={1} value={advanced.minRiskReward} onChange={(v) => patch({ minRiskReward: v })} />
      </FieldRow>
      <FieldRow label="Máx. de entradas por símbolo" help="Limite de operações abertas simultaneamente no mesmo símbolo.">
        <NumberBox label="Máx. de entradas por símbolo" min={1} value={advanced.maxOpenPerSymbol} onChange={(v) => patch({ maxOpenPerSymbol: Math.round(v) })} />
      </FieldRow>
      <ToggleRow label="Bloquear sinais duplicados" help="Ignora sinais idênticos recebidos em sequência." checked={advanced.blockDuplicates} onChange={(v) => patch({ blockDuplicates: v })} />
      <ToggleRow label="Evitar sessões de baixa liquidez" help="Bloqueia entradas na virada de sessão e no fim do dia." checked={advanced.avoidLowLiquiditySession} onChange={(v) => patch({ avoidLowLiquiditySession: v })} />
    </div>
  );
}

function Confirmations({ config, onChange }: Props) {
  const patch = (partial: Partial<SmartEntryConfig["confirmations"]>) => onChange((current) => ({ ...current, confirmations: { ...current.confirmations, ...partial } }));
  const { confirmations } = config;
  return (
    <div className="divide-y divide-line/40">
      <FieldRow label="Confirmações necessárias" help="Quantidade mínima de filtros que precisam concordar.">
        <NumberBox label="Confirmações necessárias" min={1} max={6} value={confirmations.minConfirmations} onChange={(v) => patch({ minConfirmations: Math.round(v) })} />
      </FieldRow>
      <FieldRow label="Aguardar confirmação" help="Tempo de espera pelas confirmações antes de descartar o sinal.">
        <NumberBox label="Aguardar confirmação" suffix="segundos" min={0} value={confirmations.waitSeconds} onChange={(v) => patch({ waitSeconds: Math.round(v) })} />
      </FieldRow>
      <ToggleRow label="Confirmar no fechamento do candle" checked={confirmations.candleClose} onChange={(v) => patch({ candleClose: v })} />
      <ToggleRow label="Exigir pico de volume" checked={confirmations.volumeSpike} onChange={(v) => patch({ volumeSpike: v })} />
      <ToggleRow label="Confirmar em múltiplos timeframes" checked={confirmations.multiTimeframe} onChange={(v) => patch({ multiTimeframe: v })} />
      <ToggleRow label="Exigir aprovação manual" help="Envia o sinal para aprovação no Telegram antes de executar." checked={confirmations.manualApproval} onChange={(v) => patch({ manualApproval: v })} />
    </div>
  );
}

function Schedule({ config, onChange }: Props) {
  const { days, sessions } = config.schedule;
  const patchSchedule = (partial: Partial<SmartEntryConfig["schedule"]>) => onChange((current) => ({ ...current, schedule: { ...current.schedule, ...partial } }));
  return (
    <div className="space-y-3">
      <FieldRow label="Horário permitido (BRT)" controlClass="w-[150px]">
        <SelectBox label="Horário permitido" value={config.hours} options={hoursOptions} onChange={(v) => onChange((current) => ({ ...current, hours: v }))} />
      </FieldRow>
      <div>
        <div className="mb-2 text-[13px] text-fg-muted">Dias da semana</div>
        <div role="group" aria-label="Dias da semana" className="flex flex-wrap gap-2">
          {weekdayLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              aria-pressed={days[index]}
              onClick={() => patchSchedule({ days: days.map((d, i) => (i === index ? !d : d)) })}
              className={cx(
                "h-9 min-w-12 rounded-md border px-3 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                days[index] ? "border-brand-strong bg-brand-strong/20 text-fg" : "border-line bg-canvas text-fg-muted hover:border-line-strong",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-line/40 border-t border-line/40 pt-1">
        <ToggleRow label="Sessão de Londres" checked={sessions.london} onChange={(v) => patchSchedule({ sessions: { ...sessions, london: v } })} />
        <ToggleRow label="Sessão de Nova York" checked={sessions.newYork} onChange={(v) => patchSchedule({ sessions: { ...sessions, newYork: v } })} />
        <ToggleRow label="Sessão da Ásia" checked={sessions.asia} onChange={(v) => patchSchedule({ sessions: { ...sessions, asia: v } })} />
      </div>
    </div>
  );
}

export default function RulesPanel({ config, onChange }: Props) {
  const baseId = useId();
  const [tab, setTab] = useState<TabId>("main");

  return (
    <Panel title="Regras de Smart Entry" icon="filter" className="h-full">
      <p className="-mt-1 mb-3 text-[13px] leading-5 text-fg-muted">Defina as condições para validar e executar os sinais automaticamente.</p>
      <div role="tablist" aria-label="Seções das regras" className="mb-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {tabs.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              onClick={() => setTab(item.id)}
              className={cx(
                "h-9 rounded-md border px-2 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active ? "border-brand-strong bg-brand-strong text-white" : "border-line bg-canvas text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${tab}`}>
        {tab === "main" && <MainRules config={config} onChange={onChange} />}
        {tab === "advanced" && <AdvancedFilters config={config} onChange={onChange} />}
        {tab === "confirmations" && <Confirmations config={config} onChange={onChange} />}
        {tab === "hours" && <Schedule config={config} onChange={onChange} />}
      </div>
    </Panel>
  );
}
