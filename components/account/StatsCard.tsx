import { ACCOUNT_STATS } from "../../lib/account-data";
import { cx } from "../UI";
import { AccountCard, IconTile } from "./AccountPrimitives";

export default function StatsCard() {
  return (
    <AccountCard id="account-stats-title" title="Estatísticas da Conta">
      <ul className="grid gap-2.5 @sm:grid-cols-2 @2xl:grid-cols-4">
        {ACCOUNT_STATS.map((stat) => (
          <li
            key={stat.id}
            className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-gradient-to-b from-surface-2/60 to-surface p-3.5"
          >
            <IconTile name={stat.icon} accent={stat.accent} size={21} className="size-11" />
            <div className="min-w-0 leading-tight">
              <p className={cx("tabular text-[21px] font-semibold tracking-tight", stat.positive ? "text-success" : "text-fg")}>
                {stat.value}
              </p>
              <p className="mt-1 text-[12.5px] text-fg-muted">{stat.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </AccountCard>
  );
}
