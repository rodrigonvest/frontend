"use client";
import { LEVERAGES, LOT_MODES, type RiskConfig } from "../../lib/risk-management-demo";
import { NumberBox } from "../multi-account/MaPrimitives";
import { FieldRow, Panel, SelectBox, TextBox, ToggleRow } from "./RiskFields";

type PanelProps = { config: RiskConfig; onChange: (patch: Partial<RiskConfig>) => void };

const round1 = (value: number) => Math.round(value * 10) / 10;
const round2 = (value: number) => Math.round(value * 100) / 100;

export function RiskLimitsCard({ config, onChange }: PanelProps) {
  return (
    <Panel title="Limites de Risco" icon="barsFilled">
      <FieldRow label="Risco por Operação" help="Percentual do capital arriscado em cada operação.">
        <NumberBox label="Risco por Operação" value={config.perTrade} decimals={1} max={100} suffix="%" onChange={(v) => onChange({ perTrade: round1(v) })} />
      </FieldRow>
      <FieldRow label="Risco Diário (Loss Limit)" help="Perda máxima permitida em um dia.">
        <NumberBox label="Risco Diário" value={config.daily} decimals={1} max={100} suffix="%" onChange={(v) => onChange({ daily: round1(v) })} />
      </FieldRow>
      <FieldRow label="Risco Semanal" help="Perda máxima permitida em uma semana.">
        <NumberBox label="Risco Semanal" value={config.weekly} decimals={1} max={100} suffix="%" onChange={(v) => onChange({ weekly: round1(v) })} />
      </FieldRow>
      <FieldRow label="Drawdown Máximo" help="Queda máxima do capital a partir do topo.">
        <NumberBox label="Drawdown Máximo" value={config.drawdown} decimals={1} max={100} suffix="%" onChange={(v) => onChange({ drawdown: round1(v) })} />
      </FieldRow>
      <FieldRow label="Limite de Exposição Total" help="Exposição somada de todas as posições abertas, em % do capital.">
        <NumberBox label="Limite de Exposição Total" value={config.exposure} decimals={1} max={1000} suffix="%" onChange={(v) => onChange({ exposure: round1(v) })} />
      </FieldRow>
      <div className="mt-1.5 border-t border-line pt-1.5">
        <ToggleRow label="Pausar operações ao atingir limite diário" checked={config.pauseDaily} onChange={(v) => onChange({ pauseDaily: v })} />
        <ToggleRow label="Pausar operações ao atingir limite semanal" checked={config.pauseWeekly} onChange={(v) => onChange({ pauseWeekly: v })} />
        <ToggleRow label="Pausar ao atingir drawdown máximo" checked={config.pauseDrawdown} onChange={(v) => onChange({ pauseDrawdown: v })} />
        <ToggleRow label="Zerar todas as posições automaticamente" checked={config.closeAll} onChange={(v) => onChange({ closeAll: v })} />
      </div>
    </Panel>
  );
}

