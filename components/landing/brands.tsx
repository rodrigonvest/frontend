import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "../Icons";

type Brand = { name: string; mono?: string; icon?: string; img?: string; glyph?: ReactNode; imgScale?: number; invert?: boolean; bg: string; fg?: string };

/** Glifos vetoriais estilizados para corretoras/plataformas sem logo oficial disponível. */
const glyph = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" width="68%" height="68%" fill="none" aria-hidden>
    {children}
  </svg>
);

const metaGlyph = (digit: string) =>
  glyph(
    <>
      <circle cx="12" cy="12" r="10" stroke="#cfe6ff" strokeWidth="1.6" opacity=".85" />
      <circle cx="12" cy="8.6" r="3.2" fill="#fff" />
      <path d="M5.8 18.2c.6-3.6 3.2-5.4 6.2-5.4s5.6 1.8 6.2 5.4" fill="#fff" />
      <text x="12" y="20.4" textAnchor="middle" fontSize="6.4" fontWeight="800" fill="#173f7a" fontFamily="sans-serif">
        {digit}
      </text>
    </>,
  );

export const brands = {
  telegram: { name: "Telegram", icon: "telegram", bg: "#229ed9" },
  mt4: { name: "MetaTrader 4", mono: "MT4", glyph: metaGlyph("4"), bg: "linear-gradient(135deg,#4f9be8,#1d4f9a)" },
  mt5: { name: "MetaTrader 5", mono: "MT5", glyph: metaGlyph("5"), bg: "linear-gradient(135deg,#5aa6f0,#2257a8)" },
  ninja: {
    name: "NinjaTrader",
    mono: "N",
    glyph: glyph(
      <>
        <circle cx="12" cy="12" r="10" fill="#fff" />
        <path d="M12 2a10 10 0 0 1 9.4 6.6C17.6 4.6 10 6 8 11c-1 2.6.6 5 3.4 5.6C8 17.4 4.6 15.6 3 12.6A10 10 0 0 1 12 2Z" fill="#c8102e" />
        <path d="M7.4 16.6V7.8l9.2 8.8V7.8" stroke="#c8102e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </>,
    ),
    bg: "#0d0f16",
  },
  dxtrade: {
    name: "DXtrade",
    mono: "DX",
    glyph: glyph(
      <>
        <path d="M4 3.5 20 12 4 20.5l3.6-8.5z" fill="#2f8bff" />
        <path d="M4 3.5 12 12l-4.4 0z" fill="#8ac4ff" />
        <path d="M4 20.5 12 12H7.6z" fill="#1565e8" />
      </>,
    ),
    bg: "#0d1730",
  },
  ctrader: {
    name: "cTrader",
    mono: "cT",
    glyph: glyph(
      <>
        <circle cx="12" cy="12" r="8.4" stroke="#fff" strokeWidth="3.4" strokeDasharray="42 12" strokeLinecap="round" transform="rotate(-30 12 12)" />
        <circle cx="12" cy="12" r="2.6" fill="#fff" />
      </>,
    ),
    bg: "linear-gradient(135deg,#f0342f,#b3121a)",
  },
  tradelocker: {
    name: "TradeLocker",
    mono: "TL",
    glyph: glyph(
      <>
        <path d="M3.5 8V4.5H7M17 4.5h3.5V8M20.5 16v3.5H17M7 19.5H3.5V16" stroke="#e8eefc" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8.4v7.2M8.4 12h7.2" stroke="#e8eefc" strokeWidth="2.2" strokeLinecap="round" />
      </>,
    ),
    bg: "#0b1220",
  },
  oanda: {
    name: "OANDA",
    mono: "O",
    glyph: glyph(
      <>
        <circle cx="12" cy="12" r="8.6" stroke="#28d6e0" strokeWidth="3.4" />
        <path d="M12 6.4a5.6 5.6 0 0 1 0 11.2z" fill="#fff" />
      </>,
    ),
    bg: "#0b1a2a",
  },
  bybit: { name: "Bybit", mono: "BYBIT", bg: "#14161f", fg: "#ffb11a" },
  binance: { name: "Binance", mono: "B", img: "/brands/binance.svg", imgScale: 0.72, bg: "#161a21" },
  tradovate: {
    name: "Tradovate",
    mono: "T",
    glyph: glyph(
      <>
        <path d="M3 4h18l-6.4 5.6H11L3 4z" fill="#3b9bff" />
        <path d="M9.2 11.4h5.2L13 20.5 9.2 11.4z" fill="#1f6feb" />
      </>,
    ),
    bg: "#0d1730",
  },
  matchtrader: {
    name: "MatchTrader",
    mono: "MT",
    glyph: glyph(
      <>
        <path d="M5 16 9.5 8l5 6 4.5-8" stroke="#8fd0ff" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="5" cy="16" r="2.6" fill="#38bdf8" />
        <circle cx="9.5" cy="8" r="2.6" fill="#5b7bff" />
        <circle cx="14.5" cy="14" r="2.6" fill="#8b5cf6" />
        <circle cx="19" cy="6" r="2.6" fill="#38bdf8" />
      </>,
    ),
    bg: "#0d1730",
  },
  rithmic: { name: "Rithmic", mono: "R", bg: "#16a34a" },
  chatgpt: { name: "ChatGPT", img: "/brands/chatgpt.svg", bg: "#10a37f" },
  claude: { name: "Claude", img: "/brands/claude.svg", bg: "#2a1a14" },
  mcp: { name: "MCP", icon: "bot", bg: "linear-gradient(135deg,#6d28d9,#a855f7)" },
  tradingview: { name: "TradingView", mono: "TV", img: "/brands/tradingview.svg", imgScale: 0.6, bg: "#ffffff" },
  webhook: { name: "Webhook", icon: "webhook", bg: "linear-gradient(135deg,#6d28d9,#a855f7)" },
  email: { name: "Email", icon: "message", bg: "#d97706" },
  api: { name: "API", mono: "API", bg: "#4c1d95", fg: "#c4b5fd" },
  files: { name: "Arquivos", icon: "fileText", bg: "#0e7490" },
  ib: { name: "Interactive Brokers", mono: "IB", bg: "#b91c1c" },
  pepperstone: { name: "Pepperstone", mono: "P", bg: "#1d4ed8" },
  thinkmarkets: { name: "ThinkMarkets", mono: "TM", bg: "#65a30d" },
  zeromarkets: { name: "Zero Markets", mono: "ZM", bg: "#111827", fg: "#e2e8f0" },
  kucoin: { name: "KuCoin", mono: "K", img: "/brands/kucoin.svg", imgScale: 0.62, bg: "#0d1f1b" },
  okx: { name: "OKX", mono: "OKX", img: "/brands/okx.svg", imgScale: 0.62, invert: true, bg: "#0b0b0b" },
  bingx: { name: "BingX", mono: "BX", bg: "#1d4ed8" },
  bitget: { name: "Bitget", mono: "BG", bg: "#0e7490" },
  deribit: { name: "Deribit", mono: "D", bg: "#0891b2" },
  gate: { name: "Gate.io", mono: "G", bg: "#1d4ed8" },
  cme: { name: "CME", mono: "CME", bg: "#1e3a8a" },
  discord: { name: "Discord", mono: "DC", img: "/brands/discord.svg", imgScale: 0.66, bg: "#ffffff" },
  excel: { name: "Excel", mono: "XLS", img: "/brands/microsoft-excel.svg", imgScale: 0.66, bg: "#ffffff" },
  zapier: { name: "Zapier", mono: "Z", img: "/brands/zapier.svg", imgScale: 0.62, bg: "#ffffff" },
} satisfies Record<string, Brand>;

