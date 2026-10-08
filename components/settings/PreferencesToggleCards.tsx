"use client";
import { NotificationCard, ToggleRow } from "./NotificationFields";
import { Check } from "../channels/config/fields";
import { CandlesIcon, DisplayIcon, GearIcon } from "./PreferencesIcons";
import {
  displayFlagsLeft,
  displayFlagsRight,
  operationFlagsLeft,
  operationFlagsRight,
  otherFlagsLeft,
  otherFlagsRight,
  type FlagItem,
  type PreferenceFlagKey,
  type PreferencesValues,
} from "../../lib/preferences-demo";

type FlagCardProps = {
  values: PreferencesValues;
  onToggle: (key: PreferenceFlagKey, next: boolean) => void;
};

function SwitchColumn({ items, values, onToggle, spacing }: FlagCardProps & { items: FlagItem[]; spacing: string }) {
  return (
    <div className={`flex min-w-0 flex-col ${spacing}`}>
      {items.map((item) => (
        <ToggleRow key={item.key} checked={values[item.key]} onChange={(next) => onToggle(item.key, next)} title={item.title} description={item.description} />
      ))}
    </div>
  );
}

function CheckColumn({ items, values, onToggle }: FlagCardProps & { items: FlagItem[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      {items.map((item) => (
        <Check key={item.key} checked={values[item.key]} onChange={(next) => onToggle(item.key, next)}>
          {item.title}
        </Check>
      ))}
    </div>
  );
}

export function OperationCard(props: FlagCardProps) {
  return (
    <NotificationCard icon={<CandlesIcon size={32} />} title="Preferências de Operação" description="Defina comportamentos padrão para operações e exibição.">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3.5 md:grid-cols-2">
        <SwitchColumn {...props} items={operationFlagsLeft} spacing="gap-3.5" />
        <SwitchColumn {...props} items={operationFlagsRight} spacing="gap-3.5" />
      </div>
    </NotificationCard>
  );
}

export function DisplayCard(props: FlagCardProps) {
  return (
    <NotificationCard icon={<DisplayIcon size={32} />} title="Preferências de Exibição" description="Ajuste como as informações são exibidas na plataforma.">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
        <CheckColumn {...props} items={displayFlagsLeft} />
        <CheckColumn {...props} items={displayFlagsRight} />
      </div>
    </NotificationCard>
  );
}

export function OtherCard(props: FlagCardProps) {
  return (
    <NotificationCard icon={<GearIcon size={32} />} title="Outras Preferências" description="Ajustes adicionais da plataforma.">
      <div className="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
        <SwitchColumn {...props} items={otherFlagsLeft} spacing="gap-3.5" />
        <SwitchColumn {...props} items={otherFlagsRight} spacing="gap-3.5" />
      </div>
    </NotificationCard>
  );
}
