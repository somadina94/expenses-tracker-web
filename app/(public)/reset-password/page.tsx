import { Metadata } from "next";
import ResetPasswordForm from "@/components/templates/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
