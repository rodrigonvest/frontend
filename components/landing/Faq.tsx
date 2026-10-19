import { Icon } from "../Icons";
import { CountUp } from "./CountUp";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Grad, Head } from "./parts";
import { APP_HREF, CheckDot, CtaButton, IconTile } from "./ui";

const faqs = [
  { icon: "send", tone: "blue" as const, q: "Como o Copytrix copia os sinais do Telegram?", a: "O Copytrix monitora seus canais e grupos do Telegram, identifica automaticamente os sinais e envia as operações para as plataformas conectadas em tempo real." },
  { icon: "settings", tone: "purple" as const, q: "Quais plataformas são suportadas?", a: "O Copytrix integra com mais de 38 plataformas, incluindo MetaTrader 4/5, DXtrade, TradeLocker, NinjaTrader, cTrader, OANDA, Binance Futures e outras." },
  { icon: "pulse", tone: "gold" as const, q: "Preciso deixar o computador ligado?", a: "Não. O Copytrix pode ser executado em VPS, garantindo operação 24/7, mais estabilidade e segurança para copiar seus sinais sem interrupções." },
  { icon: "shieldCheck", tone: "green" as const, q: "É seguro usar o Copytrix?", a: "Sim. Seus dados são criptografados, o acesso é seguro e você mantém total controle das suas contas. O Copytrix apenas executa as operações conforme suas regras." },
  { icon: "analytics", tone: "blue" as const, q: "Posso usar em várias contas?", a: "Sim. Você pode conectar e operar em múltiplas contas e plataformas ao mesmo tempo, com configurações de risco personalizadas para cada uma." },
  { icon: "accounts", tone: "purple" as const, q: "O Copytrix tem backtest?", a: "Sim. Você pode fazer backtest dos sinais do Telegram, analisar o desempenho histórico e validar sua estratégia antes de operar ao vivo." },
  { icon: "filter", tone: "green" as const, q: "Consigo definir o gerenciamento de risco?", a: "Sim. O Copytrix possui várias opções de Risk Management, como tamanho de lote fixo, por percentual de risco, limite diário, stop loss, take profit e muito mais." },
  { icon: "dollar", tone: "blue" as const, q: "Funciona com contas de Prop Firms?", a: "Sim. O Copytrix é amplamente usado com contas de prop firms. Você pode configurar as regras de risco para seguir os limites de cada mesa." },
  { icon: "clock", tone: "purple" as const, q: "Qual é o tempo de execução dos sinais?", a: "A execução é em tempo real, com baixa latência, dependendo da sua conexão e da plataforma utilizada." },
  { icon: "help", tone: "gold" as const, q: "Tenho suporte se precisar de ajuda?", a: "Sim. Oferecemos suporte especializado para te ajudar na configuração, integração e em todas as suas dúvidas." },
];

const trust = [
  { icon: "accounts", tone: "blue" as const, count: { to: 10000, group: true, suffix: "+" }, label: "Traders no mundo" },
  { icon: "trophy", tone: "gold" as const, count: { to: 4.9, decimals: 1, suffix: "/5" }, label: "Avaliação dos usuários" },
  { icon: "shieldCheck", tone: "green" as const, count: { to: 99.9, decimals: 1, suffix: "%" }, label: "Uptime e estabilidade" },
];

