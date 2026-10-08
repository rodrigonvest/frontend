"use client";
import { useState } from "react";
import { Button } from "../UI";
import { passwordRules } from "../../lib/security-demo";
import SettingsIcon from "./SettingsIcons";
import { SettingsCard } from "./SettingsFields";
import { PasswordField } from "./SecurityFields";

export default function PasswordCard() {
  const [current, setCurrent] = useState("Copytrix26");
  const [next, setNext] = useState("Copytrix26");
  const [confirm, setConfirm] = useState("Copytrix26");

  return (
    <SettingsCard icon="lock" title="Senha da Conta" description="Mantenha sua senha segura e atualizada regularmente.">
      <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <PasswordField label="Senha Atual" value={current} onChange={setCurrent} autoComplete="current-password" />
          <PasswordField label="Nova Senha" value={next} onChange={setNext} autoComplete="new-password" />
          <PasswordField label="Confirmar Nova Senha" value={confirm} onChange={setConfirm} autoComplete="new-password" />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="rounded-lg border border-line bg-canvas/40 px-4 py-3.5">
            <p className="text-[13.5px] font-medium leading-5 text-fg">A senha deve conter:</p>
            <ul className="mt-2.5 flex flex-col gap-2">
              {passwordRules.map((rule) => (
                <li key={rule} className="flex items-center gap-2.5 text-[13px] leading-5 text-fg-muted">
                  <span aria-hidden className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-success text-canvas">
                    <SettingsIcon name="check" size={12} stroke={3} />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" className="!h-[44px] rounded-lg px-5 text-[14px] font-semibold">
              <SettingsIcon name="lock" size={17} />
              Atualizar Senha
            </Button>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
