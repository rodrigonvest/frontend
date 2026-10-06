import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { FeatureGrid } from "../../components/FeatureCard";

export default function Page() {
  return (
    <Shell>
      <PageHeader eyebrow="Conta" title="Plano e cobrança" description="Gerencie seu plano, assinatura e métodos de pagamento do Copytrix." />
      <FeatureGrid
        items={[
          { title: "Plano atual", description: "Seu plano e os limites de uso aparecerão aqui." },
          { title: "Assinatura", description: "Faça upgrade, downgrade, cancele ou reative sua assinatura." },
          { title: "Métodos de pagamento", description: "Gerencie com segurança seus métodos de pagamento salvos." },
          { title: "Faturas e recibos", description: "Histórico de cobranças e recibos." },
        ]}
      />
    </Shell>
  );
}
