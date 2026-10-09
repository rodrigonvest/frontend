import { Icon } from "../Icons";
import { Card } from "../UI";
import { accountExposure, accountSummary, symbolExposure, type MultiAccount } from "../../lib/multi-account-demo";
import { PanelTitle } from "./MaPrimitives";

function Donut() {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const gap = 1.5;
  let offset = 0;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[150px] shrink-0">
      <svg role="img" aria-label="Exposição por símbolo" viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#122d46" strokeWidth="14" />
        {symbolExposure.map((item) => {
          const length = (item.pct / 100) * circumference;
          const circle = (
            <circle
              key={item.symbol}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="14"
              strokeDasharray={`${Math.max(0, length - gap)} ${circumference}`}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="tabular text-[22px] font-semibold leading-none text-fg">{accountSummary.riskInUse.toFixed(1)}%</span>
        <span className="mt-1 text-[10px] text-fg-muted">Exposição Total</span>
      </div>
    </div>
  );
}

export default function SymbolExposure({ accounts }: { accounts: MultiAccount[] }) {
  const rows = accountExposure
    .map((item) => ({ ...item, account: accounts.find((account) => account.id === item.accountId) }))
    .filter((row): row is typeof row & { account: MultiAccount } => Boolean(row.account));
  const max = Math.max(...rows.map((row) => row.pct), 1);

  return (
    <Card className="p-4">
      <PanelTitle icon={<Icon name="chart" size={20} />} title="Exposição por Símbolo" />

      <div className="mt-3 flex flex-col items-center gap-5 sm:flex-row">
        <Donut />
        <ul className="w-full min-w-0 flex-1 space-y-2.5">
          {symbolExposure.map((item) => (
            <li key={item.symbol} className="flex items-center gap-3 text-[13px]">
              <span aria-hidden className="size-3 shrink-0 rounded-full" style={{ background: item.color }} />
              <span className="min-w-0 flex-1 truncate text-fg">{item.symbol}</span>
              <span className="tabular text-fg-muted">{item.pct.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <section aria-label="Exposição por Conta" className="mt-4 rounded-lg border border-line bg-canvas/50 p-3.5">
        <h3 className="text-[13px] font-semibold text-fg">Exposição por Conta</h3>
        <ul className="mt-2.5 space-y-2">
          {rows.map((row) => (
            <li key={row.accountId} className="grid grid-cols-[minmax(0,1fr)_minmax(80px,1.3fr)_44px] items-center gap-3 text-[12px]">
              <span className="truncate text-fg">{row.account.name}</span>
              <div
                role="progressbar"
                aria-label={`Exposição de ${row.account.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={row.pct}
                className="h-2 overflow-hidden rounded-sm bg-surface-3"
              >
                <div className="h-full rounded-sm bg-brand-strong" style={{ width: `${(row.pct / max) * 100}%` }} />
              </div>
              <span className="tabular text-right text-fg-muted">{row.pct.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
