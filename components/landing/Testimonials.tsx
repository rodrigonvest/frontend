import { BrandMark, type BrandId } from "./brands";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { Avatar, Block, CtaRow, Flag, Grad, Head, Lines, Stars, walk } from "./parts";
import { IconTile } from "./ui";

type Featured = {
  name: string;
  role: string;
  hue: number;
  quote: string;
  platform: BrandId;
  platformName: string;
  symbol: string;
  gain: string;
  trades: string;
  win: string;
  profit: string;
  equity: string;
  color: string;
  seed: number;
};

const featured: Featured[] = [
  { name: "Rodrigo S.", role: "Trader de Ouro", hue: 25, quote: "O Copytrix automatizou 100% dos meus sinais do Telegram. Hoje opero várias contas ao mesmo tempo, sem precisar ficar na frente do computador o dia todo.", platform: "mt5", platformName: "MetaTrader 5", symbol: "XAUUSD", gain: "+28.5%", trades: "142", win: "61.3%", profit: "+$2,850.00", equity: "$12,850.00", color: "#12d99e", seed: 5 },
  { name: "Camila T.", role: "Trader Full Time", hue: 330, quote: "A IA do Copytrix entende os sinais mesmo quando o formato muda. Isso me deu muito mais segurança e reduziu erros nas minhas operações.", platform: "ninja", platformName: "NinjaTrader", symbol: "US100", gain: "+19.7%", trades: "87", win: "57.5%", profit: "+$1,970.00", equity: "$9,970.00", color: "#a855f7", seed: 11 },
  { name: "Felipe M.", role: "Trader Prop Firms", hue: 205, quote: "Uso o Copytrix nas minhas contas de avaliação. A execução é rápida e estável. Passei em 2 challenges usando apenas sinais do Telegram.", platform: "tradelocker", platformName: "TradeLocker", symbol: "XAUUSD", gain: "+12.4%", trades: "63", win: "68.3%", profit: "+$1,240.00", equity: "$11,240.00", color: "#2f8bff", seed: 17 },
  { name: "Lucas R.", role: "Trader Iniciante", hue: 150, quote: "Comecei agora no trading e o Copytrix facilitou muito minha jornada. Em poucos cliques já estava copiando os sinais na minha conta demo e depois na real.", platform: "bybit", platformName: "Bybit (Futuros)", symbol: "BTCUSDT", gain: "+35.2%", trades: "96", win: "60.4%", profit: "+$3,520.00", equity: "$13,520.00", color: "#c084fc", seed: 23 },
];

const simple = [
  { name: "Marcos V.", role: "Trader Multiplataforma", hue: 260, quote: "Consigo copiar os mesmos sinais para MT5, DXtrade e TradeLocker ao mesmo tempo. O Copytrix realmente entrega o que promete." },
  { name: "Thiago A.", role: "Trader de Índices", hue: 190, quote: "O backtest me ajudou a validar a estratégia antes de operar. Hoje tenho muito mais confiança nos resultados." },
  { name: "Renato C.", role: "Trader Profissional", hue: 40, quote: "A gestão de risco automática é um diferencial enorme. Consigo proteger meu capital e operar com muito mais disciplina." },
  { name: "Juliana F.", role: "Trader de Cripto", hue: 300, quote: "Suporte excelente e plataforma muito completa. Em poucos dias já estava tudo funcionando." },
];

const stats = [
  { icon: "accounts", tone: "blue" as const, count: { to: 10000, group: true, suffix: "+" }, title: "Traders Conectados", text: "Em mais de 30 países" },
  { icon: "trophy", tone: "gold" as const, count: { to: 4.9, decimals: 1, suffix: "/5" }, title: "Avaliação dos Usuários", text: "Com base em +1.200 reviews" },
  { icon: "barsFilled", tone: "blue" as const, count: { to: 98, suffix: "%" }, title: "Recomendam o Copytrix", text: "Para outros traders" },
  { icon: "shieldCheck", tone: "green" as const, count: { to: 99.9, decimals: 1, suffix: "%" }, title: "Uptime e Estabilidade", text: "Operação contínua e segura" },
];

