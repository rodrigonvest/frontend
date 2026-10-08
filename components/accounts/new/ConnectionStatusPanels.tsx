import type { ReactNode } from "react";
import {
  accountEnvironments,
  type AccountSettings,
  type CredentialsValues,
  type TradingPlatform,
} from "../../../lib/account-platforms";
import { connectionSnapshot, connectionTests } from "../../../lib/connection-test-demo";
import { Icon } from "../../Icons";
import FieldIcon from "./FieldIcons";
import ConnectionIcon from "./ConnectionIcons";
import PlatformLogo from "./PlatformLogo";

const panel = "rounded-xl border border-line bg-canvas/40";

export function ConnectionAccountCard({
  platform,
  credentials,
  settings,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
}) {
  const environment = accountEnvironments.find((item) => item.id === settings.environment)?.label ?? settings.environment;

  return (
    <section aria-labelledby="connection-account-title" className={`${panel} flex items-center gap-4 px-4 py-3`}>
      <div className="flex size-[68px] shrink-0 items-center justify-center">
        <PlatformLogo logo={platform.id} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <h3 id="connection-account-title" className="text-[19px] font-semibold leading-7 tracking-tight text-fg">
            {platform.name} - {settings.name}
          </h3>
          <span className="inline-flex items-center gap-2 rounded-md border border-success/45 bg-success-soft px-3 py-1.5 text-[13.5px] font-medium text-success shadow-[0_0_14px_rgba(18,217,158,.15)]">
            <span aria-hidden className="flex size-4 items-center justify-center rounded-full bg-success text-canvas">
              <Icon name="check" size={11} stroke={3.2} />
            </span>
            Pronto para operar
          </span>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[14px] leading-5 text-fg">
          <span>{environment}</span>
          <span aria-hidden className="h-3.5 w-px bg-line-strong" />
          <span>{settings.currency}</span>
          <span aria-hidden className="h-3.5 w-px bg-line-strong" />
          <span>{settings.leverage}</span>
          <span aria-hidden className="h-3.5 w-px bg-line-strong" />
          <span>{credentials.server}</span>
        </p>
      </div>
    </section>
  );
}

export function ConnectionStatusCard() {
  return (
    <section aria-labelledby="connection-status-title" className={`${panel} flex flex-col gap-4 px-4 py-3.5 min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between`}>
      <div className="min-w-0">
        <h3 id="connection-status-title" className="flex items-center gap-3 text-[17px] font-semibold leading-6 tracking-tight text-fg">
          <span aria-hidden className="flex size-[22px] items-center justify-center rounded-full bg-success text-canvas shadow-[0_0_12px_rgba(18,217,158,.45)]">
            <Icon name="info" size={14} stroke={2.6} />
          </span>
          Status da Conexão
        </h3>
        <p className="mt-2 flex items-center gap-3 text-[17px] font-semibold leading-6 text-success">
          <span aria-hidden className="ml-1 size-2.5 shrink-0 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.8)]" />
          Conexão estabelecida com sucesso!
        </p>
        <p className="mt-1 text-pretty text-[14px] leading-5 text-fg-muted">Sua conta está conectada e pronta para operar com o Copytrix.</p>
      </div>

      <div className="flex shrink-0 flex-col items-start min-[720px]:items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-lg bg-brand-strong px-7 text-[15px] font-semibold text-white shadow-[0_0_18px_rgba(21,154,242,.4)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <ConnectionIcon name="play" size={15} />
            Testar Conexão
          </button>
          <button
            type="button"
            aria-label="Retestar conexão"
            className="flex size-[46px] items-center justify-center rounded-lg border border-line-strong bg-surface text-fg transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Icon name="refresh" size={19} />
          </button>
        </div>
        <p className="mt-2 text-[12.5px] leading-4 text-fg-muted">Último teste: {connectionSnapshot.lastTest}</p>
      </div>
    </section>
  );
}

