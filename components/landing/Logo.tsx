export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 shadow-[0_0_28px_-6px_rgba(30,150,255,.8)] ${big ? "size-12" : "size-10"}`}>
        <svg width={big ? 30 : 26} height={big ? 30 : 26} viewBox="0 0 27 27" fill="none" aria-hidden>
          <path d="M22.6 9.2a9.8 9.8 0 1 1-4.1-4.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="m8 13.8 3.2 3.2L22.7 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0 text-left">
        <span className={`block font-extrabold leading-none tracking-tight text-white ${big ? "text-3xl" : "text-2xl"}`}>Copytrix</span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-400">Telegram to Results</span>
      </span>
    </span>
  );
}
