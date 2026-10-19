"use client";

import { useEffect, useRef, useState } from "react";

export const COVER_WIDTH = 1640;
export const COVER_HEIGHT = 856;

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function line(ctx: CanvasRenderingContext2D, points: [number, number][], color: string, width = 2, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore();
}

function drawCandle(ctx: CanvasRenderingContext2D, x: number, y: number, high: number, low: number, open: number, close: number, up: boolean) {
  const color = up ? "#10d6a2" : "#ff6374";
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 7, y + high); ctx.lineTo(x + 7, y + low); ctx.stroke();
  ctx.fillStyle = color; ctx.fillRect(x, y + Math.min(open, close), 14, Math.max(8, Math.abs(close - open)));
}

function drawDashboard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save(); ctx.shadowColor = "rgba(0, 197, 255, .28)"; ctx.shadowBlur = 36;
  const gradient = ctx.createLinearGradient(x, y, x + w, y + h); gradient.addColorStop(0, "#132d45"); gradient.addColorStop(1, "#071725");
  roundedRect(ctx, x, y, w, h, 20); ctx.fillStyle = gradient; ctx.fill(); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#2c6f98"; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = "#071421"; roundedRect(ctx, x + 22, y + 22, w - 44, 40, 10); ctx.fill();
  ctx.fillStyle = "#19a7f3"; ctx.font = "bold 16px Arial"; ctx.fillText("COPYTRIX", x + 40, y + 47);
  ctx.fillStyle = "#b9ccdc"; ctx.font = "12px Arial"; ctx.fillText("Portfolio / Live execution", x + w - 205, y + 47);
  const cards = [["Equity", "$42,187.50", "+12.4%"], ["Win rate", "72.8%", "+3.1%"], ["Open trades", "18", "ACTIVE"]];
  cards.forEach(([label, value, note], i) => { const cx = x + 28 + i * ((w - 76) / 3); roundedRect(ctx, cx, y + 82, (w - 92) / 3, 78, 12); ctx.fillStyle = "#102b41"; ctx.fill(); ctx.fillStyle = "#86a3b9"; ctx.font = "11px Arial"; ctx.fillText(label, cx + 14, y + 104); ctx.fillStyle = "#f4f8fb"; ctx.font = "bold 20px Arial"; ctx.fillText(value, cx + 14, y + 132); ctx.fillStyle = "#13d7a0"; ctx.font = "11px Arial"; ctx.fillText(note, cx + 14, y + 149); });
  const chartX = x + 30, chartY = y + 188, chartW = w - 60, chartH = h - 220;
  ctx.strokeStyle = "rgba(119,174,210,.15)"; ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(chartX, chartY + i * chartH / 4); ctx.lineTo(chartX + chartW, chartY + i * chartH / 4); ctx.stroke(); }
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(chartX + i * chartW / 7, chartY); ctx.lineTo(chartX + i * chartW / 7, chartY + chartH); ctx.stroke(); }
  const points: [number, number][] = Array.from({ length: 18 }, (_, i) => [chartX + i * chartW / 17, chartY + chartH * (.75 - i * .028 - Math.sin(i * .8) * .08)]);
  line(ctx, points, "#15d6a5", 4); ctx.fillStyle = "rgba(21,214,165,.12)"; ctx.beginPath(); ctx.moveTo(chartX, chartY + chartH); points.forEach(([px, py]) => ctx.lineTo(px, py)); ctx.lineTo(chartX + chartW, chartY + chartH); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#b8cfdf"; ctx.font = "12px Arial"; ctx.fillText("Equity curve", chartX, chartY - 12);
  ctx.restore();
}

