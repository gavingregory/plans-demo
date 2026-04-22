export type AccountSourceType = "bank" | "brokerage";

export type Frequency = "Weekly" | "Monthly";

export type Plan = {
  id: string;
  fromAccountId: string;
  fromAccountType: AccountSourceType;
  toAccountId: string;
  frequency: Frequency;
  amount: number;
};

export type PlanInput = Omit<Plan, "id">;
