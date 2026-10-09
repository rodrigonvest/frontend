import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { assets } from "../../lib/system-details-demo";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 1.2;

export default function SystemAssetsCard({ className }: { className?: string }) {
  const total = assets.reduce((sum, a) => sum + a.count, 0);
  let offset = 0;

  return (
    <DetailPanel title="Ativos Operados" icon={<Icon name="target" size={19} />} className={className}>
      <div className="mx-3.5 mb-3 mt-2 flex flex-1 items-center gap-4">
        <div className="relative size-[132px] shrink-0" role="img" aria-label={`${total} operações distribuídas por ativo`}>
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#12263a" strokeWidth="11" />
            {assets.map((a) => {
              const length = (a.count / total) * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={a.symbol}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="11"
                  strokeDasharray={`${Math.max(length - GAP, 0.5)} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += length;
              return circle;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
            <span className="text-[24px] font-semibold tabular text-fg">{total}</span>
            <span className="text-[11.5px] text-fg-muted">operações</span>
          </div>
        </div>
        <ul className="min-w-0 flex-1 space-y-2.5 text-[13px] tabular">
          {assets.map((a) => (
            <li key={a.symbol} className="grid grid-cols-[10px_minmax(0,1fr)_auto] items-center gap-x-2.5">
              <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: a.color }} />
              <span className="truncate text-fg">{a.symbol}</span>
              <span className="whitespace-nowrap text-fg">
                {a.count} <span className="text-fg-muted">({a.share})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </DetailPanel>
  );
}
