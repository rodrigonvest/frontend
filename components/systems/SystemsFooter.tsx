import {
  SYSTEM_DESTINATIONS,
  SYSTEM_ROUTES,
  SYSTEM_SOURCES,
  type SystemSourceId,
} from "../../lib/systems-catalog";
import { cx } from "../UI";
import SystemLogo from "./SystemLogo";

function StackIcon() {
  return (
    <svg aria-hidden width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 9 4.5-9 4.5-9-4.5z" fill="currentColor" fillOpacity=".25" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  );
}

export default function SystemsFooter({
  activeSource,
  onSelectSource,
}: {
  activeSource: SystemSourceId | "all";
  onSelectSource: (id: SystemSourceId | "all") => void;
}) {
  return (
    <section
      aria-label="Resumo das rotas de automação"
      className="mt-1.5 flex flex-col gap-3 rounded-lg border border-line bg-surface/80 p-2.5 xl:flex-row xl:items-center"
    >
      <div className="flex items-center gap-3.5 px-1.5 xl:w-[400px] xl:shrink-0 min-[1800px]:w-[560px]">
        <span className="text-fg-muted">
          <StackIcon />
        </span>
        <div className="min-w-0">
          <p className="text-[17px] font-semibold leading-6 text-fg">Total de {SYSTEM_ROUTES.length} rotas de automação</p>
          <p className="text-xs leading-5 text-fg-muted min-[1800px]:whitespace-nowrap">
            {SYSTEM_SOURCES.length} fontes × {SYSTEM_DESTINATIONS.length} destinos | Conecte suas plataformas e opere em tempo real
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-line bg-canvas/50 px-3.5 py-2.5 lg:flex-row lg:items-center lg:gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2">
          <span className="mr-1 text-xs text-fg-muted">Fontes:</span>
          {SYSTEM_SOURCES.map((source) => {
            const selected = activeSource === source.id;
            return (
              <button
                key={source.id}
                type="button"
                aria-pressed={selected}
                aria-label={`Filtrar por fonte ${source.label}`}
                onClick={() => onSelectSource(selected ? "all" : source.id)}
                className={cx(
                  "flex w-[66px] flex-col items-center gap-1 rounded-lg border px-0.5 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                  selected ? "border-brand bg-brand/10" : "border-transparent hover:border-line-strong hover:bg-white/[.03]",
                )}
              >
                <SystemLogo logo={source.logo} size={30} />
                <span className="max-w-full truncate text-[10px] leading-3 text-fg-muted">{source.label}</span>
              </button>
            );
          })}
        </div>

        <div aria-hidden className="hidden h-12 w-px shrink-0 bg-line lg:block" />

        <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2">
          <span className="mr-1 text-xs text-fg-muted">Destinos:</span>
          {SYSTEM_DESTINATIONS.map((destination) => (
            <div key={destination.id} className="flex w-[66px] flex-col items-center gap-1 px-0.5 py-1.5">
              <SystemLogo logo={destination.logo} size={30} />
              <span className="max-w-full truncate text-[10px] leading-3 text-fg-muted">{destination.shortLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
