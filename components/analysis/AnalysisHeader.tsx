import Link from "next/link";
import { Icon } from "../Icons";
import { Button } from "../UI";
import { performancePeriod } from "../../lib/performance-demo";

const selectClass =
  "h-10 w-full cursor-pointer appearance-none rounded-lg border border-[#24435d] bg-[#0a1b2b] pr-9 text-[13px] text-[#e3edf5] outline-none focus-visible:border-brand";

function FilterSelect({ label, icon, children }: { label: string; icon?: string; children: React.ReactNode }) {
  return (
    <label className="relative block min-w-[150px]">
      <span className="sr-only">{label}</span>
      {icon && (
        <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
          <Icon name={icon} size={16} />
        </span>
      )}
      <select defaultValue={0} className={`${selectClass} ${icon ? "pl-10 tabular" : "pl-3"}`}>
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
        <Icon name="chevronDown" size={14} stroke={2.2} />
      </span>
    </label>
  );
}

export default function AnalysisHeader() {
  return (
    <header className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-fg-muted">
          <Link href="/desempenho" className="transition-colors hover:text-fg">Desempenho</Link>
          <Icon name="chevron" size={12} stroke={2.2} />
          <span aria-current="page" className="text-fg">Análise de Desempenho</span>
        </nav>
        <h1 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">Análise de Desempenho</h1>
        <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-6 text-fg-muted">
          Insights avançados do seu trading com métricas e estatísticas detalhadas
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-[230px]">
          <FilterSelect label="Período" icon="calendar">
            <option value={0}>{performancePeriod}</option>
          </FilterSelect>
        </div>
        <FilterSelect label="Canal">
          <option value={0}>Todos os canais</option>
        </FilterSelect>
        <Button variant="primary" className="h-10 px-5">
          <Icon name="download" size={15} />
          Exportar Relatório
        </Button>
      </div>
    </header>
  );
}
