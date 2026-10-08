import Shell from "../../components/Shell";
import { Icon } from "../../components/Icons";
import { Button } from "../../components/UI";
import AccountsView from "../../components/accounts/AccountsView";

export default function AccountsPage() {
  return (
    <Shell>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-fg sm:text-[30px] sm:leading-9">Contas de Trading</h1>
          <p className="mt-1 text-pretty text-[15px] leading-6 text-fg-muted">
            Gerencie suas contas e defina as configurações de risco para cada uma delas
          </p>
        </div>
        <Button variant="primary" className="h-12 shrink-0 gap-2.5 rounded-md px-6 text-[15px] font-semibold">
          <Icon name="plus" size={18} stroke={2.2} />
          Adicionar Conta
        </Button>
      </div>
      <AccountsView />
    </Shell>
  );
}
