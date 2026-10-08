import { Icon } from "../Icons";
import { backtestConfig } from "../../lib/backtest-presentation";
import { ChevronDown, Panel, PlayGlyph, SelectBox } from "./Panel";

const labelClass = "block text-[13px] leading-4 text-fg-muted";
const fieldClass = "h-[34px] px-3 text-[14px]";

export default function ConfigCard() {
  return (
    <Panel title="Configurações do Backtest" className="2xl:h-[313px]" padding="px-3 pb-3 pt-2">
      <div className="mt-2.5 space-y-2">
        <div>
          <label htmlFor="bt-channel" className={labelClass}>
            Canal Telegram
          </label>
          <SelectBox id="bt-channel" options={backtestConfig.channels} className="mt-0.5 h-[34px]" selectClassName={fieldClass} />
        </div>

        <div>
          <label htmlFor="bt-period" className={labelClass}>
            Período
          </label>
          <div className="relative mt-0.5 h-[34px]">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-fg-muted">
              <Icon name="calendar" size={15} />
            </span>
            <input
              id="bt-period"
              type="text"
              readOnly
              defaultValue={backtestConfig.period}
              className="size-full rounded-md border border-line-strong/60 bg-[#071522] pl-[38px] pr-3 text-[14px] text-fg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bt-symbol" className={labelClass}>
            Símbolo
          </label>
          <SelectBox id="bt-symbol" options={backtestConfig.symbols} className="mt-0.5 h-[34px]" selectClassName={fieldClass} />
        </div>

        <div>
          <label htmlFor="bt-deposit" className={labelClass}>
            Depósito Inicial (USD)
          </label>
          <input
            id="bt-deposit"
            type="text"
            inputMode="decimal"
            defaultValue={backtestConfig.deposit}
            className="mt-0.5 h-[34px] w-full rounded-md border border-line-strong/60 bg-[#071522] px-3 text-[14px] text-fg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <button type="button" className="inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[12px] text-fg-muted transition-colors hover:text-fg">
          <Icon name="settings" size={14} />
          Parâmetros Avançados
          <span aria-hidden className="inline-flex -rotate-90">
            <ChevronDown size={11} />
          </span>
        </button>
        <button
          type="button"
          className="inline-flex h-[33px] w-[128px] shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-brand-strong text-[12.5px] min-[1800px]:w-[150px] min-[1800px]:text-[13px] font-semibold text-white transition-colors hover:bg-brand"
        >
          Executar Backtest
        </button>
      </div>
    </Panel>
  );
}

export function HeaderRunButton() {
  return (
    <button
      type="button"
      className="inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-md bg-brand-strong px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand"
    >
      <PlayGlyph size={16} />
      Executar Backtest
    </button>
  );
}
