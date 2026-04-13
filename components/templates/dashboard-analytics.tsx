"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatAmount, formatChartAxisTick } from "@/utils/helpers";
import {
  expenseAmountValue,
  getExpenseCalendarYearMonth,
} from "@/utils/expense-calendar";
import type { Budget, Expense, Note } from "@/types";
import {
  Wallet,
  Receipt,
  StickyNote,
  TrendingUp,
  PiggyBank,
  CalendarClock,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  budgets: Budget[];
  expenses: Expense[];
  notes: Note[];
  currency: string;
};

function prevMonthRef(d = new Date()) {
  const p = new Date(d.getFullYear(), d.getMonth() - 1, 1);
  return { month: p.getMonth(), year: p.getFullYear() };
}

const trendConfig = {
  amount: { label: "Spending", color: "var(--chart-1)" },
} satisfies ChartConfig;

const compareConfig = {
  budget: { label: "Budget", color: "var(--chart-2)" },
  spent: { label: "Spent", color: "var(--chart-1)" },
} satisfies ChartConfig;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardAnalytics({
  budgets,
  expenses,
  notes,
  currency,
}: Props) {
  const now = useMemo(() => new Date(), []);
  const { month: pm, year: py } = prevMonthRef(now);

  const currentMonthBudgets = budgets.filter(
    (b) => b.month === now.getMonth() && b.year === now.getFullYear()
  );
  const lastMonthBudgets = budgets.filter((b) => b.month === pm && b.year === py);

  const currentMonthExpenses = expenses.filter((e) => {
    const cal = getExpenseCalendarYearMonth(e.date);
    return (
      cal != null &&
      cal.monthIndex === now.getMonth() &&
      cal.year === now.getFullYear()
    );
  });
  const lastMonthExpenses = expenses.filter((e) => {
    const cal = getExpenseCalendarYearMonth(e.date);
    return cal != null && cal.monthIndex === pm && cal.year === py;
  });

  const sumBudget = (list: Budget[]) =>
    list.reduce((acc, b) => acc + b.amount, 0);
  const sumExpense = (list: Expense[]) =>
    list.reduce((acc, e) => acc + expenseAmountValue(e.amount), 0);

  const curB = sumBudget(currentMonthBudgets);
  const curE = sumExpense(currentMonthExpenses);
  const lastB = sumBudget(lastMonthBudgets);
  const lastE = sumExpense(lastMonthExpenses);

  const totalBudget = budgets.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce(
    (a, e) => a + expenseAmountValue(e.amount),
    0
  );

  const sixMonthTrend = useMemo(() => {
    const anchor = new Date();
    const out: { label: string; amount: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(anchor.getFullYear(), anchor.getMonth() - i, 1);
      const label = d.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      const amount = expenses
        .filter((e) => {
          const cal = getExpenseCalendarYearMonth(e.date);
          return (
            cal != null &&
            cal.monthIndex === d.getMonth() &&
            cal.year === d.getFullYear()
          );
        })
        .reduce((a, e) => a + expenseAmountValue(e.amount), 0);
      out.push({ label, amount });
    }
    return out;
  }, [expenses]);

  const compareRows = [
    { period: "This month", budget: curB, spent: curE },
    { period: "Last month", budget: lastB, spent: lastE },
  ];

  const burnRate =
    curB > 0 ? Math.min(100, Math.round((curE / curB) * 100)) : curE > 0 ? 100 : 0;
  const notesWithReminders = notes.filter(
    (n) => n.reminder && new Date(n.reminder).getTime() > 0
  ).length;

  return (
    <motion.div
      className="mx-auto flex w-full max-w-6xl flex-col gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="font-display text-foreground text-3xl tracking-tight md:text-4xl">
          Activity overview
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
          Spending rhythm, budget posture, and notes at a glance—refreshed as you
          use Planary.
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="border-border/80 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This month spent</CardTitle>
            <Receipt className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl">
              {currency} {formatAmount(curE)}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {curB > 0
                ? `${burnRate}% of budget used`
                : "Set a budget to track utilization"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This month budget</CardTitle>
            <PiggyBank className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl">
              {currency} {formatAmount(curB)}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {lastB > 0
                ? `vs ${currency} ${formatAmount(lastB)} last month`
                : "Plan ahead for the month"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All-time spend</CardTitle>
            <TrendingUp className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl">
              {currency} {formatAmount(totalExpenses)}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Across {expenses.length} logged expense
              {expenses.length === 1 ? "" : "s"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes & reminders</CardTitle>
            <StickyNote className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl">{notes.length}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {notesWithReminders} with reminders · {currency}{" "}
              {formatAmount(totalBudget)} total budgets recorded
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card className="h-full border-border/80 py-0">
            <CardHeader className="border-b pb-4">
              <div className="flex items-start gap-2">
                <CalendarClock className="text-primary mt-0.5 size-5 shrink-0" />
                <div>
                  <CardTitle className="font-display text-lg">
                    Six-month spending
                  </CardTitle>
                  <CardDescription>
                    Total expenses logged per month—spot trends early.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer config={trendConfig} className="sm:h-[300px]">
                <AreaChart
                  accessibilityLayer
                  data={sixMonthTrend}
                  margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tickFormatter={(v) => formatChartAxisTick(Number(v))}
                    domain={([, dataMax]) => {
                      const max =
                        typeof dataMax === "number" &&
                        Number.isFinite(dataMax)
                          ? dataMax
                          : 0;
                      return [0, max > 0 ? max * 1.12 : 1];
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => String(label)}
                        formatter={(value) => (
                          <span>
                            {currency} {formatAmount(Number(value))}
                          </span>
                        )}
                      />
                    }
                  />
                  <Area
                    dataKey="amount"
                    type="monotone"
                    fill="var(--color-amount)"
                    fillOpacity={0.25}
                    stroke="var(--color-amount)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full border-border/80 py-0">
            <CardHeader className="border-b pb-4">
              <div className="flex items-start gap-2">
                <Wallet className="text-primary mt-0.5 size-5 shrink-0" />
                <div>
                  <CardTitle className="font-display text-lg">
                    Budget vs spent
                  </CardTitle>
                  <CardDescription>
                    Compare planned budgets with actual spending by period.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer config={compareConfig} className="sm:h-[300px]">
                <BarChart
                  accessibilityLayer
                  data={compareRows}
                  margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="period"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tickFormatter={(v) => formatChartAxisTick(Number(v))}
                    domain={([, dataMax]) => {
                      const max =
                        typeof dataMax === "number" &&
                        Number.isFinite(dataMax)
                          ? dataMax
                          : 0;
                      return [0, max > 0 ? max * 1.12 : 1];
                    }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => String(label)}
                        formatter={(value, name) => (
                          <span>
                            {String(name)}: {currency}{" "}
                            {formatAmount(Number(value))}
                          </span>
                        )}
                      />
                    }
                  />
                  <Bar
                    dataKey="budget"
                    fill="var(--color-budget)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={48}
                  />
                  <Bar
                    dataKey="spent"
                    fill="var(--color-spent)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
