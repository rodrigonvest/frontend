import { SYSTEM_STATUS_LABEL, type SystemRoute } from "../../lib/systems-catalog";
import { cx } from "../UI";
import SystemLogo from "./SystemLogo";

const statusDot: Record<SystemRoute["status"], string> = {
  active: "bg-success",
  paused: "bg-warning",
  inactive: "bg-fg-subtle",
};

const statusText: Record<SystemRoute["status"], string> = {
  active: "text-success",
  paused: "text-warning",
  inactive: "text-fg-subtle",
};

function Arrow() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-fg-muted">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function RouteCard({ route }: { route: SystemRoute }) {
  return (
    <article
      data-route-id={route.routeId}
      className="group flex h-full min-w-0 flex-col items-center rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface p-2.5 text-center transition-colors hover:border-brand/50 focus-within:border-brand/70"
    >
      <div className="flex items-center justify-center gap-1.5">
        <SystemLogo logo={route.icon.source} size={38} />
        <Arrow />
        <SystemLogo logo={route.icon.destination} size={38} />
      </div>

      <h3 className="mt-2.5 flex min-h-8 items-center text-balance text-[12.5px] font-semibold leading-4 text-fg">
        {route.name}
      </h3>

      <p className="mt-1 hidden min-h-12 text-pretty text-[11px] leading-4 text-fg-muted min-[1800px]:block">
        {route.description}
      </p>

      <div className="mt-auto w-full pt-2.5">
        <div className={cx("mb-2 flex items-center justify-center gap-1.5 text-xs font-medium", statusText[route.status])}>
          <span aria-hidden className={cx("size-2 rounded-full", statusDot[route.status])} />
          {SYSTEM_STATUS_LABEL[route.status]}
        </div>
        <button
          type="button"
          aria-label={`Configurar rota ${route.name}`}
          className="inline-flex h-8 w-full items-center justify-center rounded-md bg-brand-strong text-xs font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Configurar
        </button>
      </div>
    </article>
  );
}
