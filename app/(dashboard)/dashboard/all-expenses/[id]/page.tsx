import { Metadata } from "next";
import ExpenseDetail from "@/components/organisms/expense-detail";

export const metadata: Metadata = {
  title: "Expense",
  description: "Expense details",
};

export default function ExpenseDetailPage() {
  return <ExpenseDetail />;
}
