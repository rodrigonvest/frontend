"use client";
import { Icon } from "../Icons";
import SystemLogo from "../systems/SystemLogo";
import { cx } from "../UI";
import { PLATFORMS, money, signedMoney, signedPct, type MultiAccount } from "../../lib/multi-account-demo";
import { IconButton, Menu, PencilGlyph, Switch, TrashGlyph } from "./MaPrimitives";

type Props = {
  accounts: MultiAccount[];
  selected: string[];
  onToggleSelected: (id: string) => void;
  onToggleAll: () => void;
  onSetActive: (id: string, active: boolean) => void;
  onEdit: (account: MultiAccount) => void;
  onDuplicate: (account: MultiAccount) => void;
  onStats: (account: MultiAccount) => void;
  onSync: (account: MultiAccount) => void;
  onDelete: (account: MultiAccount) => void;
  onBulkActive: (active: boolean) => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
};

const headCell = "whitespace-nowrap px-3 py-3 text-left text-[13px] font-medium text-fg";

function Pnl({ value, pct }: { value: number; pct: number }) {
  const tone = value < 0 ? "text-danger" : "text-success";
  return (
    <div className={cx("tabular leading-5", tone)}>
      <div className="text-[14px] font-medium">{signedMoney(value)}</div>
      <div className="text-[13px]">{signedPct(pct)}</div>
    </div>
  );
}

export default function AccountsTable(props: Props) {
  const { accounts, selected, onToggleSelected, onToggleAll } = props;
  const allSelected = accounts.length > 0 && selected.length === accounts.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <section aria-label="Lista de contas" className="mt-4 overflow-hidden rounded-xl border border-line bg-surface">
      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 border-b border-line bg-brand-soft/40 px-4 py-2.5 text-[13px]">
          <span className="font-medium text-fg">
            {selected.length} {selected.length === 1 ? "conta selecionada" : "contas selecionadas"}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => props.onBulkActive(true)} className="rounded-md border border-success/50 bg-success/10 px-3 py-1.5 text-success hover:bg-success/20">
              Ativar
            </button>
            <button type="button" onClick={() => props.onBulkActive(false)} className="rounded-md border border-line-strong bg-surface-2 px-3 py-1.5 text-fg hover:border-brand">
              Desativar
            </button>
            <button type="button" onClick={props.onBulkDelete} className="rounded-md border border-danger/50 bg-danger/10 px-3 py-1.5 text-danger hover:bg-danger/20">
              Excluir
            </button>
            <button type="button" onClick={props.onClearSelection} className="rounded-md px-3 py-1.5 text-fg-muted hover:text-fg">
              Limpar
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse">
          <caption className="sr-only">Contas conectadas ao Multi-Conta Avançado</caption>
          <thead>
            <tr className="border-b border-line bg-surface-2/50">
              <th scope="col" className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  aria-label="Selecionar todas as contas"
                  checked={allSelected}
                  ref={(node) => {
                    if (node) node.indeterminate = someSelected;
                  }}
                  onChange={onToggleAll}
                  className="size-4 cursor-pointer accent-[#159af2]"
                />
              </th>
              <th scope="col" className={headCell}>Conta</th>
              <th scope="col" className={headCell}>Plataforma / Tipo</th>
              <th scope="col" className={headCell}>Saldo / Equidade</th>
              <th scope="col" className={headCell}>Alavancagem</th>
              <th scope="col" className={headCell}>Risco %</th>
              <th scope="col" className={headCell}>Status</th>
              <th scope="col" className={headCell}>P&amp;L (Hoje)</th>
              <th scope="col" className={headCell}>P&amp;L (Total)</th>
              <th scope="col" className={cx(headCell, "text-center")}>Operações</th>
              <th scope="col" className={headCell}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => {
              const platform = PLATFORMS[account.platform];
              const isSelected = selected.includes(account.id);
              return (
                <tr key={account.id} className={cx("border-b border-line/70 last:border-b-0 transition-colors hover:bg-white/[.02]", isSelected && "bg-brand/[.07]")}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Selecionar ${account.name}`}
                      checked={isSelected}
                      onChange={() => onToggleSelected(account.id)}
                      className="size-4 cursor-pointer accent-[#159af2]"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <SystemLogo logo={platform.logo} size={32} />
                      <div className="min-w-0">
                        <div className="whitespace-nowrap text-[14px] font-medium text-fg">{account.name}</div>
                        <div className="tabular text-[12px] text-fg-subtle">{account.number}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <SystemLogo logo={platform.logo} size={26} />
                      <div className="leading-5">
                        <div className="whitespace-nowrap text-[13px] text-fg">{platform.label}</div>
                        <div className="text-[12px] text-fg-subtle">{account.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="tabular px-3 py-3 leading-5">
                    <div className="text-[14px] font-medium text-fg">{money(account.balance)}</div>
                    <div className="text-[12px] text-fg-subtle">{money(account.equity)}</div>
                  </td>
                  <td className="tabular px-3 py-3 text-[14px] text-fg">{account.leverage}</td>
                  <td className="tabular px-3 py-3 text-[14px] text-fg">{account.risk.toFixed(1)}%</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <Switch checked={account.active} onChange={(next) => props.onSetActive(account.id, next)} label={`Status da conta ${account.name}`} />
                      <span className={cx("text-[13px]", account.active ? "text-success" : "text-fg-muted")}>{account.active ? "Ativa" : "Inativa"}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Pnl value={account.pnlToday} pct={account.pnlTodayPct} />
                  </td>
                  <td className="px-3 py-3">
                    <Pnl value={account.pnlTotal} pct={account.pnlTotalPct} />
                  </td>
                  <td className="tabular px-3 py-3 text-center text-[14px] text-fg">{account.trades}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <IconButton label={`Desempenho de ${account.name}`} onClick={() => props.onStats(account)}>
                        <Icon name="analytics" size={15} />
                      </IconButton>
                      <IconButton label={`Editar ${account.name}`} onClick={() => props.onEdit(account)}>
                        <PencilGlyph />
                      </IconButton>
                      <IconButton label={`Duplicar ${account.name}`} onClick={() => props.onDuplicate(account)}>
                        <Icon name="copy" size={15} />
                      </IconButton>
                      <Menu
                        ariaLabel={`Mais ações para ${account.name}`}
                        buttonClassName="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface-2/60 text-fg-muted transition-colors hover:border-brand hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        items={[
                          { label: "Ver desempenho", icon: <Icon name="analytics" size={15} />, onSelect: () => props.onStats(account) },
                          { label: "Sincronizar agora", icon: <Icon name="refresh" size={15} />, onSelect: () => props.onSync(account) },
                          {
                            label: account.active ? "Desativar conta" : "Ativar conta",
                            icon: <Icon name="signal" size={15} />,
                            onSelect: () => props.onSetActive(account.id, !account.active),
                          },
                          { label: "Excluir conta", icon: <TrashGlyph />, tone: "danger", separatorBefore: true, onSelect: () => props.onDelete(account) },
                        ]}
                      >
                        <Icon name="vmore" size={16} />
                      </Menu>
                    </div>
                  </td>
                </tr>
              );
            })}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-10 text-center text-sm text-fg-muted">
                  Nenhuma conta cadastrada. Use &quot;Adicionar Conta&quot; para começar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
