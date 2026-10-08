import { Icon } from "../Icons";
import { SelectField } from "../backtest/BacktestFields";

const fieldClass = "h-9 rounded-lg border border-[#24435d] bg-[#0a1b2b]";

export default function LogsFilters() {
  return (
    <section
      aria-label="Filtros de logs"
      className="mt-[15px] flex flex-wrap items-center gap-3.5 xl:grid xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)] xl:gap-[15px]"
    >
      <div className="contents xl:grid xl:grid-cols-[272fr_143fr_207fr_191fr] xl:gap-3.5">
      <label className={`relative block min-w-[220px] flex-1 xl:min-w-0 ${fieldClass}`}>
        <span className="sr-only">Buscar nos logs</span>
        <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
          <Icon name="search" size={16} />
        </span>
        <input
          type="search"
          placeholder="Buscar nos logs..."
          className="size-full rounded-lg bg-transparent pl-10 pr-3 text-[13px] text-[#e3edf5] outline-none placeholder:text-fg-muted focus-visible:ring-1 focus-visible:ring-brand"
        />
      </label>
      <SelectField className={`min-w-[140px] xl:min-w-0 ${fieldClass}`} selectClassName="rounded-lg border-0 bg-transparent text-[13px]" aria-label="Nível">
        <option>Todos os níveis</option>
        <option>Informações</option>
        <option>Avisos</option>
        <option>Erros</option>
        <option>Sistema</option>
      </SelectField>
      <SelectField className={`min-w-[150px] xl:min-w-0 ${fieldClass}`} selectClassName="rounded-lg border-0 bg-transparent text-[13px]" aria-label="Sistema">
        <option>Todos os sistemas</option>
      </SelectField>
      <SelectField className={`min-w-[150px] xl:min-w-0 ${fieldClass}`} selectClassName="rounded-lg border-0 bg-transparent text-[13px]" aria-label="Conta">
        <option>Todas as contas</option>
      </SelectField>
      </div>
      <div className={`flex min-w-[300px] flex-1 items-center xl:min-w-0 gap-3 px-3 text-[13px] text-fg-muted ${fieldClass}`}>
        <span aria-hidden><Icon name="calendar" size={16} /></span>
        <span className="flex-1">Data inicial</span>
        <span aria-hidden><Icon name="arrowRight" size={14} /></span>
        <span className="flex-1 text-left">Data final</span>
        <span aria-hidden><Icon name="calendar" size={16} /></span>
      </div>
    </section>
  );
}
