import type { ReactNode } from "react";

type SvgProps = { size?: number; stroke?: number };

function Svg({ size = 28, stroke = 1.7, children }: SvgProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

export function GlobeIcon({ size = 30, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <circle cx="12" cy="12" r="9.500" />
      <path d="M2.500 12h19" />
      <path d="M12 2.500c2.600 2.600 4 5.900 4 9.500s-1.400 6.900-4 9.500c-2.600-2.600-4-5.900-4-9.500s1.400-6.900 4-9.500Z" />
    </Svg>
  );
}

export function ClockIcon({ size = 30 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 6.500V12l3.600 2.200" fill="none" stroke="#06111d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CandlesIcon({ size = 30 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="2.500" y="8" width="4" height="9" rx="1" />
      <rect x="10" y="4.500" width="4" height="9" rx="1" />
      <rect x="17.500" y="10" width="4" height="8" rx="1" />
      <path d="M4.500 4v4M4.500 17v3M12 1.500v3M12 13.500v5M19.500 6.500v3.500M19.500 18v2.500" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" />
    </svg>
  );
}

export function BarsIcon({ size = 30 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="3" y="13" width="4.500" height="8" rx="1" />
      <rect x="9.800" y="8" width="4.500" height="13" rx="1" />
      <rect x="16.500" y="3" width="4.500" height="18" rx="1" />
    </svg>
  );
}

export function DisplayIcon({ size = 30, stroke = 1.7 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <rect x="2.500" y="3.500" width="19" height="13" rx="2" />
      <path d="M8.500 20.500h7M12 16.500v4" />
      <path d="M7 11.500l3-3 2.500 2.500 4-4" />
    </Svg>
  );
}

export function GearIcon({ size = 30 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10.400 2.500h3.200l.5 2.400c.5.200 1 .5 1.500.8l2.300-.8 1.600 2.800-1.800 1.600c.1.600.1 1.100 0 1.700l1.800 1.600-1.600 2.800-2.300-.8c-.5.300-1 .6-1.500.8l-.5 2.400h-3.200l-.5-2.400c-.5-.2-1-.5-1.500-.8l-2.300.8-1.600-2.800 1.800-1.600a6 6 0 0 1 0-1.700L4.500 7.700l1.600-2.800 2.300.8c.5-.3 1-.6 1.500-.8l.5-2.400ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        transform="translate(0 2.500) scale(1 .96)"
      />
    </svg>
  );
}

export function ResetIcon({ size = 18, stroke = 1.9 }: SvgProps) {
  return (
    <Svg size={size} stroke={stroke}>
      <path d="M3.500 12a8.500 8.500 0 1 0 2.600-6.100" />
      <path d="M3.500 4.500v4h4" />
    </Svg>
  );
}
