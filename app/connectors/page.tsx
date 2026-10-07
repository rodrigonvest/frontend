import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { FeatureGrid } from "../../components/FeatureCard";

export default function Page() {
  return (
    <Shell>
      <PageHeader eyebrow="Integrações" title="Conectores" description="Conecte o Copytrix a fontes de sinais e plataformas de execução compatíveis." />
      <FeatureGrid
        items={[
          { title: "Telegram", description: "Conector de fonte de sinais para canais e grupos do Telegram." },
          { title: "MetaTrader 5", description: "Conexão com terminal MT5, seleção de servidor e validação de conta." },
          { title: "TradeLocker", description: "Conexão de contas receptoras TradeLocker e status da conta." },
          { title: "DXTrade", description: "Integração de contas receptoras DXTrade." },
          { title: "Tradovate", description: "Conexão e verificação de contas de futuros." },
          { title: "MatchTrader", description: "Descoberta de corretoras e conexão de contas MatchTrader." },
        ]}
      />
    </Shell>
  );
}
