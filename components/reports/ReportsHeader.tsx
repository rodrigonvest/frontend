import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { Button } from "../UI";
import { reportsPeriod } from "../../lib/reports-demo";

const selectClass =
  "h-[40px] w-full cursor-pointer appearance-none rounded-lg border border-[#24435d] bg-[#0a1b2b] pr-9 text-[13px] text-[#e3edf5] outline-none focus-visible:border-brand";

function FilterField({ label, icon, children }: { label: string; icon?: string; children: ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[13px] text-fg-muted">{label}</span>
      <span className="relative block">
        {icon && (
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
            <Icon name={icon} size={15} />
          </span>
        )}
        {children}
        <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
          <Icon name="chevronDown" size={14} stroke={2.2} />
        </span>
      </span>
    </label>
  );
}

export default function ReportsHeader() {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <span>Relatórios</span>
        <Icon name="chevron" size={12} />
        <span className="text-fg">Visão Geral</span>
      </nav>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Relatórios</h1>
          <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">
            Analise seus resultados, exporte dados e acompanhe a performance em detalhes.
          </p>
        </div>
        <Button variant="primary" className="h-[42px] px-5 sm:w-[170px]">
          <Icon name="chart" size={15} />
          Gerar Relatório
        </Button>
      </header>

      <section
        aria-label="Filtros do relatório"
        className="mt-3.5 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-[minmax(0,270fr)_minmax(0,283fr)_minmax(0,253fr)_minmax(0,250fr)_minmax(0,170fr)] xl:items-end"
      >
        <FilterField label="Período" icon="calendar">
          <select defaultValue={reportsPeriod} className={`${selectClass} pl-10`}>
            <option>{reportsPeriod}</option>
          </select>
        </FilterField>
        <FilterField label="Conta">
          <select defaultValue="Todas as contas" className={`${selectClass} pl-3.5`}>
            <option>Todas as contas</option>
          </select>
        </FilterField>
        <FilterField label="Sistema">
          <select defaultValue="Todos os sistemas" className={`${selectClass} pl-3.5`}>
            <option>Todos os sistemas</option>
          </select>
        </FilterField>
        <FilterField label="Símbolo">
          <select defaultValue="Todos os símbolos" className={`${selectClass} pl-3.5`}>
            <option>Todos os símbolos</option>
          </select>
        </FilterField>
        <Button
          variant="secondary"
          aria-haspopup="menu"
          className="h-[40px] justify-between border-brand-strong/70 bg-[#0a1b2b] px-4 text-brand hover:border-brand sm:col-span-2 xl:col-span-1"
        >
          <span className="inline-flex flex-1 items-center justify-center gap-2 text-fg">
            <Icon name="download" size={15} />
            Exportar
          </span>
          <span aria-hidden className="ml-1 border-l border-[#24435d] pl-3 text-fg-muted">
            <Icon name="chevronDown" size={14} stroke={2.2} />
          </span>
        </Button>
      </section>
    </>
  );
}
