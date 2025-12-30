import { Metadata } from "next";
import BudgetDetail from "@/components/organisms/budget-detail";

export const metadata: Metadata = {
  title: "Budget",
  description: "Budget details",
};

export default function BudgetDetailPage() {
  return <BudgetDetail />;
}
