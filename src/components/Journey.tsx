import type { Thing } from "./Selector";

export function Journey({ from, to }: { from: Thing; to: Thing | null }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box type={from.type}>{from.name}</Box>
      {to && (
        <>
          <div style={{ marginRight: "16px" }}>→</div>
          <Box type={to.type}>{to.name}</Box>
        </>
      )}
    </div>
  );
}

function Box({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "bank" | "account";
}) {
  return (
    <div style={{ padding: 20, margin: 20, border: "solid 2px white" }}>
      {type === "bank" ? "🏦" : "💼"}
      <br />
      {children}
    </div>
  );
}
