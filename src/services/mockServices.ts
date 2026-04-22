import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { Plan, PlanInput } from "../types/Plan";

const banks: Bank[] = [
  { id: "bank-1", name: "Bank Account (1234)" },
  { id: "bank-2", name: "Bank Account (4567)" },
];

const brokerageAccounts: BrokerageAccount[] = [
  { id: "brkg-1", type: "individual", name: "Individual Brokerage (8328082)" },
  { id: "brkg-2", type: "individual", name: "Individual Brokerage (8324000)" },
  { id: "brkg-3", type: "individual", name: "Individual Brokerage (8329292)" },
];

let plans: Plan[] = [
  {
    id: "plan-1",
    fromAccountId: "bank-1",
    fromAccountType: "bank",
    toAccountId: "brkg-1",
    frequency: "Monthly",
    amount: 500,
  },
  {
    id: "plan-2",
    fromAccountId: "brkg-2",
    fromAccountType: "brokerage",
    toAccountId: "brkg-3",
    frequency: "Weekly",
    amount: 125,
  },
  {
    id: "plan-3",
    fromAccountId: "brkg-2",
    fromAccountType: "brokerage",
    toAccountId: "brkg-3",
    frequency: "Monthly",
    amount: 180,
  },
];

let nextPlanNumber = plans.length + 1;

function delay<T>(value: T) {
  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(value), 200);
  });
}

export function getBanks() {
  return delay(banks);
}

export function getBrokerageAccounts() {
  return delay(brokerageAccounts);
}

export function getPlans() {
  return delay(plans);
}

export function getPlan(id: string) {
  return delay(plans.find((plan) => plan.id === id) ?? null);
}

export function createPlan(input: PlanInput) {
  const plan: Plan = {
    ...input,
    id: `plan-${nextPlanNumber}`,
  };

  nextPlanNumber += 1;
  plans = [plan, ...plans];
  return delay(plan);
}

export function updatePlan(id: string, input: PlanInput) {
  let updatedPlan: Plan | null = null;

  plans = plans.map((plan) => {
    if (plan.id !== id) {
      return plan;
    }

    updatedPlan = { ...input, id };
    return updatedPlan;
  });

  return delay(updatedPlan);
}

export function deletePlan(id: string) {
  const planExists = plans.some((plan) => plan.id === id);
  plans = plans.filter((plan) => plan.id !== id);
  return delay(planExists);
}
