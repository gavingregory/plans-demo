import { Link } from "@tanstack/react-router";
import { PlanSummary } from "../components/PlanSummary";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { PlanInput } from "../types/Plan";

export function ReviewPlanPage({
  plan,
  banks,
  brokerageAccounts,
  onCreate,
}: {
  plan: PlanInput | null;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
  onCreate: () => void;
}) {
  if (!plan) {
    return (
      <main className="page-shell page-shell--narrow">
        <div className="empty-state">
          <h1>No plan to review</h1>
          <Link className="button" to="/create">
            Back to create
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell page-shell--narrow">
      <header className="page-header">
        <div>
          <p className="eyebrow">Review recurring investment</p>
          <h1>Review plan</h1>
        </div>
      </header>

      <section className="confirm-panel">
        <PlanSummary
          plan={plan}
          banks={banks}
          brokerageAccounts={brokerageAccounts}
        />
        <div className="form-actions">
          <Link className="button button--secondary" to="/create">
            Back
          </Link>
          <button type="button" onClick={onCreate}>
            Create
          </button>
        </div>
      </section>
    </main>
  );
}
