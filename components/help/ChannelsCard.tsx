import { Icon } from "../Icons";
import { FOCUS_RING, SURFACE } from "../billing/BillingPrimitives";
import { cx } from "../UI";
import { CHANNELS, HELP_IDS, type SupportChannel } from "../../lib/help-data";
import { HelpTile } from "./HelpTile";

const CHANNEL_ICONS: Record<string, string> = { discord: "discord", email: "mail", status: "signal" };

export default function ChannelsCard({ onSelect }: { onSelect: (channel: SupportChannel) => void }) {
  return (
    <section id={HELP_IDS.channels} aria-labelledby="help-channels-title" className={cx(SURFACE, "@container min-w-0 scroll-mt-24 p-4 sm:p-5")}>
      <h2 id="help-channels-title" tabIndex={-1} className="rounded text-[17px] font-semibold tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
        Canais de Suporte
      </h2>
      <ul className="mt-3 grid gap-2.5 @3xl:grid-cols-[1fr_1.35fr_1fr]">
        {CHANNELS.map((channel) => (
          <li key={channel.id} className="min-w-0">
            <button
              type="button"
              id={channel.id === "discord" ? HELP_IDS.discordChannel : undefined}
              onClick={() => onSelect(channel)}
              className={cx(
                "group relative flex h-full w-full flex-col items-start gap-2 rounded-xl border border-line bg-surface/60 p-3 text-left transition-colors hover:border-line-strong hover:bg-white/[.04]",
                FOCUS_RING,
              )}
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <HelpTile name={CHANNEL_ICONS[channel.id]} accent={channel.accent} size={18} className="size-9" />
                  <span className="text-[14px] font-semibold text-fg">{channel.title}</span>
                </span>
                <span aria-hidden className="flex shrink-0 text-fg-subtle group-hover:text-fg">
                  <Icon name="external" size={15} />
                </span>
              </span>
              <span className="block max-w-full break-words text-[12px] leading-4 text-fg-muted">{channel.line}</span>
              <span className="block text-pretty text-[11.5px] leading-4 text-fg-subtle">{channel.note}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
