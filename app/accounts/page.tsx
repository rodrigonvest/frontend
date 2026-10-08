import Shell from "../../components/Shell";
import PageHeader from "../../components/PageHeader";
import { Icon } from "../../components/Icons";
import { Button, PreviewBadge } from "../../components/UI";
import AccountsView from "../../components/accounts/AccountsView";

export default function AccountsPage() {
  return (
    <Shell>
      <PageHeader
        title="Contas de Trading"
        description="Gerencie suas contas e defina as configurações de risco para cada uma delas"
        actions={
          <>
            <PreviewBadge label="Dados de apresentação" />
            <Button variant="primary" className="h-11 px-5 text-sm font-semibold shadow-[0_0_22px_rgba(8,127,240,.35)]">
              <Icon name="plus" size={16} stroke={2.2} />
              Adicionar Conta
            </Button>
          </>
        }
      />
      <AccountsView />
    </Shell>
  );
}
