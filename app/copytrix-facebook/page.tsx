"use client";

import { useRef, useState } from "react";
import CoverCanvas, { COVER_HEIGHT, COVER_WIDTH, drawCover } from "../../components/copytrix-facebook/CoverCanvas";

export default function CopytrixFacebookPage() {
  const [safeArea, setSafeArea] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const download = async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas"); canvas.width = COVER_WIDTH; canvas.height = COVER_HEIGHT;
    const logo = new Image(); logo.src = "/copytrix-logo.png"; await new Promise<void>((resolve) => { logo.onload = () => resolve(); });
    drawCover(canvas, logo);
    const link = document.createElement("a"); link.download = "copytrix-facebook-cover-1640.png"; link.href = canvas.toDataURL("image/png"); link.click(); setDownloading(false);
  };
  return <main className="min-h-screen bg-[#030b15] text-[#eef7ff]"><header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 lg:px-8"><div><p className="text-[11px] font-semibold uppercase tracking-[.28em] text-cyan-300">Copytrix Studio</p><h1 className="mt-2 text-2xl font-semibold tracking-[-.03em]">Capa de Facebook</h1></div><a href="/" className="rounded-full border border-[#244d6b] px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-400 hover:text-white">Voltar ao site</a></header><section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8"><div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="max-w-xl text-sm leading-6 text-slate-400">Composição premium para Facebook Cover usando o logo oficial do Copytrix.</p><div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300"><span className="rounded-full border border-[#20415a] bg-[#0a1c2d] px-3 py-1.5">PNG</span><span className="rounded-full border border-[#20415a] bg-[#0a1c2d] px-3 py-1.5">1640 × 856</span><span className="rounded-full border border-[#20415a] bg-[#0a1c2d] px-3 py-1.5">Logo oficial</span></div></div><div className="flex items-center gap-3"><label className="flex cursor-pointer items-center gap-2 text-xs text-slate-400"><input type="checkbox" checked={safeArea} onChange={(e) => setSafeArea(e.target.checked)} className="size-4 accent-cyan-400" /> Safe area</label><button onClick={download} disabled={downloading} className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-[#03101c] shadow-[0_0_28px_rgba(34,211,238,.22)] transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-70">{downloading ? "Preparando PNG…" : "Download PNG"}</button></div></div><CoverCanvas showSafeArea={safeArea} /><p className="mt-4 text-xs text-slate-500">A safe area é apenas uma orientação visual e não é incorporada ao PNG baixado.</p></section></main>;
}
