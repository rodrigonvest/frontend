import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { Badge, Card, SectionTitle, cx } from "../../components/UI";

const sections = ["Geral", "Execução", "Risco", "Notificações", "Segurança"];

export default function SettingsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Workspace"
        title="Configurações"
        description="Defina os padrões do workspace. Credenciais de contas e segredos serão tratados pela camada segura da API."
      />
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <Card className="h-fit p-2">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {sections.map((s, i) => (
              <li key={s}>
                <span aria-current={i === 0 ? "true" : undefined} className={cx("block whitespace-nowrap rounded-lg px-3 py-2 text-sm", i === 0 ? "bg-brand-soft/70 text-fg" : "text-fg-subtle")}>
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-4">
          <Card className="p-5 sm:p-6">
            <SectionTitle title="Workspace" description="Preferências básicas do produto." action={<Badge>Somente leitura</Badge>} />
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs text-fg-subtle">Nome do workspace</dt>
                <dd className="control mt-1.5 flex items-center">Meu workspace Copytrix</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-subtle">Modo de risco padrão</dt>
                <dd className="control mt-1.5 flex items-center text-fg-muted">Percentual de risco</dd>
              </div>
            </dl>
          </Card>
          <Card className="p-5 sm:p-6">
            <SectionTitle title="Segurança de produção" />
            <p className="mt-2 text-[13px] leading-6 text-fg-muted">
              As proteções de produção continuam aplicadas pelo núcleo. A camada SaaS exibirá controles de configuração seguros, sem contornar esses limites.
            </p>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
