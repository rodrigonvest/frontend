import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { panelClass } from "../backtest/BacktestFields";
import SystemLogo from "../systems/SystemLogo";
import { cx } from "../UI";
import { SYSTEM_STATUS_LABEL, type SystemRouteStatus } from "../../lib/systems-catalog";
import type { PlatformInfo, RouteDetails } from "../../lib/system-route-details";

const linkClass =
  "inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-brand-strong/70 bg-[#0a1b2b] px-2.5 text-[12px] font-medium text-fg transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-brand";

function Card({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section aria-label={title} className={cx(panelClass, "flex min-w-0 flex-col gap-2 p-3.5", className)}>
      <h2 className="text-[13px] font-semibold tracking-tight text-fg">{title}</h2>
      {children}
    </section>
  );
}

function Platform({ role, platform }: { role: string; platform: PlatformInfo }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      <SystemLogo logo={platform.logo} size={40} />
      <div className="min-w-0 leading-tight">
        <p className="text-[11px] text-fg-subtle">{role}</p>
        <p className="truncate text-[14px] font-semibold text-fg">{platform.label}</p>
        <p className={cx("mt-0.5 inline-flex items-center gap-1.5 text-[12px]", platform.connected ? "text-success" : "text-danger")}>
          <span aria-hidden className={cx("size-1.5 rounded-full", platform.connected ? "bg-success" : "bg-danger")} />
          {platform.connected ? "Conectado" : "Desconectado"}
        </p>
      </div>
    </div>
  );
}

const statusTone: Record<SystemRouteStatus, string> = {
  active: "text-success",
  paused: "text-warning",
  inactive: "text-fg-muted",
};

const nextExecution: Record<SystemRouteStatus, { title: string; hint: string }> = {
  active: { title: "Aguardando sinal", hint: "Monitorando a origem em tempo real" },
  paused: { title: "Automação pausada", hint: "Retome para voltar a executar" },
  inactive: { title: "Automação desativada", hint: "Ative para receber novos sinais" },
};

export default function SystemRouteOverview({
  details,
  status,
  onTogglePause,
  className,
}: {
  details: RouteDetails;
  status: SystemRouteStatus;
  onTogglePause: () => void;
  className?: string;
}) {
  const { source, destination, lastSignal } = details;
  const isActive = status === "active";
  const next = nextExecution[status];

  return (
    <div className={cx("grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]", className)}>
      <Card title="Resumo da Rota" className="md:col-span-2 xl:col-span-1">
        <div className="flex items-center gap-2">
          <Platform role="Origem" platform={source} />
          <span aria-hidden className="flex shrink-0 items-center gap-1 text-brand">
            <span className="size-1 rounded-full bg-brand/50" />
            <span className="size-1 rounded-full bg-brand/75" />
            <Icon name="chevron" size={14} />
          </span>
          <Platform role="Destino" platform={destination} />
        </div>
        <p className="truncate border-t border-[#17344b]/70 pt-2 text-[12px] text-fg-muted">
          Conta vinculada: <span className="text-fg">{details.account}</span>
        </p>
      </Card>

      <Card title="Status da Automação">
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={isActive}
            aria-label={isActive ? "Pausar automação" : "Ativar automação"}
            onClick={onTogglePause}
            disabled={status === "inactive"}
            className={cx(
              "relative h-6 w-11 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50",
              isActive ? "border-success/70 bg-success/30" : "border-line-strong bg-surface-2",
            )}
          >
            <span
              aria-hidden
              className={cx("absolute top-0.5 size-4.5 rounded-full transition-all", isActive ? "left-[22px] bg-success" : "left-0.5 bg-fg-subtle")}
            />
          </button>
          <span className={cx("text-[16px] font-semibold", statusTone[status])}>
            {status === "active" ? "Ativa" : status === "paused" ? "Pausada" : SYSTEM_STATUS_LABEL[status]}
          </span>
        </div>
        <p className="inline-flex items-center gap-2 text-[12px] text-fg-muted">
          <Icon name="clock" size={14} />
          <span className="tabular">Desde {details.createdAt}</span>
        </p>
      </Card>

      <Card title="Último Sinal">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[15px] font-semibold text-fg">
            {lastSignal.symbol}{" "}
            <span className={lastSignal.side === "BUY" ? "text-success" : "text-danger"}>{lastSignal.side}</span>
          </p>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Ver na origem
            <Icon name="external" size={13} />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
        <p className="text-[12px] text-fg-muted">{lastSignal.ago}</p>
      </Card>

      <Card title="Próxima Execução">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
            <Icon name="signal" size={18} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[15px] font-semibold text-fg">{next.title}</p>
            <p className="mt-0.5 text-[12px] text-fg-muted">{next.hint}</p>
          </div>
        </div>
        <p className="text-[12px] text-fg-subtle tabular">Janela: {details.signalWindow}</p>
      </Card>
    </div>
  );
}
