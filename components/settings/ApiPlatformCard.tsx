"use client";
import { useId, useState } from "react";
import { apiKeyDemo, apiSecretDemo, maskKey } from "../../lib/api-demo";
import SettingsIcon from "./SettingsIcons";
import { FieldBlock, SettingsCard } from "./SettingsFields";
import { CopyButton, outlineButtonClass } from "./SecurityFields";
import { cx } from "../UI";

function ApiKeyField({ label, value }: { label: string; value: string }) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <FieldBlock label={label} htmlFor={id}>
      <div className="flex items-center gap-3">
        <div className="flex h-[42px] min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-line-strong/50 bg-canvas/60 focus-within:border-brand">
          <input
            id={id}
            readOnly
            value={visible ? value : maskKey(value)}
            className="tabular h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] text-fg outline-none"
          />
          <div className="flex h-full border-l border-line-strong/50">
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-pressed={visible}
              aria-label={visible ? `Ocultar ${label}` : `Mostrar ${label}`}
              className="flex h-full w-11 items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
            >
              <SettingsIcon name={visible ? "eyeOff" : "eye"} size={18} />
            </button>
          </div>
          <div className="flex h-full border-l border-line-strong/50">
            <CopyButton value={value} label={`Copiar ${label}`} className="!h-full !w-11 !rounded-none !border-0 !bg-transparent" />
          </div>
        </div>
        <button type="button" className={cx(outlineButtonClass, "h-[42px] !px-4")}>
          Gerar Nova Chave
        </button>
      </div>
    </FieldBlock>
  );
}

export default function ApiPlatformCard() {
  return (
    <SettingsCard
      icon="wrench"
      title="API da Plataforma"
      description="Utilize a API do Copytrix para integrar com suas próprias ferramentas, dashboards ou sistemas externos."
      action={
        <button type="button" className={cx(outlineButtonClass, "h-9 !px-3.5 !text-[12.5px]")}>
          Documentação da API
          <SettingsIcon name="external" size={14} stroke={2} />
        </button>
      }
    >
      <div className="flex flex-col gap-3.5">
        <ApiKeyField label="Chave de API (API Key)" value={apiKeyDemo} />
        <ApiKeyField label="Chave Secreta (API Secret)" value={apiSecretDemo} />

        <div role="note" className="flex items-center gap-3 rounded-lg border border-warning/55 bg-warning/[.08] px-3.5 py-2.5">
          <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-warning text-warning">
            <SettingsIcon name="warning" size={16} stroke={2.6} />
          </span>
          <div>
            <p className="text-[14.5px] font-semibold leading-5 text-warning">Importante</p>
            <p className="text-[12.5px] leading-[18px] text-fg">Guarde sua chave secreta em um local seguro. Ela não será exibida novamente.</p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
