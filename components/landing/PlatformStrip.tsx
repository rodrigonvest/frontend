import { Icon } from "../Icons";
import { BrandTile, type BrandId } from "./brands";
import { Reveal } from "./Reveal";
import { IconTile } from "./ui";

const stripBrands: BrandId[] = ["telegram", "mt4", "mt5", "ninja", "dxtrade", "ctrader", "tradelocker", "oanda", "bybit", "binance", "tradovate", "matchtrader", "rithmic", "chatgpt", "claude", "mcp"];

export function PlatformStrip() {
  return (
    <section aria-labelledby="strip-title" className="relative px-5 pb-6 sm:px-8">
      <Reveal className="mx-auto max-w-[1360px]">
        <div className="lp-card p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <IconTile name="layers" tone="purple" size={42} />
            <div className="min-w-0 flex-1">
              <h2 id="strip-title" className="text-lg font-bold text-white">
                Integrações com 38+ plataformas
              </h2>
              <p className="text-[13px] text-slate-300">Conecte-se com as principais plataformas do mercado e agora também com agentes de IA.</p>
            </div>
            <a href="#integracoes" className="group inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition hover:text-sky-300">
              Ver todas as integrações
              <span className="lp-arrow">
                <Icon name="arrowRight" size={16} />
              </span>
            </a>
          </div>
          <ul className="flex snap-x gap-2.5 overflow-x-auto pb-2 xl:grid xl:grid-cols-[repeat(17,minmax(0,1fr))] xl:overflow-visible xl:pb-0">
            {stripBrands.map((id) => (
              <li key={id} className="min-w-[92px] snap-start xl:min-w-0">
                <BrandTile id={id} size={36} className="h-full" />
              </li>
            ))}
            <li className="min-w-[92px] snap-start xl:min-w-0">
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-sky-400/15 bg-[#07132a]/70 px-2 py-3 text-center">
                <span className="text-lg font-bold text-white">+29</span>
                <span className="text-[11px] text-slate-300">outras</span>
              </div>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
