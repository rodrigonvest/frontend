import { ACCOUNT_METRICS } from "../../lib/copytrix-ai-data";
import { IconTile, Panel } from "./AiPrimitives";

const valueTones = { green: "text-success", amber: "text-fg", blue: "text-fg", red: "text-danger" } as const;

export default function AccountSummaryPanel() {
  return (
    <Panel title="Resumo da Conta com IA" icon="barsFilled">
      <ul className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 min-[1440px]:grid-cols-4">
        {ACCOUNT_METRICS.map((metric) => (
          <li key={metric.label} className="flex min-w-0 items-center gap-3 rounded-lg border border-line bg-canvas/40 p-3">
            <IconTile name={metric.icon} accent={metric.accent} size={22} className="size-11" />
            <div className="min-w-0">
              <p className="truncate text-[11.5px] leading-4 text-fg-muted">{metric.label}</p>
              <p className={`tabular mt-0.5 truncate text-[20px] font-semibold leading-tight tracking-tight ${valueTones[metric.accent]}`}>{metric.value}</p>
              <p className="truncate text-[11.5px] leading-4 text-fg-subtle">{metric.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
