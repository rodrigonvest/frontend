import { Icon } from "../Icons";
import { cx } from "../UI";
import { webhooksDemo, type WebhookDemo, type WebhookLogoId } from "../../lib/api-demo";
import SettingsIcon from "./SettingsIcons";
import { SettingsCard } from "./SettingsFields";

function WebhookLogo({ logo }: { logo: WebhookLogoId }) {
  const base = "flex size-6 shrink-0 items-center justify-center rounded-md";
  if (logo === "telegram") {
    return (
      <span aria-hidden className={cx(base, "bg-[#229ed9] text-white")}>
        <Icon name="telegram" size={14} />
      </span>
    );
  }
  if (logo === "discord") {
    return (
      <span aria-hidden className={cx(base, "bg-[#5865f2] text-white")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.2 6.6c1.5-.8 3.1-1.2 4.8-1.2s3.300.4 4.800 1.200c1.500 2.300 2.300 4.900 2.200 8-1 .9-2.200 1.600-3.600 2l-.9-1.500c.5-.2 1-.4 1.400-.7-.3-.2-.7-.4-1-.5-1.800.8-4.100.8-5.900 0-.3.100-.7.300-1 .5.400.3.900.5 1.400.7l-.9 1.500c-1.400-.4-2.600-1.100-3.600-2-.100-3.100.7-5.700 2.300-8Z" />
          <circle cx="9.400" cy="12.200" r="1.200" fill="#5865f2" />
          <circle cx="14.600" cy="12.200" r="1.200" fill="#5865f2" />
        </svg>
      </span>
    );
  }
  if (logo === "tradingview") {
    return (
      <span aria-hidden className={cx(base, "bg-white text-[9.5px] font-extrabold tracking-tight text-[#0b1220]")}>
        TV
      </span>
    );
  }
  return (
    <span aria-hidden className={cx(base, "border border-brand/35 bg-brand/10 text-brand")}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1" />
      </svg>
    </span>
  );
}

function ActionButton({ icon, label, danger }: { icon: string; label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        "flex size-7 items-center justify-center rounded-md transition-colors hover:bg-surface-3/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
        danger ? "text-danger" : "text-fg",
      )}
    >
      <SettingsIcon name={icon} size={16} stroke={1.9} />
    </button>
  );
}

function WebhookRow({ webhook }: { webhook: WebhookDemo }) {
  return (
    <tr className="border-t border-line/70">
      <td className="py-1.5 pr-3">
        <span className="flex items-center gap-2.5 whitespace-nowrap font-medium text-fg">
          <WebhookLogo logo={webhook.logo} />
          {webhook.name}
        </span>
      </td>
      <td className="max-w-[150px] truncate py-1.5 pr-3 text-fg-muted" title={webhook.url}>
        {webhook.url}
      </td>
      <td className="py-1.5 pr-3">
        <ul className="flex flex-wrap gap-1.5">
          {webhook.events.map((event) => (
            <li
              key={event.label}
              className={cx(
                "inline-flex h-6 items-center rounded-md border px-2 text-[11.5px] leading-none",
                event.tone === "danger" ? "border-danger/50 bg-danger/10 text-danger" : "border-brand/45 bg-brand/10 text-fg",
              )}
            >
              {event.label}
            </li>
          ))}
        </ul>
      </td>
      <td className="py-1.5 pr-3">
        <span className={cx("inline-flex items-center gap-2 whitespace-nowrap", webhook.active ? "text-success" : "text-fg-muted")}>
          <span aria-hidden className={cx("size-2 rounded-full", webhook.active ? "bg-success shadow-[0_0_6px_var(--color-success)]" : "bg-fg-subtle")} />
          {webhook.active ? "Ativo" : "Inativo"}
        </span>
      </td>
      <td className="py-1.5">
        <div className="flex items-center gap-1">
          <ActionButton icon="edit" label={`Editar webhook ${webhook.name}`} />
          <ActionButton icon="pause" label={`${webhook.active ? "Pausar" : "Retomar"} webhook ${webhook.name}`} />
          <ActionButton icon="trash" label={`Excluir webhook ${webhook.name}`} danger={!webhook.active} />
        </div>
      </td>
    </tr>
  );
}

export default function WebhooksCard() {
  return (
    <SettingsCard
      icon="webhook"
      title="Webhooks"
      description="Receba notificações em tempo real sobre eventos importantes da sua conta."
      action={
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-brand-strong px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <SettingsIcon name="plus" size={15} stroke={2.4} />
          Adicionar Webhook
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
          <caption className="sr-only">Webhooks configurados</caption>
          <thead>
            <tr className="text-[12.5px] text-fg-muted">
              <th scope="col" className="pb-2 pr-3 font-normal">
                Nome
              </th>
              <th scope="col" className="pb-2 pr-3 font-normal">
                URL de Destino
              </th>
              <th scope="col" className="pb-2 pr-3 font-normal">
                Eventos
              </th>
              <th scope="col" className="pb-2 pr-3 font-normal">
                Status
              </th>
              <th scope="col" className="pb-2 font-normal">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {webhooksDemo.map((webhook) => (
              <WebhookRow key={webhook.id} webhook={webhook} />
            ))}
          </tbody>
        </table>
      </div>
    </SettingsCard>
  );
}
