"use client";
import { useState, useEffect } from "react";
import ExpenseItem from "../molecules/expense-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { expenseService } from "@/services";
import { Expense } from "@/types";
import { toast } from "sonner";
import Loading from "../atoms/loading";
import NoResult from "../atoms/no-result";

export default function AllExpenses() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [expenses, setExpenes] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await expenseService.getExpenses(access_token as string);
      if (res.status === 200) {
        setExpenes(res.data.data.expenses);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token]);

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto p-2">
      <h2 className="text-2xl mb-4">All Expenses</h2>
      {sortedExpenses.length === 0 && <NoResult />}
      {sortedExpenses.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          {sortedExpenses.map((expense: Expense) => (
            <ExpenseItem key={expense._id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}
