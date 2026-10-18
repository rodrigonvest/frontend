import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { Reveal } from "./Reveal";

export const APP_HREF = "/dashboard";

type Tone = "blue" | "purple" | "green" | "gold" | "cyan" | "red";

const toneBox: Record<Tone, string> = {
  blue: "bg-sky-500/15 text-sky-400",
  purple: "bg-violet-500/15 text-violet-400",
  green: "bg-emerald-500/15 text-emerald-400",
  gold: "bg-amber-500/15 text-amber-400",
  cyan: "bg-cyan-500/15 text-cyan-300",
  red: "bg-rose-500/15 text-rose-400",
};

export function IconTile({ name, tone = "blue", size = 44 }: { name: string; tone?: Tone; size?: number }) {
  return (
    <span aria-hidden className={`lp-ico inline-flex shrink-0 items-center justify-center rounded-xl ${toneBox[tone]}`} style={{ width: size, height: size }}>
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  );
}

export function Eyebrow({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "purple" | "green" }) {
  const tones = {
    blue: "border-sky-400/35 bg-sky-500/10 text-sky-300",
    purple: "border-violet-400/35 bg-violet-500/10 text-violet-300",
    green: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300",
  };
  return <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${tones[tone]}`}>{children}</span>;
}

export function Section({ id, labelledBy, children, className = "" }: { id?: string; labelledBy: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative px-5 py-16 sm:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  accent,
  description,
  tone = "blue",
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  tone?: "blue" | "purple" | "green";
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px]">
        {title} <span className="lp-grad">{accent}</span>
      </h2>
      <p className="mt-4 text-pretty text-[15px] leading-relaxed text-slate-300/90 sm:text-base">{description}</p>
    </Reveal>
  );
}

export function CtaButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "lg" | "md";
  arrow?: boolean;
  className?: string;
}) {
  const cls = `lp-btn ${variant === "primary" ? "lp-btn-primary" : "lp-btn-ghost"} ${size === "lg" ? "h-14 px-8 text-base" : "h-11 px-5 text-sm"} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <span className="lp-arrow" aria-hidden>
          <Icon name="arrowRight" size={18} />
        </span>
      )}
    </>
  );
  return href.startsWith("#") ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Toggle({ on = true, tone = "blue" }: { on?: boolean; tone?: "blue" | "green" }) {
  return (
    <span aria-hidden className={`relative inline-block h-[18px] w-8 shrink-0 rounded-full ${on ? (tone === "green" ? "bg-emerald-500" : "bg-sky-500") : "bg-slate-600/70"}`}>
      <span className={`absolute top-0.5 size-3.5 rounded-full bg-white shadow ${on ? "left-4" : "left-0.5"}`} />
    </span>
  );
}

export function CheckDot({ tone = "green" }: { tone?: "green" | "blue" | "purple" }) {
  const tones = { green: "bg-emerald-500/20 text-emerald-400", blue: "bg-sky-500/20 text-sky-400", purple: "bg-violet-500/20 text-violet-300" };
  return (
    <span aria-hidden className={`inline-flex size-[18px] shrink-0 items-center justify-center rounded-full ${tones[tone]}`}>
      <Icon name="check" size={11} stroke={3} />
    </span>
  );
}

export function StatusPill({ children = "Conectado", tone = "green" }: { children?: ReactNode; tone?: "green" | "blue" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${tone === "green" ? "text-emerald-400" : "text-sky-400"}`}>
      <span className={`size-1.5 rounded-full ${tone === "green" ? "bg-emerald-400" : "bg-sky-400"}`} />
      {children}
    </span>
  );
}

/** Gráfico de linha em SVG que desenha ao entrar no viewport. */
export function LineChart({ points, color = "#12d99e", id, area = true, className = "" }: { points: number[]; color?: string; id: string; area?: boolean; className?: string }) {
  const w = 300;
  const h = 100;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => [(i / (points.length - 1)) * w, h - 8 - ((p - min) / range) * (h - 16)] as const);
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const fill = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`block h-auto w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="rgba(120,160,255,.1)" strokeWidth="1" />
      ))}
      {area && <path d={fill} fill={`url(#lg-${id})`} />}
      <path d={line} pathLength={1} className="lp-line" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Donut({ percent, color = "#22d3ee", size = 120, children }: { percent: number; color?: string; size?: number; children?: ReactNode }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: `conic-gradient(${color} ${percent}%, rgba(120,160,255,.14) 0)` }}
    >
      <div className="flex flex-col items-center justify-center rounded-full bg-[#06122a] text-center" style={{ width: size - 18, height: size - 18 }}>
        {children}
      </div>
    </div>
  );
}

/** Painel interno de mockup (fundo escuro + título). */
export function Panel({ title, icon, right, children, className = "" }: { title?: ReactNode; icon?: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-sky-400/15 bg-[#06122a]/80 p-3.5 ${className}`}>
      {(title || right) && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-white">
            {icon}
            <span className="truncate">{title}</span>
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/** Faixa de benefícios curtos (ícone + título + texto). */
export function BenefitStrip({ items }: { items: { icon: string; tone: Tone; title: string; text: string }[] }) {
  return (
    <div className="lp-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-0">
      {items.map((item, i) => (
        <div key={item.title} className={`flex items-center gap-3.5 lg:p-5 ${i > 0 ? "lg:border-l lg:border-sky-400/15" : ""}`}>
          <IconTile name={item.icon} tone={item.tone} size={46} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-0.5 text-xs leading-snug text-slate-300/80">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
