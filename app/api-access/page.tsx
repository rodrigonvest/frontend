import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { FeatureGrid } from "../../components/FeatureCard";

export default function Page() {
  return (
    <Shell>
      <PageHeader eyebrow="Desenvolvedores" title="Acesso à API" description="Integrações para desenvolvedores, webhooks e endpoints de automação." />
      <FeatureGrid
        items={[
          { title: "Webhooks", description: "Crie e gerencie webhooks de saída do Copytrix." },
          { title: "Credenciais de API", description: "Credenciais seguras para desenvolvedores serão gerenciadas aqui." },
          { title: "Eventos", description: "Assine eventos de sinais, execução e ciclo de vida das operações." },
          { title: "Documentação", description: "Referência da API e exemplos de integração." },
        ]}
      />
    </Shell>
  );
}
