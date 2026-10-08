import Shell from "../Shell";
import KpiCards from "../performance/KpiCards";
import DonutCard from "../performance/DonutCard";
import MonthlyTable from "../performance/MonthlyTable";
import AnalysisHeader from "./AnalysisHeader";
import AnalysisTabs from "./AnalysisTabs";
import EquityEvolutionCard from "./EquityEvolutionCard";
import RResultDistributionCard from "./RResultDistributionCard";
import DrawdownCard from "./DrawdownCard";
import HourlyResultCard from "./HourlyResultCard";
import AdvancedStatsCard from "./AdvancedStatsCard";
import RiskReturnCard from "./RiskReturnCard";
import { channelOperations, resultTypes } from "../../lib/performance-demo";

export default function AnalysisView() {
  return (
    <Shell>
      <AnalysisHeader />
      <KpiCards />
      <AnalysisTabs />
      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[minmax(0,1.24fr)_minmax(0,1fr)]">
        <EquityEvolutionCard />
        <RResultDistributionCard />
      </div>
      <div className="mt-2.5 grid gap-2.5 lg:grid-cols-2 [@media(min-width:1700px)]:grid-cols-[minmax(0,1.6fr)_minmax(0,0.85fr)_minmax(0,1fr)]">
        <div className="lg:col-span-2 [@media(min-width:1700px)]:col-span-1">
          <MonthlyTable title="Desempenho Mensal" />
        </div>
        <DonutCard title="Tipos de Resultado" segments={resultTypes} total={167} label="Operações" />
        <DonutCard title="Operações por Canal" segments={channelOperations} total={167} label="Operações" />
      </div>
      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <DrawdownCard />
        <HourlyResultCard />
      </div>
      <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <AdvancedStatsCard />
        <RiskReturnCard />
      </div>
    </Shell>
  );
}
