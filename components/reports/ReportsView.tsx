import Shell from "../Shell";
import ReportsHeader from "./ReportsHeader";
import ReportsKpiCards from "./ReportsKpiCards";
import ReportsEquityCard from "./ReportsEquityCard";
import ReportsMonthlyCard from "./ReportsMonthlyCard";
import { SymbolPerformanceCard, SystemPerformanceCard } from "./ReportsTables";
import ReportsStatsCard from "./ReportsStatsCard";
import ReportsCustomCard from "./ReportsCustomCard";

export default function ReportsView() {
  return (
    <Shell wide>
      <div className="lg:-mt-3">
        <ReportsHeader />
        <ReportsKpiCards />
        <div className="mt-4 grid gap-[15px] xl:grid-cols-2">
          <ReportsEquityCard />
          <ReportsMonthlyCard />
          <SymbolPerformanceCard />
          <SystemPerformanceCard />
          <ReportsStatsCard />
          <ReportsCustomCard />
        </div>
      </div>
    </Shell>
  );
}
