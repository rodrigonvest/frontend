"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "../Icons";
import { Logo } from "./Logo";
import { APP_HREF, CtaButton } from "./ui";

const LINKS = [
  { label: "Início", href: "#", id: "inicio" },
  { label: "Recursos", href: "#recursos", id: "recursos" },
  { label: "Integrações", href: "#integracoes", id: "integracoes" },
  { label: "Preços", href: "#precos", id: "precos" },
  { label: "Como Funciona", href: "#como-funciona", id: "como-funciona" },
  { label: "Depoimentos", href: "#depoimentos", id: "depoimentos" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function BrazilFlag() {
  return (
    <span aria-hidden className="relative inline-block size-5 overflow-hidden rounded-full bg-[#1fa84f]">
      <span className="absolute inset-[3px] bg-[#ffd400] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
      <span className="absolute inset-[7px] rounded-full bg-[#1d4ba8]" />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null);
    if (typeof IntersectionObserver === "undefined" || targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-white/10 bg-[#030914]/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#" aria-label="Copytrix — voltar ao início" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  data-active={active === link.id}
                  aria-current={active === link.id ? "true" : undefined}
                  className="relative block py-2 text-[14px] font-medium text-slate-300 transition-colors hover:text-white data-[active=true]:text-white after:absolute after:inset-x-0 after:-bottom-[1px] after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-sky-400 after:transition-transform after:duration-300 hover:after:scale-x-100 data-[active=true]:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Tema escuro ativo"
            title="Tema escuro ativo"
            className="hidden size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-sky-400/50 hover:text-white sm:inline-flex"
          >
            <SunIcon />
          </button>
          <button
            type="button"
            aria-label="Idioma: Português (Brasil)"
            title="Idioma: Português (Brasil)"
            className="hidden h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-[13px] font-medium text-slate-200 transition hover:border-sky-400/50 hover:text-white md:inline-flex"
          >
            <BrazilFlag />
            PT-BR
            <Icon name="chevronDown" size={14} />
          </button>
          <Link href={APP_HREF} className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:text-white sm:inline-flex">
            Entrar
          </Link>
          <CtaButton href={APP_HREF} size="md">
            Criar Conta
          </CtaButton>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:border-sky-400/50 xl:hidden"
          >
            <Icon name={open ? "x" : "menu"} size={20} />
          </button>
        </div>
      </div>

      <div id="menu-mobile" data-open={open} aria-hidden={!open} className="lp-menu border-t border-white/10 bg-[#030914]/95 backdrop-blur-xl xl:hidden">
        <nav aria-label="Navegação mobile" className="mx-auto max-w-[1360px] px-5 py-4 sm:px-8">
          <ul className="grid gap-1">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition hover:bg-sky-500/10 hover:text-white ${active === link.id ? "bg-sky-500/10 text-white" : "text-slate-300"}`}
                >
                  {link.label}
                  <Icon name="chevron" size={16} />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
            <Link href={APP_HREF} className="lp-btn lp-btn-ghost h-11 text-sm">
              Entrar
            </Link>
            <CtaButton href={APP_HREF} size="md">
              Criar Conta
            </CtaButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
