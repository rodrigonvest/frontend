import Shell from "../../components/Shell";
import Topbar from "../../components/Topbar";
import { Card } from "../../components/UI";

export default function Page() {
  return <Shell>
    <Topbar eyebrow="COPYTRIX" title="Billing" description="Manage your COPYTRIX plan, subscription and payment methods." />
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-6"><h2 className="text-sm font-semibold">Current plan</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Your plan and usage limits will appear here.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Subscription</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Upgrade, downgrade, cancel or reactivate your subscription.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Payment methods</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Manage your saved payment methods securely.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Invoices & receipts</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Billing history and receipts.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card>
    </div>
  </Shell>;
}
