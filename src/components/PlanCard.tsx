import { Link } from "@tanstack/react-router";
import { getFromLabel, getToLabel } from "../planLabels";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { Plan } from "../types/Plan";

function currencyFormatter(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PlanCard({
  plan,
  banks,
  brokerageAccounts,
}: {
  plan: Plan;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
}) {
  return (
    <article className="plan-card" data-testid="plan-card">
      <div className="plan-card__header">
        <div>
          <p className="eyebrow" data-testid="plan-card-frequency">
            {plan.frequency}
          </p>
          <h2 data-testid="plan-card-amount">
            {currencyFormatter(plan.amount)}
          </h2>
        </div>
        <div className="plan-card__actions" aria-label="Plan actions">
          <Link to="/edit/$id" params={{ id: plan.id }}>
            Edit
          </Link>
          <Link to="/delete/$id" params={{ id: plan.id }}>
            Delete
          </Link>
        </div>
      </div>

      <dl data-testid="plan-card-details" className="plan-card__details">
        <div data-testid="plan-card-from">
          <dt>From</dt>
          <dd>{getFromLabel(plan, banks, brokerageAccounts)}</dd>
        </div>
        <div data-testid="plan-card-to">
          <dt>To</dt>
          <dd>{getToLabel(plan, brokerageAccounts)}</dd>
        </div>
      </dl>
    </article>
  );
}
