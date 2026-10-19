"use client";

import { useEffect, useRef, useState } from "react";

const WIDTH = 1640;
const HEIGHT = 856;
const LOGO_SRC = "/brand/copytrix-logo.png";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawChart(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(72, 171, 255, .12)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x, y + (h / 5) * i);
    ctx.lineTo(x + w, y + (h / 5) * i);
    ctx.stroke();
  }
  const points = [0.74, 0.68, 0.71, 0.57, 0.62, 0.48, 0.52, 0.39, 0.43, 0.3, 0.34, 0.22, 0.26, 0.13];
  const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, "#21d9b4");
  gradient.addColorStop(1, "#1888ff");
  ctx.strokeStyle = gradient;
  ctx.shadowColor = "rgba(22, 164, 255, .8)";
  ctx.shadowBlur = 14;
  ctx.lineWidth = 4;
  ctx.beginPath();
  points.forEach((value, index) => {
    const px = x + (w / (points.length - 1)) * index;
    const py = y + h * value;
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();
  ctx.restore();
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const base = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  base.addColorStop(0, "#020c1b");
  base.addColorStop(0.48, "#03152c");
  base.addColorStop(1, "#010812");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const glow = ctx.createRadialGradient(1250, 210, 20, 1250, 210, 600);
  glow.addColorStop(0, "rgba(0, 151, 255, .3)");
  glow.addColorStop(0.42, "rgba(0, 68, 180, .11)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(700, 0, 940, 650);

  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = "#168fff";
  ctx.lineWidth = 1;
  for (let x = 0; x < WIDTH; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, HEIGHT); ctx.stroke();
  }
  for (let y = 0; y < HEIGHT; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(WIDTH, y); ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "#0b7ee8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 690);
  ctx.bezierCurveTo(240, 610, 360, 760, 610, 620);
  ctx.bezierCurveTo(820, 500, 990, 580, 1180, 355);
  ctx.bezierCurveTo(1320, 188, 1450, 200, WIDTH, 80);
  ctx.stroke();
  ctx.restore();

  const candles = [
    [116, 600, 26, 138, "#138de8"], [164, 540, 23, 106, "#20c8e9"], [215, 622, 24, 124, "#155ed0"],
    [1280, 380, 28, 142, "#0b6dde"], [1340, 290, 26, 220, "#0ba8ea"], [1400, 352, 26, 170, "#1c68d8"],
  ] as const;
  ctx.save();
  ctx.globalAlpha = 0.22;
  for (const [x, y, w, h, color] of candles) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(x + w / 2 - 2, y - 34, 4, h + 68);
  }
  ctx.restore();

  const globe = ctx.createRadialGradient(1300, 50, 40, 1300, 50, 360);
  globe.addColorStop(0, "rgba(34, 201, 255, .22)");
  globe.addColorStop(0.55, "rgba(15, 89, 213, .08)");
  globe.addColorStop(1, "transparent");
  ctx.fillStyle = globe;
  ctx.beginPath(); ctx.arc(1300, 50, 360, 0, Math.PI * 2); ctx.fill();

  ctx.save();
  ctx.strokeStyle = "rgba(36, 184, 255, .32)";
  ctx.lineWidth = 2;
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath(); ctx.ellipse(1300, 50, 330, 90 + i * 38, i * 0.18, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(3, 19, 41, .86)";
  ctx.strokeStyle = "rgba(52, 173, 255, .44)";
  ctx.lineWidth = 2;
  roundRect(ctx, 905, 102, 570, 390, 22); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "rgba(9, 35, 65, .9)";
  roundRect(ctx, 930, 132, 520, 72, 12); ctx.fill();
  ctx.fillStyle = "#e5f4ff";
  ctx.fillRect(956, 156, 75, 10); ctx.fillRect(1060, 156, 72, 10); ctx.fillRect(1162, 156, 72, 10); ctx.fillRect(1264, 156, 72, 10);
  ctx.fillStyle = "rgba(20, 71, 116, .7)";
  roundRect(ctx, 930, 226, 320, 228, 12); ctx.fill();
  roundRect(ctx, 1270, 226, 180, 228, 12); ctx.fill();
  drawChart(ctx, 958, 265, 265, 145);
  for (let i = 0; i < 6; i += 1) {
    ctx.fillStyle = i % 2 ? "#12caa5" : "#168dff";
    ctx.fillRect(1296 + i * 22, 405 - (i % 4) * 28, 10, 35 + (i % 4) * 28);
  }
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(2, 15, 32, .92)";
  ctx.strokeStyle = "rgba(63, 182, 255, .5)";
  ctx.lineWidth = 2;
  roundRect(ctx, 1220, 360, 260, 370, 30); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "rgba(15, 42, 72, .92)";
  roundRect(ctx, 1240, 405, 220, 58, 10); ctx.fill();
  roundRect(ctx, 1240, 480, 220, 58, 10); ctx.fill();
  roundRect(ctx, 1240, 555, 220, 58, 10); ctx.fill();
  ctx.fillStyle = "#28d8bd";
  ctx.fillRect(1262, 426, 80, 8); ctx.fillRect(1262, 501, 100, 8); ctx.fillRect(1262, 576, 72, 8);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = "#0f75d8";
  ctx.lineWidth = 2;
  for (let i = 0; i < 14; i += 1) {
    ctx.beginPath(); ctx.moveTo(i * 130, 812); ctx.lineTo(i * 130 + 90, 758 - (i % 3) * 20); ctx.stroke();
  }
  ctx.restore();
}

export default function CopytrixFacebookPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    drawBackground(ctx);

    const logo = new Image();
    logo.crossOrigin = "anonymous";
    logo.onload = () => {
      const maxWidth = 620;
      const scale = maxWidth / logo.naturalWidth;
      const width = logo.naturalWidth * scale;
      const height = logo.naturalHeight * scale;
      const x = 180;
      const y = 240;
      ctx.save();
      ctx.shadowColor = "rgba(0, 142, 255, .28)";
      ctx.shadowBlur = 30;
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
    link.download = "copytrix-facebook-cover-1640.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    window.setTimeout(() => setDownloading(false), 700);
  }

  return (
    <main className="min-h-screen bg-[#010812] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Copytrix Studio</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Capa de Facebook</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Composição horizontal premium para Facebook Cover, usando a logo oficial como asset original.</p>
          </div>
          <button type="button" onClick={downloadPng} disabled={!ready || downloading} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 text-sm font-semibold shadow-[0_0_28px_rgba(0,133,255,.3)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50">
            {downloading ? "Preparando PNG…" : "Download PNG"}
          </button>
        </header>

        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative mx-auto w-full overflow-hidden rounded-3xl border border-sky-400/20 bg-[#020b1b] p-3 shadow-[0_0_70px_rgba(0,99,255,.16)] sm:p-5">
            <div className="relative aspect-[1640/856] overflow-hidden rounded-2xl bg-black">
              <canvas ref={canvasRef} className="block h-full w-full" aria-label="Capa promocional do Copytrix para Facebook" />
              {!ready && <div className="absolute inset-0 grid place-items-center text-sm text-slate-400">Carregando composição…</div>}
              <div className="pointer-events-none absolute inset-[8%] rounded-xl border border-dashed border-cyan-300/25" aria-hidden />
            </div>
          </div>

          <aside className="rounded-2xl border border-sky-400/15 bg-[#06142c]/80 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Facebook-safe</div>
            <p className="mt-3 text-sm leading-6 text-slate-400">A linha pontilhada indica a área central segura para cortes e reposicionamentos em diferentes dispositivos.</p>
            <dl className="mt-5 space-y-3 border-t border-sky-400/10 pt-4 text-xs">
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Formato</dt><dd className="font-medium text-slate-200">PNG</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Dimensão</dt><dd className="font-medium text-slate-200">1640 × 856</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Logo</dt><dd className="font-medium text-slate-200">Asset oficial</dd></div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
