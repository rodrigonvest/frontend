"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { cx } from "./UI";
import { useSystemStatus } from "../lib/use-system-status";

export default function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  const { status: systemStatus } = useSystemStatus();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-brand-strong focus:px-3 focus:py-2 focus:text-sm">
        Pular para o conteúdo
      </a>
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className={cx("flex min-h-screen min-w-0 flex-col transition-[margin] duration-200", collapsed ? "lg:ml-[76px]" : "lg:ml-[240px]")}>
        <Topbar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onOpenMobile={() => setMobileOpen(true)}
          status={systemStatus}
        />
        <main
          id="conteudo"
          className={cx(
            "mx-auto w-full min-w-0 flex-1 px-4 py-6 sm:px-6",
            wide ? "max-w-none lg:px-5" : "max-w-[1720px] lg:px-8",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
