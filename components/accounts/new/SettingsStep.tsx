"use client";

import { useId, type ReactNode } from "react";
import {
  accountCurrencies,
  accountEnvironments,
  accountLeverages,
  accountTimezones,
  executionTypes,
  operatingHours,
  type AccountKindId,
  type AccountSettings,
  type CredentialsValues,
  type TradingPlatform,
} from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import { Button, cx } from "../../UI";
import FieldIcon, { type FieldIconName } from "./FieldIcons";
import SettingsSummaryPanel from "./SettingsSummaryPanel";

const outlineButton =
  "inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-6 text-[15px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const shell =
  "flex h-11 min-w-0 items-stretch overflow-hidden rounded-lg border border-line bg-canvas/60 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/60";
const control = "min-w-0 flex-1 bg-transparent px-3.5 text-[15.5px] text-fg outline-none placeholder:text-fg-subtle";
const leadingBox = "flex w-11 shrink-0 items-center justify-center text-fg-muted";

function GroupCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section aria-label={title} className="rounded-xl border border-line bg-surface-2/30 px-3.5 pb-3.5 pt-3">
      <div className="flex items-center gap-3">
        <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-strong/20 text-brand">
          {icon}
        </span>
        <h3 className="text-[17px] font-semibold leading-6 text-fg">{title}</h3>
      </div>
      <div className="mt-2.5 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, htmlFor, hint, labelAddon, children }: { label: string; htmlFor: string; hint: string; labelAddon?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1 flex items-center gap-1.5 text-[15px] leading-6 text-fg-muted">
        {label}
        {labelAddon}
      </label>
      {children}
      <p className="mt-1 text-pretty text-[13px] leading-5 text-fg-subtle">{hint}</p>
    </div>
  );
}

function SelectField({
  id,
  value,
  onChange,
  options,
  leading,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  leading?: ReactNode;
}) {
  return (
    <div className={shell}>
      {leading}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(control, !leading && "pl-3.5", "cursor-pointer appearance-none [&>option]:bg-surface [&>option]:text-fg")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none flex w-10 shrink-0 items-center justify-center text-fg-muted">
        <Icon name="chevronDown" size={17} stroke={2} />
      </span>
    </div>
  );
}

function IconLead({ name, bordered = false }: { name: FieldIconName; bordered?: boolean }) {
  return (
    <span className={cx(leadingBox, bordered && "border-r border-line bg-surface-2/40")}>
      <FieldIcon name={name} size={18} />
    </span>
  );
}

const asOptions = (items: readonly string[]) => items.map((item) => ({ value: item, label: item }));

