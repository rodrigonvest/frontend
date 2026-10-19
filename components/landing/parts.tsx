import type { CSSProperties, ReactNode } from "react";
import { Icon } from "../Icons";
import { Reveal } from "./Reveal";
import { APP_HREF, CheckDot, CtaButton, Eyebrow, IconTile } from "./ui";

export type ToneName = "blue" | "purple" | "green" | "gold" | "cyan" | "red";

export function Block({ id, labelledBy, children, className = "" }: { id?: string; labelledBy: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative px-5 py-14 sm:px-8 lg:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-[1360px]">{children}</div>
    </section>
  );
}

export function Head({ id, eyebrow, tone = "blue", title, description }: { id: string; eyebrow: string; tone?: "blue" | "purple" | "green"; title: ReactNode; description: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-4xl text-center lg:mb-12">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[46px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-pretty text-[15px] leading-relaxed text-slate-300/90 sm:text-base">{description}</p>
    </Reveal>
  );
}

export function Grad({ children, warm = false }: { children: ReactNode; warm?: boolean }) {
  return <span className={warm ? "lp-grad-warm" : "lp-grad"}>{children}</span>;
}

export function CtaRow({ checks, label = "Comece agora grátis", className = "mt-10" }: { checks?: string[]; label?: string; className?: string }) {
  return (
    <Reveal className={`flex flex-col items-center gap-4 ${className}`}>
      <CtaButton href={APP_HREF} arrow>
        {label}
      </CtaButton>
      {checks && (
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
          {checks.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckDot tone="blue" /> {t}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

export function Mini({ title, icon, right, children, className = "" }: { title?: ReactNode; icon?: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3 ${className}`}>
      {(title || right) && (
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-white">
            {icon}
            <span className="min-w-0 leading-tight">{title}</span>
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function Kv({ k, v, caret = false }: { k: ReactNode; v: ReactNode; caret?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 text-[11px]">
      <span className="min-w-0 text-slate-300">{k}</span>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-sky-400/20 bg-[#050e22] px-2.5 py-1 font-semibold text-white">
        {v}
        {caret && <Icon name="chevronDown" size={11} />}
      </span>
    </div>
  );
}

export function Stat({ label, value, tone = "white", className = "" }: { label: ReactNode; value: ReactNode; tone?: "white" | "green" | "red" | "blue" | "gold"; className?: string }) {
  const color = { white: "text-white", green: "text-emerald-400", red: "text-rose-400", blue: "text-sky-300", gold: "text-amber-300" }[tone];
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="line-clamp-2 text-[9px] leading-tight text-slate-400">{label}</p>
      <p className={`text-[15px] font-bold leading-tight ${color}`}>{value}</p>
    </div>
  );
}

export function Dot({ tone = "green" }: { tone?: "green" | "blue" | "red" | "gold" }) {
  const bg = { green: "bg-emerald-400", blue: "bg-sky-400", red: "bg-rose-400", gold: "bg-amber-400" }[tone];
  return <span aria-hidden className={`inline-block size-1.5 shrink-0 rounded-full ${bg}`} />;
}

export function Tabs({ items, active = 0, className = "" }: { items: string[]; active?: number; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1 text-[10px] font-semibold ${className}`} aria-hidden>
      {items.map((t, i) => (
        <span key={t} className={`rounded-md px-2.5 py-1 ${i === active ? "bg-sky-500 text-white" : "bg-[#0a1c3d] text-slate-300"}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function ToggleRow({ label, on, tone = "blue" }: { label: ReactNode; on: boolean; tone?: "blue" | "green" }) {
  const track = on ? (tone === "green" ? "bg-emerald-500" : "bg-sky-500") : "bg-slate-600/70";
  return (
    <li className="flex items-center justify-between gap-2 rounded-lg border border-sky-400/10 bg-[#050e22] px-2.5 py-1.5 text-[11px] text-slate-200">
      <span className="min-w-0">{label}</span>
      <span aria-hidden className={`relative inline-block h-[18px] w-8 shrink-0 rounded-full ${track}`}>
        <span className={`absolute top-0.5 size-3.5 rounded-full bg-white shadow transition-all ${on ? "left-4" : "left-0.5"}`} />
      </span>
    </li>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-amber-400 ${className}`} role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

export function Flag() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" aria-label="Brasil" role="img" className="shrink-0 rounded-[2px]">
      <rect width="16" height="11" fill="#16a34a" />
      <path d="M8 1.4 14.2 5.5 8 9.6 1.8 5.5z" fill="#facc15" />
      <circle cx="8" cy="5.5" r="2.3" fill="#1d4ed8" />
    </svg>
  );
}

export function Avatar({ name, hue = 210, size = 48 }: { name: string; hue?: number; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/20 font-bold text-white shadow-[0_0_20px_-4px_rgba(30,140,255,.6)]"
      style={{ width: size, height: size, fontSize: size * 0.34, background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${(hue + 50) % 360} 70% 28%))` }}
    >
      {initials}
    </span>
  );
}

export function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Série determinística (mesmo resultado no servidor e no cliente). */
export function walk(seed: number, n: number, drift: number, vol = 1, start = 20) {
  const r = seeded(seed);
  let v = start;
  return Array.from({ length: n }, () => (v += (r() - 0.42) * vol + drift));
}

type Series = { points: number[]; color: string; area?: boolean; dashed?: boolean };

export function Lines({ series, id, w = 300, h = 100, grid = 3, className = "" }: { series: Series[]; id: string; w?: number; h?: number; grid?: number; className?: string }) {
  const all = series.flatMap((s) => s.points);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const path = (pts: number[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${((i / (pts.length - 1)) * w).toFixed(1)} ${(h - 8 - ((p - min) / range) * (h - 16)).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`block h-auto w-full ${className}`} aria-hidden>
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`ln-${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity=".32" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {Array.from({ length: grid }, (_, i) => (h / (grid + 1)) * (i + 1)).map((y) => (
        <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="rgba(120,160,255,.1)" />
      ))}
      {series.map((s, i) => (
        <g key={i}>
          {s.area && <path d={`${path(s.points)} L${w} ${h} L0 ${h} Z`} fill={`url(#ln-${id}-${i})`} />}
          <path d={path(s.points)} pathLength={1} className="lp-line" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ "--d": `${0.15 + i * 0.3}s` } as CSSProperties} />
        </g>
      ))}
    </svg>
  );
}

/** Barras divergentes (positivas sobem, negativas descem) com animação de crescimento. */
export function Bars({ values, className = "", up = "#12d99e", down = "#ff5d6d", centered = true }: { values: number[]; className?: string; up?: string; down?: string; centered?: boolean }) {
  return (
    <div className={`flex items-stretch gap-[3px] ${className}`} aria-hidden>
      {values.map((v, i) => {
        const pos = v >= 0;
        const size = Math.min(100, Math.abs(v) * (centered ? 50 : 100));
        return (
          <span key={i} className="relative flex-1">
            <span
              className="lp-barv absolute inset-x-0 block rounded-[2px]"
              style={{ height: `${size}%`, [pos ? "bottom" : "top"]: centered ? "50%" : 0, background: pos ? up : down, transformOrigin: pos ? "bottom" : "top", "--i": i } as CSSProperties}
            />
          </span>
        );
      })}
    </div>
  );
}

type StripItem = { icon: string; tone?: ToneName; title: ReactNode; text: string };

export function Strip({ items, className = "mt-8" }: { items: StripItem[]; className?: string }) {
  return (
    <Reveal className={className}>
      <div className="lp-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-0 lg:p-0">
        {items.map((it, i) => (
          <div key={it.text} className={`flex items-center gap-3.5 lg:p-5 ${i > 0 ? "lg:border-l lg:border-sky-400/15" : ""}`}>
            <IconTile name={it.icon} tone={it.tone ?? "blue"} size={44} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{it.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-slate-300/80">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** Linha de destaque (ícone + título + texto) usada em colunas laterais. */
export function SideCard({ icon, tone = "blue", title, text, delay = 0 }: { icon: string; tone?: ToneName; title: string; text: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="lp-card lp-card-hover flex items-center gap-3.5 p-4">
        <IconTile name={icon} tone={tone} size={48} />
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold leading-tight text-white">{title}</h3>
          <p className="mt-1 text-[12.5px] leading-snug text-slate-300/90">{text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Pill({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "blue" | "purple" | "red" | "gold" }) {
  const t = {
    green: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
    blue: "border-sky-400/40 bg-sky-500/10 text-sky-300",
    purple: "border-violet-400/40 bg-violet-500/10 text-violet-300",
    red: "border-rose-400/40 bg-rose-500/10 text-rose-300",
    gold: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  }[tone];
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${t}`}>{children}</span>;
}

export function SmallBtn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-white ${className}`}>
      {children}
    </span>
  );
}
