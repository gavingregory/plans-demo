import { Link } from "@tanstack/react-router";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { Plan } from "../types/Plan";
import { PlanCard } from "../components/PlanCard";

export function PlansPage({
  plans,
  banks,
  brokerageAccounts,
}: {
  plans: Plan[];
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
}) {
  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Recurring investments</p>
          <h1>Plans</h1>
        </div>
        <Link className="button" to="/create">
          Create plan
        </Link>
      </header>

      <section className="plan-grid" aria-label="Investment plans">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            banks={banks}
            brokerageAccounts={brokerageAccounts}
          />
        ))}
      </section>
    </main>
  );
}