export default function SettingsStep({
  platform,
  credentials,
  settings,
  onChange,
  onEditCredentials,
  onBack,
  onNext,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
  onChange: (next: AccountSettings) => void;
  onEditCredentials: () => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const update = <K extends keyof AccountSettings>(key: K, value: AccountSettings[K]) => onChange({ ...settings, [key]: value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      aria-labelledby="settings-step-title"
      className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.73fr)_minmax(0,1fr)]"
    >
      <section className="flex min-w-0 flex-col gap-3 rounded-xl border border-line bg-surface/70 p-4">
        <div>
          <h2 id="settings-step-title" tabIndex={-1} className="text-[22px] font-semibold leading-8 tracking-tight text-fg outline-none">
            3. Configurações da Conta
          </h2>
          <p className="mt-0.5 text-[15px] leading-6 text-fg-muted">Defina as configurações operacionais da sua conta {platform.name}.</p>
        </div>

        <GroupCard icon={<Icon name="settings" size={18} />} title="Configurações Básicas">
          <Field label="Nome da Conta" htmlFor={id("name")} hint="Um nome para identificar esta conta no Copytrix.">
            <div className={shell}>
              <IconLead name="card" />
              <input id={id("name")} type="text" value={settings.name} onChange={(e) => update("name", e.target.value)} className={control} />
            </div>
          </Field>

          <Field
            label="Ambiente"
            htmlFor={id("environment")}
            hint="Selecione o ambiente da conta."
            labelAddon={
              <span className="text-fg-subtle">
                <Icon name="info" size={15} />
                <span className="sr-only">Ambiente em que a conta opera</span>
              </span>
            }
          >
            <SelectField
              id={id("environment")}
              value={settings.environment}
              onChange={(value) => update("environment", value as AccountKindId)}
              options={accountEnvironments.map((item) => ({ value: item.id, label: item.label }))}
              leading={
                <span aria-hidden className={leadingBox}>
                  <span className="size-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.8)]" />
                </span>
              }
            />
          </Field>

          <Field label="Moeda da Conta" htmlFor={id("currency")} hint="Moeda base da sua conta de trading.">
            <SelectField
              id={id("currency")}
              value={settings.currency}
              onChange={(value) => update("currency", value)}
              options={accountCurrencies.map((item) => ({ value: item.code, label: item.label }))}
              leading={
                <span aria-hidden className={cx(leadingBox, "text-brand")}>
                  <Icon name="dollar" size={22} stroke={2.2} />
                </span>
              }
            />
          </Field>

          <Field label="Alavancagem" htmlFor={id("leverage")} hint="Alavancagem da conta na corretora.">
            <SelectField id={id("leverage")} value={settings.leverage} onChange={(value) => update("leverage", value)} options={asOptions(accountLeverages)} />
          </Field>
        </GroupCard>

        <GroupCard icon={<FieldIcon name="bolt" size={18} />} title="Configurações de Execução">
          <Field label="Tipo de Execução" htmlFor={id("execution")} hint="Tipo de execução das ordens enviadas.">
            <SelectField
              id={id("execution")}
              value={settings.executionType}
              onChange={(value) => update("executionType", value)}
              options={asOptions(executionTypes)}
              leading={<IconLead name="bolt" />}
            />
          </Field>

          <Field label="Desvio Máximo (Slippage)" htmlFor={id("slippage")} hint="Desvio máximo aceito na execução.">
            <div className={shell}>
              <input
                id={id("slippage")}
                type="number"
                min={0}
                inputMode="numeric"
                value={settings.slippage}
                onChange={(e) => update("slippage", e.target.value)}
                className={cx(control, "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none")}
              />
              <span className="flex w-16 shrink-0 items-center justify-center border-l border-line bg-surface-2/40 text-[14.5px] text-fg-muted">pips</span>
            </div>
          </Field>

          <Field label="Magic Number" htmlFor={id("magic")} hint="Identificador das ordens do Copytrix.">
            <div className={shell}>
              <input
                id={id("magic")}
                type="text"
                inputMode="numeric"
                value={settings.magicNumber}
                onChange={(e) => update("magicNumber", e.target.value.replace(/\D/g, ""))}
                className={control}
              />
            </div>
          </Field>

          <Field label="Comentário das Ordens" htmlFor={id("comment")} hint="Comentário que será adicionado nas ordens.">
            <div className={shell}>
              <input id={id("comment")} type="text" value={settings.comment} onChange={(e) => update("comment", e.target.value)} className={control} />
            </div>
          </Field>
        </GroupCard>

        <GroupCard icon={<Icon name="clock" size={18} />} title="Horários de Operação">
          <Field label="Fuso Horário da Conta" htmlFor={id("timezone")} hint="Fuso horário do servidor da conta.">
            <SelectField
              id={id("timezone")}
              value={settings.timezone}
              onChange={(value) => update("timezone", value)}
              options={asOptions(accountTimezones)}
              leading={<IconLead name="globe" />}
            />
          </Field>

          <Field label="Horário de Operação (Opcional)" htmlFor={id("hours")} hint="Defina o período que esta conta poderá operar.">
            <SelectField id={id("hours")} value={settings.hours} onChange={(value) => update("hours", value)} options={asOptions(operatingHours)} />
          </Field>
        </GroupCard>
      </section>

      <div className="flex min-w-0 flex-col gap-4">
        <SettingsSummaryPanel platform={platform} credentials={credentials} settings={settings} onEdit={onEditCredentials} />

        <div className="mt-auto flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onBack} className={outlineButton}>
            <Icon name="arrowLeft" size={17} />
            Etapa Anterior
          </button>
          <Button type="submit" variant="primary" className="h-12 gap-2.5 rounded-lg px-6 text-[15px] font-semibold">
            Próxima Etapa
            <Icon name="arrowRight" size={17} stroke={2.2} />
          </Button>
        </div>
      </div>
    </form>
  );
}
