import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppState } from "../AppStateContext";
import { ReviewPlanPage } from "../pages/ReviewPlanPage";

export const Route = createFileRoute("/create/review")({
  component: ReviewRoute,
});

function generateConfirmationNumber() {
  return String(Math.floor(10000000 + Math.random() * 90000000));
}

function ReviewRoute() {
  const navigate = useNavigate();
  const {
    banks,
    brokerageAccounts,
    pendingPlan,
    createRecurringPlan,
    setPendingPlan,
    setConfirmation,
  } = useAppState();

  async function handleCreate() {
    if (!pendingPlan) {
      return;
    }

    await createRecurringPlan(pendingPlan);
    setConfirmation({
      plan: pendingPlan,
      number: generateConfirmationNumber(),
    });
    setPendingPlan(null);
    await navigate({ to: "/create/confirmation" });
  }

  return (
    <ReviewPlanPage
      plan={pendingPlan}
      banks={banks}
      brokerageAccounts={brokerageAccounts}
      onCreate={handleCreate}
    />
  );
}
