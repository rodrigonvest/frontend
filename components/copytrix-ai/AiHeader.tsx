import Link from "next/link";
import { Icon } from "../Icons";
import { PlayGlyph } from "../replay/RpPrimitives";

export default function AiHeader({ onHowItWorks }: { onHowItWorks: (trigger: HTMLButtonElement) => void }) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Copytrix AI
        </span>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Copytrix AI</h1>
            <span className="rounded-full border border-[#9b63ff]/50 bg-[#9b63ff]/20 px-2.5 py-0.5 text-xs font-medium text-[#c9adff]">IA Ativa</span>
          </div>
          <p className="mt-1 max-w-2xl text-pretty text-[14px] leading-6 text-fg-muted">
            Seu assistente inteligente para análise, operações e otimização de resultados.
          </p>
        </div>

        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(event) => onHowItWorks(event.currentTarget)}
          className="flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-brand bg-brand/5 px-5 text-[13.5px] font-medium text-[#5cc2ff] transition-colors hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:min-w-[170px]"
        >
          <PlayGlyph size={13} />
          Como funciona?
        </button>
      </header>
    </>
  );
}
