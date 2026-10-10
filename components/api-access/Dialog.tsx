"use client";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { Icon } from "../Icons";
import { IconTile, PrimaryButton, type Accent } from "../copytrix-ai/AiPrimitives";
import { Button, cx } from "../UI";

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  icon: string;
  accent?: Accent;
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ open, title, description, icon, accent = "blue", returnFocusTo, onClose, children }: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const returnFocusRef = useRef(returnFocusTo);
  const pointerStartedOnBackdrop = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
    returnFocusRef.current = returnFocusTo;
  });

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const preferred = dialog?.querySelector<HTMLElement>("[data-autofocus]");
    (preferred ?? dialog?.querySelector<HTMLElement>(FOCUSABLE))?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
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
      const target = returnFocusRef.current;
      if (target?.isConnected) target.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm"
      onPointerDown={(event) => {
        pointerStartedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && pointerStartedOnBackdrop.current) onClose();
        pointerStartedOnBackdrop.current = false;
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="my-auto w-full max-w-[480px] rounded-2xl border border-line-strong bg-surface-2 p-5 shadow-2xl shadow-black/60 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <IconTile name={icon} accent={accent} size={22} className="size-11" />
            <h2 id={titleId} className="text-balance text-lg font-semibold tracking-tight text-fg">
              {title}
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
        {description && (
          <p id={descriptionId} className="mt-4 text-pretty text-[13.5px] leading-6 text-fg-muted">
            {description}
          </p>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

interface ConfirmDialogProps extends Omit<DialogProps, "children"> {
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
}

export function ConfirmDialog({ confirmLabel, danger = false, onConfirm, onClose, ...dialog }: ConfirmDialogProps) {
  return (
    <Dialog {...dialog} onClose={onClose}>
      <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Button data-autofocus onClick={onClose} className="h-10 px-5">
          Cancelar
        </Button>
        {danger ? (
          <button
            type="button"
            onClick={onConfirm}
            className={cx(
              "flex h-10 items-center justify-center gap-2 rounded-lg border border-danger/50 bg-danger-soft px-5 text-[13.5px] font-semibold text-[#ff8a96] transition-colors hover:bg-danger/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger",
            )}
          >
            {confirmLabel}
          </button>
        ) : (
          <PrimaryButton onClick={onConfirm}>{confirmLabel}</PrimaryButton>
        )}
      </div>
    </Dialog>
  );
}
