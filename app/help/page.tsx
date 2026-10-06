import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { FeatureGrid } from "../../components/FeatureCard";

export default function Page() {
  return (
    <Shell>
      <PageHeader eyebrow="Suporte" title="Central de ajuda" description="Tutoriais, perguntas frequentes, diagnóstico de problemas e suporte." />
      <FeatureGrid
        items={[
          { title: "Primeiros passos", description: "Conecte uma conta, crie um sistema e execute seu primeiro sinal." },
          { title: "Solução de problemas", description: "Diagnóstico de execução, spread, conexão e reconciliação." },
          { title: "Perguntas frequentes", description: "Dúvidas comuns sobre sistemas e contas do Copytrix." },
          { title: "Suporte", description: "Abra e acompanhe solicitações de suporte." },
        ]}
      />
    </Shell>
  );
}
