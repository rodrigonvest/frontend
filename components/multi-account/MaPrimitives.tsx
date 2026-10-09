"use client";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export const fieldClass =
  "h-10 w-full rounded-lg border border-line bg-canvas px-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand";

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        checked ? "bg-success" : "bg-surface-3",
      )}
    >
      <span
        aria-hidden
        className={cx("inline-block size-[18px] rounded-full bg-white shadow transition-transform", checked ? "translate-x-[23px]" : "translate-x-[3px]")}
      />
    </button>
  );
}

export function PencilGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="m14.5 7.5 3 3" />
    </svg>
  );
}

export function TrashGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function IconButton({ label, onClick, tone = "neutral", children }: { label: string; onClick?: () => void; tone?: "neutral" | "danger"; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cx(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        tone === "danger"
          ? "border-danger/40 bg-danger/10 text-danger hover:bg-danger/20"
          : "border-line bg-surface-2/60 text-fg-muted hover:border-brand hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function NumberBox({
  value,
  onChange,
  suffix,
  min = 0,
  max,
  label,
  className,
  decimals,
}: {
  value: number;
  onChange: (next: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  label: string;
  className?: string;
  decimals?: number;
}) {
  const format = (n: number) => (decimals === undefined ? String(n) : n.toFixed(decimals));
  const [draft, setDraft] = useState(format(value));
  const shown = draft === "" || Number(draft.replace(",", ".")) === value ? draft : format(value);

  return (
    <label className={cx("flex h-9 items-center rounded-md border border-line bg-canvas px-2.5 text-sm text-fg focus-within:border-brand", className)}>
      <span className="sr-only">{label}</span>
      <input
        inputMode="decimal"
        value={shown}
        onChange={(event) => {
          const text = event.target.value;
          if (!/^\d*[.,]?\d*$/.test(text)) return;
          setDraft(text);
          const parsed = parseFloat(text.replace(",", "."));
          if (Number.isNaN(parsed)) return;
          const clamped = Math.min(max ?? Infinity, Math.max(min, parsed));
          onChange(clamped);
        }}
        onBlur={() => setDraft(String(value))}
        className="tabular min-w-0 flex-1 bg-transparent text-right outline-none"
      />
      {suffix && <span className="ml-1.5 w-8 shrink-0 text-right text-fg-muted">{suffix}</span>}
    </label>
  );
}

export function ModalFrame({
  title,
  description,
  onClose,
  children,
  footer,
  size = "md",
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const titleId = useId();
  const closeRef = useRef(onClose);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx(
          "relative flex max-h-[90vh] w-full flex-col rounded-xl border border-line-strong bg-surface shadow-2xl outline-none",
          size === "sm" ? "max-w-md" : size === "lg" ? "max-w-3xl" : "max-w-xl",
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg font-semibold tracking-tight text-fg">
              {title}
            </h2>
            {description && <p className="mt-1 text-[13px] leading-5 text-fg-muted">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-white/[.06] hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Icon name="x" size={16} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <footer className="flex flex-wrap items-center justify-end gap-2.5 border-t border-line px-5 py-3.5">{footer}</footer>}
      </div>
    </div>
  );
}

export type MenuItem = {
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  tone?: "danger";
  separatorBefore?: boolean;
};

export function Menu({
  items,
  buttonClassName,
  ariaLabel,
  align = "right",
  width = 224,
  children,
}: {
  items: MenuItem[];
  buttonClassName?: string;
  ariaLabel?: string;
  align?: "left" | "right";
  width?: number;
  children: ReactNode;
}) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = position !== null;

  const close = useCallback(() => setPosition(null), []);

  const toggle = () => {
    if (open || !buttonRef.current) {
      close();
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const estimatedHeight = items.length * 38 + 12;
    const left = align === "right" ? Math.max(8, rect.right - width) : Math.min(rect.left, window.innerWidth - width - 8);
    const fitsBelow = window.innerHeight - rect.bottom > estimatedHeight + 12;
    setPosition({ left, top: fitsBelow ? rect.bottom + 6 : Math.max(8, rect.top - estimatedHeight - 6) });
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open, close]);

  return (
    <>
      <button ref={buttonRef} type="button" aria-haspopup="menu" aria-expanded={open} aria-label={ariaLabel} onClick={toggle} className={buttonClassName}>
        {children}
      </button>
      {open && position && (
        <div
          ref={panelRef}
          role="menu"
          style={{ top: position.top, left: position.left, width }}
          className="fixed z-[65] rounded-lg border border-line-strong bg-surface-2 p-1.5 shadow-2xl"
        >
          {items.map((item) => (
            <div key={item.label}>
              {item.separatorBefore && <div role="separator" className="my-1 h-px bg-line" />}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  item.onSelect();
                }}
                className={cx(
                  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-brand",
                  item.tone === "danger" ? "text-danger hover:bg-danger/10" : "text-fg hover:bg-white/[.06]",
                )}
              >
                {item.icon && <span className="flex size-4 shrink-0 items-center justify-center text-fg-muted">{item.icon}</span>}
                <span className="min-w-0 flex-1">{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[80] flex max-w-sm items-center gap-2.5 rounded-lg border border-success/40 bg-surface-2 px-4 py-3 text-[13px] text-fg shadow-2xl"
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
        <Icon name="check" size={12} stroke={2.6} />
      </span>
      {message}
    </div>
  );
}

export function PanelTitle({ icon, title, action }: { icon: ReactNode; title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex min-w-0 items-center gap-2.5 text-[15px] font-semibold text-fg">
        <span className="flex size-7 shrink-0 items-center justify-center text-brand">{icon}</span>
        <span className="truncate">{title}</span>
      </h2>
      {action}
    </div>
  );
}
