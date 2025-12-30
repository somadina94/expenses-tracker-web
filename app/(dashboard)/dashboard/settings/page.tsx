import { Metadata } from "next";
import Settings from "@/components/templates/settings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Profile settings",
};

export default function SettingsPage() {
  return <Settings />;
}
