"use client";

import BudgetItem from "../molecules/budget-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { Budget } from "@/types";
import Loading from "../atoms/loading";
import NoResult from "../atoms/no-result";
import { useBudgetsQuery } from "@/hooks/queries/use-budgets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AllBudgets() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const { data: budgets = [], isPending, error } = useBudgetsQuery(
    access_token ?? undefined
  );

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const sortedBudgets = [...budgets].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.month - a.month;
  });

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">All budgets</h2>
      {sortedBudgets.length === 0 && <NoResult />}
      {sortedBudgets.length > 0 && (
        <div className="flex flex-col items-stretch gap-4">
          {sortedBudgets.map((budget: Budget) => (
            <BudgetItem key={budget._id} budget={budget} />
          ))}
        </div>
      )}
    </div>
  );
}
