import { useQuery } from "@tanstack/react-query";
import { expenseService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Expense } from "@/types";

async function fetchExpenses(token: string): Promise<Expense[]> {
  const res = await expenseService.getExpenses(token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load expenses"
    );
  }
  return res.data.data.expenses as Expense[];
}

export function useExpensesQuery(token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.expenses,
    queryFn: () => fetchExpenses(token as string),
    enabled: Boolean(token),
  });
}
