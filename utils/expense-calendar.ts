/**
 * Derive calendar year + month (0–11) from an expense date for aggregation.
 * Uses the ISO date prefix (YYYY-MM-DD) when present so April stays April even when
 * the full timestamp is UTC midnight (which otherwise shifts to the prior local day
 * in Americas timezones and breaks getMonth()).
 */
export function getExpenseCalendarYearMonth(
  value: Date | string | undefined | null
): { year: number; monthIndex: number } | null {
  if (value == null || value === "") return null;

  if (typeof value === "string") {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
    if (m) {
      const year = Number(m[1]);
      const monthIndex = Number(m[2]) - 1;
      if (!Number.isFinite(year) || monthIndex < 0 || monthIndex > 11) {
        return null;
      }
      return { year, monthIndex };
    }
  }

  const d = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(d.getTime())) return null;
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
}

export function expenseAmountValue(amount: unknown): number {
  const n = Number(amount);
  return Number.isFinite(n) ? n : 0;
}
