import type { BrokerageAccount } from "./types/Account";
import type { Bank } from "./types/Bank";
import type { Plan } from "./types/Plan";

export function getFromLabel(
  plan: Plan,
  banks: Bank[],
  brokerageAccounts: BrokerageAccount[]
) {
  if (plan.fromAccountType === "bank") {
    return banks.find((bank) => bank.id === plan.fromAccountId)?.name ?? "Bank";
  }

  return (
    brokerageAccounts.find((account) => account.id === plan.fromAccountId)
      ?.name ?? "Brokerage account"
  );
}

export function getToLabel(
  plan: Plan,
  brokerageAccounts: BrokerageAccount[]
) {
  return (
    brokerageAccounts.find((account) => account.id === plan.toAccountId)
      ?.name ?? "Brokerage account"
  );
}
