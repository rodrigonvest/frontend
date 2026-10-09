"use client";
import { Icon } from "../Icons";
import SystemLogo from "../systems/SystemLogo";
import { Badge, Card, cx } from "../UI";
import { PLATFORMS, type AccountGroup, type MultiAccount } from "../../lib/multi-account-demo";
import { IconButton, PanelTitle, PencilGlyph, TrashGlyph } from "./MaPrimitives";

export default function GroupAllocation({
  groups,
  accounts,
  wide = false,
  onManage,
  onEdit,
  onDelete,
}: {
  groups: AccountGroup[];
  accounts: MultiAccount[];
  wide?: boolean;
  onManage: () => void;
  onEdit: (group: AccountGroup) => void;
  onDelete: (group: AccountGroup) => void;
}) {
  return (
    <Card className="p-4">
      <PanelTitle
        icon={<Icon name="accounts" size={20} />}
        title="Alocação por Grupo"
        action={
          <button
            type="button"
            onClick={onManage}
            className="h-8 shrink-0 rounded-md border border-brand-strong/70 bg-brand-strong/15 px-3 text-[12px] font-medium text-fg transition-colors hover:bg-brand-strong/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Gerenciar Grupos
          </button>
        }
      />

      <div className={cx("mt-3 grid gap-3", wide && "lg:grid-cols-2")}>
        {groups.map((group) => (
          <section key={group.id} aria-label={group.name} className="rounded-lg border border-line bg-canvas/50 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[14px] font-semibold text-fg">{group.name}</h3>
                  <Badge tone={group.active ? "green" : "neutral"}>{group.active ? "Ativo" : "Inativo"}</Badge>
                </div>
                <p className="mt-0.5 text-[12px] text-fg-subtle">
                  {group.members.length} {group.members.length === 1 ? "conta" : "contas"} | {group.symbols}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <IconButton label={`Editar ${group.name}`} onClick={() => onEdit(group)}>
                  <PencilGlyph size={14} />
                </IconButton>
                <IconButton label={`Excluir ${group.name}`} tone="danger" onClick={() => onDelete(group)}>
                  <TrashGlyph size={14} />
                </IconButton>
              </div>
            </div>

            <ul className="mt-3 space-y-2.5">
              {group.members.map((member) => {
                const account = accounts.find((item) => item.id === member.accountId);
                if (!account) return null;
                return (
                  <li key={member.accountId} className="grid grid-cols-[minmax(0,1fr)_minmax(60px,110px)_40px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(80px,140px)_40px]">
                    <span className="flex min-w-0 items-center gap-2 text-[13px] text-fg">
                      <SystemLogo logo={PLATFORMS[account.platform].logo} size={20} />
                      <span className="truncate">{account.name}</span>
                    </span>
                    <div
                      role="progressbar"
                      aria-label={`Alocação de ${account.name}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={member.percent}
                      className="h-1.5 overflow-hidden rounded-full bg-surface-3"
                    >
                      <div className="h-full rounded-full bg-brand" style={{ width: `${member.percent}%` }} />
                    </div>
                    <span className="tabular text-right text-[13px] text-fg-muted">{member.percent}%</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {groups.length === 0 && (
          <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-fg-muted">
            Nenhum grupo criado. Use &quot;Gerenciar Grupos&quot; para criar o primeiro.
          </p>
        )}
      </div>
    </Card>
  );
}
