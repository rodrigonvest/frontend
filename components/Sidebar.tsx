"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { cx } from "./UI";

type NavItem = { icon: string; label: string; href?: string; soon?: boolean };

const primary: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", href: "/" },
  { icon: "trades", label: "Operações", href: "/trades" },
  { icon: "telegram", label: "Canais Telegram", href: "/connectors" },
  { icon: "accounts", label: "Contas", href: "/accounts" },
  { icon: "systems", label: "Sistemas", href: "/sistemas" },
  { icon: "analytics", label: "Desempenho", href: "/desempenho" },
  { icon: "pulse", label: "Análise de Desempenho", href: "/analise-desempenho" },
  { icon: "backtest", label: "Backtest", href: "/backtester" },
  { icon: "logs", label: "Logs", href: "/logs" },
  { icon: "fileText", label: "Relatórios", href: "/relatorios" },
  { icon: "settings", label: "Configurações", href: "/settings" },
];

const secondary: NavItem[] = [
  { icon: "chart", label: "Acesso à API", href: "/api-access" },
  { icon: "dollar", label: "Plano e cobrança", href: "/billing" },
  { icon: "calendar", label: "Roadmap", href: "/roadmap" },
];

const helpItem: NavItem = { icon: "help", label: "Ajuda & Suporte", href: "/help" };

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Copytrix — início">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
        <svg width="24" height="24" viewBox="0 0 27 27" fill="none" aria-hidden>
          <path d="M22.6 9.2a9.8 9.8 0 1 1-4.1-4.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="m8 13.8 3.2 3.2L22.7 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block text-lg font-bold leading-none tracking-tight text-fg">Copytrix</span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-brand">Telegram to Results</span>
        </span>
      )}
    </Link>
  );
}

