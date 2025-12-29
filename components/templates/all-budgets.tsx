"use client";
import { useState, useEffect } from "react";
import BudgetItem from "../molecules/budget-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { budgetService } from "@/services";
import { Budget } from "@/types";
import { toast } from "sonner";
import Loading from "../atoms/loading";

export default function AllBudgets() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await budgetService.getBudgets(access_token as string);
      if (res.status === 200) {
        setBudgets(res.data.data.budgets);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token]);

  const sortedBudgets = budgets
    .sort((a, b) => b.month - a.month)
    .sort((a, b) => b.year - a.year);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto p-2">
      <h2 className="text-2xl mb-4">All Budgets</h2>
      <div className="flex flex-col items-center gap-4">
        {sortedBudgets.map((budget: Budget) => (
          <BudgetItem key={budget._id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
