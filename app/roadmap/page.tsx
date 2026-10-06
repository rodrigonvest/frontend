import Shell from "../../components/Shell";
import Topbar from "../../components/Topbar";
import { Card } from "../../components/UI";

export default function Page() {
  return <Shell>
    <Topbar eyebrow="COPYTRIX" title="Roadmap" description="See what is coming next for the COPYTRIX platform." />
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-6"><h2 className="text-sm font-semibold">Now</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Dashboard, automations, multi-receiver execution and lifecycle controls.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Next</h2><p className="mt-2 text-xs leading-5 text-neutral-600">SaaS authentication, PostgreSQL persistence and production analytics.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Planned</h2><p className="mt-2 text-xs leading-5 text-neutral-600">More source adapters, destination adapters and advanced automation tools.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card>
    </div>
  </Shell>;
}
