import type { AccountLogoKey } from "../../lib/accounts-presentation";
import { Icon } from "../Icons";

const logoStyles: Record<AccountLogoKey, { box: string; content: React.ReactNode }> = {
  fundednext: {
    box: "bg-gradient-to-br from-[#f5c542] via-[#7ed957] to-[#12a86a] text-[#06210f]",
    content: <span className="text-[15px] font-black tracking-tight">FN</span>,
  },
  ftmo: {
    box: "bg-black text-white ring-1 ring-white/10",
    content: <span className="text-[11px] font-extrabold tracking-wide">FTMO</span>,
  },
  mt4: {
    box: "bg-gradient-to-br from-[#18c4f0] to-[#087ff0] text-white",
    content: <Icon name="chart" size={22} stroke={2} />,
  },
  matchtrader: {
    box: "bg-gradient-to-br from-[#a265ff] to-[#6a35d6] text-white",
    content: <span className="text-[22px] font-black leading-none">M</span>,
  },
  tradelocker: {
    box: "bg-black text-[#2ab4ff] ring-1 ring-white/10",
    content: <span className="text-[18px] font-black tracking-tight">TL</span>,
  },
};

export default function AccountLogo({ logo }: { logo: AccountLogoKey }) {
  const style = logoStyles[logo];
  return (
    <div aria-hidden className={`flex size-11 shrink-0 items-center justify-center rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,.04)] ${style.box}`}>
      {style.content}
    </div>
  );
}
