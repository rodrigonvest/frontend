import Image from "next/image";
import Link from "next/link";
import { Icon } from "../Icons";
import { BrandMark } from "./brands";
import { IconTile } from "./ui";

function buildCandles() {
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let price = 40;
  const raw = Array.from({ length: 34 }, (_, i) => {
    const open = price;
    const close = open + (rnd() - 0.42) * 9 + (i > 14 ? 1 : 0);
    const high = Math.max(open, close) + rnd() * 4;
    const low = Math.min(open, close) - rnd() * 4;
    price = close;
    return { open, close, high, low };
  });
  const min = Math.min(...raw.map((c) => c.low));
  const max = Math.max(...raw.map((c) => c.high));
  const y = (v: number) => 150 - ((v - min) / (max - min)) * 140;
  return raw.map((c, i) => ({
    x: 6 + i * 10,
    up: c.close >= c.open,
    top: y(Math.max(c.open, c.close)),
    bottom: y(Math.min(c.open, c.close)),
    high: y(c.high),
    low: y(c.low),
  }));
}

const candles = buildCandles();

const navItems = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "trades", label: "Operações" },
  { icon: "telegram", label: "Canais Telegram" },
  { icon: "accounts", label: "Contas" },
  { icon: "analytics", label: "Desempenho" },
  { icon: "backtest", label: "Backtest" },
];

const kpis = [
  { icon: "send", tone: "blue" as const, label: "Sinais Hoje", value: "73", note: "+12%", noteTone: "text-emerald-400" },
  { icon: "target", tone: "green" as const, label: "Executados", value: "68", note: "93.2%", noteTone: "text-slate-300" },
  { icon: "dollar", tone: "gold" as const, label: "Lucro Total", value: "+137.6R", note: "+$8,256.00", noteTone: "text-emerald-400" },
  { icon: "trophy", tone: "gold" as const, label: "Win Rate", value: "67.6%", note: "46 ganhos", noteTone: "text-slate-300" },
];

const prompts = [
  { icon: "shieldCheck", text: "Mostre minhas operações de hoje." },
  { icon: "settings", text: "Pause o sistema KIM GOLD." },
  { icon: "barsFilled", text: "Execute um backtest de junho a setembro." },
  { icon: "shield", text: "Configure risco de 0.5% na minha conta." },
];

function Candles() {
  return (
    <svg viewBox="0 0 350 160" className="block h-auto w-full" aria-hidden>
      {[35, 70, 105, 140].map((y) => (
        <line key={y} x1="0" x2="350" y1={y} y2={y} stroke="rgba(120,160,255,.1)" />
      ))}
      {candles.map((c, i) => (
        <g key={c.x} className="lp-candle" style={{ "--i": i } as React.CSSProperties}>
          <line x1={c.x} x2={c.x} y1={c.high} y2={c.low} stroke={c.up ? "#12d99e" : "#ff5d6d"} strokeWidth="1.2" />
          <rect x={c.x - 3} y={c.top} width="6" height={Math.max(2, c.bottom - c.top)} rx="1" fill={c.up ? "#12d99e" : "#ff5d6d"} />
        </g>
      ))}
    </svg>
  );
}

