import { Icon } from "../Icons";
import { cx } from "../UI";
import { INVOICES, PAYMENT_METHOD, type Invoice } from "../../lib/billing-data";
import { PixMark } from "./BillingIcons";
import { FOCUS_RING, SectionHeader, SmallActionButton, SURFACE } from "./BillingPrimitives";

export function PaymentMethodCard({ onChange }: { onChange: () => void }) {
  return (
    <section aria-labelledby="payment-title" className={cx(SURFACE, "flex flex-col gap-4 p-4 sm:p-5")}>
      <SectionHeader id="payment-title" title="Método de Pagamento" action={<SmallActionButton onClick={onChange}>Alterar</SmallActionButton>} />
      <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas/35 p-3">
        <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-[#32bcad]">
          <PixMark size={34} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-semibold text-fg">{PAYMENT_METHOD.name}</p>
          <p className="truncate text-[13px] text-fg-muted">{PAYMENT_METHOD.maskedEmail}</p>
        </div>
        <span className="shrink-0 rounded-md border border-success/60 bg-success/5 px-3 py-1 text-[12.5px] font-semibold text-success">
          {PAYMENT_METHOD.badge}
        </span>
      </div>
    </section>
  );
}

const headCell = "px-3! pb-2.5! pt-0 text-left text-[12.5px]! font-medium text-fg-muted!";
const bodyCell = "border-t! border-line! px-3! py-2.5! text-[13.5px]! text-fg!";

export function InvoiceHistoryCard({ onViewAll, onDownload }: { onViewAll: () => void; onDownload: (invoice: Invoice) => void }) {
  return (
    <section aria-labelledby="invoices-title" className={cx(SURFACE, "flex flex-col gap-4 p-4 sm:p-5")}>
      <SectionHeader
        id="invoices-title"
        title="Histórico de Cobranças"
        icon={<Icon name="clipboard" size={22} />}
        action={<SmallActionButton onClick={onViewAll}>Ver todas</SmallActionButton>}
      />
      <div role="region" tabIndex={0} aria-label="Tabela do histórico de cobranças" className={cx("-mx-1 overflow-x-auto px-1", FOCUS_RING)}>
        <table className="tabular w-full min-w-[340px] border-collapse text-left">
          <caption className="sr-only">Últimas cobranças do plano Pro</caption>
          <thead>
            <tr>
              <th scope="col" className={headCell}>Data</th>
              <th scope="col" className={headCell}>Valor</th>
              <th scope="col" className={headCell}>Status</th>
              <th scope="col" className={cx(headCell, "text-right!")}>Fatura</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((invoice) => (
              <tr key={invoice.id}>
                <td className={bodyCell}>{invoice.date}</td>
                <td className={bodyCell}>{invoice.amount}</td>
                <td className={bodyCell}>
                  <span className="inline-flex rounded-md border border-success/40 bg-success-soft px-2.5 py-0.5 text-[12px]! font-semibold text-success">
                    {invoice.status}
                  </span>
                </td>
                <td className={cx(bodyCell, "text-right")}>
                  <button
                    type="button"
                    onClick={() => onDownload(invoice)}
                    aria-label={`Baixar fatura de ${invoice.date}`}
                    className={cx("inline-flex size-8 items-center justify-center rounded-md text-brand transition-colors hover:bg-brand/15", FOCUS_RING)}
                  >
                    <Icon name="download" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
