import { Icon } from "../Icons";
import { Button } from "../UI";
import { logsPeriod } from "../../lib/logs-demo";

export default function LogsHeader() {
  return (
    <header className="mb-[18px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">Logs do Sistema</h1>
        <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">
          Acompanhe em tempo real todas as atividades, eventos e operações do seu sistema
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3.5">
        <label className="relative block min-w-[190px] lg:w-[204px]">
          <span className="sr-only">Período</span>
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
            <Icon name="calendar" size={16} />
          </span>
          <select
            defaultValue={0}
            className="h-[43px] w-full cursor-pointer appearance-none rounded-lg border border-[#24435d] bg-[#0a1b2b] pl-10 pr-9 text-[13px] text-[#e3edf5] outline-none focus-visible:border-brand"
          >
            <option value={0}>{logsPeriod}</option>
          </select>
          <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
            <Icon name="chevronDown" size={14} stroke={2.2} />
          </span>
        </label>
        <Button variant="secondary" className="h-[43px] border-[#24435d] bg-[#0a1b2b] px-5 lg:w-[126px] lg:px-0">
          <Icon name="refresh" size={15} />
          Atualizar
        </Button>
        <Button variant="primary" className="h-[43px] px-5 lg:w-[160px] lg:px-0">
          <Icon name="download" size={15} />
          Exportar Logs
        </Button>
      </div>
    </header>
  );
}
