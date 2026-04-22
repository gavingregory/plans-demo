import { Link } from "@tanstack/react-router";
import { PlanForm } from "../components/PlanForm";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { Plan, PlanInput } from "../types/Plan";

export function EditPlanPage({
  plan,
  banks,
  brokerageAccounts,
  onSubmit,
}: {
  plan: Plan | null | undefined;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
  onSubmit: (input: PlanInput) => void;
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
          <p className="eyebrow">Recurring investment</p>
          <h1>Edit plan</h1>
        </div>
      </header>
      <PlanForm
        plan={plan}
        banks={banks}
        brokerageAccounts={brokerageAccounts}
        onSubmit={onSubmit}
      />
    </main>
  );
}
