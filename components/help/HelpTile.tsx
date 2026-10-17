import type { HelpAccent } from "../../lib/help-data";
import { Icon } from "../Icons";
import { cx } from "../UI";
import { DiscordIcon, MailIcon, PaperclipIcon, PlayIcon } from "./HelpIcons";

const ACCENTS: Record<HelpAccent, string> = {
  blue: "border-brand/40 bg-brand/15 text-brand",
  purple: "border-[#9b63ff]/40 bg-[#9b63ff]/15 text-[#a77bff]",
  green: "border-success/40 bg-success/15 text-success",
  amber: "border-warning/40 bg-warning/15 text-warning",
  red: "border-danger/40 bg-danger/15 text-danger",
};

export function HelpGlyph({ name, size = 20 }: { name: string; size?: number }) {
  switch (name) {
    case "play":
      return <PlayIcon size={size} />;
    case "mail":
      return <MailIcon size={size} />;
    case "discord":
      return <DiscordIcon size={size} />;
    case "paperclip":
      return <PaperclipIcon size={size} />;
    default:
      return <Icon name={name} size={size} />;
  }
}

export function HelpTile({ name, accent, size = 20, className }: { name: string; accent: HelpAccent; size?: number; className?: string }) {
  return (
    <span aria-hidden className={cx("flex shrink-0 items-center justify-center rounded-xl border", ACCENTS[accent], className)}>
      <HelpGlyph name={name} size={size} />
    </span>
  );
}
