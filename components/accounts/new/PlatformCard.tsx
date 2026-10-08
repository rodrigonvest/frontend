import type { TradingPlatform } from "../../../lib/account-platforms";
import { cx } from "../../UI";
import PlatformLogo from "./PlatformLogo";

type PlatformCardProps = {
  platform: TradingPlatform;
  selected: boolean;
  onSelect: (id: TradingPlatform["id"]) => void;
};

export default function PlatformCard({ platform, selected, onSelect }: PlatformCardProps) {
  return (
    <label className="group relative block h-full cursor-pointer">
      <input
        type="radio"
        name="platform"
        value={platform.id}
        checked={selected}
        onChange={() => onSelect(platform.id)}
        className="peer sr-only"
      />
      <div
        className={cx(
          "flex h-full min-h-[212px] flex-col items-center rounded-xl border px-4 pb-5 pt-5 text-center transition-all duration-150",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
          selected
            ? "border-brand bg-gradient-to-b from-brand-soft/60 to-surface shadow-[0_0_0_1px_rgba(21,154,242,.55),0_0_22px_rgba(21,154,242,.28)]"
            : "border-line bg-gradient-to-b from-surface-2/50 to-surface/80 group-hover:border-line-strong group-hover:bg-surface-2/70",
        )}
      >
        <span
          aria-hidden
          className={cx(
            "absolute right-3.5 top-3.5 flex size-[18px] items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-brand bg-brand-strong" : "border-line-strong bg-transparent group-hover:border-fg-subtle",
          )}
        >
          {selected && <span className="size-1.5 rounded-full bg-white" />}
        </span>

        <div className="flex h-[72px] items-center justify-center">
          <PlatformLogo logo={platform.id} />
        </div>
        <h3 className="mt-2 text-[17px] font-semibold leading-6 tracking-tight text-fg">{platform.name}</h3>
        <p className="mt-1 max-w-[210px] text-pretty text-[13.5px] leading-[21px] text-fg-muted">{platform.description}</p>

        {platform.recommended && (
          <span className="mt-auto inline-flex h-6 items-center rounded-md bg-brand-strong px-3 text-[12px] font-medium text-white">
            Recomendado
          </span>
        )}
        {selected && <span className="sr-only">Plataforma selecionada</span>}
      </div>
    </label>
  );
}
