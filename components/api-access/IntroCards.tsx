import { IconTile } from "../copytrix-ai/AiPrimitives";
import { Badge } from "../UI";
import { INTRO_CARDS } from "../../lib/api-access-data";
import { CARD_SURFACE } from "./ApiPrimitives";

export default function IntroCards() {
  return (
    <ul aria-label="Recursos da API" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {INTRO_CARDS.map((card) => (
        <li key={card.id} className={`flex items-start gap-3.5 p-4 ${CARD_SURFACE}`}>
          <IconTile name={card.icon} accent={card.accent} size={26} className="size-14" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px] font-semibold tracking-tight text-fg">{card.title}</h2>
              {card.badge && <Badge tone="green">{card.badge}</Badge>}
            </div>
            <p className="mt-1 text-pretty text-[13px] leading-5 text-fg-muted">{card.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
