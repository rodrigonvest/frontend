import SystemLogo from "../systems/SystemLogo";
import { Icon } from "../Icons";
import type { SymbolKey, SystemMarkKey } from "../../lib/reports-demo";

export function SymbolMark({ symbol, size = 24 }: { symbol: SymbolKey; size?: number }) {
  if (symbol === "XAUUSD" || symbol === "XAGUSD") {
    const gold = symbol === "XAUUSD";
    return (
      <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
        <defs>
          <linearGradient id={`symbol-${symbol}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={gold ? "#ffd66b" : "#d3dbe4"} />
            <stop offset="1" stopColor={gold ? "#e29a1c" : "#7f8b99"} />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="11" fill={`url(#symbol-${symbol})`} />
        <path d="m12 5.5 5.5 6.5-5.5 6.5L6.5 12 12 5.5Z" fill="#fff" fillOpacity=".78" />
        <path d="M12 5.5 6.5 12H17.5L12 5.5Z" fill="#fff" fillOpacity=".5" />
      </svg>
    );
  }
  return (
    <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
      <defs>
        <clipPath id={`flag-${symbol}`}>
          <circle cx="12" cy="12" r="11" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-${symbol})`}>
        <rect width="24" height="24" fill="#f4f6f9" />
        {[1, 5, 9, 13, 17, 21].map((y) => (
          <rect key={y} y={y} width="24" height="2.4" fill="#d6283b" />
        ))}
        <rect width="13" height="13" fill="#27408b" />
        {[3, 6.5, 10].flatMap((x) => [3, 6.5, 10].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r=".7" fill="#fff" />))}
      </g>
    </svg>
  );
}

function DiscordMark({ size }: { size: number }) {
  return (
    <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 40 40" className="shrink-0 rounded-[10px] shadow-[0_0_0_1px_rgba(255,255,255,.06)]">
      <rect width="40" height="40" rx="10" fill="#4752c4" />
      <path
        fill="#fff"
        d="M27.2 13.3a15.6 15.6 0 0 0-3.9-1.2l-.5 1.1a14.5 14.5 0 0 0-4.3 0l-.5-1.1c-1.4.2-2.7.6-3.9 1.2-2.5 3.7-3.2 7.3-2.8 10.9a15.7 15.7 0 0 0 4.8 2.4l1-1.6c-.6-.2-1.100-.5-1.600-.8l.4-.3c3.100 1.400 6.500 1.400 9.600 0l.4.3c-.5.3-1 .6-1.600.8l1 1.600a15.700 15.700 0 0 0 4.800-2.400c.5-4.200-.8-7.800-2.900-10.900ZM16.700 22.200c-.9 0-1.600-.8-1.600-1.800s.7-1.800 1.600-1.800 1.600.8 1.600 1.800-.7 1.800-1.600 1.800Zm6.600 0c-.9 0-1.600-.8-1.600-1.800s.7-1.800 1.600-1.800 1.600.8 1.600 1.800-.7 1.800-1.600 1.800Z"
      />
    </svg>
  );
}

function ManualMark({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-[10px] bg-[#12263b] text-[#8fb2d4] shadow-[0_0_0_1px_rgba(255,255,255,.06)]"
    >
      <Icon name="external" size={Math.round(size * 0.55)} />
    </span>
  );
}

export function SystemMark({ system, size = 24 }: { system: SystemMarkKey; size?: number }) {
  if (system === "discord") return <DiscordMark size={size} />;
  if (system === "manual") return <ManualMark size={size} />;
  return <SystemLogo logo={system} size={size} />;
}

export function WinRateRing({ value, size = 52 }: { value: number; size?: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 52 52" className="shrink-0">
      <circle cx="26" cy="26" r={radius} fill="none" stroke="#0d3a3c" strokeWidth="5" />
      <circle
        cx="26"
        cy="26"
        r={radius}
        fill="none"
        stroke="#12d99e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        transform="rotate(-90 26 26)"
      />
    </svg>
  );
}

export function ArrowGlyph({ direction, size = 11 }: { direction: "up" | "down"; size?: number }) {
  return (
    <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {direction === "up" ? <path d="M6 10V2M2.5 5.500 6 2l3.500 3.500" /> : <path d="M6 2v8M2.500 6.500 6 10l3.500-3.500" />}
    </svg>
  );
}
