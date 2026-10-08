import Shell from "../../components/Shell";
import { Icon } from "../../components/Icons";
import { backtestConfig } from "../../lib/backtest-presentation";
import { HeaderRunButton } from "../../components/backtest/ConfigCard";
import ConfigCard from "../../components/backtest/ConfigCard";
import MonthlyCard from "../../components/backtest/MonthlyCard";
import { ChevronDown } from "../../components/backtest/Panel";
import RDistributionCard from "../../components/backtest/RDistributionCard";
import ResultDonutCard from "../../components/backtest/ResultDonutCard";
import ResultsCard from "../../components/backtest/ResultsCard";
import StatsCard from "../../components/backtest/StatsCard";
import TradesChartCard from "../../components/backtest/TradesChartCard";
import TradesListCard from "../../components/backtest/TradesListCard";

export default function BacktesterPage() {
  return (
    <Shell>
      <div className="mb-[19px] flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-fg sm:text-[26.5px] sm:leading-8">Backtest de Sinais Telegram</h1>
          <p className="mt-0.5 text-pretty text-[15px] leading-6 text-fg-muted">Teste e valide a performance dos sinais antes de operar em tempo real</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:mt-[13px]">
          <button
            type="button"
            aria-label={`Período: ${backtestConfig.period}`}
            className="inline-flex h-10 w-[278px] items-center gap-2.5 rounded-lg border border-[#24435d] bg-surface px-3.5 text-[14px] text-fg transition-colors hover:border-line-strong"
          >
            <span className="text-fg-muted">
              <Icon name="calendar" size={16} />
            </span>
            <span className="tabular flex-1 text-left">{backtestConfig.period}</span>
            <ChevronDown size={14} className="text-fg-muted" />
          </button>
          <HeaderRunButton />
        </div>
      </div>

      <div className="grid gap-x-3.5 gap-y-3 xl:grid-cols-[minmax(0,343fr)_minmax(0,672fr)] 2xl:grid-cols-[minmax(0,343fr)_minmax(0,672fr)_minmax(0,228fr)]">
        <ConfigCard />
        <ResultsCard />
        <div className="xl:col-span-2 2xl:col-span-1 2xl:flex 2xl:flex-col 2xl:justify-end">
          <ResultDonutCard />
        </div>
      </div>

      <div className="mt-3 grid gap-x-3.5 gap-y-3 lg:grid-cols-2 2xl:grid-cols-[minmax(0,510fr)_minmax(0,412fr)_minmax(0,324fr)] 2xl:items-start">
        <MonthlyCard />
        <RDistributionCard />
        <div className="lg:col-span-2 2xl:col-span-1">
          <StatsCard />
        </div>
      </div>

      <div className="mt-1.5 grid gap-x-3.5 gap-y-3 2xl:grid-cols-[minmax(0,817fr)_minmax(0,443fr)]">
        <TradesListCard />
        <TradesChartCard />
      </div>
    </Shell>
  );
}
