import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { getFromLabel, getToLabel } from "../planLabels";
import type { BrokerageAccount } from "../types/Account";
import type { Bank } from "../types/Bank";
import type { AccountSourceType, Frequency, Plan, PlanInput } from "../types/Plan";

type FromChoice = {
  id: string;
  label: string;
  sourceType: AccountSourceType;
};

function getInitialInput(plan?: Plan): PlanInput {
  return {
    fromAccountId: plan?.fromAccountId ?? "",
    fromAccountType: plan?.fromAccountType ?? "bank",
    toAccountId: plan?.toAccountId ?? "",
    frequency: plan?.frequency ?? "Monthly",
    amount: plan?.amount ?? 100,
  };
}

function formatErrors(errors: unknown[]) {
  return errors.map((error) => String(error)).join(", ");
}

function validateAmount(value: number) {
  if (!Number.isInteger(value)) {
    return "Enter a whole dollar amount";
  }

  if (value < 1 || value > 10000) {
    return "Enter an amount between $1 and $10,000";
  }

  return undefined;
}

export function PlanForm({
  plan,
  banks,
  brokerageAccounts,
  onSubmit,
  initialInput,
}: {
  plan?: Plan;
  initialInput?: PlanInput | null;
  banks: Bank[];
  brokerageAccounts: BrokerageAccount[];
  onSubmit: (input: PlanInput) => void;
}) {
  const fromChoices = useMemo<FromChoice[]>(
    () => [
      ...banks.map((bank) => ({
        id: bank.id,
        label: bank.name,
        sourceType: "bank" as const,
      })),
      ...brokerageAccounts.map((account) => ({
        id: account.id,
        label: account.name,
        sourceType: "brokerage" as const,
      })),
    ],
    [banks, brokerageAccounts]
  );

  const form = useForm({
    defaultValues: initialInput ?? getInitialInput(plan),
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  function getAvailableDestinations(value: PlanInput) {
    return brokerageAccounts.filter((account) => {
      return !(
        value.fromAccountType === "brokerage" &&
        account.id === value.fromAccountId
      );
    });
  }

  function getFromChoice(value: string) {
    return fromChoices.find((choice) => choice.id === value);
  }

  function isSelectedDestinationAvailable(value: PlanInput) {
    return getAvailableDestinations(value).some(
      (account) => account.id === value.toAccountId
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void form.handleSubmit();
  }

  return (
    <form className="plan-form" onSubmit={handleSubmit}>
      {plan ? (
        <>
          <div className="readonly-field">
            <span>From</span>
            <strong id="from-account" data-testid="from-account">
              {getFromLabel(plan, banks, brokerageAccounts)}
            </strong>
          </div>
          <div className="readonly-field">
            <span>To</span>
            <strong id="to-account" data-testid="to-account">
              {getToLabel(plan, brokerageAccounts)}
            </strong>
          </div>
        </>
      ) : (
        <>
          <form.Field
            name="fromAccountId"
            validators={{
              onChange: ({ value }) =>
                !value ? "Choose a FROM account" : undefined,
              onSubmit: ({ value }) =>
                !value ? "Choose a FROM account" : undefined,
            }}
            children={(field) => (
              <label>
                From
                <select
                  id="from-account"
                  data-testid="from-account"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const fromAccountId = event.target.value;
                    const fromChoice = getFromChoice(fromAccountId);

                    field.handleChange(fromAccountId);
                    form.setFieldValue(
                      "fromAccountType",
                      fromChoice?.sourceType ?? "bank"
                    );

                    const nextValue = {
                      ...form.state.values,
                      fromAccountId,
                      fromAccountType: fromChoice?.sourceType ?? "bank",
                    };

                    if (!isSelectedDestinationAvailable(nextValue)) {
                      form.setFieldValue("toAccountId", "");
                    }
                  }}
                >
                  <option value="">Select a source account</option>
                  {fromChoices.map((choice) => (
                    <option
                      key={`${choice.sourceType}-${choice.id}`}
                      value={choice.id}
                    >
                      {choice.label} (
                      {choice.sourceType === "bank" ? "Bank" : "Brokerage"})
                    </option>
                  ))}
                </select>
                {!field.state.meta.isValid && (
                  <span className="field-error">
                    {formatErrors(field.state.meta.errors)}
                  </span>
                )}
              </label>
            )}
          />

          <form.Subscribe
            selector={(state) => state.values}
            children={(values) => {
              const availableDestinations = getAvailableDestinations(values);

              return (
                <form.Field
                  name="toAccountId"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "Choose a TO account" : undefined,
                    onSubmit: ({ value }) =>
                      !value ? "Choose a TO account" : undefined,
                  }}
                  children={(field) => (
                    <label>
                      To
                      <select
                        id="to-account"
                        data-testid="to-account"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      >
                        <option value="">Select a destination account</option>
                        {availableDestinations.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.name} (Brokerage)
                          </option>
                        ))}
                      </select>
                      {!field.state.meta.isValid && (
                        <span className="field-error">
                          {formatErrors(field.state.meta.errors)}
                        </span>
                      )}
                    </label>
                  )}
                />
              );
            }}
          />
        </>
      )}

      <form.Field
        name="frequency"
        children={(field) => (
          <label>
            Frequency
            <select
              id="frequency"
              data-testid="frequency"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) =>
                field.handleChange(event.target.value as Frequency)
              }
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </label>
        )}
      />

      <form.Field
        name="amount"
        validators={{
          onChange: ({ value }) => validateAmount(value),
          onSubmit: ({ value }) => validateAmount(value),
        }}
        children={(field) => (
          <label>
            Amount
            <input
              id="amount"
              data-testid="amount"
              name={field.name}
              type="number"
              min="1"
              max="10000"
              step="1"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.valueAsNumber)}
              required
            />
            {!field.state.meta.isValid && (
              <span className="field-error">
                {formatErrors(field.state.meta.errors)}
              </span>
            )}
          </label>
        )}
      />

      <div className="form-actions">
        <Link className="button button--secondary" to="/plans">
          Cancel
        </Link>
        <button id="submit-plan" data-testid="submit-plan" type="submit">
          {plan ? "Submit" : "Create"}
        </button>
      </div>
    </form>
  );
}