function DetailRow({ icon, label, value, tone }: { icon: ReactNode; label: string; value: ReactNode; tone?: "success" }) {
  return (
    <div className="grid grid-cols-[20px_minmax(0,1fr)] items-center gap-x-2.5 px-2.5 py-[9px] min-[560px]:grid-cols-[20px_minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <span aria-hidden className="flex items-center justify-center text-fg-muted">
        {icon}
      </span>
      <dt className="text-[13.5px] leading-5 text-fg-muted">{label}</dt>
      <dd className={`col-start-2 min-w-0 break-words text-[14px] leading-5 min-[560px]:col-start-auto ${tone === "success" ? "text-success" : "text-fg"}`}>{value}</dd>
    </div>
  );
}

function StatusDot() {
  return <span aria-hidden className="mr-3 inline-block size-2 rounded-full bg-success shadow-[0_0_8px_rgba(18,217,158,.8)]" />;
}

export function ConnectionDetailsCard({
  platform,
  credentials,
  settings,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
}) {
  const environment = accountEnvironments.find((item) => item.id === settings.environment)?.label ?? settings.environment;
  const listClass = "divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface/40";

  return (
    <section aria-labelledby="connection-details-title" className={`${panel} p-4`}>
      <h3 id="connection-details-title" className="text-[17px] font-semibold leading-6 tracking-tight text-fg">
        Detalhes da Conexão
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 min-[900px]:grid-cols-2">
        <dl className={listClass}>
          <DetailRow icon={<ConnectionIcon name="platform" size={18} />} label="Plataforma" value={platform.name} />
          <DetailRow icon={<FieldIcon name="server" size={18} />} label="Servidor" value={credentials.server} />
          <DetailRow icon={<FieldIcon name="user" size={18} />} label="Login" value={credentials.login} />
          <DetailRow
            icon={<FieldIcon name="lock" size={18} />}
            label="Senha"
            value={
              <span className="flex items-center justify-between gap-2">
                <span aria-label="Senha oculta" className="tracking-[0.18em]">
                  ••••••••
                </span>
                <span aria-hidden className="mr-1 text-fg-muted">
                  <FieldIcon name="eye" size={18} />
                </span>
              </span>
            }
          />
          <DetailRow icon={<ConnectionIcon name="investor" size={18} />} label="Investidor (Read Only)" value={connectionSnapshot.investorMode} />
        </dl>
        <dl className={listClass}>
          <DetailRow
            icon={<FieldIcon name="globe" size={18} />}
            label="Ambiente"
            tone="success"
            value={
              <>
                <StatusDot />
                {environment}
              </>
            }
          />
          <DetailRow icon={<Icon name="signal" size={18} />} label="Ping / Latência" tone="success" value={<><StatusDot />{connectionSnapshot.ping}</>} />
          <DetailRow icon={<FieldIcon name="plug" size={18} />} label="Status do Servidor" tone="success" value={<><StatusDot />{connectionSnapshot.serverStatus}</>} />
          <DetailRow icon={<ConnectionIcon name="clockSolid" size={18} />} label="Fuso Horário (Servidor)" value={settings.timezone} />
          <DetailRow icon={<ConnectionIcon name="clockSolid" size={18} />} label="Time Trade (Servidor)" value={connectionSnapshot.serverTime} />
        </dl>
      </div>
    </section>
  );
}

export function ConnectionTestsCard() {
  return (
    <section aria-labelledby="connection-tests-title" className={`${panel} p-4`}>
      <h3 id="connection-tests-title" className="text-[17px] font-semibold leading-6 tracking-tight text-fg">
        Testes Realizados
      </h3>
      <ul className="mt-3 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface/40">
        {connectionTests.map((test) => (
          <li key={test.id} className="grid grid-cols-[22px_minmax(0,1fr)_auto_auto] items-center gap-x-3 px-3 py-[9px] min-[560px]:grid-cols-[22px_minmax(0,1.4fr)_minmax(0,1fr)_auto]">
            <span aria-hidden className="flex size-[22px] items-center justify-center rounded-full bg-success text-canvas shadow-[0_0_10px_rgba(18,217,158,.4)]">
              <Icon name="check" size={13} stroke={3.2} />
            </span>
            <span className="min-w-0 text-[14px] leading-5 text-fg">{test.label}</span>
            <span className="text-[14px] font-medium leading-5 text-success min-[560px]:text-center">OK</span>
            <span className="tabular min-w-14 text-right text-[14px] leading-5 text-fg">{test.latency}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
