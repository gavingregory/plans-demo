import { createContext, useContext } from "react";
import type { BrokerageAccount } from "./types/Account";
import type { Bank } from "./types/Bank";
import type { Plan, PlanInput } from "./types/Plan";

export type AppState = {
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
  plans: Plan[];
  isLoading: boolean;
  pendingPlan: PlanInput | null;
  confirmation: { plan: PlanInput; number: string } | null;
  setPendingPlan: (input: PlanInput | null) => void;
  setConfirmation: (confirmation: { plan: PlanInput; number: string } | null) => void;
  createRecurringPlan: (input: PlanInput) => Promise<void>;
  updateRecurringPlan: (id: string, input: PlanInput) => Promise<void>;
  deleteRecurringPlan: (id: string) => Promise<void>;
};

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
