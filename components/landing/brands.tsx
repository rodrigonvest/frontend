import Image from "next/image";
import { Icon } from "../Icons";

type Brand = { name: string; mono?: string; icon?: string; img?: string; bg: string; fg?: string };

export const brands = {
  telegram: { name: "Telegram", icon: "telegram", bg: "#229ed9" },
  mt4: { name: "MetaTrader 4", mono: "MT4", bg: "linear-gradient(135deg,#3a78c6,#173f7a)" },
  mt5: { name: "MetaTrader 5", mono: "MT5", bg: "linear-gradient(135deg,#4a90e0,#1b4a8f)" },
  ninja: { name: "NinjaTrader", mono: "N", bg: "#c8102e" },
  dxtrade: { name: "DXtrade", mono: "DX", bg: "#1565e8" },
  ctrader: { name: "cTrader", mono: "cT", bg: "#e02424" },
  tradelocker: { name: "TradeLocker", mono: "TL", bg: "#0f172a", fg: "#e2e8f0" },
  oanda: { name: "OANDA", mono: "O", bg: "#0e8f8f" },
  bybit: { name: "Bybit", mono: "BYBIT", bg: "#14161f", fg: "#ffb11a" },
  binance: { name: "Binance", mono: "B", bg: "#f0b90b", fg: "#1a1a1a" },
  tradovate: { name: "Tradovate", mono: "T", bg: "#1f6feb" },
  matchtrader: { name: "MatchTrader", mono: "MT", bg: "#6d28d9" },
  rithmic: { name: "Rithmic", mono: "R", bg: "#16a34a" },
  chatgpt: { name: "ChatGPT", img: "/brands/chatgpt.svg", bg: "#10a37f" },
  claude: { name: "Claude", img: "/brands/claude.svg", bg: "#2a1a14" },
  mcp: { name: "MCP", icon: "bot", bg: "linear-gradient(135deg,#6d28d9,#a855f7)" },
  tradingview: { name: "TradingView", mono: "TV", bg: "#131722" },
  webhook: { name: "Webhook", icon: "webhook", bg: "linear-gradient(135deg,#6d28d9,#a855f7)" },
  email: { name: "Email", icon: "message", bg: "#d97706" },
  api: { name: "API", mono: "API", bg: "#4c1d95", fg: "#c4b5fd" },
  files: { name: "Arquivos", icon: "fileText", bg: "#0e7490" },
  ib: { name: "Interactive Brokers", mono: "IB", bg: "#b91c1c" },
  pepperstone: { name: "Pepperstone", mono: "P", bg: "#1d4ed8" },
  thinkmarkets: { name: "ThinkMarkets", mono: "TM", bg: "#65a30d" },
  zeromarkets: { name: "Zero Markets", mono: "ZM", bg: "#111827", fg: "#e2e8f0" },
  kucoin: { name: "KuCoin", mono: "K", bg: "#0f9d58" },
  okx: { name: "OKX", mono: "OKX", bg: "#0b0b0b" },
  bingx: { name: "BingX", mono: "BX", bg: "#1d4ed8" },
  bitget: { name: "Bitget", mono: "BG", bg: "#0e7490" },
  deribit: { name: "Deribit", mono: "D", bg: "#0891b2" },
  gate: { name: "Gate.io", mono: "G", bg: "#1d4ed8" },
  cme: { name: "CME", mono: "CME", bg: "#1e3a8a" },
  discord: { name: "Discord", mono: "DC", bg: "#5865f2" },
  excel: { name: "Excel", mono: "XLS", bg: "#15803d" },
  zapier: { name: "Zapier", mono: "Z", bg: "#ea580c" },
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
      {brand.img ? (
        <Image src={brand.img} alt="" width={Math.round(size * 0.58)} height={Math.round(size * 0.58)} unoptimized />
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
