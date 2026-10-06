import Shell from "../../components/Shell";
import Topbar from "../../components/Topbar";
import { Card } from "../../components/UI";

export default function Page() {
  return <Shell>
    <Topbar eyebrow="COPYTRIX" title="API Access" description="Developer integrations, webhooks and automation endpoints." />
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-6"><h2 className="text-sm font-semibold">Webhooks</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Create and manage outbound COPYTRIX webhooks.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">API credentials</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Secure developer credentials will be managed here.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Events</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Subscribe to signal, execution and lifecycle events.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Documentation</h2><p className="mt-2 text-xs leading-5 text-neutral-600">API reference and integration examples.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card>
    </div>
  </Shell>;
}
