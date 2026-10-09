"use client";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import SystemLogo from "../systems/SystemLogo";
import { Button } from "../UI";
import {
  LEVERAGE_OPTIONS,
  PLATFORMS,
  money,
  signedMoney,
  signedPct,
  type MultiAccount,
  type PlatformKey,
} from "../../lib/multi-account-demo";
import { ModalFrame, NumberBox, Switch, fieldClass } from "./MaPrimitives";

function Field({ label, htmlFor, children, hint }: { label: string; htmlFor?: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-fg-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[12px] text-fg-subtle">{hint}</p>}
    </div>
  );
}

export function AccountFormModal({
  account,
  onSave,
  onClose,
}: {
  account: MultiAccount | null;
  onSave: (account: MultiAccount) => void;
  onClose: () => void;
}) {
  const baseId = useId();
  const editing = account !== null;
  const [name, setName] = useState(account?.name ?? "");
  const [number, setNumber] = useState(account?.number.replace("#", "") ?? "");
  const [platform, setPlatform] = useState<PlatformKey>(account?.platform ?? "mt5");
  const [type, setType] = useState(account?.type ?? "");
  const [balance, setBalance] = useState(account?.balance ?? 10000);
  const [leverage, setLeverage] = useState(account?.leverage ?? "1:100");
  const [risk, setRisk] = useState(account?.risk ?? 1);
  const [active, setActive] = useState(account?.active ?? true);
  const [error, setError] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !number.trim()) {
      setError("Informe o nome e o número da conta.");
      return;
    }
    if (risk <= 0 || risk > 10) {
      setError("O risco por operação deve estar entre 0.1% e 10%.");
      return;
    }
    const base: MultiAccount = account ?? {
      id: `acc-${Date.now()}`,
      name: "",
      number: "",
      platform,
      type: "",
      balance,
      equity: balance,
      leverage,
      risk,
      active,
      pnlToday: 0,
      pnlTodayPct: 0,
      pnlTotal: 0,
      pnlTotalPct: 0,
      trades: 0,
    };
    onSave({
      ...base,
      name: name.trim(),
      number: `#${number.trim().replace(/^#/, "")}`,
      platform,
      type: type.trim() || "Live",
      balance: editing ? base.balance : balance,
      leverage,
      risk,
      active,
    });
  };

  return (
    <ModalFrame
      title={editing ? "Editar conta" : "Adicionar conta"}
      description={editing ? "Ajuste a configuração e o risco desta conta." : "Conecte uma nova conta ao Multi-Conta Avançado."}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" form={`${baseId}-form`}>
            {editing ? "Salvar alterações" : "Adicionar conta"}
          </Button>
        </>
      }
    >
      <form id={`${baseId}-form`} onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
        <Field label="Nome da conta" htmlFor={`${baseId}-name`}>
          <input id={`${baseId}-name`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Prop Firm 50K" className={fieldClass} />
        </Field>
        <Field label="Número da conta" htmlFor={`${baseId}-number`}>
          <input id={`${baseId}-number`} value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Ex.: 7845213" inputMode="numeric" className={fieldClass} />
        </Field>
        <Field label="Plataforma" htmlFor={`${baseId}-platform`}>
          <div className="flex items-center gap-2.5">
            <SystemLogo logo={PLATFORMS[platform].logo} size={36} />
            <select id={`${baseId}-platform`} value={platform} onChange={(e) => setPlatform(e.target.value as PlatformKey)} className={fieldClass}>
              {(Object.keys(PLATFORMS) as PlatformKey[]).map((key) => (
                <option key={key} value={key}>
                  {PLATFORMS[key].label}
                </option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="Corretora / Tipo" htmlFor={`${baseId}-type`}>
          <input id={`${baseId}-type`} value={type} onChange={(e) => setType(e.target.value)} placeholder="Ex.: Pepperstone, Live, Simulação" className={fieldClass} />
        </Field>
        {!editing && (
          <Field label="Saldo inicial (USD)">
            <NumberBox label="Saldo inicial" value={balance} onChange={setBalance} max={100000000} className="h-10 w-full" />
          </Field>
        )}
        <Field label="Alavancagem" htmlFor={`${baseId}-leverage`}>
          <select id={`${baseId}-leverage`} value={leverage} onChange={(e) => setLeverage(e.target.value)} className={fieldClass}>
            {LEVERAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Risco por operação" hint="Entre 0.1% e 10% do saldo.">
          <NumberBox label="Risco por operação" value={risk} onChange={setRisk} max={10} suffix="%" className="h-10 w-full" />
        </Field>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-canvas/50 px-3.5 py-2.5 sm:col-span-2">
          <div>
            <div className="text-[13px] font-medium text-fg">Conta ativa</div>
            <div className="text-[12px] text-fg-subtle">Contas inativas não recebem novas operações.</div>
          </div>
          <Switch checked={active} onChange={setActive} label="Conta ativa" />
        </div>
        {error && (
          <p role="alert" className="text-[13px] text-danger sm:col-span-2">
            {error}
          </p>
        )}
      </form>
    </ModalFrame>
  );
}

export function AccountStatsModal({ account, onClose }: { account: MultiAccount; onClose: () => void }) {
  const platform = PLATFORMS[account.platform];
  const winRate = 58 + (account.trades % 17);
  const bars = Array.from({ length: 7 }, (_, index) => {
    const seed = (account.trades * (index + 3) * 37) % 100;
    return (seed - 38) / 38;
  });
  const maxBar = Math.max(...bars.map((value) => Math.abs(value)), 0.1);

  const tiles: { label: string; value: string; tone?: string }[] = [
    { label: "Saldo", value: money(account.balance) },
    { label: "Equidade", value: money(account.equity) },
    { label: "P&L (Hoje)", value: `${signedMoney(account.pnlToday)} (${signedPct(account.pnlTodayPct)})`, tone: account.pnlToday < 0 ? "text-danger" : "text-success" },
    { label: "P&L (Total)", value: `${signedMoney(account.pnlTotal)} (${signedPct(account.pnlTotalPct)})`, tone: account.pnlTotal < 0 ? "text-danger" : "text-success" },
    { label: "Operações", value: String(account.trades) },
    { label: "Win rate", value: `${winRate.toFixed(1)}%` },
  ];

  return (
    <ModalFrame
      title={`Desempenho — ${account.name}`}
      description={`${platform.label} · ${account.type} · ${account.number}`}
      onClose={onClose}
      footer={
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-lg border border-line bg-canvas/50 px-3.5 py-3">
            <div className="text-[12px] text-fg-subtle">{tile.label}</div>
            <div className={`tabular mt-1 text-[16px] font-semibold ${tile.tone ?? "text-fg"}`}>{tile.value}</div>
          </div>
        ))}
      </div>
      <section aria-label="P&L dos últimos 7 dias" className="mt-4 rounded-lg border border-line bg-canvas/50 p-3.5">
        <h3 className="text-[13px] font-semibold text-fg">P&amp;L dos últimos 7 dias</h3>
        <div className="mt-3 flex h-24 items-center gap-2">
          {bars.map((value, index) => (
            <div key={index} className="flex h-full flex-1 flex-col justify-center">
              <div className="flex h-1/2 items-end">
                {value >= 0 && <div className="w-full rounded-t-sm bg-success" style={{ height: `${(value / maxBar) * 100}%` }} />}
              </div>
              <div className="flex h-1/2 items-start">
                {value < 0 && <div className="w-full rounded-b-sm bg-danger" style={{ height: `${(Math.abs(value) / maxBar) * 100}%` }} />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </ModalFrame>
  );
}

export function ConfirmModal({
  title,
  message,
  confirmLabel = "Excluir",
  onConfirm,
  onClose,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <ModalFrame
      title={title}
      size="sm"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-danger text-white hover:bg-danger/85" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-[14px] leading-6 text-fg-muted">{message}</p>
    </ModalFrame>
  );
}
