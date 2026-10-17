"use client";
import { useId, useMemo, useRef, useState } from "react";
import { Icon } from "../Icons";
import { FOCUS_RING, SURFACE } from "../billing/BillingPrimitives";
import { Badge, cx } from "../UI";
import { HELP_IDS, SEARCH_EXAMPLES, SEARCH_PLACEHOLDER, searchHelp, type SearchResult } from "../../lib/help-data";
import { HelpTile } from "./HelpTile";

export default function SearchCard({
  onOpenResult,
  onContact,
}: {
  onOpenResult: (result: SearchResult, trigger: HTMLElement) => void;
  onContact: () => void;
}) {
  const baseId = useId();
  const examplesId = `${baseId}-examples`;
  const errorId = `${baseId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const results = useMemo(() => (submitted ? searchHelp(submitted) : []), [submitted]);
  const statusMessage =
    submitted === null
      ? ""
      : results.length
        ? `${results.length} ${results.length === 1 ? "resultado encontrado" : "resultados encontrados"} para ${submitted}.`
        : `Nenhum resultado encontrado para ${submitted}.`;

  const clear = () => {
    setQuery("");
    setSubmitted(null);
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <section id={HELP_IDS.search} aria-labelledby={`${baseId}-title`} className={cx(SURFACE, "scroll-mt-24 p-4 sm:p-5")}>
      <h2 id={`${baseId}-title`} className="sr-only">
        Buscar na central de ajuda
      </h2>
      <form
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const term = query.trim();
          if (!term) {
            setSubmitted(null);
            setError("Digite um termo para buscar na central de ajuda.");
            inputRef.current?.focus();
            return;
          }
          setError(null);
          setSubmitted(term);
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <label htmlFor={HELP_IDS.searchInput} className="sr-only">
              Buscar na central de ajuda
            </label>
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted">
              <Icon name="search" size={18} />
            </span>
            <input
              ref={inputRef}
              id={HELP_IDS.searchInput}
              type="search"
              autoComplete="off"
              value={query}
              placeholder={SEARCH_PLACEHOLDER}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${examplesId} ${errorId}` : examplesId}
              onChange={(event) => {
                setQuery(event.target.value);
                if (error) setError(null);
              }}
              className={cx(
                "h-12 w-full rounded-lg border border-line-strong bg-canvas/60 pl-11 pr-3 text-[14px] text-fg placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand [&::-webkit-search-cancel-button]:appearance-none",
                error && "border-danger/70",
              )}
            />
          </div>
          <button
            type="submit"
            className={cx(
              "inline-flex h-12 shrink-0 items-center justify-center rounded-lg border border-brand bg-brand-strong px-8 text-[14px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand",
              FOCUS_RING,
            )}
          >
            Buscar
          </button>
        </div>
        <p id={examplesId} className="mt-3 text-pretty text-[12.5px] leading-5 text-fg-muted">
          {SEARCH_EXAMPLES}
        </p>
        {error && (
          <p id={errorId} className="mt-1.5 text-[12.5px] text-danger">
            {error}
          </p>
        )}
      </form>

      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>

      {submitted !== null && (
        <div className="mt-4 border-t border-line/70 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h3 className="min-w-0 break-words text-[14.5px] font-semibold text-fg">{`Resultados para “${submitted}”`}</h3>
            <button
              type="button"
              onClick={clear}
              className={cx("inline-flex h-9 items-center rounded-md px-2 text-[12.5px] font-medium text-[#5cc2ff] hover:bg-brand/10 hover:text-white", FOCUS_RING)}
            >
              Limpar busca
            </button>
          </div>
          {results.length ? (
            <ul className="mt-2 flex flex-col">
              {results.map((result) => (
                <li key={`${result.kind}-${result.id}`} className="border-t border-line/70 first:border-t-0">
                  <button
                    type="button"
                    onClick={(event) => onOpenResult(result, event.currentTarget)}
                    className={cx("group flex w-full items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors hover:bg-white/[.04]", FOCUS_RING)}
                  >
                    <HelpTile name={result.icon} accent={result.accent} size={18} className="size-9" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-semibold leading-5 text-fg">{result.title}</span>
                      <span className="block text-[12.5px] leading-4 text-fg-muted">{result.description}</span>
                    </span>
                    <Badge tone={result.kind === "video" ? "neutral" : "blue"}>{result.kind === "video" ? "Vídeo" : "Artigo"}</Badge>
                    <span aria-hidden className="flex shrink-0 text-fg-subtle group-hover:text-fg">
                      <Icon name="chevron" size={16} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 rounded-lg border border-line bg-surface/60 p-4 text-[13px] leading-5 text-fg-muted">
              <p>Não encontramos artigos ou vídeos com esse termo. Tente outra palavra ou fale com nossa equipe.</p>
              <button
                type="button"
                onClick={onContact}
                className={cx("mt-2 inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-[#5cc2ff] hover:bg-brand/10 hover:text-white", FOCUS_RING)}
              >
                Abrir um ticket
                <Icon name="arrowRight" size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
