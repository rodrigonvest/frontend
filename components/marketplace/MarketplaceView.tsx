"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Shell from "../Shell";
import { Icon } from "../Icons";
import { Toast } from "../multi-account/MaPrimitives";
import { Button, EmptyState, cx } from "../UI";
import {
  categories,
  defaultFilters,
  normalizeText,
  periodFilters,
  sortOptions,
  strategies,
  type Filters,
  type SortId,
} from "../../lib/marketplace-data";
import { MarketplaceBanner } from "./MarketplaceBanner";
import { MarketplaceFilters } from "./MarketplaceFilters";
import { MpSelect } from "./MpPrimitives";
import { PublishStrategyModal } from "./PublishStrategyModal";
import { StrategyCard } from "./StrategyCard";
import { StrategyDetailModal } from "./StrategyDetailModal";

export default function MarketplaceView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortId>("popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const listRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const results = useMemo(() => {
    const needle = normalizeText(query.trim());
    const maxDays = periodFilters.find((option) => option.id === filters.period)?.maxDays ?? Infinity;
    const filtered = strategies.filter((strategy) => {
      if (category !== "Todos" && !strategy.categories.includes(category)) return false;
      if (filters.asset !== "Todos" && !strategy.assets.includes(filters.asset)) return false;
      if (filters.types.length && !filters.types.some((type) => strategy.categories.includes(type))) return false;
      if (strategy.winRate < filters.minWinRate) return false;
      if (strategy.profitFactor < filters.minProfitFactor) return false;
      if (strategy.drawdown > filters.maxDrawdown) return false;
      if (strategy.publishedDaysAgo > maxDays) return false;
      if (filters.platform !== "Todas as Plataformas" && !strategy.platforms.includes(filters.platform)) return false;
      if (filters.price === "free" && strategy.price !== 0) return false;
      if (filters.price === "paid" && strategy.price === 0) return false;
      if (filters.verifiedOnly && !strategy.verified) return false;
      if (needle) {
        const haystack = normalizeText([strategy.name, strategy.author, strategy.description, ...strategy.tags, ...strategy.assets, ...strategy.keywords].join(" "));
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "winrate":
          return b.winRate - a.winRate;
        case "profit":
          return b.profitFactor - a.profitFactor;
        case "drawdown":
          return a.drawdown - b.drawdown;
        case "recent":
          return a.publishedDaysAgo - b.publishedDaysAgo;
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [query, category, filters, sort]);

  const activeFilterCount =
    (filters.asset !== defaultFilters.asset ? 1 : 0) +
    (filters.types.length ? 1 : 0) +
    (filters.minWinRate !== defaultFilters.minWinRate ? 1 : 0) +
    (filters.minProfitFactor !== defaultFilters.minProfitFactor ? 1 : 0) +
    (filters.maxDrawdown !== defaultFilters.maxDrawdown ? 1 : 0) +
    (filters.period !== defaultFilters.period ? 1 : 0) +
    (filters.platform !== defaultFilters.platform ? 1 : 0) +
    (filters.price !== defaultFilters.price ? 1 : 0) +
    (filters.verifiedOnly !== defaultFilters.verifiedOnly ? 1 : 0);

  const detail = strategies.find((strategy) => strategy.id === detailId) ?? null;

  const patchFilters = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));
  const clearFilters = () => setFilters(defaultFilters);
  const clearAll = () => {
    setFilters(defaultFilters);
    setQuery("");
    setCategory("Todos");
  };

  const toggleFavorite = (id: string) => {
    const strategy = strategies.find((item) => item.id === id);
    const isFavorite = favorites.includes(id);
    setFavorites((current) => (isFavorite ? current.filter((item) => item !== id) : [...current, id]));
    setToast(isFavorite ? `${strategy?.name} removida dos favoritos.` : `${strategy?.name} adicionada aos favoritos.`);
  };

  const toggleUse = (id: string) => {
    const strategy = strategies.find((item) => item.id === id);
    const isSelected = selected.includes(id);
    setSelected((current) => (isSelected ? current.filter((item) => item !== id) : [...current, id]));
    setToast(
      isSelected
        ? `${strategy?.name} removida da seleção.`
        : `${strategy?.name} selecionada para uso (demonstrativo). Nenhuma operação foi executada.`,
    );
  };

  const explore = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    listRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    listRef.current?.focus({ preventScroll: true });
  };

  return (
    <Shell wide>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Marketplace de Estratégias
        </span>
      </nav>

      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Marketplace de Estratégias</h1>
          <p className="mt-1 text-[14px] text-fg-muted">Descubra, teste e aplique estratégias prontas criadas pela comunidade Copytrix.</p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="relative block sm:w-[400px]">
            <span className="sr-only">Buscar estratégias, usuários ou palavras-chave</span>
            <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle">
              <Icon name="search" size={16} />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar estratégias, usuários ou palavras-chave..."
              className="h-10 w-full rounded-lg border border-line-strong bg-surface pl-9 pr-3 text-[13px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-brand"
            />
          </label>
          <Button variant="primary" onClick={() => setPublishOpen(true)} className="h-10 px-4 font-semibold shadow-[0_0_22px_-6px_rgba(21,154,242,.8)]">
            <Icon name="plus" size={15} stroke={2.4} />
            Publicar Estratégia
          </Button>
        </div>
      </header>

      <MarketplaceBanner onExplore={explore} onOpenStrategy={setDetailId} />

      <nav aria-label="Categorias de estratégias" className="mt-4 -mx-1 overflow-x-auto px-1 pb-1">
        <ul className="flex w-max min-w-full gap-2">
          {categories.map((item) => {
            const active = category === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item.id)}
                  className={cx(
                    "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg border px-3.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    active
                      ? "border-brand bg-brand-strong text-white shadow-[0_0_20px_-6px_rgba(21,154,242,.9)]"
                      : "border-line bg-surface text-fg-muted hover:border-line-strong hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  <Icon name={item.icon} size={15} />
                  {item.label} ({item.count})
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div>
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="mp-filters"
            className="flex h-10 w-full items-center justify-between rounded-lg border border-line bg-surface px-3.5 text-[13px] font-medium text-fg lg:hidden"
          >
            <span className="flex items-center gap-2">
              <Icon name="filter" size={15} />
              Filtros
              {activeFilterCount > 0 && <span className="rounded-full bg-brand-strong px-1.5 text-[11px] leading-5 text-white">{activeFilterCount}</span>}
            </span>
            <span className={cx("transition-transform", filtersOpen && "rotate-180")}>
              <Icon name="chevronDown" size={14} />
            </span>
          </button>
          <div id="mp-filters" className={cx("mt-2 lg:mt-0 lg:sticky lg:top-20", filtersOpen ? "block" : "hidden lg:block")}>
            <MarketplaceFilters filters={filters} onChange={patchFilters} onClear={clearFilters} />
          </div>
        </div>

        <section aria-labelledby="mp-list-title" id="estrategias" className="min-w-0 scroll-mt-20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-warning">
                <Icon name="trophy" size={20} />
              </span>
              <h2 id="mp-list-title" ref={listRef} tabIndex={-1} className="text-lg font-semibold tracking-tight text-fg outline-none">
                Estratégias em Destaque
              </h2>
              <span className="tabular rounded-full border border-line px-2 text-[11.5px] leading-5 text-fg-muted" aria-live="polite">
                {results.length} {results.length === 1 ? "resultado" : "resultados"}
              </span>
            </div>
            <label className="flex items-center gap-2.5 text-[12.5px] text-fg-muted">
              Ordenar por:
              <MpSelect value={sort} onChange={(event) => setSort(event.target.value as SortId)} className="w-[190px]">
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </MpSelect>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="mt-3">
              <EmptyState
                title="Nenhuma estratégia encontrada"
                description="Ajuste a busca, a categoria ou os filtros para ver mais resultados."
                className="py-14"
              />
              <div className="mt-3 flex justify-center">
                <Button onClick={clearAll}>Limpar busca e filtros</Button>
              </div>
            </div>
          ) : (
            <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
              {results.map((strategy) => (
                <li key={strategy.id} className="min-w-0">
                  <StrategyCard
                    strategy={strategy}
                    favorite={favorites.includes(strategy.id)}
                    selected={selected.includes(strategy.id)}
                    onFavorite={() => toggleFavorite(strategy.id)}
                    onDetails={() => setDetailId(strategy.id)}
                    onUse={() => toggleUse(strategy.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {detail && <StrategyDetailModal strategy={detail} selected={selected.includes(detail.id)} onClose={() => setDetailId(null)} onUse={() => toggleUse(detail.id)} />}
      {publishOpen && (
        <PublishStrategyModal
          onClose={() => setPublishOpen(false)}
          onPublish={(name) => {
            setPublishOpen(false);
            setToast(`"${name}" enviada para revisão (demonstrativo). Nada foi publicado.`);
          }}
        />
      )}
      <Toast message={toast} />
    </Shell>
  );
}
