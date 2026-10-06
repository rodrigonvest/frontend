import React from "react";

export function Icon({ name, size = 18, stroke = 1.8 }: { name: string; size?: number; stroke?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    trades: <><path d="M4 7h13"/><path d="m13 3 4 4-4 4"/><path d="M20 17H7"/><path d="m11 13-4 4 4 4"/></>,
    telegram: <><path d="m21 3-3.5 18-5.4-5.3-3.3 3.1.6-5.7L21 3Z"/><path d="m9.4 13.1 8.2-7.2"/></>,
    accounts: <><path d="M4 20v-1.5A3.5 3.5 0 0 1 7.5 15h3A3.5 3.5 0 0 1 14 18.5V20"/><circle cx="9" cy="8" r="3"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M17 15h.5A3.5 3.5 0 0 1 21 18.5V20"/></>,
    systems: <><rect x="3" y="4" width="7" height="7" rx="1"/><rect x="14" y="4" width="7" height="7" rx="1"/><rect x="3" y="15" width="7" height="5" rx="1"/><rect x="14" y="15" width="7" height="5" rx="1"/></>,
    analytics: <><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19H2"/></>,
    backtest: <><path d="M4 19V5"/><path d="M4 5h10l-2.5 3L14 11H4"/><path d="M8 19h12"/></>,
    logs: <><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L9 6.7l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.5v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 1 1 4.1 1.9c-1 .8-1.8 1.3-1.8 2.6"/><path d="M12 17h.01"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14.7-4L3 10"/><path d="M3 4v6h6"/><path d="M4 13a8 8 0 0 0 14.7 4L21 14"/><path d="M21 20v-6h-6"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5"/>,
    expand: <><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></>,
    shrink: <><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></>,
    external: <><path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    minus: <path d="M6 12h12"/>,
    candle: <><path d="M7 3v4M7 15v6M17 3v6M17 17v4"/><rect x="5" y="7" width="4" height="8" rx="1"/><rect x="15" y="9" width="4" height="8" rx="1"/></>,
    chart: <><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 3-4 3 2 5-7"/></>,
    trophy: <><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
    dollar: <><path d="M12 2v20M17 6.5c-1-1-2.7-1.5-4.5-1.5C10 5 8 6.2 8 8.2c0 2.2 2 3 4.4 3.7 2.6.8 4.6 1.8 4.6 4.1 0 2.1-2 3.5-4.8 3.5-2 0-3.9-.7-5.2-1.9"/></>,
  };
  return <svg {...common}>{paths[name] ?? paths.dashboard}</svg>;
}
