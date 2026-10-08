"use client";

import { useId, type ReactNode } from "react";
import {
  lotMethods,
  riskPresets,
  sltpModes,
  toNumber,
  type AccountSettings,
  type CredentialsValues,
  type RiskSettings,
  type TradingPlatform,
} from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import { Button, cx } from "../../UI";
import FieldIcon from "./FieldIcons";
import RiskSummaryPanel from "./RiskSummaryPanel";

const outlineButton =
  "inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-6 text-[15px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const sanitizeDecimal = (value: string) => value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");

function SectionHeading({ title, description, help }: { title: string; description: string; help: string }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-[19px] font-semibold leading-7 tracking-tight text-fg">
        {title}
        <span className="text-fg-subtle">
          <Icon name="info" size={16} />
          <span className="sr-only">{help}</span>
        </span>
      </h3>
      <p className="mt-0.5 text-[14.5px] leading-6 text-fg-muted">{description}</p>
    </div>
  );
}

function OptionCard({
  name,
  value,
  selected,
  title,
  description,
  idleIcon,
  onSelect,
}: {
  name: string;
  value: string;
  selected: boolean;
  title: string;
  description: string;
  idleIcon?: ReactNode;
  onSelect: () => void;
}) {
  return (
    <label
      className={cx(
        "relative flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
        selected
          ? "border-brand bg-brand-soft/40 shadow-[0_0_0_1px_rgba(21,154,242,.55),0_0_16px_rgba(21,154,242,.22)]"
          : "border-line bg-surface-2/30 hover:border-line-strong",
      )}
    >
      <input type="radio" name={name} value={value} checked={selected} onChange={onSelect} className="sr-only" />
      {!selected && idleIcon ? (
        <span aria-hidden className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center text-fg-muted">
          {idleIcon}
        </span>
      ) : (
        <span
          aria-hidden
          className={cx(
            "mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-brand bg-brand-strong" : "border-fg-subtle",
          )}
        >
          {selected && <span className="size-1.5 rounded-full bg-white" />}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[15px] font-medium leading-6 text-fg">{title}</span>
        <span className="mt-0.5 block text-pretty text-[12.5px] leading-[18px] text-fg-muted">{description}</span>
      </span>
    </label>
  );
}

function UnitField({
  id,
  label,
  hint,
  unit,
  value,
  onChange,
  integer = false,
}: {
  id: string;
  label: string;
  hint: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  integer?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-[14.5px] leading-6 text-fg-muted">
        {label}
      </label>
      <div className="flex h-11 min-w-0 items-stretch overflow-hidden rounded-lg border border-line bg-canvas/60 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/60">
        <input
          id={id}
          type="text"
          inputMode={integer ? "numeric" : "decimal"}
          value={value}
          onChange={(e) => onChange(integer ? e.target.value.replace(/\D/g, "") : sanitizeDecimal(e.target.value))}
          className="min-w-0 flex-1 bg-transparent px-3.5 text-[15.5px] text-fg outline-none"
        />
        <span className="flex min-w-16 shrink-0 items-center justify-center border-l border-line bg-surface-2/40 px-3 text-[14.5px] text-fg-muted">{unit}</span>
      </div>
      <p className="mt-1 text-pretty text-[13px] leading-5 text-fg-subtle">{hint}</p>
    </div>
  );
}

export default function RiskStep({
  platform,
  credentials,
  settings,
  risk,
  onChange,
  onBack,
  onNext,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
  risk: RiskSettings;
  onChange: (next: RiskSettings) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const update = <K extends keyof RiskSettings>(key: K, value: RiskSettings[K]) => onChange({ ...risk, [key]: value });
  const currentRisk = toNumber(risk.riskPercent);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      aria-labelledby="risk-step-title"
      className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.57fr)_minmax(0,1fr)]"
    >
      <section className="flex min-w-0 flex-col gap-5 rounded-xl border border-line bg-surface/70 p-4 sm:p-5">
        <div>
          <h2 id="risk-step-title" tabIndex={-1} className="text-[22px] font-semibold leading-8 tracking-tight text-fg outline-none">
            4. Gestão de Risco da Conta
          </h2>
          <p className="mt-0.5 text-[15px] leading-6 text-fg-muted">
            Defina as regras de gestão de risco para a conta {platform.name} - {settings.name}.
          </p>
        </div>

        <fieldset className="min-w-0 border-0 border-t border-line p-0 pt-4">
          <legend className="sr-only">Método de cálculo de lote</legend>
          <SectionHeading
            title="1. Método de Cálculo de Lote"
            description="Escolha como o Copytrix irá calcular o tamanho da posição em cada operação."
            help="O método define como o tamanho da posição é calculado"
          />
          <div className="mt-3 grid grid-cols-1 gap-3 min-[560px]:grid-cols-3">
            {lotMethods.map((item) => (
              <OptionCard
                key={item.id}
                name={id("method")}
                value={item.id}
                selected={risk.method === item.id}
                title={item.title}
                description={item.description}
                onSelect={() => update("method", item.id)}
              />
            ))}
          </div>
        </fieldset>

        <section aria-label="Percentual de risco por operação" className="min-w-0">
          <SectionHeading
            title="2. Percentual de Risco por Operação"
            description="Defina o percentual do saldo que será arriscado em cada operação."
            help="Percentual do saldo arriscado em cada operação"
          />
          <div className="mt-3 grid grid-cols-1 items-center gap-3 min-[560px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="flex h-11 min-w-0 items-stretch overflow-hidden rounded-lg border border-line bg-canvas/60 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/60">
              <input
                id={id("risk")}
                aria-label="Percentual de risco por operação"
                type="text"
                inputMode="decimal"
                value={risk.riskPercent}
                onChange={(e) => update("riskPercent", sanitizeDecimal(e.target.value))}
                className="min-w-0 flex-1 bg-transparent px-3.5 text-[15.5px] text-fg outline-none"
              />
              <span className="flex w-14 shrink-0 items-center justify-center text-[14.5px] text-fg-muted">%</span>
            </div>
            <div role="group" aria-label="Percentuais sugeridos" className="grid grid-cols-5 gap-2">
              {riskPresets.map((preset) => {
                const active = currentRisk === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update("riskPercent", preset.toFixed(2))}
                    className={cx(
                      "h-11 rounded-lg border text-[14.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      active
                        ? "border-brand-strong bg-brand-strong font-semibold text-white shadow-[0_0_14px_rgba(21,154,242,.4)]"
                        : "border-line bg-surface-2/30 text-fg hover:border-line-strong",
                    )}
                  >
                    {preset}%
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-label="Configurações avançadas" className="min-w-0">
          <SectionHeading
            title="3. Configurações Avançadas"
            description="Personalize os parâmetros de risco e exposição da conta."
            help="Parâmetros adicionais de risco e exposição"
          />
          <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-3 min-[560px]:grid-cols-3">
            <UnitField id={id("sl")} label="SL Padrão (pips)" hint="Usado para calcular o lote automaticamente." unit="pips" value={risk.defaultSl} onChange={(v) => update("defaultSl", v)} />
            <UnitField id={id("min")} label="Lote Mínimo" hint="Lote mínimo permitido." unit="lotes" value={risk.minLot} onChange={(v) => update("minLot", v)} />
            <UnitField id={id("max")} label="Lote Máximo" hint="Lote máximo permitido." unit="lotes" value={risk.maxLot} onChange={(v) => update("maxLot", v)} />
            <UnitField
              id={id("trades")}
              label="Máximo de Operações Simultâneas"
              hint="Limita o número de posições abertas."
              unit="operações"
              integer
              value={risk.maxTrades}
              onChange={(v) => update("maxTrades", v)}
            />
            <UnitField
              id={id("asset")}
              label="Exposição Máxima por Ativo"
              hint="Percentual máximo do saldo por ativo."
              unit="%"
              value={risk.maxAssetExposure}
              onChange={(v) => update("maxAssetExposure", v)}
            />
            <UnitField
              id={id("total")}
              label="Exposição Máxima Total"
              hint="Percentual máximo do saldo em risco."
              unit="%"
              value={risk.maxTotalExposure}
              onChange={(v) => update("maxTotalExposure", v)}
            />
          </div>
        </section>

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="sr-only">Copiar SL/TP do signal</legend>
          <SectionHeading
            title="4. Copiar SL/TP do Signal"
            description="Defina como o Copytrix irá utilizar os níveis de Stop Loss e Take Profit dos sinais."
            help="Define a origem dos níveis de Stop Loss e Take Profit"
          />
          <div className="mt-3 grid grid-cols-1 gap-3 min-[560px]:grid-cols-3">
            {sltpModes.map((item, index) => (
              <OptionCard
                key={item.id}
                name={id("sltp")}
                value={item.id}
                selected={risk.sltpMode === item.id}
                title={item.title}
                description={item.description}
                idleIcon={index === 1 ? <Icon name="shield" size={20} /> : <FieldIcon name="sliders" size={20} />}
                onSelect={() => update("sltpMode", item.id)}
              />
            ))}
          </div>
        </fieldset>
      </section>

      <div className="flex min-w-0 flex-col gap-4">
        <RiskSummaryPanel platform={platform} credentials={credentials} settings={settings} risk={risk} />

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
