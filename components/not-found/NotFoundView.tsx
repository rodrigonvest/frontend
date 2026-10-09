"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Shell from "../Shell";
import { Icon } from "../Icons";
import { cx } from "../UI";

function HomeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.6 2.8 10.4a.9.9 0 0 0-.3.7V20a1 1 0 0 0 1 1h5.2v-6.2h6.6V21h5.2a1 1 0 0 0 1-1v-8.9a.9.9 0 0 0-.3-.7L12 2.6Z" />
    </svg>
  );
}

function HeadsetIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" fill="currentColor" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" fill="currentColor" />
      <path d="M19.5 19c0 1.5-1.5 2.5-4 2.5H13" />
    </svg>
  );
}

function FloatingWindow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cx(
        "absolute hidden aspect-[4/3] w-[120px] rounded-lg border border-brand/30 bg-gradient-to-br from-brand-soft/60 to-[#0a1230]/80 p-2 shadow-[0_0_30px_rgba(21,154,242,.25)] backdrop-blur-sm sm:block lg:w-[150px]",
        className,
      )}
    >
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-brand/60" />
        <span className="size-1.5 rounded-full bg-brand/40" />
        <span className="size-1.5 rounded-full bg-brand/30" />
      </div>
      <div className="mt-3 flex justify-center text-brand/80">
        <span className="flex size-9 items-center justify-center rounded-full border border-brand/40 bg-brand/10">
          <Icon name="x" size={18} stroke={2.2} />
        </span>
      </div>
      <div className="mt-3 h-1 w-3/4 rounded bg-brand/25" />
      <div className="mt-1.5 h-1 w-1/2 rounded bg-brand/15" />
    </div>
  );
}

function Hero() {
  const digit =
    "select-none bg-gradient-to-b from-[#52b7ff] via-[#1f7bff] to-[#2a3fe0] bg-clip-text font-black leading-none tracking-tighter text-transparent [filter:drop-shadow(0_0_18px_rgba(30,140,255,.75))_drop-shadow(0_0_46px_rgba(70,90,255,.45))]";
  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(21,110,255,.28),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[48%] hidden h-[200px] w-[78%] -translate-x-1/2 -rotate-6 rounded-[50%] border border-brand/20 sm:block" />
      <div aria-hidden className="pointer-events-none absolute inset-x-[6%] bottom-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      <FloatingWindow className="left-[6%] top-[8%] -rotate-[14deg] lg:left-[8%]" />
      <FloatingWindow className="right-[12%] top-[10%] rotate-[10deg] opacity-80" />
      <FloatingWindow className="right-[4%] top-[48%] rotate-[14deg] w-[100px] lg:w-[120px]" />

      <div className="relative flex h-[250px] items-end justify-center sm:h-[340px] lg:h-[400px]">
        <div className="relative z-10 flex items-end justify-center gap-[3vw] text-[clamp(120px,24vw,290px)] sm:gap-10">
          <span className={digit} aria-hidden>4</span>
          <span className="w-[0.62em]" aria-hidden />
          <span className={digit} aria-hidden>4</span>
        </div>
        <span className="sr-only">Erro 404</span>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[3%] left-1/2 z-20 aspect-[1376/768] w-[min(88%,620px)] -translate-x-[47%] mix-blend-screen sm:bottom-[8%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/404-robot.png"
            alt=""
            className="size-full object-cover [mask-image:radial-gradient(ellipse_62%_74%_at_50%_46%,#000_58%,transparent_100%)]"
          />
        </div>
      </div>
    </div>
  );
}

const quickLinks = [
  { label: "Operações", hint: "Ver suas operações", href: "/trades", tone: "text-brand bg-brand/15", icon: <Icon name="barsFilled" size={22} /> },
  { label: "Canais Telegram", hint: "Gerenciar canais", href: "/connectors", tone: "text-[#2aa6ff] bg-[#2aa6ff]/15", icon: <Icon name="telegram" size={22} /> },
  { label: "Configurações", hint: "Ajustar sua conta", href: "/settings", tone: "text-fg-muted bg-white/[.06]", icon: <Icon name="settings" size={22} /> },
  { label: "Suporte", hint: "Falar com a equipe", href: "/help", tone: "text-[#a56bff] bg-[#7a3cff]/20", icon: <HeadsetIcon /> },
];

const actionBase =
  "inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-lg border px-6 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto sm:min-w-[200px]";

export default function NotFoundView() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <Shell wide>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center pb-6 pt-2 text-center">
        <Hero />

        <h1 className="mt-2 text-balance text-[34px] font-bold leading-tight tracking-tight text-fg sm:text-5xl">
          Ops!{" "}
          <span className="bg-gradient-to-r from-[#1fa0ff] via-[#3b8cff] to-[#a05bff] bg-clip-text text-transparent">
            Página não encontrada
          </span>
        </h1>
        <p className="mt-4 max-w-[560px] text-pretty text-base leading-7 text-fg-muted sm:text-lg">
          A página que você está procurando pode ter sido removida, ter o endereço incorreto ou você não tem permissão para acessá-la.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Link
            href="/"
            className={cx(actionBase, "border-brand bg-brand-strong text-white shadow-[0_0_28px_rgba(8,127,240,.5)] hover:bg-brand sm:min-w-[330px]")}
          >
            <HomeIcon />
            Voltar para o Dashboard
          </Link>
          <button
            type="button"
            onClick={goBack}
            className={cx(actionBase, "border-brand-strong/70 bg-canvas/60 text-brand hover:bg-brand-soft/40 sm:min-w-[250px]")}
          >
            <Icon name="arrowLeft" size={20} />
            Voltar
          </button>
          <Link href="/help" className={cx(actionBase, "border-line-strong bg-canvas/60 text-fg hover:border-brand/60 hover:bg-brand-soft/30 sm:min-w-[300px]")}>
            <Icon name="help" size={20} />
            Ajuda &amp; Suporte
          </Link>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent" />

        <section aria-labelledby="links-rapidos" className="mt-8 w-full">
          <h2 id="links-rapidos" className="text-base font-semibold text-fg">Links rápidos</h2>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex h-[84px] items-center gap-4 rounded-xl border border-line bg-surface/80 px-4 text-left backdrop-blur transition-colors hover:border-brand/50 hover:bg-surface-2/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className={cx("flex size-12 shrink-0 items-center justify-center rounded-xl", item.tone)}>{item.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-fg">{item.label}</span>
                    <span className="mt-0.5 block truncate text-sm text-fg-subtle">{item.hint}</span>
                  </span>
                  <span className="text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
                    <Icon name="chevron" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}
