import { Icon } from "../Icons";
import { BrandMark, type BrandId } from "./brands";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { Block, CtaRow, Dot, Grad, Head, Mini, Strip } from "./parts";
import { CheckDot, IconTile, Toggle } from "./ui";

const channels = [
  { name: "KIM GOLD SECRET", subs: "120.4K inscritos", on: true, tone: "gold" as const, icon: "crown" },
  { name: "GOLD SIGNALS", subs: "85.1K inscritos", on: true, tone: "gold" as const, icon: "box" },
  { name: "TRADER ZONE", subs: "42.7K inscritos", on: false, tone: "red" as const, icon: "target" },
  { name: "FX PREMIUM", subs: "98.7K inscritos", on: true, tone: "green" as const, icon: "growth" },
  { name: "VIP SIGNALS", subs: "55.3K inscritos", on: false, tone: "cyan" as const, icon: "shield" },
];

const chips = [
  { icon: "brain", label: "Parser de Sinais com IA", tone: "purple" as const },
  { icon: "filter", label: "Filtros Avançados", tone: "purple" as const },
  { icon: "shieldCheck", label: "Gerenciamento de Risco", tone: "green" as const },
  { icon: "settings", label: "Regras por Conta", tone: "blue" as const },
];

const steps = ["Interpreta o sinal (IA)", "Valida e aplica filtros", "Calcula o lote por conta", "Aplica regras personalizadas", "Envia para múltiplas plataformas", "Monitora e gerencia as posições"];

const platforms: [BrandId, string][] = [
  ["mt5", "MetaTrader 5"],
  ["mt4", "MetaTrader 4"],
  ["ninja", "NinjaTrader"],
  ["tradelocker", "TradeLocker"],
  ["dxtrade", "DXtrade"],
  ["ctrader", "cTrader"],
  ["oanda", "OANDA"],
  ["binance", "Binance Futures"],
  ["tradovate", "Tradovate"],
  ["matchtrader", "MatchTrader"],
  ["bybit", "Bybit"],
];

const tabs = [
  ["MetaTrader 5", "3 contas"],
  ["MetaTrader 4", "2 contas"],
  ["NinjaTrader", "2 contas"],
  ["TradeLocker", "1 conta"],
  ["OANDA", "1 conta"],
  ["Binance", "2 contas"],
];

const accounts = [
  ["12345678", "FundedNext", "0.05", "Normal"],
  ["87654321", "Conta Pessoal", "0.02", "Proporcional"],
  ["11223344", "Hantec Trader", "0.01", "Fixo"],
];

