"use client";
import { useState } from "react";
import PreviewCard from "./AppearancePreviewCard";
import LogoCard, { type LogoIdentity } from "./AppearanceLogoCard";
import { SidebarLayoutCard, TypographyCard } from "./AppearanceOptionCards";
import { ColorsCard, ThemeCard } from "./AppearanceStyleCards";
import type { FontSizeId, SidebarLayoutId, ThemeId } from "../../lib/appearance-demo";

export default function AppearanceTab() {
  const [theme, setTheme] = useState<ThemeId>("dark");
  const [accent, setAccent] = useState("#007BFF");
  const [fontSize, setFontSize] = useState<FontSizeId>("normal");
  const [sidebarLayout, setSidebarLayout] = useState<SidebarLayoutId>("expanded");
  const [identity, setIdentity] = useState<LogoIdentity>({ platformName: "Copytrix", tagline: "Telegram to Results", showTagline: true });

  return (
    <div className="grid grid-cols-1 items-stretch gap-3.5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-3.5">
        <ThemeCard value={theme} onChange={setTheme} />
        <ColorsCard value={accent} onChange={setAccent} />
        <LogoCard value={identity} onChange={setIdentity} />
      </div>
      <div className="flex min-w-0 flex-col gap-3.5">
        <PreviewCard theme={theme} accent={accent} sidebarLayout={sidebarLayout} identity={identity} />
        <TypographyCard value={fontSize} onChange={setFontSize} />
        <SidebarLayoutCard value={sidebarLayout} onChange={setSidebarLayout} />
      </div>
    </div>
  );
}
