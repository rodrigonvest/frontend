import Shell from "../../components/Shell";
import Topbar from "../../components/Topbar";
import { Card } from "../../components/UI";

export default function Page() {
  return <Shell>
    <Topbar eyebrow="COPYTRIX" title="Help Center" description="Tutorials, FAQ, troubleshooting and support." />
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-6"><h2 className="text-sm font-semibold">Getting started</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Connect an account, create an automation and run your first signal.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Troubleshooting</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Execution, spread, connection and reconciliation diagnostics.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">FAQ</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Common questions about COPYTRIX automations and accounts.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Support</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Open and track support requests.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card>
    </div>
  </Shell>;
}
