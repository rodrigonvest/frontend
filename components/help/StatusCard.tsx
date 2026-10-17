import { Icon } from "../Icons";
import { FOCUS_RING } from "../billing/BillingPrimitives";
import { cx } from "../UI";
import { HELP_IDS, SERVICES, type ServiceStatus } from "../../lib/help-data";
import { HelpSection, SectionLink } from "./HelpSection";

export default function StatusCard({
  onSelectService,
  onViewStatusPage,
}: {
  onSelectService: (service: ServiceStatus) => void;
  onViewStatusPage: () => void;
}) {
  return (
    <HelpSection
      id={HELP_IDS.status}
      title="Status dos Serviços"
      action={<SectionLink label="Ver página de status" hint="Ver página de status dos serviços" onClick={onViewStatusPage} />}
    >
      <ul className="mt-3 flex flex-col gap-1">
        {SERVICES.map((service) => (
          <li key={service.id}>
            <button
              type="button"
              onClick={() => onSelectService(service)}
              className={cx(
                "group flex min-h-10 w-full items-center gap-3 rounded-lg bg-white/[.03] px-3 py-2 text-left transition-colors hover:bg-white/[.06]",
                FOCUS_RING,
              )}
            >
              <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-success shadow-[0_0_10px_rgba(18,217,158,.8)]" />
              <span className="min-w-0 flex-1 text-[13.5px] leading-5 text-fg">{service.name}</span>
              <span className="shrink-0 text-[13px] font-medium text-success">Operacional</span>
              <span aria-hidden className="flex shrink-0 text-fg-subtle group-hover:text-fg">
                <Icon name="chevron" size={14} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </HelpSection>
  );
}
