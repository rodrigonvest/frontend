import AccountSummaryPanel from "./AccountSummaryPanel";
import ChatPanel, { type ChatState } from "./ChatPanel";
import MarketInsightPanel from "./MarketInsightPanel";
import RecommendationsPanel from "./RecommendationsPanel";
import RiskPanel from "./RiskPanel";
import SignalAnalysisPanel from "./SignalAnalysisPanel";
import StrategyOptimizationPanel from "./StrategyOptimizationPanel";

export default function ChatDashboard({ onToast, chat }: { onToast: (message: string) => void; chat: ChatState }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="relative h-[620px] xl:h-auto">
        <ChatPanel chat={chat} />
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <SignalAnalysisPanel
            onExecute={() => onToast("Simulação: o sinal XAUUSD BUY foi marcado como executado. Nenhuma operação real foi enviada.")}
          />
          <MarketInsightPanel />
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <StrategyOptimizationPanel onApply={() => onToast("Configurações sugeridas aplicadas (demonstrativo). Nada foi alterado na sua conta.")} />
          <RiskPanel />
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
          <AccountSummaryPanel />
          <RecommendationsPanel />
        </div>
      </div>
    </div>
  );
}
