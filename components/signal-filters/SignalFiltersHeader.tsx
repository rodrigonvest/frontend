"use client";
import { useId, useRef } from "react";
import Link from "next/link";
import { Icon } from "../Icons";
import { Badge } from "../UI";
import { SelectBox } from "../risk-management/RiskFields";
import { targetOptions } from "../../lib/signal-filters-demo";

const actionClass =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand-strong/70 bg-[#0a1b2b] px-4 text-[14px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function SignalFiltersHeader({
  target,
  onTarget,
  onSaveTemplate,
  onImport,
  onExport,
}: {
  target: string;
  onTarget: (value: string) => void;
  onSaveTemplate: () => void;
  onImport: (file: File) => void;
  onExport: () => void;
}) {
  const targetLabelId = useId();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Filtros Avançados de Sinais
        </span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Filtros Avançados de Sinais</h1>
            <Badge tone="green" className="border-success/60 bg-success/15 px-2.5 text-xs">
              Ativo
            </Badge>
          </div>
          <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">Personalize filtros para receber e executar apenas os melhores sinais.</p>
        </div>
        <div className="flex flex-wrap items-end gap-2.5">
          <div className="w-[190px]">
            <span id={targetLabelId} className="mb-1 block text-[12px] text-fg-muted">
              Aplicar em:
            </span>
            <SelectBox label="Aplicar em" value={target} options={targetOptions} onChange={onTarget} />
          </div>
          <button type="button" onClick={onSaveTemplate} className={actionClass}>
            <Icon name="save" size={15} />
            Salvar como Template
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className={actionClass}>
            <Icon name="external" size={15} />
            Importar
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            tabIndex={-1}
            aria-label="Importar configuração de filtros"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onImport(file);
              event.target.value = "";
            }}
          />
          <button type="button" onClick={onExport} className={actionClass}>
            <Icon name="download" size={15} />
            Exportar
          </button>
        </div>
      </header>
    </>
  );
}
