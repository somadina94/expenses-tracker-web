"use client";

import ExpenseItem from "../molecules/expense-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { Expense } from "@/types";
import Loading from "../atoms/loading";
import NoResult from "../atoms/no-result";
import { useExpensesQuery } from "@/hooks/queries/use-expenses";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AllExpenses() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const { data: expenses = [], isPending, error } = useExpensesQuery(
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

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">All expenses</h2>
      {sortedExpenses.length === 0 && <NoResult />}
      {sortedExpenses.length > 0 && (
        <div className="flex flex-col items-stretch gap-4">
          {sortedExpenses.map((expense: Expense) => (
            <ExpenseItem key={expense._id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}
