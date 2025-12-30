import { Metadata } from "next";
import AllBudgets from "@/components/templates/all-budgets";

export const metadata: Metadata = {
  title: "Budgets",
  description: "List of all your budgets",
};

export default function AllBudgetsPages() {
  return <AllBudgets />;
}
