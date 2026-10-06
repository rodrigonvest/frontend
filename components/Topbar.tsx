"use client";
import { Icon } from "./Icons";

function IntegrationChip({ icon, label, iconClass }: { icon: string; label: string; iconClass: string }) {
  return (
    <div className="flex h-10 items-center gap-2.5 rounded-lg border border-line bg-surface px-3" title={`${label}: status não verificado por esta interface`}>
      <span className={`flex size-7 items-center justify-center rounded-md ${iconClass}`}>
        <Icon name={icon} size={15} />
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-medium text-fg">{label}</span>
        <span className="flex items-center gap-1 text-[11px] text-fg-subtle">
          <span aria-hidden className="size-1.5 rounded-full bg-fg-subtle" />
          Não verificado
        </span>
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

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 md:flex">
          <IntegrationChip icon="telegram" label="Telegram" iconClass="bg-[#229ed9] text-white" />
          <IntegrationChip icon="analytics" label="MT5" iconClass="bg-success/15 text-success" />
        </div>
        <button aria-label="Notificações" className="flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg">
          <Icon name="bell" size={19} />
        </button>
        <div className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2">
          <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-[#e6eaef] text-[13px] font-bold text-[#28313a]">R</span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[13px] font-medium text-fg">Rodrigo</span>
            <span className="block text-[11px] text-fg-subtle">Conta</span>
          </span>
        </div>
      </div>
    </header>
  );
}
