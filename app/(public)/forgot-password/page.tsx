import { Metadata } from "next";
import ForgotPasswordForm from "@/components/templates/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Recover your password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
