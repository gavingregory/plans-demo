import { getFromLabel, getToLabel } from "../planLabels";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { PlanInput } from "../types/Plan";

function currencyFormatter(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PlanSummary({
  plan,
  banks,
  brokerageAccounts,
}: {
  plan: PlanInput;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
}) {
  const planForLabels = { ...plan, id: "pending-plan" };

  return (
    <dl data-testid="plan-summary" className="plan-summary">
      <div data-testid="plan-summary-from">
        <dt>From</dt>
        <dd>{getFromLabel(planForLabels, banks, brokerageAccounts)}</dd>
      </div>
      <div data-testid="plan-summary-to">
        <dt>To</dt>
        <dd>{getToLabel(planForLabels, brokerageAccounts)}</dd>
      </div>
      <div data-testid="plan-summary-frequency">
        <dt>Frequency</dt>
        <dd>{plan.frequency}</dd>
      </div>
      <div data-testid="plan-summary-amount">
        <dt>Amount</dt>
        <dd>{currencyFormatter(plan.amount)}</dd>
      </div>
    </dl>
  );
}
