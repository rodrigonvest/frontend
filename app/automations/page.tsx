import Link from "next/link";
import Shell from "../../components/Shell";
import Topbar from "../../components/Topbar";
import { Badge, Card } from "../../components/UI";

const automations = [
  { name: "KIM Gold → Funded MT5", source: "Telegram", receivers: 2, risk: "1.00%", status: "Active", updated: "2 min ago" },
  { name: "Gold Scalper — Demo", source: "Telegram", receivers: 1, risk: "0.50%", status: "Paused", updated: "Yesterday" },
];
export default function AutomationsPage() { return <Shell><Topbar eyebrow="Workspace" title="Automations" description="Build source-to-account workflows with independent risk, symbol mapping and execution policies." /><div className="mb-5 flex justify-end"><button className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-200">+ New automation</button></div><Card className="overflow-hidden"><div className="grid grid-cols-[1.6fr_1fr_100px_100px_100px_100px] gap-4 border-b border-white/10 px-5 py-3 text-[10px] uppercase tracking-wider text-neutral-600"><span>Automation</span><span>Source</span><span>Receivers</span><span>Risk</span><span>Status</span><span>Updated</span></div>{automations.map(a=><div key={a.name} className="grid grid-cols-[1.6fr_1fr_100px_100px_100px_100px] items-center gap-4 border-b border-white/5 px-5 py-5 last:border-0"><div><div className="text-sm text-neutral-200">{a.name}</div><div className="mt-1 text-xs text-neutral-600">Independent receiver execution</div></div><span className="text-sm text-neutral-400">{a.source}</span><span className="text-sm text-neutral-400">{a.receivers}</span><span className="text-sm text-neutral-300">{a.risk}</span><Badge tone={a.status === "Active" ? "green" : "amber"}>{a.status}</Badge><span className="text-xs text-neutral-600">{a.updated}</span></div>)}</Card><p className="mt-4 text-xs text-neutral-700">Automation creation and persistence will be connected to the API in the next SaaS blocks.</p></Shell>; }
