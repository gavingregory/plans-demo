import { PlanForm } from "../components/PlanForm";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { PlanInput } from "../types/Plan";

export function CreatePlanPage({
  banks,
  brokerageAccounts,
  onSubmit,
  initialInput,
}: {
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
  onSubmit: (input: PlanInput) => void;
  initialInput?: PlanInput | null;
}) {
  return (
    <main className="page-shell page-shell--narrow">
      <header className="page-header">
        <div>
          <p className="eyebrow">New recurring investment</p>
          <h1>Create plan</h1>
        </div>
      </header>
      <PlanForm
        banks={banks}
        brokerageAccounts={brokerageAccounts}
        initialInput={initialInput}
        onSubmit={onSubmit}
      />
    </main>
  );
}