export function DashboardMock() {
  return (
    <div className="lp-card rounded-2xl p-2 shadow-[0_0_90px_-20px_rgba(30,110,255,.65)]">
      <div className="flex gap-2.5 rounded-xl bg-[#050e22] p-2 sm:p-3">
        <aside className="hidden w-[118px] shrink-0 sm:block" aria-hidden>
          <div className="mb-3 flex items-center gap-1.5 px-1 text-[13px] font-bold text-white">
            <span className="flex size-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <svg width="14" height="14" viewBox="0 0 27 27" fill="none">
                <path d="M22.6 9.2a9.8 9.8 0 1 1-4.1-4.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="m8 13.8 3.2 3.2L22.7 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Copytrix
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-medium ${item.active ? "bg-sky-500/20 text-white" : "text-slate-400"}`}>
                <Icon name={item.icon} size={12} />
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]" aria-hidden>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 font-semibold text-emerald-300">
              <span className="lp-ping relative size-1.5 rounded-full bg-emerald-400" /> Copier Online
            </span>
            <span className="rounded-lg border border-sky-400/20 bg-sky-500/10 px-2 py-1 text-sky-200">Telegram Conectado</span>
            <span className="rounded-lg border border-sky-400/20 bg-sky-500/10 px-2 py-1 text-sky-200">MT5 Conectado</span>
            <span className="ml-auto hidden items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-amber-300 md:inline-flex">
              <Icon name="crown" size={11} /> Plano Pro
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 xl:grid-cols-4" aria-hidden>
            {kpis.map((k) => (
              <div key={k.label} className="flex items-center gap-2 rounded-xl border border-sky-400/15 bg-[#07132a] p-2.5">
                <IconTile name={k.icon} tone={k.tone} size={32} />
                <div className="min-w-0">
                  <p className="truncate text-[9px] text-slate-400">{k.label}</p>
                  <p className="text-[15px] font-bold leading-tight text-white">{k.value}</p>
                  <p className={`text-[9px] font-semibold ${k.noteTone}`}>{k.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5 md:grid-cols-[1.55fr_1fr]">
            <div className="rounded-xl border border-sky-400/15 bg-[#07132a] p-3" aria-hidden>
              <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-2 py-1 font-semibold text-amber-200">
                  <Icon name="crown" size={11} /> XAUUSD
                </span>
                {["M1", "M5", "M15", "M30", "H1", "H4"].map((tf) => (
                  <span key={tf} className={`rounded px-1.5 py-0.5 ${tf === "M5" ? "bg-sky-500 font-semibold text-white" : "text-slate-400"}`}>
                    {tf}
                  </span>
                ))}
              </div>
              <div className="relative">
                <Candles />
                <span className="absolute right-[18%] top-[14%] rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">TP 3,642.50</span>
                <span className="absolute left-[24%] top-[52%] rounded bg-sky-500 px-1.5 py-0.5 text-[9px] font-bold text-white">Entrada 3,627.50</span>
                <span className="absolute bottom-[14%] right-[6%] rounded bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">SL 3,607.50</span>
              </div>
            </div>

            <div className="rounded-xl border border-sky-400/15 bg-[#07132a] p-3" aria-hidden>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-white">
                <span className="flex size-5 items-center justify-center rounded-md bg-sky-500 text-white">
                  <Icon name="telegram" size={11} />
                </span>
                Sinal do Telegram
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                  <Icon name="crown" size={15} />
                </span>
                <div>
                  <p className="text-[12px] font-bold text-white">XAUUSD BUY</p>
                  <p className="text-[9px] text-slate-400">12/08/2026 14:35</p>
                </div>
              </div>
              <dl className="space-y-0.5 text-[10px] text-slate-300">
                <div>Entrada: 3,627.50</div>
                <div>SL: 3,607.50 (20 pips)</div>
                <div>TP1: 3,632.50</div>
                <div>TP2: 3,637.50</div>
                <div>TP3: 3,642.50</div>
              </dl>
              <span className="mt-2.5 flex h-8 items-center justify-center rounded-lg bg-sky-500 text-[11px] font-semibold text-white">Executar Sinal</span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2" aria-hidden>
            {prompts.map((p) => (
              <div key={p.text} className="flex items-center gap-2.5 rounded-xl border border-sky-400/15 bg-[#07132a] p-2.5 text-[10px] text-slate-200">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                  <Icon name={p.icon} size={12} />
                </span>
                {p.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function McpCard() {
  return (
    <div id="mcp" className="lp-card scroll-mt-28 rounded-2xl border-sky-400/30 bg-[#06122a]/95 p-4 shadow-[0_20px_70px_-20px_rgba(30,110,255,.7)] sm:p-5">
      <div className="flex items-start gap-3">
        <IconTile name="bot" tone="purple" size={42} />
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-base font-bold text-white">
            Copytrix MCP
            <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">Novo</span>
          </p>
          <p className="mt-1 text-xs leading-snug text-slate-300">Conecte o Copytrix ao ChatGPT, Claude e outros agentes de IA.</p>
        </div>
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {[
          { id: "chatgpt" as const, label: "ChatGPT" },
          { id: "claude" as const, label: "Claude" },
          { id: "mcp" as const, label: "Outros Agentes" },
        ].map((agent) => (
          <li key={agent.id} className="group flex flex-col items-center gap-2 rounded-xl border border-sky-400/15 bg-[#07132a] px-1.5 py-3 text-center transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/60">
            <BrandMark id={agent.id} size={38} />
            <span className="text-[11px] font-medium text-white">{agent.label}</span>
            <Link href="/api-access" className="rounded-md bg-sky-500 px-3 py-1 text-[10px] font-semibold text-white transition hover:bg-sky-400">
              Conectar
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-sky-400/20 bg-[#050e22] p-2.5 pl-3 text-[11px] leading-snug text-slate-300">
        <p className="min-w-0 flex-1">Crie uma nova Room usando meu canal KIM GOLD e conecte no MT5 com risco de 0.5%.</p>
        <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-500 text-white">
          <Icon name="telegram" size={14} />
        </span>
      </div>
    </div>
  );
}

export function RobotArt({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/landing/copytrix-robot.png"
      alt="Mascote robô do Copytrix Intelligence segurando um tablet holográfico"
      width={640}
      height={640}
      sizes="(min-width: 1024px) 320px, 60vw"
      className={`h-auto w-full [mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)] ${className}`}
    />
  );
}
