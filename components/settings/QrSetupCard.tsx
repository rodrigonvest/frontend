"use client";
import { recoveryCodesDemo, secretKeyDemo } from "../../lib/security-demo";
import SettingsIcon from "./SettingsIcons";
import { SettingsCard } from "./SettingsFields";
import { CopyButton, outlineButtonClass } from "./SecurityFields";
import { cx } from "../UI";

const SIZE = 29;

function buildQrPath() {
  let seed = 20260610;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const finderOrigins: Array<[number, number]> = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ];
  const inFinderZone = (x: number, y: number) => finderOrigins.some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7);
  const finderDark = (x: number, y: number) =>
    finderOrigins.some(([fx, fy]) => {
      const dx = x - fx;
      const dy = y - fy;
      if (dx < 0 || dx > 6 || dy < 0 || dy > 6) return false;
      const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
      return ring !== 2;
    });

  let d = "";
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const dark = inFinderZone(x, y) ? finderDark(x, y) : random() > 0.5;
      if (dark) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

const qrPath = buildQrPath();

function QrPlaceholder() {
  return (
    <svg
      viewBox={`-2 -2 ${SIZE + 4} ${SIZE + 4}`}
      role="img"
      aria-label="QR Code de configuração (demonstrativo)"
      shapeRendering="crispEdges"
      className="size-full rounded-lg bg-white"
    >
      <path d={qrPath} fill="#0b1220" />
    </svg>
  );
}

export default function QrSetupCard() {
  return (
    <SettingsCard icon="qr" title="QR Code de Configuração" description="Escaneie o QR Code abaixo com seu aplicativo autenticador.">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="size-[178px] shrink-0 self-center sm:self-start">
          <QrPlaceholder />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="rounded-lg border border-line bg-canvas/40 p-3">
            <p className="text-[13px] leading-4 text-fg">Código manual (se não puder escanear)</p>
            <div className="mt-2 flex items-center gap-2">
              <input
                readOnly
                value={secretKeyDemo}
                aria-label="Chave secreta manual"
                className="tabular h-10 min-w-0 flex-1 rounded-lg border border-line-strong/50 bg-canvas/60 px-3 text-[14px] tracking-wider text-fg outline-none focus-visible:border-brand"
              />
              <CopyButton value={secretKeyDemo} label="Copiar chave secreta" className="!size-10" />
            </div>
          </div>
          <div role="note" className="flex items-start gap-3 rounded-lg border border-brand/30 bg-brand/10 px-3.5 py-3">
            <span aria-hidden className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-strong text-white">
              <SettingsIcon name="info" size={15} stroke={2.2} />
            </span>
            <div>
              <p className="text-[14px] font-semibold leading-5 text-fg">Importante</p>
              <p className="mt-0.5 text-[12.5px] leading-[18px] text-fg-muted">
                Guarde sua chave secreta em um local seguro. Ela será necessária caso precise reconfigurar o 2FA.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center text-brand">
            <SettingsIcon name="wrench" size={24} stroke={1.8} />
          </span>
          <div>
            <h3 className="text-[16px] font-semibold leading-6 text-fg">Códigos de Recuperação</h3>
            <p className="mt-0.5 text-[12.5px] leading-[18px] text-fg-muted">
              Guarde estes códigos em um local seguro. Eles podem ser usados para recuperar o acesso à sua conta caso perca o acesso ao seu autenticador.
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-1 flex-wrap items-stretch gap-3 rounded-lg border border-line bg-canvas/40 px-4 py-3">
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6">
            {recoveryCodesDemo.map((column, i) => (
              <ul key={i} className="flex flex-col justify-between gap-1.5">
                {column.map((code) => (
                  <li key={code} className="tabular font-mono text-[13.5px] leading-5 tracking-wide text-fg">
                    {code}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="flex flex-col items-end justify-between gap-3">
            <CopyButton value={recoveryCodesDemo.flat().join("\n")} label="Copiar códigos de recuperação" />
            <button type="button" className={cx(outlineButtonClass, "h-8 !px-3 !text-[12px]")}>
              <SettingsIcon name="refresh" size={14} stroke={2} />
              Gerar Novos Códigos
            </button>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
