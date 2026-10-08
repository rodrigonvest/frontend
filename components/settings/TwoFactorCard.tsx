"use client";
import { useState } from "react";
import { Badge, cx } from "../UI";
import { secretKeyDemo, setupInstructions, twoFactorMethods, verificationCodeDemo, type TwoFactorMethodId } from "../../lib/security-demo";
import SettingsIcon from "./SettingsIcons";
import { SettingsCard } from "./SettingsFields";
import { CopyButton, outlineButtonClass } from "./SecurityFields";

const spokeColors = ["#ea4335", "#4285f4", "#4285f4", "#34a853", "#fbbc04", "#ea4335"];

function GoogleAuthenticatorLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      {spokeColors.map((color, i) => {
        const angle = ((-90 + i * 60) * Math.PI) / 180;
        const x = 24 + Math.cos(angle) * 14;
        const y = 24 + Math.sin(angle) * 14;
        return <line key={i} x1="24" y1="24" x2={x.toFixed(2)} y2={y.toFixed(2)} stroke={color} strokeWidth="7" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function SmsLogo() {
  return (
    <svg width="50" height="48" viewBox="0 0 50 48" fill="none" aria-hidden>
      <path d="M8 6h34a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H24l-9 8v-8H8a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5Z" fill="#3a9bf0" />
      <text x="25" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">
        SMS
      </text>
    </svg>
  );
}

function EmailLogo() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      <rect x="3" y="8" width="46" height="32" rx="6" fill="#b9d3f2" />
      <path d="m6 14 20 15 20-15" stroke="#6f9ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 36 20 24M46 36 32 24" stroke="#8fb4e6" strokeWidth="2.500" strokeLinecap="round" />
    </svg>
  );
}

const logos: Record<TwoFactorMethodId, () => React.JSX.Element> = { app: GoogleAuthenticatorLogo, sms: SmsLogo, email: EmailLogo };

export default function TwoFactorCard() {
  const [method, setMethod] = useState<TwoFactorMethodId>("app");
  const [showSecret, setShowSecret] = useState(false);
  const configured = twoFactorMethods.find((m) => m.id === method)?.title ?? "";

  return (
    <SettingsCard
      icon="shield"
      title="Autenticação de Dois Fatores (2FA)"
      description="Adicione uma camada extra de segurança para proteger sua conta."
      action={
        <Badge tone="green" className="!px-3.5 !py-1 !text-[13px] font-semibold">
          Ativado
        </Badge>
      }
    >
      <fieldset>
        <legend className="sr-only">Método de verificação em duas etapas</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {twoFactorMethods.map((item) => {
            const selected = item.id === method;
            const Logo = logos[item.id];
            return (
              <label
                key={item.id}
                className={cx(
                  "relative flex min-h-[176px] cursor-pointer flex-col items-center rounded-xl border px-3 pb-3.5 pt-5 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                  selected ? "border-brand-strong bg-brand/10 shadow-[0_0_0_1px_var(--color-brand-strong)]" : "border-line bg-canvas/40 hover:border-line-strong",
                )}
              >
                <input type="radio" name="two-factor-method" value={item.id} checked={selected} onChange={() => setMethod(item.id)} className="sr-only" />
                <span
                  aria-hidden
                  className={cx(
                    "absolute left-2.5 top-2.5 flex size-4 items-center justify-center rounded-full border-2",
                    selected ? "border-brand-strong" : "border-line-strong",
                  )}
                >
                  {selected && <span className="size-2 rounded-full bg-brand-strong" />}
                </span>
                <span className="flex h-12 items-center justify-center">
                  <Logo />
                </span>
                <span className="mt-2.5 text-[14.5px] font-semibold leading-5 text-fg">{item.title}</span>
                <span className="mt-1 text-[12.5px] leading-[18px] text-fg-muted">{item.description}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <p className="text-[13px] leading-4 text-fg-muted">Seu código de verificação</p>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-line-strong/50 bg-canvas/60 px-3 py-2">
            <output aria-label="Código de verificação atual" className="tabular text-[28px] font-semibold leading-9 tracking-[.14em] text-fg">
              {verificationCodeDemo}
            </output>
            <CopyButton value={verificationCodeDemo.replace(" ", "")} label="Copiar código de verificação" />
          </div>
        </div>
        <div className="flex min-w-[260px] flex-1 items-end justify-between gap-3 pb-1.5">
          <div>
            <p className="text-[13px] leading-4 text-fg-muted">Aplicativo configurado</p>
            <p className="mt-2.5 flex items-center gap-2 text-[14px] font-medium text-fg">
              <span aria-hidden className="flex size-[18px] items-center justify-center rounded-full bg-success text-canvas">
                <SettingsIcon name="check" size={12} stroke={3} />
              </span>
              {configured}
            </p>
          </div>
          <button type="button" className={cx(outlineButtonClass, "h-9")}>
            Reconfigurar
          </button>
        </div>
      </div>

      <div className="mt-3.5 flex flex-1 flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <ol className="list-inside list-decimal space-y-1 text-[13px] leading-5 text-fg-muted">
          {setupInstructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="flex flex-col items-end gap-1.5">
          {showSecret && <code className="tabular rounded-md border border-line bg-canvas/60 px-2.5 py-1 text-[13px] tracking-wider text-fg">{secretKeyDemo}</code>}
          <button
            type="button"
            aria-expanded={showSecret}
            onClick={() => setShowSecret((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md text-[13.5px] font-medium text-brand transition-colors hover:text-[#5cc2ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <SettingsIcon name="wrench" size={17} />
            Ver chave secreta (manual)
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}
