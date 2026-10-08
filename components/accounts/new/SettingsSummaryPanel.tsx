import type { ReactNode } from "react";
import { accountEnvironments, type AccountSettings, type CredentialsValues, type TradingPlatform } from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import FieldIcon from "./FieldIcons";
import PlatformLogo from "./PlatformLogo";

type SummaryRow = { label: string; icon: ReactNode; value: string };

function buildRows(platform: TradingPlatform, credentials: CredentialsValues, settings: AccountSettings): SummaryRow[] {
  const environmentLabel = accountEnvironments.find((item) => item.id === settings.environment)?.label ?? settings.environment;
  return [
    { label: "Plataforma", icon: <Icon name="layers" size={18} />, value: platform.name },
    { label: "Nome da Conta", icon: <FieldIcon name="card" size={18} />, value: settings.name },
    {
      label: "Ambiente",
      icon: <span className="size-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.8)]" />,
      value: environmentLabel,
    },
    { label: "Login", icon: <FieldIcon name="user" size={18} />, value: credentials.login },
    { label: "Servidor", icon: <FieldIcon name="server" size={18} />, value: credentials.server },
    { label: "Moeda", icon: <Icon name="dollar" size={18} />, value: settings.currency },
    { label: "Alavancagem", icon: <Icon name="barsFilled" size={18} />, value: settings.leverage },
    { label: "Tipo de Execução", icon: <FieldIcon name="bolt" size={18} />, value: settings.executionType },
    { label: "Slippage Máximo", icon: <FieldIcon name="gauge" size={18} />, value: `${settings.slippage} pips` },
    { label: "Magic Number", icon: <FieldIcon name="hash" size={18} />, value: settings.magicNumber },
    { label: "Comentário", icon: <Icon name="message" size={18} />, value: settings.comment },
    { label: "Horário de Operação", icon: <Icon name="clock" size={18} />, value: settings.hours },
  ];
}

export default function SettingsSummaryPanel({
  platform,
  credentials,
  settings,
  onEdit,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
  onEdit: () => void;
}) {
  const rows = buildRows(platform, credentials, settings);

  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <section aria-labelledby="settings-platform-title" className="flex items-center gap-4 rounded-xl border border-line bg-surface/70 px-4 py-4">
        <div className="flex size-[76px] shrink-0 items-center justify-center">
          <PlatformLogo logo={platform.id} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <h2 id="settings-platform-title" className="text-[22px] font-semibold leading-8 tracking-tight text-fg">
              {platform.name}
            </h2>
            <span className="inline-flex items-center rounded-md border border-success/40 bg-success-soft px-2.5 py-0.5 text-[12.5px] font-medium text-success">
              Conectado
            </span>
          </div>
          <p className="mt-1 text-pretty text-[14px] leading-5 text-fg-muted">
            Conta configurada com sucesso.
            <br className="hidden sm:block" /> Revise as configurações antes de continuar.
          </p>
        </div>
      </section>

      <section aria-labelledby="settings-summary-title" className="rounded-xl border border-line bg-surface/70 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 id="settings-summary-title" className="text-[18px] font-semibold leading-6 tracking-tight text-fg">
            Resumo da Configuração
          </h2>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-strong px-3.5 text-[14px] font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <FieldIcon name="pencil" size={14} />
            Editar
          </button>
        </div>

        <dl className="mt-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 py-[5px] sm:grid-cols-[24px_minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              <span aria-hidden className="hidden items-center justify-center text-brand sm:flex">
                {row.icon}
              </span>
              <dt className="text-[14.5px] text-fg-muted">{row.label}</dt>
              <dd className="min-w-0 break-words text-[14.5px] text-fg sm:text-right">{row.value}</dd>
            </div>
          ))}
        </dl>

        <aside
          aria-labelledby="settings-later-title"
          className="mt-4 flex items-start gap-3 rounded-xl border border-brand/40 bg-gradient-to-br from-brand-soft/50 to-surface px-3.5 py-3.5"
        >
          <span className="mt-0.5 shrink-0 text-brand">
            <Icon name="info" size={24} stroke={2} />
          </span>
          <div className="min-w-0">
            <h3 id="settings-later-title" className="text-[14.5px] font-semibold leading-6 tracking-tight text-[#5cc2ff]">
              Essas configurações podem ser alteradas depois
            </h3>
            <p className="mt-0.5 text-pretty text-[14px] leading-5 text-fg-muted">
              Você poderá editar todas essas configurações a qualquer momento nas configurações da conta.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
