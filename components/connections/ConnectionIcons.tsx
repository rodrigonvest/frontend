import SettingsIcon from "../settings/SettingsIcons";
import type { ConnectionBrowser, ConnectionCountry, ConnectionEvent, ConnectionOs } from "../../lib/connections-demo";

export function Flag({ country }: { country: ConnectionCountry }) {
  if (country === "us") {
    return (
      <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden className="shrink-0 rounded-[2px]">
        <rect width="20" height="14" fill="#f2f6fa" />
        {[0, 2, 4, 6, 8, 10, 12].map((y) => (
          <rect key={y} y={y} width="20" height="1.08" fill="#d9304a" />
        ))}
        <rect width="9" height="7.5" fill="#2a4a9e" />
      </svg>
    );
  }
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden className="shrink-0 rounded-[2px]">
      <rect width="20" height="14" fill="#1a9d4a" />
      <path d="M10 1.8 18 7l-8 5.2L2 7l8-5.2Z" fill="#f5d52e" />
      <circle cx="10" cy="7" r="3" fill="#2a4a9e" />
    </svg>
  );
}

export function BrowserLogo({ browser, size = 16 }: { browser: ConnectionBrowser; size?: number }) {
  if (browser === "chrome") {
    return (
      <span
        aria-hidden
        className="relative inline-flex shrink-0 items-center justify-center rounded-full"
        style={{ width: size, height: size, background: "conic-gradient(#ea4335 0 33.3%, #fbbc05 33.3% 66.6%, #34a853 66.6% 100%)" }}
      >
        <span className="rounded-full bg-[#4285f4] ring-[1.5px] ring-white" style={{ width: size * 0.38, height: size * 0.38 }} />
      </span>
    );
  }
  if (browser === "edge") {
    return (
      <span
        aria-hidden
        className="relative inline-flex shrink-0 items-center justify-center rounded-full"
        style={{ width: size, height: size, background: "linear-gradient(135deg,#1f7bd8 0%,#2cc6a0 100%)" }}
      >
        <span className="rounded-full bg-[#0a1b2b]/60" style={{ width: size * 0.4, height: size * 0.4 }} />
      </span>
    );
  }
  if (browser === "copytrix") {
    return (
      <svg width={size} height={size} viewBox="0 0 27 27" fill="none" aria-hidden className="shrink-0 text-brand">
        <path d="M22.6 9.2a9.8 9.8 0 1 1-4.1-4.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="m8 13.8 3.2 3.2L22.7 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <span aria-hidden className="shrink-0 text-fg-muted">
      <SettingsIcon name="info" size={size} />
    </span>
  );
}

export function OsIcon({ os, size = 16 }: { os: ConnectionOs; size?: number }) {
  return (
    <span aria-hidden className="shrink-0 text-fg-muted">
      <SettingsIcon name={os === "Android" ? "phone" : "monitor"} size={size} />
    </span>
  );
}

const eventTones: Record<ConnectionEvent, { icon: string; tone: string }> = {
  Login: { icon: "user", tone: "text-[#1bd0a6]" },
  "Falha de Login": { icon: "xCircle", tone: "text-danger" },
  Logout: { icon: "logout", tone: "text-fg-muted" },
  "2FA": { icon: "lock", tone: "text-warning" },
};

export function EventIcon({ event, size = 16 }: { event: ConnectionEvent; size?: number }) {
  const { icon, tone } = eventTones[event];
  if (icon === "xCircle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={`shrink-0 ${tone}`}>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="m8.5 8.5 7 7m0-7-7 7" stroke="#06111d" strokeWidth={2.4} strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <span aria-hidden className={`shrink-0 ${tone}`}>
      <SettingsIcon name={icon as "user"} size={size} />
    </span>
  );
}
