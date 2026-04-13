export const queryKeys = {
  budgets: ["budgets"] as const,
  budget: (id: string) => ["budgets", id] as const,
  expenses: ["expenses"] as const,
  expense: (id: string) => ["expenses", id] as const,
  notes: ["notes"] as const,
  note: (id: string) => ["notes", id] as const,
  notifications: ["notifications"] as const,
  notification: (id: string) => ["notifications", id] as const,
  me: ["me"] as const,
};
