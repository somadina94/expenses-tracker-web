import { useQuery } from "@tanstack/react-query";
import { notificationService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Notification } from "@/types";

async function fetchNotification(
  id: string,
  token: string
): Promise<Notification> {
  const res = await notificationService.getNotification(id, token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string"
        ? res.message
        : "Failed to load notification"
    );
  }
  return res.data.data.notification as Notification;
}

export function useNotificationQuery(
  id: string | undefined,
  token: string | undefined
) {
  return useQuery({
    queryKey: queryKeys.notification(id ?? ""),
    queryFn: () => fetchNotification(id as string, token as string),
    enabled: Boolean(token && id),
  });
}