export function MultiPlatform() {
  return (
    <Block id="multi" labelledBy="multi-title">
      <Head
        id="multi-title"
        eyebrow="Multi-plataforma / Multi-conta"
        title={
          <>
            Uma origem, múltiplas plataformas, <Grad>várias contas</Grad>
          </>
        }
        description="Copie os mesmos sinais para diversas plataformas e contas ao mesmo tempo, com regras personalizadas para cada destino. O Copytrix oferece total flexibilidade para você operar do seu jeito."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,.78fr)_minmax(0,1fr)_minmax(0,1.75fr)]">
        <Reveal>
          <section aria-label="Origem dos sinais" className="lp-card flex h-full flex-col gap-3 p-4">
            <h3 className="text-[15px] font-bold text-white">Origem dos Sinais</h3>
            <div className="flex items-center gap-3 rounded-xl border border-sky-400/25 bg-[#07132a] p-2.5">
              <BrandMark id="telegram" size={40} />
              <div>
                <p className="text-sm font-bold text-white">Telegram</p>
                <p className="text-[11px] text-slate-400">Canais, Grupos e Salas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-sky-400/15 bg-[#050e22] px-3 py-2 text-[11px] text-slate-400">
              <Icon name="search" size={13} /> Buscar canal...
            </div>
            <ul className="space-y-1.5">
              {channels.map((c) => (
                <li key={c.name} className="flex items-center gap-2.5 rounded-lg border border-sky-400/10 bg-[#07132a] p-2">
                  <IconTile name={c.icon} tone={c.tone} size={34} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-semibold text-white">{c.name}</span>
                    <span className="block text-[9px] text-slate-400">{c.subs}</span>
                  </span>
                  <Toggle on={c.on} tone="green" />
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-xl border border-dashed border-sky-400/40 p-3 text-center">
              <p className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-white"><Icon name="plus" size={13} /> Adicionar Canal</p>
              <p className="mt-0.5 text-[10px] text-slate-400">Conecte quantos canais quiser</p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={90}>
          <div className="relative flex h-full flex-col gap-3">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2 min-[1500px]:grid-cols-4">
              {chips.map((c) => (
                <li key={c.label} className="lp-card flex flex-col items-center gap-1.5 p-2.5 text-center text-[10px] font-medium leading-tight text-slate-200">
                  <IconTile name={c.icon} tone={c.tone} size={30} />
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="relative flex flex-1 flex-col items-center gap-3 rounded-2xl border border-sky-400/20 bg-[radial-gradient(circle_at_50%_30%,rgba(30,120,255,.22),transparent_70%)] p-4">
              <span className="lp-conn" aria-hidden />
              <div className="lp-node flex flex-col items-center gap-2 rounded-2xl bg-[#06122a] px-6 py-5">
                <Logo size="lg" />
              </div>
              <ul className="w-full space-y-1.5">
                {steps.map((s) => (
                  <li key={s} className="flex items-center gap-2 rounded-lg border border-sky-400/15 bg-[#07132a]/90 px-3 py-1.5 text-[11.5px] text-slate-100">
                    <CheckDot tone="green" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-4">
          <Reveal delay={150}>
            <section aria-label="Múltiplas plataformas" className="lp-card p-4">
              <header className="mb-3 flex items-center gap-3">
                <IconTile name="layers" tone="purple" size={38} />
                <div>
                  <h3 className="text-[15px] font-bold leading-tight text-white">Múltiplas Plataformas</h3>
                  <p className="text-[11.5px] text-slate-300/90">Execute os sinais nas principais plataformas do mercado</p>
                </div>
              </header>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {platforms.map(([id, name]) => (
                  <li key={id} className="group flex flex-col items-center gap-1.5 rounded-xl border border-sky-400/15 bg-[#07132a]/80 px-1.5 py-2.5 text-center text-[11px] font-medium text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/60">
                    <BrandMark id={id} size={30} />
                    {name}
                  </li>
                ))}
                <li className="flex flex-col items-center justify-center gap-1 rounded-xl border border-sky-400/15 bg-[#07132a]/80 px-1.5 py-2.5 text-center text-[11px] text-slate-300">
                  <Icon name="plus" size={16} /> Mais Plataformas
                </li>
              </ul>
            </section>
          </Reveal>

          <Reveal delay={210}>
            <section aria-label="Múltiplas contas por plataforma" className="lp-card p-4">
              <header className="mb-3 flex items-center gap-3">
                <IconTile name="accounts" tone="blue" size={38} />
                <div>
                  <h3 className="text-[15px] font-bold leading-tight text-white">Múltiplas Contas por Plataforma</h3>
                  <p className="text-[11.5px] text-slate-300/90">Configure regras, lotes e configurações específicas para cada conta</p>
                </div>
              </header>
              <ul className="mb-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6" aria-hidden>
                {tabs.map(([n, c], i) => (
                  <li key={n} className={`rounded-lg px-1 py-1.5 text-center text-[10px] font-semibold leading-tight ${i === 0 ? "bg-sky-500 text-white" : "border border-sky-400/15 bg-[#07132a] text-slate-300"}`}>
                    {n}
                    <span className="block text-[9px] font-normal opacity-80">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="overflow-x-auto rounded-xl border border-sky-400/15 bg-[#06122a]/80">
                <table className="w-full min-w-[520px] text-left text-[11px]">
                  <thead className="text-slate-400">
                    <tr className="border-b border-sky-400/10">
                      {["", "Conta", "Nome", "Lote", "Modo de Cópia", "Status", "Ações"].map((h) => (
                        <th key={h} className="px-2.5 py-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-100">
                    {accounts.map(([acc, name, lot, mode]) => (
                      <tr key={acc} className="border-b border-sky-400/10 last:border-0">
                        <td className="px-2.5 py-2"><CheckDot tone="blue" /></td>
                        <td className="px-2.5 py-2">{acc}</td>
                        <td className="px-2.5 py-2">{name}</td>
                        <td className="px-2.5 py-2"><span className="rounded border border-sky-400/20 bg-[#050e22] px-2 py-0.5">{lot}</span></td>
                        <td className="px-2.5 py-2"><span className="rounded border border-sky-400/20 bg-[#050e22] px-2 py-0.5">{mode}</span></td>
                        <td className="px-2.5 py-2"><span className="inline-flex items-center gap-1.5 text-emerald-400"><Dot /> Conectada</span></td>
                        <td className="px-2.5 py-2"><span className="inline-flex gap-1.5 text-slate-300"><Icon name="edit" size={13} /><Icon name="settings" size={13} /></span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 font-semibold text-white"><Icon name="plus" size={12} /> Adicionar Conta</span>
                Configure quantas contas quiser por plataforma
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <Strip
        items={[
          { icon: "accounts", tone: "green", title: "Multi-contas", text: "Execute o mesmo sinal em várias contas ao mesmo tempo." },
          { icon: "layers", tone: "purple", title: "Multi-plataforma", text: "Suporte às principais plataformas do mercado." },
          { icon: "settings", tone: "blue", title: "Regras personalizadas", text: "Lotes, SL, TP e filtros específicos para cada conta." },
          { icon: "pulse", tone: "gold", title: "Execução simultânea", text: "Tudo acontece em segundos, com total precisão." },
        ]}
      />
      <CtaRow className="mt-8" />
    </Block>
  );
}
