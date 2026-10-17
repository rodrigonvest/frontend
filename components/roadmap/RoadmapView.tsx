"use client";
import { useId, useMemo, useState } from "react";
import Dialog from "../api-access/Dialog";
import { ToastRegion, useToast } from "../api-access/Toast";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import PageHeader from "../PageHeader";
import { Button, cx } from "../UI";
import {
  FILTERS,
  ROADMAP_DESCRIPTION,
  ROADMAP_TITLE,
  VERSIONS,
  type Highlight,
  type RoadmapFilter,
} from "../../lib/roadmap-data";
import FilterBar from "./FilterBar";
import ProgressCard from "./ProgressCard";
import { HighlightsCard, SuggestCard, UpcomingCard } from "./SideCards";
import SummaryCards from "./SummaryCards";
import Timeline, { toggleId } from "./Timeline";

const FIELD =
  "w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-[13.5px] leading-5 text-fg placeholder:text-fg-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand";

function SuggestionForm({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (text.trim().length < 5) {
          setError("Descreva sua ideia com pelo menos 5 caracteres.");
          return;
        }
        onSubmit();
      }}
    >
      <div>
        <label htmlFor={fieldId} className="mb-1.5 block text-[13px] font-medium text-fg">
          Sua sugestão
        </label>
        <textarea
          id={fieldId}
          data-autofocus
          rows={4}
          value={text}
          maxLength={500}
          placeholder="Conte o que você gostaria de ver no Copytrix"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setText(event.target.value);
            if (error) setError(null);
          }}
          className={cx(FIELD, "resize-none", error && "border-danger/70")}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-[12.5px] text-danger">
            {error}
          </p>
        )}
      </div>
      <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Button onClick={onClose} className="h-10 px-5">
          Cancelar
        </Button>
        <PrimaryButton type="submit">Enviar Sugestão</PrimaryButton>
      </div>
    </form>
  );
}

export default function RoadmapView() {
  const { toast, notify } = useToast();
  const [filter, setFilter] = useState<RoadmapFilter>("all");
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set(VERSIONS.map((version) => version.id)));
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [suggestTrigger, setSuggestTrigger] = useState<HTMLElement | null>(null);

  const visible = useMemo(() => (filter === "all" ? VERSIONS : VERSIONS.filter((version) => version.status === filter)), [filter]);
  const activeFilter = FILTERS.find((item) => item.id === filter);

  const toggle = (id: string) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const focusVersion = (id: string) => {
    setOpenIds((current) => new Set(current).add(id));
    requestAnimationFrame(() => {
      const button = document.getElementById(toggleId(id));
      button?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      button?.focus({ preventScroll: true });
    });
  };

  const selectHighlight = (highlight: Highlight) => {
    setFilter("all");
    focusVersion(highlight.versionId);
  };

  return (
    <div className="flex min-w-0 flex-col">
      <PageHeader title={ROADMAP_TITLE} description={ROADMAP_DESCRIPTION} />

      <div className="grid min-w-0 gap-5 min-[1280px]:grid-cols-[minmax(0,1fr)_320px] min-[1500px]:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="@container">
            <SummaryCards />
          </div>
          <FilterBar value={filter} onChange={setFilter} />
          <p role="status" aria-live="polite" className="sr-only">
            {activeFilter ? `Filtro ${activeFilter.label} ativo: ${visible.length} ${visible.length === 1 ? "versão exibida" : "versões exibidas"}.` : ""}
          </p>
          <Timeline versions={visible} openIds={openIds} onToggle={toggle} />
        </div>

        <aside aria-label="Resumo e destaques do roadmap" className="flex min-w-0 flex-col gap-5">
          <ProgressCard />
          <HighlightsCard
            onSelect={selectHighlight}
            onViewAll={() => {
              setFilter("delivered");
              notify("Exibindo todas as funcionalidades entregues.", "info");
            }}
          />
          <UpcomingCard
            onViewAll={() => {
              setFilter("planned");
              notify("Exibindo as atualizações planejadas.", "info");
            }}
          />
          <SuggestCard
            onOpen={(trigger) => {
              setSuggestTrigger(trigger);
              setSuggestOpen(true);
            }}
          />
        </aside>
      </div>

      <Dialog
        open={suggestOpen}
        title="Sugira uma Funcionalidade"
        description="Esta é uma demonstração: a sugestão não será enviada a nenhum servidor."
        icon="bulb"
        accent="purple"
        returnFocusTo={suggestTrigger}
        onClose={() => setSuggestOpen(false)}
      >
        <SuggestionForm
          onClose={() => setSuggestOpen(false)}
          onSubmit={() => {
            setSuggestOpen(false);
            notify("Sugestão registrada (demonstrativo).", "success");
          }}
        />
      </Dialog>

      <ToastRegion toast={toast} />
    </div>
  );
}