export function Testimonials() {
  return (
    <Block id="depoimentos" labelledBy="testimonials-title">
      <Head
        id="testimonials-title"
        eyebrow="Depoimentos / Resultados"
        title={
          <>
            Resultados reais de <Grad>traders como você</Grad>
          </>
        }
        description="Veja o que nossos usuários estão conquistando com o Copytrix. Mais praticidade, mais consistência e mais tempo para o que realmente importa."
      />

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((t, i) => (
          <Reveal key={t.name} as="li" delay={i * 70} className="h-full">
            <article className="lp-card lp-card-hover flex h-full flex-col gap-3 p-4">
              <header className="flex items-center gap-3">
                <Avatar name={t.name} hue={t.hue} size={52} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[15px] font-bold text-white">{t.name} <Flag /></p>
                  <p className="text-[12px] text-slate-400">{t.role}</p>
                </div>
                <Stars className="shrink-0" />
              </header>
              <blockquote className="text-pretty text-[13px] leading-relaxed text-slate-200">“{t.quote}”</blockquote>
              <div className="mt-auto rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3">
                <div className="mb-2 flex items-center gap-2 text-[11px] text-white">
                  <BrandMark id={t.platform} size={20} />
                  <span className="min-w-0 flex-1 truncate font-semibold">{t.platformName}</span>
                  <span className="rounded-md border border-sky-400/20 px-1.5 py-0.5 text-[10px] text-slate-200">{t.symbol}</span>
                  <span className="rounded-md border px-1.5 py-0.5 text-[11px] font-bold" style={{ color: t.color, borderColor: `${t.color}88`, background: `${t.color}22` }}>{t.gain}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[9px] text-slate-400">
                  <p>Trades<strong className="block text-[14px] text-white">{t.trades}</strong></p>
                  <p>Win Rate<strong className="block text-[14px] text-emerald-400">{t.win}</strong></p>
                  <p>Lucro (USD)<strong className="block text-[14px] text-emerald-400">{t.profit}</strong></p>
                </div>
                <div className="relative mt-2">
                  <Lines id={`tm-${i}`} w={260} h={90} grid={2} series={[{ points: walk(t.seed, 24, 0.7, 2.2), color: t.color, area: true }]} />
                  <span className="absolute bottom-1 right-1 rounded-md border border-sky-400/25 bg-[#07132a] px-2 py-1 text-[9px] leading-tight text-slate-300">
                    Equity Final<strong className="block text-[11px] text-white">{t.equity}</strong>
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {simple.map((t, i) => (
          <Reveal key={t.name} as="li" delay={i * 70} className="h-full">
            <article className="lp-card lp-card-hover flex h-full flex-col gap-3 p-4">
              <header className="flex items-center gap-3">
                <Avatar name={t.name} hue={t.hue} size={46} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[14px] font-bold text-white">{t.name} <Flag /></p>
                  <p className="text-[12px] text-slate-400">{t.role}</p>
                </div>
                <Stars className="shrink-0" />
              </header>
              <blockquote className="text-pretty text-[13px] leading-relaxed text-slate-200">“{t.quote}”</blockquote>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-4">
        <ul className="lp-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-0 lg:p-0">
          {stats.map((s, i) => (
            <li key={s.title} className={`flex items-center gap-3.5 lg:p-5 ${i > 0 ? "lg:border-l lg:border-sky-400/15" : ""}`}>
              <IconTile name={s.icon} tone={s.tone} size={52} />
              <div className="min-w-0">
                <p className="text-[26px] font-extrabold leading-none text-sky-300"><CountUp {...s.count} /></p>
                <p className="mt-1 text-[14px] font-semibold text-white">{s.title}</p>
                <p className="text-[12px] text-slate-400">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <CtaRow className="mt-8" checks={["Setup em minutos", "Sem complicação", "Funciona em múltiplas contas", "Suporte especializado"]} />
    </Block>
  );
}
