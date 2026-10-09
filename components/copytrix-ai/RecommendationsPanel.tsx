import { RECOMMENDATIONS } from "../../lib/copytrix-ai-data";
import { Panel } from "./AiPrimitives";

export default function RecommendationsPanel() {
  return (
    <Panel title="Recomendações Personalizadas" icon="bulb">
      <ol className="space-y-2.5">
        {RECOMMENDATIONS.map((item, index) => (
          <li key={item} className="flex items-start gap-2.5 text-[12.5px] leading-5 text-fg">
            <span aria-hidden className="tabular mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-warning text-[11px] font-bold text-[#3a2a05]">
              {index + 1}
            </span>
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
