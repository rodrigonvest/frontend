import type { ReactNode } from "react";
import { connectionTypeFor, serverExamples, type TradingPlatform } from "../../../lib/account-platforms";
import { Icon } from "../../Icons";
import FieldIcon, { type FieldIconName } from "./FieldIcons";

type InfoRow = { label: string; icon: ReactNode; value: ReactNode };

function InfoRows({ platform }: { platform: TradingPlatform }) {
  const rows: InfoRow[] = [
    { label: "Plataforma", icon: <span className="text-brand"><Icon name="layers" size={20} /></span>, value: platform.name },
    { label: "Tipo de Conexão", icon: <span className="text-brand"><FieldIcon name={"plug" satisfies FieldIconName} /></span>, value: connectionTypeFor(platform.id) },
    { label: "Permissões", icon: <span className="text-brand"><Icon name="fileText" size={20} /></span>, value: "Trading e Leitura de Dados" },
    { label: "Segurança", icon: <span className="text-brand"><Icon name="shield" size={20} /></span>, value: "Conexão criptografada (SSL)" },
    {
      label: "Acesso de Saque",
      icon: <span className="text-danger"><Icon name="dollar" size={20} /></span>,
      value: (
        <span className="inline-flex items-center gap-2">
          <span className="text-danger">
            <Icon name="x" size={18} stroke={2.6} />
          </span>
          Não tem acesso a saques
        </span>
      ),
    },
  ];

  return (
    <dl className="mt-3">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`grid grid-cols-[minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 py-[7px] sm:grid-cols-[28px_minmax(0,0.9fr)_minmax(0,1.3fr)] ${index > 0 ? "border-t border-line/70" : ""}`}
        >
          <span aria-hidden className="hidden sm:flex">
            {row.icon}
          </span>
          <dt className="text-[14.5px] text-fg-muted">{row.label}</dt>
          <dd className="text-[14.5px] text-fg">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PlatformInfoPanel({ platform }: { platform: TradingPlatform }) {
  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <section aria-labelledby="platform-info-title" className="rounded-xl border border-line bg-surface/70 px-4 py-4">
        <h2 id="platform-info-title" className="text-[18px] font-semibold leading-6 tracking-tight text-fg">
          Informações da Plataforma
        </h2>
        <InfoRows platform={platform} />
      </section>

      <aside
        aria-labelledby="where-to-find-title"
        className="flex flex-1 flex-col rounded-xl border border-brand/40 bg-gradient-to-br from-brand-soft/50 to-surface p-4"
      >
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 shrink-0 text-brand">
            <Icon name="info" size={28} stroke={2} />
          </span>
          <div className="min-w-0">
            <h2 id="where-to-find-title" className="text-[17px] font-semibold leading-6 text-[#5cc2ff]">
              Onde encontrar seus dados?
            </h2>
            <p className="mt-0.5 text-pretty text-[15px] leading-6 text-fg-muted">
              Você pode encontrar o login, senha e servidor da sua conta {platform.name} na sua corretora ou prop firm.
            </p>
          </div>
        </div>

        <details open className="group mt-3 flex-1 rounded-lg border border-line bg-canvas/50">
          <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3.5 py-2.5 text-[15px] font-medium text-fg marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
            <span className="text-brand -rotate-90 transition-transform group-open:rotate-0">
              <Icon name="chevronDown" size={17} stroke={2.2} />
            </span>
            Exemplos de Servidores
            <span className="ml-auto text-fg-muted transition-transform group-open:rotate-180">
              <Icon name="chevronDown" size={17} stroke={2} />
            </span>
          </summary>
          <ul className="flex flex-col gap-px px-2.5 pb-2.5">
            {serverExamples.map((example) => (
              <li
                key={example.broker}
                className="grid grid-cols-2 gap-3 rounded-md border border-line/60 bg-surface-2/50 px-3 py-[5px] text-[14px] leading-5"
              >
                <span className="min-w-0 truncate text-fg-muted">{example.broker}</span>
                <span className="min-w-0 truncate text-fg">{example.server}</span>
              </li>
            ))}
          </ul>
        </details>
      </aside>
    </div>
  );
}
