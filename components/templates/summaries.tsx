"use client";
import { useEffect, useState } from "react";
import { formatAmount } from "@/utils/helpers";
import SummaryItem from "../molecules/summary-item";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Budget, Expense, Note } from "@/types";
import { budgetService, expenseService, noteService } from "@/services";
import Loading from "../atoms/loading";

export default function Summaries() {
  const { user, access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (access_token) {
      budgetService.getBudgets(access_token).then((res) => {
        setBudgets(res.data.data.budgets as Budget[]);
      });
      expenseService.getExpenses(access_token).then((res) => {
        setExpenses(res.data.data.expenses as Expense[]);
      });
      noteService.getNotes(access_token).then((res) => {
        setNotes(res.data.data.notes as Note[]);
        setIsLoading(false);
      });
    }
  }, [access_token]);

  let currentMonthExpenses: Expense[] = [];
  let lastMonthExpenses: Expense[] = [];
  let currentMonthBudgets: Budget[] = [];
  let lastMonthBudgets: Budget[] = [];

  if (expenses.length > 0) {
    currentMonthExpenses = expenses.filter(
      (expense) =>
        new Date(expense?.date).getMonth() === new Date().getMonth() &&
        new Date(expense?.date).getFullYear() === new Date().getFullYear()
    );
    lastMonthExpenses = expenses.filter(
      (expense) =>
        new Date(expense?.date).getMonth() === new Date().getMonth() - 1 &&
        new Date(expense?.date).getFullYear() === new Date().getFullYear()
    );
  }

  if (budgets.length > 0) {
    currentMonthBudgets = budgets.filter(
      (budget) =>
        budget?.month === new Date().getMonth() &&
        budget?.year === new Date().getFullYear()
    );
    lastMonthBudgets = budgets.filter(
      (budget) =>
        budget?.month === new Date().getMonth() - 1 &&
        budget?.year === new Date().getFullYear()
    );
  }

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const totalNotes = notes.length;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-200 mx-auto p-4">
      <h2 className="text-2xl mb-4">Activity summaries</h2>
      <div className="mx-auto flex flex-col gap-6">
        <SummaryItem
          title="Current month budget"
          value={`${user?.currency} ${formatAmount(
            currentMonthBudgets.reduce((acc, budget) => acc + budget.amount, 0)
          )}`}
        />

        <SummaryItem
          title="Current month expenses"
          value={`${user?.currency} ${formatAmount(
            currentMonthExpenses.reduce(
              (acc, expense) => acc + expense.amount,
              0
            )
          )}`}
        />

        <SummaryItem
          title="Last month budget"
          value={`${user?.currency} ${formatAmount(
            lastMonthBudgets.reduce((acc, budget) => acc + budget.amount, 0)
          )}`}
        />

        <SummaryItem
          title="Last month expenses"
          value={`${user?.currency} ${formatAmount(
            lastMonthExpenses.reduce((acc, expense) => acc + expense.amount, 0)
          )}`}
        />

        <SummaryItem
          title="Total budget"
          value={`${user?.currency} ${formatAmount(totalBudget)}`}
        />

        <SummaryItem
          title="Total expenses"
          value={`${user?.currency} ${formatAmount(totalExpenses)}`}
        />

        <SummaryItem title="All notes" value={`${totalNotes}`} />
      </div>
    </div>
  );
}
