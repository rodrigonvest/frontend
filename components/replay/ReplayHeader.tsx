import Link from "next/link";
import { Icon } from "../Icons";
import { SPEEDS, channels, periods } from "../../lib/replay-data";
import { PauseGlyph, PlayGlyph, RpSelect } from "./RpPrimitives";

interface Props {
  channelId: string;
  periodId: string;
  speed: number;
  active: boolean;
  playing: boolean;
  onChannel: (id: string) => void;
  onPeriod: (id: string) => void;
  onSpeed: (speed: number) => void;
  onTogglePlay: () => void;
}

function Field({ label, htmlFor, children, className }: { label: string; htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs text-fg-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ReplayHeader({ channelId, periodId, speed, active, playing, onChannel, onPeriod, onSpeed, onTogglePlay }: Props) {
  const buttonLabel = playing ? "Pausar Replay" : active ? "Continuar Replay" : "Iniciar Replay";

  return (
    <>
      <nav aria-label="Trilha de navegação" className="mb-1 flex items-center gap-2 text-[13px] text-fg-muted">
        <Link href="/sistemas" className="hover:text-fg focus-visible:outline-2 focus-visible:outline-brand">
          Sistemas
        </Link>
        <Icon name="chevron" size={12} />
        <span aria-current="page" className="text-fg">
          Replay de Sinais
        </span>
      </nav>

      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-9">Replay de Sinais</h1>
            <span className="rounded-full border border-[#9b63ff]/50 bg-[#9b63ff]/20 px-2.5 py-0.5 text-xs font-medium text-[#c9adff]">Beta</span>
          </div>
          <p className="mt-1 max-w-xl text-pretty text-[14px] leading-6 text-fg-muted">
            Reviva os sinais históricos e veja exatamente como eles foram executados. Ideal para análise, estudo e validação de estratégias.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)] xl:flex xl:items-end">
          <Field label="Período" htmlFor="replay-period" className="xl:w-[230px]">
            <RpSelect id="replay-period" value={periodId} onChange={(event) => onPeriod(event.target.value)} icon={<Icon name="calendar" size={16} />}>
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.label}
                </option>
              ))}
            </RpSelect>
          </Field>
          <Field label="Canal" htmlFor="replay-channel" className="xl:w-[200px]">
            <RpSelect id="replay-channel" value={channelId} onChange={(event) => onChannel(event.target.value)}>
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </RpSelect>
          </Field>
          <Field label="Velocidade" htmlFor="replay-speed" className="xl:w-[140px]">
            <RpSelect id="replay-speed" value={speed} onChange={(event) => onSpeed(Number(event.target.value))}>
              {SPEEDS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </RpSelect>
          </Field>
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-strong px-5 text-[13.5px] font-semibold text-white shadow-[0_0_22px_-6px_rgba(21,154,242,.8)] transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:col-span-3 xl:col-span-1"
          >
            {playing ? <PauseGlyph size={14} /> : <PlayGlyph size={14} />}
            {buttonLabel}
          </button>
        </div>
      </header>
    </>
  );
}
