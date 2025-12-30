import { Metadata } from "next";
import Summaries from "@/components/templates/summaries";

export const metadata: Metadata = {
  title: "Summaries",
  description: "Summaries of your activities",
};

export default function SummariesPage() {
  return <Summaries />;
}
