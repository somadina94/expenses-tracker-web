import { Metadata } from "next";
import SearchBudgetForm from "@/components/templates/search-budget-form";

export const metadata: Metadata = {
  title: "Search budgets",
  description: "Search budgets in seconds",
};

export default function SearchBudgetPage() {
  return <SearchBudgetForm />;
}
