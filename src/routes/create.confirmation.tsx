import { createFileRoute } from "@tanstack/react-router";
import { useAppState } from "../AppStateContext";
import { CreateConfirmationPage } from "../pages/CreateConfirmationPage";

export const Route = createFileRoute("/create/confirmation")({
  component: ConfirmationRoute,
});

function ConfirmationRoute() {
  const { banks, brokerageAccounts, confirmation } = useAppState();

  return (
    <CreateConfirmationPage
      confirmation={confirmation}
      banks={banks}
      brokerageAccounts={brokerageAccounts}
    />
  );
}
