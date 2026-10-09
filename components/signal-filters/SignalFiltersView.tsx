"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Shell from "../Shell";
import { cx } from "../UI";
import { Icon } from "../Icons";
import { Toast } from "../multi-account/MaPrimitives";
import {
  clearedConfig,
  countActiveFilters,
  exportFileName,
  feedPool,
  initialConfig,
  initialFeed,
  initialTemplates,
  makeSignal,
  mergeImported,
  evaluateSignal,
  type FeedSignal,
  type SignalFiltersConfig,
  type SignalTemplate,
} from "../../lib/signal-filters-demo";
import SignalFiltersHeader from "./SignalFiltersHeader";
import {
  AssetCard,
  ChannelCard,
  ChannelListCard,
  CustomRulesCard,
  DuplicatesCard,
  EntryCard,
  KeywordOptionsCard,
  KeywordsCard,
  MarketCard,
  QualityCard,
  ScheduleCard,
} from "./FilterCards";
import { SummaryPanel, TemplatesPanel } from "./SidePanels";
import { LiveSignalsPanel, PerformancePanel } from "./FeedPanels";

const tabs = [
  { id: "main", label: "Filtros Principais", icon: "filter" },
  { id: "advanced", label: "Filtros Avançados", icon: "settings" },
  { id: "keywords", label: "Palavras-chave", icon: "search" },
  { id: "quality", label: "Qualidade do Sinal", icon: "target" },
  { id: "hours", label: "Horários", icon: "clock" },
  { id: "channels", label: "Por Canal", icon: "telegram" },
  { id: "rules", label: "Regras Personalizadas", icon: "clipboard" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const grid3 = "grid gap-4 md:grid-cols-2 2xl:grid-cols-3";

export default function SignalFiltersView() {
  const [config, setConfig] = useState<SignalFiltersConfig>(initialConfig);
  const [templates, setTemplates] = useState<SignalTemplate[]>(initialTemplates);
  const [activeTemplate, setActiveTemplate] = useState<string | null>("t1");
  const [tab, setTab] = useState<TabId>("main");
  const [target, setTarget] = useState("Todas as Contas");
  const [feed, setFeed] = useState<FeedSignal[]>(initialFeed);
  const [paused, setPaused] = useState(false);
  const [period, setPeriod] = useState("30");
  const [extra, setExtra] = useState({ received: 0, approved: 0 });
  const [toast, setToast] = useState<string | null>(null);
  const feedCursor = useRef(initialFeed.length);
  const templateCounter = useRef(templates.length);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      const seed = feedPool[feedCursor.current % feedPool.length];
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const signal = makeSignal(seed, `live-${feedCursor.current}`, time, 3);
      feedCursor.current += 1;
      setExtra((current) => ({
        received: current.received + 1,
        approved: current.approved + (evaluateSignal(signal, configRef.current).ok ? 1 : 0),
      }));
      setFeed((current) => [signal, ...current].slice(0, 6));
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const counts = useMemo(() => countActiveFilters(config), [config]);
  const customActive = config.customRules.filter((rule) => rule.enabled).length;

  const updateConfig: typeof setConfig = (value) => {
    setConfig(value);
    setActiveTemplate(null);
  };

  const cardProps = { config, onChange: updateConfig };

  const tabContent: Record<TabId, ReactNode> = {
    main: (
      <div className={grid3}>
        <AssetCard {...cardProps} />
        <EntryCard {...cardProps} />
        <MarketCard {...cardProps} />
        <ChannelCard {...cardProps} />
        <QualityCard {...cardProps} />
        <KeywordsCard {...cardProps} />
      </div>
    ),
    advanced: (
      <div className={grid3}>
        <EntryCard {...cardProps} />
        <MarketCard {...cardProps} />
        <DuplicatesCard {...cardProps} />
        <KeywordOptionsCard {...cardProps} />
      </div>
    ),
    keywords: (
      <div className="grid gap-4 md:grid-cols-2">
        <KeywordsCard {...cardProps} />
        <KeywordOptionsCard {...cardProps} />
      </div>
    ),
    quality: (
      <div className="grid gap-4 md:grid-cols-2">
        <QualityCard {...cardProps} />
        <DuplicatesCard {...cardProps} />
      </div>
    ),
    hours: (
      <div className="grid gap-4 md:grid-cols-2">
        <ScheduleCard {...cardProps} />
        <MarketCard {...cardProps} />
      </div>
    ),
    channels: (
      <div className="grid gap-4 md:grid-cols-2">
        <ChannelCard {...cardProps} />
        <ChannelListCard {...cardProps} />
      </div>
    ),
    rules: <CustomRulesCard {...cardProps} />,
  };

  const applyTemplate = (id: string) => {
    const template = templates.find((item) => item.id === id);
    if (!template) return;
    setConfig(template.config);
    setActiveTemplate(id);
    setToast(`Template "${template.name}" aplicado.`);
  };

  const createTemplate = (name?: string, source: SignalFiltersConfig = config, description = "Template personalizado") => {
    templateCounter.current += 1;
    const id = `tpl-${templateCounter.current}`;
    const template: SignalTemplate = { id, name: name ?? `Novo Template ${templateCounter.current}`, description, config: source };
    setTemplates((current) => [...current, template]);
    setActiveTemplate(id);
    return template;
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = exportFileName;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Configuração exportada.");
  };

  const importConfig = async (file: File) => {
    try {
      const merged = mergeImported(JSON.parse(await file.text()));
      if (!merged) throw new Error("invalid");
      setConfig(merged);
      setActiveTemplate(null);
      setToast("Configuração importada com sucesso.");
    } catch {
      setToast("Arquivo inválido. Use um JSON exportado pelo Copytrix.");
    }
  };

  return (
    <Shell wide>
      <SignalFiltersHeader
        target={target}
        onTarget={setTarget}
        onSaveTemplate={() => {
          const template = createTemplate();
          setToast(`Template "${template.name}" salvo.`);
        }}
        onImport={importConfig}
        onExport={exportConfig}
      />

      <div role="tablist" aria-label="Seções de filtros" className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls="signal-filters-panel"
              onClick={() => setTab(item.id)}
              className={cx(
                "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                active ? "border-brand-strong bg-brand-strong text-white" : "border-line bg-[#0a1b2b] text-fg hover:border-line-strong",
              )}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div id="signal-filters-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="min-w-0">
            {tabContent[tab]}
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <TemplatesPanel
              templates={templates}
              activeId={activeTemplate}
              onApply={applyTemplate}
              onCreate={() => {
                const template = createTemplate();
                setToast(`Template "${template.name}" criado a partir da configuração atual.`);
              }}
              onDuplicate={(id) => {
                const source = templates.find((item) => item.id === id);
                if (!source) return;
                createTemplate(`${source.name} (cópia)`, source.config, source.description);
                setToast("Template duplicado.");
              }}
              onDelete={(id) => {
                setTemplates((current) => current.filter((item) => item.id !== id));
                setActiveTemplate((current) => (current === id ? null : current));
                setToast("Template excluído.");
              }}
            />
            <SummaryPanel counts={counts} customActive={customActive} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <LiveSignalsPanel
            feed={feed}
            config={config}
            paused={paused}
            onTogglePause={() => setPaused((current) => !current)}
            onClearFilters={() => {
              setConfig(clearedConfig);
              setActiveTemplate(null);
              setToast("Filtros limpos.");
            }}
            onExecute={(signal) => setToast(`Sinal ${signal.symbol} ${signal.side.toUpperCase()} executado em ${target}.`)}
          />
          <PerformancePanel period={period} onPeriod={setPeriod} extraReceived={extra.received} extraApproved={extra.approved} />
        </div>
      </div>

      <Toast message={toast} />
    </Shell>
  );
}
