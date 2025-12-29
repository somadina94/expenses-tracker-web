"use client";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Card, CardContent } from "../ui/card";
import { formatAmount, getMonthName } from "@/utils/helpers";
import { Budget } from "@/types";
import { useRouter } from "next/navigation";

interface BudgetItemProps {
  budget: Budget;
}

export default function BudgetItem({ budget }: BudgetItemProps) {
  const { user } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const router = useRouter();

  return (
    <Card
      className="hover:opacity-50 w-full cursor-pointer"
      onClick={() => router.push(`/dashboard/all-budgets/${budget._id}`)}
    >
      <CardContent className="flex flex-row items-center justify-between">
        <span className="text-sm text-foreground dark:text-white flex-1 text-left">
          {user?.currency} {formatAmount(budget.amount)}
        </span>
        <span className="text-sm text-foreground dark:text-white flex-1 text-left">
          {getMonthName(budget.month)}
        </span>
        <span className="text-sm text-foreground dark:text-white flex-1 text-right">
          {budget.year}
        </span>
      </CardContent>
    </Card>
  );
}
