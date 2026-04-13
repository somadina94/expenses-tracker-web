"use client";

import { useEffect, useRef } from "react";
import { RootState, AuthState, useAppSelector } from "@/store";
import { notificationService } from "@/services";
import { useParams } from "next/navigation";
import DetailItem from "../atoms/detail-item";
import { formatRelativeDateTime } from "@/utils/helpers";
import Loading from "../atoms/loading";
import { useNotificationQuery } from "@/hooks/queries/use-notification";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function NotificationDetail() {
  const { access_token } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const markOnce = useRef<string | null>(null);

  const { data: notification, isPending, error } = useNotificationQuery(
    id,
    access_token ?? undefined
  );

  useEffect(() => {
    if (
      !notification?._id ||
      !access_token ||
      notification.read === true ||
      markOnce.current === notification._id
    ) {
      return;
    }
    markOnce.current = notification._id;
    (async () => {
      await notificationService.markNotificationRead(
        notification._id as string,
        access_token
      );
      await queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.notification(id),
      });
    })();
  }, [notification, access_token, queryClient, id]);

  if (isPending) {
    return <Loading />;
  }

  if (error || !notification) {
    return (
      <div className="mx-auto max-w-lg p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ?? "Notification not found."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-2">
      <h2 className="font-display mb-6 text-2xl tracking-tight">
        Notification
      </h2>
      <div className="flex flex-col gap-4">
        <DetailItem title="Title" content={notification.title} />
        <DetailItem title="Message" content={notification.body} />
        <DetailItem
          title="Created"
          content={formatRelativeDateTime(notification.createdAt as Date)}
        />
      </div>
    </div>
  );
}
