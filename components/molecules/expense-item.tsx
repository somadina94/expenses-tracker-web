"use client";
import { useAppSelector, RootState, AuthState } from "@/store";
import { Card, CardContent } from "../ui/card";
import { formatAmount, formatDate } from "@/utils/helpers";
import { Expense } from "@/types";
import { useRouter } from "next/navigation";

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const { user } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const router = useRouter();

  return (
    <Card
      className="hover:opacity-50 w-full cursor-pointer"
      onClick={() => router.push(`/dashboard/all-expenses/${expense._id}`)}
    >
      <CardContent className="flex flex-row items-center justify-between">
        <span className="text-sm text-foreground dark:text-white flex-1 text-left">
          {expense.title}
        </span>
        <span className="text-sm text-foreground dark:text-white flex-1 text-left">
          {user?.currency} {formatAmount(expense.amount)}
        </span>
        <span className="text-sm text-foreground dark:text-white flex-1 text-right">
          {formatDate(expense.date)}
        </span>
      </CardContent>
    </Card>
  );
}
