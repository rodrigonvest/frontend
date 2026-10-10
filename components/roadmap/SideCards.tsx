import { Icon } from "../Icons";
import { cx } from "../UI";
import { FOCUS_RING, SURFACE } from "../billing/BillingPrimitives";
import { HIGHLIGHTS, UPCOMING, type Highlight } from "../../lib/roadmap-data";

const highlightTones: Record<Highlight["tone"], string> = {
  purple: "border-[#9b63ff]/40 bg-[#9b63ff]/15 text-[#a77bff]",
  gold: "border-[#f0c35c]/40 bg-[#f0c35c]/15 text-[#f0c35c]",
  blue: "border-brand/40 bg-brand/15 text-brand",
};

function LinkButton({ label, onClick, hint }: { label: string; onClick: () => void; hint: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={hint}
      className={cx("inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2 text-[12.5px] font-medium text-[#5cc2ff] transition-colors hover:bg-brand/10 hover:text-white", FOCUS_RING)}
    >
      {label}
      <Icon name="arrowRight" size={14} />
    </button>
  );
}

export function HighlightsCard({ onSelect, onViewAll }: { onSelect: (highlight: Highlight) => void; onViewAll: () => void }) {
  return (
    <section aria-labelledby="roadmap-highlights-title" className={cx(SURFACE, "p-4 sm:p-5")}>
      <header className="flex items-center justify-between gap-3">
        <h2 id="roadmap-highlights-title" className="text-[17px] font-semibold tracking-tight text-fg">
          Destaques Recentes
        </h2>
        <LinkButton label="Ver todos" hint="Ver todos os destaques entregues" onClick={onViewAll} />
      </header>
      <ul className="mt-2 flex flex-col">
        {HIGHLIGHTS.map((item) => (
          <li key={item.id} className="border-t border-line/70 first:border-t-0">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className={cx("group flex w-full items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors hover:bg-white/[.04]", FOCUS_RING)}
            >
              <span aria-hidden className={cx("flex size-10 shrink-0 items-center justify-center rounded-lg border", highlightTones[item.tone])}>
                <Icon name={item.icon} size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-[13.5px] font-semibold leading-5 text-fg">{item.title}</span>
                  {item.badge && (
                    <span className="shrink-0 rounded-md border border-brand bg-brand-strong px-1.5 py-px text-[11px] font-semibold leading-4 text-white">{item.badge}</span>
                  )}
                </span>
                <span className="block text-[12.5px] leading-4 text-fg-muted">{item.note}</span>
              </span>
              <span aria-hidden className="flex shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg">
                <Icon name="chevron" size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function UpcomingCard({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section aria-labelledby="roadmap-upcoming-title" className={cx(SURFACE, "p-4 sm:p-5")}>
      <header className="flex items-center justify-between gap-3">
        <h2 id="roadmap-upcoming-title" className="text-[17px] font-semibold tracking-tight text-fg">
          Próximas Atualizações
        </h2>
        <LinkButton label="Ver todas" hint="Ver todas as atualizações planejadas" onClick={onViewAll} />
      </header>
      <ul className="mt-2 flex flex-col">
        {UPCOMING.map((item) => (
          <li key={item.id} className="flex items-center gap-3 border-t border-line/70 py-2.5 first:border-t-0">
            <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#f0c35c]/50 bg-[#f0c35c]/10 text-[#f0c35c]">
              <Icon name="clock" size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold leading-5 text-fg">{item.title}</p>
              <p className="text-[12.5px] leading-4 text-fg-muted">{item.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SuggestCard({ onOpen }: { onOpen: (trigger: HTMLElement) => void }) {
  return (
    <section aria-labelledby="roadmap-suggest-title" className={cx(SURFACE, "flex flex-col gap-4 p-4 sm:p-5")}>
      <div className="flex items-start gap-3.5">
        <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#9b63ff]/40 bg-[#9b63ff]/15 text-[#a77bff]">
          <Icon name="bulb" size={24} />
        </span>
        <div className="min-w-0">
          <h2 id="roadmap-suggest-title" className="text-[16px] font-semibold leading-5 tracking-tight text-fg">
            Sugira uma Funcionalidade
          </h2>
          <p className="mt-1.5 text-pretty text-[13px] leading-5 text-fg-muted">
            Tem uma ideia ou sugestão?
            <br />
            Queremos ouvir você!
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        className={cx(
          "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-brand bg-brand-strong px-4 text-[14px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand",
          FOCUS_RING,
        )}
      >
        <Icon name="send" size={17} />
        Enviar Sugestão
      </button>
    </section>
  );
}
