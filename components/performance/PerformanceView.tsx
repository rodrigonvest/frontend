import Shell from "../Shell";
import ResultDistributionCard from "./ResultDistributionCard";
import PerformanceHeader from "./PerformanceHeader";
import KpiCards from "./KpiCards";
import PerformanceTabs from "./PerformanceTabs";
import EquityCurveCard from "./EquityCurveCard";
import DailyPnlCard from "./DailyPnlCard";
import DonutCard from "./DonutCard";
import MonthlyTable from "./MonthlyTable";
import TradeRankTable from "./TradeRankTable";
import AdditionalStatsCard from "./AdditionalStatsCard";
import HourlyPerformanceCard from "./HourlyPerformanceCard";
import { bestTrades, channelOperations, resultTypes, worstTrades } from "../../lib/performance-demo";

export default function PerformanceView() {
  return (
    <Shell>
      <PerformanceHeader />
      <KpiCards />
      <PerformanceTabs />
      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-2">
        <EquityCurveCard />
        <DailyPnlCard />
      </div>
      <div className="mt-2.5 grid gap-2.5 lg:grid-cols-2 xl:grid-cols-[1.05fr_1fr_1fr]">
        <ResultDistributionCard />
        <DonutCard title="Tipos de Resultado" segments={resultTypes} total={167} label="Operações" />
        <DonutCard title="Operações por Canal" segments={channelOperations} total={167} label="Operações" />
      </div>
      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <MonthlyTable />
        <TradeRankTable title="Melhores Operações" rows={bestTrades} lastColumn="Lucro (USD)" tone="success" />
        <TradeRankTable title="Maiores Perdas" rows={worstTrades} lastColumn="Prejuízo (USD)" tone="danger" />
      </div>
      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1fr_1fr]">
        <AdditionalStatsCard />
        <HourlyPerformanceCard />
      </div>
    </Shell>
  );
}
