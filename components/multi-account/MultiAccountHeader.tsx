"use client";
import Link from "next/link";
import { Icon } from "../Icons";
import { Badge } from "../UI";
import { Menu, type MenuItem } from "./MaPrimitives";

const actionClass =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function MultiAccountHeader({
  templateItems,
  onAddAccount,
  onOpenSettings,
}: {
  templateItems: MenuItem[];
  onAddAccount: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Multi-Conta Avançado
        </span>
      </nav>
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Multi-Conta Avançado</h1>
            <Badge tone="green" className="border-success/60 bg-success/15 px-2.5 text-xs">
              Ativo
            </Badge>
          </div>
          <p className="mt-1 max-w-2xl text-pretty text-[15px] leading-6 text-fg-muted">
            Gerencie múltiplas contas, defina alocação de risco, sincronize operações e acompanhe o desempenho em tempo real.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button type="button" onClick={onAddAccount} className={`${actionClass} border-brand-strong bg-brand-strong/20 text-fg hover:bg-brand-strong/35`}>
            <Icon name="plus" size={16} stroke={2.2} />
            Adicionar Conta
          </button>
          <Menu
            items={templateItems}
            width={280}
            ariaLabel="Templates de configuração"
            buttonClassName={`${actionClass} border-brand-strong/70 bg-[#0a1b2b] text-fg hover:border-brand`}
          >
            <Icon name="clipboard" size={15} />
            Templates
            <Icon name="chevronDown" size={14} />
          </Menu>
          <button type="button" onClick={onOpenSettings} className={`${actionClass} border-brand-strong/70 bg-[#0a1b2b] text-fg hover:border-brand`}>
            <Icon name="settings" size={15} />
            Configurações Gerais
          </button>
        </div>
      </header>
    </>
  );
}
