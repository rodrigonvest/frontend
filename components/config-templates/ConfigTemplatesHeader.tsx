"use client";
import Link from "next/link";
import { Icon } from "../Icons";
import { Badge } from "../UI";
import { SelectBox } from "../risk-management/RiskFields";
import { typeOptions } from "../../lib/config-templates-demo";

export default function ConfigTemplatesHeader({
  query,
  onQuery,
  type,
  onType,
  onCreate,
}: {
  query: string;
  onQuery: (value: string) => void;
  type: string;
  onType: (value: string) => void;
  onCreate: () => void;
}) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Templates de Configuração
        </span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Templates de Configuração</h1>
            <Badge tone="green" className="border-success/60 bg-success/15 px-2.5 text-xs">
              Ativo
            </Badge>
          </div>
          <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">
            Use templates prontos ou crie os seus próprios. Configure, teste e aplique em uma ou várias contas.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-[260px]">
            <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
              <Icon name="search" size={16} />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder="Buscar templates..."
              aria-label="Buscar templates"
              className="h-10 w-full rounded-lg border border-line-strong bg-[#0a1b2b] pl-9 pr-3 text-[14px] text-fg placeholder:text-fg-muted focus-visible:border-brand focus-visible:outline-none"
            />
          </div>
          <div className="w-[170px]">
            <SelectBox label="Filtrar por tipo" value={type} options={typeOptions} onChange={onType} />
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-strong px-4 text-[14px] font-semibold text-white shadow-[0_0_18px_-4px_rgba(8,127,240,.8)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[.98]"
          >
            <Icon name="plus" size={16} />
            Criar Template
          </button>
        </div>
      </header>
    </>
  );
}
