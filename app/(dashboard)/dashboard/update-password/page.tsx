import { Metadata } from "next";
import UpdatePasswordForm from "@/components/organisms/update-password-form";

export const metadata: Metadata = {
  title: "Update password",
  description: "Update your password",
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
