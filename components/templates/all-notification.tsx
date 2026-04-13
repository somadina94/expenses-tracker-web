"use client";

import NotificationItem from "../molecules/notification-item";
import { RootState, AuthState, useAppSelector } from "@/store";
import { Notification } from "@/types";
import Loading from "../atoms/loading";
import { useNotificationsQuery } from "@/hooks/queries/use-notifications";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AllNotifications() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const { data: notifications = [], isPending, error } = useNotificationsQuery(
    access_token ?? undefined
  );

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const sortedNotifications = [...notifications].sort(
    (a, b) =>
      new Date(b.createdAt as Date).getTime() -
      new Date(a.createdAt as Date).getTime()
  );

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">
        Notifications
      </h2>
      <div className="flex flex-col items-stretch gap-4">
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
