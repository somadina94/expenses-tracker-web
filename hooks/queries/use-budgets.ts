import { useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Budget } from "@/types";

async function fetchBudgets(token: string): Promise<Budget[]> {
  const res = await budgetService.getBudgets(token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load budgets"
    );
  }
  return res.data.data.budgets as Budget[];
}

export function useBudgetsQuery(token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.budgets,
    queryFn: () => fetchBudgets(token as string),
    enabled: Boolean(token),
  });
}
