"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  addAccountSteps,
  defaultAccountSettings,
  defaultCredentials,
  defaultPlatformId,
  defaultRiskSettings,
  tradingPlatforms,
  type AccountSettings,
  type CredentialsValues,
  type PlatformLogoKey,
  type RiskSettings,
} from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import { Button } from "../../UI";
import AddAccountStepper from "./AddAccountStepper";
import ConnectionTestStep from "./ConnectionTestStep";
import CredentialsStep from "./CredentialsStep";
import PlatformCard from "./PlatformCard";
import SettingsStep from "./SettingsStep";
import RiskStep from "./RiskStep";

const outlineLink =
  "inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-5 text-[14px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function AddAccountView() {
  const [platform, setPlatform] = useState<PlatformLogoKey>(defaultPlatformId);
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [credentials, setCredentials] = useState<CredentialsValues>(defaultCredentials);
  const [settings, setSettings] = useState<AccountSettings>(defaultAccountSettings);
  const [risk, setRisk] = useState<RiskSettings>(defaultRiskSettings);
  const selectedPlatform = tradingPlatforms.find((item) => item.id === platform) ?? tradingPlatforms[0];

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-2.5 text-[15px] text-fg-muted">
            <Link href="/accounts" className="transition-colors hover:text-fg">
              Contas
            </Link>
            <Icon name="chevron" size={13} />
            <span aria-current="page" className="text-fg">
              Adicionar Conta
            </span>
          </nav>
          <h1 className="mt-1.5 text-balance text-2xl font-bold tracking-tight text-fg sm:text-[30px] sm:leading-9">Adicionar Conta de Trading</h1>
          <p className="mt-1 text-pretty text-[15px] leading-6 text-fg-muted">Conecte sua conta de trading e comece a operar com o Copytrix</p>
        </div>
        <Link href="/accounts" className={`${outlineLink} h-12 px-6`}>
          <Icon name="arrowLeft" size={16} />
          Voltar para Contas
        </Link>
      </header>

      <AddAccountStepper current={step} descriptions={step > 1 ? { 1: selectedPlatform.name } : undefined} />

      {step === 2 && (
        <CredentialsStep
          platform={selectedPlatform}
          initial={credentials}
          onBack={() => setStep(1)}
          onNext={(values) => {
            setCredentials(values);
            setSettings((current) => ({ ...current, environment: values.kind }));
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <SettingsStep
          platform={selectedPlatform}
          credentials={credentials}
          settings={settings}
          onChange={setSettings}
          onEditCredentials={() => setStep(2)}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <RiskStep
          platform={selectedPlatform}
          credentials={credentials}
          settings={settings}
          risk={risk}
          onChange={setRisk}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <ConnectionTestStep
          platform={selectedPlatform}
          credentials={credentials}
          settings={settings}
          onBack={() => setStep(4)}
          onComplete={() => router.push("/accounts")}
        />
      )}

      {step === 1 && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep(2);
        }}
        aria-labelledby="platform-step-title"
        className="rounded-xl border border-line bg-surface/70 p-4 sm:p-5"
      >
        <fieldset className="min-w-0 border-0 p-0">
          <legend className="mb-4 block">
            <span id="platform-step-title" className="block text-[22px] font-semibold leading-8 tracking-tight text-fg">
              1. Escolha a Plataforma
            </span>
            <span className="mt-0.5 block text-[15px] font-normal leading-6 text-fg-muted">Selecione a plataforma da sua conta de trading</span>
          </legend>

          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tradingPlatforms.map((item) => (
              <PlatformCard key={item.id} platform={item} selected={platform === item.id} onSelect={setPlatform} />
            ))}
          </div>
        </fieldset>

        <aside
          aria-label="Sobre a conexão"
          className="mt-4 flex items-start gap-4 rounded-xl border border-brand/30 bg-gradient-to-r from-brand-soft/40 to-surface px-5 py-4"
        >
          <span className="mt-0.5 text-brand">
            <Icon name="info" size={24} stroke={2} />
          </span>
          <div className="min-w-0">
            <h2 className="text-[16px] font-semibold leading-6 text-[#5cc2ff]">Sobre a conexão</h2>
            <p className="mt-0.5 text-pretty text-[15px] leading-6 text-fg-muted">
              O Copytrix se conecta à sua conta de trading através de APIs oficiais ou conexão nativa da plataforma. Suas credenciais são
              criptografadas e armazenadas de forma segura. Recomendamos o uso de contas com permissão de trading e sem acesso de saque.
            </p>
          </div>
        </aside>

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/accounts" className={outlineLink}>
            <Icon name="x" size={16} />
            Cancelar
          </Link>
          <Button
            type="submit"
            variant="primary"
            aria-label={`Próxima Etapa: ${addAccountSteps[1].title}`}
            className="h-12 gap-2.5 rounded-lg px-6 text-[15px] font-semibold"
          >
            Próxima Etapa
            <Icon name="arrowRight" size={17} stroke={2.2} />
          </Button>
        </div>
      </form>
      )}
    </div>
  );
}
