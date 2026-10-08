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
    <span role="status" className={`inline-flex h-[33px] items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium ${cfg.chip}`}>
      <span aria-hidden className="relative flex size-2.5">
        {cfg.ping && <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${cfg.dot}`} />}
        <span className={`relative inline-flex size-2.5 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
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
    <div className="flex h-10 items-center gap-2 rounded-lg" title={`${label}: ${cfg.label}`}>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] ${iconClass}`}>
        <Icon name={icon} size={icon === "telegram" ? 21 : 17} stroke={icon === "telegram" ? 1.9 : 2} />
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-medium text-fg">{label}</span>
        <span className={`block whitespace-nowrap text-xs ${cfg.text}`}>{cfg.label}</span>
      </span>
    </div>
  );
}

const TERMINAL_STATUS: Record<SystemStatusValue, { label: string; box: string; text: string; pulse?: boolean }> = {
  connected: { label: "Conectado", box: "bg-success/15 text-success", text: "text-success" },
  disconnected: { label: "Desconectado", box: "bg-danger/15 text-danger", text: "text-danger" },
  connecting: { label: "Conectando...", box: "bg-warning/15 text-warning", text: "text-warning", pulse: true },
  error: { label: "Erro", box: "bg-danger/15 text-danger", text: "text-danger" },
  unavailable: { label: "Indisponível", box: "bg-white/[.06] text-fg-subtle", text: "text-fg-subtle" },
};

function TerminalStatusItem({ terminal, status }: { terminal: "MT4" | "MT5"; status: SystemStatusValue }) {
  const cfg = TERMINAL_STATUS[status];
  return (
    <span className="inline-flex h-10 items-center gap-2" title={`${terminal}: ${cfg.label}`}>
      <span aria-hidden className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] ${cfg.box} ${cfg.pulse ? "animate-pulse" : ""}`}>
        <Icon name="barsFilled" size={17} />
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-medium text-fg">{terminal}</span>
        <span className={`hidden whitespace-nowrap text-xs font-medium lg:block ${cfg.text}`}>{cfg.label}</span>
        <span className="sr-only lg:hidden">{cfg.label}</span>
      </span>
    </span>
  );
}

function TerminalStatusIndicator({ mt4Status, mt5Status }: { mt4Status: SystemStatusValue; mt5Status: SystemStatusValue }) {
  return (
    <div role="status" aria-label="Status dos terminais MetaTrader" className="inline-flex items-center gap-5 xl:gap-6">
      <TerminalStatusItem terminal="MT4" status={mt4Status} />
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
    <header className="sticky top-0 z-30 flex h-[70px] shrink-0 items-center gap-2 border-b border-line bg-[#071522]/90 px-4 backdrop-blur-xl sm:px-6 lg:pl-3.5 lg:pr-3">
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
        className="hidden size-10 items-center justify-center rounded-lg text-fg hover:bg-white/[.05] lg:flex"
      >
        <Icon name="menu" size={22} />
      </button>
      <span className="text-base font-bold tracking-tight lg:hidden">Copytrix</span>

      <div className="hidden flex-1 items-center justify-center gap-5 md:flex xl:gap-6 2xl:pl-[184px]" aria-label="Status das integrações">
        <CopierChip status={status.copier.status} />
        <IntegrationChip icon="telegram" label="Telegram" status={status.telegram.status} iconClass="bg-[#229ed9] text-white" />
        <TerminalStatusIndicator mt4Status={status.mt4.status} mt5Status={status.mt5.status} />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0 xl:gap-5">
        <div className="hidden h-[47px] items-center gap-2.5 rounded-lg border border-line bg-surface px-[3px] pr-3.5 xl:flex">
          <span aria-hidden className="flex size-10 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <Icon name="crown" size={20} stroke={2} />
          </span>
          <span className="leading-tight">
            <span className="block text-[12.5px] font-semibold text-fg">{s.plan}</span>
            <span className="block whitespace-nowrap text-[11.5px] text-fg-subtle">Válido até {s.planValidUntil}</span>
          </span>
        </div>
        <button
          aria-label={`Notificações (${s.notifications} novas)`}
          className="relative flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg"
        >
          <Icon name="bell" size={22} />
          {s.notifications > 0 && (
            <span aria-hidden className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-danger text-[11px] font-bold text-white ring-2 ring-[#071522]">
              {s.notifications}
            </span>
          )}
        </button>
        <button type="button" className="flex items-center gap-3 rounded-lg py-1 pl-1 pr-2 hover:bg-white/[.04]" aria-label={`Conta de ${s.user.name}`}>
          <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-[#e6eaef] text-[16px] font-bold text-[#28313a]">
            {s.user.name.charAt(0)}
          </span>
          <span className="hidden min-w-[92px] text-left leading-tight sm:block">
            <span className="block text-[15px] font-semibold text-fg">{s.user.name}</span>
            <span className="block text-xs text-fg-subtle">{s.user.role}</span>
          </span>
          <span className="hidden text-fg-muted sm:block">
            <Icon name="chevronDown" size={16} />
          </span>
        </button>
      </div>
    </header>
  );
}
