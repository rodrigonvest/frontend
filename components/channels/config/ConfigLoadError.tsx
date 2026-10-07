import Link from "next/link";
import Shell from "../../Shell";
import PageHeader from "../../PageHeader";
import { Icon } from "../../Icons";
import { EmptyState } from "../../UI";

export default function ConfigLoadError({ message }: { message: string }) {
  return (
    <Shell>
      <PageHeader
        title="Configuração do Canal"
        description="Ajuste como os sinais deste canal serão interpretados e executados"
        actions={
          <Link
            href="/connectors"
            className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-5 text-[14px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            <Icon name="arrowLeft" size={18} />
            Voltar para Canais
          </Link>
        }
      />
      <div role="alert">
        <EmptyState className="min-h-[240px] bg-surface" title="Falha ao carregar a configuração do canal" description={message} />
      </div>
    </Shell>
  );
}
