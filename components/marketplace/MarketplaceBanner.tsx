"use client";
import Image from "next/image";
import { Icon } from "../Icons";
import { bannerHighlights } from "../../lib/marketplace-data";
import { StrategyChart } from "./StrategyChart";
import { strategies } from "../../lib/marketplace-data";

export function MarketplaceBanner({ onExplore, onOpenStrategy }: { onExplore: () => void; onOpenStrategy: (id: string) => void }) {
  return (
    <section
      aria-label="Destaques do Marketplace"
      className="relative mt-5 overflow-hidden rounded-2xl border border-line-strong bg-[#08182a] p-5 sm:p-7 lg:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_30%,rgba(21,154,242,.28),transparent_70%),radial-gradient(40%_70%_at_5%_100%,rgba(167,139,250,.18),transparent_70%),radial-gradient(35%_60%_at_60%_100%,rgba(18,217,158,.14),transparent_70%)]"
      />
      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-8">
        <div className="min-w-0">
          <h2 className="text-balance text-[28px] font-semibold leading-[1.15] tracking-tight text-fg sm:text-[34px]">
            Estratégias Reais
            <br />
            <span className="bg-gradient-to-r from-[#5cc2ff] to-success bg-clip-text text-transparent">Resultados Reais</span>
          </h2>
          <p className="mt-3 max-w-md text-[13.5px] leading-6 text-fg-muted">
            Acesse estratégias validadas pela comunidade, com histórico real, configurações prontas e desempenho verificado.
          </p>
          <button
            type="button"
            onClick={onExplore}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-brand-strong px-5 text-[13.5px] font-semibold text-white shadow-[0_0_24px_-4px_rgba(21,154,242,.8)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Explorar Estratégias
            <Icon name="arrowRight" size={15} />
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {bannerHighlights.map((item, index) => {
            const strategy = strategies.find((entry) => entry.id === item.target);
            return (
              <li key={item.id} className={index % 2 === 1 ? "sm:mt-4" : ""}>
                <button
                  type="button"
                  onClick={() => onOpenStrategy(item.target)}
                  aria-label={`Abrir detalhes: ${item.title} ${item.subtitle}, retorno ${item.ret}`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-line-strong bg-gradient-to-b from-surface-2/90 to-surface p-2.5 text-left shadow-lg transition-[transform,border-color] hover:-translate-y-1 hover:border-brand/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-[#07111d]">
                    <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 14vw, 40vw" className="object-cover" />
                    <span className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-warning/20 text-warning ring-1 ring-warning/50">
                      <Icon name="crown" size={12} />
                    </span>
                  </span>
                  <span className="mt-2.5 block text-[12.5px] font-semibold leading-4 text-fg">{item.title}</span>
                  <span className="block text-[11.5px] leading-4 text-fg-muted">{item.subtitle}</span>
                  <span className="mt-1 flex items-end justify-between gap-2">
                    <span className="tabular text-[17px] font-semibold leading-6 text-success">{item.ret}</span>
                    {strategy && (
                      <span className="w-12 shrink-0">
                        <StrategyChart series={strategy.series} variant="line" height={20} label={`Tendência de ${item.title}`} />
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
