import { ConfigCard } from "./fields";

export default function PlaceholderTab({ title, description }: { title: string; description: string }) {
  return (
    <ConfigCard title={title} description={description}>
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-line px-4 py-10 text-center">
        <p className="text-sm font-medium text-fg-muted">Em preparação</p>
        <p className="mt-1 max-w-sm text-xs leading-5 text-fg-subtle">
          Os parâmetros desta seção serão disponibilizados na próxima etapa, mantendo o mesmo padrão visual da aba Geral.
        </p>
      </div>
    </ConfigCard>
  );
}
