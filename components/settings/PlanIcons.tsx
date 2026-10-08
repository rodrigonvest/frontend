import type { ReactNode } from "react";

type IconProps = { size?: number; stroke?: number; className?: string };

function Svg({ size = 18, stroke = 1.8, className, children }: IconProps & { children: ReactNode }) {
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

export function CrownIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="m2.600 7.400 4.700 4.100L12 4.200l4.700 7.300 4.700-4.100-1.800 11.100a1 1 0 0 1-1 .8H5.400a1 1 0 0 1-1-.8L2.600 7.400Z" />
      <rect x="5" y="20.200" width="14" height="1.800" rx=".9" />
    </svg>
  );
}

export function CalendarIcon({ size = 24, stroke = 1.7 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <rect x="3.500" y="5" width="17" height="15.500" rx="2.500" />
      <path d="M3.500 10h17M8 3v4M16 3v4" />
      <rect x="7.500" y="13" width="3" height="3" rx=".6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function CreditCardIcon({ size = 26, stroke = 1.7 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <rect x="2.500" y="5" width="19" height="14" rx="2.500" />
      <path d="M2.500 10h19M6.500 15h4" />
    </Svg>
  );
}

export function ReceiptIcon({ size = 17, stroke = 1.8 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M14 3H7.500A2.500 2.500 0 0 0 5 5.500v13A2.500 2.500 0 0 0 7.500 21h9a2.500 2.500 0 0 0 2.500-2.500V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Svg>
  );
}

export function PercentIcon({ size = 28, stroke = 1.9 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M19 5 5 19" />
      <circle cx="7.500" cy="7.500" r="2.500" />
      <circle cx="16.500" cy="16.500" r="2.500" />
    </Svg>
  );
}

export function TicketIcon({ size = 17, stroke = 1.8 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3Z" />
      <path d="M13 5v2.500M13 10.800v2.400M13 16.500V19" />
    </Svg>
  );
}

export function GiftIcon({ size = 26, stroke = 1.8 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M20 12v8.500a.5.5 0 0 1-.5.500h-15a.5.5 0 0 1-.5-.5V12M2.500 7.500h19V12h-19zM12 21V7.500" />
      <path d="M12 7.500H7.800a2.400 2.400 0 1 1 0-4.800C10.800 2.700 12 7.500 12 7.500Zm0 0h4.200a2.400 2.400 0 1 0 0-4.800C13.200 2.700 12 7.500 12 7.500Z" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 18, stroke = 2 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="m9 5.500 6.500 6.500L9 18.500" />
    </Svg>
  );
}

export function LayersIcon({ size = 34, stroke = 1.7 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="m12 3 9 4.800-9 4.800-9-4.800L12 3Z" />
      <path d="m3 12.200 9 4.800 9-4.800M3 16.600l9 4.800 9-4.800" />
    </Svg>
  );
}

export function PlaneIcon({ size = 28, stroke = 1.7 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M21.500 3.200 2.800 10.400a.9.9 0 0 0 0 1.700l5 1.800 1.900 6.200a.9.9 0 0 0 1.500.4l2.700-2.600 4.800 3.600a.9.9 0 0 0 1.400-.5l3.200-15.600a.9.9 0 0 0-1.800-.2Z" fill="currentColor" fillOpacity=".25" />
      <path d="m8 13.800 11.500-8.500-8.700 10.700" />
    </Svg>
  );
}

export function StarIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="m12 2.800 2.800 5.900 6.400.9-4.700 4.500 1.200 6.400L12 17.400l-5.700 3.100 1.200-6.400L2.800 9.600l6.400-.9L12 2.800Z" />
    </svg>
  );
}

export function BuildingIcon({ size = 28, stroke = 1.7 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M15 9.500h3a1 1 0 0 1 1 1V21M3 21h18" />
      <path d="M9 7h2M9 11h2M9 15h2M17 14h.01M17 17.500h.01" />
    </Svg>
  );
}

export function CheckBullet({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="m7.200 12.400 3.200 3.200 6.400-6.600" fill="none" stroke="#06111d" strokeWidth="2.600" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckMark({ size = 16, stroke = 2.6, className }: IconProps) {
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
      <path d="m5 12.500 4.500 4.500L19 7" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 15, stroke = 2 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M4.500 12h15M13.500 6l6 6-6 6" />
    </Svg>
  );
}

export function TableIcon({ size = 30, stroke = 1.7 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <rect x="3" y="4" width="18" height="16" rx="2.500" />
      <path d="M3 9.500h18M3 14.500h18M9.500 9.500V20" />
    </Svg>
  );
}

export function ListChecksIcon({ size = 15, stroke = 1.9 }: IconProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="m3.500 6.500 1.800 1.800L8.500 5M3.500 12.500l1.800 1.800 3.200-3.300M3.500 18.500l1.800 1.800 3.200-3.300M12.500 7h8M12.500 13h8M12.500 19h8" />
    </Svg>
  );
}

export function MastercardMark() {
  return (
    <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden>
      <circle cx="9" cy="8" r="7" fill="#eb001b" />
      <circle cx="17" cy="8" r="7" fill="#f79e1b" fillOpacity=".95" />
      <path d="M13 2.400a7 7 0 0 1 0 11.200 7 7 0 0 1 0-11.200Z" fill="#ff5f00" />
    </svg>
  );
}
