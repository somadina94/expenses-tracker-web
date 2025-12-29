"use client";
import { useState, useEffect } from "react";
import NotificationItem from "../molecules/notification-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { notificationService } from "@/services";
import { Notification } from "@/types";
import { toast } from "sonner";
import Loading from "../atoms/loading";

export default function AllNotifications() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await notificationService.getNotifications(
        access_token as string
      );
      if (res.status === 200) {
        setNotifications(res.data.data.notifications);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token]);

  const sortedNotifications = notifications.sort(
    (a, b) =>
      new Date(b.createdAt as Date).getTime() -
      new Date(a.createdAt as Date).getTime()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto p-2">
      <h2 className="text-2xl mb-4">All Notifications</h2>
      <div className="flex flex-col items-center gap-4">
        {sortedNotifications.map((notification: Notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}
