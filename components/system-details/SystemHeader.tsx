import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { SYSTEM_STATUS_LABEL, type SystemRouteStatus } from "../../lib/systems-catalog";

const badgeTone: Record<SystemRouteStatus, string> = {
  active: "border-success/60 bg-success/15 text-success",
  paused: "border-warning/60 bg-warning/15 text-warning",
  inactive: "border-line bg-surface-2 text-fg-muted",
};

const actionClass =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

function PauseGlyph() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4.2" height="14" rx="1" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
    </svg>
  );
}

function PencilGlyph() {
  return (
    <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="m14.5 7.5 3 3" />
    </svg>
  );
}

function StopGlyph() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  );
}

export function StatusBadge({ status }: { status: SystemRouteStatus }) {
  return (
    <span className={cx("inline-flex h-[26px] items-center rounded-full border px-3 text-[13px] font-semibold", badgeTone[status])}>
      {SYSTEM_STATUS_LABEL[status]}
    </span>
  );
}

export default function SystemHeader({
  routeId,
  name,
  description = "Detalhes completos da rota / automação, desempenho, configurações e histórico de operações.",
  status,
  onTogglePause,
  onToggleActive,
}: {
  routeId: string;
  name: string;
  description?: string;
  status: SystemRouteStatus;
  onTogglePause: () => void;
  onToggleActive: () => void;
}) {
  const inactive = status === "inactive";
  const actions: ReactNode = (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        onClick={onTogglePause}
        disabled={inactive}
        className={cx(actionClass, "border-[#24435d] bg-[#0a1b2b] text-fg hover:border-brand")}
      >
        {status === "paused" ? <PlayGlyph /> : <PauseGlyph />}
        {status === "paused" ? "Retomar" : "Pausar"}
      </button>
      <Link href={`/sistemas/${routeId}/configuracao`} className={cx(actionClass, "border-brand-strong/70 bg-[#0a1b2b] text-fg hover:border-brand")}>
        <PencilGlyph />
        Editar
      </Link>
      <button type="button" className={cx(actionClass, "border-brand-strong/70 bg-[#0a1b2b] text-fg hover:border-brand")}>
        <Icon name="copy" size={15} />
        Duplicar
      </button>
      <button
        type="button"
        onClick={onToggleActive}
        className={cx(
          actionClass,
          inactive
            ? "border-success/60 bg-success/10 text-success hover:bg-success/20"
            : "border-danger/60 bg-danger/10 text-danger hover:bg-danger/20",
        )}
      >
        {inactive ? <PlayGlyph /> : <StopGlyph />}
        {inactive ? "Ativar" : "Desativar"}
      </button>
    </div>
  );

  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg">Sistemas</Link>
        <Icon name="chevron" size={12} />
        <span>Detalhes da Rota / Automação</span>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">{name}</span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">{name}</h1>
            <StatusBadge status={status} />
          </div>
          <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">
            {description}
          </p>
        </div>
        {actions}
      </header>
    </>
  );
}