export function drawCover(canvas: HTMLCanvasElement, logo: HTMLImageElement) {
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  ctx.clearRect(0, 0, COVER_WIDTH, COVER_HEIGHT);
  const bg = ctx.createLinearGradient(0, 0, COVER_WIDTH, COVER_HEIGHT); bg.addColorStop(0, "#020914"); bg.addColorStop(.55, "#061b30"); bg.addColorStop(1, "#02070f"); ctx.fillStyle = bg; ctx.fillRect(0, 0, COVER_WIDTH, COVER_HEIGHT);
  const glow = ctx.createRadialGradient(1260, 130, 30, 1260, 130, 540); glow.addColorStop(0, "rgba(0,185,255,.34)"); glow.addColorStop(1, "rgba(0,55,115,0)"); ctx.fillStyle = glow; ctx.fillRect(700, -300, 940, 750);
  const leftGlow = ctx.createRadialGradient(300, 520, 0, 300, 520, 460); leftGlow.addColorStop(0, "rgba(0,121,255,.18)"); leftGlow.addColorStop(1, "rgba(0,121,255,0)"); ctx.fillStyle = leftGlow; ctx.fillRect(0, 130, 800, 726);
  ctx.strokeStyle = "rgba(59,154,206,.13)"; ctx.lineWidth = 1;
  for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(0, 430 + i * 26); ctx.lineTo(1640, 160 + i * 26); ctx.stroke(); }
  for (let i = 0; i < 22; i++) { ctx.beginPath(); ctx.moveTo(780 + i * 42, 0); ctx.lineTo(470 + i * 42, 856); ctx.stroke(); }
  // Atmospheric market candles behind the product.
  for (let i = 0; i < 28; i++) drawCandle(ctx, 770 + i * 25, 150 + Math.sin(i * 1.7) * 45, 20 + (i % 4) * 8, 90 + (i % 3) * 9, 46, i % 2 ? 29 : 69, i % 2 === 0);
  // Data streams visually connect signal to execution.
  const streams: [number, number][][] = [[[540, 610], [710, 520], [870, 560], [1000, 430], [1170, 440]], [[400, 700], [610, 690], [770, 620], [960, 655], [1180, 570]], [[1010, 760], [1130, 650], [1300, 620], [1480, 710]]];
  streams.forEach((stream, i) => { line(ctx, stream, i === 1 ? "#19d7c0" : "#169df5", i === 1 ? 3 : 2, .72); stream.forEach(([x, y]) => { ctx.fillStyle = i === 1 ? "#19d7c0" : "#169df5"; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill(); }); });
  // Official logo asset, untouched.
  ctx.save(); ctx.shadowColor = "rgba(12,159,255,.46)"; ctx.shadowBlur = 28; ctx.drawImage(logo, 74, 62, 580, 261.5); ctx.restore();
  drawDashboard(ctx, 690, 210, 650, 390);
  // Phone in foreground.
  ctx.save(); ctx.shadowColor = "rgba(0,0,0,.7)"; ctx.shadowBlur = 28; roundedRect(ctx, 1350, 178, 196, 452, 30); ctx.fillStyle = "#03080e"; ctx.fill(); ctx.strokeStyle = "#5a88a8"; ctx.lineWidth = 3; ctx.stroke(); ctx.shadowBlur = 0; roundedRect(ctx, 1365, 218, 166, 378, 16); ctx.fillStyle = "#0b2337"; ctx.fill(); ctx.fillStyle = "#18aaf5"; ctx.font = "bold 13px Arial"; ctx.fillText("COPYTRIX", 1381, 253); ["SIGNALS", "EXECUTION", "ACCOUNTS"].forEach((t, i) => { roundedRect(ctx, 1380, 285 + i * 76, 136, 57, 9); ctx.fillStyle = i === 1 ? "#104d57" : "#102f48"; ctx.fill(); ctx.fillStyle = "#d9eef8"; ctx.font = "bold 11px Arial"; ctx.fillText(t, 1392, 311 + i * 76); ctx.fillStyle = "#16d4a0"; ctx.fillRect(1392, 327 + i * 76, 70 + i * 13, 4); }); ctx.restore();
  // Foreground horizon / depth.
  const ground = ctx.createLinearGradient(0, 690, 0, 856); ground.addColorStop(0, "rgba(3,19,34,0)"); ground.addColorStop(1, "#01050b"); ctx.fillStyle = ground; ctx.fillRect(0, 650, COVER_WIDTH, 206);
  ctx.fillStyle = "rgba(16,77,119,.36)"; ctx.beginPath(); ctx.moveTo(0, 780); ctx.lineTo(230, 720); ctx.lineTo(420, 764); ctx.lineTo(610, 700); ctx.lineTo(790, 778); ctx.lineTo(1000, 726); ctx.lineTo(1200, 790); ctx.lineTo(1420, 724); ctx.lineTo(1640, 770); ctx.lineTo(1640, 856); ctx.lineTo(0, 856); ctx.closePath(); ctx.fill();
}

export default function CoverCanvas({ showSafeArea }: { showSafeArea: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null); const [ready, setReady] = useState(false);
  useEffect(() => { const canvas = ref.current; if (!canvas) return; canvas.width = COVER_WIDTH; canvas.height = COVER_HEIGHT; const logo = new Image(); logo.onload = () => { drawCover(canvas, logo); setReady(true); }; logo.src = "/copytrix-logo.png"; }, []);
  return <div className="relative w-full overflow-hidden rounded-2xl border border-[#204a68] bg-[#030914] shadow-[0_30px_80px_rgba(0,0,0,.45)]"><canvas ref={ref} className="block h-auto w-full" aria-label="Prévia da capa oficial do Facebook do Copytrix" />{showSafeArea && <div className="pointer-events-none absolute inset-[5.4%_8.5%] rounded border border-dashed border-cyan-300/70"><span className="absolute left-3 top-2 rounded bg-[#05192a]/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-cyan-200">Facebook safe area · preview</span></div>}{!ready && <div className="absolute inset-0 grid place-items-center bg-[#030914]/80 text-sm text-slate-300">Carregando composição…</div>}</div>;
}
