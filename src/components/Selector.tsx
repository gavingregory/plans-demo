import { useMemo } from "react";
import type { Account } from "../types/Account";
import type { Bank } from "../types/Bank";

export type Thing = {
  id: string;
  name: string;
  type: "bank" | "account";
};

export function Selector({
  label,
  banks,
  accounts,
  onChange,
}: {
  label: string;
  banks: Bank[];
  accounts: Account[];
  onChange: (thing: Thing) => void;
}) {
  const things = useMemo<Thing[]>(() => {
    return [
      ...banks.map((b) => ({ id: b.id, name: b.name, type: "bank" } as const)),
      ...accounts.map(
        (a) => ({ id: a.id, name: a.name, type: "account" } as const)
      ),
    ];
  }, [banks, accounts]);

  return (
    <>
      <label>{label}</label>
      <select
        id="from"
        onChange={(e) => onChange(things.find((t) => t.id === e.target.value)!)}
      >
        {things.map((thing) => (
          <option key={thing.type + thing.id} value={thing.id}>
            {thing.name} ({thing.type})
          </option>
        ))}
      </select>
    </>
  );
}
