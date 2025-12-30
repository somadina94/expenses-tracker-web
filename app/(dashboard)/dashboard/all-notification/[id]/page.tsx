import { Metadata } from "next";
import NotificationDetail from "@/components/organisms/notification-detail";

export const metadata: Metadata = {
  title: "Notification",
  description: "Notification details",
};

export default function NotificationDetailPage() {
  return <NotificationDetail />;
}
