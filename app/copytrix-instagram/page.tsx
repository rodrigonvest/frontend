"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 1536;
const LOGO_SRC = "/brand/copytrix-logo.png";

function drawBackground(ctx: CanvasRenderingContext2D) {
  const center = SIZE / 2;
  const background = ctx.createRadialGradient(center, center * 0.84, 80, center, center, SIZE * 0.72);
  background.addColorStop(0, "#071936");
  background.addColorStop(0.5, "#041128");
  background.addColorStop(1, "#010816");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, SIZE, SIZE);

  const glow = ctx.createRadialGradient(center, center, 40, center, center, 690);
  glow.addColorStop(0, "rgba(0, 153, 255, .14)");
  glow.addColorStop(0.56, "rgba(0, 70, 180, .07)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "#159bff";
  ctx.lineWidth = 1;
  for (let i = 0; i <= SIZE; i += 72) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(SIZE, i);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = "#1179e9";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 1050);
  ctx.bezierCurveTo(250, 920, 370, 1090, 600, 950);
  ctx.bezierCurveTo(850, 800, 950, 890, 1190, 630);
  ctx.bezierCurveTo(1340, 470, 1440, 510, SIZE, 390);
  ctx.stroke();
  ctx.restore();

  const candles = [
    [116, 742, 70, 210, "#0878dd"], [218, 650, 74, 290, "#08b8e8"],
    [324, 770, 68, 174, "#176ee2"], [1132, 610, 70, 260, "#075fd0"],
    [1242, 490, 76, 330, "#0b93ea"], [1342, 640, 64, 225, "#0a58c4"],
  ] as const;
  ctx.save();
  ctx.globalAlpha = 0.25;
  for (const [x, y, width, height, color] of candles) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.fillRect(x + width / 2 - 3, y - 52, 6, height + 100);
  }
  ctx.restore();

  ctx.save();
  ctx.shadowColor = "#078dff";
  ctx.shadowBlur = 34;
  ctx.strokeStyle = "#1aaaff";
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.arc(center, center, 650, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = "#385eff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(center, center, 675, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export default function CopytrixInstagramPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = SIZE;
    canvas.height = SIZE;
    drawBackground(ctx);

    const logo = new Image();
    logo.crossOrigin = "anonymous";
    logo.onload = () => {
      const maxWidth = 1080;
      const scale = maxWidth / logo.naturalWidth;
      const width = logo.naturalWidth * scale;
      const height = logo.naturalHeight * scale;
      const x = (SIZE - width) / 2;
      const y = (SIZE - height) / 2 + 14;
      ctx.save();
      ctx.shadowColor = "rgba(0, 128, 255, .22)";
      ctx.shadowBlur = 24;
      ctx.drawImage(logo, x, y, width, height);
      ctx.restore();
      setReady(true);
    };
    logo.src = LOGO_SRC;
  }, []);

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    setDownloading(true);
    const link = document.createElement("a");
    link.download = "copytrix-instagram-1536.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    window.setTimeout(() => setDownloading(false), 700);
  }

  return (
    <main className="min-h-screen bg-[#010816] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Copytrix Studio</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Foto de perfil para Instagram</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Composição premium 1536×1536 com a logo oficial preservada como asset original.</p>
          </div>
          <button
            type="button"
            onClick={downloadPng}
            disabled={!ready || downloading}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 text-sm font-semibold shadow-[0_0_28px_rgba(0,133,255,.3)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {downloading ? "Preparando PNG…" : "Download PNG"}
          </button>
        </header>

        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-3xl border border-sky-400/20 bg-[#020b1b] p-3 shadow-[0_0_70px_rgba(0,99,255,.16)] sm:p-5">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
              <canvas ref={canvasRef} className="block h-full w-full" aria-label="Arte promocional do Copytrix para perfil do Instagram" />
              {!ready && <div className="absolute inset-0 grid place-items-center text-sm text-slate-400">Carregando composição…</div>}
            </div>
            <div className="pointer-events-none absolute inset-8 rounded-full border border-dashed border-cyan-300/20 sm:inset-12" aria-hidden />
          </div>

          <aside className="rounded-2xl border border-sky-400/15 bg-[#06142c]/80 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Instagram-safe</div>
            <p className="mt-3 text-sm leading-6 text-slate-400">A linha pontilhada indica a área circular segura. A logo e o texto permanecem centralizados para funcionar também em thumbnail.</p>
            <dl className="mt-5 space-y-3 border-t border-sky-400/10 pt-4 text-xs">
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Formato</dt><dd className="font-medium text-slate-200">PNG</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Dimensão</dt><dd className="font-medium text-slate-200">1536 × 1536</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Logo</dt><dd className="font-medium text-slate-200">Asset oficial</dd></div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
