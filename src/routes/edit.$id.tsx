import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppState } from "../AppStateContext";
import { EditPlanPage } from "../pages/EditPlanPage";
import type { PlanInput } from "../types/Plan";

export const Route = createFileRoute("/edit/$id")({
  component: EditRoute,
});

function EditRoute() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const {
    banks,
    brokerageAccounts,
    plans,
    isLoading,
    updateRecurringPlan,
  } = useAppState();
  const plan = isLoading ? undefined : plans.find((item) => item.id === id) ?? null;

  async function handleSubmit(input: PlanInput) {
    await updateRecurringPlan(id, input);
    await navigate({ to: "/plans" });
  }

  return (
    <EditPlanPage
      plan={plan}
      banks={banks}
      brokerageAccounts={brokerageAccounts}
      onSubmit={handleSubmit}
    />
  );
}
