import { Metadata } from "next";
import LoginForm from "@/components/templates/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to track expenses, add notes and reminders, set budget",
};

export default function LoginPage() {
  return <LoginForm />;
}
