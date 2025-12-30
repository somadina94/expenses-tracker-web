import { Metadata } from "next";
import UpdateAccountForm from "@/components/organisms/update-account-form";

export const metadata: Metadata = {
  title: "Update Profile",
  description: "Update your profile info",
};

export default function UpdateAccountPage() {
  return <UpdateAccountForm />;
}
