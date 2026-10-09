"use client";
import { useEffect, useState } from "react";
import Shell from "../Shell";
import { Toast } from "../multi-account/MaPrimitives";
import { channels } from "../../lib/channel-analysis-demo";
import { ChannelHeader, ChannelStrip, ChannelTabs, type AnalysisTab } from "./ChannelHeader";
import TabContent from "./TabViews";
import { AddChannelModal, SettingsModal } from "./ChannelModals";

type Modal = "add" | "settings" | null;

export default function ChannelAnalysisView() {
  const [selectedId, setSelectedId] = useState(channels[0].id);
  const [tab, setTab] = useState<AnalysisTab>("overview");
  const [modal, setModal] = useState<Modal>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const channel = channels.find((item) => item.id === selectedId) ?? channels[0];

  return (
    <Shell wide>
      <ChannelHeader onAdd={() => setModal("add")} onSettings={() => setModal("settings")} />
      <ChannelStrip channels={channels} selectedId={channel.id} onSelect={setSelectedId} onAdd={() => setModal("add")} />
      <ChannelTabs value={tab} onChange={setTab} />

      <div id="ca-panel" role="tabpanel" aria-labelledby={`ca-tab-${tab}`} className="mt-3">
        <TabContent tab={tab} channel={channel} channels={channels} onSelect={setSelectedId} onToast={setToast} />
      </div>

      {modal === "add" && (
        <AddChannelModal
          onClose={() => setModal(null)}
          onConfirm={(handle) => {
            setModal(null);
            setToast(`${handle} adicionado à fila de análise (demonstrativo).`);
          }}
        />
      )}
      {modal === "settings" && (
        <SettingsModal
          onClose={() => setModal(null)}
          onSave={() => {
            setModal(null);
            setToast("Configurações da análise salvas (demonstrativo).");
          }}
        />
      )}
      <Toast message={toast} />
    </Shell>
  );
}
