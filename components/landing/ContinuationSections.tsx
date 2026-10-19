import { Icon } from "../Icons";
import { Reveal } from "./Reveal";
import { APP_HREF, CtaButton, Eyebrow } from "./ui";
import type { ReactNode } from "react";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <div className="mb-10 max-w-4xl text-center lg:mb-14"><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[46px]">{title}</h2><p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-300">{description}</p></div>;
}

const features = [
  ["send", "Trade Copier", "Copie sinais do Telegram automaticamente para suas contas."],
  ["brain", "Copytrix Intelligence", "Analise, interprete e otimize seus sinais com IA."],
  ["backtest", "Backtest avançado", "Teste estratégias com dados reais antes de operar."],
  ["shieldCheck", "Gerenciamento de risco", "Proteja seu capital com regras e controles avançados."],
  ["filter", "Filtros avançados", "Filtre sinais por spread, horário, notícias e muito mais."],
  ["accounts", "Multi-conta e plataforma", "Opere em várias contas e plataformas ao mesmo tempo."],
  ["book", "Trading Journal", "Acompanhe suas operações com análises detalhadas."],
  ["sparkles", "Execução inteligente", "Entradas precisas e configurações avançadas."],
] as const;

const integrations = ["MetaTrader 5", "MetaTrader 4", "NinjaTrader", "DXtrade", "cTrader", "TradeLocker", "OANDA", "Binance Futures", "Bybit", "Tradovate", "MatchTrader", "Rithmic"];
const testimonials = [
  ["Rodrigo S.", "Trader de Ouro", "O Copytrix automatizou meus sinais do Telegram. Hoje opero várias contas ao mesmo tempo, sem ficar na frente do computador."],
  ["Camila T.", "Trader Full Time", "A IA entende os sinais mesmo quando o formato muda. Isso me deu mais segurança e reduziu erros nas minhas operações."],
  ["Felipe M.", "Trader Prop Firms", "A execução é rápida e estável. Passei em 2 challenges usando apenas sinais do Telegram."],
  ["Lucas R.", "Trader Iniciante", "Em poucos cliques já estava copiando os sinais na minha conta, tudo demo e depois no real."],
] as const;
const plans = [
  ["Free", "R$ 0", "Para começar", ["1 conta de trading", "1 canal do Telegram", "Execução manual (1-clique)"]],
  ["Starter", "R$ 49,90", "Para traders em evolução", ["Até 3 contas de trading", "Copier automático", "Filtros de risco e execução", "Backtest básico"]],
  ["Pro", "R$ 99,90", "Para traders exigentes", ["Até 10 contas de trading", "Copier automático avançado", "Parser com Inteligência Artificial", "Backtest completo e análise"]],
  ["Premium", "R$ 199,90", "Para profissionais e mesas", ["Contas e canais ilimitados", "IA Copytrix Intelligence completa", "Prop Firm Engine", "Suporte VIP"]],
] as const;
const faqs = [
  ["Como o Copytrix copia os sinais do Telegram?", "O Copytrix monitora seus canais e grupos, identifica automaticamente os sinais e envia as operações para suas plataformas conectadas em tempo real."],
  ["Quais plataformas são suportadas?", "Você pode conectar MetaTrader 4/5, DXtrade, TradeLocker, NinjaTrader, cTrader, OANDA, Binance Futures e muitas outras."],
  ["Preciso deixar o computador ligado?", "Não. O Copytrix pode ser executado em VPS, garantindo operação contínua, mais estabilidade e segurança."],
  ["É seguro usar o Copytrix?", "Sim. Seus dados são criptografados e você mantém o controle das regras e dos limites de cada operação."],
  ["Posso usar várias contas?", "Sim. Conecte múltiplas contas e plataformas ao mesmo tempo, com configurações de risco personalizadas."],
  ["O Copytrix tem backtest?", "Sim. Valide sua estratégia com dados históricos antes de operar ao vivo."],
] as const;

function IconCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <div className="lp-card lp-card-hover p-5"><div className="flex items-start gap-4"><span className="lp-section-icon"><Icon name={icon} size={24} /></span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p></div></div></div>;
}

