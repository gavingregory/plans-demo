import { createFileRoute } from "@tanstack/react-router";
import { PlansPage } from "../pages/PlansPage";
import { useAppState } from "../AppStateContext";

export const Route = createFileRoute("/plans")({
  component: PlansRoute,
});

function PlansRoute() {
  const { banks, brokerageAccounts, plans, isLoading } = useAppState();

  if (isLoading) {
    return (
      <main className="page-shell">
        <div className="empty-state">
          <h1>Loading plans</h1>
        </div>
      </main>
    );
  }

  return (
    <PlansPage
      plans={plans}
      banks={banks}
      brokerageAccounts={brokerageAccounts}
    />
  );
}
