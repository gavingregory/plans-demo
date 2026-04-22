import { Link } from "@tanstack/react-router";
import { PlanCard } from "../components/PlanCard";
import { getFromLabel, getToLabel } from "../planLabels";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { Plan } from "../types/Plan";

export function DeletePlanPage({
  plan,
  banks,
  brokerageAccounts,
  onDelete,
}: {
  plan: Plan | null | undefined;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
  onDelete: () => void;
}) {
  if (plan === undefined) {
    return (
      <main className="page-shell page-shell--narrow">
        <div className="empty-state">
          <h1>Loading plan</h1>
        </div>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="page-shell page-shell--narrow">
        <div className="empty-state">
          <h1>Plan not found</h1>
          <Link className="button" to="/plans">
            Back to plans
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell page-shell--narrow">
      <header className="page-header">
        <div>
          <p className="eyebrow">Confirm deletion</p>
          <h1>Delete plan</h1>
        </div>
      </header>

      <section className="confirm-panel">
        <p>
          Delete the {plan.frequency.toLowerCase()} ${plan.amount} plan from{" "}
          {getFromLabel(plan, banks, brokerageAccounts)} to{" "}
          {getToLabel(plan, brokerageAccounts)}?
        </p>
        <PlanCard
          plan={plan}
          banks={banks}
          brokerageAccounts={brokerageAccounts}
        />
        <div className="form-actions">
          <Link className="button button--secondary" to="/plans">
            Back
          </Link>
          <button className="button--danger" type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </section>
    </main>
  );
}
