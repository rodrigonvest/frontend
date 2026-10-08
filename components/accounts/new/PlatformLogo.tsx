import type { PlatformLogoKey } from "../../../lib/account-platforms";

const squareBase = "flex size-[68px] items-center justify-center overflow-hidden rounded-[14px]";

function MetaTraderMark({ version }: { version: "4" | "5" }) {
  return (
    <svg viewBox="0 0 72 72" width="68" height="68" aria-hidden className="drop-shadow-[0_4px_10px_rgba(0,0,0,.35)]">
      <defs>
        <radialGradient id="mt-sphere" cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffe28a" />
          <stop offset=".45" stopColor="#e9b92f" />
          <stop offset="1" stopColor="#a8741a" />
        </radialGradient>
        <linearGradient id="mt-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fd35a" />
          <stop offset="1" stopColor="#2f9a45" />
        </linearGradient>
        <linearGradient id="mt-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4fb0f5" />
          <stop offset="1" stopColor="#1760c9" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="30" r="22" fill="url(#mt-sphere)" />
      <path d="M14.6 36c.9 9 7.7 15.4 16.6 16.6l-8.8 9.2C12.5 56 7.4 45 8.2 36Z" fill="url(#mt-green)" />
      <path d="M57.4 36c-.9 9-7.7 15.4-16.6 16.6l8.8 9.2C59.5 56 64.6 45 63.8 36Z" fill="url(#mt-blue)" />
      <ellipse cx="36" cy="62" rx="15" ry="5" fill="url(#mt-blue)" opacity=".9" />
      <circle cx="36" cy="30" r="13.5" fill="#fff6dc" stroke="#d4a02a" strokeWidth="2" />
      <text x="36" y="37.5" textAnchor="middle" fontSize="21" fontWeight="800" fill="#c47a0c" fontFamily="inherit">
        {version}
      </text>
    </svg>
  );
}

function CTraderMark() {
  return (
    <svg viewBox="0 0 72 72" width="64" height="64" aria-hidden>
      <defs>
        <linearGradient id="ct-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff4a3d" />
          <stop offset="1" stopColor="#c4161c" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="32" fill="url(#ct-red)" />
      <circle cx="36" cy="36" r="29" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="3" />
      <path d="M48 26.5A16 16 0 1 0 48 45.5" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function BinanceMark() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden fill="#f0b90b">
      <path d="M32 8l9 9-5 5-4-4-4 4-5-5z" />
      <path d="M32 56l-9-9 5-5 4 4 4-4 5 5z" />
      <path d="M8 32l5-5 5 5-5 5z" />
      <path d="M56 32l-5-5-5 5 5 5z" />
      <path d="M32 24l8 8-8 8-8-8z" />
    </svg>
  );
}

function OkxMark() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden fill="#fff">
      <rect x="6" y="6" width="16" height="16" />
      <rect x="42" y="6" width="16" height="16" />
      <rect x="24" y="24" width="16" height="16" />
      <rect x="6" y="42" width="16" height="16" />
      <rect x="42" y="42" width="16" height="16" />
    </svg>
  );
}

export default function PlatformLogo({ logo }: { logo: PlatformLogoKey }) {
  switch (logo) {
    case "mt5":
      return <MetaTraderMark version="5" />;
    case "mt4":
      return <MetaTraderMark version="4" />;
    case "matchtrader":
      return (
        <div aria-hidden className={`${squareBase} bg-gradient-to-br from-[#a76bff] to-[#6a2fe0] text-white`}>
          <svg viewBox="0 0 40 40" width="40" height="40" fill="currentColor">
            <path d="M6 33V8h5.5L20 21.5 28.5 8H34v25h-5.5V17.5L20 30.5l-8.5-13V33z" />
          </svg>
        </div>
      );
    case "tradelocker":
      return (
        <div aria-hidden className={`${squareBase} bg-[#050b14] ring-1 ring-white/10`}>
          <span className="text-[34px] font-black leading-none tracking-tight">
            <span className="text-white">T</span>
            <span className="text-[#2ab4ff]">L</span>
          </span>
        </div>
      );
    case "dxtrade":
      return (
        <div aria-hidden className={`${squareBase} bg-[#16121b] ring-1 ring-white/10`}>
          <span className="text-[32px] font-black italic leading-none tracking-tighter">
            <span className="text-white">D</span>
            <span className="text-[#ef2b3d]">X</span>
          </span>
        </div>
      );
    case "ctrader":
      return (
        <div aria-hidden className="flex size-[68px] items-center justify-center">
          <CTraderMark />
        </div>
      );
    case "tradingview":
      return (
        <div aria-hidden className={`${squareBase} bg-[#06080c] ring-1 ring-white/15`}>
          <span className="text-[30px] font-black italic leading-none tracking-tighter text-white">TV</span>
        </div>
      );
    case "binance":
      return (
        <div aria-hidden className={`${squareBase} bg-[#14120a] ring-1 ring-[#f0b90b]/20`}>
          <BinanceMark />
        </div>
      );
    case "bybit":
      return (
        <div aria-hidden className={`${squareBase} bg-[#07090d] ring-1 ring-white/15`}>
          <span className="text-[19px] font-black leading-none tracking-tight text-white">
            BYB<span className="text-[#f7a600]">!</span>T
          </span>
        </div>
      );
    case "okx":
      return (
        <div aria-hidden className={`${squareBase} bg-black ring-1 ring-white/15`}>
          <OkxMark />
        </div>
      );
  }
}
