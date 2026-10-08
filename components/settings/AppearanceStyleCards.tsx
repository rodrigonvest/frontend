"use client";
import { useId, useRef } from "react";
import { cx } from "../UI";
import { controlClass } from "../channels/config/fields";
import { NotificationCard } from "./NotificationFields";
import { CheckIcon, BrushIcon, EyeDropperIcon, MonitorIcon, MoonIcon, SunIcon } from "./AppearanceIcons";
import { RadioCard } from "./AppearanceFields";
import { accentColors, isHexColor, themeOptions, type ThemeId } from "../../lib/appearance-demo";

const themeIcons = {
  dark: <MoonIcon size={38} />,
  light: <SunIcon size={38} />,
  system: <MonitorIcon size={38} />,
} satisfies Record<ThemeId, React.ReactNode>;

export function ThemeCard({ value, onChange }: { value: ThemeId; onChange: (next: ThemeId) => void }) {
  return (
    <NotificationCard icon={<PaletteGlyph />} title="Tema da Interface" description="Escolha o tema visual da plataforma.">
      <div role="radiogroup" aria-label="Tema da interface" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {themeOptions.map((option) => {
          const selected = value === option.id;
          return (
            <RadioCard key={option.id} name="appearance-theme" value={option.id} checked={selected} showBadge onChange={(v) => onChange(v as ThemeId)}>
              <span className="flex min-h-[166px] flex-col items-center px-3.5 pb-4 pt-6 text-center">
                <span className={cx("flex h-[42px] items-center justify-center", selected ? "text-brand" : "text-fg-muted")}>{themeIcons[option.id]}</span>
                <span className="mt-3.5 text-[14px] font-semibold leading-5 text-fg">{option.label}</span>
                <span className="mt-1.5 max-w-[190px] text-[12.5px] leading-[18px] text-fg-muted">{option.description}</span>
              </span>
            </RadioCard>
          );
        })}
      </div>
    </NotificationCard>
  );
}

function PaletteGlyph() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a9 9 0 1 0 0 18c1.100 0 1.800-.8 1.800-1.700 0-.5-.2-.9-.5-1.200-.3-.3-.5-.7-.5-1.200 0-.9.8-1.700 1.700-1.700H17a4 4 0 0 0 4-4c0-4.400-4-8.200-9-8.200Z" />
      <circle cx="7.500" cy="11" r="1" fill="currentColor" />
      <circle cx="10" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="7.500" r="1" fill="currentColor" />
    </svg>
  );
}

export function ColorsCard({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const inputId = useId();
  const pickerRef = useRef<HTMLInputElement>(null);
  const normalized = value.toLowerCase();

  const openPicker = async () => {
    const EyeDropperApi = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    if (EyeDropperApi) {
      try {
        const result = await new EyeDropperApi().open();
        onChange(result.sRGBHex.toUpperCase());
        return;
      } catch {
        return;
      }
    }
    pickerRef.current?.click();
  };

  return (
    <NotificationCard icon={<BrushIcon />} title="Cores Principais" description="Personalize as cores da interface.">
      <div role="radiogroup" aria-label="Cor principal" className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-0.5 pb-1">
        {accentColors.map((color) => {
          const selected = normalized === color.value.toLowerCase();
          return (
            <label key={color.id} className="relative flex size-[54px] cursor-pointer items-center justify-center">
              <input type="radio" name="appearance-accent" value={color.value} checked={selected} onChange={() => onChange(color.value)} aria-label={color.label} className="peer sr-only" />
              <span
                aria-hidden
                className={cx(
                  "absolute inset-0 rounded-full border-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
                  selected ? "border-brand-strong shadow-[0_0_16px_rgba(8,127,240,.45)]" : "border-transparent",
                )}
              />
              <span aria-hidden className="relative flex size-10 items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]" style={{ backgroundColor: color.value }}>
                {selected && <CheckIcon size={18} stroke={3.4} />}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <label htmlFor={inputId} className="w-[92px] shrink-0 text-[14px] leading-5 text-fg">
          Cor Primária
        </label>
        <div className="relative min-w-0 flex-1">
          <span aria-hidden className="pointer-events-none absolute left-2 top-1/2 z-10 size-[30px] -translate-y-1/2 rounded-md shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]" style={{ backgroundColor: isHexColor(value) ? value : "transparent" }} />
          <input
            id={inputId}
            value={value}
            maxLength={7}
            spellCheck={false}
            autoComplete="off"
            aria-invalid={!isHexColor(value)}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className={cx(controlClass, "tabular !h-[46px] pl-[52px] text-[15px] uppercase", !isHexColor(value) && "!border-danger/70")}
          />
        </div>
        <button
          type="button"
          onClick={openPicker}
          aria-label="Selecionar cor com conta-gotas"
          className="flex size-[46px] shrink-0 items-center justify-center rounded-lg border border-brand-strong/60 bg-brand/10 text-brand transition-colors hover:bg-brand/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <EyeDropperIcon size={20} />
        </button>
        <input
          ref={pickerRef}
          type="color"
          tabIndex={-1}
          aria-hidden
          value={isHexColor(value) ? value.toLowerCase() : "#007bff"}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="sr-only"
        />
      </div>
    </NotificationCard>
  );
}