export function ContinuationSections() {
  return <>
    <section id="recursos" className="lp-section"><SectionHeading eyebrow="Principais recursos" title={<>Tudo que você precisa para transformar sinais em <span className="lp-grad">resultados</span></>} description="Automação, inteligência artificial e ferramentas profissionais para você operar com mais eficiência, segurança e controle." />
      <div className="mx-auto grid max-w-[1360px] gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(([icon, title, text], i) => <Reveal key={title} delay={i * 45}><IconCard icon={icon} title={title} text={text} /></Reveal>)}</div>
    </section>
    <section id="como-funciona" className="lp-section"><SectionHeading eyebrow="Como funciona" title={<>Do sinal no Telegram ao <span className="lp-grad">resultado na sua conta</span></>} description="Conecte, configure e deixe a plataforma copiar, filtrar e executar os sinais automaticamente." />
      <div className="mx-auto grid max-w-[1360px] gap-4 md:grid-cols-4">{["Conecte suas fontes", "Configure e filtre", "A IA processa o sinal", "Execute nas suas contas"].map((title, i) => <Reveal key={title} delay={i * 90}><div className="lp-card p-6 text-center"><span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full border border-sky-400/60 text-2xl font-bold text-sky-300">{i + 1}</span><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">{["Conecte seus canais do Telegram e escolha quais sinais copiar.", "Defina regras, gerenciamento de risco e filtros avançados.", "Nossa IA interpreta, valida e executa os sinais com precisão.", "Os sinais são executados automaticamente nas contas escolhidas."][i]}</p></div></Reveal>)}</div>
    </section>
    <section id="integracoes" className="lp-section"><SectionHeading eyebrow="Integrações suportadas" title={<>Conecte-se com as <span className="lp-grad">principais plataformas</span> do mercado</>} description="Copie, envie e gerencie seus sinais em múltiplas contas de forma rápida, segura e estável." /><div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{integrations.map((name, i) => <Reveal key={name} delay={i * 35}><div className="lp-card lp-card-hover flex min-h-24 flex-col items-center justify-center gap-3 p-3 text-center"><span className="lp-section-icon"><Icon name={i % 3 === 0 ? "chart" : i % 3 === 1 ? "layers" : "systems"} size={24} /></span><span className="text-sm font-semibold text-slate-200">{name}</span></div></Reveal>)}</div></section>
    <section id="depoimentos" className="lp-section"><SectionHeading eyebrow="Depoimentos / resultados" title={<>Resultados reais de traders <span className="lp-grad">como você</span></>} description="Mais praticidade, consistência e tempo para o que realmente importa." /><div className="mx-auto grid max-w-[1360px] gap-4 md:grid-cols-2 lg:grid-cols-4">{testimonials.map(([name, role, quote], i) => <Reveal key={name} delay={i * 60}><article className="lp-card lp-card-hover p-5"><div className="flex items-center justify-between"><div><h3 className="font-bold text-white">{name}</h3><p className="text-xs text-slate-400">{role}</p></div><span className="text-amber-300">★★★★★</span></div><p className="mt-5 text-sm leading-relaxed text-slate-300">“{quote}”</p></article></Reveal>)}</div></section>
    <section id="precos" className="lp-section"><SectionHeading eyebrow="Planos / CTA" title={<>Escolha o plano ideal <span className="lp-grad">para sua jornada</span></>} description="Do iniciante ao profissional, existe um plano para você operar com segurança." /><div className="mx-auto grid max-w-[1360px] gap-4 md:grid-cols-2 lg:grid-cols-4">{plans.map(([name, price, subtitle, items], i) => <Reveal key={name} delay={i * 60}><article className={`lp-card lp-card-hover flex h-full flex-col p-6 ${name === "Pro" ? "lp-plan-featured" : ""}`}><h3 className="text-xl font-bold text-white">{name}</h3><p className="mt-1 text-sm text-slate-400">{subtitle}</p><p className="mt-5 text-3xl font-extrabold text-white">{price}<span className="text-sm font-normal text-slate-400"> /mês</span></p><ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">{items.map((item) => <li key={item} className="flex gap-2"><Icon name="check" size={17} />{item}</li>)}</ul><CtaButton href={APP_HREF} className="mt-7 w-full">{name === "Free" ? "Começar grátis" : `Assinar ${name}`}</CtaButton></article></Reveal>)}</div></section>
    <section id="faq" className="lp-section"><SectionHeading eyebrow="FAQ" title={<>Dúvidas frequentes, <span className="lp-grad">respostas objetivas</span></>} description="Tudo para começar de forma rápida, segura e sem complicação." /><div className="mx-auto grid max-w-[1040px] gap-3 md:grid-cols-2">{faqs.map(([question, answer], i) => <Reveal key={question} delay={i * 45}><details className="lp-card group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-white"><span>{question}</span><Icon name="chevronDown" size={18} /></summary><p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-300">{answer}</p></details></Reveal>)}</div></section>
    <footer className="border-t border-sky-400/15 px-5 py-12 sm:px-8"><div className="mx-auto grid max-w-[1360px] gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12"><div><div className="text-2xl font-extrabold text-white">Copytrix</div><p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">Automatize, copie, analise e evolua. Transforme sinais do Telegram em resultados reais.</p></div>{[["Produto", "Funcionalidades", "Planos", "Integrações", "Segurança"], ["Recursos", "Blog", "Tutoriais", "Central de Ajuda", "Documentação"], ["Empresa", "Sobre o Copytrix", "Termos de Uso", "Privacidade", "Contato"]].map(([heading, ...links]) => <div key={heading}><h3 className="font-bold text-white">{heading}</h3><ul className="mt-4 space-y-3 text-sm text-slate-400">{links.map((link) => <li key={link}>{link}</li>)}</ul></div>)}</div><div className="mx-auto mt-10 max-w-[1360px] border-t border-sky-400/15 pt-5 text-sm text-slate-500">© 2026 Copytrix. Todos os direitos reservados.</div></footer>
  </>;
}
