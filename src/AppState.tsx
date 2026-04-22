import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AppStateContext, type AppState } from "./AppStateContext";
import {
  createPlan,
  deletePlan,
  getBanks,
  getBrokerageAccounts,
  getPlans,
  updatePlan,
} from "./services/mockServices";
import type { BrokerageAccount } from "./types/Account";
import type { Bank } from "./types/Bank";
import type { Plan } from "./types/Plan";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [brokerageAccounts, setBrokerageAccounts] = useState<
    BrokerageAccount[]
  >([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pendingPlan, setPendingPlan] = useState<AppState["pendingPlan"]>(null);
  const [confirmation, setConfirmation] =
    useState<AppState["confirmation"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function loadInitialData() {
      setIsLoading(true);
      const [nextBanks, nextBrokerageAccounts, nextPlans] = await Promise.all([
        getBanks(),
        getBrokerageAccounts(),
        getPlans(),
      ]);

      if (!isCurrent) {
        return;
      }

      setBanks(nextBanks);
      setBrokerageAccounts(nextBrokerageAccounts);
      setPlans(nextPlans);
      setIsLoading(false);
    }

    loadInitialData();

    return () => {
      isCurrent = false;
    };
  }, []);

  async function refreshPlans() {
    setPlans(await getPlans());
  }

  const value = useMemo<AppState>(
    () => ({
      banks,
      brokerageAccounts,
      plans,
      isLoading,
      pendingPlan,
      confirmation,
      setPendingPlan,
      setConfirmation,
      createRecurringPlan: async (input) => {
        await createPlan(input);
        await refreshPlans();
      },
      updateRecurringPlan: async (id, input) => {
        await updatePlan(id, input);
        await refreshPlans();
      },
      deleteRecurringPlan: async (id) => {
        await deletePlan(id);
        await refreshPlans();
      },
    }),
    [banks, brokerageAccounts, plans, isLoading, pendingPlan, confirmation]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
