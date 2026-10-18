import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { IconTile } from "./ui";

const metrics = [
  { icon: "accounts", tone: "blue" as const, label: "Plataformas Integradas", count: { to: 38, prefix: "+" } },
  { icon: "pulse", tone: "purple" as const, label: "Mesas Proprietárias Suportadas", count: { to: 200, prefix: "+" } },
  { icon: "barsFilled", tone: "blue" as const, label: "Tempo de Atividade", count: { to: 99.9, decimals: 1, suffix: "%" } },
  { icon: "accounts", tone: "cyan" as const, label: "Traders no Mundo", count: { to: 10000, group: true, suffix: "+" } },
  { icon: "trophy", tone: "gold" as const, label: "Avaliação dos Usuários", count: { to: 4.9, decimals: 1, suffix: "/5" } },
];

export function Metrics() {
  return (
    <section aria-label="Números do Copytrix" className="relative px-5 pb-8 pt-4 sm:px-8">
      <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-3 lg:grid-cols-5">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 70} className={i === metrics.length - 1 ? "col-span-2 lg:col-span-1" : ""}>
            <div className="lp-card lp-card-hover flex h-full items-center gap-4 p-4 sm:p-5">
              <IconTile name={m.icon} tone={m.tone} size={52} />
              <div className="min-w-0">
                <p className="text-2xl font-extrabold leading-none tracking-tight text-white sm:text-[28px]">
                  <CountUp {...m.count} />
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-slate-300">{m.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
