"use client";
import { useId } from "react";
import { Icon } from "../../Icons";
import { Badge } from "../../UI";
import { LEVERAGES, RISK_MODES, SIGNAL_FORMATS, withCurrentOption, type ConfigPanelProps, type RiskMode } from "../../../lib/channel-config";
import { Check, FieldRow, Panel, Radio, SelectInput, UnitInput, toOptions } from "./fields";

export function SignalFormatPanel({ config, update }: ConfigPanelProps) {
  const uid = useId();
  return (
    <Panel title="Formato dos Sinais">
      <p className="-mt-1 mb-3 text-xs leading-5 text-fg-muted">Selecione o formato que melhor corresponde aos sinais deste canal</p>
      <div role="radiogroup" aria-label="Formato dos sinais" className="flex flex-col gap-3">
        <Check checked={config.autoDetect} onChange={(autoDetect) => update({ autoDetect, format: autoDetect ? null : (config.format ?? "kim") })}>
          Detectar automaticamente o formato
        </Check>
        {SIGNAL_FORMATS.map((f) => (
          <Radio key={f.value} name={`${uid}-format`} checked={!config.autoDetect && config.format === f.value} onChange={() => update({ autoDetect: false, format: f.value })}>
            {f.label}
          </Radio>
        ))}
      </div>
    </Panel>
  );
}

const SAMPLE = { direction: "BUY", entry: 4142.5, sl: 4140.5, tps: [4144.5, 4146.5, 4148.5, 4152.5] };
const price = (n: number) => n.toFixed(2);

function Identified({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center gap-2 text-xs text-fg-muted">
      <span aria-hidden className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-success text-canvas">
        <Icon name="check" size={10} stroke={3.4} />
      </span>
      <span className="truncate">
        {label}: {value}
      </span>
    </li>
  );
}

export function SignalExamplePanel({ config }: ConfigPanelProps) {
  return (
    <Panel title="Exemplo de sinal detectado">
      <div className="relative rounded-lg bg-canvas/70 px-3.5 py-3">
        <Badge tone="green" className="absolute right-2.5 top-2.5 px-2.5 py-0.5 text-xs">
          Sinal válido
        </Badge>
        <pre className="m-0 overflow-x-auto font-mono text-[13px] leading-[1.45] text-fg-muted">
          {`${SAMPLE.direction}  ${config.mainSymbol}\nEntry: ${price(SAMPLE.entry)}\nSL: ${price(SAMPLE.sl)}\n${SAMPLE.tps.map((tp, i) => `TP${i + 1}: ${price(tp)}`).join("\n")}`}
        </pre>
      </div>
      <p className="mb-2 mt-3 text-[13px] font-semibold text-fg">Campos identificados:</p>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
        <Identified label="Direção" value={SAMPLE.direction} />
        <Identified label="Stop Loss" value={price(SAMPLE.sl)} />
        <Identified label="Símbolo" value={config.mainSymbol} />
        <Identified label="Take Profits" value={`${SAMPLE.tps.length} níveis`} />
        <Identified label="Entrada" value={price(SAMPLE.entry)} />
      </ul>
    </Panel>
  );
}

export function RiskPanel({ config, update }: ConfigPanelProps) {
  const uid = useId();
  const unit = RISK_MODES.find((m) => m.value === config.riskMode)?.unit ?? "%";
  return (
    <Panel title="Configuração de Risco (Padrão)">
      <div className="flex flex-col gap-3">
        <FieldRow label="Modo de Risco" htmlFor={`${uid}-mode`}>
          <SelectInput id={`${uid}-mode`} value={config.riskMode} onChange={(v) => update({ riskMode: v as RiskMode })} options={RISK_MODES.map((m) => ({ value: m.value, label: m.label }))} />
        </FieldRow>
        <FieldRow label="Valor de Risco" htmlFor={`${uid}-value`}>
          <UnitInput id={`${uid}-value`} label="Valor de risco" value={config.riskValue} onChange={(riskValue) => update({ riskValue })} unit={unit} />
        </FieldRow>
        <FieldRow label="Lote Mínimo" htmlFor={`${uid}-min`}>
          <UnitInput id={`${uid}-min`} label="Lote mínimo" value={config.minLot} onChange={(minLot) => update({ minLot })} unit="lote" />
        </FieldRow>
        <FieldRow label="Lote Máximo" htmlFor={`${uid}-max`}>
          <UnitInput id={`${uid}-max`} label="Lote máximo" value={config.maxLot} onChange={(maxLot) => update({ maxLot })} unit="lote" />
        </FieldRow>
        <FieldRow label="Alavancagem (opcional)" htmlFor={`${uid}-lev`}>
          <SelectInput id={`${uid}-lev`} value={config.leverage} onChange={(leverage) => update({ leverage })} options={withCurrentOption(toOptions(LEVERAGES), config.leverage)} />
        </FieldRow>
      </div>
    </Panel>
  );
}
