"use client";

import { useMemo, useState } from "react";
import type { SystemRoute, SystemRouteStatus } from "../../lib/systems-catalog";
import { getRouteDetails } from "../../lib/system-route-details";
import { getSystemDisplayName } from "../../lib/system-details-demo";
import SystemAccountsCard from "./SystemAccountsCard";
import SystemAssetsCard from "./SystemAssetsCard";
import SystemAutomationCard from "./SystemAutomationCard";
import SystemDistributionCard from "./SystemDistributionCard";
import SystemEquityCard from "./SystemEquityCard";
import SystemHeader from "./SystemHeader";
import SystemKpiCards from "./SystemKpiCards";
import SystemMonthlyCard from "./SystemMonthlyCard";
import SystemProfileCard from "./SystemProfileCard";
import SystemLogsCard from "./SystemLogsCard";
import SystemQuickActions from "./SystemQuickActions";
import SystemRecentTradesCard from "./SystemRecentTradesCard";
import SystemRiskCard from "./SystemRiskCard";
import SystemRouteOverview from "./SystemRouteOverview";
import SystemRulesCard from "./SystemRulesCard";
import SystemSpecificsCard from "./SystemSpecificsCard";
import SystemStatsCard from "./SystemStatsCard";

export default function SystemDetailsView({ route }: { route: SystemRoute }) {
  const [status, setStatus] = useState<SystemRouteStatus>(route.status);
  const name = getSystemDisplayName(route);
  const details = useMemo(() => getRouteDetails(route), [route]);

  const togglePause = () => setStatus((s) => (s === "active" ? "paused" : s === "paused" ? "active" : s));
  const toggleActive = () => setStatus((s) => (s === "inactive" ? "active" : "inactive"));

  return (
    <div className="flex flex-col gap-3">
      <div>
        <SystemHeader
          routeId={route.routeId}
          name={name}
          description={details.headline}
          status={status}
          onTogglePause={togglePause}
          onToggleActive={toggleActive}
        />
      </div>

      <SystemRouteOverview details={details} status={status} onTogglePause={togglePause} />

      <div className="grid gap-3 xl:grid-cols-[minmax(0,332fr)_minmax(0,935fr)]">
        <SystemProfileCard route={route} name={name} details={details} />
        <div className="flex min-w-0 flex-col gap-3">
          <SystemKpiCards />
          <div className="grid flex-1 gap-3 lg:grid-cols-[minmax(0,590fr)_minmax(0,333fr)]">
            <SystemEquityCard />
            <SystemDistributionCard />
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,474fr)_minmax(0,428fr)_minmax(0,353fr)]">
        <SystemStatsCard className="md:col-span-2 xl:col-span-1" />
        <SystemMonthlyCard />
        <SystemAssetsCard />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,454fr)_minmax(0,323fr)_minmax(0,478fr)]">
        <SystemAutomationCard routeId={route.routeId} details={details} status={status} onTogglePause={togglePause} />
        <SystemRulesCard details={details} />
        <div className="flex min-w-0 flex-col gap-3 md:col-span-2 xl:col-span-1">
          <SystemAccountsCard details={details} />
          <SystemQuickActions routeId={route.routeId} details={details} />
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <SystemSpecificsCard details={details} />
        <SystemRiskCard details={details} />
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <SystemRecentTradesCard details={details} />
        <SystemLogsCard details={details} />
      </div>
    </div>
  );
}
