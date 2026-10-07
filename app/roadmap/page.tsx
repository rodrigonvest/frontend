import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { FeatureGrid } from "../../components/FeatureCard";

export default function Page() {
  return (
    <Shell>
      <PageHeader eyebrow="Produto" title="Roadmap" description="Veja o que vem a seguir na plataforma Copytrix." />
      <FeatureGrid
        items={[
          { title: "Agora", status: "Em andamento", description: "Dashboard, sistemas, execução em múltiplas contas receptoras e controles de ciclo de vida." },
          { title: "Próximo", status: "Planejado", description: "Autenticação SaaS, persistência em PostgreSQL e analytics de produção." },
          { title: "Futuro", status: "Planejado", description: "Novos adaptadores de fonte e de destino, além de ferramentas avançadas de automação." },
        ]}
      />
    </Shell>
  );
}
