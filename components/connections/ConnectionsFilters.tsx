import { Icon } from "../Icons";
import { Button } from "../UI";
import { SelectField } from "../backtest/BacktestFields";
import { connectionsPeriod } from "../../lib/connections-demo";

const labelClass = "mb-1.5 block text-[13px] font-medium text-fg";

export default function ConnectionsFilters() {
  return (
    <form
      aria-label="Filtros do histórico de conexões"
      onSubmit={(event) => event.preventDefault()}
      className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1fr_auto] xl:items-end"
    >
      <div>
        <label htmlFor="conn-period" className={labelClass}>Período</label>
        <div className="relative h-[40px]">
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-fg-muted">
            <Icon name="calendar" size={15} />
          </span>
          <SelectField id="conn-period" defaultValue="0" className="h-full" selectClassName="pl-10 text-[13px]">
            <option value="0">{connectionsPeriod}</option>
          </SelectField>
        </div>
      </div>
      <div>
        <label htmlFor="conn-event" className={labelClass}>Tipo de Evento</label>
        <SelectField id="conn-event" defaultValue="all" className="h-[40px]">
          <option value="all">Todos os eventos</option>
          <option value="login">Login</option>
          <option value="failed">Falha de Login</option>
          <option value="logout">Logout</option>
          <option value="2fa">2FA</option>
        </SelectField>
      </div>
      <div>
        <label htmlFor="conn-device" className={labelClass}>Dispositivo</label>
        <SelectField id="conn-device" defaultValue="all" className="h-[40px]">
          <option value="all">Todos os dispositivos</option>
          <option value="windows">Windows</option>
          <option value="android">Android</option>
        </SelectField>
      </div>
      <div>
        <label htmlFor="conn-ip" className={labelClass}>IP</label>
        <input
          id="conn-ip"
          type="text"
          inputMode="decimal"
          placeholder="Digite um IP..."
          className="h-[40px] w-full rounded-md border border-[#24435d] bg-[#091a2a] px-3 text-[13px] text-[#e3edf5] outline-none placeholder:text-fg-subtle focus-visible:border-brand"
        />
      </div>
      <Button type="button" variant="primary" className="h-[40px] px-6 sm:col-span-2 xl:col-span-1">
        <Icon name="download" size={15} />
        Exportar
      </Button>
    </form>
  );
}
