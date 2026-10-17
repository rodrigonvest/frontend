"use client";
import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icons";
import { cx } from "./UI";
import { ToastRegion, useToast } from "./api-access/Toast";
import {
  NOTIFICATIONS_CENTER_HREF,
  notificationPreviewsDemo,
  type NotificationPreview,
  type NotificationPreviewKind,
} from "../lib/notification-dropdown-demo";

function RocketIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3c3.5 1.6 5.5 5 5.5 9.2 0 1.3-.3 2.6-.8 3.8H7.3a9.6 9.6 0 0 1-.8-3.8C6.5 8 8.5 4.6 12 3Z" fill="currentColor" fillOpacity={0.25} />
      <circle cx="12" cy="10" r="1.8" />
      <path d="M7.3 16 4.5 18.5l.5-4 2.3-2" />
      <path d="m16.7 16 2.8 2.5-.5-4-2.3-2" />
      <path d="M10 19.5c.4 1 1 1.6 2 2 1-.4 1.6-1 2-2" />
    </svg>
  );
}

function MegaphoneIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10.5v3a1 1 0 0 0 1 1h2.5l8 4.5V5L6.5 9.5H4a1 1 0 0 0-1 1Z" fill="currentColor" fillOpacity={0.25} />
      <path d="M18 9.5a4 4 0 0 1 0 5" />
      <path d="M7 14.5 8.2 19h2.3L9.7 15.5" />
    </svg>
  );
}

const KIND_STYLES: Record<NotificationPreviewKind, { box: string; icon: () => ReactNode }> = {
  copiedTrade: { box: "bg-[#3a1626] text-[#ff5d6d]", icon: () => <RocketIcon /> },
  takeProfit: { box: "bg-[#0a3a38] text-[#12d99e]", icon: () => <Icon name="growth" size={22} stroke={2} /> },
  systemDown: { box: "bg-[#3a1220] text-[#ff4d5e]", icon: () => <Icon name="alert" size={22} stroke={2.2} /> },
  announcement: { box: "bg-[#2a1450] text-[#b57bff]", icon: () => <MegaphoneIcon /> },
  signal: { box: "bg-[#0b3a66] text-[#2aa3ff]", icon: () => <Icon name="telegram" size={22} /> },
};

function BellBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span aria-hidden className="absolute right-1 top-1 flex size-[18px] items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-[#071522]">
      {count}
    </span>
  );
}

function NotificationRow({ item, onSelect }: { item: NotificationPreview; onSelect: () => void }) {
  const style = KIND_STYLES[item.kind];
  return (
    <li className="border-b border-line/70 last:border-b-0">
      <Link
        href={item.href}
        onClick={onSelect}
        className="flex items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-white/[.04] focus-visible:bg-white/[.05] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
      >
        <span aria-hidden className="flex w-2 shrink-0 justify-center">
          {item.unread && <span className="size-2 rounded-full bg-brand shadow-[0_0_8px_rgba(21,154,242,.8)]" />}
        </span>
        <span aria-hidden className={cx("flex size-12 shrink-0 items-center justify-center rounded-xl", style.box)}>
          {style.icon()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-[14.5px] font-semibold text-fg">
              {item.unread && <span className="sr-only">Não lida: </span>}
              {item.title}
            </span>
            <span className="shrink-0 whitespace-nowrap text-[12px] text-fg-muted">{item.time}</span>
          </span>
          <span className="mt-0.5 block truncate text-[12.5px] text-fg-muted">{item.description}</span>
        </span>
      </Link>
    </li>
  );
}

export default function NotificationDropdown({
  notifications = notificationPreviewsDemo,
}: {
  notifications?: NotificationPreview[];
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const [caretRight, setCaretRight] = useState(24);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { toast, notify } = useToast();
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const titleId = `${baseId}-title`;
  const unreadCount = items.filter((n) => n.unread).length;

  useEffect(() => setItems(notifications), [notifications]);
  useEffect(() => setMounted(true), []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (!trigger || !panel) return;
      const center = trigger.left + trigger.width / 2;
      setCaretRight(Math.min(Math.max(panel.right - center, 20), panel.width - 20));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
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

  const markAllRead = () => {
    if (unreadCount === 0) return;
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    notify("Todas as notificações foram marcadas como lidas (demonstrativo).", "success");
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={unreadCount > 0 ? `Notificações (${unreadCount} não lidas)` : "Notificações"}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "relative flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.05] hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          open && "bg-white/[.05] text-fg",
        )}
      >
        <Icon name="bell" size={19} />
        <BellBadge count={unreadCount} />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-labelledby={titleId}
          className="fixed right-3 top-[72px] z-50 w-[min(500px,calc(100vw-1.5rem))] rounded-2xl border border-brand/40 bg-[#071522] shadow-[0_24px_64px_rgba(0,0,0,.65),0_0_32px_rgba(21,154,242,.14)] backdrop-blur-xl sm:right-6 lg:right-8"
        >
          <span
            aria-hidden
            style={{ right: caretRight - 6 }}
            className="absolute -top-[7px] size-3 rotate-45 border-l border-t border-brand/40 bg-[#071522]"
          />

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-3.5">
            <div className="flex items-baseline gap-3">
              <h2 id={titleId} className="text-[20px] font-bold tracking-tight text-fg">
                Notificações
              </h2>
              <span aria-live="polite" className="text-[12.5px] font-medium text-danger">
                {unreadCount === 0 ? "Tudo lido" : unreadCount === 1 ? "1 não lida" : `${unreadCount} não lidas`}
              </span>
            </div>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="rounded text-[13px] font-medium text-brand underline underline-offset-2 outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
            >
              Marcar todas como lidas
            </button>
          </div>

          <ul className="max-h-[calc(100dvh-260px)] overflow-y-auto">
            {items.map((item) => (
              <NotificationRow key={item.id} item={item} onSelect={() => close(false)} />
            ))}
          </ul>

          <div className="border-t border-line p-3">
            <Link
              href={NOTIFICATIONS_CENTER_HREF}
              onClick={() => close(false)}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-brand bg-brand-strong/25 text-[14.5px] font-semibold text-white shadow-[0_0_18px_rgba(21,154,242,.18)] outline-none transition-colors hover:bg-brand-strong/40 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#071522]"
            >
              Ver todas as notificações
              <Icon name="arrowRight" size={17} stroke={2.2} />
            </Link>
          </div>
        </div>
      )}
      {mounted && createPortal(<ToastRegion toast={toast} />, document.body)}
    </div>
  );
}
