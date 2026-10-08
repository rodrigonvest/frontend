import type { SystemRoute, SystemSource } from "../../lib/systems-catalog";
import { Icon } from "../Icons";
import { cx } from "../UI";
import RouteCard from "./RouteCard";
import SystemLogo from "./SystemLogo";

export default function SourceGroup({
  source,
  routes,
  totalRoutes,
  open,
  onToggle,
}: {
  source: SystemSource;
  routes: readonly SystemRoute[];
  totalRoutes: number;
  open: boolean;
  onToggle: () => void;
}) {
  const activeRoutes = routes.filter((r) => r.status === "active").length;
  const panelId = `systems-group-${source.id}`;
  const titleId = `${panelId}-title`;

  return (
    <section aria-labelledby={titleId} className="overflow-hidden rounded-xl border border-line bg-surface/80 shadow-[0_8px_24px_-16px_rgba(0,0,0,.6)]">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 px-3.5 py-2.5">
        <SystemLogo logo={source.logo} size={42} />
        <h2 id={titleId} className="text-[18px] font-semibold leading-none tracking-tight text-fg">
          {source.label}
          <span className="ml-2.5 font-medium text-brand">
            <span aria-hidden>→ </span>
            {routes.length} {routes.length === 1 ? "rota" : "rotas"}
          </span>
        </h2>
        <p className="min-w-[220px] flex-1 text-xs leading-5 text-fg-muted">{source.groupDescription}</p>

        <span
          className="inline-flex h-7 items-center gap-2 rounded-full border border-success/45 bg-success-soft/70 px-3 text-xs font-semibold text-success tabular"
          aria-label={`${activeRoutes} de ${totalRoutes} rotas ativas`}
        >
          <span aria-hidden className="size-2 rounded-full bg-success" />
          {activeRoutes} / {totalRoutes}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Recolher" : "Expandir"} rotas de ${source.label}`}
          className="flex size-8 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:bg-white/[.04] hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span aria-hidden className={cx("transition-transform", open ? "-rotate-90" : "rotate-90")}>
            <Icon name="chevron" size={16} stroke={2.2} />
          </span>
        </button>
      </div>

      {open && (
        <div id={panelId} className="grid grid-cols-2 gap-2.5 px-3.5 pb-3.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9">
          {routes.map((route) => (
            <RouteCard key={route.routeId} route={route} />
          ))}
        </div>
      )}
    </section>
  );
}
