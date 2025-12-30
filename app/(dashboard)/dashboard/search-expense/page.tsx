import { Metadata } from "next";
import SearchExpenseForm from "@/components/templates/search-expense-form";

export const metadata: Metadata = {
  title: "Search expenses",
  description: "Search expenses in seconds",
};

export default function SearchExpensePage() {
  return <SearchExpenseForm />;
}
