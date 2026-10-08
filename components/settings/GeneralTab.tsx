"use client";
import { useState } from "react";
import { Button } from "../UI";
import {
  chartSizeOptions,
  currencyOptions,
  dateFormatOptions,
  decimalOptions,
  defaultGeneralSettings,
  historyPeriodOptions,
  languageOptions,
  priceViewOptions,
  symbolOptions,
  syncIntervalOptions,
  timeFormatOptions,
  timezoneOptions,
  unitOptions,
  type GeneralSettingsValues,
} from "../../lib/settings-demo";
import SettingsIcon from "./SettingsIcons";
import { BrazilFlag, DollarBadge, GoldBadge, SelectField, SettingsCard, SwitchRow, TextField } from "./SettingsFields";

export default function GeneralTab() {
  const [values, setValues] = useState<GeneralSettingsValues>(defaultGeneralSettings);
  const set = <K extends keyof GeneralSettingsValues>(key: K) => (value: GeneralSettingsValues[K]) => setValues((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 lg:grid-cols-2">
      <SettingsCard icon="accounts" title="Informações da Conta" description="Seus dados pessoais e informações da conta Copytrix.">
        <div className="flex flex-col gap-3">
          <TextField label="Nome" icon="user" value={values.name} onChange={set("name")} />
          <TextField label="Email" icon="mail" type="email" value={values.email} onChange={set("email")} />
          <div className="flex flex-col gap-2">
            <span className="text-[13px] leading-4 text-fg-muted">Foto do Perfil</span>
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#d9dee6] text-[26px] font-bold text-[#1b2433]"
              >
                R
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button variant="primary" className="!h-[34px] rounded-lg px-4 text-[13px]">
                    Alterar Foto
                  </Button>
                  <Button variant="secondary" className="!h-[34px] rounded-lg px-4 text-[13px]">
                    Remover
                  </Button>
                </div>
                <p className="mt-1.5 text-[12px] leading-4 text-fg-muted">JPG, PNG ou WebP. Máx. 2MB.</p>
              </div>
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard icon="settings" title="Preferências Gerais" description="Defina suas preferências de uso da plataforma.">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          <SelectField label="Idioma da Plataforma" leading={<BrazilFlag />} value={values.language} onChange={set("language")} options={languageOptions} />
          <SelectField label="Fuso Horário" value={values.timezone} onChange={set("timezone")} options={timezoneOptions} />
          <SelectField label="Formato de Data" value={values.dateFormat} onChange={set("dateFormat")} options={dateFormatOptions} />
          <SelectField label="Formato de Hora" value={values.timeFormat} onChange={set("timeFormat")} options={timeFormatOptions} />
          <SelectField label="Número de casas decimais (lotes)" value={values.decimals} onChange={set("decimals")} options={decimalOptions} />
          <SelectField label="Moeda padrão" leading={<DollarBadge />} value={values.currency} onChange={set("currency")} options={currencyOptions} />
        </div>
      </SettingsCard>

      <SettingsCard icon="barsFilled" title="Preferências de Trading" description="Configurações padrão para operações e exibições.">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 items-end gap-x-3 gap-y-3 sm:grid-cols-[minmax(0,1.6fr)_minmax(116px,1fr)_minmax(102px,.9fr)_minmax(146px,1.15fr)]">
            <SelectField compact label="Símbolo principal" leading={<GoldBadge />} value={values.mainSymbol} onChange={set("mainSymbol")} options={symbolOptions} />
            <SelectField compact label="Visualização de Preço" value={values.priceView} onChange={set("priceView")} options={priceViewOptions} />
            <SelectField compact label="Unidade de Medida" value={values.unit} onChange={set("unit")} options={unitOptions} />
            <SelectField compact label="Tamanho padrão do gráfico" value={values.chartSize} onChange={set("chartSize")} options={chartSizeOptions} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <SwitchRow checked={values.confirmManual} onChange={set("confirmManual")} title="Confirmar operações manuais" description="Solicita confirmação antes de enviar ordens manuais." />
            <SwitchRow checked={values.alertSound} onChange={set("alertSound")} title="Som de alerta para operações" description="Reproduz um som ao executar operações." />
            <SwitchRow checked={values.platformNotifications} onChange={set("platformNotifications")} title="Exibir notificações na plataforma" description="Mostra pop-ups de notificações." />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard icon="database" title="Armazenamento e Dados" description="Gerencie o armazenamento de dados, histórico e backups.">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <SelectField label="Período de histórico nas telas" leading={<SettingsIcon name="history" size={17} />} value={values.historyPeriod} onChange={set("historyPeriod")} options={historyPeriodOptions} />
            <SelectField label="Intervalo de sincronização" value={values.syncInterval} onChange={set("syncInterval")} options={syncIntervalOptions} />
          </div>
          <div className="flex flex-col gap-[7px]">
            <SwitchRow checked={values.keepSystemLogs} onChange={set("keepSystemLogs")} title="Guardar logs de sistema" description="Mantém o histórico de logs no sistema." />
            <SwitchRow checked={values.keepTradeHistory} onChange={set("keepTradeHistory")} title="Guardar histórico de operações" description="Mantém o histórico completo de operações." />
            <SwitchRow checked={values.autoBackup} onChange={set("autoBackup")} title="Backup automático de configurações" description="Salva automaticamente suas configurações na nuvem." />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard icon="eye" title="Privacidade" description="Defina suas preferências de privacidade.">
        <div className="flex flex-col gap-[7px]">
          <SwitchRow checked={values.shareUsageData} onChange={set("shareUsageData")} title="Permitir uso de dados para melhorias" description="Envia dados anônimos para melhorar a plataforma." />
          <SwitchRow checked={values.sharePerformance} onChange={set("sharePerformance")} title="Compartilhar métricas de desempenho" description="Permite o uso de métricas anonimizadas em benchmarks." />
        </div>
      </SettingsCard>

      <SettingsCard icon="trash" title="Zona de Perigo" description="Ações irreversíveis relacionadas à sua conta." tone="danger">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex h-[42px] shrink-0 items-center justify-center gap-2.5 rounded-lg border border-danger/60 bg-danger/10 px-5 text-[14px] font-medium text-danger transition-colors hover:bg-danger/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
          >
            <SettingsIcon name="trash" size={17} />
            Excluir Minha Conta
          </button>
          <p className="max-w-sm text-[13px] leading-5 text-fg-muted">
            Esta ação é permanente e removerá todos os seus dados, configurações e histórico da plataforma.
          </p>
        </div>
      </SettingsCard>
    </div>
  );
}
