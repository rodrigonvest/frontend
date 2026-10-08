"use client";
import { SIGNAL_FORMAT_OPTIONS, WEEKDAYS, type SetConfigValue, type SystemConfigValues } from "../../../lib/system-config-demo";
import { Icon } from "../../Icons";
import { cx } from "../../UI";
import { CheckboxChip, ConfigCard, Label, RadioRow, TimeInput, Toggle, UnitInput, outlineButtonClass } from "./fields";

type CardProps = { values: SystemConfigValues; set: SetConfigValue };

export function ScheduleCard({ values, set }: CardProps) {
  const off = !values.restrictHours;
  return (
    <ConfigCard title="Horário de Operação">
      <div className="flex flex-col gap-3.5">
        <Toggle checked={values.restrictHours} onChange={(v) => set("restrictHours", v)} label="Restringir horário de execução" />

        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2">
          <Label htmlFor="schedule-start">Início</Label>
          <TimeInput id="schedule-start" value={values.start} onChange={(v) => set("start", v)} disabled={off} />
          <Label htmlFor="schedule-end">Fim</Label>
          <TimeInput id="schedule-end" value={values.end} onChange={(v) => set("end", v)} disabled={off} />
        </div>

        <fieldset className="min-w-0">
          <legend className="mb-2 text-[13px] text-fg-muted">Dias da Semana</legend>
          <div className="flex flex-wrap gap-x-3.5 gap-y-2">
            {WEEKDAYS.map((day, index) => (
              <CheckboxChip
                key={day}
                label={day}
                disabled={off}
                checked={values.days[index]}
                onChange={(checked) =>
                  set(
                    "days",
                    values.days.map((current, i) => (i === index ? checked : current)),
                  )
                }
              />
            ))}
          </div>
        </fieldset>
      </div>
    </ConfigCard>
  );
}

function FilterRow({ toggle, children }: { toggle: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(120px,150px)] items-center gap-3">
      {toggle}
      {children}
    </div>
  );
}

export function QuickFilterCard({ values, set }: CardProps) {
  return (
    <ConfigCard title="Filtragem Rápida">
      <div className="flex flex-col gap-3">
        <FilterRow toggle={<Toggle checked={values.checkSpread} onChange={(v) => set("checkSpread", v)} label="Verificar Spread Máximo" />}>
          <UnitInput ariaLabel="Spread máximo em pips" value={values.spread} onChange={(v) => set("spread", v)} unit="pips" disabled={!values.checkSpread} />
        </FilterRow>

        <FilterRow toggle={<Toggle checked={values.checkDistance} onChange={(v) => set("checkDistance", v)} label="Verificar Distância de Entrada" />}>
          <UnitInput ariaLabel="Distância máxima de entrada em pips" value={values.distance} onChange={(v) => set("distance", v)} unit="pips" disabled={!values.checkDistance} />
        </FilterRow>

        <FilterRow toggle={<Toggle checked={values.ignoreOutside} onChange={(v) => set("ignoreOutside", v)} label="Ignorar sinais fora do horário" />}>
          <div className={cx("flex items-center gap-1.5", !values.ignoreOutside && "opacity-60")}>
            <TimeInput ariaLabel="Início do intervalo permitido" value={values.ignoreFrom} onChange={(v) => set("ignoreFrom", v)} disabled={!values.ignoreOutside} />
            <span aria-hidden className="text-fg-subtle">
              <Icon name="arrowRight" size={13} />
            </span>
            <TimeInput ariaLabel="Fim do intervalo permitido" value={values.ignoreTo} onChange={(v) => set("ignoreTo", v)} disabled={!values.ignoreOutside} />
          </div>
        </FilterRow>

        <FilterRow toggle={<Toggle checked={values.ignoreDuplicates} onChange={(v) => set("ignoreDuplicates", v)} label="Ignorar sinais duplicados" />}>
          <UnitInput
            ariaLabel="Intervalo de duplicados em minutos"
            value={values.duplicateMinutes}
            onChange={(v) => set("duplicateMinutes", v)}
            unit="minutos"
            inputMode="numeric"
            disabled={!values.ignoreDuplicates}
          />
        </FilterRow>
      </div>
    </ConfigCard>
  );
}

export function SignalFormatCard({ values, set }: CardProps) {
  return (
    <ConfigCard
      title="Formato dos Sinais"
      description="Selecione o formato que este sistema irá interpretar"
      action={
        <button type="button" className={outlineButtonClass}>
          <Icon name="minus" size={12} stroke={2.4} />
          Testar Parser
        </button>
      }
    >
      <fieldset>
        <legend className="sr-only">Formato dos sinais</legend>
        <div className="flex flex-col gap-3">
          {SIGNAL_FORMAT_OPTIONS.map((option) => (
            <RadioRow
              key={option.value}
              name="signal-format"
              label={option.label}
              checked={values.signalFormat === option.value}
              onChange={() => set("signalFormat", option.value)}
            />
          ))}
        </div>
      </fieldset>
    </ConfigCard>
  );
}
