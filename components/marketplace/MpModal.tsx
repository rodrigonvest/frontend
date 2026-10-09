"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MpModal({
  titleId,
  title,
  subtitle,
  onClose,
  children,
  footer,
  wide = false,
}: {
  titleId: string;
  title: ReactNode;
  subtitle?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <button type="button" aria-label="Fechar" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx(
          "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-surface shadow-[0_24px_80px_rgba(0,0,0,.6)] outline-none sm:rounded-2xl",
          wide ? "sm:max-w-[920px]" : "sm:max-w-[560px]",
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line bg-gradient-to-b from-surface-2/70 to-surface px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-semibold leading-6 tracking-tight text-fg">
              {title}
            </h2>
            {subtitle && <div className="mt-1 text-[12.5px] text-fg-muted">{subtitle}</div>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-muted hover:bg-white/[.06] hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Icon name="x" size={16} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <footer className="flex flex-wrap items-center justify-end gap-2.5 border-t border-line bg-surface-2/40 px-5 py-3.5 sm:px-6">{footer}</footer>}
      </div>
    </div>
  );
}
