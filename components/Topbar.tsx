"use client";
import { Icon } from "./Icons";
import { DEMO_SESSION } from "../lib/demo-data";
import { UNAVAILABLE_SYSTEM_STATUS, type SystemStatus, type SystemStatusValue } from "../schemas/system-status";

type CopierPresentation = { label: string; chip: string; dot: string; ping?: boolean; pulse?: boolean };

const COPIER_STATUS: Record<SystemStatusValue, CopierPresentation> = {
  connected: { label: "Copier Online", chip: "border-success/40 bg-success-soft/60 text-success", dot: "bg-success", ping: true },
  disconnected: { label: "Copier Offline", chip: "border-danger/40 bg-danger/10 text-danger", dot: "bg-danger" },
  connecting: { label: "Copier Conectando...", chip: "border-warning/40 bg-warning/10 text-warning", dot: "bg-warning", pulse: true },
  error: { label: "Copier com Erro", chip: "border-danger/40 bg-danger/10 text-danger", dot: "bg-danger" },
  unavailable: { label: "Copier Indisponível", chip: "border-line bg-surface text-fg-subtle", dot: "bg-fg-subtle" },
};

function CopierChip({ status }: { status: SystemStatusValue }) {
  const cfg = COPIER_STATUS[status];
  return (
    <span role="status" className={`inline-flex h-8 items-center gap-2 rounded-full border px-3.5 text-xs font-medium ${cfg.chip}`}>
      <span aria-hidden className="relative flex size-2">
        {cfg.ping && <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${cfg.dot}`} />}
        <span className={`relative inline-flex size-2 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
      </span>
      {cfg.label}
    </span>
  );
}

const TELEGRAM_STATUS: Record<SystemStatusValue, { label: string; text: string }> = {
  connected: { label: "Conectado", text: "text-fg-subtle" },
  disconnected: { label: "Desconectado", text: "text-danger" },
  connecting: { label: "Conectando...", text: "text-warning" },
  error: { label: "Erro", text: "text-danger" },
  unavailable: { label: "Indisponível", text: "text-fg-subtle" },
};

function IntegrationChip({ icon, label, status, iconClass }: { icon: string; label: string; status: SystemStatusValue; iconClass: string }) {
  const cfg = TELEGRAM_STATUS[status];
  return (
    <div className="flex h-10 items-center gap-2.5 rounded-lg px-2" title={`${label}: ${cfg.label}`}>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] ${iconClass}`}>
        <Icon name={icon} size={icon === "telegram" ? 19 : 16} stroke={icon === "telegram" ? 1.9 : 2} />
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-medium text-fg">{label}</span>
        <span className={`block text-[11px] ${cfg.text}`}>{cfg.label}</span>
      </span>
    </div>
  );
}

const TERMINAL_STATUS: Record<SystemStatusValue, { label: string; dot: string; text: string; pulse?: boolean }> = {
  connected: { label: "Conectado", dot: "bg-success", text: "text-success" },
  disconnected: { label: "Desconectado", dot: "bg-danger", text: "text-danger" },
  connecting: { label: "Conectando...", dot: "bg-warning", text: "text-warning", pulse: true },
  error: { label: "Erro", dot: "bg-danger", text: "text-danger" },
  unavailable: { label: "Indisponível", dot: "bg-fg-subtle", text: "text-fg-subtle" },
};

function TerminalStatusItem({ terminal, status }: { terminal: "MT4" | "MT5"; status: SystemStatusValue }) {
  const cfg = TERMINAL_STATUS[status];
  return (
    <span className="inline-flex items-center gap-1.5" title={`${terminal}: ${cfg.label}`}>
      <span aria-hidden className={`size-2 shrink-0 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
      <span className="text-xs font-semibold text-fg">{terminal}</span>
      <span className={`hidden text-[11px] font-medium lg:inline ${cfg.text}`}>{cfg.label}</span>
      <span className="sr-only lg:hidden">{cfg.label}</span>
    </span>
  );
}

function TerminalStatusIndicator({ mt4Status, mt5Status }: { mt4Status: SystemStatusValue; mt5Status: SystemStatusValue }) {
  return (
    <div
      role="status"
      aria-label="Status dos terminais MetaTrader"
      className="inline-flex h-10 items-center gap-3 rounded-lg border border-line bg-surface px-3 lg:gap-4"
    >
      <TerminalStatusItem terminal="MT4" status={mt4Status} />
      <span aria-hidden className="h-4 w-px bg-line" />
      <TerminalStatusItem terminal="MT5" status={mt5Status} />
    </div>
  );
}

export default function Topbar({
  collapsed,
  onToggleCollapse,
  onOpenMobile,
  status = UNAVAILABLE_SYSTEM_STATUS,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
  status?: SystemStatus;
}) {
  const s = DEMO_SESSION;
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-line bg-[#071522]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        onClick={onOpenMobile}
        aria-label="Abrir menu"
        className="flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg lg:hidden"
      >
        <Icon name="menu" size={20} />
      </button>
      <button
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
        aria-expanded={!collapsed}
        className="hidden size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg lg:flex"
      >
        <Icon name="menu" size={20} />
      </button>
      <span className="text-base font-bold tracking-tight lg:hidden">Copytrix</span>

      <div className="hidden flex-1 items-center justify-center gap-4 md:flex xl:gap-6" aria-label="Status das integrações">
        <CopierChip status={status.copier.status} />
        <IntegrationChip icon="telegram" label="Telegram" status={status.telegram.status} iconClass="bg-[#229ed9] text-white" />
        <TerminalStatusIndicator mt4Status={status.mt4.status} mt5Status={status.mt5.status} />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <div className="hidden h-11 items-center gap-2.5 rounded-lg border border-line bg-surface px-3 xl:flex">
          <span aria-hidden className="flex size-8 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <Icon name="crown" size={17} stroke={2} />
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-semibold text-fg">{s.plan}</span>
            <span className="block text-[11px] text-fg-subtle">Válido até {s.planValidUntil}</span>
          </span>
        </div>
        <button
          aria-label={`Notificações (${s.notifications} novas)`}
          className="relative flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg"
        >
          <Icon name="bell" size={19} />
          {s.notifications > 0 && (
            <span aria-hidden className="absolute right-1 top-1 flex size-[18px] items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-[#071522]">
              {s.notifications}
            </span>
          )}
        </button>
        <button type="button" className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 hover:bg-white/[.04]" aria-label={`Conta de ${s.user.name}`}>
          <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-[#e6eaef] text-[14px] font-bold text-[#28313a]">
            {s.user.name.charAt(0)}
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[13px] font-semibold text-fg">{s.user.name}</span>
            <span className="block text-[11px] text-fg-subtle">{s.user.role}</span>
          </span>
          <span className="hidden text-fg-subtle sm:block">
            <Icon name="chevronDown" size={15} />
          </span>
        </button>
      </div>
    </header>
  );
}
