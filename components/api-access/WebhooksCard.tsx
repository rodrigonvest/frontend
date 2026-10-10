"use client";
import { Icon } from "../Icons";
import { Badge, Button } from "../UI";
import { WEBHOOK_EVENT_OPTIONS, type WebhookItem } from "../../lib/api-access-data";
import { ApiCard, IconButton, Switch } from "./ApiPrimitives";
import { WEBHOOKS_HEADING_ID, useApiAccess } from "./ApiAccessContext";

const GRID = "grid grid-cols-[minmax(70px,1fr)_minmax(84px,1fr)_92px_60px] items-center gap-x-3";

function eventTone(label: string) {
  return WEBHOOK_EVENT_OPTIONS.find((option) => option.label === label)?.tone ?? "blue";
}

function WebhookRow({ webhook }: { webhook: WebhookItem }) {
  const { toggleWebhook, editWebhook, deleteWebhook } = useApiAccess();

  return (
    <div role="row" className={`${GRID} border-t border-line px-3 py-3`}>
      <div role="cell" className="min-w-0 truncate text-[13px] text-fg" title={webhook.url}>
        {webhook.url}
      </div>
      <div role="cell" className="flex flex-wrap gap-1.5">
        {webhook.events.map((event) => (
          <Badge key={event} tone={eventTone(event)}>
            {event}
          </Badge>
        ))}
      </div>
      <div role="cell" className="flex items-center gap-2">
        <Switch checked={webhook.active} onChange={() => toggleWebhook(webhook.id)} label={`Webhook ${webhook.url}: ${webhook.active ? "ativo" : "inativo"}`} />
        <span className={webhook.active ? "text-[12px] text-success" : "text-[12px] text-fg-subtle"}>{webhook.active ? "Ativo" : "Inativo"}</span>
      </div>
      <div role="cell" className="flex items-center justify-end">
        <IconButton label={`Editar webhook ${webhook.url}`} icon="edit" onClick={(event) => editWebhook(webhook.id, event.currentTarget)} />
        <IconButton label={`Excluir webhook ${webhook.url}`} icon="trash" tone="danger" onClick={(event) => deleteWebhook(webhook.id, event.currentTarget)} />
      </div>
    </div>
  );
}

export default function WebhooksCard({ expanded = false }: { expanded?: boolean }) {
  const { webhooks, editWebhook } = useApiAccess();

  return (
    <ApiCard
      title="Webhooks"
      icon="webhook"
      accent="purple"
      headingId={WEBHOOKS_HEADING_ID}
      description="Receba notificações em tempo real de eventos importantes."
      action={
        expanded ? (
          <Button onClick={(event) => editWebhook(null, event.currentTarget)}>
            <Icon name="plus" size={16} />
            Novo webhook
          </Button>
        ) : undefined
      }
    >
      {webhooks.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line px-4 py-8 text-center">
          <p className="text-[13px] text-fg-muted">Nenhum webhook configurado.</p>
          <Button onClick={(event) => editWebhook(null, event.currentTarget)}>
            <Icon name="plus" size={16} />
            Adicionar webhook
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-line bg-canvas/40">
          <div role="table" aria-label="Webhooks configurados" className="min-w-[380px]">
            <div role="rowgroup">
              <div role="row" className={`${GRID} px-3 py-2.5 text-[12px] font-medium text-fg-muted`}>
                <div role="columnheader">URL de Destino</div>
                <div role="columnheader">Eventos</div>
                <div role="columnheader">Status</div>
                <div role="columnheader" className="text-right">
                  Ações
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {webhooks.map((webhook) => (
                <WebhookRow key={webhook.id} webhook={webhook} />
              ))}
            </div>
          </div>
        </div>
      )}
    </ApiCard>
  );
}
