"use client";
import { useEffect, useId, useRef, useState, type ReactNode, type SelectHTMLAttributes } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import type { Direction, Outcome, SignalStatus } from "../../lib/replay-data";

type GlyphProps = { size?: number; className?: string };

export function PlayGlyph({ size = 16, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7 4.6v14.8a.8.8 0 0 0 1.2.7l12-7.4a.8.8 0 0 0 0-1.4l-12-7.4A.8.8 0 0 0 7 4.6Z" />
    </svg>
  );
}

export function PauseGlyph({ size = 16, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="4.5" width="4.2" height="15" rx="1.2" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="1.2" />
    </svg>
  );
}

export function SkipBackGlyph({ size = 16, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="4.5" y="5" width="2.6" height="14" rx="1" />
      <path d="M19.5 6v12a.7.7 0 0 1-1.1.6l-8.6-6a.7.7 0 0 1 0-1.2l8.6-6A.7.7 0 0 1 19.5 6Z" />
    </svg>
  );
}

export function SkipForwardGlyph({ size = 16, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="16.9" y="5" width="2.6" height="14" rx="1" />
      <path d="M4.5 6v12a.7.7 0 0 0 1.1.6l8.6-6a.7.7 0 0 0 0-1.2l-8.6-6A.7.7 0 0 0 4.5 6Z" />
    </svg>
  );
}

export function StopGlyph({ size = 16, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2.2" />
    </svg>
  );
}

export function FlameGlyph({ size = 14, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 22c4.4 0 7-2.9 7-6.6 0-2.7-1.4-4.6-3-6.4-.3 1.2-1 2.2-2 2.8.3-3.2-1.2-6.2-4-8.3.2 3-1.2 4.6-2.6 6.2C6 11.5 5 13.1 5 15.4 5 19.1 7.6 22 12 22Z" />
    </svg>
  );
}

export function ThumbGlyph({ size = 14, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M2 10.5a1 1 0 0 1 1-1h3.2v11H3a1 1 0 0 1-1-1v-9Zm5.8-.3 3.5-7c1.8 0 2.9 1.3 2.5 3.1l-.7 3.2h6a2 2 0 0 1 2 2.4l-1.4 6.2a2.4 2.4 0 0 1-2.3 1.9H7.8V10.2Z" />
    </svg>
  );
}

export function HeartGlyph({ size = 14, className }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.6 8 3.3 4.8 6.6 4.5c2-.2 3.7.8 5.4 2.9 1.7-2.1 3.4-3.1 5.4-2.9 3.3.3 5 3.5 3.9 6.6-1.8 4.8-9.3 9.4-9.3 9.4Z" />
    </svg>
  );
}

export function RpSelect({ className, children, icon, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { icon?: ReactNode }) {
  return (
    <span className={cx("relative block", className)}>
      {icon && (
        <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
          {icon}
        </span>
      )}
      <select
        {...props}
        className={cx(
          "h-10 w-full cursor-pointer appearance-none rounded-lg border border-line-strong bg-surface pr-8 text-[13px] text-fg outline-none transition-colors [color-scheme:dark] hover:border-brand/50 focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/60",
          icon ? "pl-9" : "pl-3",
        )}
      >
        {children}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-subtle">
        <Icon name="chevronDown" size={14} />
      </span>
    </span>
  );
}

export function Popover({
  label,
  align = "left",
  panelClassName,
  renderTrigger,
  children,
}: {
  label: string;
  align?: "left" | "right";
  panelClassName?: string;
  renderTrigger: (state: { open: boolean; toggle: () => void; panelId: string }) => ReactNode;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector<HTMLElement>("[data-popover-trigger]")?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {renderTrigger({ open, toggle: () => setOpen((value) => !value), panelId })}
      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={label}
          className={cx(
            "absolute top-full z-30 mt-2 rounded-xl border border-line-strong bg-surface-2 p-2 shadow-2xl shadow-black/50",
            align === "right" ? "right-0" : "left-0",
            panelClassName,
          )}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function RpToggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group inline-flex items-center gap-2.5 rounded-md text-[12.5px] text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span
        aria-hidden
        className={cx(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
          checked ? "border-brand bg-brand-strong" : "border-line-strong bg-surface-3",
        )}
      >
        <span className={cx("absolute top-0.5 size-3.5 rounded-full bg-white shadow transition-[left]", checked ? "left-[18px]" : "left-0.5")} />
      </span>
      {label}
    </button>
  );
}

export function AssetBadge({ asset, size = 32 }: { asset: string; size?: number }) {
  const palette: Record<string, string> = {
    XAUUSD: "from-[#f6d77a] to-[#8a6a1c] text-[#3a2a05]",
    EURUSD: "from-[#5cc2ff] to-[#0b3a5c] text-white",
    BTCUSDT: "from-[#ffb455] to-[#a65a0c] text-[#3a1d03]",
    US100: "from-[#6ee7c5] to-[#0b5a49] text-[#032a21]",
  };
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cx("flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold ring-2 ring-white/10", palette[asset] ?? palette.EURUSD)}
    >
      {asset.slice(0, 2)}
    </span>
  );
}

const accentStyles = {
  blue: "bg-brand/15 text-brand",
  green: "bg-success/15 text-success",
  red: "bg-danger/15 text-danger",
  amber: "bg-warning/15 text-warning",
  purple: "bg-[#9b63ff]/15 text-[#a77bff]",
  gold: "bg-warning/15 text-success",
};

export function SummaryCard({
  label,
  value,
  note,
  icon,
  accent,
  valueTone = "text-fg",
  noteTone = "text-fg-subtle",
}: {
  label: string;
  value: string;
  note?: string;
  icon: ReactNode;
  accent: keyof typeof accentStyles;
  valueTone?: string;
  noteTone?: string;
}) {
  return (
    <div className="flex min-h-[84px] min-w-0 items-center gap-3 rounded-xl border border-line bg-gradient-to-b from-surface-2/70 to-surface px-3.5 py-3.5">
      <span className={cx("flex size-11 shrink-0 items-center justify-center rounded-xl", accentStyles[accent])}>{icon}</span>
      <div className="min-w-0">
        <div className="truncate text-[12.5px] leading-4 text-fg-muted">{label}</div>
        <div className={cx("tabular mt-1 truncate text-[22px] font-semibold leading-none tracking-tight", valueTone)}>{value}</div>
        {note && <div className={cx("tabular mt-1.5 truncate text-[12px] leading-4", noteTone)}>{note}</div>}
      </div>
    </div>
  );
}

export function DirectionLabel({ direction }: { direction: Direction }) {
  const buy = direction === "Buy";
  return (
    <span className={cx("inline-flex items-center gap-1.5 font-medium", buy ? "text-success" : "text-danger")}>
      <span aria-hidden className={cx("inline-flex", buy ? "-rotate-45" : "rotate-45")}>
        <Icon name="arrowRight" size={14} stroke={2.4} />
      </span>
      {direction}
    </span>
  );
}

export function StatusBadge({ status }: { status: SignalStatus }) {
  return (
    <span
      className={cx(
        "inline-flex h-6 items-center whitespace-nowrap rounded-md border px-2.5 text-[11px] font-semibold",
        status === "Executado" ? "border-success/45 bg-success/15 text-success" : "border-danger bg-danger text-white",
      )}
    >
      {status}
    </span>
  );
}

export function outcomeTone(outcome: Outcome) {
  if (outcome === "SL") return "text-danger";
  if (outcome === "TP1") return "text-warning";
  return "text-success";
}
