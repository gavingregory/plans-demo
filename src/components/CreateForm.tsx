import { useState } from "react";
import type { Account } from "../types/Account";
import type { Bank } from "../types/Bank";
import { Selector, type Thing } from "./Selector";
import { Journey } from "./Journey";

const banks: Bank[] = [
  { id: "bank1", name: "Bank One" },
  { id: "bank2", name: "Bank Two" },
];

const accounts: Account[] = [
  { id: "acc1", type: "529", name: "529 Account" },
  { id: "acc2", type: "brokerage", name: "Brokerage Account" },
  { id: "acc3", type: "ira", name: "IRA Account" },
];

export function CreateForm() {
  const [selectedSource, setSelectedSource] = useState<Thing | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Thing | null>(
    null
  );

  return (
    <form>
      <Selector
        label="From"
        banks={banks}
        accounts={accounts}
        onChange={(i) => {
          setSelectedSource(i);
          setSelectedDestination(null);
        }}
      />
      {selectedSource && (
        <Selector
          banks={selectedSource.type == "bank" ? [] : banks}
          accounts={accounts.filter((i) => i.id !== selectedSource.id)}
          label="To"
          onChange={setSelectedDestination}
        />
      )}
      {selectedSource && (
        <Journey from={selectedSource} to={selectedDestination} />
      )}
    </form>
  );
}
