"use client";

import { useId, useState, type ReactNode } from "react";
import {
  accountKinds,
  defaultCredentials,
  serverExamples,
  type AccountKindId,
  type CredentialsValues,
  type TradingPlatform,
} from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import { Button, cx } from "../../UI";
import FieldIcon, { type FieldIconName } from "./FieldIcons";
import PlatformInfoPanel from "./PlatformInfoPanel";
import PlatformLogo from "./PlatformLogo";

const outlineButton =
  "inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-6 text-[15px] font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const shell =
  "flex h-11 min-w-0 flex-1 items-stretch overflow-hidden rounded-lg border border-line bg-canvas/60 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/60";
const leadingIcon = "flex w-12 shrink-0 items-center justify-center border-r border-line bg-surface-2/40 text-fg-muted";
const control = "min-w-0 flex-1 bg-transparent px-4 text-[16px] text-fg outline-none placeholder:text-fg-subtle";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[15px] leading-6 text-fg-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

function Leading({ name }: { name: FieldIconName }) {
  return (
    <span className={leadingIcon}>
      <FieldIcon name={name} />
    </span>
  );
}

export default function CredentialsStep({
  platform,
  initial = defaultCredentials,
  onBack,
  onNext,
}: {
  platform: TradingPlatform;
  initial?: CredentialsValues;
  onBack: () => void;
  onNext: (values: CredentialsValues) => void;
}) {
  const uid = useId();
  const loginId = `${uid}-login`;
  const passwordId = `${uid}-password`;
  const serverId = `${uid}-server`;

  const [login, setLogin] = useState(initial.login);
  const [password, setPassword] = useState("senha-exemplo");
  const [showPassword, setShowPassword] = useState(false);
  const [server, setServer] = useState(initial.server);
  const [kind, setKind] = useState<AccountKindId>(initial.kind);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext({ login, server, kind });
      }}
      aria-labelledby="credentials-step-title"
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.54fr)_minmax(0,1fr)]">
        <section className="min-w-0 rounded-xl border border-line bg-surface/70 p-4">
          <div className="flex items-center gap-4 border-b border-line pb-4">
            <div className="flex size-[84px] shrink-0 items-center justify-center">
              <PlatformLogo logo={platform.id} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h2 className="text-[22px] font-semibold leading-8 tracking-tight text-fg">{platform.name}</h2>
                <span className="inline-flex items-center rounded border border-brand/40 bg-brand-strong/20 px-2 py-0.5 text-[12px] font-medium text-[#5cc2ff]">
                  Plataforma Selecionada
                </span>
              </div>
              <p className="mt-1.5 text-pretty text-[15px] leading-6 text-fg-muted">
                Conecte sua conta {platform.name} utilizando suas credenciais de login, senha e servidor. O Copytrix utiliza conexão segura e
                apenas para execução de ordens e leitura de dados.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h2 id="credentials-step-title" tabIndex={-1} className="text-[22px] font-semibold leading-8 tracking-tight text-fg outline-none">
              2. Dados de Acesso
            </h2>
            <p className="mt-0.5 text-[15px] leading-6 text-fg-muted">Informe as credenciais da sua conta {platform.name}</p>

            <div className="mt-3 flex flex-col gap-3.5">
              <Field label="Login / Número da Conta" htmlFor={loginId}>
                <div className={shell}>
                  <Leading name="user" />
                  <input
                    id={loginId}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={control}
                  />
                </div>
              </Field>

              <Field label="Senha da Conta" htmlFor={passwordId}>
                <div className={shell}>
                  <Leading name="lock" />
                  <input
                    id={passwordId}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cx(control, !showPassword && "tracking-[0.2em]")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    className="flex w-12 shrink-0 items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
                  >
                    <FieldIcon name={showPassword ? "eye" : "eyeOff"} />
                  </button>
                </div>
              </Field>

              <Field label="Servidor" htmlFor={serverId}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className={shell}>
                    <Leading name="server" />
                    <select
                      id={serverId}
                      value={server}
                      onChange={(e) => setServer(e.target.value)}
                      className={cx(control, "cursor-pointer appearance-none [&>option]:bg-surface [&>option]:text-fg")}
                    >
                      {serverExamples.map((example) => (
                        <option key={example.server} value={example.server}>
                          {example.server}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden className="pointer-events-none flex w-11 shrink-0 items-center justify-center text-fg-muted">
                      <Icon name="chevronDown" size={17} stroke={2} />
                    </span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-lg border border-brand/60 bg-brand-strong/15 whitespace-nowrap px-5 text-[15px] font-medium text-[#5cc2ff] transition-colors hover:bg-brand-strong/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <Icon name="barsFilled" size={17} />
                    Testar Servidor
                  </button>
                </div>
              </Field>
            </div>

            <fieldset className="mt-4 min-w-0 border-0 border-t border-line p-0 pt-4">
              <legend className="float-left mb-2.5 w-full text-[17px] font-medium leading-6 text-fg">Tipo de Conta (Opcional)</legend>
              <div className="clear-both grid grid-cols-1 gap-3 sm:grid-cols-2">
                {accountKinds.map((item) => (
                  <label
                    key={item.id}
                    className={cx(
                      "relative flex min-w-0 cursor-pointer items-center gap-4 rounded-xl border bg-surface/60 px-4 py-4 transition-colors",
                      "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                      kind === item.id
                        ? "border-2 border-brand bg-brand-soft/30 shadow-[0_0_16px_rgba(21,154,242,.35)]"
                        : "border-line hover:border-line-strong",
                    )}
                  >
                    <input
                      type="radio"
                      name="account-kind"
                      value={item.id}
                      checked={kind === item.id}
                      onChange={() => setKind(item.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={cx(
                        "flex size-[22px] shrink-0 items-center justify-center rounded-full border-2",
                        kind === item.id ? "border-brand bg-brand-strong" : "border-line-strong",
                      )}
                    >
                      {kind === item.id && <span className="size-2 rounded-full bg-white" />}
                    </span>
                    <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-brand">
                      <Icon name="barsFilled" size={28} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[17px] font-semibold leading-6 text-fg">{item.title}</span>
                      <span className="mt-0.5 block text-pretty text-[14px] leading-5 text-fg-muted">{item.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <PlatformInfoPanel platform={platform} />
      </div>

      <div className="flex flex-col-reverse gap-3 rounded-xl border border-line bg-surface/70 p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onBack} className={outlineButton}>
          <Icon name="arrowLeft" size={17} />
          Etapa Anterior
        </button>
        <Button type="submit" variant="primary" className="h-12 gap-2.5 rounded-lg px-6 text-[15px] font-semibold">
          Próxima Etapa
          <Icon name="arrowRight" size={17} stroke={2.2} />
        </Button>
      </div>
    </form>
  );
}
