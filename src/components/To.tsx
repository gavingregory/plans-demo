import type { Thing } from "./Selector";

export function To({ thing }: { thing: Thing }) {
  return (
    <div>
      {thing.type === "bank"
        ? `To Bank: ${thing.name} (ID: ${thing.id})`
        : `To Account: ${thing.name} (ID: ${thing.id})`}
    </div>
  );
}
