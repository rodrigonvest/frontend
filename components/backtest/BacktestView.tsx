import { Icon } from "../Icons";
import PageHeader from "../PageHeader";
import { backtestPeriod } from "../../lib/backtest-demo";
import BacktestConfig from "./BacktestConfig";
import BacktestResults from "./BacktestResults";
import { PlayIcon } from "./BacktestFields";
import DetailedStats from "./DetailedStats";
import MonthlyPerformance from "./MonthlyPerformance";
import RDistribution from "./RDistribution";
import ResultDonut from "./ResultDonut";
import TradesChart from "./TradesChart";
import TradesList from "./TradesList";

export default function BacktestView() {
  return (
    <>
      <div className="-mt-3.5 -mb-2">
      <PageHeader
        title="Backtest de Sinais Telegram"
        description="Teste e valide a performance dos sinais antes de operar em tempo real"
        actions={
          <>
            <div className="flex h-[38px] min-w-[280px] items-center justify-between gap-3 rounded-lg border border-[#24435d] bg-[#0a1b2b] px-3.5 text-[13px] text-[#e3edf5] tabular">
              <span className="flex items-center gap-2.5">
                <span aria-hidden className="text-fg-muted"><Icon name="calendar" size={16} /></span>
                <span className="sr-only">Período:</span>
                {backtestPeriod}
              </span>
              <span aria-hidden className="text-fg-muted"><Icon name="chevronDown" size={14} stroke={2.2} /></span>
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-strong px-6 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              <PlayIcon size={15} />
              Executar Backtest
            </button>
          </>
        }
      />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[343fr_673fr_229fr]">
        <BacktestConfig />
        <div className="md:col-span-2 md:order-last xl:order-none xl:col-span-1">
          <BacktestResults />
        </div>
        <ResultDonut />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-[510fr_414fr_325fr]">
        <MonthlyPerformance />
        <RDistribution />
        <div className="lg:col-span-2 xl:col-span-1">
          <DetailedStats />
        </div>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[817fr_444fr]">
        <TradesList />
        <TradesChart />
      </div>
    </>
  );
}
