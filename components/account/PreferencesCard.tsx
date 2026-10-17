import { useId } from "react";
import { PREFERENCE_FIELDS, type PreferenceId, type Preferences } from "../../lib/account-data";
import { FOCUS_RING, SmallActionButton } from "../billing/BillingPrimitives";
import { cx } from "../UI";
import { AccountIcon } from "./AccountIcons";
import { AccountCard } from "./AccountPrimitives";

export default function PreferencesCard({
  values,
  onChange,
  onEdit,
}: {
  values: Preferences;
  onChange: (id: PreferenceId, value: string) => void;
  onEdit: () => void;
}) {
  const baseId = useId();
  return (
    <AccountCard
      id="account-preferences-title"
      title="Preferências"
      action={<SmallActionButton onClick={onEdit}>Editar</SmallActionButton>}
    >
      <div className="flex flex-col gap-3">
        {PREFERENCE_FIELDS.map((field) => {
          const selectId = `${baseId}-${field.id}`;
          return (
            <div key={field.id} className="grid items-center gap-1.5 @md:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] @md:gap-4">
              <label htmlFor={selectId} className="flex items-center gap-3 text-[13.5px] text-fg-muted">
                <span aria-hidden className="text-fg-muted">
                  <AccountIcon name={field.icon} size={19} />
                </span>
                {field.label}
              </label>
              <div className="relative">
                <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
                  <AccountIcon name={field.icon} size={17} />
                </span>
                <select
                  id={selectId}
                  value={values[field.id]}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  className={cx(
                    "h-11 w-full cursor-pointer appearance-none rounded-lg border border-line-strong bg-surface-2 pl-10 pr-10 text-[13.5px] text-fg transition-colors hover:border-brand/50",
                    FOCUS_RING,
                  )}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
                  <AccountIcon name="chevronDown" size={16} stroke={2} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AccountCard>
  );
}
