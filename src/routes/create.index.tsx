import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppState } from "../AppStateContext";
import { CreatePlanPage } from "../pages/CreatePlanPage";
import type { PlanInput } from "../types/Plan";

export const Route = createFileRoute("/create/")({
  component: CreateIndexRoute,
});

function CreateIndexRoute() {
  const navigate = useNavigate();
  const { banks, brokerageAccounts, pendingPlan, setPendingPlan, isLoading } =
    useAppState();

  async function handleSubmit(input: PlanInput) {
    setPendingPlan(input);
    await navigate({ to: "/create/review" });
  }

  if (isLoading) {
    return (
      <main className="page-shell page-shell--narrow">
        <div className="empty-state">
          <h1>Loading form</h1>
        </div>
      </main>
    );
  }

  return (
    <CreatePlanPage
      banks={banks}
      brokerageAccounts={brokerageAccounts}
      initialInput={pendingPlan}
      onSubmit={handleSubmit}
    />
  );
}
