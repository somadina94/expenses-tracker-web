import { Metadata } from "next";
import UpdateExpenseForm from "@/components/templates/update-expense-form";

export const metadata: Metadata = {
  title: "Expense update",
  description: "Update your expense",
};

export default function UpdateExpensePage() {
  return <UpdateExpenseForm />;
}
