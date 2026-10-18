import type { CSSProperties } from "react";
import { Icon } from "../Icons";
import { DashboardMock, McpCard } from "./Showcase";
import { APP_HREF, CtaButton } from "./ui";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative px-5 pb-6 pt-28 sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-[1360px]">
        <a
          href="#mcp"
          style={delay(0)}
          className="lp-in group inline-flex max-w-full items-center gap-3 rounded-xl border border-sky-400/25 bg-[#07132a]/80 py-1.5 pl-1.5 pr-4 text-[13px] text-slate-200 transition hover:border-sky-400/60"
        >
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-violet-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            <Icon name="sparkles" size={12} /> Novo
          </span>
          <span className="truncate font-semibold text-white">Copytrix MCP já disponível</span>
          <span className="hidden truncate text-slate-300 lg:inline">Conecte seu Copytrix ao ChatGPT, Claude e outros agentes de IA.</span>
          <span className="lp-arrow text-sky-400" aria-hidden>
            <Icon name="arrowRight" size={16} />
          </span>
        </a>

        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6 xl:gap-10">
          <div>
            <h1 id="hero-title" className="text-[38px] font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[42px] xl:text-[52px] min-[1440px]:whitespace-nowrap min-[1440px]:text-[58px]">
              <span className="lp-in block" style={delay(100)}>
                Sinais do Telegram
              </span>
              <span className="lp-in block" style={delay(200)}>
                em <span className="lp-grad">Resultados Reais</span>
              </span>
              <span className="lp-in block" style={delay(300)}>
                com o poder da <span className="lp-grad-warm">IA</span>
              </span>
            </h1>
            <p className="lp-in mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg" style={delay(450)}>
              Copie, analise, teste e automatize sinais de Forex, índices, ações e criptomoedas diretamente do Telegram. Agora com Copytrix MCP, você também pode controlar tudo através do ChatGPT, Claude e outros agentes de IA.
            </p>
            <div className="lp-in mt-8 flex flex-col gap-3 sm:flex-row" style={delay(600)}>
              <CtaButton href={APP_HREF} arrow>
                Comece agora grátis
              </CtaButton>
              <CtaButton href="#como-funciona" variant="ghost">
                <span aria-hidden className="inline-flex size-7 items-center justify-center rounded-full border border-white/70">
                  <Icon name="chevron" size={14} stroke={2.4} />
                </span>
                Ver como funciona
              </CtaButton>
            </div>
            <ul className="lp-in mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300" style={delay(750)}>
              {[
                { icon: "check", label: "Teste grátis" },
                { icon: "message", label: "Sem cartão de crédito" },
                { icon: "check", label: "Configuração em minutos" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span aria-hidden className="inline-flex size-5 items-center justify-center rounded-full border border-cyan-400/60 text-cyan-300">
                    <Icon name={item.icon} size={12} stroke={2.6} />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lp-in-pop relative lg:pb-24" style={delay(350)}>
            <div className="lp-float lg:[transform-style:preserve-3d]">
              <div className="lg:[transform:perspective(1800px)_rotateY(-7deg)_rotateX(2deg)] lg:origin-left">
                <DashboardMock />
              </div>
            </div>
            <div className="mt-6 lg:absolute lg:-bottom-2 lg:-left-10 lg:z-10 lg:mt-0 lg:w-[340px] xl:-left-16 xl:w-[360px]">
              <McpCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
