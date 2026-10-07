"use client";
import { Icon } from "./Icons";
import { DEMO_SESSION } from "../lib/demo-data";

function IntegrationChip({ icon, label, status, iconClass }: { icon: string; label: string; status: string; iconClass: string }) {
  return (
    <div className="flex h-10 items-center gap-2.5 rounded-lg px-2" title={`${label}: ${status} (estado demonstrativo)`}>
      <span className={`flex size-8 items-center justify-center rounded-lg ${iconClass}`}>
        <Icon name={icon} size={16} stroke={2} />
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-medium text-fg">{label}</span>
        <span className="block text-[11px] text-fg-subtle">{status}</span>
      </span>
    </div>
  );
}

export default function Topbar({
  collapsed,
  onToggleCollapse,
  onOpenMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
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
        <span
          role="status"
          className="inline-flex h-8 items-center gap-2 rounded-full border border-success/40 bg-success-soft/60 px-3.5 text-xs font-medium text-success"
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {s.copierOnline ? "Copier Online" : "Copier Offline"}
        </span>
        <IntegrationChip icon="telegram" label="Telegram" status={s.telegram} iconClass="bg-[#229ed9] text-white" />
        <IntegrationChip icon="signal" label="MT5" status={s.mt5} iconClass="bg-success/15 text-success" />
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
