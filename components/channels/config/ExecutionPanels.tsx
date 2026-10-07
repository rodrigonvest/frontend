"use client";
import type { ReactNode } from "react";
import { Icon } from "../../Icons";
import { WEEK_DAYS, type ConfigPanelProps, type WeekDay } from "../../../lib/channel-config";
import { Check, Panel, TimeInput, Toggle, UnitInput } from "./fields";

function ToggleRow({ checked, onChange, label, children }: { checked: boolean; onChange: (next: boolean) => void; label: string; children?: ReactNode }) {
  return (
    <div className="flex min-h-[38px] items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Toggle checked={checked} onChange={onChange} label={label} />
        <span className="text-[13px] text-fg">{label}</span>
      </div>
      {children && <div className="w-[150px] shrink-0">{children}</div>}
    </div>
  );
}

export function ExecutionFiltersPanel({ config, update }: ConfigPanelProps) {
  const f = config.filters;
  const set = (patch: Partial<typeof f>) => update({ filters: { ...f, ...patch } });
  return (
    <Panel title="Filtros de Execução">
      <div className="flex flex-col gap-2">
        <ToggleRow checked={f.spread.enabled} onChange={(enabled) => set({ spread: { ...f.spread, enabled } })} label="Verificar Spread Máximo">
          <UnitInput label="Spread máximo" unit="pips" value={f.spread.pips} disabled={!f.spread.enabled} onChange={(pips) => set({ spread: { ...f.spread, pips } })} />
        </ToggleRow>
        <ToggleRow checked={f.distance.enabled} onChange={(enabled) => set({ distance: { ...f.distance, enabled } })} label="Verificar Distância de Entrada">
          <UnitInput label="Distância máxima de entrada" unit="pips" value={f.distance.pips} disabled={!f.distance.enabled} onChange={(pips) => set({ distance: { ...f.distance, pips } })} />
        </ToggleRow>
        <ToggleRow checked={f.outsideHours.enabled} onChange={(enabled) => set({ outsideHours: { ...f.outsideHours, enabled } })} label="Ignorar sinais fora do horário">
          <div className="grid grid-cols-[minmax(0,1fr)_14px_minmax(0,1fr)] items-center gap-1">
            <TimeInput compact label="Início do horário permitido" value={f.outsideHours.from} disabled={!f.outsideHours.enabled} onChange={(from) => set({ outsideHours: { ...f.outsideHours, from } })} />
            <span aria-hidden className="text-fg-subtle">
              <Icon name="arrowRight" size={12} />
            </span>
            <TimeInput compact label="Fim do horário permitido" value={f.outsideHours.to} disabled={!f.outsideHours.enabled} onChange={(to) => set({ outsideHours: { ...f.outsideHours, to } })} />
          </div>
        </ToggleRow>
        <ToggleRow checked={f.onlyMainSymbol} onChange={(onlyMainSymbol) => set({ onlyMainSymbol })} label={`Executar apenas ${config.mainSymbol}`} />
        <ToggleRow checked={f.duplicates} onChange={(duplicates) => set({ duplicates })} label="Ignorar sinais duplicados" />
      </div>
    </Panel>
  );
}

export function TradingHoursPanel({ config, update }: ConfigPanelProps) {
  const s = config.schedule;
  const set = (patch: Partial<typeof s>) => update({ schedule: { ...s, ...patch } });
  const toggleDay = (day: WeekDay, on: boolean) => set({ days: on ? WEEK_DAYS.map((d) => d.value).filter((d) => d === day || s.days.includes(d)) : s.days.filter((d) => d !== day) });

  return (
    <Panel title="Horário de Operação" badge={<span className="text-[13px] text-fg-muted">(opcional)</span>}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Toggle checked={s.restrict} onChange={(restrict) => set({ restrict })} label="Restringir horário de execução" />
          <span className="text-[13px] text-fg">Restringir horário de execução</span>
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2">
          <span className="text-[13px] text-fg-muted">Início</span>
          <TimeInput label="Horário de início" value={s.start} disabled={!s.restrict} onChange={(start) => set({ start })} />
          <span className="pl-1 text-[13px] text-fg-muted">Fim</span>
          <TimeInput label="Horário de fim" value={s.end} disabled={!s.restrict} onChange={(end) => set({ end })} />
        </div>
        <fieldset disabled={!s.restrict} className="m-0 min-w-0 border-0 p-0 disabled:opacity-50">
          <legend className="mb-2 p-0 text-[13px] text-fg-muted">Dias da Semana</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {WEEK_DAYS.map((d) => (
              <Check key={d.value} checked={s.days.includes(d.value)} onChange={(on) => toggleDay(d.value, on)} disabled={!s.restrict}>
                {d.label}
              </Check>
            ))}
          </div>
        </fieldset>
      </div>
    </Panel>
  );
}

export function PositionManagementPanel({ config, update }: ConfigPanelProps) {
  const p = config.position;
  const set = (patch: Partial<typeof p>) => update({ position: { ...p, ...patch } });
  return (
    <Panel title="Gerenciamento de Posição">
      <div className="flex flex-col gap-2">
        <ToggleRow checked={p.breakEven.enabled} onChange={(enabled) => set({ breakEven: { ...p.breakEven, enabled } })} label="Mover SL para Break Even">
          <UnitInput label="Pips para mover SL ao Break Even" unit="pips" value={p.breakEven.pips} disabled={!p.breakEven.enabled} onChange={(pips) => set({ breakEven: { ...p.breakEven, pips } })} />
        </ToggleRow>
        <ToggleRow checked={p.trailing.enabled} onChange={(enabled) => set({ trailing: { ...p.trailing, enabled } })} label="Trailing Stop">
          <UnitInput label="Distância do Trailing Stop" unit="pips" value={p.trailing.pips} disabled={!p.trailing.enabled} onChange={(pips) => set({ trailing: { ...p.trailing, pips } })} />
        </ToggleRow>
        <ToggleRow checked={p.partial.enabled} onChange={(enabled) => set({ partial: { ...p.partial, enabled } })} label="Fechamento Parcial">
          <UnitInput label="Percentual de fechamento parcial" unit="% no TP1" value={p.partial.percent} disabled={!p.partial.enabled} onChange={(percent) => set({ partial: { ...p.partial, percent } })} />
        </ToggleRow>
        <ToggleRow checked={p.closeAtLastTp} onChange={(closeAtLastTp) => set({ closeAtLastTp })} label="Fechar todas no último TP" />
      </div>
    </Panel>
  );
}
