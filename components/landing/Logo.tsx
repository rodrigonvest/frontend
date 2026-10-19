export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  const box = big ? 52 : 44;
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex shrink-0 items-center justify-center drop-shadow-[0_0_14px_rgba(30,150,255,.75)]" style={{ width: box, height: box }}>
        <svg width={box} height={box} viewBox="0 0 48 48" fill="none" aria-hidden>
          <defs>
            <linearGradient id="lp-logo-g" x1="6" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#22d3ff" />
              <stop offset=".55" stopColor="#2f7bff" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M24 2.6 41.2 12.5v19.9L24 42.3 6.8 32.4V12.5z" fill="#06142e" stroke="url(#lp-logo-g)" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M31.4 13.9A12.8 12.8 0 1 0 31.6 34" stroke="url(#lp-logo-g)" strokeWidth="5.2" strokeLinecap="round" />
          <path d="m17.2 24.4 4.6 4.6 10.4-11.4" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0 text-left">
        <span className={`block font-extrabold leading-none tracking-tight text-white ${big ? "text-3xl" : "text-2xl"}`}>Copytrix</span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-400">Telegram to Results</span>
      </span>
    </span>
  );
}
