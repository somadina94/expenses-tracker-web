import { Metadata } from "next";
import AllExpenses from "@/components/templates/all-expenses";

export const metadata: Metadata = {
  title: "Expenses",
  description: "List of all your expenses",
};

export default function AllExpensesPage() {
  return <AllExpenses />;
}