export function LotManagementCard({ config, onChange }: PanelProps) {
  const lotRangeInvalid = config.minLot > config.maxLot;
  return (
    <Panel title="Gestão de Lote e Alocação" icon="accounts">
      <FieldRow label="Modo de Cálculo de Lote" help="Define como o tamanho da posição é calculado." controlClass="w-[170px]">
        <SelectBox label="Modo de Cálculo de Lote" value={config.lotMode} options={LOT_MODES.map((mode) => ({ value: mode, label: mode }))} onChange={(v) => onChange({ lotMode: v })} />
      </FieldRow>
      <FieldRow label="Risco por Operação" help="Mesmo valor usado em Limites de Risco.">
        <NumberBox label="Risco por Operação" value={config.perTrade} decimals={1} max={100} suffix="%" onChange={(v) => onChange({ perTrade: round1(v) })} />
      </FieldRow>
      <FieldRow label="SL Padrão (pips)" help="Stop loss usado quando o sinal não informa um.">
        <NumberBox label="SL Padrão" value={config.slPips} decimals={0} suffix="pips" onChange={(v) => onChange({ slPips: Math.round(v) })} />
      </FieldRow>
      <FieldRow label="Alavancagem da Conta" help="Alavancagem máxima considerada no cálculo." controlClass="w-[170px]">
        <SelectBox label="Alavancagem da Conta" value={config.leverage} options={LEVERAGES.map((item) => ({ value: item, label: item }))} onChange={(v) => onChange({ leverage: v })} />
      </FieldRow>
      <FieldRow label="Lote Mínimo" help="Menor lote permitido por operação.">
        <NumberBox label="Lote Mínimo" value={config.minLot} decimals={2} onChange={(v) => onChange({ minLot: round2(v) })} />
      </FieldRow>
      <FieldRow label="Lote Máximo" help="Maior lote permitido por operação.">
        <NumberBox label="Lote Máximo" value={config.maxLot} decimals={2} onChange={(v) => onChange({ maxLot: round2(v) })} />
      </FieldRow>
      {lotRangeInvalid && (
        <p role="alert" className="mb-1 text-[12px] text-danger">
          O lote mínimo não pode ser maior que o lote máximo.
        </p>
      )}
      <div className="mt-1.5 border-t border-line pt-1.5">
        <ToggleRow label="Ajuste por Volatilidade (ATR)" help="Reduz o lote quando a volatilidade (ATR) está elevada." checked={config.atr} onChange={(v) => onChange({ atr: v })} />
        <ToggleRow label="Reduzir lote em alta correlação" help="Reduz o lote quando há posições correlacionadas abertas." checked={config.reduceCorrelation} onChange={(v) => onChange({ reduceCorrelation: v })} />
        <div className="mt-1 grid grid-cols-2 gap-2.5">
          <label className="block">
            <span className="mb-1 block text-[12px] text-fg-muted">Multiplicador de Lote</span>
            <NumberBox label="Multiplicador de Lote" value={config.multiplier} decimals={1} max={10} className="w-full" onChange={(v) => onChange({ multiplier: round1(v) })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[12px] text-fg-muted">Lote Fixo (opcional)</span>
            <NumberBox label="Lote Fixo" value={config.fixedLot} decimals={2} className="w-full" onChange={(v) => onChange({ fixedLot: round2(v) })} />
          </label>
        </div>
      </div>
    </Panel>
  );
}

export function ExecutionFiltersCard({ config, onChange }: PanelProps) {
  return (
    <Panel title="Filtros de Execução por Mercado" icon="filter">
      <FieldRow label="Spread Máximo" help="Spread máximo aceito para abrir uma operação.">
        <NumberBox label="Spread Máximo" value={config.maxSpread} decimals={2} suffix="pips" onChange={(v) => onChange({ maxSpread: round2(v) })} />
      </FieldRow>
      <FieldRow label="Distância Máxima da Entrada" help="Distância máxima entre o preço atual e a entrada do sinal.">
        <NumberBox label="Distância Máxima da Entrada" value={config.maxDistance} decimals={1} suffix="pips" onChange={(v) => onChange({ maxDistance: round1(v) })} />
      </FieldRow>
      <FieldRow label="Horário Permitido (BRT)" help="Janela em que novas operações podem ser abertas.">
        <TextBox label="Horário Permitido (BRT)" value={config.hours} placeholder="09:00 - 23:00" onChange={(v) => onChange({ hours: v })} />
      </FieldRow>
      <div className="mt-1.5 border-t border-line pt-1.5">
        <ToggleRow label="Evitar Notícias de Alto Impacto" checked={config.avoidNews} onChange={(v) => onChange({ avoidNews: v })} />
        <ToggleRow label="Pausar em Alta Volatilidade" checked={config.pauseVolatility} onChange={(v) => onChange({ pauseVolatility: v })} />
        <ToggleRow label="Filtro de Correlação entre Símbolos" checked={config.correlationFilter} onChange={(v) => onChange({ correlationFilter: v })} />
      </div>
      <div className="mt-1.5 border-t border-line pt-1.5">
        <FieldRow label="Máx. de Operações Simultâneas" help="Quantidade máxima de operações abertas ao mesmo tempo.">
          <NumberBox label="Máximo de Operações Simultâneas" value={config.maxOps} decimals={0} max={100} onChange={(v) => onChange({ maxOps: Math.round(v) })} />
        </FieldRow>
        <FieldRow label="Tempo Mínimo entre Operações" help="Intervalo mínimo entre duas aberturas de operação.">
          <NumberBox label="Tempo Mínimo entre Operações" value={config.minGapSeconds} decimals={0} max={86400} suffix="seg" onChange={(v) => onChange({ minGapSeconds: Math.round(v) })} />
        </FieldRow>
      </div>
    </Panel>
  );
}
