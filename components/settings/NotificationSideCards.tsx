"use client";
import { useState } from "react";
import { cx } from "../UI";
import SettingsIcon from "./SettingsIcons";
import { SelectField } from "./SettingsFields";
import { CheckCircleIcon, FlaskIcon } from "./NotificationIcons";
import { NotificationCard, ToggleRow, primaryButtonClass } from "./NotificationFields";
import { groupingOptions, lastNotificationDemo, sendWindowOptions, testTypeOptions } from "../../lib/notifications-demo";

export function AdvancedSettingsCard() {
  const [sendWindow, setSendWindow] = useState("realtime");
  const [grouping, setGrouping] = useState("none");
  const [dailySummary, setDailySummary] = useState(true);
  const [importantOnly, setImportantOnly] = useState(false);
  const [chartImage, setChartImage] = useState(true);

  return (
    <NotificationCard icon={<SettingsIcon name="settings" size={30} stroke={1.7} />} title="Configurações Avançadas">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.25fr_1fr]">
          <SelectField compact label="Horário de envio" value={sendWindow} onChange={setSendWindow} options={sendWindowOptions} />
          <SelectField compact label="Agrupar notificações" value={grouping} onChange={setGrouping} options={groupingOptions} />
        </div>
        <ToggleRow checked={dailySummary} onChange={setDailySummary} title="Enviar resumo diário" description="Receba um resumo das operações do dia." />
        <ToggleRow checked={importantOnly} onChange={setImportantOnly} title="Notificar apenas eventos importantes" description="Reduz o número de notificações recebidas." />
        <ToggleRow checked={chartImage} onChange={setChartImage} title="Incluir imagem do gráfico" description="Envia uma captura do gráfico na notificação." />
      </div>
    </NotificationCard>
  );
}

export function TestNotificationCard() {
  const [type, setType] = useState("open");

  return (
    <NotificationCard
      icon={<FlaskIcon size={30} />}
      title="Teste de Notificação"
      description="Envie uma notificação de teste para verificar suas configurações."
    >
      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
          <SelectField label="Selecione o tipo de notificação" value={type} onChange={setType} options={testTypeOptions} />
          <button type="button" className={cx(primaryButtonClass, "!h-[42px]")}>
            <SettingsIcon name="telegram" size={16} />
            Enviar Teste
          </button>
        </div>

        <div role="status" className="flex items-start gap-3 rounded-lg border border-success/45 bg-success/[.08] px-3.5 py-3">
          <span aria-hidden className="mt-0.5 flex shrink-0 text-success">
            <CheckCircleIcon size={26} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13.5px] font-semibold leading-5 text-success">Última Notificação Enviada</p>
              <time className="tabular shrink-0 text-[11.5px] text-fg-muted">{lastNotificationDemo.date}</time>
            </div>
            <p className="mt-0.5 text-[12.5px] leading-5 text-fg">{lastNotificationDemo.title}</p>
            <div className="mt-1 flex items-end justify-between gap-3">
              <p className="text-[11.5px] leading-4 text-fg-muted">{lastNotificationDemo.summary}</p>
              <a href="#detalhes-notificacao" className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] text-brand transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
                Ver Detalhes
                <SettingsIcon name="external" size={12} stroke={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </NotificationCard>
  );
}
