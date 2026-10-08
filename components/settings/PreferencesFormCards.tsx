"use client";
import type { ReactNode } from "react";
import { NotificationCard } from "./NotificationFields";
import { BrazilFlag, SelectField } from "./SettingsFields";
import { BarsIcon, ClockIcon, GlobeIcon } from "./PreferencesIcons";
import {
  chartTypeOptions,
  currencyOptions,
  dateFormatOptions,
  decimalPlacesOptions,
  exportFormatOptions,
  groupingOptions,
  languageOptions,
  measureUnitOptions,
  numberFormatOptions,
  reportPeriodOptions,
  timeFormatOptions,
  timezoneOptions,
  type PreferenceSelectKey,
  type PreferencesValues,
} from "../../lib/preferences-demo";

export type PreferencesCardProps = {
  values: PreferencesValues;
  onSelect: (key: PreferenceSelectKey, value: string) => void;
};

function FieldGrid({ columns, children }: { columns: string; children: ReactNode }) {
  return <div className={`grid grid-cols-1 gap-x-3.5 gap-y-3 sm:grid-cols-2 ${columns}`}>{children}</div>;
}

export function LanguageCard({ values, onSelect }: PreferencesCardProps) {
  return (
    <NotificationCard icon={<GlobeIcon size={32} />} title="Idioma e Região" description="Defina o idioma da plataforma, fuso horário e formato de dados.">
      <FieldGrid columns="lg:grid-cols-[1.3fr_1.25fr_0.9fr_1fr]">
        <SelectField dense label="Idioma" value={values.language} onChange={(v) => onSelect("language", v)} options={languageOptions} leading={<BrazilFlag />} />
        <SelectField dense label="Fuso Horário" value={values.timezone} onChange={(v) => onSelect("timezone", v)} options={timezoneOptions} />
        <SelectField dense label="Formato de Data" value={values.dateFormat} onChange={(v) => onSelect("dateFormat", v)} options={dateFormatOptions} />
        <SelectField dense label="Formato de Hora" value={values.timeFormat} onChange={(v) => onSelect("timeFormat", v)} options={timeFormatOptions} />
      </FieldGrid>
    </NotificationCard>
  );
}

export function RegionalCard({ values, onSelect }: PreferencesCardProps) {
  return (
    <NotificationCard icon={<ClockIcon size={32} />} title="Configurações Regionais" description="Personalize moedas, unidades e formatos numéricos.">
      <FieldGrid columns="lg:grid-cols-[1.35fr_1.15fr_1fr_1.1fr]">
        <SelectField dense label="Moeda Padrão" value={values.currency} onChange={(v) => onSelect("currency", v)} options={currencyOptions} />
        <SelectField dense label="Formato Numérico" value={values.numberFormat} onChange={(v) => onSelect("numberFormat", v)} options={numberFormatOptions} />
        <SelectField dense label="Unidade de Medida" value={values.unit} onChange={(v) => onSelect("unit", v)} options={measureUnitOptions} />
        <SelectField dense label="Casas Decimais" value={values.decimals} onChange={(v) => onSelect("decimals", v)} options={decimalPlacesOptions} />
      </FieldGrid>
    </NotificationCard>
  );
}

export function ReportsCard({ values, onSelect }: PreferencesCardProps) {
  return (
    <NotificationCard
      icon={<BarsIcon size={32} />}
      title="Personalização de Relatórios"
      description="Configure como os relatórios e estatísticas são exibidos."
    >
      <FieldGrid columns="lg:grid-cols-[1.1fr_1.1fr_1fr_1fr]">
        <SelectField label="Período Padrão" value={values.reportPeriod} onChange={(v) => onSelect("reportPeriod", v)} options={reportPeriodOptions} />
        <SelectField label="Tipo de Gráfico Padrão" value={values.chartType} onChange={(v) => onSelect("chartType", v)} options={chartTypeOptions} />
        <SelectField label="Agrupamento Padrão" value={values.grouping} onChange={(v) => onSelect("grouping", v)} options={groupingOptions} />
        <SelectField label="Exportação Padrão" value={values.exportFormat} onChange={(v) => onSelect("exportFormat", v)} options={exportFormatOptions} />
      </FieldGrid>
    </NotificationCard>
  );
}
