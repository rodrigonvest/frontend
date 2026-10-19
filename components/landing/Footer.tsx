"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "../Icons";
import { Flag } from "./parts";
import { Logo } from "./Logo";
import { IconTile } from "./ui";

type FooterLink = { label: string; href?: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "#recursos" },
      { label: "Planos", href: "#precos" },
      { label: "Integrações", href: "#integracoes" },
      { label: "Segurança", href: "#recursos" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Recursos",
    links: [{ label: "Blog" }, { label: "Tutoriais" }, { label: "Central de Ajuda", href: "/help" }, { label: "Documentação" }, { label: "Status do Sistema" }, { label: "Roadmap", href: "/roadmap" }],
  },
  {
    title: "Empresa",
    links: [{ label: "Sobre o Copytrix" }, { label: "Termos de Uso" }, { label: "Política de Privacidade" }, { label: "Política de Cookies" }, { label: "Contato", href: "/help" }, { label: "Trabalhe Conosco" }],
  },
];

const socials: { label: string; icon: ReactNode }[] = [
  { label: "Telegram", icon: <Icon name="telegram" size={20} /> },
  {
    label: "YouTube",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Discord",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.3 5.3A17 17 0 0 0 15 4l-.2.4a15 15 0 0 1 3.7 1.9 13 13 0 0 0-13 0A15 15 0 0 1 9.2 4.4L9 4a17 17 0 0 0-4.3 1.3C2 9.300 1.300 13.200 1.600 17A17 17 0 0 0 6.800 19.600l1.100-1.800a11 11 0 0 1-1.700-.8l.4-.3a12 12 0 0 0 10.800 0l.4.300c-.5.300-1.100.600-1.700.8l1.100 1.800A17 17 0 0 0 22.400 17c.4-4.400-.7-8.200-3.100-11.700ZM8.700 14.700c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Zm6.600 0c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Z" />
      </svg>
    ),
  },
];

const trust = [
  { icon: "shieldCheck", tone: "blue" as const, title: "Dados protegidos", text: "Criptografia de ponta a ponta" },
  { icon: "box", tone: "green" as const, title: "Alta disponibilidade", text: "Infraestrutura em nuvem" },
  { icon: "pulse", tone: "gold" as const, title: "Execução em tempo real", text: "Baixa latência" },
  { icon: "accounts", tone: "purple" as const, title: "Mais de 10.000+", text: "Traders no mundo" },
];

const payments = ["VISA", "Mastercard", "Pix", "Boleto"];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMessage({ ok: false, text: "Informe um e-mail válido." });
    if (!consent) return setMessage({ ok: false, text: "Aceite receber comunicações para continuar." });
    setMessage({ ok: true, text: "Obrigado pelo interesse! A newsletter ainda não está ativa, avisaremos assim que estiver." });
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-sky-400/40 bg-[#07132a]/80 p-5 shadow-[0_0_50px_-20px_rgba(30,140,255,.8)]">
      <div className="flex items-start gap-4">
        <IconTile name="message" tone="purple" size={56} />
        <div>
          <h3 className="text-xl font-extrabold text-white">Receba novidades</h3>
          <p className="mt-1 text-[13px] leading-snug text-slate-300">Fique por dentro das atualizações, novos recursos e conteúdos exclusivos.</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Seu melhor e-mail</span>
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="message" size={16} /></span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            autoComplete="email"
            className="h-11 w-full rounded-lg border border-sky-400/25 bg-[#050e22] pl-10 pr-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          />
        </label>
        <button type="submit" className="lp-btn lp-btn-primary h-11 shrink-0 px-5 text-sm">
          Inscrever-se <span className="lp-arrow"><Icon name="arrowRight" size={15} /></span>
        </button>
      </div>
      <label className="mt-3 flex cursor-pointer items-center gap-2 text-[12px] text-slate-300">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="size-4 accent-sky-500" />
        Concordo em receber comunicações do Copytrix.
      </label>
      <p role="status" aria-live="polite" className={`mt-2 min-h-4 text-[12px] ${message?.ok ? "text-emerald-400" : "text-rose-400"}`}>
        {message?.text}
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer aria-labelledby="footer-title" className="relative mt-6 border-t border-sky-400/15 bg-[#040a1a]/70 px-5 pt-12 sm:px-8">
      <h2 id="footer-title" className="sr-only">
        Rodapé
      </h2>
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_repeat(3,minmax(0,.7fr))] xl:grid-cols-[1.1fr_repeat(3,minmax(0,.6fr))_1.5fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-slate-300">Automatize, copie, analise e evolua. O Copytrix é a plataforma completa para transformar sinais do Telegram em resultados reais.</p>
            <ul className="mt-5 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <span title={s.label} aria-label={s.label} role="img" className="flex size-11 items-center justify-center rounded-xl border border-sky-400/30 bg-[#07173a] text-slate-100">
                    {s.icon}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="text-lg font-bold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-[14.5px]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href?.startsWith("#") ? (
                      <a href={l.href} className="text-slate-300 transition hover:text-white">{l.label}</a>
                    ) : l.href ? (
                      <Link href={l.href} className="text-slate-300 transition hover:text-white">{l.label}</Link>
                    ) : (
                      <span className="text-slate-400">{l.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-4 xl:col-span-1">
            <Newsletter />
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-sky-400/15 py-6 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:items-center">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3.5">
              <IconTile name={t.icon} tone={t.tone} size={48} />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-white">{t.title}</p>
                <p className="text-[12px] text-slate-400">{t.text}</p>
              </div>
            </div>
          ))}
          <div className="lg:border-l lg:border-sky-400/15 lg:pl-6">
            <p className="mb-2 text-[13px] text-slate-200">Formas de pagamento</p>
            <ul className="flex flex-wrap gap-2">
              {payments.map((p) => (
                <li key={p} className="rounded-lg border border-sky-400/20 bg-[#07132a] px-3 py-2 text-[13px] font-extrabold italic tracking-tight text-slate-100">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-sky-400/15 py-6 sm:flex-row">
          <p className="text-sm text-slate-300">© 2026 Copytrix. Todos os direitos reservados.</p>
          <span className="inline-flex items-center gap-2.5 rounded-xl border border-sky-400/25 bg-[#07132a] px-4 py-2 text-sm text-slate-100">
            <Flag /> Português (Brasil) <Icon name="chevronDown" size={14} />
          </span>
        </div>
      </div>
    </footer>
  );
}
