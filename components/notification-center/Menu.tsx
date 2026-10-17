"use client";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";

export type MenuOption = { id: string; label: string; icon?: string; danger?: boolean };

type MenuProps = {
  menuLabel: string;
  triggerLabel?: string;
  triggerClassName: string;
  children: ReactNode;
  options: MenuOption[];
  onSelect: (id: string) => void;
  /** When provided the menu behaves as a single-choice list (menuitemradio). */
  selectedId?: string;
  align?: "left" | "right";
  className?: string;
};

export default function Menu({
  menuLabel,
  triggerLabel,
  triggerClassName,
  children,
  options,
  onSelect,
  selectedId,
  align = "right",
  className,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const initialIndex = useRef(0);
  const menuId = useId();
  const isRadio = selectedId !== undefined;

  const closeAndRestore = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const openMenu = (index?: number) => {
    initialIndex.current = index ?? (isRadio ? Math.max(0, options.findIndex((o) => o.id === selectedId)) : 0);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    itemRefs.current[initialIndex.current]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const focusItem = (index: number) => {
    const total = options.length;
    itemRefs.current[((index % total) + total) % total]?.focus();
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = itemRefs.current.findIndex((el) => el === document.activeElement);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(options.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        closeAndRestore();
        break;
      case "Tab":
        triggerRef.current?.focus();
        setOpen(false);
        break;
    }
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(options.length - 1);
    }
  };

  return (
    <div ref={rootRef} className={cx("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={triggerLabel}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName}
      >
        {children}
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={menuLabel}
          onKeyDown={onPanelKeyDown}
          className={cx(
            "absolute z-30 mt-2 min-w-[13rem] max-w-[calc(100vw-2rem)] rounded-lg border border-line-strong bg-surface-2 p-1 shadow-2xl shadow-black/50",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {options.map((option, index) => {
            const checked = isRadio && option.id === selectedId;
            return (
              <button
                key={option.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role={isRadio ? "menuitemradio" : "menuitem"}
                aria-checked={isRadio ? checked : undefined}
                tabIndex={-1}
                onClick={() => {
                  onSelect(option.id);
                  closeAndRestore();
                }}
                className={cx(
                  "flex min-h-10 w-full items-center gap-2.5 rounded-md px-3 text-left text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand",
                  option.danger ? "text-danger hover:bg-danger/10" : "text-fg-muted hover:bg-white/[.06] hover:text-fg",
                  checked && "text-fg",
                )}
              >
                {option.icon && (
                  <span aria-hidden className="shrink-0">
                    <Icon name={option.icon} size={16} />
                  </span>
                )}
                <span className="flex-1">{option.label}</span>
                {checked && (
                  <span aria-hidden className="shrink-0 text-brand">
                    <Icon name="check" size={15} stroke={2.4} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
