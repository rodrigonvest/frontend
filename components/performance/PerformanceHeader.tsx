import PageHeader from "../PageHeader";
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

export default function PerformanceHeader() {
  return (
    <PageHeader
      title="Desempenho"
      description="Analise a performance do seu trading com estatísticas detalhadas"
      actions={
        <>
          <div className="min-w-[230px]">
            <FilterSelect label="Período" icon="calendar">
              <option value={0}>{performancePeriod}</option>
            </FilterSelect>
          </div>
          <FilterSelect label="Canal">
            <option value={0}>Todos os canais</option>
          </FilterSelect>
          <FilterSelect label="Conta">
            <option value={0}>Todas as contas</option>
          </FilterSelect>
          <Button variant="primary" className="h-10 px-5">
            <Icon name="download" size={15} />
            Exportar
          </Button>
        </>
      }
    />
  );
}
