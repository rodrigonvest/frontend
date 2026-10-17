import { Icon } from "../Icons";
import { cx } from "../UI";
import type { NotificationKind } from "../../lib/notification-center-demo";

type VisualTone = "telegram" | "green" | "blue" | "purple" | "red" | "gold";

const toneClasses: Record<VisualTone, string> = {
  telegram: "bg-[#229ed9] text-white",
  green: "bg-success/15 text-success",
  blue: "bg-brand/20 text-brand",
  purple: "bg-[#2a1f5c] text-[#a78bfa]",
  red: "bg-danger/15 text-danger",
  gold: "bg-warning/20 text-warning",
};

const kindVisual: Record<NotificationKind, { icon: string; tone: VisualTone }> = {
  signal: { icon: "telegram", tone: "telegram" },
  order: { icon: "trendUp", tone: "green" },
  takeProfit: { icon: "target", tone: "green" },
  report: { icon: "analytics", tone: "purple" },
  stopLoss: { icon: "alert", tone: "red" },
  account: { icon: "box", tone: "gold" },
  system: { icon: "layers", tone: "blue" },
  update: { icon: "code", tone: "purple" },
  risk: { icon: "shieldCheck", tone: "green" },
  login: { icon: "accounts", tone: "blue" },
};

export default function NotificationVisual({ kind, size = "md" }: { kind: NotificationKind; size?: "md" | "lg" }) {
  const visual = kindVisual[kind];
  return (
    <span
      aria-hidden
      className={cx(
        "flex shrink-0 items-center justify-center",
        size === "lg" ? "size-12 rounded-xl" : "size-11 rounded-lg",
        toneClasses[visual.tone],
      )}
    >
      <Icon name={visual.icon} size={size === "lg" ? 26 : 23} stroke={1.9} />
    </span>
  );
}
