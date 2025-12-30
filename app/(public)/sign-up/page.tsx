import { Metadata } from "next";
import SignupForm from "@/components/templates/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to track expenses, add notes and reminders, set budget",
};

export default function SignupPage() {
  return <SignupForm />;
}
