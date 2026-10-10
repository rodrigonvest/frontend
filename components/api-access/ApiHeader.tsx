"use client";
import { Icon } from "../Icons";
import { useApiAccess } from "./ApiAccessContext";

export default function ApiHeader() {
  const { openDocs } = useApiAccess();

  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <span>Minha Conta</span>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Acesso à API
        </span>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Acesso à API</h1>
          <p className="mt-1 max-w-2xl text-pretty text-[14px] leading-6 text-fg-muted">
            Integre o Copytrix com suas próprias aplicações, robôs e sistemas externos.
          </p>
        </div>
        <button
          type="button"
          onClick={openDocs}
          className="flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-line-strong bg-surface/60 px-5 text-[13.5px] font-medium text-fg transition-colors hover:border-brand hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Icon name="external" size={16} />
          Ver Documentação
        </button>
      </header>
    </>
  );
}
