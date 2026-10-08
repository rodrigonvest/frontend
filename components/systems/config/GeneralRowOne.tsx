"use client";
import {
  OPERATION_MODE_OPTIONS,
  STATUS_OPTIONS,
  SYMBOL_OPTIONS,
  TIMEZONE_OPTIONS,
  type ConnectionPanel,
  type SetConfigValue,
  type SystemConfigValues,
} from "../../../lib/system-config-demo";
import type { SystemRoute } from "../../../lib/systems-catalog";
import { Icon } from "../../Icons";
import { cx } from "../../UI";
import SystemLogo from "../SystemLogo";
import { ConfigCard, SelectField, StatusBadge, StatusDot, TextAreaField, TextField, Toggle, outlineButtonClass, type StatusTone } from "./fields";

type CardProps = { values: SystemConfigValues; set: SetConfigValue };

export const SYSTEM_STATUS_TONE: Record<SystemConfigValues["status"], StatusTone> = {
  active: "success",
  paused: "warning",
  inactive: "neutral",
};

export function SystemInfoCard({ values, set, route }: CardProps & { route: SystemRoute }) {
  return (
    <ConfigCard title="Informações do Sistema">
      <div className="flex flex-col gap-3.5">
        <TextField label="Nome do Sistema" value={values.name} onChange={(v) => set("name", v)} />
        <TextAreaField label="Descrição" value={values.description} onChange={(v) => set("description", v)} />
        <SelectField
          label="Status"
          value={values.status}
          onChange={(v) => set("status", v)}
          options={STATUS_OPTIONS}
          leading={<StatusDot tone={SYSTEM_STATUS_TONE[values.status]} />}
        />
        <SelectField
          inline
          disabled
          label="Tipo de Sistema"
          value={route.routeId}
          options={[{ value: route.routeId, label: route.name }]}
          leading={<SystemLogo logo={route.icon.source} size={20} />}
        />
      </div>
    </ConfigCard>
  );
}

export function GeneralSettingsCard({ values, set }: CardProps) {
  return (
    <ConfigCard title="Configurações Gerais">
      <div className="flex flex-col gap-3">
        <SelectField inline label="Modo de Operação" value={values.mode} onChange={(v) => set("mode", v)} options={OPERATION_MODE_OPTIONS} />
        <SelectField
          inline
          label="Fuso Horário"
          value={values.timezone}
          onChange={(v) => set("timezone", v)}
          options={TIMEZONE_OPTIONS.map((tz) => ({ value: tz, label: tz }))}
        />
        <SelectField
          inline
          label="Símbolo Padrão"
          value={values.symbol}
          onChange={(v) => set("symbol", v)}
          options={SYMBOL_OPTIONS.map((s) => ({ value: s, label: s }))}
        />
        <TextField inline label="Lote Padrão" value={values.lot} onChange={(v) => set("lot", v)} inputMode="decimal" />
        <TextField inline label="Slippage Máximo" value={values.slippage} onChange={(v) => set("slippage", v)} unit="pips" inputMode="numeric" />
        <div className="mt-1 flex flex-col gap-2.5">
          <Toggle checked={values.singleSignal} onChange={(v) => set("singleSignal", v)} label="Permitir apenas um sinal por vez" />
          <Toggle checked={values.onlyScheduled} onChange={(v) => set("onlyScheduled", v)} label="Executar apenas no horário configurado" />
        </div>
      </div>
    </ConfigCard>
  );
}

export function ConnectionStatusCard({ panels }: { panels: readonly ConnectionPanel[] }) {
  return (
    <ConfigCard title="Status da Conexão">
      <ul className="flex flex-col gap-4">
        {panels.map((panel) => (
          <li key={panel.title}>
            <div className="flex items-center gap-2.5">
              <StatusDot tone={panel.connected ? "success" : "danger"} className="size-3" />
              <span className="text-[14px] font-semibold text-fg">{panel.title}</span>
              <StatusBadge tone={panel.connected ? "success" : "danger"}>{panel.connected ? "Conectado" : "Desconectado"}</StatusBadge>
              <button type="button" aria-label={`Testar conexão ${panel.title}`} className={cx(outlineButtonClass, "ml-auto")}>
                <Icon name="plus" size={13} stroke={2.2} />
                Testar
              </button>
            </div>
            <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-1 pl-[22px] text-[12.5px] leading-5">
              {panel.details.map((detail) => (
                <div key={detail.label} className="col-span-2 grid grid-cols-subgrid">
                  <dt className="text-fg-muted">{detail.label}</dt>
                  <dd className="min-w-0 truncate text-fg">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </ConfigCard>
  );
}
