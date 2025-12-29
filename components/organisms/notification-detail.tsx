"use client";
import { useState, useEffect } from "react";
import { RootState, AuthState, useAppSelector } from "@/store";
import { notificationService } from "@/services";
import { Notification } from "@/types";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import DetailItem from "../atoms/detail-item";
import { formatRelativeDateTime } from "@/utils/helpers";
import Loading from "../atoms/loading";

export default function NotificationDetail() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const [notification, setNotification] = useState<Notification>();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await notificationService.getNotification(
        params.id as string,
        access_token as string
      );
      if (res.status === 200) {
        setNotification(res.data.data.notification);
      } else {
        toast(res.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [access_token, params]);

  useEffect(() => {
    const patchData = async () => {
      await notificationService.markNotificationRead(
        notification?._id as string,
        access_token as string
      );
    };
    if (notification?.read === false) {
      patchData();
    }
  }, [access_token, notification]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-200 w-full mx-auto ">
      <h2 className="text-2xl mb-4">Note details</h2>
      <div className="flex flex-col gap-4">
        <DetailItem title="Title" content={notification?.title} />
        <DetailItem
          title="Reminder"
          content={formatRelativeDateTime(
            new Date(notification?.createdAt as Date)
          )}
        />
        <DetailItem title="Content" content={notification?.body} />
      </div>
    </div>
  );
}
