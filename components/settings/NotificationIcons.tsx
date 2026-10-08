import type { ReactNode } from "react";
import { Icon } from "../Icons";
import { cx } from "../UI";
import SettingsIcon from "./SettingsIcons";
import type { NotificationEventIconId } from "../../lib/notifications-demo";

type SvgProps = { size?: number; stroke?: number; className?: string };

function Svg({ size = 18, stroke = 1.8, className, children }: SvgProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.2v13.6a.9.9 0 0 0 1.4.7l10.2-6.8a.9.9 0 0 0 0-1.5L9.400 4.500A.9.9 0 0 0 8 5.200Z" />
    </svg>
  );
}

export function FlaskIcon({ size = 28, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M9 3h6M10 3v6.200L4.600 18.400A2 2 0 0 0 6.300 21.400h11.400a2 2 0 0 0 1.700-3L14 9.200V3" />
      <path d="M7.500 15h9" />
    </Svg>
  );
}

export function LinkIcon({ size = 16, stroke = 1.9 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1" />
    </Svg>
  );
}

export function BookIcon({ size = 16, stroke = 1.9 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M12 6.500C10.500 5.300 8.400 4.800 4 5v13c4.400-.2 6.500.3 8 1.500 1.500-1.200 3.600-1.700 8-1.500V5c-4.400-.2-6.500.3-8 1.500Z" />
      <path d="M12 6.500v13" />
    </Svg>
  );
}

export function CheckCircleIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size} stroke={2}>
      <circle cx="12" cy="12" r="9.500" />
      <path d="m7.800 12.300 2.900 2.900 5.600-5.800" />
    </Svg>
  );
}

export function TelegramLogo() {
  return (
    <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#229ed9] text-white shadow-[0_0_14px_rgba(34,158,217,.35)]">
      <Icon name="telegram" size={24} />
    </span>
  );
}

export function MailLogo() {
  return (
    <span aria-hidden className="flex size-11 shrink-0 items-center justify-center text-brand">
      <Svg size={42} stroke={1.5}>
        <rect x="2.500" y="5" width="19" height="14" rx="2.500" fill="currentColor" fillOpacity=".22" />
        <path d="m3 7 9 6.500L21 7" />
      </Svg>
    </span>
  );
}

export function BellLogo({ size = 40 }: { size?: number }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center text-[#f0495c]" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.800a1.400 1.400 0 0 1 1.400 1.400v.6A6.200 6.200 0 0 1 18 10.800v3.300l1.700 2.600c.4.700-.1 1.500-.9 1.500H5.200c-.8 0-1.300-.8-.9-1.500L6 14.100v-3.300a6.200 6.200 0 0 1 4.600-6v-.6A1.400 1.400 0 0 1 12 2.800Z" />
        <path d="M9.600 19.500h4.800a2.400 2.400 0 0 1-4.800 0Z" />
      </svg>
    </span>
  );
}

export function WebhookLogo() {
  return (
    <span aria-hidden className="flex size-11 shrink-0 items-center justify-center text-brand">
      <Svg size={42} stroke={2}>
        <circle cx="12" cy="5.500" r="2.500" />
        <circle cx="5.500" cy="17.500" r="2.500" />
        <circle cx="18.500" cy="17.500" r="2.500" />
        <path d="m10.800 7.700-3.800 7.600M13.200 7.700l3.800 7.600M8 17.500h8" />
      </Svg>
    </span>
  );
}

function Disc({ tone, children }: { tone: "success" | "danger"; children: ReactNode }) {
  return (
    <span className={cx("flex size-[22px] items-center justify-center rounded-full", tone === "success" ? "bg-success text-[#052b22]" : "bg-danger text-white")}>{children}</span>
  );
}

export function EventIcon({ id }: { id: NotificationEventIconId }) {
  let node: ReactNode;
  switch (id) {
    case "open":
      node = (
        <Disc tone="success">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 4.800v14.400a.8.8 0 0 0 1.200.7l11-7.200a.8.8 0 0 0 0-1.400l-11-7.200A.8.8 0 0 0 8 4.800Z" />
          </svg>
        </Disc>
      );
      break;
    case "closed":
      node = (
        <Disc tone="success">
          <Icon name="check" size={13} stroke={3.2} />
        </Disc>
      );
      break;
    case "takeProfit":
      node = (
        <span className="text-brand">
          <Icon name="barsFilled" size={22} />
        </span>
      );
      break;
    case "stopLoss":
      node = (
        <Disc tone="danger">
          <span className="text-[8px] font-bold leading-none">SL</span>
        </Disc>
      );
      break;
    case "breakEven":
      node = (
        <span className="text-brand">
          <Icon name="refresh" size={21} stroke={2} />
        </span>
      );
      break;
    case "systemStart":
      node = (
        <span className="text-brand">
          <SettingsIcon name="settings" size={22} stroke={2} />
        </span>
      );
      break;
    case "systemStop":
      node = (
        <Disc tone="danger">
          <span className="size-[8px] rounded-[1.5px] bg-white" />
        </Disc>
      );
      break;
    case "connection":
      node = (
        <span className="text-brand">
          <LinkIcon size={22} stroke={2} />
        </span>
      );
      break;
    default:
      node = (
        <span className="text-warning">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 3.200c.5 0 1 .3 1.300.8l8 14c.6 1-.1 2.200-1.300 2.200H4c-1.200 0-1.900-1.200-1.300-2.200l8-14c.3-.5.800-.8 1.300-.8Z" />
            <path d="M12 9.500v4.800M12 17.300h.01" stroke="#392c13" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </span>
      );
  }
  return (
    <span aria-hidden className="flex size-6 shrink-0 items-center justify-center">
      {node}
    </span>
  );
}
