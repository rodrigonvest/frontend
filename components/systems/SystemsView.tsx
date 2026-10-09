"use client";
import { useMemo, useState } from "react";
import {
  SYSTEM_ROUTES,
  SYSTEM_SOURCES,
  routesBySource,
  type SystemRoute,
  type SystemSourceId,
} from "../../lib/systems-catalog";
import { Icon } from "../Icons";
import { EmptyState, cx } from "../UI";
import SourceGroup from "./SourceGroup";
import SystemsFooter from "./SystemsFooter";

type Filter = "all" | SystemSourceId;

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function matchesQuery(route: SystemRoute, query: string) {
  if (!query) return true;
  return normalize(`${route.name} ${route.description} ${route.source} ${route.destination}`).includes(query);
}

export default function SystemsView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [collapsed, setCollapsed] = useState<ReadonlySet<SystemSourceId>>(() => new Set());

  const normalizedQuery = normalize(query);

  const groups = useMemo(
    () =>
      SYSTEM_SOURCES.filter((source) => filter === "all" || source.id === filter)
        .map((source) => ({
          source,
          total: routesBySource(source.id).length,
          routes: routesBySource(source.id).filter((route) => matchesQuery(route, normalizedQuery)),
        }))
        .filter((group) => group.routes.length > 0),
    [filter, normalizedQuery],
  );

  const visibleCount = groups.reduce((sum, group) => sum + group.routes.length, 0);
  const isFiltered = filter !== "all" || normalizedQuery !== "";
  const countLabel = isFiltered ? `${visibleCount} de ${SYSTEM_ROUTES.length} rotas` : `${SYSTEM_ROUTES.length} rotas`;

  const toggleGroup = (id: SystemSourceId) =>
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const tabs: Array<{ id: Filter; label: string; count: number }> = [
    { id: "all", label: "Todos", count: SYSTEM_ROUTES.length },
    ...SYSTEM_SOURCES.map((source) => ({ id: source.id, label: source.label, count: routesBySource(source.id).length })),
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <header className="mb-1.5 flex flex-col gap-3 min-[1400px]:flex-row min-[1400px]:items-center min-[1400px]:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-fg min-[1400px]:whitespace-nowrap">
              Sistemas / Automações{" "}
              <span className="font-normal text-fg-muted">({countLabel})</span>
            </h1>
            <span className="inline-flex h-6 items-center rounded-full border border-brand/30 bg-brand-soft/80 px-3 text-xs font-medium text-[#cfe3ff] min-[1400px]:hidden min-[1700px]:inline-flex">
              Parte 2 de 2
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-5 text-fg-muted min-[1400px]:whitespace-nowrap min-[1800px]:text-sm">
            Conecte suas fontes e destinos e automatize suas operações em tempo real
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-center">
          <label className="relative block md:w-[clamp(170px,11vw,240px)] md:shrink-0">
            <span className="sr-only">Buscar sistemas</span>
            <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
              <Icon name="search" size={15} />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar sistemas..."
              autoComplete="off"
              className="h-9 w-full rounded-md border border-[#24435d] bg-[#0a1b2b] pl-9 pr-3 text-[12px] text-fg placeholder:text-fg-subtle focus-visible:border-brand focus-visible:outline-none"
            />
          </label>

          <div role="group" aria-label="Filtrar por fonte" className="flex min-w-0 overflow-x-auto rounded-md border border-[#24435d] bg-[#0a1b2b]">
            {tabs.map((tab, index) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tab.id)}
                  className={cx(
                    "h-9 shrink-0 whitespace-nowrap px-2 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand min-[1800px]:px-4 min-[1800px]:text-xs",
                    index > 0 && !active && "border-l border-[#1a3349]",
                    active ? "rounded-md bg-brand-strong text-white" : "text-fg hover:bg-white/[.04]",
                  )}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>

        </div>
      </header>

      <p className="sr-only" role="status" aria-live="polite">
        {visibleCount} {visibleCount === 1 ? "rota encontrada" : "rotas encontradas"}
      </p>

      {groups.length === 0 ? (
        <EmptyState
          title="Nenhuma rota encontrada"
          description="Ajuste a busca ou escolha outra fonte para ver as rotas de automação."
          className="rounded-xl border-line bg-surface/60 py-14"
        />
      ) : (
        groups.map(({ source, routes, total }) => (
          <SourceGroup
            key={source.id}
            source={source}
            routes={routes}
            totalRoutes={total}
            open={!collapsed.has(source.id)}
            onToggle={() => toggleGroup(source.id)}
          />
        ))
      )}

      <SystemsFooter activeSource={filter} onSelectSource={setFilter} />
    </div>
  );
}
