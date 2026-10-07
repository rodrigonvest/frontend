"use client";
import Link from "next/link";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import Shell from "../../Shell";
import PageHeader from "../../PageHeader";
import { Icon } from "../../Icons";
import { Button, EmptyState, Notice, cx } from "../../UI";
import ChannelSummary from "./ChannelSummary";
import GeneralTab from "./GeneralTab";
import { saveChannelConfig, saveChannelFlags } from "../../../lib/channel-config-api";
import { buildConfigUpdate, configSignature, toViewModel, type ChannelConfig } from "../../../lib/channel-config";
import type { TelegramChannel } from "../../../lib/channels";

const tabs = [
  { id: "general", label: "Geral", icon: "settings" },
  { id: "filters", label: "Filtro de Sinais", icon: "send" },
  { id: "management", label: "Gerenciamento", icon: "layers" },
  { id: "notifications", label: "Notificações", icon: "bell" },
  { id: "autoreply", label: "Resposta Automática", icon: "message" },
  { id: "logs", label: "Logs do Canal", icon: "fileText" },
] as const;

type TabId = (typeof tabs)[number]["id"];
type Feedback = { tone: "success" | "danger"; text: string } | null;

export default function ChannelConfigView({
  channel: initialChannel,
  generatedAt,
  initialConfig,
  source,
}: {
  channel: TelegramChannel;
  generatedAt: string;
  initialConfig: ChannelConfig;
  source: "core" | "demo";
}) {
  const [channel, setChannel] = useState(initialChannel);
  const [config, setConfig] = useState(initialConfig);
  const [savedSignature, setSavedSignature] = useState(() => configSignature(initialConfig));
  const [tab, setTab] = useState<TabId>("general");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [saving, setSaving] = useState(false);
  const [flagPending, setFlagPending] = useState(false);
  const flagLock = useRef(false);

  const now = useMemo(() => new Date(generatedAt), [generatedAt]);
  const dirty = configSignature(config) !== savedSignature;

  const applyFlags = async (patch: { active?: boolean; primary?: boolean }) => {
    if (flagLock.current) return;
    flagLock.current = true;
    setFlagPending(true);
    setFeedback(null);
    const result = await saveChannelFlags(channel.id, { active: patch.active, is_primary: patch.primary });
    if (result.ok) {
      setConfig((prev) => ({ ...prev, active: result.data.active, primary: result.data.is_primary ?? prev.primary }));
      setChannel((prev) => ({ ...prev, ...result.data }));
    } else {
      setFeedback({ tone: "danger", text: result.error.message });
    }
    flagLock.current = false;
    setFlagPending(false);
  };

  const update = (patch: Partial<ChannelConfig>) => {
    const { active, primary, ...local } = patch;
    if (active !== undefined || primary !== undefined) void applyFlags({ active, primary });
    if (Object.keys(local).length === 0) return;
    setFeedback(null);
    setConfig((prev) => ({ ...prev, ...local }));
  };

  const onSave = async () => {
    if (saving) return;
    if (!dirty) {
      setFeedback({ tone: "success", text: "Nenhuma alteração para salvar." });
      return;
    }
    const built = buildConfigUpdate(config);
    if (!built.ok) {
      setFeedback({ tone: "danger", text: built.message });
      return;
    }
    setSaving(true);
    setFeedback(null);
    const result = await saveChannelConfig(channel.id, built.update);
    setSaving(false);
    if (!result.ok) {
      setFeedback({ tone: "danger", text: result.error.message });
      return;
    }
    const saved = toViewModel(result.data);
    setConfig(saved);
    setSavedSignature(configSignature(saved));
    setChannel((prev) => ({ ...prev, name: saved.name, status: result.data.status }));
    setFeedback({ tone: "success", text: "Configurações salvas com sucesso." });
  };

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
            <Button variant="primary" onClick={onSave} disabled={saving} aria-busy={saving} className="h-11 rounded-lg px-6 text-[15px] font-semibold">
              {saving ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </>
        }
      />

      <div className="mb-4 flex flex-col gap-2 empty:hidden">
        {source === "demo" && <Notice>Dados de demonstração: o Core não está conectado e as alterações não são persistidas entre reinicializações do servidor.</Notice>}
        {feedback && (
          <div role={feedback.tone === "danger" ? "alert" : "status"}>
            <Notice tone={feedback.tone}>{feedback.text}</Notice>
          </div>
        )}
      </div>

      <ChannelSummary channel={channel} name={config.name} primary={config.primary} now={now} active={config.active} pending={flagPending} onToggle={(active) => update({ active })} />

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
