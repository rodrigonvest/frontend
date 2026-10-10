"use client";
import { useEffect, useId, useRef } from "react";
import { Icon } from "../Icons";
import { HOW_IT_WORKS } from "../../lib/copytrix-ai-data";
import { IconTile, PrimaryButton } from "./AiPrimitives";

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function HowItWorksModal({ open, returnFocusTo, onClose }: { open: boolean; returnFocusTo: HTMLElement | null; onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto w-full max-w-[520px] rounded-2xl border border-line-strong bg-surface-2 p-5 shadow-2xl shadow-black/60 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconTile name="sparkles" accent="purple" size={22} className="size-11" />
            <h2 id={titleId} className="text-balance text-lg font-semibold tracking-tight text-fg">
              Como o Copytrix AI funciona
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/[.06] hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <ol className="mt-5 space-y-3">
          {HOW_IT_WORKS.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3 rounded-lg border border-line bg-canvas/40 p-3">
              <span aria-hidden className="tabular flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[13px] font-semibold text-brand">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-fg">{step.title}</h3>
                <p className="mt-0.5 text-pretty text-[12.5px] leading-5 text-fg-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <PrimaryButton ref={confirmRef} onClick={onClose} className="mt-5 w-full">
          Entendi
        </PrimaryButton>
      </div>
    </div>
  );
}
