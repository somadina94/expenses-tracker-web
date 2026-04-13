import { useQuery } from "@tanstack/react-query";
import { expenseService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Expense } from "@/types";

async function fetchExpense(id: string, token: string): Promise<Expense> {
  const res = await expenseService.getExpense(id, token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load expense"
    );
  }
  return res.data.data.expense as Expense;
}

export function useExpenseQuery(id: string | undefined, token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.expense(id ?? ""),
    queryFn: () => fetchExpense(id as string, token as string),
    enabled: Boolean(token && id),
  });
}
