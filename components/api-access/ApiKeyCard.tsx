"use client";
import { useId } from "react";
import { Icon } from "../Icons";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import { Button } from "../UI";
import { ApiCard } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

export default function ApiKeyCard() {
  const { apiKeyDisplay, copy, requestNewKey } = useApiAccess();
  const fieldId = useId();

  return (
    <ApiCard title="Sua API Key" icon="key" accent="amber" description="Use esta chave para autenticar suas requisições na API do Copytrix.">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor={fieldId} className="sr-only">
          API Key (parcialmente oculta)
        </label>
        <input
          id={fieldId}
          readOnly
          spellCheck={false}
          value={apiKeyDisplay}
          className="h-11 min-w-[220px] flex-1 rounded-lg border border-line bg-canvas/70 px-3.5 font-mono text-[13px] text-fg-muted outline-none transition-colors focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        />
        <Button aria-label="Copiar API Key" onClick={() => copy(apiKeyDisplay, "API Key copiada para a área de transferência.")} className="h-11 px-4">
          <Icon name="copy" size={16} />
          Copiar
        </Button>
        <PrimaryButton onClick={(event) => requestNewKey(event.currentTarget)} className="h-11">
          <Icon name="refresh" size={16} />
          Gerar Nova Key
        </PrimaryButton>
      </div>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-fg-subtle">
        <span aria-hidden className="shrink-0">
          <Icon name="info" size={15} />
        </span>
        Mantenha sua API Key em segurança. Não compartilhe com terceiros.
      </p>
    </ApiCard>
  );
}
