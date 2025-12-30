import { Metadata } from "next";
import AddBudgetForm from "@/components/templates/add-budget";

export const metadata: Metadata = {
  title: "Add budget",
  description: "Add a month budget",
};

export default function AddBudgetPage() {
  return <AddBudgetForm />;
}
