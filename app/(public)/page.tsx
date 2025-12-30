import { Metadata } from "next";
import HomePage from "@/components/templates/homepage";

export const metadata: Metadata = {
  title: "Planary",
  description: "Track expenses, add notes and reminders, set budget",
};

export default function Home() {
  return <HomePage />;
}
