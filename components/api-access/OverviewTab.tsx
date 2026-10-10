import ApiKeyCard from "./ApiKeyCard";
import ApiStatusCard from "./ApiStatusCard";
import DocsCard from "./DocsCard";
import EndpointsCard from "./EndpointsCard";
import IntroCards from "./IntroCards";
import McpCard from "./McpCard";
import PermissionsCard from "./PermissionsCard";
import WebhooksCard from "./WebhooksCard";

export default function OverviewTab() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <IntroCards />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.31fr)_minmax(0,1fr)]">
        <ApiKeyCard />
        <ApiStatusCard />
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.31fr)_minmax(0,1fr)]">
        <PermissionsCard />
        <EndpointsCard />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1.9fr)_minmax(0,1.1fr)]">
        <WebhooksCard />
        <McpCard />
        <DocsCard className="lg:col-span-2 2xl:col-span-1" />
      </div>
    </div>
  );
}
