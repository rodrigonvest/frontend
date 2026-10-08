import Shell from "../Shell";
import LogsHeader from "./LogsHeader";
import LogsKpiCards from "./LogsKpiCards";
import LogsFilters from "./LogsFilters";
import LogsTable from "./LogsTable";
import LogDetailsCard from "./LogDetailsCard";
import LogsByLevelCard from "./LogsByLevelCard";
import LogsActivityCard from "./LogsActivityCard";

export default function LogsView() {
  return (
    <Shell>
      <div className="lg:-mt-3">
        <LogsHeader />
        <LogsKpiCards />
        <LogsFilters />
        <div className="mt-4 grid items-stretch gap-[15px] xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
          <LogsTable />
          <div className="grid gap-2 xl:grid-rows-[356px_164px_minmax(0,1fr)]">
            <LogDetailsCard />
            <LogsByLevelCard />
            <LogsActivityCard />
          </div>
        </div>
      </div>
    </Shell>
  );
}
