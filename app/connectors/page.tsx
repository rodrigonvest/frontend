import Shell from "../../components/Shell";
import Topbar from "../../components/Topbar";
import { Card } from "../../components/UI";

export default function Page() {
  return <Shell>
    <Topbar eyebrow="COPYTRIX" title="Connectors" description="Connect COPYTRIX to supported execution and market-data destinations." />
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-6"><h2 className="text-sm font-semibold">MetaTrader 5</h2><p className="mt-2 text-xs leading-5 text-neutral-600">MT5 terminal connection, server selection and account validation.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">TradeLocker</h2><p className="mt-2 text-xs leading-5 text-neutral-600">TradeLocker receiver connection and account status.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">DXTrade</h2><p className="mt-2 text-xs leading-5 text-neutral-600">DXTrade receiver integration.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Tradovate</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Futures account connection and verification.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">MatchTrader</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Broker discovery and MatchTrader account connection.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card><Card className="p-6"><h2 className="text-sm font-semibold">Telegram</h2><p className="mt-2 text-xs leading-5 text-neutral-600">Signal-source connector for Telegram rooms.</p><div className="mt-5 text-xs text-neutral-500">Foundation ready · Integration in a later Stage</div></Card>
    </div>
  </Shell>;
}
