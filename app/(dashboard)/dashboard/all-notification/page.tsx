import { Metadata } from "next";
import AllNotifications from "@/components/templates/all-notification";

export const metadata: Metadata = {
  title: "Notifications",
  description: "List of all your notifications",
};

export default function AllNotificationsPage() {
  return <AllNotifications />;
}
