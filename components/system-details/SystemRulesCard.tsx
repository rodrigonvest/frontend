import { Icon } from "../Icons";
import DetailPanel from "../trade-details/DetailPanel";
import { CheckCircle } from "../trade-details/TradeIcons";
import type { RouteDetails } from "../../lib/system-route-details";

export default function SystemRulesCard({ details, className }: { details: RouteDetails; className?: string }) {
  const entryRules = details.entryRules;
  return (
    <DetailPanel title="Regras de Entrada e Execução" icon={<Icon name="clipboard" size={19} />} className={className}>
      <ul className="mx-3.5 mb-3.5 mt-2.5 flex flex-1 flex-col justify-between gap-1.5">
        {entryRules.map((rule) => (
          <li key={rule} className="flex items-start gap-2.5 text-[12.5px] leading-[18px] text-fg">
            <span className="mt-px shrink-0">
              <CheckCircle size={18} />
            </span>
            <span className="min-w-0 text-pretty">{rule}</span>
          </li>
        ))}
      </ul>
    </DetailPanel>
  );
}
