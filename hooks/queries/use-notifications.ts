import { useQuery } from "@tanstack/react-query";
import { notificationService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { Notification } from "@/types";

async function fetchNotifications(token: string): Promise<Notification[]> {
  const res = await notificationService.getNotifications(token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string"
        ? res.message
        : "Failed to load notifications"
    );
  }
  return res.data.data.notifications as Notification[];
}

export function useNotificationsQuery(token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => fetchNotifications(token as string),
    enabled: Boolean(token),
  });
}
