import { Icon } from "../Icons";
import { backtestPeriod } from "../../lib/backtest-demo";
import { Panel, SelectField } from "./BacktestFields";

const label = "mb-1 block text-[13px] text-fg-muted";
const control = "flex h-9 w-full items-center rounded-md border border-[#24435d] bg-[#091a2a] px-3 text-[13px] text-[#e3edf5]";

export default function BacktestConfig() {
  return (
    <Panel title="Configurações do Backtest" className="flex flex-col">
      <div className="mt-2.5 flex flex-1 flex-col gap-2.5">
        <div>
          <label htmlFor="bt-channel" className={label}>Canal Telegram</label>
          <SelectField id="bt-channel" defaultValue="KIM GOLD SECRET" className="h-9">
            <option>KIM GOLD SECRET</option>
            <option>FRAN SIGNALS</option>
            <option>LEZZIER FX</option>
          </SelectField>
        </div>
        <div>
          <span className={label}>Período</span>
          <div className={`${control} gap-2.5 tabular`}>
            <span className="text-fg-muted"><Icon name="calendar" size={15} /></span>
            {backtestPeriod}
          </div>
        </div>
        <div>
          <label htmlFor="bt-symbol" className={label}>Símbolo</label>
          <SelectField id="bt-symbol" defaultValue="XAUUSD" className="h-9">
            <option>XAUUSD</option>
            <option>XAGUSD</option>
            <option>US100</option>
          </SelectField>
        </div>
        <div>
          <label htmlFor="bt-deposit" className={label}>Depósito Inicial (USD)</label>
          <input id="bt-deposit" defaultValue="1,000" inputMode="decimal" className={`${control} tabular outline-none focus-visible:border-brand`} />
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <button type="button" className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg">
            <Icon name="settings" size={14} />
            Parâmetros Avançados
            <Icon name="arrowRight" size={12} />
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-brand-strong px-5 text-[13px] font-semibold text-white transition-colors hover:bg-brand"
          >
            Executar Backtest
          </button>
        </div>
      </div>
    </Panel>
  );
}
