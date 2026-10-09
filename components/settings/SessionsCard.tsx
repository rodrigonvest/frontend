"use client";
import Link from "next/link";
import { Badge, cx } from "../UI";
import { activeSessionsDemo } from "../../lib/security-demo";
import SettingsIcon from "./SettingsIcons";
import { SettingsCard } from "./SettingsFields";
import { dangerButtonClass } from "./SecurityFields";

export default function SessionsCard() {
  return (
    <SettingsCard
      icon="monitor"
      title="Sessões Ativas"
      description="Gerencie os dispositivos que estão conectados à sua conta."
      action={
        <div className="flex items-center gap-4">
          <Link
            href="/configuracoes/seguranca/historico-conexoes"
            className="whitespace-nowrap text-[13.5px] font-medium text-brand underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Ver histórico de conexões <span aria-hidden>&rarr;</span>
          </Link>
          <button type="button" className={cx(dangerButtonClass, "h-9")}>
            <SettingsIcon name="logout" size={15} />
            Sair de Todas
          </button>
        </div>
      }
    >
      <ul className="flex flex-1 flex-col gap-2">
        {activeSessionsDemo.map((session) => (
          <li key={session.id} className="flex flex-1 items-center gap-3 rounded-lg border border-line/70 bg-canvas/40 px-3 py-2.5">
            <span aria-hidden className="flex size-9 shrink-0 items-center justify-center text-brand">
              <SettingsIcon name={session.kind === "desktop" ? "monitor" : "phone"} size={26} stroke={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-[14px] font-medium leading-5 text-fg">
                {session.device}
                {session.current && (
                  <Badge tone="green" className="!px-1.5 !py-0 !text-[10.5px]">
                    Sessão Atual
                  </Badge>
                )}
              </p>
              <p className="mt-0.5 truncate text-[12.5px] leading-[18px] text-fg-muted">
                {session.location} <span aria-hidden>&bull;</span> {session.ip}
              </p>
            </div>
            <time className="shrink-0 text-right text-[12.5px] leading-4 text-fg-muted">{session.date}</time>
            <button
              type="button"
              aria-label={`Ações da sessão ${session.device}`}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-white/[.05] hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
            >
              <SettingsIcon name="vmore" size={18} />
            </button>
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}
