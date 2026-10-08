"use client";
import { useState } from "react";
import { cx } from "../UI";
import SettingsIcon from "./SettingsIcons";
import { SelectField } from "./SettingsFields";
import { dangerButtonClass, outlineButtonClass } from "./SecurityFields";
import { BellLogo, BookIcon, LinkIcon, MailLogo, PlayIcon, TelegramLogo, WebhookLogo } from "./NotificationIcons";
import { CopyField, NotificationCard, NotificationToggle, StatusBadge, TextInputField, ToggleRow, primaryButtonClass } from "./NotificationFields";
import { durationOptions, emailDemo, payloadFormatOptions, soundOptions, telegramDemo, webhookDemoUrl } from "../../lib/notifications-demo";

export function TelegramCard() {
  const [botToken, setBotToken] = useState(telegramDemo.botToken);
  const [chatId, setChatId] = useState(telegramDemo.chatId);

  return (
    <NotificationCard icon={<TelegramLogo />} title="Telegram" badge={<StatusBadge tone="success">Conectado</StatusBadge>} description="Receba notificações instantâneas no seu Telegram.">
      <div className="flex flex-1 flex-col gap-3.5">
        <CopyField label="Bot Token" value={botToken} onChange={setBotToken} />
        <CopyField label="Chat ID" value={chatId} onChange={setChatId} />
        <div className="grid grid-cols-[1.15fr_1fr] gap-2.5">
          <button type="button" className={cx(outlineButtonClass, "h-[38px] !px-2")}>
            <SettingsIcon name="send" size={15} />
            Testar Conexão
          </button>
          <button type="button" className={cx(dangerButtonClass, "h-[38px] !px-2")}>
            Desconectar
          </button>
        </div>
        <a
          href="#como-configurar-telegram"
          className="mt-auto inline-flex items-center gap-2.5 pt-3 text-[13px] text-brand transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <BookIcon size={18} />
          Como configurar o Telegram?
        </a>
      </div>
    </NotificationCard>
  );
}

export function EmailCard() {
  const [primary, setPrimary] = useState(emailDemo.primary);
  const [extras, setExtras] = useState(emailDemo.additional);

  return (
    <NotificationCard icon={<MailLogo />} title="E-mail" badge={<StatusBadge tone="success">Ativo</StatusBadge>} description="Receba notificações por e-mail sobre eventos importantes.">
      <div className="flex flex-1 flex-col gap-3.5">
        <TextInputField label="E-mail Principal" type="email" value={primary} onChange={setPrimary} />
        <div className="flex flex-col gap-2">
          <p className="text-[13px] leading-4 text-fg-muted">E-mails Adicionais (opcional)</p>
          <ul className="flex min-h-[38px] flex-wrap items-center gap-1.5 rounded-lg border border-line-strong/50 bg-canvas/60 px-2 py-1.5">
            {extras.map((email) => (
              <li key={email} className="inline-flex h-6 items-center gap-1.5 rounded-md border border-brand/40 bg-brand/10 pl-2 pr-1 text-[11.5px] text-fg">
                {email}
                <button
                  type="button"
                  aria-label={`Remover ${email}`}
                  onClick={() => setExtras((list) => list.filter((item) => item !== email))}
                  className="flex size-4 items-center justify-center rounded text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <SettingsIcon name="x" size={11} stroke={2.4} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className={cx(outlineButtonClass, "h-[38px] w-full")}>
          <SettingsIcon name="plus" size={15} stroke={2.2} />
          Adicionar E-mail
        </button>
        <button type="button" className={cx(outlineButtonClass, "mt-auto h-[38px] w-full !bg-brand/[.14]")}>
          <SettingsIcon name="mail" size={16} />
          Testar E-mail
        </button>
      </div>
    </NotificationCard>
  );
}

export function PushCard() {
  const [enabled, setEnabled] = useState(true);
  const [sound, setSound] = useState("default");
  const [duration, setDuration] = useState("5");

  return (
    <NotificationCard
      icon={<BellLogo />}
      title="Push (Navegador)"
      badge={<StatusBadge tone="success">Ativo</StatusBadge>}
      description="Receba notificações no seu navegador, mesmo com a plataforma em segundo plano."
    >
      <div className="flex flex-1 flex-col gap-3.5">
        <div className="flex items-center gap-3">
          <NotificationToggle checked={enabled} onChange={setEnabled} label="Habilitar notificações push" />
          <span className="text-[13px] font-medium text-fg">Habilitar notificações push</span>
        </div>
        <div className="flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <SelectField label="Som de notificação" value={sound} onChange={setSound} options={soundOptions} />
          </div>
          <button type="button" aria-label="Reproduzir som de notificação" className={cx(outlineButtonClass, "size-[38px] !px-0")}>
            <PlayIcon size={14} />
          </button>
        </div>
        <SelectField label="Duração da notificação" value={duration} onChange={setDuration} options={durationOptions} />
        <button type="button" className={cx(primaryButtonClass, "mt-auto")}>
          <SettingsIcon name="bell" size={16} />
          Enviar Notificação de Teste
        </button>
      </div>
    </NotificationCard>
  );
}

export function WebhookCard() {
  const [url, setUrl] = useState(webhookDemoUrl);
  const [format, setFormat] = useState("json");
  const [includeData, setIncludeData] = useState(false);

  return (
    <NotificationCard icon={<WebhookLogo />} title="Webhook" badge={<StatusBadge tone="muted">Desativado</StatusBadge>} description="Envie notificações para seus sistemas externos.">
      <div className="flex flex-1 flex-col gap-3.5">
        <TextInputField label="URL do Webhook" type="url" value={url} onChange={setUrl} />
        <SelectField label="Formato dos dados" value={format} onChange={setFormat} options={payloadFormatOptions} />
        <ToggleRow checked={includeData} onChange={setIncludeData} title="Incluir dados da operação" description="Envia detalhes completos da operação." />
        <button type="button" className={cx(outlineButtonClass, "mt-auto h-[38px] w-full")}>
          <LinkIcon size={16} />
          Testar Webhook
        </button>
      </div>
    </NotificationCard>
  );
}
