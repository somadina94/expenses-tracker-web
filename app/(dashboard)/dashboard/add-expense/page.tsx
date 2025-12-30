import { Metadata } from "next";
import AddExpenseForm from "@/components/templates/add-expense";

export const metadata: Metadata = {
  title: "Add expense",
  description: "Add an expense",
};

export default function AddExpensePage() {
  return <AddExpenseForm />;
}