function NavLink({ item, active, compact, onNavigate, wrap = false }: { item: NavItem; active: boolean; compact: boolean; onNavigate: () => void; wrap?: boolean }) {
  const base = cx(
    "group relative flex items-center rounded-lg text-[13.5px] transition-colors",
    wrap ? "min-h-10 gap-2.5 py-1.5" : "h-10 gap-3",
    compact ? "justify-center px-0" : wrap ? "px-2.5" : "px-3",
  );
  const content = (
    <>
      {active && <span aria-hidden className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-brand" />}
      <span className={cx("flex size-6 shrink-0 items-center justify-center", item.icon === "telegram" && "telegram-nav-icon", active ? "text-brand" : "text-fg-subtle group-hover:text-fg-muted")}>
        <Icon name={item.icon} size={18} stroke={item.icon === "telegram" ? 1.7 : 1.8} />
      </span>
      {!compact && <span className={wrap ? "leading-snug" : "truncate"}>{item.label}</span>}
      {!compact && item.soon && (
        <span className="ml-auto rounded-full border border-line-strong px-2 text-[10px] leading-5 text-fg-subtle">Em breve</span>
      )}
    </>
  );

  if (!item.href) {
    return (
      <span aria-disabled="true" title={compact ? `${item.label} (em breve)` : "Em breve"} className={cx(base, "cursor-not-allowed text-fg-subtle/70")}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={compact ? item.label : undefined}
      className={cx(base, active ? "bg-brand-soft/70 text-fg" : "text-fg-muted hover:bg-white/[.04] hover:text-fg")}
    >
      {content}
    </Link>
  );
}

const channelAnalysis: NavItem = { icon: "analytics", label: "Análise Automática de Canais", href: "/sistemas/analise-canais" };

const systemsSubmenu: NavItem[] = [
  { icon: "systems", label: "Automações", href: "/sistemas" },
  { icon: "layers", label: "Templates", href: "/sistemas/templates" },
  { icon: "accounts", label: "Multi-Conta Avançado", href: "/sistemas/multi-conta" },
  { icon: "shield", label: "Risk Management Pro", href: "/sistemas/risk-management-pro" },
  { icon: "settings", label: "Smart Entry", href: "/sistemas/smart-entry" },
  { icon: "filter", label: "Filtros Avançados", href: "/sistemas/filtros-avancados" },
  channelAnalysis,
  { icon: "brain", label: "Copytrix Intelligence", href: "/sistemas/copytrix-intelligence" },
  { icon: "trophy", label: "Marketplace de Estratégias", href: "/sistemas/marketplace" },
  { icon: "replay", label: "Replay de Sinais", href: "/sistemas/replay-de-sinais" },
  { icon: "sparkles", label: "Copytrix AI", href: "/sistemas/copytrix-ai" },
];

function NavContent({ compact, onNavigate }: { compact: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const [systemsOpen, setSystemsOpen] = useState(false);
  const inSystems = pathname === "/sistemas" || pathname.startsWith("/sistemas/");
  const systemsExpanded = systemsOpen || inSystems;
  const isSystemsSubActive = (href: string) => {
    if (href !== "/sistemas") return pathname === href || pathname.startsWith(`${href}/`);
    const dedicated = systemsSubmenu.slice(1).some((sub) => pathname.startsWith(sub.href!));
    return inSystems && !dedicated;
  };
  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  return (
    <>
      <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {primary.map((item) => (
            <li key={item.label}>
              {item.href === "/sistemas" ? (
                <>
                  <div className="relative">
                    <NavLink item={item} active={inSystems} compact={compact} onNavigate={onNavigate} />
                    {!compact && (
                      <button
                        type="button"
                        onClick={() => setSystemsOpen((open) => !open)}
                        aria-expanded={systemsExpanded}
                        aria-controls="systems-submenu"
                        aria-label={systemsExpanded ? "Recolher Sistemas" : "Expandir Sistemas"}
                        className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-fg-subtle hover:bg-white/[.06] hover:text-fg"
                      >
                        <span className={cx("transition-transform", systemsExpanded ? "rotate-90" : "")}>
                          <Icon name="chevron" size={13} />
                        </span>
                      </button>
                    )}
                  </div>
                  {systemsExpanded && (
                    <ul id="systems-submenu" className={cx("mt-0.5 flex flex-col gap-0.5", !compact && "ml-5 border-l border-line pl-2")}>
                      {systemsSubmenu.map((sub) => (
                        <li key={sub.label}>
                          <NavLink item={sub} active={isSystemsSubActive(sub.href!)} compact={compact} onNavigate={onNavigate} wrap />
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink item={item} active={isActive(item.href)} compact={compact} onNavigate={onNavigate} />
              )}
            </li>
          ))}
        </ul>
        <div className={cx("mt-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle/80", compact ? "sr-only" : "px-3")}>Minha conta</div>
        <ul className={cx("flex flex-col gap-0.5", compact && "mt-6 border-t border-line pt-4")}>
          {secondary.map((item) => (
            <li key={item.label}>
              <NavLink item={item} active={isActive(item.href)} compact={compact} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </nav>
      <div className={cx("shrink-0", compact ? "px-3 pb-4" : "px-4 pb-5")}>
        {compact ? (
          <NavLink item={helpItem} active={isActive(helpItem.href)} compact onNavigate={onNavigate} />
        ) : (
          <Link
            href="/help"
            onClick={onNavigate}
            aria-current={isActive("/help") ? "page" : undefined}
            className="flex h-12 items-center gap-3 rounded-xl border border-line bg-surface px-3.5 text-[13.5px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <span className="text-fg-subtle"><Icon name="help" size={18} /></span>
            <span className="flex-1">{helpItem.label}</span>
            <span className="text-fg-subtle"><Icon name="chevron" size={14} /></span>
          </Link>
        )}
        {!compact && (
          <div className="mt-6 px-1 text-[11px] leading-[18px] text-fg-subtle">
            <p>Copytrix v1.0.0</p>
            <p>Telegram to Results</p>
            <p>© 2026</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (mobileOpen) closeRef.current?.focus();
  }, [mobileOpen]);

  return (
    <>
      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-[#071522] transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-[240px]",
        )}
      >
        <div className={cx("flex h-16 shrink-0 items-center border-b border-line", collapsed ? "justify-center" : "px-5")}>
          <Logo compact={collapsed} />
        </div>
        <NavContent compact={collapsed} onNavigate={() => {}} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button aria-label="Fechar menu" tabIndex={-1} onClick={onCloseMobile} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside className="relative flex h-full w-[280px] max-w-[85vw] flex-col border-r border-line bg-[#071522] shadow-2xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <Logo compact={false} />
              <button
                ref={closeRef}
                onClick={onCloseMobile}
                aria-label="Fechar menu"
                className="flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg"
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <NavContent compact={false} onNavigate={onCloseMobile} />
          </aside>
        </div>
      )}
    </>
  );
}
