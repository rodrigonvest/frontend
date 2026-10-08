"use client";
import { cx } from "../UI";
import { NotificationCard } from "./NotificationFields";
import { SidebarLayoutIcon, TypographyIcon } from "./AppearanceIcons";
import { RadioCard } from "./AppearanceFields";
import { fontSizeOptions, sidebarLayoutOptions, type FontSizeId, type SidebarLayoutId } from "../../lib/appearance-demo";

export function TypographyCard({ value, onChange }: { value: FontSizeId; onChange: (next: FontSizeId) => void }) {
  return (
    <NotificationCard icon={<TypographyIcon />} title="Tipografia" description="Ajuste o tamanho da fonte da interface.">
      <div role="radiogroup" aria-label="Tamanho da fonte" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {fontSizeOptions.map((option) => {
          const selected = value === option.id;
          return (
            <RadioCard key={option.id} name="appearance-font-size" value={option.id} checked={selected} onChange={(v) => onChange(v as FontSizeId)} surfaceClassName="rounded-lg">
              <span className="flex h-[56px] items-center gap-3 px-4">
                <span
                  aria-hidden
                  className={cx("flex size-[26px] shrink-0 items-center justify-center rounded-full border-2", selected ? "border-brand bg-brand/15" : "border-line-strong")}
                >
                  {selected && <span className="size-3 rounded-full bg-brand shadow-[0_0_8px_rgba(21,154,242,.7)]" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-medium leading-5 text-fg">{option.label}</span>
                  <span className="block text-[12.5px] leading-4 text-fg-muted">({option.size})</span>
                </span>
              </span>
            </RadioCard>
          );
        })}
      </div>
    </NotificationCard>
  );
}

function SidebarSketch({ variant, selected }: { variant: SidebarLayoutId; selected: boolean }) {
  const accent = selected ? "bg-brand" : "bg-fg-subtle/60";
  const rail = selected ? "bg-brand/30" : "bg-fg-subtle/25";
  const rows = [0, 1, 2, 3];
  return (
    <span
      aria-hidden
      className={cx(
        "flex h-[66px] w-[84px] shrink-0 overflow-hidden rounded-md border bg-canvas/70",
        selected ? "border-brand/60" : "border-line-strong/60",
      )}
    >
      <span className={cx("flex h-full flex-col gap-[7px] border-r px-[5px] py-[7px]", selected ? "border-brand/40" : "border-line-strong/50", variant === "expanded" ? "w-[44%]" : variant === "compact" ? "w-[20%] items-center" : "w-[30%]")}>
        {rows.map((row) => (
          <span key={row} className="flex items-center gap-1">
            <span className={cx("size-[5px] shrink-0 rounded-[1px]", row === 0 ? accent : rail)} />
            {variant === "expanded" && <span className={cx("h-[3px] flex-1 rounded-full", row === 0 ? accent : rail)} />}
            {variant === "auto" && <span className={cx("h-[3px] w-[6px] rounded-full", rail)} />}
          </span>
        ))}
      </span>
      <span className="flex flex-1 flex-col gap-1.5 p-1.5">
        <span className={cx("h-[5px] w-full rounded-sm", rail)} />
        <span className={cx("h-full w-full rounded-sm", variant === "auto" ? "border border-dashed border-fg-subtle/40" : rail, "opacity-70")} />
      </span>
    </span>
  );
}

export function SidebarLayoutCard({ value, onChange }: { value: SidebarLayoutId; onChange: (next: SidebarLayoutId) => void }) {
  return (
    <NotificationCard icon={<SidebarLayoutIcon />} title="Layout da Sidebar" description="Escolha o estilo de exibição do menu lateral.">
      <div role="radiogroup" aria-label="Layout da sidebar" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {sidebarLayoutOptions.map((option) => {
          const selected = value === option.id;
          return (
            <RadioCard key={option.id} name="appearance-sidebar-layout" value={option.id} checked={selected} showBadge onChange={(v) => onChange(v as SidebarLayoutId)} surfaceClassName="rounded-lg">
              <span className="flex min-h-[104px] items-center gap-3 px-3 py-3">
                <SidebarSketch variant={option.id} selected={selected} />
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold leading-5 text-fg">{option.label}</span>
                  <span className="block text-[11.5px] leading-4 text-fg-muted">{option.description}</span>
                </span>
              </span>
            </RadioCard>
          );
        })}
      </div>
    </NotificationCard>
  );
}
