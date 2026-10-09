import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { panelClass } from "../backtest/BacktestFields";
import SystemLogo from "../systems/SystemLogo";
import { GoldLogo, TelegramSquare } from "../trade-details/TradeIcons";
import { cx } from "../UI";
import type { SystemRoute } from "../../lib/systems-catalog";
import type { RouteDetails } from "../../lib/system-route-details";

function Row({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx("grid min-h-[34px] flex-1 grid-cols-[110px_minmax(0,1fr)] items-center gap-2 border-b border-[#17344b]/70 py-1.5 text-[13px] last:border-b-0", className)}>
      <dt className="text-fg-muted">{label}</dt>
      <dd className="m-0 min-w-0 text-fg">{children}</dd>
    </div>
  );
}

export default function SystemProfileCard({
  route,
  name,
  details,
  className,
}: {
  route: SystemRoute;
  name: string;
  details: RouteDetails;
  className?: string;
}) {
  const channel = route.source === "telegram" ? `Canal ${details.specifics[0].value}` : `Origem ${details.source.label}`;

  return (
    <section aria-label="Resumo da rota / automação" className={cx(panelClass, "flex min-w-0 flex-col p-3.5", className)}>
      <div className="flex items-center gap-3">
        <SystemLogo logo={route.icon.source} size={46} />
        <div className="min-w-0 leading-tight">
          <h2 className="truncate text-[17px] font-semibold tracking-tight text-fg">{name}</h2>
          <a
            href={details.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-fg-muted hover:text-fg"
          >
            {channel}
            <Icon name="external" size={13} />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </div>

      <dl className="mt-3 flex flex-1 flex-col">
        <Row label="Descrição" className="flex-[1.6] items-start pt-2.5">
          <p className="text-pretty text-[12px] leading-[18px] text-fg-muted">{details.description}</p>
        </Row>
        <Row label="Tipo">
          <span className="inline-flex h-[22px] items-center rounded-[5px] bg-brand-strong px-2 text-[11.5px] font-medium text-white">
            {details.signalType}
          </span>
        </Row>
        <Row label="Ativo Principal">
          <span className="inline-flex items-center gap-2">
            <GoldLogo />
            {details.mainSymbol}
          </span>
        </Row>
        <Row label="Conta Padrão">
          <span className="inline-flex items-center gap-2">
            <TelegramSquare />
            <span className="truncate">{details.account}</span>
          </span>
        </Row>
        <Row label="Criado em">
          <span className="tabular">{details.createdAt}</span>
        </Row>
        <Row label="Última Atividade">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-success shadow-[0_0_0_3px_rgba(18,217,158,.18)]" />
            {details.lastActivity}
          </span>
        </Row>
      </dl>
    </section>
  );
}
