"use client";
import { useId } from "react";
import { cx } from "../UI";
import SystemLogo from "../systems/SystemLogo";
import { ArrowRightIcon, CheckBullet, StarIcon } from "./PlanIcons";
import { coreFeatures, supportedSystems } from "../../lib/plan-demo";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function PlanHighlightsCard() {
  const titleId = useId();
  const systemsId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className="flex min-w-0 flex-col rounded-xl border border-brand/20 bg-surface/70 p-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,.03)]"
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center text-[#f5c542]">
            <StarIcon size={30} />
          </span>
          <h2 id={titleId} className="text-[16px] font-semibold leading-6 tracking-tight text-fg">
            Principais Recursos do Copytrix
          </h2>
        </div>
      </header>

      <ul className="mt-4 flex flex-col gap-2 text-[13.5px] text-fg">
        {coreFeatures.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckBullet size={16} className="shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id={systemsId} className="text-[12.5px] font-medium text-fg-muted">
            Sistemas suportados
          </h3>
          <button
            type="button"
            className={cx(
              "inline-flex h-[32px] items-center gap-2 rounded-lg border border-brand/50 bg-brand-soft/20 px-3 text-[12.5px] font-medium text-brand transition-colors hover:bg-brand-soft/40",
              focusRing,
            )}
          >
            Ver todos os sistemas
            <ArrowRightIcon size={14} />
          </button>
        </div>
        <ul aria-labelledby={systemsId} className="mt-3 flex flex-wrap items-start gap-x-4 gap-y-3 rounded-lg border border-line-strong/40 bg-canvas/40 px-3.5 py-3">
          {supportedSystems.map((system) => (
            <li key={system.label} className="flex w-[64px] flex-col items-center gap-1.5">
              <SystemLogo logo={system.logo} size={32} />
              <span className="max-w-full truncate text-[11px] leading-4 text-fg-muted">{system.label}</span>
            </li>
          ))}
          <li className="flex w-[64px] flex-col items-center gap-1.5">
            <span aria-hidden className="flex size-8 items-center justify-center rounded-[10px] border border-line-strong/60 text-[16px] leading-none text-fg-muted">
              ···
            </span>
            <span className="text-[11px] leading-4 text-fg-muted">+48 outros</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
