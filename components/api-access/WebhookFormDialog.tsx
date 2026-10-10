"use client";
import { useId, useState } from "react";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import { Button, cx } from "../UI";
import { WEBHOOK_EVENT_OPTIONS, type WebhookItem } from "../../lib/api-access-data";
import Dialog from "./Dialog";

interface Props {
  open: boolean;
  webhook: WebhookItem | null;
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
  onSubmit: (values: { url: string; events: string[] }) => void;
}

function WebhookForm({ webhook, onClose, onSubmit }: Pick<Props, "webhook" | "onClose" | "onSubmit">) {
  const baseId = useId();
  const urlId = `${baseId}-url`;
  const urlErrorId = `${baseId}-url-error`;
  const eventsErrorId = `${baseId}-events-error`;
  const [url, setUrl] = useState(webhook?.url ?? "");
  const [events, setEvents] = useState<string[]>(webhook?.events ?? ["Sinais"]);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const toggleEvent = (label: string) => {
    setEventsError(null);
    setEvents((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = url.trim();
    let validUrl = false;
    try {
      validUrl = new URL(trimmed).protocol === "https:";
    } catch {
      validUrl = false;
    }
    const nextUrlError = validUrl ? null : "Informe uma URL válida iniciando com https://";
    const nextEventsError = events.length ? null : "Selecione ao menos um evento.";
    setUrlError(nextUrlError);
    setEventsError(nextEventsError);
    if (nextUrlError || nextEventsError) return;
    onSubmit({ url: trimmed, events: WEBHOOK_EVENT_OPTIONS.map((option) => option.label).filter((label) => events.includes(label)) });
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor={urlId} className="mb-1.5 block text-[13px] font-medium text-fg">
          URL de destino
        </label>
        <input
          id={urlId}
          data-autofocus
          type="url"
          inputMode="url"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
            setUrlError(null);
          }}
          placeholder="https://meusistema.com/webhook"
          aria-invalid={urlError ? true : undefined}
          aria-describedby={urlError ? urlErrorId : undefined}
          className={cx(
            "h-11 w-full rounded-lg border bg-canvas/70 px-3.5 text-[13.5px] text-fg outline-none placeholder:text-fg-subtle focus-visible:outline-2 focus-visible:outline-brand",
            urlError ? "border-danger" : "border-line focus-visible:border-brand",
          )}
        />
        {urlError && (
          <p id={urlErrorId} role="alert" className="mt-1.5 text-[12.5px] text-danger">
            {urlError}
          </p>
        )}
      </div>

      <fieldset aria-describedby={eventsError ? eventsErrorId : undefined} className="min-w-0 border-0 p-0">
        <legend className="mb-1.5 text-[13px] font-medium text-fg">Eventos</legend>
        <div className="flex flex-wrap gap-2">
          {WEBHOOK_EVENT_OPTIONS.map((option) => {
            const checked = events.includes(option.label);
            return (
              <label
                key={option.label}
                className={cx(
                  "flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-[13px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                  checked ? "border-brand-strong bg-brand/15 text-fg" : "border-line text-fg-muted hover:border-line-strong",
                )}
              >
                <input type="checkbox" checked={checked} onChange={() => toggleEvent(option.label)} className="size-4 accent-[#087ff0]" />
                {option.label}
              </label>
            );
          })}
        </div>
        {eventsError && (
          <p id={eventsErrorId} role="alert" className="mt-1.5 text-[12.5px] text-danger">
            {eventsError}
          </p>
        )}
      </fieldset>

      <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Button onClick={onClose} className="h-10 px-5">
          Cancelar
        </Button>
        <PrimaryButton type="submit">{webhook ? "Salvar alterações" : "Adicionar webhook"}</PrimaryButton>
      </div>
    </form>
  );
}

export default function WebhookFormDialog({ open, webhook, returnFocusTo, onClose, onSubmit }: Props) {
  return (
    <Dialog
      open={open}
      title={webhook ? "Editar webhook" : "Novo webhook"}
      description="Informe a URL que receberá as notificações e escolha os eventos. Nenhuma requisição real é enviada (demonstrativo)."
      icon="webhook"
      accent="purple"
      returnFocusTo={returnFocusTo}
      onClose={onClose}
    >
      <WebhookForm webhook={webhook} onClose={onClose} onSubmit={onSubmit} />
    </Dialog>
  );
}
