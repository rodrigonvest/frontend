"use client";
import { useState } from "react";
import { apiPermissionsDemo } from "../../lib/api-demo";
import { SettingsCard, SwitchRow } from "./SettingsFields";

export default function ApiPermissionsCard() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(apiPermissionsDemo.map((item) => [item.id, item.enabled])));

  return (
    <SettingsCard icon="shield" title="Permissões da API" description="Defina quais recursos sua chave de API poderá acessar.">
      <div className="flex flex-col divide-y divide-line/70">
        {apiPermissionsDemo.map((item) => (
          <div key={item.id} className="py-2 first:pt-0 last:pb-0">
            <SwitchRow
              checked={enabled[item.id]}
              onChange={(next) => setEnabled((current) => ({ ...current, [item.id]: next }))}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}
