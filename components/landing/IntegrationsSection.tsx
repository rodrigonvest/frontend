import { Icon } from "../Icons";
import { BrandMark, BrandTile, type BrandId } from "./brands";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Grad, Head, Strip } from "./parts";
import { IconTile } from "./ui";

const sources: { id: BrandId; name: string; text: string }[] = [
  { id: "telegram", name: "Telegram", text: "Canais, Grupos e Salas" },
  { id: "tradingview", name: "TradingView", text: "Indicadores e Alertas" },
  { id: "webhook", name: "Webhook", text: "Sinais personalizados" },
  { id: "email", name: "Email", text: "Receba sinais por e-mail" },
  { id: "api", name: "API", text: "Integração via API" },
  { id: "files", name: "Arquivos", text: "CSV, TXT e outros formatos" },
];

const execution: BrandId[] = ["mt5", "mt4", "ninja", "dxtrade", "ctrader", "tradelocker", "oanda", "binance", "bybit", "tradovate", "matchtrader", "rithmic", "ib", "pepperstone", "thinkmarkets", "zeromarkets"];

const categories: { icon: string; tone: "purple" | "blue" | "gold" | "green"; title: string; text: string; link: string; items: BrandId[] }[] = [
  { icon: "layers", tone: "purple", title: "Plataformas de Forex / CFDs", text: "As principais corretoras e plataformas do mercado.", link: "Ver todas as corretoras", items: ["mt5", "mt4", "ctrader", "tradelocker", "oanda", "pepperstone", "thinkmarkets", "zeromarkets"] },
  { icon: "trades", tone: "blue", title: "Plataformas de Futuros", text: "Execute seus sinais no mercado de futuros.", link: "Ver todas as plataformas de futuros", items: ["ninja", "tradovate", "rithmic", "dxtrade", "bybit", "cme", "binance", "kucoin"] },
  { icon: "target", tone: "gold", title: "Criptomoedas", text: "Suporte para exchanges e conta spot/futuros.", link: "Ver todas as exchanges", items: ["binance", "bybit", "kucoin", "okx", "bingx", "bitget", "deribit", "gate"] },
  { icon: "settings", tone: "green", title: "Outras Integrações", text: "Mais possibilidades para o seu fluxo de trabalho.", link: "Ver todas as integrações", items: ["tradingview", "telegram", "webhook", "email", "api", "excel", "discord", "zapier"] },
];

export function IntegrationsSection() {
  return (
    <Block id="integracoes" labelledBy="integrations-title">
      <Head
        id="integrations-title"
        eyebrow="Integrações suportadas"
        tone="purple"
        title={
          <>
            Conecte-se com as <Grad>principais plataformas</Grad> do mercado
          </>
        }
        description="O Copytrix se integra com mais de 38 plataformas de trading, permitindo que você copie, envie e gerencie seus sinais em múltiplas contas, de forma rápida, segura e estável."
      />

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,.62fr)_minmax(0,1.35fr)]">
        <Reveal>
          <section aria-label="Fontes de sinais" className="lp-card h-full p-4">
            <header className="mb-3 flex items-center gap-3">
              <IconTile name="send" tone="blue" size={40} />
              <div>
                <h3 className="text-[16px] font-bold leading-tight text-white">Fontes de Sinais</h3>
                <p className="text-[12px] text-slate-300/90">Receba sinais de várias fontes</p>
              </div>
            </header>
            <ul className="space-y-2">
              {sources.map((s) => (
                <li key={s.name} className="group flex items-center gap-3 rounded-xl border border-sky-400/15 bg-[#07132a]/80 p-2 transition hover:border-sky-400/50">
                  <BrandMark id={s.id} size={40} />
                  <span>
                    <span className="block text-[14px] font-bold leading-tight text-white">{s.name}</span>
                    <span className="block text-[11.5px] text-slate-400">{s.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={90}>
          <div className="relative flex h-full flex-col items-center justify-center gap-4 py-4">
            <span className="lp-conn" aria-hidden />
            <div className="lp-node rounded-2xl bg-[#06122a] px-6 py-6">
              <Logo size="lg" />
            </div>
            <div className="lp-card flex items-center gap-3 px-4 py-3">
              <span aria-hidden className="text-sky-400"><Icon name="pulse" size={26} /></span>
              <p className="text-[12px] leading-tight text-slate-200"><strong className="block text-[17px] text-cyan-300">38+ Integrações</strong>em constante expansão</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <section aria-label="Plataformas de execução" className="lp-card h-full p-4">
            <header className="mb-3 flex items-center gap-3">
              <IconTile name="barsFilled" tone="purple" size={40} />
              <div>
                <h3 className="text-[16px] font-bold leading-tight text-white">Plataformas de Execução</h3>
                <p className="text-[12px] text-slate-300/90">Envie e execute os sinais automaticamente</p>
              </div>
            </header>
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {execution.map((id) => (
                <li key={id}><BrandTile id={id} size={36} className="h-full" /></li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      <Strip
        items={[
          { icon: "shieldCheck", tone: "green", title: "Conexão segura", text: "Criptografia e autenticação" },
          { icon: "pulse", tone: "purple", title: "Execução em tempo real", text: "Baixa latência e alta estabilidade" },
          { icon: "accounts", tone: "green", title: "Multi-contas", text: "Gerencie várias contas e plataformas" },
          { icon: "settings", tone: "blue", title: "Fácil configuração", text: "Conecte em poucos cliques" },
        ]}
      />

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.title} delay={i * 60}>
            <section className="lp-card lp-card-hover flex h-full flex-col p-4">
              <header className="mb-3 flex items-start gap-3">
                <IconTile name={c.icon} tone={c.tone} size={38} />
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold leading-tight text-white">{c.title}</h3>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-slate-300/90">{c.text}</p>
                </div>
              </header>
              <ul className="grid grid-cols-4 gap-1.5">
                {c.items.map((id) => (
                  <li key={id}><BrandTile id={id} size={30} className="h-full !px-1 !py-2" /></li>
                ))}
              </ul>
              <a href="#integracoes" className="group mt-auto inline-flex items-center justify-center gap-2 pt-4 text-[12px] font-medium text-sky-400 transition hover:text-sky-300">
                {c.link}
                <span className="lp-arrow"><Icon name="arrowRight" size={14} /></span>
              </a>
            </section>
          </Reveal>
        ))}
      </div>
      <CtaRow className="mt-8" />
    </Block>
  );
}
