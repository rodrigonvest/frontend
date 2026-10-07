"use client";
import Link from "next/link";
import { useMemo, useState, type KeyboardEvent } from "react";
import Shell from "../../Shell";
import PageHeader from "../../PageHeader";
import { Icon } from "../../Icons";
import { Button, EmptyState, Notice, cx } from "../../UI";
import ChannelSummary from "./ChannelSummary";
import GeneralTab from "./GeneralTab";
import type { TelegramChannel } from "../../../lib/channels";
import type { ChannelConfig } from "../../../lib/channel-config";

const tabs = [
  { id: "general", label: "Geral", icon: "settings" },
  { id: "filters", label: "Filtro de Sinais", icon: "send" },
  { id: "management", label: "Gerenciamento", icon: "layers" },
  { id: "notifications", label: "Notificações", icon: "bell" },
  { id: "autoreply", label: "Resposta Automática", icon: "message" },
  { id: "logs", label: "Logs do Canal", icon: "fileText" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ChannelConfigView({ channel, generatedAt, initialConfig }: { channel: TelegramChannel; generatedAt: string; initialConfig: ChannelConfig }) {
  const [config, setConfig] = useState(initialConfig);
  const [tab, setTab] = useState<TabId>("general");
  const [notice, setNotice] = useState<string | null>(null);

  const now = useMemo(() => new Date(generatedAt), [generatedAt]);
  const dirty = useMemo(() => JSON.stringify(config) !== JSON.stringify(initialConfig), [config, initialConfig]);
  const update = (patch: Partial<ChannelConfig>) => {
    setNotice(null);
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const onSave = () =>
    setNotice(
      dirty
        ? "A API de configuração por canal ainda não está conectada: as alterações valem apenas nesta tela e não foram persistidas."
        : "Nenhuma alteração para salvar.",
    );

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((t) => t.id === tab);
    const next = e.key === "ArrowRight" ? index + 1 : e.key === "ArrowLeft" ? index - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length];
    setTab(target.id);
    document.getElementById(`tab-${target.id}`)?.focus();
  };

  return (
    <Shell>
      <nav aria-label="Trilha de navegação" className="mb-2 flex items-center gap-2 text-sm text-fg-muted">
        <Link href="/connectors" className="transition-colors hover:text-fg">
          Canais Telegram
        </Link>
        <Icon name="chevron" size={14} />
        <span aria-current="page" className="text-fg">
          Configuração do Canal
        </span>
      </nav>

      <PageHeader
        title="Configuração do Canal"
        description="Ajuste como os sinais deste canal serão interpretados e executados"
        actions={
          <>
            <Link
              href="/connectors"
              className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-5 text-[14px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2"
            >
              <Icon name="arrowLeft" size={18} />
              Voltar para Canais
            </Link>
            <Button variant="primary" onClick={onSave} className="h-11 rounded-lg px-6 text-[15px] font-semibold">
              Salvar Configurações
            </Button>
          </>
        }
      />

      {notice && (
        <div role="status" className="mb-4">
          <Notice>{notice}</Notice>
        </div>
      )}

      <ChannelSummary channel={channel} name={config.name} primary={config.primary} now={now} active={config.active} onToggle={(active) => update({ active })} />

      <div role="tablist" aria-label="Seções de configuração" onKeyDown={onTabKeyDown} className="mt-3 flex gap-1 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const selected = t.id === tab;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={cx(
                "inline-flex h-12 shrink-0 items-center gap-2.5 rounded-lg px-5 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                selected ? "bg-brand-strong font-semibold text-white" : "text-fg-muted hover:bg-white/[.04] hover:text-fg",
              )}
            >
              <Icon name={t.icon} size={18} stroke={1.9} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-2">
        {tab === "general" ? (
          <GeneralTab channel={channel} config={config} update={update} />
        ) : (
          <EmptyState className="min-h-[240px] bg-surface" title={tabs.find((t) => t.id === tab)?.label ?? ""} description="Esta seção de configuração ainda não está disponível." />
        )}
      </div>
    </Shell>
  );
}
