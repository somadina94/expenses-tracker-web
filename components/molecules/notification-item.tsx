"use client";
import { Notification } from "@/types";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { formatRelativeDateTime, trimToLength } from "@/utils/helpers";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() =>
        router.push(`/dashboard/all-notification/${notification._id}`)
      }
      className="max-w-200 w-full mb-2 hover:opacity-50 cursor-pointer py-2"
      style={!notification.read ? { backgroundColor: "#1f4e79" } : undefined}
    >
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg">{notification.title}</span>
          <span className="text-sm">{trimToLength(notification.body, 60)}</span>
        </div>
        <div className="flex justify-end items-start">
          <span className="text-sm">
            {formatRelativeDateTime(new Date(notification.createdAt as Date))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
