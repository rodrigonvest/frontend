import type { ReactNode } from "react";
import type { SystemLogoKey } from "../../lib/systems-catalog";

function MetaTraderMark({ version }: { version: "4" | "5" }) {
  return (
    <>
      <rect width="40" height="40" rx="10" fill="#0c2a4d" />
      <circle cx="20" cy="20" r="14" fill="#1a73d9" />
      <rect x="11.5" y="19" width="4" height="9" rx="1" fill="#7be0a8" />
      <rect x="18" y="13" width="4" height="15" rx="1" fill="#ffffff" />
      <rect x="24.5" y="16" width="4" height="12" rx="1" fill="#f6c453" />
      <rect x="25" y="25" width="13" height="13" rx="4" fill="#06111d" stroke="#2a4c68" />
      <text x="31.5" y="35" textAnchor="middle" fontSize="10" fontWeight="800" fill="#f2f6fa">
        {version}
      </text>
    </>
  );
}

const marks: Record<SystemLogoKey, ReactNode> = {
  telegram: (
    <>
      <defs>
        <linearGradient id="logo-telegram" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#37aee2" />
          <stop offset="1" stopColor="#1e96c8" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="#0b2740" />
      <circle cx="20" cy="20" r="15" fill="url(#logo-telegram)" />
      <path
        transform="translate(8.5 8.5) scale(.96)"
        fill="#fff"
        d="M21.5 3.4 3.1 10.5c-.8.3-.8 1.4 0 1.7l4.7 1.8 1.8 5.5c.25.75 1.2.95 1.7.35l2.7-3.3 4.8 3.6c.65.5 1.6.12 1.75-.68l2.5-14.9c.15-.85-.68-1.52-1.55-1.17Z"
      />
    </>
  ),
  tradingview: (
    <>
      <rect width="40" height="40" rx="10" fill="#131722" />
      <path d="M8 13h13v5h-4v10h-5V18H8z" fill="#fff" />
      <circle cx="24.5" cy="15.5" r="3" fill="#fff" />
      <path d="m24 28 5.5-15h5L29 28z" fill="#fff" />
    </>
  ),
  mt4: <MetaTraderMark version="4" />,
  mt5: <MetaTraderMark version="5" />,
  ninjatrader: (
    <>
      <rect width="40" height="40" rx="10" fill="#1b0c0c" />
      <path d="M10 30V10h5l10 13V10h5v20h-5L15 17v13z" fill="#ff3b30" />
      <path d="M10 10h5v8l-5-6z" fill="#ff8a7a" />
    </>
  ),
  tradovate: (
    <>
      <rect width="40" height="40" rx="10" fill="#0a1d3b" />
      <path d="M9 11h22l-5 7h-5v14l-7-4V18H9z" fill="#2a7fff" />
      <path d="M21 18h5l5-7h-6z" fill="#0b4fc2" />
    </>
  ),
  tradelocker: (
    <>
      <rect width="40" height="40" rx="10" fill="#000" />
      <text x="20" y="27" textAnchor="middle" fontSize="19" fontWeight="900" fill="#2ab4ff" letterSpacing="-0.5">
        TL
      </text>
    </>
  ),
  oanda: (
    <>
      <rect width="40" height="40" rx="10" fill="#0d1a12" />
      <ellipse cx="15" cy="22" rx="4.6" ry="10" transform="rotate(-24 15 22)" fill="#c7e000" />
      <ellipse cx="25.5" cy="19" rx="4.2" ry="8.5" transform="rotate(24 25.5 19)" fill="#7fb800" />
    </>
  ),
  binance: (
    <>
      <rect width="40" height="40" rx="10" fill="#1e2026" />
      <g fill="#f3ba2f">
        <rect x="17" y="17" width="6" height="6" transform="rotate(45 20 20)" />
        <rect x="17" y="6.5" width="6" height="6" transform="rotate(45 20 9.5)" />
        <rect x="17" y="27.5" width="6" height="6" transform="rotate(45 20 30.5)" />
        <rect x="6.5" y="17" width="6" height="6" transform="rotate(45 9.5 20)" />
        <rect x="27.5" y="17" width="6" height="6" transform="rotate(45 30.5 20)" />
      </g>
    </>
  ),
  matchtrader: (
    <>
      <defs>
        <linearGradient id="logo-match" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a265ff" />
          <stop offset="1" stopColor="#6a35d6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#logo-match)" />
      <path d="M9 29V11h4l7 9 7-9h4v18h-4V19l-7 9-7-9v10z" fill="#fff" />
    </>
  ),
  dxtrade: (
    <>
      <rect width="40" height="40" rx="10" fill="#121217" />
      <text x="20" y="27" textAnchor="middle" fontSize="19" fontWeight="900" letterSpacing="-1">
        <tspan fill="#ffffff">D</tspan>
        <tspan fill="#ff3b4e">X</tspan>
      </text>
    </>
  ),
};

export default function SystemLogo({ logo, size = 40 }: { logo: SystemLogoKey; size?: number }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className="shrink-0 rounded-[10px] shadow-[0_0_0_1px_rgba(255,255,255,.06)]"
    >
      {marks[logo]}
    </svg>
  );
}
