import { Metadata } from "next";
import UpdateBudgetForm from "@/components/templates/update-budget-form";

export const metadata: Metadata = {
  title: "Budget update",
  description: "Update your budget",
};

export default function UpdateBudgetPage() {
  return <UpdateBudgetForm />;
}
