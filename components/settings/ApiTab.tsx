import ApiEventsCard from "./ApiEventsCard";
import ApiExampleCard from "./ApiExampleCard";
import ApiPermissionsCard from "./ApiPermissionsCard";
import ApiPlatformCard from "./ApiPlatformCard";
import WebhooksCard from "./WebhooksCard";

export default function ApiTab() {
  return (
    <div className="grid grid-cols-1 items-start gap-x-4 gap-y-3.5 lg:grid-cols-[minmax(0,1.57fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-3.5">
        <ApiPlatformCard />
        <WebhooksCard />
        <ApiExampleCard />
      </div>
      <div className="flex min-w-0 flex-col gap-3.5">
        <ApiPermissionsCard />
        <ApiEventsCard />
      </div>
    </div>
  );
}
