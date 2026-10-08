"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icon } from "./Icons";
import { cx } from "./UI";

type NavItem = { icon: string; label: string; href?: string; soon?: boolean };

const primary: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", href: "/" },
  { icon: "trades", label: "Operações", href: "/trades" },
  { icon: "telegram", label: "Canais Telegram", href: "/connectors" },
  { icon: "accounts", label: "Contas", href: "/accounts" },
  { icon: "systems", label: "Sistemas", href: "/automations" },
  { icon: "analytics", label: "Desempenho", href: "/analytics" },
  { icon: "backtest", label: "Backtest", href: "/backtester" },
  { icon: "logs", label: "Logs", soon: true },
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
      <span className="flex size-[40px] shrink-0 items-center justify-center overflow-visible text-brand">
        <svg width="44" height="44" viewBox="0 0 27 27" fill="none" aria-hidden>
          <path d="M22.6 9.2a9.8 9.8 0 1 1-4.1-4.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="m8 13.8 3.2 3.2L22.7 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block text-[32px] font-bold leading-none tracking-tight text-fg">Copytrix</span>
          <span className="mt-1.5 block whitespace-nowrap text-[8.5px] font-semibold uppercase tracking-[0.2em] text-brand">Telegram to Results</span>
        </span>
      )}
    </Link>
  );
}

function NavLink({
  item,
  active,
  compact,
  dense,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  compact: boolean;
  dense?: boolean;
  onNavigate: () => void;
}) {
  const base = cx(
    "group relative flex items-center whitespace-nowrap text-[13.5px] transition-colors",
    dense ? "h-11" : "h-12",
    compact ? "justify-center rounded-lg px-0" : "gap-4 rounded-r-xl pl-[26px] pr-3",
  );
  const content = (
    <>
      {active && <span aria-hidden className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r bg-brand" />}
      <span className={cx("flex size-6 shrink-0 items-center justify-center", item.icon === "telegram" && "telegram-nav-icon", active ? "text-brand" : "text-fg-muted group-hover:text-fg")}>
        <Icon name={item.icon} size={22} stroke={item.icon === "telegram" ? 1.7 : 1.8} />
      </span>
      {!compact && <span className="truncate">{item.label}</span>}
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
      className={cx(base, active ? "bg-brand-strong/35 font-medium text-fg" : "text-fg/90 hover:bg-white/[.04] hover:text-fg")}
    >
      {content}
    </Link>
  );
}

function NavContent({ compact, onNavigate }: { compact: boolean; onNavigate: () => void }) {
  const pathname = usePathname();
  const isActive = (href?: string) => (href ? (href === "/" ? pathname === "/" : pathname.startsWith(href)) : false);
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <nav aria-label="Navegação principal" className={cx("shrink-0 pt-4", compact ? "px-3" : "pr-3")}>
        <ul className="flex flex-col gap-[3.75px]">
          {primary.map((item) => (
            <li key={item.label}>
              <NavLink item={item} active={isActive(item.href)} compact={compact} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
        <div className={cx("mb-1.5 mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle/80", compact ? "sr-only" : "pl-[26px]")}>Conta</div>
        <ul className={cx("flex flex-col gap-[3.75px]", compact && "mt-6 border-t border-line pt-4")}>
          {secondary.map((item) => (
            <li key={item.label}>
              <NavLink item={item} active={isActive(item.href)} compact={compact} dense onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </nav>
      <div className={cx("shrink-0 px-3", compact ? "mt-auto pb-4 pt-4" : "pt-[18px]")}>
        {compact ? (
          <NavLink item={helpItem} active={isActive(helpItem.href)} compact onNavigate={onNavigate} />
        ) : (
          <Link
            href="/help"
            onClick={onNavigate}
            aria-current={isActive("/help") ? "page" : undefined}
            className="flex h-[53px] items-center gap-3 whitespace-nowrap rounded-xl border border-line bg-surface px-3.5 text-[13.5px] text-fg/90 transition-colors hover:border-line-strong hover:text-fg"
          >
            <span className="text-fg-muted"><Icon name="help" size={22} /></span>
            <span className="flex-1">{helpItem.label}</span>
            <span className="text-fg-muted"><Icon name="chevron" size={15} /></span>
          </Link>
        )}
      </div>
      {!compact && (
        <div className="mt-auto shrink-0 px-[26px] pb-6 pt-6 text-[13px] leading-[19.5px] text-fg-subtle">
          <p>Copytrix v1.0.0</p>
          <p>Telegram to Results</p>
          <p>© 2026</p>
        </div>
      )}
    </div>
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
          collapsed ? "w-[76px]" : "w-[220px]",
        )}
      >
        <div className={cx("flex h-[70px] shrink-0 items-center border-b border-line", collapsed ? "justify-center" : "pl-[22px] pr-3")}>
          <Logo compact={collapsed} />
        </div>
        <NavContent compact={collapsed} onNavigate={() => {}} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button aria-label="Fechar menu" tabIndex={-1} onClick={onCloseMobile} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside className="relative flex h-full w-[280px] max-w-[85vw] flex-col border-r border-line bg-[#071522] shadow-2xl">
            <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-line px-5">
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
