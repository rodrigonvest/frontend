"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Shell from "../Shell";
import { Icon } from "../Icons";
import type { AiTabId } from "../../lib/copytrix-ai-data";
import AiHeader from "./AiHeader";
import AiTabs from "./AiTabs";
import ChatDashboard from "./ChatDashboard";
import { useChat } from "./ChatPanel";
import HowItWorksModal from "./HowItWorksModal";
import {
  MarketModule,
  OptimizationModule,
  RecommendationsModule,
  ReportsModule,
  RiskModule,
  SignalsModule,
} from "./ModuleViews";

export default function CopytrixAiView() {
  const [tab, setTab] = useState<AiTabId>("chat");
  const chat = useChat();
  const [modalOpen, setModalOpen] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message: string) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  }, []);

  const openModal = useCallback((element: HTMLButtonElement) => {
    setTrigger(element);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <Shell wide>
      <div className="flex min-w-0 flex-col gap-4">
        <AiHeader onHowItWorks={openModal} />

        <AiTabs tab={tab} onTab={setTab}>
          {tab === "chat" && <ChatDashboard onToast={notify} chat={chat} />}
          {tab === "signals" && <SignalsModule onToast={notify} />}
          {tab === "market" && <MarketModule />}
          {tab === "optimization" && <OptimizationModule onToast={notify} />}
          {tab === "risk" && <RiskModule />}
          {tab === "reports" && <ReportsModule onToast={notify} />}
          {tab === "recommendations" && <RecommendationsModule />}
        </AiTabs>
      </div>

      <HowItWorksModal open={modalOpen} returnFocusTo={trigger} onClose={closeModal} />

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex justify-end">
        {toast && (
          <p
            key={toast.id}
            className="pointer-events-auto flex max-w-md items-start gap-2.5 rounded-lg border border-success/40 bg-surface-2 px-4 py-3 text-[13px] leading-5 text-fg shadow-2xl shadow-black/50"
          >
            <span aria-hidden className="mt-0.5 shrink-0 text-success">
              <Icon name="check" size={16} stroke={2.6} />
            </span>
            {toast.message}
          </p>
        )}
      </div>
    </Shell>
  );
}
