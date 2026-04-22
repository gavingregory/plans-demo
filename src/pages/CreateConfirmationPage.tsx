import { Link } from "@tanstack/react-router";
import { PlanSummary } from "../components/PlanSummary";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { PlanInput } from "../types/Plan";

export function CreateConfirmationPage({
  confirmation,
  banks,
  brokerageAccounts,
}: {
  confirmation: { plan: PlanInput; number: string } | null;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
}) {
  if (!confirmation) {
    return (
      <main className="page-shell page-shell--narrow">
        <div className="empty-state">
          <h1>No confirmation available</h1>
          <Link className="button" to="/plans">
            Back to plans
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell page-shell--narrow">
      <div className="confirmation-banner">
        Confirmation #{confirmation.number}
      </div>
      <header className="page-header">
        <div>
          <p className="eyebrow">Recurring investment created</p>
          <h1>Plan confirmed</h1>
        </div>
      </header>

      <section className="confirm-panel">
        <PlanSummary
          plan={confirmation.plan}
          banks={banks}
          brokerageAccounts={brokerageAccounts}
        />
        <div className="form-actions">
          <Link className="button" to="/plans">
            Back to plans
          </Link>
        </div>
      </section>
    </main>
  );
}
