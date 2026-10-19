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
  base.addColorStop(0, "#010713");
  base.addColorStop(0.42, "#03172f");
  base.addColorStop(0.72, "#041025");
  base.addColorStop(1, "#01050d");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const leftGlow = ctx.createRadialGradient(250, 360, 0, 250, 360, 560);
  leftGlow.addColorStop(0, "rgba(0, 105, 255, .22)");
  leftGlow.addColorStop(0.58, "rgba(0, 52, 155, .08)");
  leftGlow.addColorStop(1, "transparent");
  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, 0, 820, HEIGHT);
  const rightGlow = ctx.createRadialGradient(1330, 280, 0, 1330, 280, 620);
  rightGlow.addColorStop(0, "rgba(22, 188, 255, .24)");
  rightGlow.addColorStop(0.52, "rgba(0, 75, 185, .1)");
  rightGlow.addColorStop(1, "transparent");
  ctx.fillStyle = rightGlow;
  ctx.fillRect(650, 0, 990, HEIGHT);

  ctx.save();
  ctx.globalAlpha = 0.11;
  ctx.strokeStyle = "#188dff";
  ctx.lineWidth = 1;
  for (let x = 0; x < WIDTH; x += 62) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, HEIGHT); ctx.stroke();
  }
  for (let y = 24; y < HEIGHT; y += 58) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(WIDTH, y); ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#20a7ef";
  ctx.lineWidth = 1;
  for (let i = 0; i < 7; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, 720 + i * 18);
    ctx.bezierCurveTo(250, 660 + i * 15, 430, 790 + i * 10, 700, 670 + i * 8);
    ctx.bezierCurveTo(940, 560 + i * 12, 1130, 660 + i * 10, WIDTH, 430 + i * 15);
    ctx.stroke();
  }
  ctx.restore();

  const candles = [
    [82, 482, 24, 128, "#128bde"], [128, 420, 22, 98, "#20c5df"], [174, 516, 24, 150, "#185bd1"],
    [230, 388, 22, 104, "#24b9d9"], [276, 448, 24, 142, "#1a70e2"],
    [1370, 80, 22, 102, "#1ac5df"], [1416, 54, 24, 164, "#1889ed"], [1468, 104, 22, 125, "#20ccb1"],
  ] as const;
  ctx.save();
  ctx.globalAlpha = 0.2;
  for (const [x, y, w, h, color] of candles) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillRect(x + w / 2 - 2, y - 32, 4, h + 64);
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = "#1187f0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, 650);
  ctx.bezierCurveTo(210, 580, 330, 720, 520, 610);
  ctx.bezierCurveTo(700, 508, 828, 610, 1005, 438);
  ctx.bezierCurveTo(1120, 324, 1260, 332, 1600, 106);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "#0f8fe9";
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i += 1) {
    const x = 800 + i * 76;
    ctx.beginPath(); ctx.moveTo(x, 770); ctx.lineTo(x + 76, 770 - (i % 4) * 24); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 76, 770 - (i % 4) * 24, 3, 0, Math.PI * 2); ctx.fillStyle = "#1abff1"; ctx.fill();
  }
  ctx.restore();

  // A restrained product dashboard in the right third of the cover.
  ctx.save();
  ctx.shadowColor = "rgba(0, 142, 255, .22)";
  ctx.shadowBlur = 26;
  ctx.fillStyle = "rgba(2, 13, 29, .9)";
  ctx.strokeStyle = "rgba(54, 174, 255, .62)";
  ctx.lineWidth = 2;
  roundRect(ctx, 850, 112, 590, 380, 22); ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(9, 30, 57, .95)";
  roundRect(ctx, 876, 138, 538, 54, 10); ctx.fill();
  ctx.fillStyle = "#42c9ff";
  ctx.fillRect(900, 161, 84, 7); ctx.fillRect(1020, 161, 94, 7); ctx.fillRect(1152, 161, 72, 7); ctx.fillRect(1260, 161, 82, 7);
  ctx.fillStyle = "rgba(8, 42, 77, .92)";
  roundRect(ctx, 876, 216, 346, 238, 12); ctx.fill();
  roundRect(ctx, 1244, 216, 170, 238, 12); ctx.fill();
  drawChart(ctx, 906, 252, 286, 154);
  ctx.strokeStyle = "rgba(26, 203, 169, .38)";
  ctx.beginPath(); ctx.moveTo(906, 410); ctx.lineTo(1192, 410); ctx.stroke();
  for (let i = 0; i < 7; i += 1) {
    ctx.fillStyle = i % 2 ? "#15c6a8" : "#268cff";
    ctx.fillRect(1270 + i * 17, 408 - (i % 4) * 24, 8, 28 + (i % 4) * 24);
  }
  for (let i = 0; i < 3; i += 1) {
    ctx.fillStyle = i === 1 ? "#19cfaa" : "rgba(126, 204, 255, .55)";
    roundRect(ctx, 1270, 252 + i * 48, 116, 25, 6); ctx.fill();
  }
  ctx.restore();

  // A slim mobile trading view creates a premium device pairing without crowding the mark.
  ctx.save();
  ctx.shadowColor = "rgba(0, 125, 255, .3)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "rgba(1, 10, 22, .96)";
  ctx.strokeStyle = "rgba(56, 185, 255, .72)";
  ctx.lineWidth = 2;
  roundRect(ctx, 1292, 438, 190, 312, 25); ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(11, 39, 68, .95)";
  roundRect(ctx, 1312, 486, 150, 74, 9); ctx.fill();
  roundRect(ctx, 1312, 579, 150, 74, 9); ctx.fill();
  roundRect(ctx, 1312, 672, 150, 47, 9); ctx.fill();
  ctx.fillStyle = "#22d8b5";
  ctx.fillRect(1332, 512, 60, 7); ctx.fillRect(1332, 605, 82, 7); ctx.fillRect(1332, 691, 52, 7);
  ctx.fillStyle = "#7ddcff";
  ctx.fillRect(1408, 512, 30, 7); ctx.fillRect(1428, 605, 18, 7);
  ctx.restore();

  // Fine circuit paths and nodes keep the technology layer subordinate to the logo.
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "#159fe7";
  ctx.lineWidth = 1;
  const paths = [[690, 190, 786, 190, 824, 228], [716, 308, 778, 308, 824, 266], [686, 535, 774, 535, 824, 472], [500, 760, 610, 760, 676, 694]] as const;
  for (const [x1, y1, x2, y2, x3, y3] of paths) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke();
    ctx.fillStyle = "#23c9e9"; ctx.beginPath(); ctx.arc(x3, y3, 4, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();

  const vignette = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 260, WIDTH / 2, HEIGHT / 2, 950);
  vignette.addColorStop(0.62, "transparent");
  vignette.addColorStop(1, "rgba(0, 3, 10, .68)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
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
