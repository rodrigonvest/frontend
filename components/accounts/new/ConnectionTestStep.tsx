"use client";

import type { AccountSettings, CredentialsValues, TradingPlatform } from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import { Button } from "../../UI";
import { AccountDataCard, OrderResultCard, OrderTestCard } from "./ConnectionOrderPanels";
import { ConnectionAccountCard, ConnectionDetailsCard, ConnectionStatusCard, ConnectionTestsCard } from "./ConnectionStatusPanels";

const outlineButton =
  "inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-6 text-[15px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function ConnectionTestStep({
  platform,
  credentials,
  settings,
  onBack,
  onComplete,
}: {
  platform: TradingPlatform;
  credentials: CredentialsValues;
  settings: AccountSettings;
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]">
      <section aria-labelledby="connection-step-title" className="flex min-w-0 flex-col gap-3 self-start rounded-xl border border-line bg-surface/70 p-4 sm:p-[18px]">
        <div>
          <h2 id="connection-step-title" tabIndex={-1} className="text-[22px] font-semibold leading-8 tracking-tight text-fg outline-none">
            5. Teste de Conexão
          </h2>
          <p className="mt-0.5 text-[15px] leading-6 text-fg-muted">Verifique se a conexão com sua conta está funcionando corretamente.</p>
        </div>

        <ConnectionAccountCard platform={platform} credentials={credentials} settings={settings} />
        <ConnectionStatusCard />
        <ConnectionDetailsCard platform={platform} credentials={credentials} settings={settings} />
        <ConnectionTestsCard />
      </section>

      <div className="flex min-w-0 flex-col gap-3.5">
        <AccountDataCard />
        <OrderTestCard />
        <OrderResultCard />

        <div className="mt-auto flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onBack} className={outlineButton}>
            <Icon name="arrowLeft" size={17} />
            Etapa Anterior
          </button>
          <Button
            type="button"
            variant="primary"
            onClick={onComplete}
            className="h-12 gap-2.5 rounded-lg px-6 text-[15px] font-semibold shadow-[0_0_20px_rgba(21,154,242,.35)]"
          >
            <Icon name="check" size={18} stroke={2.6} />
            Concluir e Adicionar Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
