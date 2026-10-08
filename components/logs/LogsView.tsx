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
      <LogsHeader />
      <LogsKpiCards />
      <LogsFilters />
      <div className="mt-2.5 grid items-start gap-2.5 xl:grid-cols-[minmax(0,1.68fr)_minmax(0,1fr)]">
        <LogsTable />
        <div className="grid gap-2.5">
          <LogDetailsCard />
          <LogsByLevelCard />
          <LogsActivityCard />
        </div>
      </div>
    </Shell>
  );
}
