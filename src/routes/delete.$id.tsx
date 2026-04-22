import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppState } from "../AppStateContext";
import { DeletePlanPage } from "../pages/DeletePlanPage";

export const Route = createFileRoute("/delete/$id")({
  component: DeleteRoute,
});

function DeleteRoute() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const {
    banks,
    brokerageAccounts,
    plans,
    isLoading,
    deleteRecurringPlan,
  } = useAppState();
  const plan = isLoading ? undefined : plans.find((item) => item.id === id) ?? null;

  async function handleDelete() {
    await deleteRecurringPlan(id);
    await navigate({ to: "/plans" });
  }

  return (
    <DeletePlanPage
      plan={plan}
      banks={banks}
      brokerageAccounts={brokerageAccounts}
      onDelete={handleDelete}
    />
  );
}
