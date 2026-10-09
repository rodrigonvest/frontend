import Link from "next/link";
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
  const [from, ...rest] = route.name.split(" → ");
  const to = rest.join(" → ");

  return (
    <article
      data-route-id={route.routeId}
      className="group flex h-full min-w-0 flex-col items-center rounded-lg border border-line bg-gradient-to-b from-surface-2/70 to-surface px-1.5 pb-1.5 pt-1.5 text-center transition-colors hover:border-brand/50 focus-within:border-brand/70"
    >
      <Link
        href={`/sistemas/${route.routeId}`}
        aria-label={`Ver detalhes da rota ${route.name}`}
        className="flex w-full flex-col items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <div className="flex items-center justify-center gap-2">
          <SystemLogo logo={route.icon.source} size={30} />
          <Arrow />
          <SystemLogo logo={route.icon.destination} size={30} />
        </div>

        <h3 className="mt-1 flex min-h-[30px] flex-col items-center justify-center text-[12px] font-medium leading-[15px] text-fg min-[1800px]:min-h-[34px] min-[1800px]:flex-row min-[1800px]:flex-wrap min-[1800px]:gap-x-1 min-[1800px]:text-[13px] min-[1800px]:font-semibold">
          <span className="sr-only">{route.name}</span>
          <span aria-hidden>{from}</span>
          <span aria-hidden>→&nbsp;{to}</span>
        </h3>
      </Link>

      <p className="mt-1 hidden min-h-[48px] text-pretty px-1 text-[12px] leading-4 text-fg-muted min-[1800px]:block">
        {route.description}
      </p>

      <div className="mt-auto w-full pt-1">
        <div className={cx("mb-1 flex items-center justify-center gap-1.5 text-[11.5px] font-medium min-[1800px]:text-xs", statusText[route.status])}>
          <span aria-hidden className={cx("size-[7px] rounded-full", statusDot[route.status])} />
          {SYSTEM_STATUS_LABEL[route.status]}
        </div>
        <Link
          href={`/sistemas/${route.routeId}/configuracao`}
          aria-label={`Configurar rota ${route.name}`}
          className="inline-flex h-6 w-full items-center justify-center rounded-md bg-brand-strong text-[11.5px] font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand min-[1800px]:h-8 min-[1800px]:text-xs"
        >
          Configurar
        </Link>
      </div>
    </article>
  );
}
