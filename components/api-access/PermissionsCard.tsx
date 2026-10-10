"use client";
import { useId } from "react";
import { Icon } from "../Icons";
import { PrimaryButton } from "../copytrix-ai/AiPrimitives";
import { PERMISSIONS_LEFT, PERMISSIONS_RIGHT, type ApiPermission } from "../../lib/api-access-data";
import { ApiCard } from "./ApiPrimitives";
import { useApiAccess } from "./ApiAccessContext";

function PermissionItem({ permission }: { permission: ApiPermission }) {
  const { permissions, togglePermission } = useApiAccess();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  return (
    <li>
      <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/[.03]">
        <span className="relative mt-0.5 flex size-5 shrink-0">
          <input
            type="checkbox"
            checked={permissions[permission.id] ?? false}
            onChange={() => togglePermission(permission.id)}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="peer absolute inset-0 size-5 cursor-pointer appearance-none rounded border border-line-strong bg-canvas transition-colors checked:border-brand-strong checked:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 hidden items-center justify-center text-white peer-checked:flex">
            <Icon name="check" size={13} stroke={3} />
          </span>
        </span>
        <span className="min-w-0">
          <span id={titleId} className="block text-[14px] font-medium text-fg">
            {permission.title} <span className="font-normal text-fg-subtle">({permission.scope})</span>
          </span>
          <span id={descriptionId} className="mt-0.5 block text-[12.5px] leading-5 text-fg-muted">
            {permission.description}
          </span>
        </span>
      </label>
    </li>
  );
}

export default function PermissionsCard() {
  const { savePermissions } = useApiAccess();

  return (
    <ApiCard
      title="Permissões da API Key"
      icon="lock"
      accent="blue"
      description="Defina quais recursos sua aplicação pode acessar."
      action={
        <PrimaryButton onClick={savePermissions} className="h-10">
          <Icon name="save" size={16} />
          Salvar Permissões
        </PrimaryButton>
      }
    >
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="sr-only">Permissões da API Key</legend>
        <div className="grid gap-x-8 gap-y-1 lg:grid-cols-2">
          <ul className="flex flex-col gap-1">
            {PERMISSIONS_LEFT.map((permission) => (
              <PermissionItem key={permission.id} permission={permission} />
            ))}
          </ul>
          <ul className="flex flex-col gap-1">
            {PERMISSIONS_RIGHT.map((permission) => (
              <PermissionItem key={permission.id} permission={permission} />
            ))}
          </ul>
        </div>
      </fieldset>
    </ApiCard>
  );
}
