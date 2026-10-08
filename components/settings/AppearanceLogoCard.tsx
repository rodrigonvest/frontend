"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { NotificationCard, NotificationToggle, TextInputField } from "./NotificationFields";
import { BrandMark, ImageIcon, SparkleIcon } from "./AppearanceIcons";

export type LogoIdentity = {
  platformName: string;
  tagline: string;
  showTagline: boolean;
};

export default function LogoCard({ value, onChange }: { value: LogoIdentity; onChange: (next: LogoIdentity) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUrl(URL.createObjectURL(file));
  };

  return (
    <NotificationCard icon={<ImageIcon />} title="Logo e Identidade" description="Personalize o logo e a identidade visual da plataforma.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex min-h-[178px] min-w-0 flex-col items-center justify-center rounded-xl border border-dashed border-brand/45 bg-canvas/40 px-4 py-5 text-center transition-colors hover:border-brand hover:bg-brand/[.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Logo personalizado da plataforma" className="max-h-[64px] max-w-full object-contain" />
          ) : (
            <span className="flex max-w-full items-center gap-3 text-brand">
              <BrandMark size={50} />
              <span className="min-w-0 text-left">
                <span className="block truncate text-[34px] font-bold leading-none tracking-tight text-fg">{value.platformName || "Copytrix"}</span>
                <span className="mt-1.5 block truncate text-[10.5px] font-semibold uppercase tracking-[0.22em] text-brand">{value.tagline || "Telegram to Results"}</span>
              </span>
            </span>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-[13px] text-fg">
            <SparkleIcon size={16} />
            Clique para alterar o logo
          </span>
          <span className="mt-1.5 text-[12px] text-fg-muted">PNG ou SVG (recomendado 200x50px)</span>
        </button>
        <input ref={fileRef} type="file" accept="image/png,image/svg+xml" onChange={onFile} className="sr-only" tabIndex={-1} aria-label="Enviar logo da plataforma" />

        <div className="flex min-w-0 flex-col gap-3.5 pt-0.5">
          <TextInputField label="Nome da Plataforma" value={value.platformName} onChange={(platformName) => onChange({ ...value, platformName })} />
          <TextInputField label="Tagline" value={value.tagline} onChange={(tagline) => onChange({ ...value, tagline })} />
          <div className="flex items-center gap-3 pt-0.5">
            <NotificationToggle checked={value.showTagline} onChange={(showTagline) => onChange({ ...value, showTagline })} label="Mostrar tagline no menu" />
            <span className="text-[13px] leading-5 text-fg">Mostrar tagline no menu</span>
          </div>
        </div>
      </div>
    </NotificationCard>
  );
}