export type BrandId = keyof typeof brands;

export function BrandMark({ id, size = 36 }: { id: BrandId; size?: number }) {
  const brand: Brand = brands[id];
  const long = (brand.mono?.length ?? 0) > 2;
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-110"
      style={{ width: size, height: size, background: brand.bg, color: brand.fg ?? "#fff", fontSize: size * (long ? 0.24 : 0.38) }}
    >
      {brand.glyph ? (
        brand.glyph
      ) : brand.img ? (
        <Image
          src={brand.img}
          alt=""
          width={Math.round(size * (brand.imgScale ?? 0.58))}
          height={Math.round(size * (brand.imgScale ?? 0.58))}
          style={brand.invert ? { filter: "invert(1)" } : undefined}
          unoptimized
        />
      ) : brand.icon ? (
        <Icon name={brand.icon} size={Math.round(size * 0.55)} />
      ) : (
        brand.mono
      )}
    </span>
  );
}

export function BrandTile({ id, label, size = 38, className = "" }: { id: BrandId; label?: string; size?: number; className?: string }) {
  return (
    <div
      className={`group flex flex-col items-center justify-center gap-2 rounded-xl border border-sky-400/15 bg-[#07132a]/70 px-2 py-3 text-center transition duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-sky-500/10 hover:shadow-[0_0_30px_-8px_rgba(30,160,255,.7)] ${className}`}
    >
      <BrandMark id={id} size={size} />
      <span className="text-[11px] font-medium leading-tight text-slate-200">{label ?? brands[id].name}</span>
    </div>
  );
}
