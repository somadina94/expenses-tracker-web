import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services";
import { queryKeys } from "@/lib/query-keys";
import type { User } from "@/types";

async function fetchMe(token: string): Promise<User> {
  const res = await authService.getMe(token);
  if (res.status !== 200) {
    throw new Error(
      typeof res.message === "string" ? res.message : "Failed to load profile"
    );
  }
  return res.data.data.user as User;
}

export function useMeQuery(token: string | undefined) {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => fetchMe(token as string),
    enabled: Boolean(token),
  });
}
