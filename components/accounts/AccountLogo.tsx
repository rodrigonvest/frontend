import type { AccountLogoKey } from "../../lib/accounts-presentation";
import { Icon } from "../Icons";

function FundedNextMark() {
  return (
    <svg viewBox="0 0 56 56" className="size-full" aria-hidden>
      <defs>
        <linearGradient id="fn-hex" x1="10" y1="6" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd23f" />
          <stop offset=".5" stopColor="#8fd94b" />
          <stop offset="1" stopColor="#12a86a" />
        </linearGradient>
        <linearGradient id="fn-bar" x1="14" y1="40" x2="42" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f6fe0" />
          <stop offset="1" stopColor="#3cc8ff" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" fill="#0b1712" />
      <path d="M28 6.5 46.6 17.25v21.5L28 49.5 9.4 38.75v-21.5L28 6.5Z" fill="url(#fn-hex)" />
      <path d="M28 12.5 41.4 20.25v15.5L28 43.5l-13.4-7.75v-15.5L28 12.5Z" fill="#0b1712" opacity=".88" />
      <path d="M19 35.5 29.5 22.5l4.5 4.5 5-6.5" fill="none" stroke="url(#fn-bar)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="39" cy="20.5" r="2.4" fill="#ffd23f" />
    </svg>
  );
}

const logoStyles: Record<AccountLogoKey, { box: string; content: React.ReactNode }> = {
  fundednext: {
    box: "bg-[#0b1712] ring-1 ring-white/10",
    content: <FundedNextMark />,
  },
  ftmo: {
    box: "bg-black text-white ring-1 ring-white/10",
    content: <span className="text-[14px] font-extrabold tracking-wide">FTMO</span>,
  },
  mt4: {
    box: "bg-gradient-to-br from-[#18c4f0] to-[#087ff0] text-white",
    content: <Icon name="chart" size={28} stroke={2} />,
  },
  matchtrader: {
    box: "bg-gradient-to-br from-[#a265ff] to-[#6a35d6] text-white",
    content: <span className="text-[30px] font-black leading-none">M</span>,
  },
  tradelocker: {
    box: "bg-black text-[#2ab4ff] ring-1 ring-white/10",
    content: <span className="text-[26px] font-black leading-none tracking-tight">TL</span>,
  },
};

export default function AccountLogo({ logo }: { logo: AccountLogoKey }) {
  const style = logoStyles[logo];
  return (
    <div
      aria-hidden
      className={`flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] shadow-[0_0_0_1px_rgba(255,255,255,.04)] ${style.box}`}
    >
      {style.content}
    </div>
  );
}
