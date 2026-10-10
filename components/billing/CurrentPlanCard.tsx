"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { CURRENT_PLAN } from "../../lib/billing-data";
import { BillingIcon } from "./BillingIcons";
import { FOCUS_RING, SURFACE } from "./BillingPrimitives";

interface MenuItem {
  label: string;
  onSelect: () => void;
}

function MoreMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const closeAndRestore = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const entries = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const index = entries.indexOf(document.activeElement as HTMLElement);
    const moves: Record<string, number> = {
      ArrowDown: (index + 1) % entries.length,
      ArrowUp: (index - 1 + entries.length) % entries.length,
      Home: 0,
      End: entries.length - 1,
    };
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestore();
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key in moves) {
      event.preventDefault();
      entries[moves[event.key]]?.focus();
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label="Mais ações da assinatura"
        onClick={() => setOpen((value) => !value)}
        className={cx(
          "flex h-11 w-12 items-center justify-center rounded-lg border border-line-strong bg-canvas/40 text-fg transition-colors hover:border-brand hover:bg-brand/10",
          FOCUS_RING,
        )}
      >
        <Icon name="more" size={18} />
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Mais ações da assinatura"
          onKeyDown={onMenuKeyDown}
          className="absolute bottom-full right-0 z-20 mb-2 w-64 rounded-xl border border-line-strong bg-surface-2 p-1.5 shadow-2xl shadow-black/60"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                closeAndRestore();
                item.onSelect();
              }}
              className="flex h-10 w-full items-center rounded-lg px-3 text-left text-[13px] text-fg-muted outline-none transition-colors hover:bg-white/[.06] hover:text-fg focus-visible:bg-white/[.08] focus-visible:text-fg"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  onManage: () => void;
  onCancel: (trigger: HTMLElement) => void;
  onMenuAction: (message: string) => void;
}

export default function CurrentPlanCard({ onManage, onCancel, onMenuAction }: Props) {
  return (
    <section aria-labelledby="current-plan-title" className={cx(SURFACE, "flex flex-col gap-5 p-4 sm:p-5")}>
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-warning/40 bg-gradient-to-br from-[#6f4c10] to-[#2c200a] text-warning shadow-[0_0_24px_-6px_rgba(240,195,92,.55)] sm:size-[72px]"
        >
          <Icon name="crown" size={38} stroke={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 id="current-plan-title" className="text-[22px] font-semibold tracking-tight text-fg">
              Seu Plano Atual
            </h2>
            <span className="rounded-lg border border-warning/70 bg-warning/5 px-3 py-0.5 text-[15px] font-bold tracking-wide text-warning">
              {CURRENT_PLAN.name.toUpperCase()}
            </span>
          </div>
          <p className="mt-2 max-w-md text-pretty text-[14.5px] leading-6 text-fg-muted">{CURRENT_PLAN.description}</p>
        </div>
        <span className="hidden shrink-0 items-center gap-2 rounded-lg border border-success/40 bg-success-soft/70 px-3.5 py-1.5 text-[13.5px] font-semibold text-success sm:inline-flex">
          <span aria-hidden className="size-2 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.9)]" />
          <span className="sr-only">Status da assinatura: </span>
          {CURRENT_PLAN.status}
        </span>
      </div>

      <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-success/40 bg-success-soft/70 px-3 py-1 text-[13px] font-semibold text-success sm:hidden">
        <span aria-hidden className="size-2 rounded-full bg-success" />
        <span className="sr-only">Status da assinatura: </span>
        {CURRENT_PLAN.status}
      </span>

      <dl className="grid gap-3 sm:grid-cols-3">
        {CURRENT_PLAN.details.map((detail) => (
          <div key={detail.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-canvas/35 p-3.5">
            <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand/12 text-brand">
              <BillingIcon name={detail.icon} size={22} />
            </span>
            <div className="min-w-0">
              <dt className="text-[12.5px] text-fg-muted">{detail.label}</dt>
              <dd className="tabular mt-0.5 text-[19px] font-semibold leading-tight text-fg">{detail.value}</dd>
              <dd className="mt-0.5 text-[12px] text-fg-subtle">{detail.note}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onManage}
          className={cx(
            "flex h-11 min-w-[170px] basis-full items-center justify-center gap-2 rounded-lg bg-brand-strong px-5 text-[14px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand sm:basis-0 sm:flex-1",
            FOCUS_RING,
          )}
        >
          <Icon name="settings" size={18} />
          Gerenciar Assinatura
        </button>
        <button
          type="button"
          onClick={(event) => onCancel(event.currentTarget)}
          className={cx(
            "flex h-11 min-w-[170px] flex-1 basis-0 items-center justify-center gap-2 rounded-lg border border-line-strong bg-canvas/40 px-5 text-[14px] font-medium text-fg transition-colors hover:border-danger/60 hover:bg-danger/10",
            FOCUS_RING,
          )}
        >
          <Icon name="x" size={18} />
          Cancelar Assinatura
        </button>
        <MoreMenu
          items={[
            { label: "Alterar ciclo de cobrança", onSelect: () => onMenuAction("Alteração de ciclo de cobrança simulada") },
            { label: "Baixar última fatura", onSelect: () => onMenuAction("Download da última fatura simulado") },
            { label: "Ver política de cancelamento", onSelect: () => onMenuAction("Política de cancelamento simulada") },
          ]}
        />
      </div>
    </section>
  );
}
