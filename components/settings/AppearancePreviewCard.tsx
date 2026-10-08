"use client";
import { useId, type CSSProperties } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { NotificationCard } from "./NotificationFields";
import { BrandMark, EyeIcon } from "./AppearanceIcons";
import { isHexColor, previewMetrics, previewNav, type SidebarLayoutId, type ThemeId } from "../../lib/appearance-demo";
import type { LogoIdentity } from "./AppearanceLogoCard";

const darkPalette = {
  "--pv-bg": "#06111d",
  "--pv-panel": "#081827",
  "--pv-card": "#0c2133",
  "--pv-line": "#17344b",
  "--pv-fg": "#f2f6fa",
  "--pv-muted": "#9fb3c6",
  "--pv-success": "#12d99e",
  "--pv-danger": "#ff5d6d",
  "--pv-purple": "#9b63ff",
} as const;

const lightPalette = {
  "--pv-bg": "#eef3f8",
  "--pv-panel": "#ffffff",
  "--pv-card": "#ffffff",
  "--pv-line": "#d3dfeb",
  "--pv-fg": "#0d1b2a",
  "--pv-muted": "#5b6b7c",
  "--pv-success": "#0a9f76",
  "--pv-danger": "#d93a4b",
  "--pv-purple": "#7a3fe0",
} as const;

const toneVar = {
  accent: "var(--pv-accent)",
  success: "var(--pv-success)",
  purple: "var(--pv-purple)",
  danger: "var(--pv-danger)",
} as const;

function MiniChart() {
  const id = useId();
  return (
    <svg viewBox="0 0 320 90" preserveAspectRatio="none" className="h-full min-h-[64px] w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--pv-accent)" stopOpacity=".38" />
          <stop offset="1" stopColor="var(--pv-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 74 C20 70 30 56 52 62 S86 78 110 60 S150 40 176 52 S214 62 236 44 S280 22 320 10 V90 H0 Z" fill={`url(#${id})`} />
      <path d="M0 74 C20 70 30 56 52 62 S86 78 110 60 S150 40 176 52 S214 62 236 44 S280 22 320 10" fill="none" stroke="var(--pv-accent)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function PreviewSidebar({ compact, identity }: { compact: boolean; identity: LogoIdentity }) {
  return (
    <aside className={cx("flex shrink-0 flex-col border-r border-[var(--pv-line)] bg-[var(--pv-panel)]", compact ? "w-[46px]" : "w-[31%] min-w-[104px] max-w-[170px]")}>
      <div className={cx("flex h-[52px] items-center border-b border-[var(--pv-line)]", compact ? "justify-center" : "gap-1.5 px-2.5")}>
        <span className="shrink-0 text-[var(--pv-accent)]">
          <BrandMark size={compact ? 20 : 22} />
        </span>
        {!compact && (
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-bold leading-none tracking-tight">{identity.platformName || "Copytrix"}</span>
            {identity.showTagline && (
              <span className="mt-[3px] block truncate text-[5.5px] font-semibold uppercase tracking-[0.18em] text-[var(--pv-accent)]">{identity.tagline}</span>
            )}
          </span>
        )}
      </div>
      <nav aria-hidden className="flex flex-col gap-0.5 py-2">
        {previewNav.map((item, index) => {
          const active = index === 0;
          return (
            <span
              key={item.label}
              className={cx(
                "relative flex h-[30px] items-center text-[10px]",
                compact ? "justify-center" : "gap-2 px-2.5",
                active ? "bg-[var(--pv-accent)]/20 text-[var(--pv-fg)]" : "text-[var(--pv-muted)]",
              )}
            >
              {active && <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--pv-accent)]" />}
              <span className={cx("shrink-0", active && "text-[var(--pv-accent)]")}>
                <Icon name={item.icon} size={14} stroke={1.8} />
              </span>
              {!compact && <span className="truncate">{item.label}</span>}
            </span>
          );
        })}
      </nav>
    </aside>
  );
}

function PreviewTopbar() {
  return (
    <div aria-hidden className="flex h-[52px] items-center gap-2 border-b border-[var(--pv-line)] bg-[var(--pv-panel)] px-3">
      <span className="text-[var(--pv-muted)]">
        <Icon name="menu" size={14} />
      </span>
      <span className="mx-auto inline-flex items-center gap-1 rounded-full border border-[var(--pv-success)]/50 bg-[var(--pv-success)]/10 px-2 py-[3px] text-[7.5px] font-medium text-[var(--pv-success)]">
        <span className="size-[5px] rounded-full bg-[var(--pv-success)]" />
        Copier Online
      </span>
      <span className="flex size-[18px] items-center justify-center rounded-md bg-[var(--pv-accent)]/20 text-[var(--pv-accent)]">
        <Icon name="telegram" size={11} />
      </span>
      <span className="flex size-[18px] items-center justify-center rounded-md bg-[var(--pv-success)]/15 text-[var(--pv-success)]">
        <Icon name="analytics" size={11} />
      </span>
      <span className="text-[var(--pv-muted)]">
        <Icon name="bell" size={13} />
      </span>
      <span className="flex size-[20px] items-center justify-center rounded-full bg-[var(--pv-fg)] text-[9px] font-bold text-[var(--pv-bg)]">R</span>
    </div>
  );
}

export default function PreviewCard({
  theme,
  accent,
  sidebarLayout,
  identity,
  description = "Veja como ficará a interface com as opções selecionadas.",
}: {
  theme: ThemeId;
  accent: string;
  sidebarLayout: SidebarLayoutId;
  identity: LogoIdentity;
  description?: string;
}) {
  const palette = theme === "light" ? lightPalette : darkPalette;
  const style = { ...palette, "--pv-accent": isHexColor(accent) ? accent : "#007BFF" } as unknown as CSSProperties;

  return (
    <NotificationCard
      icon={<EyeIcon />}
      title="Pré-visualização"
      description={description}
      className="flex-1"
    >
      <div
        role="img"
        aria-label="Miniatura da interface do Copytrix com as opções de aparência selecionadas"
        style={style}
        className="flex min-h-[300px] flex-1 overflow-hidden rounded-lg border border-[var(--pv-line)] bg-[var(--pv-bg)] text-[var(--pv-fg)] shadow-[0_0_0_1px_rgba(21,154,242,.08)]"
      >
        <PreviewSidebar compact={sidebarLayout === "compact"} identity={identity} />
        <div className="flex min-w-0 flex-1 flex-col">
          <PreviewTopbar />
          <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5">
            <div className="grid grid-cols-2 gap-2">
              {previewMetrics.map((metric) => (
                <div key={metric.label} className="flex min-w-0 items-center gap-2 rounded-md border border-[var(--pv-line)] bg-[var(--pv-card)] px-2 py-2">
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: `color-mix(in srgb, ${toneVar[metric.tone]} 18%, transparent)`, color: toneVar[metric.tone] }}>
                    <span className="size-[10px] rounded-[3px] border-2 border-current" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[7.5px] text-[var(--pv-muted)]">{metric.label}</span>
                    <span className="tabular block truncate text-[14px] font-bold leading-[18px]" style={metric.tone === "danger" ? { color: "var(--pv-danger)" } : undefined}>
                      {metric.value}
                    </span>
                    <span className="block truncate text-[7.5px] font-semibold" style={{ color: toneVar[metric.noteTone] }}>
                      {metric.note}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="min-h-[64px] flex-1 overflow-hidden rounded-md border border-[var(--pv-line)] bg-[var(--pv-card)]">
              <MiniChart />
            </div>
          </div>
        </div>
      </div>
    </NotificationCard>
  );
}
