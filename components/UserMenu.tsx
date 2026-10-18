"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AccountIcon } from "./account/AccountIcons";
import { Icon } from "./Icons";
import { cx } from "./UI";
import { ToastRegion, useToast } from "./api-access/Toast";

type MenuLink = { icon: string; label: string; href: string; matches: string[] };

const MENU_LINKS: MenuLink[] = [
  { icon: "user", label: "Minha Conta", href: "/account", matches: ["/account"] },
  { icon: "settings", label: "Configurações", href: "/settings", matches: ["/settings"] },
  { icon: "dollar", label: "Plano e Cobrança", href: "/billing", matches: ["/billing"] },
  { icon: "shield", label: "Segurança", href: "/settings/security/connection-history", matches: ["/settings/security"] },
];

const ITEM_BASE =
  "flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 text-left text-[14px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand";

export default function UserMenu({ name, role }: { name: string; role: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const { toast, notify } = useToast();
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;
  const initial = name.charAt(0);
  const itemCount = MENU_LINKS.length + 1;

  // Only the most specific match is active, so "/settings/security" does not also highlight "/settings".
  let activeHref: string | null = null;
  let longestMatch = -1;
  for (const link of MENU_LINKS) {
    for (const m of link.matches) {
      if ((pathname === m || pathname.startsWith(`${m}/`)) && m.length > longestMatch) {
        longestMatch = m.length;
        activeHref = link.href;
      }
    }
  }
  const isActive = (link: MenuLink) => link.href === activeHref;

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const focusItem = (index: number) => itemRefs.current[(index + itemCount) % itemCount]?.focus();

  useEffect(() => {
    if (!open) return;
    const activeIndex = MENU_LINKS.findIndex(isActive);
    itemRefs.current[activeIndex >= 0 ? activeIndex : 0]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = itemRefs.current.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(itemCount - 1);
    } else if (e.key === "Tab") {
      close(true);
    }
  };

  const onLogout = () => {
    close(true);
    notify("Saída demonstrativa: não há autenticação real neste ambiente.", "info");
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Menu do usuário ${name}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cx(
          "flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 hover:bg-white/[.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          open && "bg-white/[.04]",
        )}
      >
        <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-[#e6eaef] text-[14px] font-bold text-[#28313a]">
          {initial}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[13px] font-semibold text-fg">{name}</span>
          <span className="block text-[11px] text-fg-subtle">{role}</span>
        </span>
        <span aria-hidden className={cx("hidden text-fg-subtle transition-transform sm:block", open && "rotate-180")}>
          <Icon name="chevronDown" size={15} />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[270px] max-w-[calc(100vw-1.5rem)] rounded-xl border border-brand/40 bg-[#071522]/95 p-2 shadow-[0_16px_48px_rgba(0,0,0,.6),0_0_24px_rgba(21,154,242,.12)] backdrop-blur-xl">
          <div className="flex items-center gap-3 px-2.5 pb-3 pt-2">
            <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-strong text-[18px] font-bold text-white">
              {initial}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-semibold text-fg">{name}</span>
              <span className="mt-0.5 block truncate text-[12px] text-fg-subtle">{role}</span>
            </span>
          </div>
          <div role="separator" aria-orientation="horizontal" className="mx-1 mb-2 h-px bg-line" />

          <div id={menuId} role="menu" aria-labelledby={triggerId} onKeyDown={onMenuKeyDown} className="flex flex-col gap-1">
            {MENU_LINKS.map((link, i) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={link.href}
                  role="menuitem"
                  tabIndex={-1}
                  aria-current={active ? "page" : undefined}
                  onClick={() => close(false)}
                  className={cx(
                    ITEM_BASE,
                    active
                      ? "border-brand/40 bg-brand-soft/70 text-fg"
                      : "border-transparent text-fg-muted hover:bg-white/[.05] hover:text-fg focus-visible:bg-white/[.05] focus-visible:text-fg",
                  )}
                >
                  <span aria-hidden className={active ? "text-brand" : "text-fg-subtle"}>
                    {link.icon === "user" ? <AccountIcon name="user" size={18} stroke={1.9} /> : <Icon name={link.icon} size={18} stroke={1.9} />}
                  </span>
                  {link.label}
                </Link>
              );
            })}

            <div role="separator" aria-orientation="horizontal" className="mx-1 my-1 h-px bg-line" />

            <button
              ref={(el) => {
                itemRefs.current[MENU_LINKS.length] = el;
              }}
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={onLogout}
              className={cx(ITEM_BASE, "border-danger/40 bg-danger/10 text-danger hover:bg-danger/20 focus-visible:bg-danger/20 focus-visible:ring-danger")}
            >
              <span aria-hidden>
                <Icon name="logout" size={18} stroke={1.9} />
              </span>
              Sair
            </button>
          </div>
        </div>
      )}
      <ToastRegion toast={toast} />
    </div>
  );
}
