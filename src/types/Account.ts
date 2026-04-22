import type { AccountType } from "./AccounType";

export type Account = {
  id: string;
  type: AccountType;
  name: string;
};

export type BrokerageAccount = {
  id: string;
  type: "individual";
  name: string;
};