export function Faq() {
  return (
    <Block id="faq" labelledBy="faq-title">
      <Head
        id="faq-title"
        eyebrow="FAQ"
        title={
          <>
            Dúvidas frequentes, <Grad>respostas objetivas</Grad>
          </>
        }
        description="Tire suas principais dúvidas sobre o Copytrix e descubra como começar de forma rápida, segura e sem complicação."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2.4fr)_minmax(0,.9fr)]">
        <ul className="grid gap-3 md:grid-cols-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} as="li" delay={(i % 2) * 70}>
              <details open className="lp-card lp-card-hover group h-full">
                <summary className="flex cursor-pointer list-none items-start gap-3.5 p-4 [&::-webkit-details-marker]:hidden">
                  <IconTile name={f.icon} tone={f.tone} size={46} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold leading-snug text-white">{f.q}</span>
                    <span className="mt-1.5 hidden text-[13px] leading-relaxed text-slate-300/90 group-open:block">{f.a}</span>
                  </span>
                  <span aria-hidden className="mt-1 text-slate-400 transition-transform group-open:rotate-180">
                    <Icon name="chevronDown" size={16} />
                  </span>
                </summary>
              </details>
            </Reveal>
          ))}
        </ul>

        <aside className="flex flex-col gap-4">
          <Reveal delay={120}>
            <div className="lp-card flex flex-col items-center gap-4 p-5">
              <Logo />
              <BubbleArt />
              <div className="w-full rounded-xl border border-sky-400/20 bg-[#06122a]/80 p-3">
                <div className="flex items-center gap-3">
                  <IconTile name="bulb" tone="gold" size={40} />
                  <div>
                    <p className="text-[14px] font-bold text-white">Ainda tem dúvidas?</p>
                    <p className="text-[11.5px] text-slate-300">Nossa equipe está pronta para te ajudar.</p>
                  </div>
                </div>
                <a href="/help" className="group mt-3 flex items-center justify-between rounded-lg border border-sky-400/40 bg-[#07173a] px-3 py-2.5 text-[13px] font-semibold text-sky-300 transition hover:border-sky-400">
                  <span className="flex items-center gap-2"><Icon name="message" size={14} /> Falar com o suporte</span>
                  <span className="lp-arrow"><Icon name="arrowRight" size={14} /></span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="lp-card p-4">
              <p className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white"><Icon name="shield" size={16} /> Trusted by Traders</p>
              <ul className="grid grid-cols-3 gap-2 text-center">
                {trust.map((t) => (
                  <li key={t.label} className="flex flex-col items-center gap-1">
                    <IconTile name={t.icon} tone={t.tone} size={36} />
                    <span className="text-[16px] font-extrabold leading-none text-cyan-300"><CountUp {...t.count} /></span>
                    <span className="text-[10.5px] leading-tight text-slate-300">{t.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>

      <Reveal className="mt-4">
        <div className="lp-card flex flex-col items-center gap-5 p-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <Logo size="lg" />
          <div className="min-w-0">
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">Pronto para começar a copiar seus sinais?</h3>
            <p className="mt-1 text-sm text-slate-300">Junte-se a milhares de traders que já automatizam suas operações com o Copytrix.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CtaButton href={APP_HREF} arrow>
              Comece agora grátis
            </CtaButton>
            <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-300">
              {["Sem cartão de crédito", "Ativação imediata", "Suporte especializado"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><CheckDot tone="green" /> {t}</span>
              ))}
            </p>
          </div>
        </div>
      </Reveal>
    </Block>
  );
}

function BubbleArt() {
  return (
    <svg viewBox="0 0 280 190" className="lp-float h-auto w-full max-w-[260px]" role="img" aria-label="Balões de conversa com ponto de interrogação">
      <defs>
        <linearGradient id="bb1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b9bff" />
          <stop offset="100%" stopColor="#1a3fbf" />
        </linearGradient>
        <linearGradient id="bb2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6d4bff" />
          <stop offset="100%" stopColor="#2a1c8f" />
        </linearGradient>
        <filter id="bbGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse cx="140" cy="95" rx="110" ry="70" fill="#1e78ff" opacity=".25" filter="url(#bbGlow)" />
      <path d="M30 40a28 28 0 0 1 28-28h96a28 28 0 0 1 28 28v66a28 28 0 0 1-28 28h-52l-36 28 6-28h-14a28 28 0 0 1-28-28z" fill="url(#bb1)" stroke="#8cc8ff" strokeOpacity=".6" />
      <text x="106" y="98" textAnchor="middle" fontSize="76" fontWeight="800" fill="#e6f3ff">?</text>
      <path d="M150 92a24 24 0 0 1 24-24h58a24 24 0 0 1 24 24v36a24 24 0 0 1-24 24h-8l6 22-30-22h-26a24 24 0 0 1-24-24z" fill="url(#bb2)" stroke="#c9b4ff" strokeOpacity=".6" />
      <circle cx="184" cy="110" r="6" fill="#4cc3ff" />
      <circle cx="204" cy="110" r="6" fill="#4cc3ff" />
      <circle cx="224" cy="110" r="6" fill="#c084fc" />
    </svg>
  );
}
