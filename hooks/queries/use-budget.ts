import { useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Budget } from "@/types";

async function fetchBudget(id: string, token: string): Promise<Budget> {
  const res = await budgetService.getBudgetById(id, token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load budget"
    );
  }
  return res.data.data.budget as Budget;
}

export function useBudgetQuery(id: string | undefined, token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.budget(id ?? ""),
    queryFn: () => fetchBudget(id as string, token as string),
    enabled: Boolean(token && id),
  });
}
